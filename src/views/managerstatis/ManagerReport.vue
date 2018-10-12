<template>
  <div class="content-area">
    <el-form :inline="true" style="margin-bottom: 20px;" label-width="100px" label-position="right">
      <el-form-item label="统计日期">
        <el-date-picker v-model="queryParams.startTime" :picker-options="options" type="date" placeholder="选择日期" /> -
        <el-date-picker v-model="queryParams.endTime" :picker-options="options" type="date" placeholder="选择日期" />
      </el-form-item>
      <p/>
      <el-form-item label="代理商名称">
        <el-input type="text" placeholder="请输入代理商名称"/>
      </el-form-item>
      <el-form-item label="商家名称">
        <el-input type="text" placeholder="请输入商家名称"/>
      </el-form-item>
      <el-form-item label="商家手机号码">
        <el-input v-model="queryParams.phone" type="tel" placeholder="请输入商家手机号码"/>
      </el-form-item>
      <p/>
      <el-button type="primary" icon="el-icon-search" @click="handleQueryParams">查询</el-button>
      <el-button type="primary" @click="resetQueryParams">清空查询</el-button>
    </el-form>
    <!-- 列表 -->
    <el-table :data="list" :height="450" border style="width: 100%;margin-bottom: 20px;">
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
const NOW = Date.now()
// 最大支持最近60天
const OPTIONS = {
  disabledDate: (time) => {
    const timeItem = time.getTime()
    return timeItem < NOW - 24 * 60 * 60 * 60 * 1000 || timeItem > NOW
  }
}
export default {
  data() {
    return {
      queryParams: { startTime: '', endTime: '' },
      list: [],
      colums: [
        { key: 'name', label: '代理商名称', width: 180 },
        { key: 'info', label: '账号', width: 180 },
        { key: 'total', label: '设备总数', width: 120, sortable: true },
        { key: 'inline', label: '在线设备数量', width: 140, sortable: true },
        { key: 'total', label: '订单数量', width: 120, sortable: true },
        { key: 'total', label: '收入总额', width: 120, sortable: true },
        { key: 'total', label: '在线收入', width: 120, sortable: true },
        { key: 'total', label: '现金收入', width: 120, sortable: true },
        { key: 'total', label: '广告收入', width: 120, sortable: true }
      ],
      pageInfo: { total: 20, pageSize: 10, currPage: 1 },
      options: OPTIONS
    }
  },
  beforeMount() {
    console.log('mount')
    // 统计日期默认为登录日期的昨天
    this.queryParams.startTime = parseTime(Date.now() - 24 * 60 * 60 * 1000, '{y}-{m}-{d}')
    this.queryParams.endTime = parseTime(Date.now() - 24 * 60 * 60 * 1000, '{y}-{m}-{d}')
    this.queryList()
  },
  methods: {
    resetQueryParams() {
      this.queryParams = { startTime: '', endTime: '', phone: '' }
      this.queryParams.startTime = parseTime(Date.now() - 24 * 60 * 60 * 1000, '{y}-{m}-{d}')
      this.queryParams.endTime = parseTime(Date.now() - 24 * 60 * 60 * 1000, '{y}-{m}-{d}')
    },
    handleQueryParams() {
      if ((this.queryParams.phone && validateTel(this.queryParams.phone)) || !this.queryParams.phone) {
        this.queryList(this.pageInfo.currPage)
      } else {
        this.$message('请输入正确得手机号码')
      }
    },
    queryList(page = 1) {
      this.list = []
      this.pageInfo.currPage = page
      console.log('查询列表')
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
