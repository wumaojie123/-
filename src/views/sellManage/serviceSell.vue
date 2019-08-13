<template>
  <div class="content-area">
    <!-- 列表 -->
    <el-button class="creat-btn" type="primary" icon="el-icon-edit" @click="()=>handleEdit('add')">添加服务套餐</el-button>
    <el-table v-loading="listLoading" :data="list" :height="550" border highlight-current-row style="width: 100%;margin-bottom: 20px;" >
      <el-table-column v-for="(item, index) in colums" :key="index" :prop="item.key" :label="item.label" :width="item.width" :sortable="item.sortable" align="center"/>
      <el-table-column width="150px" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit('edit',scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    <edit-dialog :visible="vis_edit" :handle-close="handleClose" :action-row="actionRow" :action-type="actionType" />
  </div>
</template>

<script>
import { fetchList } from '@/api/sellManage'
import editDialog from './serviceSellDialog'
export default {
  components: { editDialog },
  data() {
    return {
      listLoading: true,
      list: [],
      colums: [
        { key: 'merchantName', label: '设备类型' },
        { key: 'userName', label: '通信方式' },
        { key: 'linkName', label: '计费方式' },
        { key: 'phone', label: '套餐名称' },
        { key: 'createDate', label: '价格' },
        { key: 'equipmentTypes', label: '时长' },
        { key: 'unregistered', label: '模拟投币数' },
        { key: 'registered', label: '最新编辑时间' }
      ],
      pageInfo: { total: 0, pageSize: 10, currPage: 1 },
      actionType: '',
      actionRow: null,
      vis_edit: false
    }
  },
  created() {
    this.queryList()
  },
  methods: {
    handleDelete() {
      this.$confirm('删除后，相关信息和数据将会彻底删除，且无法恢复。确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        this.deleteMerchant()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleEdit(actionType, actionRow) {
      this.actionType = actionType
      this.actionRow = actionRow
      this.vis_edit = true
    },
    handleClose() {
      this.vis_edit = false
    },
    queryList(page = 1) {
      this.list = []
      this.pageInfo.currPage = page
      const postData = { pageSize: this.pageInfo.pageSize, pageIndex: page }
      fetchList(postData).then(res => {
        this.listLoading = false
        if (res.data) {
          this.list = res.data.items || []
          this.pageInfo.total = res.data.total || 0
        } else {
          this.pageInfo.total = 0
        }
      })
    },
    deleteMerchant() {
      // const params = {
      //   adOrgIds: [this.angentInfo[0].adOrgId]
      // }
      // this.listLoading = true
      // deleteMerchant(params).then(res => {
      //   this.listLoading = false
      //   this.queryList()
      //   this.$message({
      //     type: 'success',
      //     message: '删除成功!'
      //   })
      // })
    },

    // 翻页
    handleSizeChange(pageSize) {
      this.pageInfo.pageSize = pageSize
      this.pageInfo.total = 0
      this.queryList(1)
    },
    handleCurrentChange(page) {
      this.queryList(page)
    },
    filterQueryList() {
      this.pageInfo.total = 0
      this.queryList(this.pageInfo.currPage)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.creat-btn{
  float:right;
  margin-bottom:20px;
}
</style>
