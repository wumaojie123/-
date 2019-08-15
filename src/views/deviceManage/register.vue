<template>
  <div class="content-area">
    <h1 style="margin: 10px 0px;">注册设备：已选{{ equipmentArr }}台；设备类型：{{ deviceType }}；通信方式：{{ equipmentType }}</h1>
    <el-form :inline="true" style="margin-bottom: 20px;" label-width="90px" label-position="right">
      <el-form-item label="绑定商家">
        <el-select v-model="queryParams.equipmentType" placeholder="请选择">
          <el-option v-for="item in equipmentTypesArr" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <div class="table-title-info">
      <span>服务套餐</span>
      <el-button v-waves type="primary" @click="dialogFormVisible=true">添加其他套餐</el-button>
    </div>
    <el-table :data="list" border highlight-current-row style="width: 100%;margin-bottom: 20px;" >
      <el-table-column type="selection" width="55"/>
      <el-table-column v-for="(item, index) in colums" :key="index" :prop="item.key" :label="item.label" :width="item.width" :sortable="item.sortable" align="center"/>
    </el-table>
    <el-pagination
      :total="pageInfo.total"
      :current-page="pageInfo.currPage"
      background
      layout="total, pager"
    />
    <div style="text-align:center;">
      <el-button v-waves >取消</el-button>
      <el-button v-waves style="margin-left: 100px;" type="primary">完成</el-button>
    </div>
    <!--  -->
    <el-dialog :visible.sync="dialogFormVisible" title="编辑套餐服务">
      <el-form ref="baseInfoRef" :model="modalData" :rules="baseInfoRules" label-width="120px" label-position="right" style="margin-top: 20px;">
        <el-form-item label="套餐名称">
          <el-input v-model="modalData.description" placeholder="请输入套餐名称" class="input-300" maxlength="10"/>
        </el-form-item>
        <el-form-item label="价格(元)">
          <el-input v-model="modalData.price" placeholder="请输入价格" type="text" class="input-300" maxlength="16" clearable />
        </el-form-item>
        <el-form-item label="时长(分钟)">
          <el-input v-model="modalData.serviceTime" placeholder="请输入时长" type="text" class="input-300" maxlength="16" clearable />
        </el-form-item>
        <el-form-item label="模拟投币数">
          <el-input v-model="modalData.coins" placeholder="请输入模拟投币数" type="number" class="input-300" maxlength="11" clearable />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { agentGroupServiceList } from '@/api/device'
export default {
  data() {
    return {
      queryParams: { agentUserName: '' },
      modalData: {},
      list: [],
      baseInfoRules: [],
      colums: [
        { key: 'description', label: '套餐名称' },
        { key: 'price', label: '价格(元)' },
        { key: 'serviceTime', label: '时长(分钟)' },
        { key: 'coins', label: '模拟投币数' }
      ],
      pageInfo: { total: 0 },
      angentInfo: [],
      dialogFormVisible: false,
      deviceType: '',
      equipmentArr: [],
      communication: ''
    }
  },
  created() {
    this.deviceType = this.$route.query.deviceType
    this.equipmentArr = this.$route.query.equipmentArr
    this.communication = this.$route.query.equipmentType
    this.queryList()
  },
  methods: {
    async queryList() {
      this.list = []
      const postData = {
        communication: this.communication,
        equipmentType: this.deviceType,
        pageSize: 400,
        pageIndex: 1
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
    handleItem(value) {
      this.angentInfo = value
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
