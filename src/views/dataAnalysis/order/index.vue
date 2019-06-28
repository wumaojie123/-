<template lang="html">
  <div class="page-container">
    <analysis-picker @change="pickerChange" @exportFile="exportDataHandle" />
    <card-wrapper label="订单趋势">
      <el-checkbox-group
        v-model="checkedType"
        :min="1"
        :max="4"
        @change="checkedTypeChange">
        <el-checkbox v-for="type in typeOptions" :label="type.value" :key="type.value">{{ type.text }}</el-checkbox>
      </el-checkbox-group>
      <div v-loading="orderTrendLoading" ref="orderTrend" class="echarts-item" />
    </card-wrapper>
    <card-wrapper label="订单高峰分布">
      <template slot="sub-title">
        <i class="el-icon-question" @click="showTooltip(1)" />
      </template>
      <div v-loading="orderTimeTrendLoading" ref="orderTimeTrend" class="echarts-item" />
    </card-wrapper>
    <card-wrapper label="占比分析">
      <el-row>
        <el-col :span="8" class="echarts-panel">
          <p class="title">支付方式</p>
          <div v-loading="paymentTypeLoading" ref="paymentType" class="echarts-item" />
        </el-col>
        <el-col :span="8" class="echarts-panel">
          <p class="title">支付结果</p>
          <div v-loading="paymentStateLoading" ref="paymentState" class="echarts-item" />
        </el-col>
        <el-col :span="8" class="echarts-panel">
          <p class="title">订单转化率 <i class="el-icon-question" @click="showTooltip(2)" /> </p>
          <div class="translate-charts">
            <div class="charts-panel">
              <div class="col-1">
                <p>
                  <span>{{ `(${ conversionData.totalCount || 0 })笔提交订单` }}</span>
                </p>
              </div>
              <div class="col-2">
                <p>
                  <span>{{ `(${ conversionData.payCount || 0 })笔支付成功` }}</span>
                  <span>转化率为{{ conversionData.linkPay | percentFilter }}%</span>
                </p>
              </div>
              <div class="col-3">
                <p>
                  <span>{{ `(${ conversionData.compCount || 0 })笔交易成功` }}</span>
                  <span>转化率为{{ conversionData.linkComp | percentFilter }}%</span>
                </p>
              </div>
            </div>
            <div class="legend-panel">
              <p class="order-prepare">提交订单</p>
              <p class="order-pay">支付成功</p>
              <p class="order-successful">交易成功</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </card-wrapper>
    <card-wrapper label="订单报表">
      <el-table
        v-loading="orderTableLoading"
        :data="orderTableData"
        :header-cell-style="{
          backgroundColor: '#F8F8F8'
        }"
        height="280"
        class="rank-table"
        border
        style="width: 100%">
        <el-table-column
          align="center"
          prop="statisticsDate"
          label="日期" />
        <el-table-column
          align="center"
          label="成交订单量(笔)">
          <template slot-scope="scope">
            {{ scope.row.payCount || 0 }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="成交金额(元)">
          <template slot-scope="scope">
            {{ scope.row.payAmount | moneyFilter }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="成交人数">
          <template slot-scope="scope">
            {{ scope.row.payUser || 0 }}
          </template>
        </el-table-column>
        <el-table-column
          width="240"
          align="center">
          <template slot="header" slot-scope="scope">
            <span>单笔平均支付金额(元) <i class="el-icon-question" @click="showTooltip(3)" /></span>
          </template>
          <template slot-scope="scope">
            {{ scope.row.unitPrice | moneyFilter }}
          </template>
        </el-table-column>
        <el-table-column
          align="center">
          <template slot="header" slot-scope="scope">
            <span>客单价 <i class="el-icon-question" @click="showTooltip(4)" /> </span>
          </template>
          <template slot-scope="scope">
            {{ scope.row.unitPrice || 0 }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="退款订单量(笔)">
          <template slot-scope="scope">
            {{ scope.row.refundCount || 0 }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="退款金额(元)">
          <template slot-scope="scope">
            {{ scope.row.refundAmount | moneyFilter }}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="paginationInfo.pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="paginationInfo.pageSize"
        :total="paginationInfo.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </card-wrapper>
    <explain-modal
      :visible="tooltipsInfo.tooltipsVisible"
      :title="tooltipsInfo.title"
      :content="tooltipsInfo.content"
      :self-define-class="tooltipsInfo.selfDefineClass"
      :confirm-fn="closeTooltip"
    />
  </div>
</template>

<script>
import AnalysisPicker from '../components/AnalysisPicker/'
import CardWrapper from '../components/CardWrapper/'
import ExplainModal from '../components/ExplainModal'
import echarts from 'echarts'
import {
  getOrderTrendData,
  getOrderPeakData,
  getOrderPattern,
  getOrderResult,
  getOrderConversion,
  getOrderReportForms,
  exportOrderAnalysisData
} from '@/api/dataAnalysis'
import { orderTrendOption, orderTimeTrendOption, paymentTypeOption, paymentStateOption } from './option'

export default {
  components: {
    AnalysisPicker,
    CardWrapper,
    ExplainModal
  },
  filters: {
    percentFilter(originData) {
      if (!originData) {
        return 0
      } else {
        return +originData.toFixed(2)
      }
    }
  },
  data() {
    return {
      checkedType: [1, 2],
      typeOptions: [{
        text: '成交订单',
        value: 1,
        unit: '(笔)'
      },
      {
        text: '成交金额',
        value: 2,
        unit: '(元)'
      },
      {
        text: '退款订单',
        value: 3,
        unit: '(笔)'
      },
      {
        text: '退款金额',
        value: 4,
        unit: '(元)'
      }],
      orderTrendData: [],
      orderTrend: null,
      orderTimeTrend: null,
      paymentType: null,
      paymentState: null,
      translate: null,

      orderTrendLoading: false,
      orderTimeTrendLoading: false,
      paymentTypeLoading: false,
      paymentStateLoading: false,
      orderTableLoading: false,

      orderTableData: [],
      paginationInfo: {
        pageIndex: 1,
        pageSize: 20,
        total: 0
      },
      conversionData: {},
      paramsData: {},
      tooltipsInfo: {
        tooltipsVisible: false,
        content: '',
        title: ''
      }
    }
  },
  methods: {
    checkedTypeChange() {
      this.typeOptions.forEach(item => {
        const checkedTypeState = this.checkedType.some(typeItem => {
          return item.value === typeItem
        })
        if (checkedTypeState) {
          this.orderTrend.dispatchAction({
            type: 'legendSelect',
            name: item.text + item.unit
          })
        } else {
          this.orderTrend.dispatchAction({
            type: 'legendUnSelect',
            name: item.text + item.unit
          })
        }
      })
    },
    exportDataHandle(params) {
      exportOrderAnalysisData(params)
    },
    showTooltip(index) {
      switch (index) {
        case 1:
          this.tooltipsInfo.selfDefineClass = 'long-text'
          this.tooltipsInfo.title = '订单高峰分布'
          this.tooltipsInfo.content = `
            <p class='text'>1.横轴为具体的时间点，纵轴为查询时段内对应时间点下，各天的订单量之和。</p>
            <p class='text'>举例：假设查询时段为最近7天。则4点对应的纵轴是最近这7天在4点的下单量之和。</p>
          `
          this.tooltipsInfo.tooltipsVisible = true
          break
        case 2:
          this.tooltipsInfo.selfDefineClass = 'long-text'
          this.tooltipsInfo.title = '订单转化率'
          this.tooltipsInfo.content = `
            <p class='title'>
                漏斗每一层统计订单说明：
            </p>
            <p class='text'>1.提交订单层：显示统计区间内全部订单（支付成功&支付失败，包含退款的）的总数。</p>
            <p class='text'>2.支付成功层：显示统计区间内全部订单（支付成功包含退款的）的总数。</p>
            <p class='text'>3.完成交易层：显示统计区间内全部订单（支付成功的订单剔除全额退款的订单）对应的总数。</p>
          `
          this.tooltipsInfo.tooltipsVisible = true
          break
        case 3:
          this.tooltipsInfo.title = '温馨提示'
          this.tooltipsInfo.content = `单笔平均支付金额 = 成交金额 / 成交订单量`
          this.tooltipsInfo.tooltipsVisible = true
          break
        case 4:
          this.tooltipsInfo.title = '温馨提示'
          this.tooltipsInfo.content = `客单价= 成交金额 / 成交人数`
          this.tooltipsInfo.tooltipsVisible = true
          break
        default:
      }
    },
    pickerChange(value) {
      const paramsData = {
        ...value
      }
      this.paramsData = paramsData
      this.getOrderTrendData(paramsData)
      this.getOrderPeakData(paramsData)
      this.getOrderPattern(paramsData)
      this.getOrderResult(paramsData)
      this.getOrderConversion(paramsData)
      this.getOrderReportForms(paramsData)
    },
    getOrderTrendData(paramsData) {
      this.orderTrendLoading = true
      getOrderTrendData(paramsData).then(res => {
        if (!res.data) {
          return
        }
        const echartsData = this._orderTrendDataTube(res.data)
        this.orderTrend = echarts.init(this.$refs.orderTrend)
        this.orderTrendData = echartsData
        orderTrendOption.series[0].data = echartsData.line1
        orderTrendOption.series[1].data = echartsData.line2
        orderTrendOption.series[2].data = echartsData.line3
        orderTrendOption.series[3].data = echartsData.line4
        orderTrendOption.xAxis.data = echartsData.xAxis
        this.orderTrend.setOption(orderTrendOption)
        this.checkedTypeChange()
      }).finally(() => {
        this.orderTrendLoading = false
      })
    },
    _orderTrendDataTube(data) {
      const line1 = []
      const line2 = []
      const line3 = []
      const line4 = []
      const xAxis = []
      data.forEach(item => {
        xAxis.push(item.statisticsDate)
        line1.push(item.payCount || 0)
        line2.push(item.payAmount || 0)
        line3.push(item.refundCount || 0)
        line4.push(item.refundAmount || 0)
      })

      return {
        line1,
        line2,
        line3,
        line4,
        xAxis
      }
    },
    getOrderPeakData(paramsData) {
      this.orderTimeTrendLoading = true
      getOrderPeakData(paramsData).then(res => {
        if (!res.data) {
          return
        }
        this.orderTimeTrend = echarts.init(this.$refs.orderTimeTrend)
        const echartsData = this._orderPeakDataTube(res.data)
        orderTimeTrendOption.series[0].data = echartsData.line1
        orderTimeTrendOption.xAxis.data = echartsData.xAxis
        this.orderTimeTrend.setOption(orderTimeTrendOption)
      }).finally(() => {
        this.orderTimeTrendLoading = false
      })
    },
    _orderPeakDataTube(data) {
      const line1 = []
      const xAxis = []

      data.forEach(item => {
        xAxis.push(item.statisticsTime)
        line1.push(item.orderCount || 0)
      })

      return {
        line1,
        xAxis
      }
    },
    getOrderPattern(paramsData) {
      this.paymentTypeLoading = true
      getOrderPattern(paramsData).then(res => {
        this.paymentType = echarts.init(this.$refs.paymentType)
        if (!res.data || res.data.length <= 0) {
          paymentTypeOption.series[0].data[0].value = 0
          paymentTypeOption.series[0].data[1].value = 0
          paymentTypeOption.series[0].data[2].value = 0
          this.paymentType.setOption(paymentTypeOption)
          return
        }
        paymentTypeOption.series[0].data[0].value = res.data[1].payCount
        paymentTypeOption.series[0].data[1].value = res.data[0].payCount
        paymentTypeOption.series[0].data[2].value = res.data[2].payCount
        this.paymentType.setOption(paymentTypeOption)
      }).finally(() => {
        this.paymentTypeLoading = false
      })
    },
    getOrderResult(paramsData) {
      this.paymentStateLoading = true
      getOrderResult(paramsData).then(res => {
        this.paymentState = echarts.init(this.$refs.paymentState)
        if (!res.data || res.data.length <= 0) {
          paymentStateOption.series[0].data[0].value = 0
          paymentStateOption.series[0].data[1].value = 0
          this.paymentState.setOption(paymentStateOption)
          return
        }
        paymentStateOption.series[0].data[0].value = res.data[0].payCount
        paymentStateOption.series[0].data[1].value = res.data[1].payCount
        this.paymentState.setOption(paymentStateOption)
      }).finally(() => {
        this.paymentStateLoading = false
      })
    },
    getOrderConversion(paramsData) {
      getOrderConversion(paramsData).then(res => {
        if (!res.data) {
          return
        }
        this.conversionData.totalCount = res.data.totalCount
        this.conversionData.payCount = res.data.payCount
        this.conversionData.compCount = res.data.compCount
        this.conversionData.linkPay = res.data.linkPay
        this.conversionData.linkComp = res.data.linkComp
      })
    },
    getOrderReportForms(paramsData) {
      this.orderTableLoading = true
      paramsData.pageIndex = this.paginationInfo.pageIndex
      paramsData.pageSize = this.paginationInfo.pageSize
      getOrderReportForms(paramsData).then(res => {
        if (!res.data) {
          return
        }
        this.orderTableData = res.data.items
        this.paginationInfo.total = res.data.total
      }).finally(() => {
        this.orderTableLoading = false
      })
    },
    handleSizeChange() {
      this.getOrderReportForms({
        ...this.paramsData
      })
    },
    handleCurrentChange(val) {
      this.paginationInfo.pageIndex = val
      this.getOrderReportForms({
        ...this.paramsData
      })
    },
    closeTooltip() {
      this.tooltipsInfo = {
        tooltipsVisible: false,
        title: '',
        content: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-container {
    padding: 20px;

    .el-checkbox-group {
      padding-left: 50px;
    }

    .el-icon-question {
      color: #999;
      cursor: pointer;
    }

    .echarts-panel {
      position: relative;
      .title {
        position: absolute;
        width: 100%;
        height: 20px;
        left: 0;
        line-height: 20px;
        font-size: 16px;
        font-weight: bold;
        font-family: "Microsoft YaHei";
        padding-left: 20px;
      }
    }

    .echarts-item {
      width: 100%;
      height: 300px;
    }

    .translate-charts {
      width: 100%;
      height: 300px;
      padding-top: 45px;

      .charts-panel {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        // width: 70%;
        height: 220px;
        margin: 0 auto;
        padding-right: 10px;
        background: url("../image/rate-bg.png") center center / auto 100% no-repeat;
        >div {
          font-size: 14px;
          line-height: 24px;
          color: rgba(255, 255, 255, 1);
          font-weight: bold;
          display: flex;
          align-items: center;

          >p {
            display: flex;
            flex-direction: column;
          }
        }

        .col-1 {
          height: 75px;
          padding-top: 10px;
        }
        .col-2 {
          height: 70px;
        }
        .col-3 {
          height: 65px;
        }
      }

      .legend-panel {
        display: flex;
        justify-content: center;
        height: 20px;
        margin-top: 15px;
        align-items: center;

        >p {
          position: relative;
          padding-left: 20px;
          font-size: 12px;
          margin: 0 10px;

          &::after {
            position: absolute;
            content: "";
            width: 15px;
            height: 15px;
            left: 0;
            top: 50%;
            margin-top: -7px;
          }

          &.order-prepare::after {
            background-color: #ff46a9;
          }

          &.order-pay::after {
            background-color: #5c70ea;
          }

          &.order-successful::after {
            background-color: #42bd00;
          }
        }
      }
    }

    .el-pagination {
      padding: 20px;
    }
  }
</style>
