<template>
  <div class="data-bg">
    <!-- 头部 -->
    <header-com/>
    <section class="wrapper">
      <section class="left">
        <!-- 订单趋势 -->
        <tend/>
        <!-- 设备数城市分布TOP10 -->
        <city style="margin-top: 18px;"/>
      </section>
      <section class="center">
        <div class="flex-wrapp">
          <!-- 收益 -->
          <income style="margin-right: 10px;"/>
          <income/>
        </div>
      </section>
      <section class="right">
        <equipment/>
        <order style="margin-top: 18px;"/>
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
import order from './component/order'

export default {
  components: {
    headerCom,
    tend,
    city,
    equipment,
    income,
    order
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
