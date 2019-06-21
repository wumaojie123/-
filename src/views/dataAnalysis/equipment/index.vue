<template lang="html">
  <div class="page-container">
    <analysis-picker layout="equipmentType" @change="pickerChange" />
    <card-wrapper label="设备状况">
      <el-row>
        <el-col :span="24">
          <column-item :item-list="typeInfoList" />
        </el-col>
        <el-col :span="12">
          <div ref="onlineScale" class="echarts-item" />
        </el-col>
        <el-col :span="12">
          <div ref="equipmentTypeScale" class="echarts-item" />
        </el-col>
      </el-row>
    </card-wrapper>
    <card-wrapper label="设备进货、出货量">
      <template slot="sub-title">
        <i class="el-icon-question" @click="showTooltip" />
      </template>
      <column-item :item-list="shipmentInfoList" />
      <div ref="importAndExport" class="echarts-item" />
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
import ColumnItem from '../components/ColumnItem'
import ExplainModal from '../components/ExplainModal'
import echarts from 'echarts'
import {
  getEquipmentStatusData,
  getEquipmentTypeData,
  getEquipmentStorageData,
  getEquipmentAllStorageData
} from '@/api/dataAnalysis'
import { onlineScaleOption, equipmentTypeScaleOption, shipmentOption } from './option'

export default {
  components: {
    AnalysisPicker,
    CardWrapper,
    ColumnItem,
    ExplainModal
  },
  data() {
    return {
      importAndExport: null,
      onlineScale: null,
      equipmentTypeScale: null,
      typeInfoList: [
        {
          txt: '设备总数(昨日)',
          count: 0
        },
        {
          txt: '在线设备数(昨日)',
          count: 0
        },
        {
          txt: '离线设备数(昨日)',
          count: 0
        },
        {
          txt: '设备离线率(昨日)',
          count: 0
        }
      ],
      shipmentInfoList: [
        {
          txt: '设备总进货量',
          count: 0
        },
        {
          txt: '设备总出货量',
          count: 0
        },
        {
          txt: '设备库存量',
          count: 0
        }
      ],
      tooltipsInfo: {
        tooltipsVisible: false,
        content: '',
        title: ''
      }
    }
  },
  methods: {
    pickerChange(params) {
      this.getEquipmentStatusData(params)
      this.getEquipmentTypeData(params)
      this.getShipmentData(params)
      this.getEquipmentAllStorageData(params)
    },
    getEquipmentStatusData(params) {
      getEquipmentStatusData(params).then(res => {
        if (!res.data) {
          return
        }
        this.typeInfoList[0].count = res.data.total
        this.typeInfoList[1].count = res.data.onLine
        this.typeInfoList[2].count = res.data.offLine
        this.typeInfoList[3].count = res.data.rate + '%'
        this.onlineScale = echarts.init(this.$refs.onlineScale)
        onlineScaleOption.series[0].data[0] = {
          name: '在线',
          value: res.data.onLine
        }
        onlineScaleOption.series[0].data[1] = {
          name: '离线',
          value: res.data.offLine
        }
        this.onlineScale.setOption(onlineScaleOption)
      })
    },
    getEquipmentTypeData(params) {
      getEquipmentTypeData(params).then(res => {
        if (!res.data || res.data.length === 0) {
          return
        }
        const echartsData = this._equipmentTypeDataTube(res.data)
        this.equipmentTypeScale = echarts.init(this.$refs.equipmentTypeScale)
        equipmentTypeScaleOption.legend.data = echartsData.legendData
        equipmentTypeScaleOption.series[0].data = echartsData.seriesData
        this.equipmentTypeScale.setOption(equipmentTypeScaleOption)
      })
    },
    _equipmentTypeDataTube(data) {
      const legendData = []
      const seriesData = []
      data.forEach(item => {
        legendData.push({
          name: item.equipmentTypeName,
          icon: 'rect'
        })
        seriesData.push({
          name: item.equipmentTypeName,
          value: item.equipmentCount
        })
      })

      return {
        legendData,
        seriesData
      }
    },
    getShipmentData(params) {
      getEquipmentStorageData(params).then(res => {
        const echartsData = this._shipmentDataTube(res.data)
        this.importAndExport = echarts.init(this.$refs.importAndExport)
        shipmentOption.xAxis.data = echartsData.xaxisData
        shipmentOption.series[0].data = echartsData.seriesData1
        shipmentOption.series[1].data = echartsData.seriesData2
        this.importAndExport.setOption(shipmentOption)
      })
    },
    _shipmentDataTube(data) {
      const xaxisData = []
      const seriesData1 = []
      const seriesData2 = []
      data.forEach(item => {
        xaxisData.push(item.statisticsDate)
        seriesData1.push(item.storageCount)
        seriesData2.push(item.outCount)
      })

      return {
        xaxisData,
        seriesData1,
        seriesData2
      }
    },
    getEquipmentAllStorageData(params) {
      getEquipmentAllStorageData(params).then(res => {
        this.shipmentInfoList[0].count = res.data.storageCount
        this.shipmentInfoList[1].count = res.data.outCount
        this.shipmentInfoList[2].count = res.data.stock
      })
    },
    showTooltip() {
      this.tooltipsInfo.selfDefineClass = 'long-text'
      this.tooltipsInfo.title = '温馨提示'
      this.tooltipsInfo.content = `
        <p class='text'>1，“设备出货量”：是指你卖给下级商家（或下级代理）的设备数量。这些已出货的设备，将显示在“设备管理 > 已转移设备”列表中。</p>
        <p class='text'>2，“设备进货量”：是指你跟乐摇摇购买的设备数量。</p>
        <p class='text'>3，设备库存量 =设备进货量 - 设备出货量。库存的设备将显示在“设备管理 > 待转移设备”列表中。（注意：商家解绑返回的设备，不计入库存量）</p>
      `
      this.tooltipsInfo.tooltipsVisible = true
    },
    closeTooltip() {
      this.tooltipsInfo = {
        tooltipsVisible: false,
        title: '温馨提示',
        content: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  padding: 20px;

  .el-icon-question {
    color: #999;
    cursor: pointer;
  }

  .echarts-item {
    width: 100%;
    height: 300px;
  }
}
</style>
