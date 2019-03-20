<template>
  <div class="content-area">
    <el-form :inline="true" style="margin-bottom: 20px;" label-position="right">
      <el-form-item>
        <el-input v-model="queryParams.userName" placeholder="请输入商家账号" class="input-300" maxlength="11" clearable />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="filterQueryList">查询</el-button>
      <div class="flex-layout">
        <div class="flex-item">
          <el-button type="primary" icon="el-icon-edit" @click="handleAngent('edit')">编辑商家</el-button>
          <router-link :to="{path: '/addbusiness', query: {info: angentInfo[0]}}"><el-button type="primary" icon="el-icon-plus">新增商家</el-button></router-link>
          <el-button type="primary" @click="onDelBtnClick">删除</el-button>
        </div>
      </div>
    </el-form>
    <!-- 列表 -->
    <el-table v-loading="listLoading" :data="list" :height="550" border highlight-current-row style="width: 100%;margin-bottom: 20px;" >
      <!-- <el-table-column type="selection" width="55"/> -->
      <el-table-column label="操作" width="55" align="center">
        <template slot-scope="scope">
          <el-radio :label="scope.$index" v-model="check" @change.native="getTemplateRow(scope.$index)">&nbsp;</el-radio>
        </template>
      </el-table-column>
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
import { fetchList, deleteMerchant } from '@/api/businessManage'
export default {
  data() {
    return {
      queryParams: { userName: '' },
      listLoading: true,
      check: -1,
      list: [],
      colums: [
        { key: 'merchantName', label: '商家名称' },
        { key: 'userName', label: '账号' },
        { key: 'linkName', label: '联系人' },
        { key: 'phone', label: '手机号码' },
        { key: 'createDate', label: '创建日期' },
        { key: 'equipmentCount', label: '当前设备总量' },
        { key: 'equipmentOnlineCount', label: '昨日在线设备量' },
        { key: 'description', label: '备注信息' }
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
      this.queryParams = { userName: '' }
    },
    queryList(page = 1) {
      this.angentInfo = []
      this.list = []
      this.pageInfo.currPage = page
      const postData = { pageSize: this.pageInfo.pageSize, pageIndex: this.pageInfo.currPage }
      postData.userName = this.queryParams.userName
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
    handleItem(value) {
      this.angentInfo = value
    },
    // 删除按钮点击
    onDelBtnClick() {
      if (this.angentInfo.length < 1) {
        this.$message({ message: '请至少选中一条商家信息！！', type: 'error' })
        return
      }
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
    deleteMerchant() {
      const params = {
        ids: [this.angentInfo[0].adOrgId]
      }
      this.listLoading = true
      deleteMerchant(params).then(res => {
        this.listLoading = false
        this.queryList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    getTemplateRow(value) {
      this.check = value
      console.log('getTemplateRow:', value)
      this.angentInfo = [this.list[value]]
      // this.angentInfo = value
    },
    handleAngent(type) {
      if (this.angentInfo.length === 1) {
        if (type === 'edit') {
          this.$router.push({ name: 'editbusiness', params: { info: encodeURIComponent(JSON.stringify(this.angentInfo[0])) }})
        } else if (type === 'del') {
          this.$confirm('是否删除该商家信息', {
            callback: action => {
              if (action === 'confirm') {
                console.log('确认删除数据')
              }
            }
          })
        }
      } else if (this.angentInfo.length > 1) {
        this.$message({ message: '只能编辑一条商家信息', type: 'error' })
      } else {
        this.$message({ message: '请选中一条商家信息！！', type: 'error' })
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
    filterQueryList() {
      this.pageInfo.total = 0
      this.queryList(this.pageInfo.currPage)
    }
  }
}
</script>
