<template>
  <div class="content-area">
    <el-form :inline="true" style="margin-bottom: 20px;" label-width="100px" label-position="right">
      <el-form-item label="统计日期">
        <el-date-picker type="date" placeholder="选择日期"/> -
        <el-date-picker type="date" placeholder="选择日期"/>
      </el-form-item>
      <p/>
      <el-form-item label="代理商名称">
        <el-input placeholder="请输入代理商名称"/>
      </el-form-item>
      <el-form-item label="商家名称">
        <el-input placeholder="请输入商家名称"/>
      </el-form-item>
      <el-form-item label="商家手机号码">
        <el-input placeholder="请输入商家手机号码"/>
      </el-form-item>
      <p/>
      <el-button type="primary" @click="queryList">查询</el-button>
      <el-button type="primary" @click="resetQueryParams">清空查询</el-button>
    </el-form>
    <!-- 列表 -->
    <el-table :data="list" border show-summary style="width: 100%;margin-bottom: 20px;">
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
      list: [],
      colums: [
        { key: 'name', label: '代理商名称' },
        { key: 'info', label: '关联商家信息', width: 180 },
        { key: 'total', label: '设备总数', width: 180, sortable: true },
        { key: 'inline', label: '在线设备数量', width: 180 },
        { key: 'total', label: '订单数量', width: 180, sortable: true },
        { key: 'total', label: '收入总额', width: 180, sortable: true },
        { key: 'total', label: '在线收入', width: 180, sortable: true },
        { key: 'total', label: '现金收入', width: 180, sortable: true },
        { key: 'total', label: '广告收入', width: 180, sortable: true }
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
