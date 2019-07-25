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
        <div v-for="(item, index) in list" :key="index" class="city-list-wrap" >
          <template v-if="index < 3">
            <span class="spec-num"><span>{{ index + 1 }}</span></span>
            <span class="list-num list-num-top">{{ item.city }}</span>
            <span class="list-num list-num-top">{{ item.eqcount }}</span>
            <span class="list-num list-num-top">{{ item.count }}笔</span>
            <span class="list-num list-num-top" >{{ item.total }}万</span>
          </template>
          <template v-if="index >=3">
            <span class="list-num" >{{ index + 1 }}</span>
            <span class="list-num">{{ item.city }}</span>
            <span class="list-num">{{ item.eqcount }}</span>
            <span class="list-num">{{ item.count }}笔</span>
            <span class="list-num" >{{ item.total }}万</span>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Equipment',
  data() {
    return {
      list: [
        { level: '一线城市', city: '北京', eqcount: 168236, count: 1177652, total: 353.29 },
        { level: '一线城市', city: '上海', eqcount: 135799, count: 950593, total: 285.17 },
        { level: '一线城市', city: '广州', eqcount: 133890, count: 937230, total: 281.16 },
        { level: '一线城市', city: '深圳', eqcount: 119087, count: 833609, total: 250.08 },
        { level: '二线城市', city: '杭州', eqcount: 83389, count: 583723, total: 175.11 },
        { level: '二线城市', city: '武汉', eqcount: 72987, count: 510909, total: 153.27 }
        // { level: '二线城市', city: '成都', eqcount: 50996, count: 356972, total: 107.79 },
        // { level: '二线城市', city: '青岛', eqcount: 39023, count: 273161, total: 81.94 },
        // { level: '二线城市', city: '温州', eqcount: 36639, count: 256473, total: 76.94 },
        // { level: '二线城市', city: '长沙', eqcount: 25743, count: 180201, total: 54.06 },
      ]
    }
  }
}
</script>

<style lang="less" scoped>
@import '../images/constant.less';

.equipment-wrap{
    width: 480px;
    height: 500px;
    background-image: url('../images/city-bg.png');
    background-size: 480px 500px;
}
.equipment-area{
    height: @70px;
    position: relative;
    .icon-title{
        width: @20px;
        height: @20px;
        position: absolute;
        top: @30px;
        left: @30px;
    }
    .order-title{
        top: @30px;
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
    height: 420px;
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
    background:  #7AD0FF;
    width: @20px;
    height: @20px;
    line-height: @20px;
    display: inline-block;
    border-radius: 50%;
    color: #FFFFFF;
}
.city-list{
    display: flex;
    flex-direction: column;
}

.city-list-wrap{
    // flex:1;
    display:flex;
    font-size: @12px;
    height: @40px;
    line-height: @40px;
    span{
        flex: 1;
        text-align: center;
        color: #fff;
    }
}
</style>
