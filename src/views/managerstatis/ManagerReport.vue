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
          value-format="yyyy-MM-dd" />
      <!-- <el-date-picker v-model="queryParams.startDate" :picker-options="options"  value-format="yyyy-MM-dd" type="date" placeholder="选择日期" /> -
        <el-date-picker v-model="queryParams.endDate" :picker-options="options" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" /> -->
      </el-form-item>
      <p/>
      <el-form-item label="代理商名称">
        <el-input v-model="queryParams.agentUserName" type="text" placeholder="请输入代理商名称"/>
      </el-form-item>
      <el-form-item label="商家名称">
        <el-input v-model="queryParams.associateSellerName" type="text" placeholder="请输入商家名称"/>
      </el-form-item>
      <el-form-item label="商家手机号码">
        <el-input v-model="queryParams.associateSellerPhone" type="tel" placeholder="请输入商家手机号码"/>
      </el-form-item>
      <p/>
      <el-button type="primary" icon="el-icon-search" @click="handleQueryParams">查询</el-button>
      <el-button type="primary" @click="resetQueryParams">清空查询</el-button>
    </el-form>
    <!-- 列表 -->
    <el-table v-loading="listLoading" :data="list" :height="450" border style="width: 100%;margin-bottom: 20px;">
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
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
import { validateTel } from '@/utils/validate'
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
      colums: [
        { key: 'agentUserName', label: '代理商名称' },
        { key: 'associateSellerPhone', label: '账号', width: 110 },
        { key: 'equipmentTotalCount', label: '设备总数', width: 110, sortable: true },
        { key: 'equipmentOnlineCount', label: '在线设备数量', width: 130, sortable: true },
        { key: 'orderCount', label: '订单数量', width: 110, sortable: true },
        { key: 'totalIncome', label: '收入总额', width: 110, sortable: true },
        { key: 'onlineIncome', label: '在线收入', width: 110, sortable: true },
        { key: 'cashIncome', label: '现金收入', width: 110, sortable: true },
        { key: 'adIncome', label: '广告收入', width: 110, sortable: true }
      ],
      pageInfo: { total: 20, pageSize: 10, currPage: 1 },
      options: OPTIONS
    }
  },
  beforeMount() {
    console.log('mount')
    // 统计日期默认为登录日期的昨天
    this.dateRange[0] = parseTime(Date.now() - 24 * 60 * 60 * 1000, '{y}-{m}-{d}')
    this.dateRange[1] = parseTime(Date.now() - 24 * 60 * 60 * 1000, '{y}-{m}-{d}')
    this.queryList()
  },
  methods: {
    resetQueryParams() {
      this.queryParams = { agentUserName: '', associateSellerPhone: '', associateSellerName: '' }
      this.dateRange = []
      this.dateRange[0] = parseTime(Date.now() - 24 * 60 * 60 * 1000, '{y}-{m}-{d}')
      this.dateRange[1] = parseTime(Date.now() - 24 * 60 * 60 * 1000, '{y}-{m}-{d}')
    },
    handleQueryParams() {
      if ((this.queryParams.associateSellerPhone && validateTel(this.queryParams.associateSellerPhone)) || !this.queryParams.associateSellerPhone) {
        this.queryList(this.pageInfo.currPage)
      } else {
        this.$message({ message: '请正确输入11位手机号码', type: 'error' })
      }
    },
    queryList(page = 1) {
      this.listLoading = true
      this.list = []
      this.pageInfo.currPage = page
      const postData = this.queryParams
      postData.pageIndex = this.pageInfo.currPage
      postData.pageSize = this.pageInfo.pageSize
      postData.startDate = this.dateRange[0]
      postData.endDate = this.dateRange[1]
      fetchList(postData).then(res => {
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
      console.log('sizeChange', pageSize)
      this.pageInfo.pageSize = pageSize
      this.queryList(this.pageInfo.currPage)
    },
    handleCurrentChange(page) {
      console.log('curChange:', page)
      this.queryList(page)
    }
  }
}
</script>
