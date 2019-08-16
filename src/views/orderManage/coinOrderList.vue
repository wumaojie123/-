<template>
  <el-container>
    <el-header style="margin-top:10px">
      商户账号
      <el-select v-model="searchParam.adOrgId" filterable placeholder="请选择" clearable>
        <el-option
          v-for="item in merchantList"
          :key="item.adOrgId"
          :label="item.label"
          :value="item.adOrgId"
        />
      </el-select>设备编号
      <el-input v-model="searchParam.deviceNo" placeholder="请输入设备编号" style="width:200px;" />时间
      <el-date-picker
        v-model="searchParam.date"
        :picker-options="option"
        type="date"
        placeholder="请选择"
        value-format="yyyy-MM-dd"
      />
      <el-button type="primary" @click="queryCoinOrderList">查询</el-button>
      <el-button type="success" @click="download">导出</el-button>
    </el-header>

    <order-list
      :cell="commProps.cell"
      :summary="commProps.summary"
      :pagination="commProps.pagination"
      @current-change="currentChangeHd"
      @size-change="sizeChangeHd"
    />
  </el-container>
</template>

<script>
// import { parseTime } from '@/utils/index'
import OrderList from './components/orderList'
import { queryOrder, getMerchantList } from '../../api/orderManage'

export default {
  components: {
    'order-list': OrderList
  },
  data() {
    return {
      /**
       * 列表组件相关属性
       */
      commProps: {
        cell: {
          name: [
            '交易设备',
            '投币金额(元)',
            '商户账号',
            '商户姓名',
            '创建时间'
          ],
          prop: ['device', 'coins', 'account', 'name', 'time'],
          list: []
        },
        handler: {
          isShow: false
        },
        pagination: {
          totalCount: 0,
          pageIndex: 1,
          pageSizes: [10, 20, 50],
          pageSize: 10,
          sizeChangeHd: 'size-change',
          currentChangeHd: 'current-change'
        },
        summary: {
          showFlag: true,
          total: 0
        }
      },

      /**
       * 查询条件
       */
      searchParam: {
        deviceNo: '',
        adOrgId: '',
        date: ''
      },

      /**
       * 商户列表
       */
      merchantList: [],
      /**
       * 选择时间相关
       */
      option: {
        disabledDate: time => {
          var NOW = Date.now()
          // console.log(time)
          const timeItem = time.getTime()
          return timeItem < NOW - 24 * 60 * 60 * 30 * 1000 || timeItem > NOW
        }
      }
    }
  },
  async mounted() {
    this.merchantList = []
    this.merchantList = await getMerchantList()
    console.log('💗💗')
  },
  methods: {
    /**
     * 切换条数事件
     */
    sizeChangeHd(val) {
      console.log('哈哈哈哈哈哈哈' + val)
      this.commProps.pagination.pageSize = val
      this.queryCoinOrderList()
      console.log(`💗size-change${val}`)
    },
    /**
     * 页切换事件
     */
    currentChangeHd(val) {
      console.log('哈哈哈哈哈哈哈' + val)
      this.commProps.pagination.pageIndex = val
      this.queryCoinOrderList()
      console.log(`💗current-change${val}`)
    },
    /**
      查询列表
     */
    queryCoinOrderList() {
      if (this.searchParam.adOrgId === '' && this.searchParam.deviceNo === '') {
        this.$message({
          message: '请输入商户账号或设备编号进行查询',
          type: 'error'
        })
        return false
      }
      this.getList()
    },
    async getList() {
      var param = JSON.parse(JSON.stringify(this.searchParam))
      param.pageIndex = this.commProps.pagination.pageIndex
      param.pageSize = this.commProps.pagination.pageSize
      if (param.date) {
        param.date = this.searchParam.date + ' 00:00:00'
      }

      var result = await queryOrder(param, 'coin')
      if (result.result === 0) {
        var obj = result.data
        if (obj === null) {
          return
        }

        var list = obj.pagination
        if (list === null) {
          return
        }
        this.commProps.summary.total = obj.totalCoins
        this.commProps.summary.showFlag = true
        this.commProps.pagination.totalCount = list.total
        // this.commProps.pagination.pageIndex = list.page
        this.commProps.cell.list = []
        var items = list.items || []
        var index = 0
        items.forEach(item => {
          var groupNumber = item.groupNumber
          if (groupNumber) {
            item.device = `${groupNumber}号机-${item.deviceType}${
              item.deviceNo
            }-${item.groupName}`
          } else {
            item.device = `${item.deviceType}${item.deviceNo}-${item.groupName}`
          }
          item.curIndex = index

          this.commProps.cell.list.push(item)
          index++
        })
      }
      console.log(`💗查询列表`)
    },
    /**
      下载
     */
    download() {
      var param = ''
      if (this.searchParam.adOrgId === '' && this.searchParam.deviceNo === '') {
        this.$message({
          message: '请输入商户账号或设备编号进行导出',
          type: 'error'
        })
        return false
      }
      param +=
        '&adOrgId=' +
        this.searchParam.adOrgId +
        '&deviceNo=' +
        this.searchParam.deviceNo
      if (this.searchParam.date) {
        param += '&date=' + this.searchParam.date + ' 00:00:00'
      }
      // console.log("💗时间:"+this.searchParam.date)
      location.href = encodeURI('/agent/export/coinOrders?1=1&' + param)
    }
  }
}
</script>
