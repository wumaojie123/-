<template lang="html">
  <div class="zone-contanter">
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

export default {
  name: 'Zone',
  components: {
    AnalysisPicker
  },
  data() {
    return {
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
      this.getTableData(true)
    },
    handleCurrentChange(val) {
      this.searchFormInfo.pageIndex = val
      this.getTableData()
    },
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

<style lang="scss">
  .zone-contanter {
    padding: 20px;
    .main {
      display: flex;
      justify-content: space-around;
      align-items: center;

      #countryMap {
        width: 620px;
        height: 500px;
        border-right: 1px solid #dcdcdc;
      }

      .right-table {
        width: 620px;
      }
    }
    .hover-class {
      background: #fff;
      width: 270px;
      .province-item {
        padding: 15px;
        background: #f2f4f5;
      }
      .type-list {
        height: 90px;
        padding: 10px 30px;
      }
      .type-item {
        position: relative;
        &::before{
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
