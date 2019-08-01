<template>
  <div class="data-bg">
    <!-- 头部 -->
    <header-com v-model="eType" :e-type-name="eTypeName" :name="name" :equipment-list="equipmentList" @on-OK="selectEtype"/>
    <section class="wrapper">
      <div class="wrapper-content">
        <section class="margin-left"/>
        <section class="left">
          <!-- 订单趋势 -->
          <tend :data="tendList" :time-type="timeType" @on-change-time="handleTime"/>
          <!-- 设备数城市分布TOP10 -->
          <city :data-list="cityTopList" style="margin-top: 0.09375rem;"/>
        </section>
        <section class="center">
          <div class="flex-wrapp">
            <!-- 收益 -->
            <income :data="incomeData" style="margin-right: 0.052083333333333336rem;"/>
            <income-y :data="incomeYData"/>
          </div>
          <china :data-list="cityTopList" :total-agent="totalAgent" style="margin-top: 26px;"/>
        </section>
        <section class="right">
          <equipment :data="equipmentData"/>
          <order :list="userList" style="margin-top: 0.09375rem;"/>
        </section>
        <section class="margin-left"/>
      </div>

    </section>
  </div>
</template>

<script>

import headerCom from './component/header'
import tend from './component/tend'
import city from './component/city'
import equipment from './component/equipment'
import income from './component/income'
import incomeY from './component/incomeY'
import order from './component/order'
import china from './component/china'
import { getAgent, getAdConsumersConfig, getCurrentOnlineCoins, getTrendChartData, getCityTopByDistributorId, querySHL } from '@/api/data'

export default {
  components: {
    headerCom,
    tend,
    city,
    equipment,
    income,
    incomeY,
    order,
    china
  },
  data() {
    return {
      id: '',
      equipmentData: {
        offlineCount: 0,
        onlineCount: 0,
        totalQuipmentCount: 0
      },
      incomeYData: {
        totalPayCount: 0,
        todayPayCount: 0
      },
      userList: [],
      cityTopList: [],
      tendList: [],
      incomeData: {
        todayOnlineIncomde: 0,
        totalOnlineIncomde: 0
      },
      eType: '',
      timeType: 1,
      localTimeType: 1,
      eTypeName: '全部设备',
      name: '',
      timer: null,
      equipmentList: [],
      totalAgent: 0
    }
  },
  created() {
    this.init()
    this.getSHL()
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    selectEtype(data) {
      if (this.eType !== data.code) {
        this.eType = data.code
        this.eTypeName = data.equipmenttypename
        this.userList = []
        this.cityTopList = []
        this.tendList = []
        this.getCurrentOnlineCoin()
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          // this.getData()
          this.getCurrentOnlineCoin()
        }, 30000)
        this.getData()
        this.getCurrentOnlineCoin()
        this.getTrendChartDatas()
        this.getCityTopByDistributor()
      }
    },
    async init() {
      const res = await getAgent({})
      if (res.result === 0) {
        this.id = res.data.agentUserId
        this.name = res.data.agentUserName
        this.getData()
        this.getCurrentOnlineCoin()
        this.timer = setInterval(() => {
          // this.getData()
          this.getCurrentOnlineCoin()
        }, 30000)
        this.getTrendChartDatas()
        this.getCityTopByDistributor()
      }
    },
    async getSHL() {
      const res = await querySHL({})
      if (res.result === 0) {
        this.equipmentList = res.data
      }
    },
    async getData() {
      const res = await getAdConsumersConfig({ agentUserId: this.id, equipmentTypeValue: this.eType })
      if (res.result === 0) {
        const data = res.data || {}
        this.equipmentData = res.data.agentEquipmentCountDTO || {}
        const agentIncomeStatisticsTotalDTO = data.agentIncomeStatisticsTotalDTO || {}
        this.incomeYData.totalPayCount = agentIncomeStatisticsTotalDTO.totalPayCount || 0
        this.incomeYData.todayPayCount = agentIncomeStatisticsTotalDTO.todayPayCount || 0
        this.incomeData.todayOnlineIncomde = agentIncomeStatisticsTotalDTO.todayOnlineIncomde || 0
        this.incomeData.totalOnlineIncomde = agentIncomeStatisticsTotalDTO.totalOnlineIncomde || 0
        this.totalAgent = res.data.adOrgCount
      }
    },
    async getCurrentOnlineCoin() {
      const res = await getCurrentOnlineCoins({ agentUserId: this.id, equipmentTypeValue: this.eType })
      if (res.result === 0) {
        const list = res.data || []
        if (list.length > 0) {
          this.userList = list
        }
      }
    },
    handleTime(value) {
      console.log('value', value)
      this.localTimeType = value
      this.getTrendChartDatas()
    },
    async getTrendChartDatas() {
      const res = await getTrendChartData({ agentUserId: this.id, equipmentTypeValue: this.eType, type: this.localTimeType })
      if (res.result === 0) {
        this.timeType = this.localTimeType
        this.tendList = res.data || []
      }
    },
    // top10,城市数据
    async getCityTopByDistributor() {
      // this.cityTopList = []
      const res = await getCityTopByDistributorId({ agentUserId: this.id, equipmentTypeValue: this.eType })
      if (res.result === 0) {
        this.cityTopList = res.data || []
      }
    }
  }
}
</script>

<style scoped lang="less">
@import './images/constant.less';
// @font-face {
//   font-family: "DINNextW1G-Bold";
//   src: url('./images/DINNextW1G-Bold.otf')；
// }
.margin-left{
  width: @40px;
}
.data-bg{
  background: rgba(2,2,32, 1);
  height: 100%;;
  overflow: auto;
  padding-bottom: 10px;
}
.wrapper{
  margin: 0 auto;
  .wrapper-content{
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .center{
      flex:1;
      margin: 0 12px;
      .flex-wrapp{
        display: flex;
        justify-content: space-between;
      }
    }

  }
}
</style>
