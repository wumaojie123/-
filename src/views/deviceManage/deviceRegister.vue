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
          placeholder="输入设备编号"
          class="input-300"
          maxlength="100"
          clearable
        />
        <el-button type="primary" icon="el-icon-search" @click="filerQueryList">查询</el-button>
        <el-button type="primary" @click="handlePage(1)">设备参数设置</el-button>
        <el-button type="primary" @click="handlePage(2)">设备服务套餐</el-button>
        <el-button type="primary" @click="handlePage(3)">解绑设备</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table :data="list" border highlight-current-row style="width: 100%;margin-bottom: 20px;">
      <el-table-column label="操作" width="55" align="center">
        <template slot-scope="scope">
          <el-radio
            :label="scope.$index"
            v-model="check"
            @change.native="getTemplateRow(scope.$index)"
          >&nbsp;</el-radio>
        </template>
      </el-table-column>
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
  </div>
</template>

<script>
import { registeredList } from '@/api/device'
import { deviceMap, deviceMapInfo } from './constant'

export default {
  data() {
    return {
      check: -1,
      queryParams: { equipmentType: 'CDZ', equipmentValue: '', registered: 1 },
      list: [],
      deviceMapInfo: deviceMap,
      colums: [
        { key: 'value', label: '设备编号' },
        // { key: 'isLyyOpen', label: '开发平台' },
        // { key: 'interfaceFlag', label: '接口板' },
        // { key: 'loginFlag', label: '登录表示' },
        { key: 'equipmentTypeText', label: '设备类型' },
        { key: 'communicationText', label: '通信方式' },
        { key: 'chargePattern', label: '计费方式' },
        { key: 'equipmentParam', label: '设备参数' },
        { key: 'groupNumber', label: '机台号' },
        { key: 'signalText', label: '信号' },
        { key: 'onlineText', label: '在线状态' },
        { key: 'statusText', label: '禁用状态' },
        { key: 'account', label: '账号' },
        { key: 'distributor', label: '商家名称' },
        { key: 'area', label: '区域' },
        { key: 'registerDate', label: '注册时间' }
      ],
      pageInfo: { total: 0, pageSize: 10, currPage: 1 },
      selectItems: [],
      equipmentTypesArr: deviceMap
    }
  },
  created() {
    this.queryList()
  },
  methods: {
    getChargePatternText(model) {
      const chargePatternMap = {
        TIME: '按时长计费',
        ELEC: '按电量计费'
      }
      model = model || []
      var text = ''
      model.forEach(i => {
        text += chargePatternMap[i.name] + ','
      })
      if (text !== '') {
        text = text.substr(0, text.length - 1)
      }
      return text
    },
    queryList(page = 1) {
      this.selectItems = []
      this.list = []
      this.pageInfo.currPage = page
      const postData = {
        pageSize: this.pageInfo.pageSize,
        pageIndex: this.pageInfo.currPage
      }
      for (const key in this.queryParams) {
        postData[key] = this.queryParams[key]
      }
      registeredList(postData).then(res => {
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
            const communicationMap = { 0: '无', 1: '脉冲', 2: '串口' }
            // const chargePatternMap = {
            //   TIME: '按时长计费',
            //   ELEC: '按电量计费'
            // }
            item.communicationText = communicationMap[item.communication]
            if (item.communication !== 2) {
              item.chargePattern = '--'
            } else {
              item.chargePattern = this.getChargePatternText(item.billingModel)
              item.billing = item.billingModel[0].name
            }
            const equipmentTypeMap = deviceMapInfo
            item.equipmentTypeText = equipmentTypeMap[item.equipmentType]
            const onlineMap = { 0: '不在线', 1: '在线' }
            item.onlineText = onlineMap[item.online]
            const statusMap = { disabled: '禁用', '1Normal': '启用' }
            item.statusText = statusMap[item.status]
            const signalMap = { 1: '弱', 2: '中', 3: '强', 4: '很强' }
            item.signalText = signalMap[item.signal] || '中'
            item.groupNumber = item.groupNumber
              ? `${item.groupNumber}号机`
              : '未设置'
            return item
          })
          this.list = list
          this.pageInfo.total = res.data.total || 0
        } else {
          this.pageInfo.total = 0
        }
      })
    },
    getTemplateRow(value) {
      this.check = value
      this.selectItems = [this.list[value]]
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
    handlePage(type) {
      if (this.selectItems.length === 1) {
        const data = this.selectItems[0]
        if (type === 1) {
          if (data.online === 0) {
            this.$message({ message: '设备离线', type: 'error' })
            return
          }
          if (this.selectItems[0].isLyyOpen === 1) {
            this.$router.push({
              path: '/deviceParamsLyyOpen',
              query: {
                uniqueCode: data.uniqueCode,
                name: data.distributor,
                phoneNumber: data.account
              }
            })
            return
          }
          if (this.selectItems[0].interfaceFlag) {
            this.$router.push({
              path: '/deviceParamsTy',
              query: {
                uniqueCode: data.uniqueCode,
                loginFlag: data.loginFlag,
                name: data.distributor,
                phoneNumber: data.account
              }
            })
          } else {
            const query = {
              value: data.value,
              typeValue: data.equipmentType,
              equipmentTypeName: data.equipmentTypeName,
              name: data.distributor,
              phoneNumber: data.account
            }
            if (
              data.loginFlag === 5 ||
              data.loginFlag === 7 ||
              data.loginFlag === 14 ||
              data.loginFlag === 16
            ) {
              this.$router.push({ path: '/deviceParamsDBJ', query: query })
            } else if (
              /^(AMY)|(AMD)|(ZLJ)|(XYJ)|(CDZ)$/.test(data.equipmentType)
            ) {
              this.$router.push({ path: '/deviceLifeParams', query: query })
            } else {
              this.$router.push({ path: '/deviceParamsOthers', query: query })
            }
          }
        } else if (type === 2) {
          if (data.online === 0) {
            this.$message({ message: '设备离线', type: 'error' })
            return
          }
          this.$router.push({
            path: '/deviceServiceEdit',
            query: {
              value: this.selectItems[0].value,
              lyyEquipmentId: this.selectItems[0].lyyEquipmentId,
              equipmentType: this.queryParams.equipmentType,
              communication: this.selectItems[0].communication,
              name: data.distributor,
              phoneNumber: data.account,
              billing: data.billing
            }
          })
        } else if (type === 3) {
          this.$router.push({
            path: '/unregister',
            query: {
              lyyEquipmentId: this.selectItems[0].lyyEquipmentId,
              value: this.selectItems[0].value,
              equipmentType: this.queryParams.equipmentType,
              name: data.distributor,
              phoneNumber: data.account
            }
          })
        }
      } else if (this.selectItems.length > 1) {
        this.$message({ message: '请选择设备', type: 'error' })
      } else {
        this.$message({ message: '请选择设备', type: 'error' })
      }
    }
  }
}
</script>
