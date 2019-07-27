<template>
  <div class="equipment-wrap">
    <div class="equipment-area">
      <section class="title">
        <img class="icon-title" src="../images/equipment.png">
        <span>设备监控</span>
      </section>
      <section class="total">
        <span >设备总数</span>
      </section>
      <section class="num">
        <div class="num-wrap">
          <span v-for="(item, index) in totalStr" :key="index" class="num-item">{{ item }}</span>
        </div>
        <div class="num-status">
          <div class="status-item">
            <div class="item-title">在线设备数</div>
            <div class="staus-num">
              <span>{{ data.onlineCount }}</span>
            </div>
          </div>

          <div class="status-item">
            <div class="item-title">离线设备数</div>
            <div class="staus-num">
              <span>{{ data.offlineCount }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Equipment',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    totalStr() {
      let str = this.data.totalQuipmentCount.toString().split('')
      const len = str.length
      if (str.length < 5) {
        const lenTemp = 5 - len
        const arr = []
        for (let i = 0; i < lenTemp; i++) {
          arr.push(0)
        }
        str = arr.concat(str)
      }
      return str
    }
  }
}
</script>

<style scoped lang="less">
@import '../images/constant.less';
.equipment-wrap{
    width: @480px;
    height: @280px;
    background-image: url('../images/epuipment-bg.png');
    background-size: @480px @280px;
    color: #44CFD9;
}
.title{
  font-size: @20px;
  font-family:SourceHanSansCN-Medium;
  font-weight:500;
  color:rgba(68,207,217,1);
  padding-top: @20px;
  position: relative;
  padding-left: @30px;
}

.total{
    margin-top: @4px;
    text-align: center;
    margin-bottom: @14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color:rgba(88,196,252,1);
    font-size: @18px;
}
.num{
    text-align: center;
    margin-bottom: @18px;
    margin: 0 auto;
}

.num-item {
    width: @57px;
    height: @70px;
    background:linear-gradient(0deg,rgba(3,36,51,1) 0%,rgba(2,10,17,1) 100%);
    box-shadow:inset 0px 1px 6px 0px rgba(135, 190, 195, 0.7);
    border-radius: @10px;
    text-align: center;
    display: inline-block;
    line-height: @70px;
    font-size: @46px;
    font-family:SourceHanSansCN-Bold;
    font-weight:bold;
    margin-right: @8px;
}
.num-item:last {
    margin-right: 0;
}

.num-status {
    display: flex;
    margin-top: @20px;
}
.icon-title{
  width: @30px;
  height: @30px;
  vertical-align: text-bottom;
}

.status-item {
  flex:1;
    justify-content: center;
    text-align: center;
    align-items: center;
    .item-title{
        font-size: @18px;
        font-family:SourceHanSansCN-Regular;
        font-weight:400;
        color:rgba(88,196,252,1);
    }
    .staus-num {
        width: @161px;
        height: @32px;
        line-height: @32px;
        margin-top: @13px;
        display: inline-block;
        color: #52C3FF;
        font-size: @40px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 50%;
        transform: translateX(-50%);
        font-weight:bold;
        color:rgba(68,207,217,1);
    }
}

</style>

