<template>
  <div class="content-area">
    <el-form :inline="true" label-width="100px" label-position="right">
      <el-form-item label="统计日期">
        <el-date-picker
          v-model="dateRange"
          :clearable="false"
          :picker-options="options"
          :unlink-panels="true"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"/>
      </el-form-item>
      <el-form-item :label="`${roletype}账号`">
        <el-input v-model="queryParams.associateSellerPhone" :placeholder="`请输入${roletype}账号`" clearable/>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="handleQueryParams">查询</el-button>
      <el-button type="primary" plain @click="exportData">导出数据</el-button>
    </el-form>
    <div class="btn-group">
      <span :class="{'active': dateActive == 'day'}" class="date-btn" @click="searchDate('day')">昨天</span>
      <span :class="{'active': dateActive == 'week'}" class="date-btn" @click="searchDate('week')">近7天</span>
      <span :class="{'active': dateActive == 'month'}" class="date-btn" @click="searchDate('month')">近30天</span>
      <span :class="{'active': dateActive == 'year'}" class="date-btn" @click="searchDate('year')">半年</span>
    </div>
    <!-- tab 切换商家和代理 -->
    <el-tabs v-model="active" type="card" @tab-click = "handlerTabClick">
      <el-tab-pane label="商家" name="merchant">
        <!-- 列表 -->
        <el-table v-loading="listLoading" :data="list" show-summary border style="width: 100%;margin-bottom: 20px;">
          <el-table-column prop="associateSellerPhone" label="账号" align="center">
            <template slot-scope="scope">
              <router-link :to="{path: '/placeReport', query: {agentUserName: scope.row.agentUserName, associateSellerPhone: scope.row.associateSellerPhone, begin: dateRange[0], end: dateRange[1]}}" class="lyy-a-link">{{ scope.row.associateSellerPhone }}</router-link>
            </template>
          </el-table-column>
          <!-- <el-table-column v-for="(item, index) in colums" :key="index" :prop="item.key" :label="item.label" :width="item.width" :sortable="item.sortable" align="center"/> -->
          <el-table-column label="商家名称" align="center" prop="agentUserName" width="250" >
            <template slot-scope="scope">
              <span>{{ scope.row.agentUserName }}</span>
            </template>
          </el-table-column>
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
          <el-table-column v-if="showMaterialFields" label="出礼总成本(元)" align="center" prop="materialCost">
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
      <el-tab-pane v-if="type !== 2" label="代理" name="agent">
        <!-- 列表 -->
        <el-table v-loading="listLoading" :data="agentList" show-summary border style="width: 100%;margin-bottom: 20px;">
          <el-table-column prop="associateSellerPhone" label="账号" align="center"/>
          <!-- <el-table-column v-for="(item, index) in colums2" :key="index" :prop="item.key" :label="item.label" :width="item.width" :sortable="item.sortable" align="center"/> -->
          <el-table-column label="代理名称" align="center" prop="agentUserName" width="250" >
            <template slot-scope="scope">
              <span>{{ scope.row.agentUserName }}</span>
            </template>
          </el-table-column>
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
    <DialogExplain :visiable="dialogVisiable" @close-dialog="closeDialog" />
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
import { fetchList } from '@/api/managerstatis'
import { getAngent } from '@/api/angentManage'
import DialogExplain from './DialogExplain'
const NOW = Date.now()
// 最大支持最近180天
const OPTIONS = {
  disabledDate: (time) => {
    console.log(time)
    const timeItem = time.getTime()
    return timeItem < NOW - 24 * 60 * 60 * 180 * 1000 || timeItem > NOW
  }
}
export default {
  components: { DialogExplain },
  data() {
    return {
      roletype: '商家',
      queryParams: { agentUserName: '', associateSellerPhone: '', associateSellerName: '' },
      dateRange: [],
      listLoading: true,
      list: [],
      agentList: [],
      showCoinsFields: false, // 展示投币相关
      showMaterialFields: false, // 展示出礼相关
      colums: [
        { key: 'agentUserName', label: '商家名称', width: 250 },
        { key: 'orderCount', label: '订单数量', sortable: true },
        { key: 'totalIncome', label: '收入总额(元)', sortable: true },
        { key: 'onlineIncome', label: '在线收入(元)', sortable: true },
        { key: 'cashIncome', label: '现金收入(元)', sortable: true },
        { key: 'adIncome', label: '广告收入(元)', sortable: true }
      ],
      colums2: [
        { key: 'agentUserName', label: '代理名称', width: 250 },
        { key: 'orderCount', label: '订单数量', sortable: true },
        { key: 'totalIncome', label: '收入总额(元)', sortable: true },
        { key: 'onlineIncome', label: '在线收入(元)', sortable: true },
        { key: 'cashIncome', label: '现金收入(元)', sortable: true },
        { key: 'adIncome', label: '广告收入(元)', sortable: true }

      ],
      pageInfo: { total: 20, pageSize: 10, currPage: 1 },
      options: OPTIONS,
      active: 'merchant',
      type: '',
      dateActive: 'day', // 当前选择的统计日期 day--昨天 week--本周 month--本月 year--半年
      dialogVisiable: false
    }
  },
  beforeMount() {
    // 统计日期默认为登录日期的昨天
    this.dateRange[0] = parseTime(Date.now() - 24 * 60 * 60 * 1000, '{y}-{m}-{d}')
    this.dateRange[1] = parseTime(Date.now() - 24 * 60 * 60 * 1000, '{y}-{m}-{d}')
    this.queryAgentType()
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
    queryAgentType() {
      getAngent().then(res => {
        this.type = res.data.type
      })
    },
    // tab切换
    handlerTabClick(obj) {
      this.roletype = obj.label
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
      location.href = encodeURI('/agent/rest/export/reportFroms?startDate=' + this.dateRange[0] + '&endDate=' + this.dateRange[1] + '&roleStr=' + this.active)
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

