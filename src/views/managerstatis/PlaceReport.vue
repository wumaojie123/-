<template>
  <div class="content-area">
    <el-form :inline="true" style="margin-bottom: 20px;" label-width="100px" label-position="right">
      <el-form-item label="统计日期">
        <el-date-picker
          v-model="dateRange"
          :clearable="false"
          :picker-options="options"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryParams.equipmentId" placeholder="请输入场地名称" clearable/>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="queryList">查询</el-button>
    </el-form>
    <!-- 商家信息 -->
    <div class="lyy-table-header">
      <span style="margin: 0 20px;">商家名称：{{ query.agentUserName }}</span>|
      <span style="margin: 0 20px;">商家账号：{{ query.associateSellerPhone }}</span>
    </div>
    <!-- 列表 -->
    <el-table v-loading="listLoading" :data="list" show-summary border style="width: 100%;margin-bottom: 20px;">
      <el-table-column prop="associateSellerPhone" label="账号" align="center">
        <template slot-scope="scope">
          <router-link :to="{path: '/equipmentReport', query: {agentUserName: query.agentUserName, associateSellerPhone: query.associateSellerPhone}}" class="lyy-a-link">{{ scope.row.associateSellerPhone }}</router-link>
        </template>
      </el-table-column>
      <el-table-column v-for="(item, index) in colums" :key="index" :prop="item.key" :label="item.label" :width="item.width" :sortable="item.sortable" align="center"/>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageInfo.pageSize"
      :total="pageInfo.total"
      :current-page="pageInfo.currPage"
      background
      layout="total, prev, pager, next, sizes, jumper"
      @size-change="handleSizeChange"
      @prev-click="handleCurrentChange"
      @next-click="handleCurrentChange"
      @current-change="handleCurrentChange"/>
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
import { fetchPlaceList } from '@/api/managerstatis'
import { options } from './utils'

export default {
  data() {
    return {
      queryParams: { equipmentId: '' },
      dateRange: [],
      listLoading: true,
      list: [],
      colums: [
        { key: 'associateSellerPhone', label: '设备编号' },
        { key: 'orderCount', label: '订单数量', sortable: true },
        { key: 'totalIncome', label: '收入总额(元)', sortable: true },
        { key: 'onlineIncome', label: '在线收入(元)', sortable: true },
        { key: 'cashIncome', label: '现金收入(元)', sortable: true },
        { key: 'adIncome', label: '广告收入(元)', sortable: true },
        { key: 'equipmentOnlineCount', label: '设备总数', sortable: true },
        { key: 'equipmentOnlineCount', label: '在线设备数量', sortable: true }
      ],
      pageInfo: { total: 20, pageSize: 10, currPage: 1 },
      options: options,
      query: { associateSellerPhone: '', agentUserName: '' }
    }
  },
  beforeMount() {
    // 获取参数
    this.query.associateSellerPhone = this.$route.query.associateSellerPhone
    this.query.agentUserName = this.$route.query.agentUserName
    // 统计日期默认为登录日期的昨天
    this.dateRange[0] = parseTime(Date.now() - 24 * 60 * 60 * 1000, '{y}-{m}-{d}')
    this.dateRange[1] = parseTime(Date.now() - 24 * 60 * 60 * 1000, '{y}-{m}-{d}')
    this.queryList()
  },
  methods: {
    queryList(page = 1) {
      this.listLoading = true
      this.pageInfo.currPage = page
      const postData = this.queryParams
      postData.pageIndex = this.pageInfo.currPage
      postData.pageSize = this.pageInfo.pageSize
      postData.startDate = this.dateRange[0]
      postData.endDate = this.dateRange[1]
      fetchPlaceList(postData).then(res => {
        this.listLoading = false
        if (res.data) {
          this.list = res.data && res.data.items || []
          this.pageInfo.total = res.data.total || 0
        } else {
          this.pageInfo.total = 0
        }
      })
    },
    handleSizeChange(pageSize) {
      this.pageInfo.pageSize = pageSize
      this.queryList(this.pageInfo.currPage)
    },
    handleCurrentChange(page) {
      this.queryList(page)
    }
  }
}
</script>

<style>
.lyy-table-header{
  font-size: 16px;
  padding-bottom: 10px;
}
.lyy-a-link{
  color: blue;
  text-decoration: underline;
}
</style>
