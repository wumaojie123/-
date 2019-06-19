<template lang="html">
  <div class="page-container">
    <analysis-picker layout="date, merchant, equipmentType" @change="pickerChange">
      <el-button type="text" @click="exportData">
        <i class="el-icon-download" />
        导出数据
      </el-button>
    </analysis-picker>
    <card-wrapper label="点位投放效果">
      <el-row>
        <el-col :span="12">
          <div ref="siteInfo" class="echarts-item" />
        </el-col>
        <el-col :span="12">
          <div ref="siteInfoPercent" class="echarts-item" />
        </el-col>
      </el-row>
    </card-wrapper>
    <card-wrapper label="点位收益趋势">
      <div ref="siteEarnTrend" class="echarts-item" />
    </card-wrapper>
  </div>
</template>

<script>
import AnalysisPicker from '../components/AnalysisPicker/'
import CardWrapper from '../components/CardWrapper/'
import echarts from 'echarts'
import { siteEarnTrendOption, siteInfoOption, siteInfoPercentOption } from './option'

export default {
  components: {
    AnalysisPicker,
    CardWrapper
  },
  data() {
    return {
      siteEarnTrend: null,
      siteInfoCharts: null
    }
  },
  mounted() {
    this.creatEcharts()
  },
  methods: {
    creatEcharts() {
      this.$nextTick(() => {
        this.siteEarnTrend = echarts.init(this.$refs.siteEarnTrend)
        this.siteInfoCharts = echarts.init(this.$refs.siteInfo)
        this.siteInfoPercentCharts = echarts.init(this.$refs.siteInfoPercent)
        this.siteEarnTrend.setOption(siteEarnTrendOption)
        this.siteInfoCharts.setOption(siteInfoOption)
        this.siteInfoPercentCharts.setOption(siteInfoPercentOption)
      })
    },
    exportData() {

    },
    pickerChange(params) {
      console.log(params)
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
