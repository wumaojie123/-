<template lang="html">
  <div class="zone-contanter">
    <div class="search-form-item">
      <analysis-picker layout="date, merchant, equipmentType" @change="pickerChange">
        <el-button type="text" @click="exportData">
          <i class="el-icon-download" />
          导出数据
        </el-button>
      </analysis-picker>
    </div>
    <div class="main">
      <div class="">
        <div ref="chinaMap" class="left-map"/>
        <div class="range-item">
          <span class="high">高</span>
          <span class="range range4"/>
          <span class="range range3"/>
          <span class="range range2"/>
          <span class="range range1"/>
          <span class="range range0"/>
          <span class="low">低</span>
        </div>
        <div class="select-type">
          <span>图例指标: </span>
          <el-radio-group v-model="searchFormInfo.orderBy" @change="changeType">
            <el-radio label="equipment_count">设备量</el-radio>
            <el-radio label="pay_count">订单量</el-radio>
            <el-radio label="pay_amount">订单总额</el-radio>
            <el-radio label="unit_price">客单价</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="right-table">
        <el-table
          :border="true"
          :data="tableData"
          :header-cell-style="{
            backgroundColor: '#F3F3F3'
          }"
          :height="500"
          :default-sort="{prop: 'devicenum', order: 'descending'}"
        >
          <el-table-column align="center" label="城市" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.provinceName + '-' + scope.row.cityName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="equipmentCount"
            label="设备量(台)"
            sortable/>
          <el-table-column
            align="center"
            prop="payCount"
            label="订单量"
            sortable/>
          <el-table-column
            align="center"
            prop="payAmount"
            label="订单总额(元)"
            sortable/>
          <el-table-column
            align="center"
            prop="unitPrice"
            label="客单价(元)"
            sortable/>
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
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js'
import AnalysisPicker from '../components/AnalysisPicker'
import { zoneChinaMapOption } from './option'

import {
  analysisAreaPaginationApi,
  analysisExportAreaApi
} from '@/api/dataAnalysis'

export default {
  name: 'Zone',
  components: {
    AnalysisPicker
  },
  data() {
    return {
      searchFormInfo: {
        pageIndex: 1,
        pageSize: 20,
        total: 10,
        district: -1,
        startDate: '2019-06-21',
        endDate: '2019-06-21',
        agentId: -1,
        agent: true,
        lyyEquipmentTypeId: -1,
        orderBy: 'equipment_count'
      },
      tableData: [],
      loading: false
    }
  },
  methods: {
    // 分页设置
    handleSizeChange(val) {
      this.searchFormInfo.pageSize = val
      this.createEcharts()
    },
    handleCurrentChange(val) {
      this.searchFormInfo.pageIndex = val
      this.createEcharts()
    },
    createEcharts() {
      analysisAreaPaginationApi({
        ...this.searchFormInfo
      }).then((res) => {
        if (res.result === 0) {
          const items = res.data.items
          this.searchFormInfo.total = res.data.total
          this.tableData = items
          const noRepeatData = {}
          let finalResult = []
          const seriesList = items.map(v => {
            let resetSeriesItem = {}
            const name = v.provinceName.split('省')[0]
            if (this.searchFormInfo.orderBy === 'equipment_count') {
              resetSeriesItem = {
                name,
                value: v.equipmentCount,
                ...v
              }
            } else if (this.searchFormInfo.orderBy === 'pay_count') {
              resetSeriesItem = {
                name,
                value: v.payAmount,
                ...v
              }
            } else if (this.searchFormInfo.orderBy === 'pay_amount') {
              resetSeriesItem = {
                name,
                value: v.unitPrice,
                ...v
              }
            } else if (this.searchFormInfo.orderBy === 'unit_price') {
              resetSeriesItem = {
                name,
                value: v.payCount,
                ...v
              }
            }
            noRepeatData[name] = resetSeriesItem // 存在多个市在同一个省份，需要处理用于地图显示，最好是接口直接返回
            return resetSeriesItem
          })
          for (const key in noRepeatData) {
            finalResult.push(noRepeatData[key])
          }
          finalResult = finalResult.map((v) => {
            const result = { ...v }
            function add(a, b) {
              return a + b
            }
            const fitlerItem = seriesList.filter(s => s.name === v.name)
            result.equipmentCount = fitlerItem.map(o => o.equipmentCount).reduce(add)
            result.payCount = fitlerItem.map(o => o.payCount).reduce(add)
            result.payAmount = fitlerItem.map(o => o.payAmount).reduce(add)
            result.unitPrice = fitlerItem.map(o => o.unitPrice).reduce(add)
            return result
          })
          const seriesData = {
            type: 'map',
            mapType: 'china',
            data: finalResult
          }
          if (this.searchFormInfo.orderBy === 'equipment_count') {
            seriesData.name = '设备量'
          } else if (this.searchFormInfo.orderBy === 'pay_count') {
            seriesData.name = '订单量'
          } else if (this.searchFormInfo.orderBy === 'pay_amount') {
            seriesData.name = '订单总额'
          } else if (this.searchFormInfo.orderBy === 'unit_price') {
            seriesData.name = '客单价'
          }
          zoneChinaMapOption.series[0] = seriesData
          this.$nextTick(() => {
            this.chinaMap = echarts.init(this.$refs.chinaMap)
            this.chinaMap.setOption(zoneChinaMapOption, true)
          })
        }
      })
    },
    exportData() {
      analysisExportAreaApi(this.searchFormInfo)
    },
    changeType() {
      this.createEcharts()
    },
    pickerChange(data) {
      this.searchFormInfo = {
        ...this.searchFormInfo,
        ...data
      }
      this.createEcharts()
    }
  }
}
</script>

