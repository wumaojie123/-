<template>
  <el-container>
    <el-header style="margin-top:10px">
      商户账号:
      <el-select v-model="searchParam.adOrgId" filterable placeholder="请选择" clearable>
        <el-option
          v-for="item in merchantList"
          :key="item.adOrgId"
          :label="item.label"
          :value="item.adOrgId"
          style="width:200px;"
        />
      </el-select>设备编号
      <el-input v-model="searchParam.deviceNo" placeholder="请输入设备编号" style="width:200px;" />用户ID
      <el-input v-model="searchParam.userId" placeholder="请输入用户ID" style="width:200px;" />时间
      <el-date-picker
        v-model="searchParam.date"
        :picker-options="option"
        type="date"
        placeholder="请选择"
        value-format="yyyy-MM-dd"
      />
      <el-button type="primary" @click="queryStartOrderList">查询</el-button>
      <el-button type="success" @click="download">导出</el-button>
    </el-header>
    <order-list
      :cell="commProps.cell"
      :pagination="commProps.pagination"
      @current-change="currentChangeHd"
      @size-change="sizeChangeHd"
      @show-detail="showDetail"
    />
  </el-container>
</template>

<script>
import OrderList from './components/orderList'
import {
  queryOrder,
  getMerchantList,
  getStateName
} from '../../api/orderManage'
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
            '通信方式',
            '交易场地',
            '商户账号',
            '用户ID',
            '启动方式',
            '充电套餐',
            '套餐金额(元)',
            '套餐时长(分)',
            '工作状态',
            '开始充电时间',
            '结束充电时间',
            '实际充电时长(分)',
            '套餐实际总时长(分)',
            '剩余充电时长退款（退至余额）',
            '创建时间'
          ],
          prop: [
            'device', // groupNumber deviceType  deviceNo passageWay
            'communicateTypeName', // 串口CK，脉冲MC
            'groupName',
            'merchant', // merchantName merchantAccount
            'user', // lyyUserId lyyUserName
            'startType', // outTradeNo 启动方式（0和1为余额启动，其他为支付启动）
            'packageName',
            'money',
            'serviceDurings',
            'stateName', // state  订单状态（启动超时-3，启动失败-2，已结束-1，启动中0，工作中1，已终止2
            'startTime',
            'endTime',
            'actualTime',
            'actualDurings',
            'refundMoney',
            'createTime'
          ],
          list: []
        },
        pagination: {
          totalCount: 0,
          pageIndex: 1,
          pageSizes: [10, 20, 50],
          pageSize: 10,
          sizeChangeHd: 'size-change',
          currentChangeHd: 'current-change'
        }
      },
      /**
       * 查询条件
       */
      searchParam: {
        deviceNo: '',
        userId: '', // 用户ID
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
          console.log(time)
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
      this.commProps.pagination.pageSize = val
      this.queryStartOrderList()
      console.log(`💗条数切换事件size-change${val}`)
    },
    /**
     * 页切换事件
     */
    currentChangeHd(val) {
      this.commProps.pagination.pageIndex = val
      this.queryStartOrderList()
      console.log(`💗页切换事件current-change${val}`)
    },
    /**
     * 详情
     */
    showDetail(item) {
      console.log(`💗${item}`)
    },
    /**
     * 查询支付订单
     */
    queryStartOrderList() {
      if (
        this.searchParam.adOrgId === '' &&
        this.searchParam.deviceNo === '' &&
        this.searchParam.userId === ''
      ) {
        this.$message({
          message: '请输入商户账号、设备编号、用户ID进行查询',
          type: 'error'
        })
        return false
      }
      this.getList()
    },
    /**
     * 订单列表
     */
    async getList() {
      var param = this.searchParam
      param.pageIndex = this.commProps.pagination.pageIndex
      param.pageSize = this.commProps.pagination.pageSize
      if (param.date) {
        param.date = this.searchParam.date + ' 00:00:00'
      }
      var result = await queryOrder(param, 'start')
      if (result.result === 0) {
        this.commProps.cell.list = []
        var data = result.data
        this.commProps.pagination.totalCount = data.total
        // this.commProps.pagination.pageIndex = data.page
        var list = data.items || []
        var index = 0
        list.forEach(item => {
          var groupNumber = item.groupNumber
          if (groupNumber) {
            item.device = `${groupNumber}号机-充电桩${item.deviceNo}`
          } else {
            item.device = `充电桩${item.deviceNo}`
          }
          if (item.communicateTypeName === 'CK') {
            item.device += `-${item.passageWay}插座`
            item.communicateTypeName = '串口'
          } else {
            item.communicateTypeName = '脉冲'
          }
          if (item.outTradeNo === '0' || item.outTradeNo === '1') {
            item.startType = '余额启动'
          } else {
            item.startType = '支付启动'
          }
          item.merchant = `${item.merchantName}-${item.merchantAccount}`
          if (item.username) {
            item.user = `${item.lyyUserId}-${item.username}`
          } else {
            item.user = `${item.lyyUserId}`
          }

          item.stateName = getStateName(item.state)
          item.curIndex = index
          this.commProps.cell.list.push(item)
          index++
        })
      }
      console.log(`💗查询列表`)
    },
    /**
     * 导出
     */
    download() {
      var param = ''
      if (
        this.searchParam.adOrgId === '' &&
        this.searchParam.deviceNo === '' &&
        this.searchParam.userId === ''
      ) {
        this.$message({
          message: '请输入商户账号、设备编号、用户ID进行导出',
          type: 'error'
        })
        return false
      }
      param +=
        '&adOrgId=' +
        this.searchParam.adOrgId +
        '&deviceNo=' +
        this.searchParam.deviceNo +
        '&userId=' +
        this.searchParam.userId
      if (this.searchParam.date) {
        param = '&date=' + this.searchParam.date + ' 00:00:00'
      }
      // url 待修改
      location.href = encodeURI('/agent/export/startupOrders?1=1' + param)
      console.log(`💗导出列表`)
    }
  }
}
</script>
