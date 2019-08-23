<template>
  <div class="equipment-wrap">
    <div class="equipment-area">
      <section class="title">
        <img class="icon-title" src="../images/icon.png">
        <span class="order-title">设备城市分步TOP10</span>
      </section>
    </div>
    <section class="city-wrap">
      <section class="city-header">
        <span>排名</span>
        <span>城市</span>
        <span>设备数</span>
        <span>订单数</span>
        <span>营业额</span>
      </section>
      <div class="city-list">
        <div v-for="(item, index) in localList" :key="index" class="city-list-wrap" >
          <template v-if="index < 3">
            <span class="spec-num"><span style="color: #000000;">{{ index + 1 }}</span></span>
            <span class="list-num list-num-top">{{ item.cityName }}</span>
            <span class="list-num list-num-top">{{ item.equipmentCount }}</span>
            <span class="list-num list-num-top">{{ item.payCount }}</span>
            <span class="list-num list-num-top" >{{ item.onlineIncomde }}</span>
          </template>
          <template v-if="index >=3">
            <span class="list-num" >{{ index + 1 }}</span>
            <span class="list-num">{{ item.cityName }}</span>
            <span class="list-num">{{ item.equipmentCount }}</span>
            <span class="list-num">{{ item.payCount }}</span>
            <span class="list-num" >{{ item.onlineIncomde }}</span>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    localList() {
      if (this.dataList.length <= 10) {
        return this.dataList
      } else {
        return this.dataList.slice(0, 9)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../images/constant.less';

.equipment-wrap{
  width: @480px;
  height: @365px;
  background-image: url('../images/city-bg.png');
  background-size: @480px @500px;
  background-size: 100% 100%;
}
.equipment-area{
  height: @70px;
  position: relative;
  .icon-title{
    width: @20px;
    height: @20px;
    position: absolute;
    top: @20px;
    left: @30px;
  }
  .order-title{
    top: @20px;
    left: @60px;
    position: absolute;
    font-size: @20px;
    font-family:SourceHanSansCN-Medium;
    font-weight:500;
    color:rgba(68,207,217,1);
  }
}

.city-wrap{
  display: flex;
  height: @420px;
  flex-direction: column;
  .city-list{
    flex:1;
  }
}
.city-header {
  display: flex;
  font-size: @14px;
  margin-bottom: @10px;
  font-size: @16px;
  span{
    flex: 1;
    text-align: center;
    color: #fff;
  }
}

.list-num-top{
  color: #47E5F1!important;
}

.spec-num span{
  background:  #47E5F1;
  width: @20px;
  height: @20px;
  line-height: @20px;
  display: inline-block;
  border-radius: 50%;
  // color: #FFFFFF;

}
.city-list{
  font-size: @16px;
  display: flex;
  flex-direction: column;
}

.city-list-wrap{
  display:flex;
  font-size: @16px;
  height: @40px;
  line-height: @40px;
  span{
    flex: 1;
    text-align: center;
    color: #fff;
  }
}
</style>
