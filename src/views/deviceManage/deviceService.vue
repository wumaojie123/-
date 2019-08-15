<template>
  <div class="content-area">
    <!-- 列表 -->
    <el-table :data="list" border highlight-current-row style="width: 100%;margin-bottom: 20px;" >
      <el-table-column type="selection" width="55"/>
      <el-table-column v-for="(item, index) in colums" :key="index" :prop="item.key" :label="item.label" :width="item.width" :sortable="item.sortable" align="center"/>
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
  </div>
</template>

<script>
import { getSecList } from '@/api/angentManage'

export default {
  data() {
    return {
      queryParams: { agentUserName: '', userName: '' },
      list: [],
      colums: [
        { key: 'agentUserName', label: '套餐名称' },
        { key: 'userName', label: '价格(元)' },
        { key: 'subordinateCount', label: '时长(分钟)' },
        { key: 'linkName', label: '模拟投币数' }
      ],
      pageInfo: { total: 0, pageSize: 10, currPage: 1 },
      angentInfo: []
    }
  },
  created() {
    this.queryList()
  },
  methods: {
    resetQueryParams() {
      this.queryParams = { agentUserName: '', userName: '' }
    },
    queryList(page = 1) {
      this.angentInfo = []
      this.list = []
      this.pageInfo.currPage = page
      const postData = { pageSize: this.pageInfo.pageSize, pageIndex: this.pageInfo.currPage }
      for (const key in this.queryParams) {
        if (this.queryParams[key]) {
          postData[key] = this.queryParams[key]
        }
      }
      getSecList(postData).then(res => {
        this.listLoading = false
        if (res.data) {
          this.list = res.data.items || []
          this.pageInfo.total = res.data.total || 0
        } else {
          this.pageInfo.total = 0
        }
      })
    },
    handleItem(value) {
      this.angentInfo = value
    },
    getTemplateRow(value) {
      this.check = value
      console.log('getTemplateRow:', value)
      this.angentInfo = [this.list[value]]
    },
    // 设备注册记录
    onDelBtnClick() {
    },
    handleAngent(type) {
      if (this.angentInfo.length === 1) {
        this.$message({ message: '只能编辑一条代理商信息', type: 'error' })
      } else if (this.angentInfo.length > 1) {
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
    }
  }
}
</script>
