<template>
  <div class="content-area">
    <h1 style="margin: 10px 0px;">
      注册设备：已选{{ equipmentArr.length }}台；设备类型：{{ deviceType | deviceFilter }}；通信方式：{{ communication | communicationFilter }}
      <span
        v-if="communication==2"
      >;计费方式:{{ chargePatternText }}</span>
    </h1>
    <el-form :inline="true" label-width="100px" label-position="left">
      <el-form-item label="选择绑定商家">
        <el-select v-model="lyyDistributorId" placeholder="请选择" style="width: 300px;" filterable>
          <el-option
            v-for="item in merchantList"
            :key="item.value"
            :label="item.label"
            :value="item.adOrgId"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <div class="table-title-info">
      <span>选择服务套餐</span>
      <el-button type="primary" @click="handleSaveModal">添加其他套餐</el-button>
    </div>
    <el-table
      :data="list"
      border
      highlight-current-row
      style="width: 100%;margin-bottom: 20px;"
      height="400"
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
    <!-- <el-pagination
      :total="pageInfo.total"
      :page-sizes="[400]"
      :current-page="pageInfo.currPage"
      background
      layout="total, pager"
    />-->
    <div style="text-align:center;">
      <div style="color: red;margin-bottom: 20px;">注：设备注册成功后，设备绑定在商家的默认场地下。</div>
      <el-button @click="handleCancel">取消</el-button>
      <el-button style="margin-left: 20px;" type="primary" @click="handleBatchSave">完成</el-button>
    </div>
    <!--  -->
    <el-dialog :visible.sync="dialogFormVisible" title="编辑套餐服务" width="35%">
      <el-form
        ref="baseInfoRules"
        :model="modalData"
        :rules="baseInfoRules"
        label-width="120px"
        label-position="right"
        style="margin-top: 20px;"
      >
        <el-form-item label="套餐名称" prop="description">
          <el-input
            v-model="modalData.description"
            placeholder="请输入套餐名称"
            class="input-300"
            maxlength="10"
          />
        </el-form-item>
        <el-form-item label="价格(元)" prop="price">
          <el-input
            v-model="modalData.price"
            placeholder="请输入价格"
            type="number"
            class="input-300"
            maxlength="16"
            clearable
          />
        </el-form-item>
        <el-form-item v-if="chargePattern=='ELEC'" key="ELEC" label="电量(度)" prop="electric">
          <el-input
            v-model="modalData.electric"
            placeholder="请输入电量"
            type="tel"
            class="input-300"
            clearable
          />
        </el-form-item>
        <el-form-item v-if="chargePattern!=='ELEC'" key="TIME" label="时长(分钟)" prop="serviceTime">
          <el-input
            v-model="modalData.serviceTime"
            placeholder="请输入时长"
            type="tel"
            class="input-300"
            maxlength="6"
            clearable
          />
        </el-form-item>
        <template v-if="communication == '1' ">
          <el-form-item label="模拟投币数" prop="coins">
            <el-input
              v-model="modalData.coins"
              placeholder="请输入模拟投币数"
              type="number"
              class="input-300"
              maxlength="4"
              clearable
            />
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">保存并使用</el-button>
      </div>
    </el-dialog>
    <verfyCode
      v-model="verfyCodeVisible"
      :phone-number="phoneNumber"
      :name="name"
      @on-OK="handleBatchSave"
    />
  </div>
</template>

