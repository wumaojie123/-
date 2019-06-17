<template lang="html">
  <div class="page-container">
    <div class="search-form-item">
      <analysis-picker label="时间" @change="pickerChange"/>
    </div>
    <div class="main">
      <div id="countryMap" ref="chinaMap" class="left-map"/>
      <div class="right-table">
        <el-table
          :data="tableData"
          :height="500"
          :default-sort="{prop: 'devicenum', order: 'descending'}"
        >
          <el-table-column
            prop="city"
            label="城市"/>
          <el-table-column
            prop="devicenum"
            label="设备量(台)"
            sortable/>
          <el-table-column
            prop="ordernum"
            label="订单量"
            sortable/>
          <el-table-column
            prop="orderprice"
            label="订单总额(元)"
            sortable/>
          <el-table-column
            prop="guestprice"
            label="客单价(元)"
            sortable/>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js'
import AnalysisPicker from '../components/AnalysisPicker'
import { zoneChinaMapOption } from './option'

export default {
  name: 'Zone',
  components: {
    AnalysisPicker
  },
  data() {
    return {
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
      chart: null,
      loading: false,
      searchFormInfo: {
        client: [],
        type: ''
      },
      clientList: [
        {
          label: '所有',
          value: ''
        },
        {
          label: 'truexin店',
          value: 1
        },
        {
          label: '小红花店',
          value: 2
        },
        {
          label: 'd订单',
          value: 3
        },
        {
          label: '可目前',
          value: 4
        },
        {
          label: '大口大口',
          value: 5
        },
        {
          label: '多少克',
          value: 6
        }
      ],
      deviceTypeList: [
        {
          label: '所有',
          value: ''
        },
        {
          label: '按摩椅',
          value: '0'
        },
        {
          label: '充电桩',
          value: '1'
        },
        {
          label: '娃娃机',
          value: '2'
        },
        {
          label: '洗衣机',
          value: '3'
        },
        {
          label: '售货机',
          value: '4'
        }
      ]
    }
  },
  mounted() {
    this.createEcharts()
  },
  methods: {
    createEcharts() {
      this.$nextTick(() => {
        this.chinaMap = echarts.init(this.$refs.chinaMap)
        this.chinaMap.setOption(zoneChinaMapOption)
      })
    },
    exportData() {
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

<style lang="scss" scoped>
  .page-container {
    padding: 20px;
  }

  .main {
    min-width: 1280px;
    margin: auto;
    overflow: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    #countryMap {
      width: 620px;
      height: 500px;
    }

    .right-table {
      width: 620px;
      height: 500px;
    }
  }
</style>
