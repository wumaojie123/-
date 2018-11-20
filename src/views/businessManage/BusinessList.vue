<template>
  <div class="content-area">
    <el-form :inline="true" style="margin-bottom: 20px;" label-width="90px" label-position="right">
      <el-form-item label="商家账号" >
        <el-input v-model="queryParams.userName" placeholder="请输入商家账号" class="input-300" maxlength="11" clearable />
      </el-form-item>
      <!-- <el-form-item label="商家账号">
        <el-input v-model="queryParams.userName" placeholder="请输入商家账号,账号为手机号" class="input-300" maxlength="11" clearable />
      </el-form-item>
      <p/>
      <el-form-item label="联系人名称">
        <el-input v-model="queryParams.linkName" placeholder="请输入联系人名称" class="input-300" maxlength="32" clearable />
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="queryParams.phone" placeholder="请输入手机号码" class="input-300" maxlength="11" clearable />
      </el-form-item> -->
      <p/>
      <div class="flex-layout">
        <div class="flex-item">
          <el-button type="primary" icon="el-icon-search" @click="filterQueryList">查询</el-button>
          <el-button type="primary" @click="resetQueryParams">清空查询</el-button>
          <!-- <el-button type="primary" icon="el-icon-edit" @click="handleAngent('edit')">编辑商家</el-button> -->
          <!-- <router-link :to="{path: '/addbusiness'}"><el-button type="primary" icon="el-icon-plus">新增商家</el-button></router-link> -->
        </div>
      </div>
    </el-form>
    <!-- 列表 -->
    <el-table v-loading="listLoading" :data="list" :height="400" border highlight-current-row style="width: 100%;margin-bottom: 20px;" @selection-change="handleItem" >
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
import { fetchList } from '@/api/businessManage'
export default {
  data() {
    return {
      queryParams: { userName: '' },
      listLoading: true,
      // queryParams: { agentUserName: '', userName: '', linkName: '', phone: '' },
      list: [],
      colums: [
        { key: 'merchantName', label: '商家名称' },
        { key: 'userName', label: '账号' },
        { key: 'linkName', label: '联系人' },
        { key: 'phone', label: '手机号码' },
        { key: 'createDate', label: '创建日期' }
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
    handleAngent(type) {
      if (this.angentInfo.length === 1) {
        if (type === 'edit') {
          this.$router.push({ path: '/editbusiness', query: { ID: this.angentInfo[0].agentUserId, action: 'edit' }})
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
