<template lang="html">
  <div class="page-container">
    <div class="search-form-item">
      <analysis-picker layout="date, merchant, equipmentType" @change="pickerChange">
        <el-button type="text" @click="exportData">
          <i class="el-icon-download" />
          导出数据
        </el-button>
      </analysis-picker>
    </div>
    <div class="main">
      <card-wrapper label="整体销售趋势">
        <column-item :item-list="itemList" :show-tips-icon="true" :mouseover="showTooltip"/>
        <div v-loading="salesTrendloading" ref="salesTrend" class="echarts-item"/>
      </card-wrapper>
      <card-wrapper label="各商品成交分析">
        <div v-loading="doneNumloading" ref="doneNumTrend" class="echarts-item"/>
      </card-wrapper>
      <card-wrapper label="商品销售排行榜">
        <el-radio-group v-model="searchFormInfo.orderBy" class="radio-group" @change="getProductRanking">
          <el-radio label="amount">按成交金额</el-radio>
          <el-radio label="rate">按利润贡献率</el-radio>
          <el-radio label="quantity">按出货量</el-radio>
          <el-radio label="order_count">按成交订单量</el-radio>
        </el-radio-group>
        <el-table
          v-loading="rankingloading"
          :border="true"
          :data="rankingList"
          :header-cell-style="{
            backgroundColor: '#F3F3F3'
          }"
          :height="500"
          :default-sort="{prop: 'devicenum', order: 'descending'}"
          class="sales-range-table"
        >
          <el-table-column
            align="center"
            prop="rank"
            width="50"
            label="排名"/>
          <el-table-column
            prop="lyyMaterialName"
            align="center"
            label="商品名称"
          />
          <el-table-column
            align="center"
            prop="quantity"
            label="出货量"
          />
          <el-table-column
            align="center"
            prop="orderCount"
            label="成交订单量（笔）"
          />
          <el-table-column
            align="center"
            prop="amount"
            label="成交金额（元）"
          />
          <el-table-column
            align="center"
            prop="rate"
            label="利润贡献率"
          >
            <template slot="header" slot-scope="scope">
              利润贡献率
              <i class="el-icon-question" @click="showTooltip(profitTips)"/>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="searchFormInfo.pageIndex"
          :page-sizes="[20, 50, 100, 200]"
          :page-size="20"
          :total="searchFormInfo.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </card-wrapper>
    </div>
    <explain-modal
      :visible="tooltipsVisible"
      :content="tooltipsInfo.content"
      :confirm-fn="closeTooltip"
    />
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js'
import AnalysisPicker from '../components/AnalysisPicker'
import CardWrapper from '../components/CardWrapper'
import ColumnItem from '../components/ColumnItem'
import ExplainModal from '../components/ExplainModal'
import { salesTrendOption, doneNumOption } from './option'
import {
  analysisMaterialSaleTrendApi,
  analysisMaterialByMaterialApi,
  analysisMaterialRankingApi,
  analysisExportMaterialSaleRankingApi
} from '@/api/dataAnalysis'

