<template lang="html">
  <div class="page-container">
    <div class="search-form-item">
      <analysis-picker label="时间" @change="pickerChange"/>
    </div>
    <div class="main">
      <card-wrapper label="整体销售趋势">
        <column-item :item-list="itemList" :show-tips-icon="true" :mouseover="showTooltip"/>
        <div ref="salesTrend" class="echarts-item"/>
      </card-wrapper>
      <card-wrapper label="各商品成交分析">
        <div ref="doneNumTrend" class="echarts-item"/>
      </card-wrapper>
      <card-wrapper label="商品销售排行榜">
        <el-radio-group v-model="radio">
          <el-radio :label="3">备选项</el-radio>
          <el-radio :label="6">备选项</el-radio>
          <el-radio :label="9">备选项</el-radio>
        </el-radio-group>
        <el-table
          :data="tableData"
          :height="500"
          :default-sort="{prop: 'devicenum', order: 'descending'}"
          class="sales-range-table"
        >
          <el-table-column
            prop="sort"
            label="排名"/>
          <el-table-column
            prop="name"
            label="商品名称"
          />
          <el-table-column
            prop="quantity"
            label="出货量"
          />
          <el-table-column
            prop="orderNum"
            label="成交订单量（笔）"
          />
          <el-table-column
            prop="price"
            label="成交金额（元）"
          />
          <el-table-column
            prop="profit"
            label="利润贡献率"
          >
            <template slot="header" slot-scope="scope">
              <i
                class="el-icon-question"
                @mouseover="showTooltip('','利润贡献率=（单个商品零售总额-单个商品成本总额）/（全部售卖出去的商品成交总额-全部售卖出去的商品成本总额）*100%')"
              />
            </template>
          </el-table-column>
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
      </card-wrapper>
    </div>
    <explain-modal
      :visible="tooltipsVisible"
      :content="tooltipsInfo.content"
      :confirm-fn="closeTooltip"
    />
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js'
import AnalysisPicker from '../components/AnalysisPicker'
import CardWrapper from '../components/CardWrapper'
import ColumnItem from '../components/ColumnItem'
import ExplainModal from '../components/ExplainModal'
import { salesTrendOption, doneNumOption } from './option'

export default {
  name: 'Zone',
  components: {
    AnalysisPicker,
    ColumnItem,
    ExplainModal,
    CardWrapper
  },
  data() {
    return {
      searchFormInfo: {
        pageIndex: 1,
        total: 10
      },
      tooltipsVisible: false,
      tooltipsInfo: {
        title: '说明',
        content: ''
      },
      radio: '',
      tableData: [
        {
          sort: 1,
          name: '康师傅绿茶',
          quantity: 1000,
          orderNum: 1000,
          price: 3000,
          profit: '60%'
        },
        {
          sort: 2,
          name: '康师傅绿茶',
          quantity: 1000,
          orderNum: 1000,
          price: 3000,
          profit: '23%'
        },
        {
          sort: 3,
          name: '康师傅绿茶',
          quantity: 1000,
          orderNum: 1000,
          price: 3000,
          profit: '45%'
        },
        {
          sort: 4,
          name: '康师傅绿茶',
          quantity: 1000,
          orderNum: 1000,
          price: 3000,
          profit: '56%'
        }
      ],
      itemList: [
        {
          txt: '在架商品种数',
          tips: '“在架商品种数” 指统计时间段内，关联了设备的商品种类数量。',
          count: 800
        },
        {
          txt: '动销商品种数',
          tips: '“动销商品种数” 指统计时间段内，销量 > 0的商品种类数量。',
          count: 700
        },
        {
          txt: '商品出货量',
          tips: '“商品出货量” 指统计时间段内，出货的总数量。',
          count: 3600
        }
      ],
      chart: null,
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
        this.salesTrend = echarts.init(this.$refs.salesTrend)
        this.doneNumTrend = echarts.init(this.$refs.doneNumTrend)
        this.salesTrend.setOption(salesTrendOption)
        this.doneNumTrend.setOption(doneNumOption)
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
    },
    showTooltip(title = '说明', content = '') {
      this.tooltipsVisible = true
      this.tooltipsInfo = {
        title,
        content
      }
    },
    closeTooltip() {
      this.tooltipsVisible = false
      this.tooltipsInfo = {
        title: '说明',
        content: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-container {
    padding: 20px;
  }

  .main {
    .echarts-item {
      width: 100%;
      height: 300px;
    }
    .el-table::before {
      height: 0;
    }
  }
</style>
