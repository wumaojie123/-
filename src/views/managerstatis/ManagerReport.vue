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
      <el-form-item label="商家账号">
        <el-input v-model="queryParams.associateSellerPhone" placeholder="请输入商家账号" clearable/>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="handleQueryParams">查询</el-button>
      <!-- <el-button type="primary" @click="resetQueryParams">清空查询</el-button> -->
    </el-form>
    <!-- tab 切换商家和代理 -->
    <el-tabs v-model="active" type="card" @tab-click = "handlerTabClick">
      <el-tab-pane label="商家" name="merchant">
        <span slot="label">账号</span>
        <!-- 列表 -->
        <el-table v-loading="listLoading" :data="list" show-summary border style="width: 100%;margin-bottom: 20px;">
          <el-table-column prop="associateSellerPhone" label="账号" align="center">
            <template slot-scope="scope">
              <router-link :to="{path: '/placeReport', query: {agentUserName: scope.row.agentUserName, associateSellerPhone: scope.row.associateSellerPhone}}" class="lyy-a-link">{{ scope.row.associateSellerPhone }}</router-link>
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
          @prev-click="handleCurrentChange"
          @next-click="handleCurrentChange"
          @current-change="handleCurrentChange"/>
      </el-tab-pane>
      <el-tab-pane label="代理" name="agent">
        <!-- 列表 -->
        <el-table v-loading="listLoading" :data="agentList" show-summary border style="width: 100%;margin-bottom: 20px;">
          <el-table-column v-for="(item, index) in colums2" :key="index" :prop="item.key" :label="item.label" :width="item.width" :sortable="item.sortable" align="center"/>
        </el-table>
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
// import { validateTel } from '@/utils/validate'
import { fetchList } from '@/api/managerstatis'
const NOW = Date.now()
// 最大支持最近60天
const OPTIONS = {
  disabledDate: (time) => {
    console.log(time)
    const timeItem = time.getTime()
    return timeItem < NOW - 24 * 60 * 60 * 60 * 1000 || timeItem > NOW
  }
}
export default {
  data() {
    return {
      queryParams: { agentUserName: '', associateSellerPhone: '', associateSellerName: '' },
      dateRange: [],
      listLoading: true,
      list: [],
      agentList: [],
      colums: [
        { key: 'agentUserName', label: '代理/商家名称', width: 250 },
        { key: 'orderCount', label: '订单数量', sortable: true },
        { key: 'totalIncome', label: '收入总额(元)', sortable: true },
        { key: 'onlineIncome', label: '在线收入(元)', sortable: true },
        { key: 'cashIncome', label: '现金收入(元)', sortable: true },
        { key: 'adIncome', label: '广告收入(元)', sortable: true },
        { key: 'equipmentTotalCount', label: '设备总数', sortable: true },
        { key: 'equipmentOnlineCount', label: '在线设备数量', sortable: true }
      ],
      colums2: [
        { key: 'associateSellerPhone', label: '账号' },
        { key: 'agentUserName', label: '代理/商家名称', width: 250 },
        { key: 'orderCount', label: '订单数量', sortable: true },
        { key: 'totalIncome', label: '收入总额(元)', sortable: true },
        { key: 'onlineIncome', label: '在线收入(元)', sortable: true },
        { key: 'cashIncome', label: '现金收入(元)', sortable: true },
        { key: 'adIncome', label: '广告收入(元)', sortable: true },
        { key: 'equipmentTotalCount', label: '设备总数', sortable: true },
        { key: 'equipmentOnlineCount', label: '在线设备数量', sortable: true }
      ],
      pageInfo: { total: 20, pageSize: 10, currPage: 1 },
      options: OPTIONS,
      active: 'merchant'
    }
  },
  beforeMount() {
    // 统计日期默认为登录日期的昨天
    this.dateRange[0] = parseTime(Date.now() - 24 * 60 * 60 * 1000, '{y}-{m}-{d}')
    this.dateRange[1] = parseTime(Date.now() - 24 * 60 * 60 * 1000, '{y}-{m}-{d}')
    this.queryList()
  },
  methods: {
    // tab切换
    handlerTabClick() {
      this.list = []
      this.agentList = []
      this.pageInfo = { total: 20, pageSize: 10, currPage: 1 }
      this.resetQueryParams()
      this.queryList()
    },
    resetQueryParams() {
      this.queryParams = { agentUserName: '', associateSellerPhone: '', associateSellerName: '' }
      this.dateRange = []
      this.dateRange[0] = parseTime(Date.now() - 24 * 60 * 60 * 1000, '{y}-{m}-{d}')
      this.dateRange[1] = parseTime(Date.now() - 24 * 60 * 60 * 1000, '{y}-{m}-{d}')
    },
    handleQueryParams() {
      this.queryList(this.pageInfo.currPage)
      // if ((this.queryParams.associateSellerPhone && validateTel(this.queryParams.associateSellerPhone)) || !this.queryParams.associateSellerPhone) {
      // } else {
      //   this.$message({ message: '请输入正确的商家账号，为11位手机号码', type: 'error' })
      // }
    },
    queryList(page = 1) {
      this.listLoading = true
      this.pageInfo.currPage = page
      const postData = this.queryParams
      postData.pageIndex = this.pageInfo.currPage
      postData.pageSize = this.pageInfo.pageSize
      postData.startDate = this.dateRange[0]
      postData.endDate = this.dateRange[1]
      postData.roleStr = this.active
      if (this.active === 'agent') {
        this.list = []
      } else if (this.active === 'merchant') {
        this.agentList = []
      }
      fetchList(postData).then(res => {
        this.listLoading = false
        if (res.data) {
          const list = res.data && res.data.items || []
          if (this.active === 'merchant') {
            this.list = list
          } else if (this.active === 'agent') {
            this.agentList = list
          }
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
.el-tabs__item.is-active {
    color: #fff;
    background: #409eff;
}
.lyy-a-link{
  color: blue;
  text-decoration: underline;
}
.lyy-a-link:hover{
  color: blue;
  text-decoration: underline;
}
</style>