export default {
  name: 'Zone',
  components: {
    AnalysisPicker,
    ColumnItem,
    ExplainModal,
    CardWrapper
  },
  data() {
    return {
      searchFormInfo: {
        pageIndex: 1,
        pageSize: 20,
        total: 0,
        orderBy: 'amount'
      },
      tooltipsVisible: false,
      tooltipsInfo: {
        title: '说明',
        content: ''
      },
      itemList: [
        {
          txt: '在架商品种数',
          tips: '“在架商品种数” 指统计时间段内，关联了设备的商品种类数量。',
          count: null,
          type: 'sortCount'
        },
        {
          txt: '动销商品种数',
          tips: '“动销商品种数” 指统计时间段内，销量 > 0的商品种类数量。',
          count: null,
          type: 'sortSales'
        },
        {
          txt: '商品出货量',
          tips: '“商品出货量” 指统计时间段内，出货的总数量。',
          count: null,
          type: 'quantity'
        }
      ],
      salesTrend: null,
      doneNumTrend: null,
      rankingList: [],
      profitTips: '利润贡献率=（单个商品零售总额-单个商品成本总额）/（全部售卖出去的商品成交总额-全部售卖出去的商品成本总额）*100%',
      salesTrendloading: false,
      doneNumloading: false,
      rankingloading: false
    }
  },
  methods: {
    // 分页设置
    handleSizeChange(val) {
      this.searchFormInfo.pageSize = val
      this.getProductRanking()
    },
    handleCurrentChange(val) {
      this.searchFormInfo.pageIndex = val
      this.getProductRanking()
    },
    getProductTrend() {
      this.salesTrendloading = true
      analysisMaterialSaleTrendApi({
        ...this.searchFormInfo
      }).then((res) => {
        if (res.result === 0) {
          this.salesTrendloading = false
          const { quantity, sortCount, sortSales } = res.data.yesterday
          this.itemList = this.itemList.map((v) => {
            if (v.type === 'quantity') {
              v.count = quantity
            } else if (v.type === 'sortCount') {
              v.count = sortCount
            } else if (v.type === 'sortSales') {
              v.count = sortSales
            }
            return v
          })
          const statisticsDateList = res.data.trend.map(v => v.statisticsDate) || []
          const quantityList = res.data.trend.map(v => v.quantity) || []
          const amountList = res.data.trend.map(v => v.amount) || []
          salesTrendOption.xAxis.data = statisticsDateList
          salesTrendOption.series[0].data = quantityList
          salesTrendOption.series[1].data = amountList
          this.$nextTick(() => {
            this.salesTrend = echarts.init(this.$refs.salesTrend)
            this.salesTrend.setOption(salesTrendOption, true)
          })
        }
      })
    },
    getProductDone() {
      this.doneNumloading = true
      analysisMaterialByMaterialApi({
        ...this.searchFormInfo
      }).then((res) => {
        if (res.result === 0) {
          this.doneNumloading = false
          const nameList = res.data.map(v => v.lyyMaterialName) || []
          const quantityList = res.data.map(v => v.quantity) || []
          const amountList = res.data.map(v => v.amount) || []
          doneNumOption.xAxis[0].data = nameList
          doneNumOption.series[0].data = amountList
          doneNumOption.series[1].data = quantityList
          this.$nextTick(() => {
            this.doneNumTrend = echarts.init(this.$refs.doneNumTrend)
            this.doneNumTrend.setOption(doneNumOption, true)
          })
        }
      })
    },
    getProductRanking() {
      this.rankingloading = true
      analysisMaterialRankingApi({
        ...this.searchFormInfo
      }).then((res) => {
        if (res.result === 0) {
          this.rankingloading = false
          this.rankingList = res.data.items
          this.searchFormInfo.total = res.data.total
        }
      })
    },
    // 导出数据
    exportData() {
      analysisExportMaterialSaleRankingApi(this.searchFormInfo)
    },
    pickerChange(data) {
      this.searchFormInfo = {
        ...this.searchFormInfo,
        ...data
      }
      this.getProductTrend()
      this.getProductDone()
      this.getProductRanking()
    },
    showTooltip(content) {
      this.tooltipsVisible = true
      this.tooltipsInfo = {
        content
      }
    },
    closeTooltip() {
      this.tooltipsVisible = false
      this.tooltipsInfo = {
        title: '说明',
        content: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-container {
    padding: 20px;
  }

  .main {
    .el-icon-question {
      font-size: 20px;
      color: #dcdcdc;
      cursor: pointer;
    }
    .el-pagination {
      margin-top: 10px;
    }
    .radio-group {
      margin-bottom: 20px;
    }
    .echarts-item {
      width: 100%;
      height: 300px;
    }
  }
</style>
