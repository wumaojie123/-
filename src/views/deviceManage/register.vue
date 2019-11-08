<template>
  <div class="content-area">
    <h1 style="margin: 10px 0px;">
      注册设备：已选{{ equipmentArr.length }}台；
      设备类型：{{ deviceType | deviceFilter }}；
      通信方式：{{ communication | communicationFilter }}；
      <span v-if="communication==2">
        计费方式：{{ chargePatternText }}
      </span>
    </h1>
    <div v-if="deviceType != 'SHJ'">
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
        <el-table-column type="selection" width="55"/>
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
              key="2"
              v-model="modalData.electric"
              placeholder="请输入电量"
              type="tel"
              class="input-300"
              clearable
            />
          </el-form-item>
          <el-form-item v-if="chargePattern!=='ELEC'" key="TIME" label="时长(分钟)" prop="serviceTime">
            <el-input
              key="1"
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
    <div v-else>
      <div class="shj-list">
        <p class="distributor-name">绑定商家（13760651286）</p>
        <div class="table-title-info">
          <span>选择投放场地</span>
          <el-button type="primary" @click="showAddGroupNameModal">添加投放场地</el-button>
        </div>
        <el-table
          :data="shjList"
          border
          highlight-current-row
          style="width: 100%;margin-bottom: 20px;"
          height="400"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"/>
          <el-table-column
            v-for="(item, index) in shjColums"
            :key="index"
            :prop="item.key"
            :label="item.label"
            :width="item.width"
            :sortable="item.sortable"
            align="center"
          />
        </el-table>
        <div style="text-align:center;">
          <div style="color: red;margin-bottom: 20px;">注：设备注册成功后，设备绑定在所选的商家场地下。</div>
          <el-button @click="handleCancel">取消</el-button>
          <el-button style="margin-left: 20px;" type="primary" @click="handleBatchShjSave">完成</el-button>
        </div>
        <AddGroupModal
          :visible.sync="visible.groupModal"
          @closeAddGroupModal="closeAddGroupModal"
          @confirmAddGroupName="confirmAddGroupName"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import {
    agentGroupServiceList,
    batchRegisteredEquipment,
    merchants,
    factoryGroupListApi
  } from '@/api/device'

  import { priceCheck, serviceTimeCheck, conisCheck } from '@/utils/rules'
  import { deviceMapInfo, communicationMap } from './constant'
  import verfyCode from './component/verfyCode'
  import AddGroupModal from './component/addGroupModal'
  // import { mul } from '@/utils/index'
  const validateElectric = (rule, value, callback) => {
    if (/^-?\d+\.?\d{0,3}$/.test(value) && value < 9.99 && value > 0) {
      callback()
    } else {
      callback(new Error('电量必须为大于0的正数，电量需小于9.99，最多三位小数'))
    }
  }
  export default {
    components: {
      verfyCode,
      AddGroupModal
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
        shjList: [],
        colums: [
          { key: 'description', label: '套餐名称' },
          { key: 'price', label: '价格(元)' },
          { key: 'serviceTime', label: '时长(分钟)' },
          { key: 'coins', label: '模拟投币数' }
        ],
        shjColums: [
          { key: 'groupName', label: '场地名称' },
          { key: 'isDefault', label: '是否默认' },
          { key: 'zone', label: '地区' },
          { key: 'address', label: '详细地址' }
        ],
        pageInfo: { total: 0 },
        selectList: [],
        dialogFormVisible: false,
        deviceType: '',
        equipmentArr: [],
        communication: '',
        modalData: {
          description: '',
          price: '',
          coins: '',
          serviceTime: '',
          electric: ''
        },
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
        chargePattern: '',
        visible: {
          groupModal: false
        }
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
      this.lyyDistributorId = this.$route.query.lyyDistributorId
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
      closeAddGroupModal() {
        this.visible.groupModal = false
      },
      getZoneList() {
        this.$store.dispatch('GetAreaList')
      },
      async showAddGroupNameModal() {
        await this.getZoneList()
        this.visible.groupModal = true
      },
      async confirmAddGroupName() {
        await this.closeAddGroupModal()
        await this.getGroupNameList()
      },
      // 售货机-获取场地列表
      async getGroupNameList() {
        const postData = {
          pageSize: 400,
          pageIndex: 1,
          lyyDistributorId: 1032498
        }
        const res = await factoryGroupListApi(postData)
        if (res.result === 0) {
          if (res.data) {
            const shjList = res.data.items || []
            this.shjList = shjList.map((v, i) => {
              return {
                ...v,
                zone: `${v.provinceName}${v.cityName}${v.district}`
              }
            })
            this.pageInfo.total = res.data.total || 0
          } else {
            this.pageInfo.total = 0
          }
        }
      },
      // 查询服务套餐
      async queryList() {
        // 售货机逻辑
        if (this.deviceType === 'SHJ') {
          this.getGroupNameList()
          return
        }
        // 非售货机逻辑
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
            item.label = `${item.account}${item.name}`
            return item
          })
          this.merchantList = list
        }
      },
      handleSelectionChange(value) {
        this.selectList = value
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
              if (this.chargePattern === 'ELEC') {
                this.modalData.serviceTime = Math.round(
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
        this.phoneNumber = selectInfo.account
        this.name = selectInfo.name
        this.handleSaveModal()
        // this.verfyCodeVisible = true
      },
      async handleBatchSave() {
        if (this.clickDisabled) {
          return
        }
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
        this.phoneNumber = selectInfo.account
        this.name = selectInfo.name
        const params = {
          communication: this.communication,
          equipmentType: this.deviceType,
          values: this.equipmentArr,
          lyyDistributorId: this.lyyDistributorId,
          lyyGroupServices: this.selectList,
          billing: this.chargePattern
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
      handleBatchShjSave() {
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
