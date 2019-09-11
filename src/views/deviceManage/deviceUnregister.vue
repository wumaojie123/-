<template>
  <div class="content-area">
    <el-form :inline="true" style="margin-bottom: 20px;" label-width="90px" label-position="right">
      <el-form-item label="设备类型">
        <el-select v-model="queryParams.equipmentType" placeholder="请选择">
          <el-option
            v-for="item in equipmentTypesArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="设备编号">
        <el-input
          v-model="queryParams.equipmentValue"
          placeholder="输入多台设备时用,隔开"
          class="input-300"
          maxlength="100"
          clearable
        />
        <el-button type="primary" icon="el-icon-search" @click="filerQueryList">查询</el-button>
        <el-button type="primary" style="margin-left: 20px;" @click="handleRegister">设备注册</el-button>
        <router-link :to="{path: '/registerRecord'}">
          <el-button type="success" style="margin-left: 20px;">设备注册记录</el-button>
        </router-link>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table
      :data="list"
      border
      highlight-current-row
      style="width: 100%;margin-bottom: 20px;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        v-for="(item, index) in colums"
        :key="index"
        :prop="item.key"
        :label="item.label"
        :width="item.width"
        :sortable="item.sortable"
        align="center"
      />
    </el-table>
    <div style="padding-bottom: 10px;font-size: 16px;">合计设备数：{{ pageInfo.total }}台</div>
    <el-pagination
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageInfo.pageSize"
      :total="pageInfo.total"
      :current-page="pageInfo.currPage"
      background
      layout="total, prev, pager, next, sizes, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- modify by lss 20190826 计费模式弹框 -->
    <div v-show="showPatternBoxFlag" class="s-charge-pattern-panel">
      <div class="s-charge-pattern-box">
        <div class="title">请选择服务套餐计费模式</div>
        <div class="s-sel-charge-pattern">
          <template v-for="(item,index) in arrCDZChargePattern">
            <div
              :class="['charge-pattern-box',' time-pattern',{active:(item==tempChargePattern)}]"
              :key="index"
              @click="setChargePattern(item)"
            >
              <div class="icon" />
              <div class="pattern-content">
                {{ item==='ELEC'?'按电量计费':'按时长计费' }}
                <p>{{ arrCDZDiaologContent[item] }}</p>
              </div>
            </div>
          </template>
        </div>
        <div class="btn-panel">
          <div class="no-scroll cancel-btn" @click="showPatternBoxFlag=false">取消</div>
          <div class="no-scroll sure-btn" @click="sureChargePattern">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { registeredList } from '@/api/device'
