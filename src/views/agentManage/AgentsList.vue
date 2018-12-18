<template>
  <div class="content-area">
    <el-form :inline="true" style="margin-bottom: 20px;" label-width="90px" label-position="right">
      <el-form-item>
        <el-input v-model="queryParams.userName" placeholder="请输入代理账号" class="input-300" maxlength="11" clearable />
        <el-button type="primary" icon="el-icon-search" @click="filerQueryList">查询</el-button>
        <p style="padding-bottom:10px"/>
        <div class="flex-layout">
          <div class="flex-item">
            <el-button type="primary" icon="el-icon-edit" @click="handleAngent('edit')">编辑代理</el-button>
            <router-link :to="{path: '/add'}"><el-button type="primary" icon="el-icon-plus">新增代理</el-button></router-link>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table :data="list" :height="600" border highlight-current-row style="width: 100%;margin-bottom: 20px;" >
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
import { validateTel } from '@/utils/validate'
import { getSecList } from '@/api/angentManage'
export default {
  data() {
    return {
      check: -1,
      queryParams: { agentUserName: '', userName: '', linkName: '', phone: '' },
      list: [],
      colums: [
        { key: 'agentUserName', label: '代理商名称' },
        { key: 'userName', label: '账号' },
        { key: 'subordinateCount', label: '下一级商家数量' },
        { key: 'linkName', label: '联系人' },
        { key: 'phone', label: '手机号码' },
        // { key: 'total', label: '广告状态', width: 120 },
        { key: 'createDate', label: '创建日期' },
        { key: 'equipmentCount', label: '当前设备总量' },
        { key: 'equipmentOnlineCount', label: '昨日在线设备量' }
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
      this.queryParams = { agentUserName: '', userName: '', linkName: '', phone: '' }
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
    handleAngent(type) {
      if (this.angentInfo.length === 1) {
        if (type === 'edit') {
          this.$router.push({ path: '/edit', query: { ID: this.angentInfo[0].agentUserId, action: 'edit' }})
        } else if (type === 'del') {
          this.$confirm('是否删除该代理商信息', {
            callback: action => {
              if (action === 'confirm') {
                console.log('确认删除数据')
              }
            }
          })
        }
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
      if ((this.queryParams.phone && !validateTel(this.queryParams.phone)) || (this.queryParams.userName && !validateTel(this.queryParams.userName))) {
        this.$message({ message: '请正确输入11位手机号码', type: 'error' })
        return
      }
      this.queryList(this.pageInfo.currPage)
    }
  }
}
</script>
