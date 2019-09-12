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
          style="width:150px;"
        />
      </el-select>设备编号
      <el-input v-model="searchParam.deviceNo" placeholder="请输入设备编号" style="width:150px;" />用户ID
      <el-input v-model="searchParam.userId" placeholder="请输入用户ID" style="width:150px;" />交易单号
      <el-input v-model="searchParam.outTradeNo" placeholder="请输入交易单号" style="width:150px;" />时间
      <el-date-picker
        v-model="searchParam.date"
        :picker-options="option"
        type="date"
        placeholder="请选择"
        value-format="yyyy-MM-dd"
        style="width:150px;"
      />
      <el-button type="primary" @click="queryPayOrderList">查询</el-button>
      <el-button type="success" @click="download">导出</el-button>
    </el-header>
    <order-list
      :cell="commProps.cell"
      :pagination="commProps.pagination"
      :handler="commProps.handler"
      @current-change="currentChangeHd"
      @size-change="sizeChangeHd"
      @show-detail="showDetail"
    />
    <el-dialog :visible.sync="detailVisible" title="订单详情">
      <template v-if="powerTrendVisible">
        <power :data="powerList" />
      </template>
      <div style="margin-bottom: 20px;">充电明细</div>
      <order-detail :cell="commDetail" />
      <div class="btn-wrap">
        <el-button type="primary" @click="closeDetailBox">好的</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import OrderList from './components/orderList'
