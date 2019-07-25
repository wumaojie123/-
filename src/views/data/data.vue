<template>
  <div class="data-bg">
    <!-- 头部 -->
    <header-com/>
    <section class="wrapper">
      <section class="left">
        <!-- 订单趋势 -->
        <tend :data="tendList" :time-type="timeType" @on-change-time="handleTime"/>
        <!-- 设备数城市分布TOP10 -->
        <city :list="cityTopList" style="margin-top: 18px;"/>
      </section>
      <section class="center">
        <div class="flex-wrapp">
          <!-- 收益 -->
          <income :data="incomeData" style="margin-right: 10px;"/>
          <income-y :data="incomeYData"/>
        </div>
        <china style="margin-top: 26px;"/>
      </section>
      <section class="right">
        <equipment :data="equipmentData"/>
        <order :list="userList" style="margin-top: 18px;"/>
      </section>

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
import { getAgent, getAdConsumersConfig, getCurrentOnlineCoins, getTrendChartData, getCityTopByDistributorId } from '@/api/data'

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
      timeType: 1
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const res = await getAgent({})
      if (res.result === 0) {
        this.id = res.data.agentUserId
        this.getData()
        this.getCurrentOnlineCoin()
        this.getTrendChartDatas()
        this.getCityTopByDistributor()
      }
    },
    async getData() {
      const res = await getAdConsumersConfig({ agentUserId: this.id, equipmentTypeValue: this.eType })
      if (res.result === 0) {
        const data = res.data || {}
        this.equipmentData = res.data.agentEquipmentCountDTO
        this.incomeYData.totalPayCount = data.agentIncomeStatisticsTotalDTO.totalPayCount || 0
        this.incomeYData.todayPayCount = data.agentIncomeStatisticsTotalDTO.todayPayCount || 0
        this.incomeData.todayOnlineIncomde = data.agentIncomeStatisticsTotalDTO.todayOnlineIncomde || 0
        this.incomeData.totalOnlineIncomde = data.agentIncomeStatisticsTotalDTO.totalOnlineIncomde || 0
      }
    },
    async getCurrentOnlineCoin() {
      const res = await getCurrentOnlineCoins({ agentUserId: this.id, equipmentTypeValue: this.eType })
      if (res.result === 0) {
        this.userList = res.data
      }
    },
    handleTime(value) {
      this.timeType = value
      this.getTrendChartDatas()
    },
    async getTrendChartDatas() {
      const res = await getTrendChartData({ agentUserId: this.id, equipmentTypeValue: this.eType, type: this.timeType })
      if (res.result === 0) {
        this.tendList = res.data
      }
    },
    // top10,城市数据
    async getCityTopByDistributor() {
      const res = await getCityTopByDistributorId({ agentUserId: this.id, equipmentTypeValue: this.eType })
      if (res.result === 0) {
        this.cityTopList = res.data
        console.log(this.cityTopList.length)
      }
    }
  }
}
</script>

<style scoped lang="less">
.data-bg{
  background: rgba(2,2,32, 1);
  height: 100%;;
  overflow: auto;
  padding-bottom: 10px;
}
.wrapper{
  display: flex;
  margin: 0 20px;
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
</style>
