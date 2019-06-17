<template lang="html">
  <div class="page-container">
    <analysis-picker />
    <card-wrapper label="订单趋势">
      <div ref="orderTrend" class="echarts-item" />
    </card-wrapper>
    <card-wrapper label="订单高峰分布">
      <div ref="orderTimeTrend" class="echarts-item" />
    </card-wrapper>
    <card-wrapper label="占比分析">
      <el-row>
        <el-col :span="8">
          <div ref="paymentType" class="echarts-item" />
        </el-col>
        <el-col :span="8">
          <div ref="paymentState" class="echarts-item" />
        </el-col>
        <el-col :span="8">
          <div class="translate-charts">
            a
          </div>
        </el-col>
      </el-row>
    </card-wrapper>
    <card-wrapper label="订单报表">
      <el-table
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
          prop="lyyMaterialName"
          label="日期" />
        <el-table-column
          align="center"
          prop="materialNo"
          label="成交订单量(笔)" />
        <el-table-column
          align="center"
          prop="amount"
          label="成交金额(元)" />
        <el-table-column
          align="center"
          prop="quantity"
          label="成交人数" />
        <el-table-column
          width="240"
          align="center">
          <template slot="header" slot-scope="scope">
            <el-tooltip class="profit-tips" effect="dark" content="单笔平均支付金额=成交金额/成交订单量" placement="top">
              <span>单笔平均支付金额(元) <i class="el-icon-question" /> </span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="quantity">
          <template slot="header" slot-scope="scope">
            <el-tooltip class="profit-tips" effect="dark" content="客单价=成交金额/成交人数" placement="top">
              <span>客单价 <i class="el-icon-question" /> </span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="quantity"
          label="退款订单量(笔)" />
        <el-table-column
          align="center"
          prop="quantity"
          label="退款金额(元)" />
      </el-table>
    </card-wrapper>
  </div>
</template>

<script>
import AnalysisPicker from '../components/AnalysisPicker/'
import CardWrapper from '../components/CardWrapper/'
import echarts from 'echarts'
import { orderTrendOption, orderTimeTrendOption, paymentTypeOption, paymentStateOption } from './option'

export default {
  components: {
    AnalysisPicker,
    CardWrapper
  },
  data() {
    return {
      orderTrend: null,
      orderTimeTrend: null,
      paymentType: null,
      paymentState: null,
      translate: null,
      orderTableData: []
    }
  },
  mounted() {
    this.creatEcharts()
  },
  methods: {
    creatEcharts() {
      this.$nextTick(() => {
        this.orderTrend = echarts.init(this.$refs.orderTrend)
        this.orderTimeTrend = echarts.init(this.$refs.orderTimeTrend)
        this.paymentType = echarts.init(this.$refs.paymentType)
        this.paymentState = echarts.init(this.$refs.paymentState)
        this.orderTrend.setOption(orderTrendOption)
        this.orderTimeTrend.setOption(orderTimeTrendOption)
        this.paymentType.setOption(paymentTypeOption)
        this.paymentState.setOption(paymentStateOption)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-container {
    padding: 20px;

    .echarts-item {
      width: 100%;
      height: 300px;
    }
  }
</style>
