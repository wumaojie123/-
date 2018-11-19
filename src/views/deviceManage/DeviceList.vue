<template>
  <el-main class="agent-list-container">
    <el-form ref="form" :model="form" label-width="106px" class="deviceForm">
      <el-row>
        <el-col :span="8">
          <el-form-item label="设备编号" prop="equipmentId">
            <el-row>
              <el-col :span="11" >
                <el-input-number
                  :controls="false"
                  :min="1"
                  v-model="form.startEquipmentId"
                  style="width: 100%;"
                  label="设备编号"/>
              </el-col>
              <el-col :span="2">
                <div style="text-align: center;">-</div>
              </el-col>
              <el-col :span="11" >
                <el-input-number
                  :controls="false"
                  :min="1"
                  v-model="form.endEquipmentId"
                  style="width: 100%;"
                  label="设备编号"/>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设备状态" prop="groupNumber">
            <!--<el-input v-model="form.groupNumber" placeholder="请输入机台号"/>-->
            <el-select v-model="form.groupNumber" placeholder="请选择">
              <el-option
                v-for="item in disableOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="场地名称" prop="groupName">
            <el-input v-model="form.groupName" placeholder="请输入场地名称"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="代理/商家名称" prop="agentUserName">
            <el-input v-model="form.agentUserName" placeholder="请输入代理/商家名称名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设备类型" prop="equipmentTypeName">
            <el-select v-model="form.equipmentTypeName" placeholder="请选择">
              <el-option
                v-for="item in equipmentTypeName"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="在线状态" prop="isOnline">
            <el-select v-model="form.isOnline" placeholder="请选择">
              <el-option
                v-for="item in isOnline"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="filter-container">
      <el-button v-waves type="primary" icon="el-icon-search" @click="handleBtn('find')">查询</el-button>
      <el-button v-waves style="margin-left: 10px;" type="primary" icon="el-icon-delete" @click="handleBtn('clear')">清空查询</el-button>
      <el-button style="margin-left: 10px;" type="primary" icon="el-icon-view" @click="handleCreateQRCode()">查看二维码</el-button>
      <el-button v-waves type="primary" icon="el-icon-download" @click="importQrcode('pay')">导出支付二维码</el-button>
      <el-button v-waves style="margin-left: 10px;" type="primary" icon="el-icon-download" @click="importQrcode('register')">导出注册二维码</el-button>
      <el-button v-waves style="margin-left: 10px;" type="primary" icon="el-icon-goods" @click="disabledEquipment('disable')">禁用设备</el-button>
      <el-button style="margin-left: 10px;" type="primary" icon="el-icon-view" @click="disabledEquipment('enable')">解除禁用</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      :height="minHeightTable"
      border
      stripe
      fit
      highlight-current-row
      style="width: 100%;margin-top: 20px;">
      <el-table-column label="" align="center" width="65">
        <template slot-scope="scope">
          <el-radio :label="scope.row.equipmentId" v-model="checked" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column label="设备编号" align="center" prop="equipmentId">
        <template slot-scope="scope">
          <span>{{ scope.row.equipmentId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="禁用状态" align="center">
        <template slot-scope="scope">
          <span>{{ `未禁用` }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备机台号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.groupNumber || '' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="场地名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.groupName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备类型" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.equipmentTypeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="代理/商家名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.agentUserName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类别" align="center">
        <template slot-scope="scope">
          <span>{{ `代理商` }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="区域" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.districtName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册状态" align="center">
        <template slot-scope="scope">
          <span>{{ `已注册` }}</span>
        </template>
      </el-table-column>
      <el-table-column label="在线状态" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.online ? '在线' : '离线' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="固件版本" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.firmwareVersion }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        v-show="total>0"
        :current-page="listQuery.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.limit"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
    <div v-show="showQR" class="mask-box" @click.stop="showQR = !showQR" >
      <div class="wrapper" @click.stop="" >
        <div class="close" @click.stop="showQR = !showQR">X</div>
        <h2>请用微信或支付宝扫描二维码</h2>
        <canvas id="canvas"/>
        <p>{{ checkedRow.equipmentId }}</p>
        <p>{{ checkedRow.groupNumber ? checkedRow.groupNumber + '号机' : '' }}{{ checkedRow.groupName ? '(' + checkedRow.groupName + ')': '' }}</p>
        <p>{{ checkedRow.equipmentTypeName }}</p>
      </div>
    </div>
  </el-main>
</template>

<script>
import { getDeviceList } from '@/api/getDeviceList'
import { getDeviceType } from '@/api/getEquiedType'
import waves from '@/directive/waves' // 水波纹指令
import QRCode from 'qrcode'
const calendarTypeOptions = [
  { key: 0, display_name: '冻结' },
  { key: 1, display_name: '激活' }
]
export default {
  name: 'DeviceList',
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      showQR: false,
      list: null,
      minHeightTable: 550,
      total: null,
      listLoading: true,
      disableOptions: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 1,
          label: '正常'
        },
        {
          value: 0,
          label: '已禁用'
        }
      ],
      basicConfig: {
        machineUrl: 'https://m.leyaoyao.com/customer/message/t/',
        gashaponUrl: 'https://m.leyaoyao.com/customer/message/g/',
        childUrl: 'https://m.leyaoyao.com/customer/message/c/'
      },
      isOnline: [
        {
          label: '全部',
          value: 0
        },
        {
          label: '在线',
          value: 1
        },
        {
          label: '离线',
          value: 2
        }
      ],
      equipmentTypeName: [],
      form: {
        startEquipmentId: 0,
        endEquipmentId: 1,
        deviceName: '',
        groupNumber: '',
        groupName: '',
        agentUserName: '',
        equipmentTypeName: '',
        isOnline: ''
      },
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      calendarTypeOptions,
      checked: false,
      checkedRow: {},
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
    getDeviceType().then(res => {
      const types = res.data
      if (types && types.length !== 0) {
        types.forEach(item => {
          item.label = item.equipmenttypename
          item.value = item.equipmenttypename
        })
      }
      this.equipmentTypeName = types
    })
    const clientHeight = document.body.clientHeight || document.documentElement.clientHeight
    this.minHeightTable = clientHeight - 334
    console.log(this.minHeightTable, clientHeight)
  },
  methods: {
    // 导出二维码
    importQrcode(type) {
      console.log(type)
      this.$alert('仅支持导出同一种设备类型的二维码，请重新勾选。', '温馨提示', {
        confirmButtonText: '知道了'
      })
    },
    // 解除禁用
    disabledEquipment(type) {
      console.log(type)
      if (type === 'disable') {
        this.$confirm('禁用设备后，用户将无法付款启动该设备。你可以通过“解除禁用”来恢复使用。\n 确定要禁用设备吗？', '温馨提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(() => {
            this.$message({
              type: 'info',
              message: '保存修改'
            })
          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: action === 'cancel'
                ? '放弃保存并离开页面'
                : '停留在当前页面'
            })
          })
      } else if (type === 'enable') {
        this.$confirm('确定要解除禁用吗？', '温馨提示', {
          confirmButtonText: '确定',
          // center: true,
          cancelButtonText: '取消'
        })
      }
    },
    handleChange() {
      console.log(999)
    },
    createQRCode() {
      const canvas = document.getElementById('canvas')
      let url
      console.log(this.checkedRow.equipmentTypeName)
      if (this.checkedRow.equipmentTypeName === '儿童类') {
        url = this.basicConfig.childUrl
      } else if (this.checkedRow.equipmentTypeName === '扭蛋机') {
        url = this.basicConfig.gashaponUrl
      } else {
        url = this.basicConfig.machineUrl
      }
      QRCode.toCanvas(canvas, url + this.checkedRow.equipmentId, {
        width: 200,
        height: 200
      })
    },
    handleCreateQRCode() {
      if (!this.checkedRow || !this.checkedRow.equipmentId) {
        this.$message({
          message: '请选择要生成二维码的设备！',
          type: 'warning'
        })
        return
      }
      this.showQR = !this.showQR
      this.createQRCode()
    },
    getTemplateRow(index, row) {
      // 获取选中数据
      // this.checked = true
      console.log(row)
      this.checkedRow = row
    },
    getList() {
      this.listLoading = true
      this.form.pageSize = this.listQuery.limit
      this.form.pageIndex = this.listQuery.page
      getDeviceList(this.form).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.checkedRow = {}
        this.checked = false
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleBtn(type) {
      if (type === 'find') { // 新增代理商
        if (this.form.startEquipmentId > this.form.endEquipmentId) {
          this.$alert('设备编号请按从小到大的顺序输入。', '温馨提示', {
            confirmButtonText: '知道了'
          })
          return
        } else if (this.form.startEquipmentId + 100 < this.form.endEquipmentId) {
          this.$alert('支持连号查询，一次最多可查询100个。', '温馨提示', {
            confirmButtonText: '知道了'
          })
          return
        }
        this.getList()
      } else if (type === 'clear') {
        this.$refs.form.resetFields()
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  /* + 是兄弟选择器,获取选中后的label元素*/
  input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
    -webkit-appearance: none !important;
  }
  /* chrome */
  input[type="number"]{
    -moz-appearance:textfield!important;/* firefox */
  }
  .mask-box{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 8888;
    background-color: rgba(0,0,0,.5);
    .wrapper{
      position: absolute;
      min-width: 300px;
      left: 50%;
      top: 50%;
      background-color: #fff;
      padding: 20px;
      transform: translate(-50%,-50%);
      .close{
        font-size: 16px;
        position: absolute;
        top: 14px;
        cursor: pointer;
        right: 20px;
      }
      h2{
        font-size: 16px;
        color: #666;
        padding-bottom: 20px;
      }
      canvas{
        display: block;
        margin: 0 auto;
      }
      p{
        padding-top: 10px;
        font-size: 14px;
        color: #666;
        text-align: center;
      }
    }
  }
  .agent-list-container{
    padding-right: 30px;
  }
  .filter-container{
    .item{
      display: inline-block;
      .el-input{
        margin-bottom: 0;
      }
      .label{
        margin-right: 10px;
        vertical-align: middle;
        font-weight: 700;
      }
    }
  }

</style>
