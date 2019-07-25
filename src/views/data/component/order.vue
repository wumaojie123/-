<template>
  <section class="order-wrapper">
    <div class="title-wrapper">
      <img class="order-icon" src="../images/icon.png">
      <p class="order-title">实时订单信息</p>
    </div>
    <div class="content-wrapper">
      <div v-for="(item, index) in list" :key="index" class="item">
        <img src="https://pic4.ajkimg.com/display/xinfang/c306ffe04799c1f225985e6a556aea28/245x167m.jpg" class="header-img">
        <p class="order-info">if你快点快点快点看          sdfsdfsdf</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: '',
  props: {
    list: {
      type: Array,
      default: () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  }
}
</script>

<style lang="less" scoped>
@import '../images/constant.less';
.title-wrapper{
  height: @70px;
  position: relative;
  .order-title {
    top: @30px;
    left: @68px;
    position: absolute;
    font-size: @20px;
    font-family:SourceHanSansCN-Medium;
    font-weight:500;
    color:rgba(68,207,217,1);
  }
  .order-icon{
    width: @20px;
    height: @20px;
    position: absolute;
    top: @30px;
    left: @40px;
  }
}
.order-wrapper{
  width: 480px;
  height: 630px;
  background-image: url('../images/order-bg.png');
  background-size: 480px 630px;
  .content-wrapper{
    padding: @10px @30px;
    .item{
      height: @54px;
      line-height: @54px;
      position: relative;
      .header-img {
        width: @40px;
        height: @40px;
        border-radius: 50%;
        position: absolute;
        top: @4px;
        z-index: 10;
      }
      .order-info{
        position: relative;
        top: @7px;
        height: @30px;
        padding-left: @70px;
        line-height: @30px;
        font-size:@16px;
        font-family:PingFangSC-Light;
        font-weight:300;
        color:rgba(68,207,217,1);
        background: linear-gradient(0deg, #032433 0%, #4171BF 100%);
        border-radius:@15px;
      }
    }
  }

}
</style>
