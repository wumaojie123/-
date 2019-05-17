<template>
  <div class="content-area">
    <el-form :inline="true" label-width="100px" label-position="right">
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
        <el-input v-model="query.groupName" placeholder="请输入场地名称" clearable/>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="queryList(1)">查询</el-button>
      <el-button type="primary" plain @click="exportData">导出数据</el-button>
    </el-form>
    <div class="btn-group">
      <span :class="{'active': dateActive == 'day'}" class="date-btn" @click="searchDate('day')">昨天</span>
      <span :class="{'active': dateActive == 'week'}" class="date-btn" @click="searchDate('week')">近7天</span>
      <span :class="{'active': dateActive == 'month'}" class="date-btn" @click="searchDate('month')">近30天</span>
      <span :class="{'active': dateActive == 'year'}" class="date-btn" @click="searchDate('year')">半年</span>
    </div>
    <!-- 商家信息 -->
    <div class="lyy-table-header">
      <span style="margin: 0 20px;">商家名称：{{ agentUserName }}</span>|
      <span style="margin: 0 20px;">商家账号：{{ query.userName }}</span>
    </div>
    <!-- 列表 -->
    <el-table v-loading="listLoading" :data="list" show-summary border style="width: 100%;margin-bottom: 20px;">
      <el-table-column prop="associateSellerPhone" label="场地名称" align="center">
        <template slot-scope="scope">
          <router-link :to="{path: '/equipmentReport', query: {begin: dateRange[0], end: dateRange[1], userName: query.userName, groupId: scope.row.groupId, groupName: scope.row.groupName, name: agentUserName}}" class="lyy-a-link">{{ scope.row.groupName }}</router-link>
        </template>
      </el-table-column>
      <!-- <el-table-column v-for="(item, index) in colums" :key="index" :prop="item.key" :label="item.label" :width="item.width" :sortable="item.sortable" align="center"/> -->
      <el-table-column label="订单数量" align="center" prop="orderCount" sortable="true">
        <template slot-scope="scope">
          <span>{{ scope.row.orderCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收入总额(元)" align="center" prop="totalIncome" sortable="true">
        <template slot-scope="scope">
          <span>{{ scope.row.totalIncome }}</span>
        </template>
      </el-table-column>
      <el-table-column label="在线收入(元)" align="center" prop="onlineIncome" sortable="true">
        <template slot-scope="scope">
          <span>{{ scope.row.onlineIncome }}</span>
        </template>
      </el-table-column>
      <el-table-column label="现金收入(元)" align="center" prop="cashIncome" sortable="true">
        <template slot-scope="scope">
          <span>{{ scope.row.cashIncome }}</span>
        </template>
      </el-table-column>
      <el-table-column label="广告收入(元)" align="center" prop="adIncome" sortable="true">
        <template slot-scope="scope">
          <span>{{ scope.row.adIncome }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showCoinsFields" label="线上投币(个)" align="center" prop="onlineCoinsCount">
        <template slot-scope="scope">
          <span>{{ scope.row.onlineCoinsCount }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showCoinsFields" label="线下投币(个)" align="center" prop="offlineCoinsCount">
        <template slot-scope="scope">
          <span>{{ scope.row.offlineCoinsCount }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showCoinsFields" label="合计投币(个)" align="center" prop="totalCoins">
        <template slot-scope="scope">
          <span>{{ scope.row.totalCoins }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showMaterialFields" label="礼品消耗(个)" align="center" prop="materialQuantity">
        <template slot-scope="scope">
          <span>{{ scope.row.materialQuantity }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showMaterialFields" label="出礼总成本" align="center" prop="materialCost">
        <template slot-scope="scope">
          <span>{{ scope.row.materialCost }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showMaterialFields" :render-header="renderGiftCost" align="center" prop="materialRate">
        <template slot-scope="scope">
          <span>{{ scope.row.materialRate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="当前设备总量" align="center" prop="equipmentTotalCount">
        <template slot-scope="scope">
          <span>{{ scope.row.equipmentTotalCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="昨日在线设备量" align="center" prop="equipmentOnlineCount">
        <template slot-scope="scope">
          <span>{{ scope.row.equipmentOnlineCount }}</span>
        </template>
      </el-table-column>
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

    <DialogExplain :visiable="dialogVisiable" @close-dialog="closeDialog" />
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
import { fetchPlaceList } from '@/api/managerstatis'
import { options } from './utils'
import DialogExplain from './DialogExplain'
export default {
  components: { DialogExplain },
  data() {
    return {
      dateRange: [],
      listLoading: true,
      list: [],
      showCoinsFields: false, // 展示投币相关
      showMaterialFields: false, // 展示出礼相关
      colums: [
        { key: 'orderCount', label: '订单数量', sortable: true },
        { key: 'totalIncome', label: '收入总额(元)', sortable: true },
        { key: 'onlineIncome', label: '在线收入(元)', sortable: true },
        { key: 'cashIncome', label: '现金收入(元)', sortable: true },
        { key: 'adIncome', label: '广告收入(元)', sortable: true }
      ],
      pageInfo: { total: 20, pageSize: 10, currPage: 1 },
      options: options,
      agentUserName: '',
      query: { userName: '', groupName: '' },
      dateActive: 'day', // 当前选择的统计日期 day--昨天 week--本周 month--本月 year--半年
      dialogVisiable: false
    }
  },
  beforeMount() {
    // 获取参数
    this.query.userName = this.$route.query.associateSellerPhone
    this.agentUserName = this.$route.query.agentUserName
    // 统计日期默认为登录日期的昨天
    this.dateRange[0] = this.$route.query.begin
    this.dateRange[1] = this.$route.query.end
    // 计算从上级页面传的时间得出查询天数范围
    let [dayTime, startTime, endTime] = []
    if (this.$route.query.begin && this.$route.query.end) {
      startTime = new Date(this.$route.query.begin.replace(/-/g, '/'))
      endTime = new Date(this.$route.query.end.replace(/-/g, '/'))
      dayTime = parseInt((endTime.getTime() - startTime.getTime()) / (1000 * 24 * 60 * 60)) + 1
      if (dayTime === 1) {
        this.dateActive = 'day'
      } else if (dayTime === 7) {
        this.dateActive = 'week'
      } else if (dayTime === 30) {
        this.dateActive = 'month'
      } else if (dayTime === 179) {
        this.dateActive = 'year'
      }
    }
    // this.dateRange[0] = parseTime(Date.now() - 24 * 60 * 60 * 1000, '{y}-{m}-{d}')
    // this.dateRange[1] = parseTime(Date.now() - 24 * 60 * 60 * 1000, '{y}-{m}-{d}')
    this.queryList()
  },
  methods: {
    renderGiftCost(h) {
      return [
        h('span', {}, ['出礼比例']),
        h('i', {
          class: 'el-icon-warning',
          style: 'margin-left: 5px',
          on: {
            click: () => {
              this.dialogVisiable = true
            }
          }
        })
      ]
    },
    queryList(page = 1) {
      this.listLoading = true
      this.pageInfo.currPage = page
      const postData = this.query
      postData.pageIndex = this.pageInfo.currPage
      postData.pageSize = this.pageInfo.pageSize
      postData.startDate = this.dateRange[0]
      postData.endDate = this.dateRange[1]
      fetchPlaceList(postData).then(res => {
        this.listLoading = false
        if (res.data) {
          this.list = res.data && res.data.items || []
          this.pageInfo.total = res.data.total || 0
          this.showCoinsFields = res.data.showCoinsFields
          this.showMaterialFields = res.data.showMaterialFields
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
    },
    // 导出数据
    exportData() {
      const params = 'userName=' + this.query.userName + '&startDate=' + this.dateRange[0] + '&endDate=' + this.dateRange[1] + '&groupName=' + this.query.groupName
      window.location = encodeURI('/agent/rest/export/benefit/group?' + params)
    },
    // 查询时间
    searchDate(time) {
      this.dateActive = time
      if (time === 'day') {
        this.dateRange = [parseTime(Date.now() - 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(Date.now() - 24 * 60 * 60 * 1000, '{y}-{m}-{d}')]
      } else if (time === 'week') {
        this.dateRange = [parseTime(Date.now() - 7 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(Date.now() - 24 * 60 * 60 * 1000, '{y}-{m}-{d}')]
      } else if (time === 'month') {
        this.dateRange = [parseTime(Date.now() - 30 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(Date.now() - 24 * 60 * 60 * 1000, '{y}-{m}-{d}')]
      } else if (time === 'year') {
        this.dateRange = [parseTime(Date.now() - 179 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(Date.now() - 24 * 60 * 60 * 1000, '{y}-{m}-{d}')]
      }
      this.queryList()
    },
    // 关闭弹窗
    closeDialog(value) {
      this.dialogVisiable = value
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
.btn-group{
  padding-left: 100px;
  margin-bottom: 20px;
}
.date-btn{
  display: inline-block;
  width: 55px;
  height: 26px;
  text-align: center;
  line-height: 24px;
  font-size: 12px;
  background-color: #eee;
  color: #999;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #eee;
}
.date-btn.active{
  background-color: #fff;
  border-color: #3089dc;
}
</style>
