<template>
  <div class="content-area">
    <div class="table-title-info">
      <span>设备编号:{{ lyyEquipmentValue }}</span>
      <!-- modify by lss 20190903 -->
      <template v-if="communication==2">
        <el-select v-model="billing" :disabled="billingMap.length<=1" @change="setBilling">
          <el-option
            v-for="(item,index) in defineBillingMap"
            :key="index"
            :label="item.label"
            :value="item.val"
          />
        </el-select>
      </template>
      <el-button type="primary" @click="handleSaveModal">添加套餐套餐</el-button>
    </div>
    <el-table
      :data="list"
      border
      highlight-current-row
      style="width: 100%;margin-bottom: 20px;"
      height="500"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-for="(item, index) in colums"
        :key="index"
        :prop="item.key"
        :label="item.label"
        :width="item.width"
        :sortable="item.sortable"
        align="center"
      />
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleSelectionChange(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="delServiceBefore(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    <!--  -->
    <el-dialog :visible.sync="dialogFormVisible" title="编辑套餐服务" width="35%" @close="onClose">
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
            maxlength="7"
            clearable
          />
        </el-form-item>
        <el-form-item v-if="billing=='ELEC'" key="ELEC" label="电量(度)" prop="electric">
          <el-input v-model="modalData.electric" placeholder="请输入电量" class="input-300" clearable />
        </el-form-item>
        <el-form-item v-if="billing!=='ELEC'" key="TIME" label="时长(分钟)" prop="serviceTime">
          <el-input
            v-model="modalData.serviceTime"
            placeholder="请输入时长"
            type="tel"
            class="input-300"
            maxlength="4"
            clearable
          />
        </el-form-item>
        <template v-if="communication != '2' ">
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
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="handleSaveBefore">保存并使用</el-button>
      </div>
    </el-dialog>
    <verfyCode
      v-model="verfyCodeVisible"
      :phone-number="phoneNumber"
      :name="name"
      @on-OK="handleCheck"
    />
  </div>
</template>

<script>
import {
  saveEquipmentService,
  groupServiceList,
  dateleEquipmentService,
  updateEquipmentService,
  batchRegisteredEquipment,
  updateChargePattern,
  getChargePattern
} from '@/api/device'
import { priceCheck, serviceTimeCheck, conisCheck } from '@/utils/rules'
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
  data() {
    return {
      lyyDistributorId: '',
      list: [],
      // colums: [
      //   { key: 'description', label: '套餐名称' },
      //   { key: 'price', label: '价格(元)' },
      //   { key: 'serviceTime', label: '时长(分钟)' },
      //   { key: 'coins', label: '模拟投币数' }
      // ],
      pageInfo: { total: 0, pageSize: 10, pageIndex: 1 },
      selectList: [],
      dialogFormVisible: false,
      lyyEquipmentId: '',
      modalData: {
        description: '',
        price: '',
        coins: '',
        serviceTime: '',
        electric: ''
      },
      lyyDistributorList: [],
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
      type: '',
      communication: '',
      verfyCodeVisible: false,
      phoneNumber: '',
      name: '',
      actionType: '',
      handleItemData: {},
      lyyEquipmentValue: '',
      // modify by lss 20190903 新增属性
      defineBillingMap: [
        { label: '按时长计费', val: 'TIME' },
        { label: '按电量计费', val: 'ELEC' }
      ],
      billingMap: [
        { label: '按时长计费', val: 'TIME' },
        { label: '按电量计费', val: 'ELEC' }
      ],
      billing: 'TIME',
      tempBilling: ''
    }
  },
  computed: {
    colums() {
      if (this.communication !== 2) {
        return [
          { key: 'description', label: '套餐名称' },
          { key: 'price', label: '价格(元)' },
          { key: 'serviceTime', label: '时长(分钟)' },
          { key: 'coins', label: '模拟投币数' }
        ]
      } else {
        if (this.billing === 'ELEC') {
          return [
            { key: 'description', label: '套餐名称' },
            { key: 'price', label: '价格(元)' },
            { key: 'electric', label: '电量(度)' }
          ]
        } else {
          return [
            { key: 'description', label: '套餐名称' },
            { key: 'price', label: '价格(元)' },
            { key: 'serviceTime', label: '时长(分钟)' }
          ]
        }
      }
    }
  },
  created() {
    this.lyyEquipmentId = this.$route.query.lyyEquipmentId
    this.lyyEquipmentValue = this.$route.query.value
    this.communication = this.$route.query.communication
    this.phoneNumber = this.$route.query.phoneNumber
    this.name = this.$route.query.name
    // modify by lss 20190903
    this.billing = this.$route.query.billing
    this.tempBilling = this.billing
    /* eslint-disable-next-line */
    if (this.communication === 2) {
      // 查询协议
      // this.queryChargePattern()
    }
    this.queryList()
  },
  methods: {
    onClose() {
      this.dialogFormVisible = false
      this.verfyCodeVisible = false
      this.$refs['baseInfoRules'].resetFields()
    },
    /**
     * 切换计费模式
     */
    setBilling() {
      var changedBilling = this.billing
      if (this.billing === this.tempBilling) {
        return
      }
      this.billing = this.tempBilling
      this.$confirm('切换计费方式后，将会清空服务套餐', '温馨提示')
        .then(() => {
          this.billing = changedBilling
          this.tempBilling = this.billing
          this.updateChargePattern(this.billing)
        })
        .catch(() => {
          console.log('💔')
        })
    },
    /**
     * 获取计费模式
     */
    async queryChargePattern() {
      var params = {
        equipmentValue: this.lyyEquipmentId
      }
      const res = await getChargePattern(params)
      if (res.result === 0) {
        var obj = res.data
        var list = obj.protocolList || []
        list.forEach(i => {
          this.arrCDZChargePattern.push(i.name)
        })
        if (this.billingMap.length === 1) {
          if (this.billingMap[0].val !== this.billing) {
            this.$confirm(
              '设备所支持的计费方式发生变更，请重新设置服务套餐',
              '温馨提示',
              { showCancelButton: false }
            ).then(action => {
              if (action) {
                this.updateChargePattern(this.billingMap[0].val)
              }
            })
          }
        }
      }
    },
    async updateChargePattern(groupServiceCostWay) {
      var params = { equipmentValue: this.lyyEquipmentId, groupServiceCostWay }
      var res = await updateChargePattern(params)
      if (res.result === 0) {
        this.billing = groupServiceCostWay
        this.tempBilling = this.billing
        this.list = []
      }
    },
    // 查询服务套餐
    async queryList() {
      this.list = []
      const postData = {
        lyyEquipmentId: this.lyyEquipmentId,
        pageSize: this.pageInfo.pageSize,
        pageIndex: this.pageInfo.pageIndex
      }
      const res = await groupServiceList(postData)
      if (res.result === 0) {
        this.listLoading = false
        if (res.data) {
          this.list = res.data.items || []
          this.pageInfo.total = res.data.total || 0
        } else {
          this.pageInfo.total = 0
        }
      }
      // modify by lss 20190903
      if (this.communication === 2) {
        if (
          this.billingMap.length === 1 &&
          this.billing !== this.billingMap[0].val
        ) {
          this.list = []
        }
      }
    },
    handleSelectionChange(value) {
      this.actionType = 'add'
      this.verfyCodeVisible = false
      this.type = 'modify'
      this.modalData = JSON.parse(JSON.stringify(value))
      this.dialogFormVisible = true
    },
    handleSaveModal() {
      this.type = 'add'
      this.actionType = 'add'
      this.dialogFormVisible = true
      this.modalData = {
        description: '',
        price: '',
        coins: '',
        serviceTime: '',
        electric: ''
      }
    },
    handleSaveBefore() {
      this.$refs['baseInfoRules'].validate(async valid => {
        if (valid) {
          this.verfyCodeVisible = true
        }
      })
    },
    handleCheck() {
      if (this.actionType === 'add') {
        this.handleSave()
      } else {
        this.verfyCodeVisible = false
        this.delService()
      }
    },
    handleSave() {
      this.$refs['baseInfoRules'].validate(async valid => {
        if (valid) {
          const postData = {
            serviceTime: this.modalData.serviceTime,
            lyyEquipmentId: this.lyyEquipmentId
          }
          if (this.communication === 1) {
            postData.coins = this.modalData.coins
          }
          if (this.type === 'add') {
            const params = this.modalData
            if (this.communication === 2) {
              if (this.billing !== 'ELEC') {
                params.coins = params.serviceTime
              } else {
                params.coins = parseInt(params.electric * 100)
              }
            }
            params.lyyEquipmentId = this.lyyEquipmentId
            const res = await saveEquipmentService(params)
            if (res.result === 0) {
              this.verfyCodeVisible = false
              this.$message({ message: '添加服务套餐成功', type: 'success' })
              this.queryList(1)
              this.dialogFormVisible = false
            } else {
              this.$message({ message: '添加服务套餐失败', type: 'error' })
            }
          } else if (this.type === 'modify') {
            //
            const params = this.modalData
            if (this.communication === 2) {
              params.coins = params.serviceTime
            }
            if (this.billing !== 'ELEC') {
              params.coins = params.serviceTime
            } else {
              params.coins = parseInt(params.electric * 100)
            }
            params.lyyEquipmentId = this.lyyEquipmentId
            const res = await updateEquipmentService(params)
            if (res.result === 0) {
              this.verfyCodeVisible = false
              this.$message({ message: '更新服务套餐成功', type: 'success' })
              this.queryList(1)
              this.dialogFormVisible = false
            }
          }
        } else {
          return false
        }
      })
    },
    async handleBatchSave() {
      if (this.selectList.length === 0) {
        this.$message({ message: '请至少选择一个服务套餐', type: 'error' })
        return
      }
      const params = {
        communication: this.communication,
        equipmentType: this.deviceType,
        values: this.equipmentArr,
        lyyDistributorId: this.lyyDistributorId
      }
      const res = await batchRegisteredEquipment(params)
      if (res.result === 0) {
        this.$message({ message: '请至少选择一个服务套餐', type: 'error' })
      }
    },
    delServiceBefore(item) {
      this.verfyCodeVisible = true
      this.actionType = 'del'
      this.handleItemData = JSON.pase(JSON.stringify(item))
    },
    // 删除服务套餐
    delService() {
      this.$confirm('确定要删除该服务套餐吗？', '删除服务套餐').then(
        async() => {
          const res = await dateleEquipmentService({
            lyyGroupServiceId: this.handleItemData.lyyGroupServiceId
          })
          if (res.result === 0) {
            this.$message({ message: '删除套餐成功', type: 'success' })
            this.queryList(1)
          } else {
            this.$message({ message: '删除套餐失败', type: 'error' })
          }
        }
      )
    },
    handleSizeChange(pageSize) {
      this.pageInfo.pageSize = pageSize
      this.pageInfo.total = 0
      this.queryList(1)
    },
    handleCurrentChange(page) {
      this.queryList(page)
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
