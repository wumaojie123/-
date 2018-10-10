<template>
  <div class="content-area">
    <el-form :inline="true" style="margin-bottom: 20px;" label-width="100px" label-position="left">
      <el-form-item label="代理商名称" >
        <el-input placeholder="请输入代理商名称" maxlength="64" clearable />
      </el-form-item>
      <el-form-item label="代理商账号">
        <el-input placeholder="请输入代理商账号" maxlength="11" clearable />
      </el-form-item>
      <el-form-item label="商家账号">
        <el-input placeholder="请输入商家账号" maxlength="32" clearable />
      </el-form-item>
      <p/>
      <el-form-item label="联系人">
        <el-input placeholder="请输入联系人" maxlength="32" clearable />
      </el-form-item>
      <el-form-item label="联系手机">
        <el-input placeholder="请输入手机号码" maxlength="11" clearable />
      </el-form-item>
      <p/>
      <div class="flex-layout">
        <div class="flex-item">
          <el-button type="primary" @click="queryList">查询</el-button>
          <el-button type="primary" @click="resetQueryParams">清空查询</el-button>
          <el-button type="primary" @click="handleEdit">编辑代理商</el-button>
          <el-button type="primary" @click="handleDel">删除代理商</el-button>
        </div>
        <router-link :to="{path: 'agentsList/addAgent'}"><el-button type="primary" icon="el-icon-circle-plus">新增代理商</el-button></router-link>
      </div>
    </el-form>
    <!-- 列表 -->
    <el-table :data="list" border highlight-current-row style="width: 100%;margin-bottom: 20px;" @selection-change="handleItem" >
      <el-table-column type="selection" width="55"/>
      <el-table-column v-for="(item, index) in colums" :key="index" :prop="item.key" :label="item.label" :width="item.width" :sortable="item.sortable"/>
    </el-table>
    <el-pagination
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageInfo.pageSize"
      :total="pageInfo.total"
      :current-page="pageInfo.currPage"
      layout="total, prev, pager, next, sizes, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  </div>
</template>

<script>
import { validateTel } from '@/utils/validate'
export default {
  data() {
    return {
      queryParams: { startTime: '', endTime: '' },
      list: [{ name: 't', info: 'guanlian', total: 5, inline: 1 }, { name: 't2', info: 'guanlian3', total: 10, inline: 9 }],
      colums: [
        { key: 'name', label: '代理商名称', width: 180 },
        { key: 'info', label: '关联商家信息', width: 180 },
        { key: 'total', label: '设备总数', width: 180, sortable: true },
        { key: 'inline', label: '在线设备数量', width: 180 }
      ],
      pageInfo: { total: 20, pageSize: 10, currPage: 1 },
      angentInfo: []
    }
  },
  methods: {
    resetQueryParams() {
      this.queryParams = { startTime: '', endTime: '' }
    },
    queryList(page = 1) {
      this.angentInfo = []
      this.list = []
      this.pageInfo.currPage = page
    },
    handleItem(value) {
      console.log(JSON.stringify(value))
      this.angentInfo = value
    },
    handleEdit() {
      if (this.angentInfo.length === 1) {
        this.$router.push({ path: 'agentsList/editAgent', query: { angentInfo: encodeURIComponent(JSON.stringify(this.angentInfo[0])) }})
      } else if (this.angentInfo.length > 1) {
        this.$message({ message: '只能编辑一条代理商信息', type: 'error' })
      } else {
        this.$message({ message: '请选中一条代理商信息！！', type: 'error' })
      }
    },
    handleDel() {
      if (this.angentInfo.length === 1) {
        this.$confirm('是否删除该代理商信息', {
          callback: action => {
            if (action === 'confirm') {
              console.log('确认删除数据')
            }
          }
        })
        console.log('删除代理商数据')
      } else if (this.angentInfo.length > 1) {
        this.$message({ message: '只能编辑一条代理商信息', type: 'error' })
      } else {
        this.$message({ message: '请选中一条代理商信息！！', type: 'error' })
      }
    },
    handleSizeChange(pageSize) {
      console.log('sizeChange', pageSize)
      this.pageInfo.pageSize = pageSize
      this.queryList(this.pageInfo.currPage)
    },
    handleCurrentChange(page) {
      console.log('curChange:', page)
      this.queryList(page)
    },
    handleQueryParams() {
      if (this.queryParams.phone && validateTel(this.queryParams.phone)) {
        this.queryList(this.pageInfo.currPage)
      } else {
        this.$message('请输入正确得手机号码')
      }
    }
  }
}
</script>
