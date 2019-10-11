<template>
  <div class="content-area">
    <section style="padding: 10px 0;font-size: 16px;">
      <span>设备编号: {{ queryString.equipmentType | deviceMapFilter }} {{ queryString.value }}</span>
    </section>
    <!-- 列表 -->
    <div style="margin: 10px 0;font-size: 16px;">设备型号设置<span style="color: #888;">（请选择与主板匹配的型号）</span></div>
    <el-table :data="list" border highlight-current-row style="width: 100%;margin-bottom: 20px;" height="500">
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-radio
            :label="scope.$index"
            v-model="check"
            @change.native="getTemplateRow(scope.$index)"
          >&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="设备型号"
        align="center">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <p size="medium">{{ scope.row.title }}<span v-if="scope.row.check" class="model-default">当前</span></p>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 20px 40px 0 80px;">
      <el-button type="success" @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="updateModel">保存</el-button>
    </div>
    <verfyCode v-model="verfyCodeVisible" :phone-number="phoneNumber" :name="name" @on-OK="update"/>
  </div>
</template>

<script>
import { protocolList, updateEquipmentModel, checkBillingModel } from '@/api/device'
import verfyCode from './component/verfyCode'

export default {
  components: {
    verfyCode
  },
  filters: {
    deviceMapFilter(val) {
      const map = { 'XYJ': '洗衣机', 'CDZ': '充电桩' }
      return map[val]
    }
  },
  data() {
    return {
      check: -1,
      queryString: {},
      list: [],
      selectItems: [],
      protocolId: '',
      accountId: '',
      billingModel: '',
      verfyCodeVisible: false,
      phoneNumber: '',
      name: '',
      isShowDialog: false,
      deviceWorkType: ''
    }
  },
  created() {
    this.queryString = this.$route.query
    this.phoneNumber = this.$route.query.phoneNumber
    this.name = this.$route.query.name
    this.queryList()
  },
  methods: {
    queryList(page = 1) {
      this.selectItems = []
      this.list = []
      const postData = { equipmentValue: this.queryString.value }
      protocolList(postData).then(res => {
        this.listLoading = false
        if (res.data) {
          this.protocolId = res.data.protocolId
          this.accountId = res.data.accountId
          let list = res.data.list || []
          list = list.map(item => {
            if (this.protocolId === item.id) {
              item.check = true
            } else {
              item.check = false
            }
            return item
          })
          this.list = list
        }
      })
    },
    getTemplateRow(value) {
      if (this.queryString.equipmentType === 'CDZ') {
        this.check = value
        this.selectItems = [this.list[value]]
        this.checkModel()
      }
    },
    updateModel() {
      if (this.isShowDialog) {
        const map = { 'TIME': '按时长', 'ELEC': '按电量' }
        this.$confirm(`您修改的设备型号支持的计费方式为【${map[this.deviceWorkType]}计费】，与设备此前的计费方式不一致，确定后请务必联系商家前往管理后台重新添加设备服务套餐。`, '计费方式变更').then(() => {
          if (this.queryString.type === 0 || this.queryString.type === '0') {
            this.verfyCodeVisible = false
          } else if (this.queryString.type === '1' || this.queryString.type === 1) {
            this.verfyCodeVisible = true
          }
        })
      } else {
        if (this.queryString.type === '1' || this.queryString.type === 1) {
            this.verfyCodeVisible = true
        }
      }
    },
    /**
     * 跟新协议
     */
    update() {
      if (!this.selectItems.length) {
        return
      }
      const postData = {
        equipmentValue: this.queryString.value,
        billingModel: '',
        record: this.queryString.type === 1,
        protocolId: this.selectItems[0].id,
        accountId: this.accountId
      }
      if (this.isShowDialog) {
        postData.billingModel = this.deviceWorkType
      } else {
        postData.billingModel = ''
      }
      updateEquipmentModel(postData).then(res => {
        this.listLoading = false
        if (res.result === 0 && res.data === 1) {
          if (res.data === 1) {
            this.$message({ message: '修改成功', type: 'success' })
            window.history.go(-1)
          } else {
            this.$message({ message: '修改失败', type: 'error' })
          }
        }
      })
    },
    /**
     * 查询协议
     */
    checkModel() {
      this.isShowDialog = false
      const postData = {
        equipmentValue: this.queryString.value,
        protocolId: this.selectItems[0].id,
        equipmentType: 'CDZ'
      }
      checkBillingModel(postData).then(res => {
        this.listLoading = false
        if (res.result === 0) {
          if (res.description !== '0') {
            this.isShowDialog = true
            this.deviceWorkType = res.description
          } else {
            this.isShowDialog = false
          }
        }
      })
    },
    handleCancel() {
      window.history.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.model-default{
  display:inline-block;
  margin-left: 4px;
  background: red;
  color: #fff;
  font-size: 14px;
  padding: 2px 8px;
  border-radius: 4px;
}
</style>