<style lang="scss">
  .zone-contanter {
    padding: 20px;

    .main {
      background: #fff;
      margin-top: 20px;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .range-item {
        font-size: 0;
        margin-bottom: 20px;
        .high {
          margin-right: 10px;
          font-size: 16px;
        }
        .low {
          margin-left: 10px;
          font-size: 16px;
        }
        .range {
          display: inline-block;
          width: 20px;
          background: #2c7aef;
          position: relative;
          &::before{
            position: absolute;
            display: inline-block;
            content: '';
            left: 0;
            width: 0;
            height: 0;
            border-style: solid;
          }
        }
        .range4 {
          height: 20px;
          background: #2c7aef;
          &::before {
            top: -4px;
            border-width: 4px 0 0 20px;
            border-color: transparent transparent transparent #2c7aef;
          }
        }
        .range3 {
          height: 16px;
          background: #5092e6;
          &::before {
            top: -4px;
            border-width: 4px 0 0 20px;
            border-color: transparent transparent transparent #5092e6;
          }
        }
        .range2 {
          height: 12px;
          background: #85b4ee;
          &::before {
            top: -4px;
            border-width: 4px 0 0 20px;
            border-color: transparent transparent transparent #85b4ee;
          }
        }
        .range1 {
          height: 8px;
          background: #bfd8f6;
          &::before {
            top: -4px;
            border-width: 4px 0 0 20px;
            border-color: transparent transparent transparent #bfd8f6;
          }
        }
        .range0 {
          height: 4px;
          background: #e8f1fc;
          &::before {
            top: -4px;
            border-width: 4px 0 0 20px;
            border-color: transparent transparent transparent #e8f1fc;
          }
        }
      }

      .left-map {
        width: 650px;
        height: 500px;
        position: relative;

        &::after {
          display: inline-block;
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          width: 1px;
          height: 115%;
          background: #f0f2f5;
        }
      }

      .right-table {
        margin-left: 20px;
        width: 100%;
      }
    }

    .el-pagination {
      margin-top: 20px;
    }

    .hover-class {
      background: #fff;
      width: 270px;

      .province-item {
        padding: 10px 15px;
        background: #f2f4f5;
      }

      .type-list {
        padding: 10px 30px;
      }

      .type-item {
        position: relative;

        &::before {
          display: inline-block;
          content: '';
          position: absolute;
          top: 50%;
          left: -15px;
          margin-top: -5px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 225, 103, 1);
        }
      }
    }
  }

</style>
