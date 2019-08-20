<template>
  <div class="content-area">
    <div class="table-title-info">
      <span>设备编号:{{ lyyEquipmentId }}</span>
      <el-button type="primary" @click="handleSaveModal">添加套餐套餐</el-button>
    </div>
    <el-table :data="list" border highlight-current-row style="width: 100%;margin-bottom: 20px;" height="500" @selection-change="handleSelectionChange">
      <el-table-column v-for="(item, index) in colums" :key="index" :prop="item.key" :label="item.label" :width="item.width" :sortable="item.sortable" align="center"/>
      <el-table-column align="center" label="操作" >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleSelectionChange(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="delService(scope.row)">删除</el-button>
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
      @current-change="handleCurrentChange"/>
    <!--  -->
    <el-dialog :visible.sync="dialogFormVisible" title="编辑套餐服务" width="30%">
      <el-form ref="baseInfoRules" :model="modalData" :rules="baseInfoRules" label-width="120px" label-position="right" style="margin-top: 20px;">
        <el-form-item label="套餐名称" prop="description">
          <el-input v-model="modalData.description" placeholder="请输入套餐名称" class="input-300" maxlength="10"/>
        </el-form-item>
        <el-form-item label="价格(元)" prop="price">
          <el-input v-model="modalData.price" placeholder="请输入价格" type="number" class="input-300" maxlength="7" clearable />
        </el-form-item>
        <el-form-item label="时长(分钟)" prop="serviceTime">
          <el-input v-model="modalData.serviceTime" placeholder="请输入时长" type="tel" class="input-300" maxlength="4" clearable />
        </el-form-item>
        <template v-if="communication != '2' ">
          <el-form-item label="模拟投币数" prop="coins">
            <el-input v-model="modalData.coins" placeholder="请输入模拟投币数" type="number" class="input-300" maxlength="4" clearable />
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">保存并使用</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { saveEquipmentService, groupServiceList, dateleEquipmentService, updateEquipmentService, batchRegisteredEquipment } from '@/api/device'
import { priceCheck, serviceTimeCheck, conisCheck } from '@/utils/rules'

export default {
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
      pageInfo: { total: 0, pageSize: 10, pageIndex: 1 },
      selectList: [],
      dialogFormVisible: false,
      lyyEquipmentId: '',
      modalData: { description: '', price: '', coins: '', serviceTime: '' },
      lyyDistributorList: [],
      baseInfoRules: {
        description: [{ required: true, message: '请输入套餐名称', trigger: 'blur' }],
        serviceTime: [{ required: true, validator: serviceTimeCheck, trigger: 'blur' }],
        coins: [{ required: true, validator: conisCheck, trigger: 'blur' }],
        price: [{ required: true, validator: priceCheck, trigger: 'blur' }]
      },
      type: '',
      communication: ''
    }
  },
  created() {
    this.lyyEquipmentId = this.$route.query.lyyEquipmentId
    this.communication = this.$route.query.communication
    /* eslint-disable-next-line */
    if (this.communication == 2) {
      this.colums = [
        { key: 'description', label: '套餐名称' },
        { key: 'price', label: '价格(元)' },
        { key: 'serviceTime', label: '时长(分钟)' }
      ]
    }
    this.queryList()
  },
  methods: {
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
    },
    handleSelectionChange(value) {
      this.type = 'modify'
      this.modalData = value
      this.dialogFormVisible = true
    },
    handleSaveModal() {
      this.type = 'add'
      this.dialogFormVisible = true
      this.modalData = { description: '', price: '', coins: '', serviceTime: '' }
    },
    handleSave() {
      this.$refs['baseInfoRules'].validate(async(valid) => {
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
              params.coins = params.serviceTime
            }
            params.lyyEquipmentId = this.lyyEquipmentId
            const res = await saveEquipmentService(params)
            if (res.result === 0) {
              this.$message({ message: '添加服务套餐成功', type: 'success' })
              this.queryList(1)
              this.dialogFormVisible = false
            } else {
              this.$message({ message: '添加服务套餐失败', type: 'error' })
            }
          } else if (this.type === 'modify') {
            const params = this.modalData
            params.lyyEquipmentId = this.lyyEquipmentId
            const res = await updateEquipmentService(params)
            if (res.result === 0) {
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
    // 删除服务套餐
    delService(item) {
      this.$confirm('确定要删除该服务套餐吗？', '删除服务套餐').then(async() => {
        const res = await dateleEquipmentService({ lyyGroupServiceId: item.lyyGroupServiceId })
        if (res.result === 0) {
          this.$message({ message: '删除套餐成功', type: 'success' })
          this.queryList(1)
        } else {
          this.$message({ message: '删除套餐失败', type: 'error' })
        }
      })
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
.content-area{
  font-size: 14px;
}
.table-title-info{
  display: flex;
  justify-content: space-between;
  padding: 10px;
  padding-right: 140px;
  align-items: center;
}
</style>