import { deviceMap, deviceMapInfo, communicationMap } from './constant'
// var arrChargePattern = ['按时长计费、按电量计费', '按时长计费', '按电量计费']
export default {
  data() {
    return {
      queryParams: { equipmentType: 'CDZ', equipmentValue: '', registered: 0 },
      equipmentTypesArr: deviceMap,
      list: [],
      colums: [
        { key: 'equipmentTypeText', label: '设备类型' },
        { key: 'value', label: '设备编号' },
        { key: 'communicationText', label: '通信方式' },
        { key: 'chargePattern', label: '计费方式' },
        { key: 'sourceText', label: '设备来源' },
        { key: 'updated', label: '操作时间' }
      ],
      pageInfo: { total: 0, pageSize: 10, currPage: 1 },
      selectList: [],
      showPatternBoxFlag: false,
      arrCDZDiaologContent: {
        TIME: '充电时长计算充电费用，如1元240分钟',
        ELEC: '电量消耗计算充电费用，如1元1度'
      },
      arrCDZChargePattern: [],
      tempChargePattern: '',
      selectedPattern: '',
      tempEquipmentArr: []
    }
  },
  created() {
    this.queryList()
  },
  methods: {
    getChargePatternText(model) {
      model = model || []
      var text = ''
      model.forEach(i => {
        text += i.description + ','
      })
      if (text !== '') {
        text = text.substr(0, text.length - 1)
      }
      return text
    },
    async queryList(page = 1) {
      this.selectList = []
      this.list = []
      this.pageInfo.currPage = page
      const postData = {
        pageSize: this.pageInfo.pageSize,
        pageIndex: this.pageInfo.currPage
      }
      for (const key in this.queryParams) {
        postData[key] = this.queryParams[key]
      }
      const res = await registeredList(postData)
      if (res.result === 0) {
        this.listLoading = false
        if (res.data) {
          let list = res.data.items || []
          list = list.map(item => {
            item.sourceText =
              item.source === 1
                ? '商家解绑'
                : item.source === 0
                  ? '平台导入'
                  : ''
            item.communicationText = communicationMap[item.communication]
            const equipmentTypeMap = deviceMapInfo
            item.equipmentTypeText = equipmentTypeMap[item.equipmentType]
            if (item.communication === 2) {
              item.chargePattern = this.getChargePatternText(item.billingModel)
            } else {
              item.chargePattern = '--'
            }
            return item
          })
          this.list = list
          this.pageInfo.total = res.data.total || 0
        } else {
          this.pageInfo.total = 0
        }
      }
    },
    handleSelectionChange(value) {
      this.selectList = value
    },
    getTemplateRow(value) {
      this.check = value
      this.selectList = [this.list[value]]
    },
    handleAngent(type) {
      if (this.selectList.length === 1) {
        console.log('kkk')
      } else if (this.selectList.length > 1) {
        this.$message({ message: '只能编辑一条代理商信息', type: 'error' })
      } else {
        this.$message({ message: '请选中一条代理商信息！！', type: 'error' })
      }
    },
    handleSizeChange(pageSize) {
      this.pageInfo.pageSize = pageSize
      this.pageInfo.total = 0
      this.queryList(1)
    },
    handleCurrentChange(page) {
      this.queryList(page)
    },
    filerQueryList() {
      this.pageInfo.total = 0
      this.queryList(this.pageInfo.currPage)
    },
    /**
     * 选择计费模式 设置样式
     */
    setChargePattern(type) {
      this.tempChargePattern = type
    },
    sureChargePattern() {
      this.showPatternBoxFlag = false
      this.$router.push({
        path: '/register',
        query: {
          deviceType: this.queryParams.equipmentType,
          equipmentArr: this.tempEquipmentArr,
          communication: 2,
          chargePattern: this.tempChargePattern
        }
      })
    },
    // 设备注册
    handleRegister() {
      if (this.selectList.length === 0) {
        this.$message({ message: '请选择要注册的设备', type: 'error' })
        return
      }
      const equipmentArr = []
      const equipmentType = []
      this.selectList.forEach(item => {
        equipmentArr.push(item.value)
        equipmentType.push(item.communication)
      })
      const flag = equipmentType.some(item => item !== equipmentType[0])
      if (flag) {
        this.$message({
          message: '只能选择同一种通信方式的设备进行注册',
          type: 'error'
        })
        return
      }
      // 判断计费模式
      // var tempChargePattern = ''
      // var selectedPattern = ''
      if (equipmentType[0] === 2) {
        var result = this.checkChargePattern()
        if (result.TIME !== -1 && result.ELEC !== -1) {
          this.$message({
            message: '只能选择相同计费模式设备进行注册',
            type: 'error'
          })
          return
        } else {
          if (result.TIME === -1 && result.ELEC === -1) {
            // 说明全部支持两个
            this.selectedPattern = 'TWO'
          } else {
            this.selectedPattern = result.TIME === -1 ? 'ELEC' : 'TIME'
          }
        }
      }

      if (this.selectedPattern === 'TWO') {
        // 弹框
        this.showPatternBoxFlag = true
        this.tempEquipmentArr = equipmentArr
      } else {
        this.$router.push({
          path: '/register',
          query: {
            deviceType: this.queryParams.equipmentType,
            equipmentArr: equipmentArr,
            communication: equipmentType[0],
            chargePattern: this.selectedPattern
          }
        })
      }
    },
    checkChargePattern() {
      var param = {
        TIME: -1,
        ELEC: -1,
        TWO: -1
      }
      this.arrCDZChargePattern = []
      this.selectList.forEach(i => {
        if (i.billingModel.length > 1) {
          param.TWO = 0
          if (this.arrCDZChargePattern.length === 0) {
            i.billingModel.forEach(item => {
              this.arrCDZChargePattern.push(item.name)
            })
          }
        }
        if (i.billingModel.length === 1) {
          param[i.billingModel[0].name]++
        }
      })

      return param
    }
  }
}
</script>

<style scoped>
/*
  计费模式弹框
  */
.s-charge-pattern-panel {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.1);
}
.s-charge-pattern-box {
  position: absolute;
  width: 250px;
  height: 250px;
  background-color: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.s-charge-pattern-panel .title {
  color: #000;
  text-align: center;
  padding: 10px;
}
.charge-pattern-box {
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 8px;
}
.s-charge-pattern-panel .s-sel-charge-pattern {
  padding: 10px;
}
.s-charge-pattern-panel > div {
  /* padding: 0.1rem; */
}
.s-charge-pattern-panel .pattern-content {
  flex: 1;
  /* margin-left: 0.1rem; */
}
.s-charge-pattern-panel .icon {
  width: 30px;
  height: 30px;
  background-image: url('./images/noselect.png');
  background-repeat: no-repeat;
  background-size: 25px 25px;
}
.s-charge-pattern-panel .line {
  width: 600px;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
}
.s-charge-pattern-panel .btn-panel {
  position: fixed;
  bottom: 0;
  display: -webkit-flex;
  display: flex;
  padding: 15px;
  width: 100%;
  justify-content: center;
  text-align: center;
}

.s-charge-pattern-panel .btn-panel > div {
  flex: 1;
  color: #317cff;
}

.s-charge-pattern-panel .charge-pattern-box.active > .icon {
  background-image: url('./images/select.png');
}
</style>
