<template lang="html">
  <div class="page-container">
    <analysis-picker>
      <el-button type="text" @click="exportData">
        <i class="el-icon-download" />
        导出数据
      </el-button>
    </analysis-picker>
    <card-wrapper label="订单趋势">
      <div ref="orderTrend" class="echarts-item" />
    </card-wrapper>
    <card-wrapper label="订单高峰分布">
      <div ref="orderTimeTrend" class="echarts-item" />
    </card-wrapper>
    <card-wrapper label="占比分析">
      <el-row>
        <el-col :span="8" class="echarts-panel">
          <p class="title">订单转化率</p>
          <div ref="paymentType" class="echarts-item" />
        </el-col>
        <el-col :span="8" class="echarts-panel">
          <p class="title">订单转化率</p>
          <div ref="paymentState" class="echarts-item" />
        </el-col>
        <el-col :span="8" class="echarts-panel">
          <p class="title">订单转化率</p>
          <div class="translate-charts">
            <div class="charts-panel">
              <div class="col-1">
                <p>
                  <span>(25人)提交订单</span>
                </p>
              </div>
              <div class="col-2">
                <p>
                  <span>(5人)支付成功</span>
                  <span>转化率为18%</span>
                </p>
              </div>
              <div class="col-3">
                <p>
                  <span>(1人)交易成功</span>
                  <span>转化率为10%</span>
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
    },
    exportData() {

    }
  }
}
</script>

<style lang="scss" scoped>
  .page-container {
    padding: 20px;
    font-family: "Microsoft YaHei";

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
        justify-content: space-around;
        height: 20px;
        margin-top: 15px;
        align-items: center;

        >p {
          position: relative;
          padding-left: 20px;

          &::after {
            position: absolute;
            content: "";
            width: 16px;
            height: 16px;
            left: 0;
            top: 50%;
            margin-top: -8px;
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
  }
</style>
