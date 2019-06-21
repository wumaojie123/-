<template lang="html">
  <div class="page-container">
    <analysis-picker layout="date, merchant, equipmentType" @change="pickerChange" />
    <card-wrapper label="点位投放效果">
      <el-row>
        <el-col :span="12">
          <div ref="siteInfo" class="echarts-item">
            <div class="empty-panel">
              <img src="../image/nothing.png" alt="">
              <p>暂无数据</p>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div ref="siteInfoPercent" class="echarts-item">
            <div class="empty-panel">
              <img src="../image/nothing.png" alt="">
              <p>暂无数据</p>
            </div>
          </div>
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
import { getSiteEffectData, getSiteIncomeTrend } from '@/api/dataAnalysis'
import { siteDict, siteEarnTrendOption, siteInfoOption, siteInfoPercentOption } from './option'

export default {
  components: {
    AnalysisPicker,
    CardWrapper
  },
  data() {
    return {
      siteEarnTrend: null,
      siteInfoCharts: null,
      siteInfoPercentCharts: null
    }
  },
  methods: {
    pickerChange(params) {
      this.getSiteEffectData(params)
      this.getSiteIncomeTrend(params)
    },
    getSiteEffectData(params) {
      getSiteEffectData(params).then(res => {
        if (!res.data || res.data.length === 0) {
          return
        }
        this.siteInfoCharts = echarts.init(this.$refs.siteInfo)
        this.siteInfoPercentCharts = echarts.init(this.$refs.siteInfoPercent)
        const barEchartsData = this._siteEffctBarDataTube(res.data)
        const pieEchartsData = this._siteEffctPieDataTube(res.data)
        siteInfoOption.xAxis.data = barEchartsData.xAxisData
        siteInfoOption.series[0].data = barEchartsData.seriesData1
        siteInfoOption.series[1].data = barEchartsData.seriesData2
        this.siteInfoCharts.setOption(siteInfoOption)

        siteInfoPercentOption.legend.data = pieEchartsData.legendData
        siteInfoPercentOption.series[0].data = pieEchartsData.seriesData
        this.siteInfoPercentCharts.setOption(siteInfoPercentOption)
      })
    },
    _siteEffctBarDataTube(data) {
      const xAxisData = []
      const seriesData1 = []
      const seriesData2 = []
      data.forEach(item => {
        xAxisData.push(this.searchSiteName(item.location))
        seriesData1.push(item.equipmentCount)
        seriesData2.push(item.amount)
      })
      return {
        xAxisData,
        seriesData1,
        seriesData2
      }
    },
    _siteEffctPieDataTube(data) {
      const legendData = []
      const seriesData = []
      data.forEach(item => {
        const siteName = this.searchSiteName(item.location)
        const legendDataItem = {
          name: siteName,
          icon: 'rect'
        }
        legendData.push(legendDataItem)

        const seriesDataItem = {
          name: siteName,
          value: item.equipmentCount
        }

        seriesData.push(seriesDataItem)
      })
      return {
        legendData,
        seriesData
      }
    },
    getSiteIncomeTrend(params) {
      getSiteIncomeTrend(params).then(res => {
        if (!res.data) {
          return
        }
        this.siteEarnTrend = echarts.init(this.$refs.siteEarnTrend)
        const echartsData = this._siteIncomeTrendDataTube(res.data)
        siteEarnTrendOption.xAxis.data = echartsData.xAxisData
        siteEarnTrendOption.legend.data = echartsData.legendData
        siteEarnTrendOption.series = echartsData.seriesData
        this.siteEarnTrend.setOption(siteEarnTrendOption)
      })
    },
    _siteIncomeTrendDataTube(data) {
      const legendData = []
      const seriesData = []
      let xAxisData = []
      for (const key in data) {
        const itemName = this.searchSiteName(key) + '-成交金额(元)'
        const legendItem = {
          icon: 'circle'
        }
        legendItem.name = itemName
        legendData.push(legendItem)

        const itemData = data[key]
        const seriesItem = {
          data: itemData.map(item => item.amount),
          name: itemName,
          type: 'line'
        }
        seriesData.push(seriesItem)

        xAxisData = itemData.map(item => item.statisticsDate)
      }

      return {
        legendData,
        seriesData,
        xAxisData
      }
    },
    searchSiteName(siteValue) {
      const siteIndex = siteDict.findIndex(item => {
        return item.value === siteValue
      })
      if (siteIndex > -1) {
        return siteDict[siteIndex].name
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-container {
    padding: 20px;

    .empty-panel {

      img {
        height: 220px;
        display: block;
        margin: 30px auto;
      }

      p {
        text-align: center;
        color: #999;
      }
    }

    .echarts-item {
      width: 100%;
      height: 300px;
    }
  }
</style>
