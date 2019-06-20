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
          <el-radio-group v-model="radio" @change="changeType">
            <el-radio label="设备量">设备量</el-radio>
            <el-radio label="订单量">订单量</el-radio>
            <el-radio label="订单总额">订单总额</el-radio>
            <el-radio label="客单价">客单价</el-radio>
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
          <el-table-column
            align="center"
            prop="city"
            label="城市"/>
          <el-table-column
            align="center"
            prop="devicenum"
            label="设备量(台)"
            sortable/>
          <el-table-column
            align="center"
            prop="ordernum"
            label="订单量"
            sortable/>
          <el-table-column
            align="center"
            prop="orderprice"
            label="订单总额(元)"
            sortable/>
          <el-table-column
            align="center"
            prop="guestprice"
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
import { deepClone } from '@/utils'

export default {
  name: 'Zone',
  components: {
    AnalysisPicker
  },
  data() {
    return {
      radio: '设备量',
      searchFormInfo: {
        pageIndex: 1,
        total: 10
      },
      tableData: [
        {
          devicenum: 1000,
          ordernum: 100,
          orderprice: 200,
          guestprice: 3.5,
          city: '湖南省-石狮市'
        },
        {
          devicenum: 200,
          ordernum: 80,
          orderprice: 300,
          guestprice: 3.5,
          city: '广东省-广州市'
        },
        {
          devicenum: 600,
          ordernum: 40,
          orderprice: 600,
          guestprice: 3.5,
          city: '广西省-南宁市'
        },
        {
          devicenum: 500,
          ordernum: 90,
          orderprice: 800,
          guestprice: 3.5,
          city: '江西省-新蜂市'
        }
      ],
      loading: false
    }
  },
  mounted() {
    this.createEcharts()
  },
  methods: {
    // 分页设置
    handleSizeChange(val) {
      this.searchFormInfo.pageSize = val
    },
    handleCurrentChange(val) {
      this.searchFormInfo.pageIndex = val
    },
    createEcharts() {
      this.$nextTick(() => {
        this.chinaMap = echarts.init(this.$refs.chinaMap)
        const newMap = deepClone(zoneChinaMapOption)
        newMap.series = zoneChinaMapOption.series.filter(v => {
          return v.name === this.radio
        })
        this.chinaMap.setOption(newMap)
      })
    },
    exportData() {
    },
    changeType(value) {
      const newMap = deepClone(zoneChinaMapOption)
      newMap.series = zoneChinaMapOption.series.filter(v => v.name === this.radio)
      this.chinaMap.setOption(newMap, true)
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.clientList = this.clientList.filter(item => {
            return item.label.indexOf(query) > -1
          })
        }, 200)
      } else {
        this.clientList = []
      }
    },
    pickerChange(data) {
      this.selectInfo = null
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
