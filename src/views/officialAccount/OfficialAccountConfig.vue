<template>
  <div class="content-area">
    <!-- 列表 -->
    <el-table :data="list" border highlight-current-row style="width: 100%;margin-bottom: 20px;">
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
import { getList } from '@/api/officialAccount'

export default {
  data() {
    return {
      list: [],
      colums: [
        { key: 'equipmentTypeText', label: '公众号名称' },
        { key: 'value', label: '绑定设备类型' },
        { key: 'updated', label: '操作时间' }
      ],
      pageInfo: { total: 0, pageSize: 10, currPage: 1 },
      selectList: []
    }
  },
  created() {
    this.queryList()
  },
  methods: {
    async queryList(page = 1) {
      this.list = []
      this.pageInfo.currPage = page
      const postData = { pageSize: this.pageInfo.pageSize, pageIndex: this.pageInfo.currPage }
      const res = await getList(postData)
      if (res.result === 0) {
        this.listLoading = false
        if (res.data) {
          const list = res.data.items || []
          this.list = list
          this.pageInfo.total = res.data.total || 0
        } else {
          this.pageInfo.total = 0
        }
      }
    },
    handleAngent(type) {
      if (this.selectList.length === 1) {
        console.log('info')
      } else if (this.selectList.length > 1) {
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
