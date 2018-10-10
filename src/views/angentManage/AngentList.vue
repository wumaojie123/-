<template>
  <div class="content-area">
    <el-form :inline="true" style="margin-bottom: 20px;" label-width="100px" label-position="left">
      <el-form-item label="代理商名称" >
        <el-input placeholder="请输入代理商名称"/>
      </el-form-item>
      <el-form-item label="代理商账号">
        <el-input placeholder="请输入代理商账号"/>
      </el-form-item>
      <el-form-item label="商家账号">
        <el-input placeholder="请输入商家账号"/>
      </el-form-item>
      <p/>
      <el-form-item label="联系人">
        <el-input placeholder="请输入联系人"/>
      </el-form-item>
      <el-form-item label="联系手机">
        <el-input placeholder="请输入手机号码"/>
      </el-form-item>
      <p/>
      <el-button type="primary" @click="queryList">查询</el-button>
      <el-button type="primary" @click="resetQueryParams">清空查询</el-button>
      <el-button type="primary" @click="resetQueryParams">编辑</el-button>
      <el-button type="primary" @click="toAdd">新增</el-button>
    </el-form>
    <!-- 列表 -->
    <el-table :data="list" border style="width: 100%;margin-bottom: 20px;">
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
      pageInfo: { total: 20, pageSize: 10, currPage: 1 }
    }
  },
  methods: {
    resetQueryParams() {
      this.queryParams = { startTime: '', endTime: '' }
    },
    queryList() {
      this.queryParams = { startTime: '', endTime: '' }
    },
    handleSizeChange() {
      this.queryParams = { startTime: '', endTime: '' }
    },
    handleCurrentChange() {
      this.queryParams = { startTime: '', endTime: '' }
    }
  }
}
</script>

<style>
.content-area{
	padding-top: 20px;
	padding-left: 20px;
}
</style>
