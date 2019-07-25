<template>
  <div class="income-wrap">
    <section class="left">
      <p class="title">累积总收益</p>
      <p class="price">21,100</p>
    </section>
    <section class="right">
      <p class="title">今日收益</p>
      <p class="price">21,100</p>
    </section>
  </div>
</template>

<script>
export default {
  props: {
  }
}
</script>

<style lang="less" scoped>
.income-wrap{
  width: 457px;
  height: 150px;
  display: flex;
  text-align: center;
  position: relative;
  background-image: url('../images/income-bg.png');
  background-size: contain;
  &::after{
    content: '';
    display: inline-block;
    width: 1px;
    height: 60px;
    position: absolute;
    top: 45px;
    left: 50%;
    background: #47E5F1;
  }
  .left, .right{
    flex:1;
  }
  .title{
    font-size:18px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color: #58C4FC;
    margin-top: 26px;
  }
  .price{
    font-size:46px;
    margin-top: 10px;
    font-family:DINNextW1G-Bold;
    font-weight:bold;
    color:rgba(68,207,217,1);
  }
  .desc{
    margin-top: 10px;
    font-size:14px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(108,204,255,1);
    .tend{
      font-size:14px;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      color:rgba(41,253,89,1);
    }
  }
}
</style>
