<template>
  <div class="income-wrap">
    <section class="right">
      <p class="title">累积订单</p>
      <p :class="{'small-price': data.totalOnlineIncomde > 10000 }" class="price">{{ data.totalPayCount | numFormatFilter }}</p>
    </section>
    <section class="left">
      <p class="title">今日订单</p>
      <p :class="{'small-price': data.totalOnlineIncomde > 10000 }" class="price">{{ data.todayPayCount | numFormatFilter }}</p>
    </section>
  </div>
</template>

<script>
export default {
  filters: {
    numFormatFilter(val) {
      return val.toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="less" scoped>
@import '../images/constant.less';
.income-wrap{
  width: @457px;
  height: @130px;
  display: flex;
  text-align: center;
  position: relative;
  background-image: url('../images/income-bg.png');
  background-size: 100% 100%;
  &::after{
    content: '';
    display: inline-block;
    width: @1px;
    height: @60px;
    position: absolute;
    top: @45px;
    left: 50%;
    background: rgba(71, 229, 241, .4);
  }
  .left, .right{
    flex:1;
  }
  .title{
    font-size: @18px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color: #58C4FC;
    margin-top: 26px;
  }
  .price{
    font-size: @46px;
    margin-top: @10px;
    height: @46px;
    line-height: @46px;
    font-family:DINNextW1G-Bold;
    font-weight:bold;
    color:rgba(68,207,217,1);
  }
  .small-price{
    font-size: @24px;
  }
  .desc{
    margin-top: @10px;
    font-size: @14px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(108,204,255,1);
    .tend{
      font-size: @14px;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      color:rgba(41,253,89,1);
    }
  }
}
</style>