<script>
import {
  agentGroupServiceList,
  batchRegisteredEquipment,
  merchants
} from '@/api/device'
import { priceCheck, serviceTimeCheck, conisCheck } from '@/utils/rules'
import { deviceMapInfo, communicationMap } from './constant'
import verfyCode from './component/verfyCode'
const validateElectric = (rule, value, callback) => {
  if (/^-?\d+\.?\d{0,1}$/.test(value) && value < 50 && value > 0) {
    callback()
  } else {
    callback(new Error('电量必须为大于0的正数，电量需小于50，最多一位小数'))
  }
}
export default {
  components: {
    verfyCode
  },
  filters: {
    deviceFilter(val) {
      return deviceMapInfo[val]
    },
    communicationFilter(val) {
      return communicationMap[val]
    }
  },
  data() {
    return {
      lyyDistributorId: '',
      list: [],
      colums: [
        { key: 'description', label: '套餐名称' },
        { key: 'price', label: '价格(元)' },
        { key: 'serviceTime', label: '时长(分钟)' },
        { key: 'coins', label: '模拟投币数' }
      ],
      pageInfo: { total: 0 },
      selectList: [],
      dialogFormVisible: false,
      deviceType: '',
      equipmentArr: [],
      communication: '',
      modalData: { description: '', price: '', coins: '', serviceTime: '' },
      merchantList: [],
      baseInfoRules: {
        description: [
          { required: true, message: '请输入套餐名称', trigger: 'blur' }
        ],
        serviceTime: [
          { required: true, validator: serviceTimeCheck, trigger: 'blur' }
        ],
        coins: [{ required: true, validator: conisCheck, trigger: 'blur' }],
        price: [{ required: true, validator: priceCheck, trigger: 'blur' }],
        electric: [
          { required: true, message: '请输入电量', trigger: 'change' },
          { validator: validateElectric }
        ]
      },
      clickDisabled: false,
      verfyCodeVisible: false,
      phoneNumber: '',
      name: '',
      chargePattern: ''
    }
  },
  computed: {
    chargePatternText() {
      return this.chargePattern === 'ELEC' ? '按电量计费' : '按时长计费'
    }
  },
  created() {
    this.deviceType = this.$route.query.deviceType
    this.equipmentArr = this.$route.query.equipmentArr
    this.communication = this.$route.query.communication
    this.phoneNumber = this.$route.query.phoneNumber
    this.name = this.$route.query.name
    this.chargePattern = this.$route.query.chargePattern
    /* eslint-disable-next-line */
    if (this.communication == 2) {
      if (this.chargePattern === 'ELEC') {
        this.colums = [
          { key: 'description', label: '套餐名称' },
          { key: 'price', label: '价格(元)' },
          { key: 'electric', label: '电量(度)' }
        ]
      } else {
        this.colums = [
          { key: 'description', label: '套餐名称' },
          { key: 'price', label: '价格(元)' },
          { key: 'serviceTime', label: '时长(分钟)' }
        ]
      }
    }
    this.queryList()
    this.getMerchantList()
  },
  methods: {
    // 查询服务套餐
    async queryList() {
      this.list = []
      const postData = {
        communication: this.communication,
        equipmentType: this.deviceType,
        pageSize: 400,
        pageIndex: 1
      }
      if (this.communication === 2) {
        postData.billing = this.chargePattern === 'ELEC' ? 2 : 1
      }
      const res = await agentGroupServiceList(postData)
      if (res.result === 0) {
        this.listLoading = false
        if (res.data) {
          this.list = res.data.items || []
          this.pageInfo.total = res.data.total || 0
        } else {
          this.pageInfo.total = 0
        }
      }
    },
    async getMerchantList() {
      const res = await merchants()
      if (res.result === 0) {
        let list = res.data || []
        list = list.map(item => {
          item.label = `${item.account} ${item.name}`
          return item
        })
        this.merchantList = list
      }
    },
    handleSelectionChange(value) {
      this.selectList = value
      console.log(JSON.stringify(this.selectList))
    },
    handleSaveModal() {
      this.dialogFormVisible = true
      this.modalData = {
        description: '',
        price: '',
        coins: '',
        serviceTime: '',
        electric: ''
      }
    },
    handleSave() {
      this.$refs['baseInfoRules'].validate(valid => {
        if (valid) {
          const flag = this.list.some(
            item =>
              (this.communication === 1 &&
                parseInt(item.coins, 10) ===
                  parseInt(this.modalData.coins, 10)) ||
              (this.communication === 2 &&
                this.chargePattern !== 'ELEC' &&
                parseInt(item.serviceTime, 10) ===
                  parseInt(this.modalData.serviceTime, 10)) ||
              (this.communication === 2 &&
                this.chargePattern === 'ELEC' &&
                item.electric === this.modalData.electric)
          )
          if (flag) {
            let msg = ''
            if (this.communication === 1) {
              msg = '模拟投币数不可重复'
            } else if (this.communication === 2) {
              if (this.chargePattern === 'ELEC') {
                msg = '电量不能重复'
              } else {
                msg = '时长不能重复'
              }
            }
            this.$message({ message: msg, type: 'error' })
            return
          }
          if (this.communication === 2) {
            debugger
            if (this.chargePattern === 'ELEC') {
              this.modalData.serviceTime = parseInt(
                this.modalData.electric * 100
              )
              this.modalData.coins = this.modalData.serviceTime
            } else {
              this.modalData.coins = this.modalData.serviceTime
            }
          }
          this.list = [this.modalData].concat(this.list)
          this.selectList.push(this.modalData)
          this.dialogFormVisible = false
        } else {
          return false
        }
      })
    },
    isRepeat() {
      const arr = []
      this.selectList.forEach(item => {
        if (this.communication === 2) {
          if (this.chargePattern === 'ELEC') {
            arr.push(item.electric)
          } else {
            arr.push(item.serviceTime)
          }
        } else if (this.communication === 1) {
          arr.push(item.coins)
        }
      })
      console.log()
      if (arr.length === Array.from(new Set(arr)).length) {
        return true
      } else {
        return false
      }
    },
    handleBatchSaveBefore() {
      if (this.selectList.length === 0) {
        this.$message({ message: '请至少选择一个服务套餐', type: 'error' })
        return
      }
      if (!this.lyyDistributorId) {
        this.$message({ message: '请选择要绑定的商家', type: 'error' })
        return
      }
      if (!this.isRepeat()) {
        this.$message({ message: '服务套餐不可重复', type: 'error' })
        return
      }
      const selectInfo = this.merchantList.filter(
        item => item.adOrgId === this.lyyDistributorId
      )[0]
      console.log(selectInfo)
      this.phoneNumber = selectInfo.account
      this.name = selectInfo.name
      this.verfyCodeVisible = true
    },
    async handleBatchSave() {
      if (this.clickDisabled) {
        return
      }
      const params = {
        communication: this.communication,
        equipmentType: this.deviceType,
        values: this.equipmentArr,
        lyyDistributorId: this.lyyDistributorId,
        lyyGroupServices: this.selectList
      }
      if (!Array.isArray(this.equipmentArr)) {
        params.values = [this.equipmentArr]
      }
      this.clickDisabled = true
      setTimeout(() => {
        this.clickDisabled = false
      }, 3000)
      const res = await batchRegisteredEquipment(params)
      if (res.result === 0) {
        this.verfyCodeVisible = false
        this.$message({
          message: '设备注册记录可查看设备注册进度',
          type: 'success'
        })
        this.handleCancel()
      } else {
        this.$message({
          message: '设备注册失败，请重新选择设备',
          type: 'error'
        })
      }
    },
    handleCancel() {
      window.history.go(-1)
    }
  }
}
</script>

<style>
.content-area {
  font-size: 14px;
}
.table-title-info {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  padding-right: 140px;
  align-items: center;
}
</style>
