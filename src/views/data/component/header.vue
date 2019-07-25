<template>
  <div class="header-wrapper">
    <span class="time">更新时间：2019-09-99</span>
    <p class="title">海尚运维管理平台</p>
    <div class="icon-wrapper">
      <div class="logout-wrap">
        <img class="logout" src="../images/lgout.png">
        <span>全部设备</span>
      </div>
      <div class="logout-wrap">
        <img class="logout" src="../images/lgout.png">
        <span>退出</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '../images/constant.less';
.header-wrapper{
  color: #44CFD9;
  position: relative;
  height: 107px;
  margin-bottom: 22px;
  width: 100%;
}
.time{
  position: absolute;
  bottom: 10px;
  left: 20px;
}
.title {
  display: inline-block;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size:40px;
  font-family:PingFangSC-Semibold;
  font-weight:600;
  color:rgba(68,207,217,1);
  height: 107px;
  line-height: 107px;
  background-image: url('../images/header-bg.png');
  background-size:;;
  background-repeat: no-repeat;
}
.icon-wrapper{
  position: absolute;
  bottom: 10px;
  right: 20px;
  .logout-wrap {
    display: flex;
    align-items: center;
  }
  .logout{
    width: @22px;
    height: @22px;
    margin-left : @10px;
  }
}
</style>
