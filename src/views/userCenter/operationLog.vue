<template>
  <div class="content-area">
    <el-form :inline="true" style="margin-bottom: 20px;" label-width="90px" label-position="right">
      <el-form-item label="操作商家">
        <el-select v-model="queryParams.lyyDistributorId" placeholder="请选择" style="width: 300px;" filterable>
          <el-option label="全部" value=""/>
          <el-option
            v-for="item in merchantList"
            :key="item.value"
            :label="item.label"
            :value="item.adOrgId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="操作类型">
        <el-select v-model="queryParams.type" placeholder="请选择">
          <el-option v-for="(item, index) in equipmentTypesArr" :key="index" :label="item" :value="index">{{ item }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备编号">
        <el-input v-model="queryParams.equipmentValue" placeholder="输入设备编号" class="input-300" maxlength="100" clearable/>
        <el-button type="primary" icon="el-icon-search" @click="filerQueryList">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table :data="list" border highlight-current-row style="width: 100%;margin-bottom: 20px;">
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
import { queryAgentOperateLog } from '@/api/operateLog'
import { merchants } from '@/api/device'

const typeMap = {
  '0': '全部',
  '1': '设置服务套餐',
  '2': '设置设备参数',
  '3': '解绑设备'
}
export default {
  data() {
    return {
      queryParams: { type: '', equipmentValue: '', lyyDistributorId: '' },
      list: [],
      merchantList: [],
      colums: [
        { key: 'typeText', label: '操作类型' },
        { key: 'equipmentTypeNameText', label: '操作设备' },
        { key: 'distributorNameText', label: '操作商家' },
        { key: 'created', label: '操作时间' },
        { key: 'agentPhone', label: '操作人' }
      ],
      pageInfo: { total: 0, pageSize: 10, currPage: 1 },
      equipmentTypesArr: typeMap
    }
  },
  created() {
    this.queryList()
    this.getMerchantList()
  },
  methods: {
    queryList(page = 1) {
      this.list = []
      this.pageInfo.currPage = page
      const postData = this.queryParams
      postData.pageSize = this.pageInfo.pageSize
      postData.pageIndex = this.pageInfo.currPage
      if (this.queryParams.type === '0' || this.queryParams.type === 0) {
        postData.type = ''
      }

      queryAgentOperateLog(postData).then(res => {
        this.listLoading = false
        if (res.data) {
          let list = res.data.items || []
          list = list.map(item => {
            item.typeText = typeMap[item.type]
            item.equipmentTypeNameText = `${item.equipmentTypeName}${item.equipmentValue}`
            item.distributorNameText = `${item.distributorName}-${item.distributorPhone}`
            return item
          })
          this.list = list
          this.pageInfo.total = res.data.total || 0
        } else {
          this.pageInfo.total = 0
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
    },
    filerQueryList() {
      this.pageInfo.total = 0
      this.queryList(this.pageInfo.currPage)
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
    }
  }
}
</script>