import OrderDetail from './components/orderDetail'
import power from './components/power'
import {
  queryOrder,
  getMerchantList,
  queryOrderDetail,
  getStateName,
  queryPowerListByTradeno
} from '../../api/orderManage'
export default {
  components: {
    'order-list': OrderList,
    'order-detail': OrderDetail,
    power
  },
  data() {
    return {
      /**
       * 列表组件相关属性
       */
      commProps: {
        cell: {
          name: [
            '交易单号',
            '商户单号',
            '商户账号',
            '商品金额(元)',
            '平台广告补贴(元)',
            '商家活动',
            '银行卡实收金额(元)',
            '交易设备',
            '交易场地',
            '用户ID',
            '交易状态',
            '退款金额(元)',
            '创建时间'
          ],
          prop: [
            'wechatTrxid',
            'outTradeNo',
            'merchant', // merchantName+merchantAccount
            'originalFee',
            'platformFee',
            'activity', //  现金券金额couponFee  随机立减金额discountFee
            'totalFee',
            'device', //  equipmentTypeName+value
            'name',
            'user', // lyyUserId - userName
            'statusName', // status (description)
            'refundFee',
            'created'
          ],
          list: [],
          style: [{ width: '255' }, { width: '255' }, { width: '190' }]
        },
        handler: {
          isShow: true,
          text: '操作',
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
       * 商户列表
       */
      powerList: [],
      merchantList: [],
      repeatCount: 100000000,
      powerTrendVisible: false,
      /**
       * 查询条件
       */
      searchParam: {
        adOrgId: '',
        deviceNo: '',
        userId: '', // 用户ID
        outTradeNo: '', // 交易单号
        date: ''
      },
      /**
       * 详情相关
       */
      commDetail: {
        prop: [
          'device',
          'groupName',
          'communicateTypeName',
          'packageName1',
          'stateName',
          'startTime',
          'endTime',
          'actualTime',
          'actualDurings',
          'refundMoney'
        ],
        name: [
          '交易设备',
          '交易场地',
          '通信方式',
          '充电套餐',
          '工作状态',
          '开始充电时间',
          '结束充电时间',
          '实际充电时长',
          '套餐时长',
          '剩余充电费用退款（退至充电账户余额)(元)'
        ],
        obj: {}
      },
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
      },
      /**
       * 其他
       */
      detailVisible: false
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
      this.queryPayOrderList()
      console.log(`💗size-change${val}`)
    },
    /**
     * 页切换事件
     */
    currentChangeHd(val) {
      this.commProps.pagination.pageIndex = val
      this.queryPayOrderList()
      console.log(`💗current-change${val}`)
    },
    /**
     * 详情
     */
    showDetail(item) {
      this.getOrderDetail(item.outTradeNo, item.payType)
      console.log(`💗💗详情`)
      this.queryPowerList(item, '1')
    },
    async queryPowerList(item, firstFlag) {
      var result = await queryPowerListByTradeno({ outTradeNo: item.outTradeNo })
      if (result.result === 0) {
        var list = result.data || []
        if (firstFlag === '1' && list.length === 0) {
          this.powerTrendVisible = false
          return
        }
        if (firstFlag !== '1' && list.length === 0) {
          return
        }
        this.powerTrendVisible = true
        var powerList = []
        list.forEach(i => {
          powerList.push({
            dayPayCount: i.chargingPower,
            statisticsDate: i.chargingTime
          })
        })
        this.$nextTick(() => {
          this.powerData = powerList
        })
        if (firstFlag === '1' && list.length > 0) {
          this.repeatQueryPowerList(item)
        }
      }
    },

    wait(millisecond) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, millisecond)
      })
    },
    async repeatQueryPowerList(item) {
      while (this.repeatCount--) {
        await this.wait(1000 * 60 * 20)
        this.queryPowerList(item)
      }
    },
    async getOrderDetail(outTradeNo, payType) {
      var result = await queryOrderDetail({ outTradeNo })
      if (result.result === 0) {
        var item = result.data
        if (item === null) {
          return
        }

        var groupNumber = item.groupNumber
        if (groupNumber) {
          item.device = `${groupNumber}号机-充电桩${item.deviceNo}`
        } else {
          item.device = `-充电桩${item.deviceNo}`
        }
        if (item.communicateType === 'CK') {
          item.device += `-${item.passageWay}号插座`
          item.communicateTypeName = '串口'
        } else {
          item.communicateTypeName = '脉冲'
        }

        item.packageName1 = item.packageName
        if (
          item.continuousPackageNames &&
          item.continuousPackageNames.length > 0
        ) {
          item.packageName1 += `(续充${item.continuousPackageNames.join(',')})`
        }
        item.stateName = getStateName(item.state)
        if (item.groupServiceCostWay === 'ELEC') {
          // 待修改
          item.actualElectric = item.actualElectric + '度'
          item.electric = item.electric + '度'
          this.commDetail.prop[7] = 'actualElectric'
          this.commDetail.prop[8] = 'electric'
          this.commDetail.name[7] = '实际充电电量'
          this.commDetail.name[8] = '套餐电量'
        } else {
          item.actualTime = item.actualTime + '分钟'
          item.actualDurings = item.actualDurings + '分钟'
        }
        // // 订单类型，0为余额充值，1为支付启动
        // if (item.payType === 0) {
        //   this.commDetail.prop = ['device', 'groupName', 'packageName', 'money']
        //   this.commDetail.name = [
        //     '交易设备',
        //     '交易场地',
        //     '充值套餐',
        //     '套餐金额(元)'
        //   ]
        // }
        this.commDetail.obj = item
        this.detailVisible = true
      }
    },
    closeDetailBox() {
      this.detailVisible = false
    },
    /**
     * 查询支付订单
     */
    queryPayOrderList() {
      if (
        this.searchParam.adOrgId === '' &&
        this.searchParam.deviceNo === '' &&
        this.searchParam.userId === '' &&
        this.searchParam.outTradeNo === ''
      ) {
        this.$message({
          message: '请输入商户账号、设备编号、用户ID或交易单号进行查询',
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
      var result = await queryOrder(param, 'pay')
      if (result.result === 0) {
        var index = 0
        this.commProps.cell.list = []
        this.commProps.handler.list = []
        var data = result.data
        this.commProps.pagination.totalCount = data.total
        // this.commProps.pagination.pageIndex = data.page
        var list = data.items || []
        list.forEach(item => {
          item.device = item.equipmentTypeName + item.value
          if (
            item.communicationType === 'CK' &&
            item.equipmentType === 'CDZ' &&
            item.passageWay
          ) {
            item.device += `-${item.passageWay}号插座`
          }
          item.merchant = item.merchantName + item.merchantAccount
          // item.user = `${item.lyyUserId}-${item.userName}`
          if (item.username) {
            item.user = `${item.lyyUserId}-${item.username}`
          } else {
            item.user = `${item.lyyUserId}`
          }
          item.activity = ''
          if (item.couponFee) {
            item.activity = '现金券金额' + item.couponFee + '元'
          }
          if (item.discountFee) {
            if (item.activity.length > 0) {
              item.activity += ','
            }
            item.activity += '随机立减金额' + item.discountFee + '元'
          }
          var flag = false
          if (item.status === 'SUCCESS') {
            if (item.refundFee) {
              item.statusName = `退款成功(${item.description})`
              if (item.description === '手动退款') {
                flag = true
              }
            } else {
              flag = true
              item.statusName = '交易成功'
            }
          } else {
            if (item.refundFee) {
              item.statusName = '退款失败'
            }
          }
          var isShowDetail = false
          if (item.equipmentType === 'CDZ' && flag && item.payType === 2) {
            isShowDetail = true
          }
          // isShow:false,name:'查看',type:'text',size:'small'，fn:
          this.commProps.handler.list.push({
            isShow: isShowDetail,
            name: '查看充电详情',
            type: 'text',
            size: 'small',
            fn: 'show-detail'
          })
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
        this.searchParam.userId === '' &&
        this.searchParam.outTradeNo === ''
      ) {
        this.$message({
          message: '请输入商户账号、设备编号、用户ID或交易单号进行导出',
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
        this.searchParam.userId +
        '&outTradeNo=' +
        this.searchParam.outTradeNo
      if (this.searchParam.date) {
        param += '&date=' + this.searchParam.date + ' 00:00:00'
      }
      // console.log("💗时间:"+this.searchParam.date)
      // url 待修改
      location.href = encodeURI('/agent/export/paymentOrders?1=1' + param)
    }
  }
}
</script>
<style scoped>
.btn-wrap {
  width: 80%;
  margin: auto;
  text-align: center;
}
</style>
