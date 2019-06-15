<template lang="html">
  <div class="page-container">
    <analysis-picker />
    <card-wrapper label="点位投放效果">
      abd
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
import { siteEarnTrendOption } from './option'

export default {
  components: {
    AnalysisPicker,
    CardWrapper
  },
  data() {
    return {
      siteEarnTrend: null
    }
  },
  mounted() {
    this.creatEcharts()
  },
  methods: {
    creatEcharts() {
      this.$nextTick(() => {
        this.siteEarnTrend = echarts.init(this.$refs.siteEarnTrend)
        this.siteEarnTrend.setOption(siteEarnTrendOption)
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
