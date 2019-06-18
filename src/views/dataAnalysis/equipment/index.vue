<template lang="html">
  <div class="page-container">
    <analysis-picker layout="equipmentType" @change="pickerChange" />
    <card-wrapper label="设备状况">
      <el-row>
        <el-col :span="12">
          <div ref="onlineScale" class="echarts-item" />
        </el-col>
        <el-col :span="12">
          <div ref="equipmentTypeScale" class="echarts-item" />
        </el-col>
      </el-row>
    </card-wrapper>
    <card-wrapper label="设备进货、出货量">
      <div ref="importAndExport" class="echarts-item" />
    </card-wrapper>
  </div>
</template>

<script>
import AnalysisPicker from '../components/AnalysisPicker/'
import CardWrapper from '../components/CardWrapper/'
import echarts from 'echarts'
import { onlineScaleOption, equipmentTypeScaleOption, importAndExportOption } from './option'

export default {
  components: {
    AnalysisPicker,
    CardWrapper
  },
  data() {
    return {
      importAndExport: null,
      onlineScale: null,
      equipmentTypeScale: null
    }
  },
  mounted() {
    this.creatEcharts()
  },
  methods: {
    creatEcharts() {
      this.$nextTick(() => {
        this.importAndExport = echarts.init(this.$refs.importAndExport)
        this.onlineScale = echarts.init(this.$refs.onlineScale)
        this.equipmentTypeScale = echarts.init(this.$refs.equipmentTypeScale)
        this.importAndExport.setOption(importAndExportOption)
        this.onlineScale.setOption(onlineScaleOption)
        this.equipmentTypeScale.setOption(equipmentTypeScaleOption)
      })
    },
    pickerChange(value) {
      console.log(value)
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
