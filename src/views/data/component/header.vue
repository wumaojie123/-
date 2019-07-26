<template>
  <div class="header-wrapper">
    <span class="time">更新时间：{{ dateFormat(now) }}</span>
    <p class="title">{{ name }}运维管理平台</p>
    <img src="../images/header-bg.png" class="header-bg">
    <div class="icon-wrapper">
      <div class="logout-wrap all-equipment" @click="visible =!visible">
        <img class="logout" src="../images/all.png">
        <span>{{ value | valueFilter }}</span>
        <img class="down" src="../images/down.png">
        <div v-show="visible" class="item-wrap">
          <div :class="{'select': value ===''}" class="item" @click="handleItem('')">全部设备</div>
          <div :class="{'select': value ==='XYJ'}" class="item" @click="handleItem('XYJ')">洗衣机</div>
          <div :class="{'select': value ==='CDZ'}" class="item" @click="handleItem('CDZ')">充电桩</div>
          <div :class="{'select': value ==='AMY'}" class="item" @click="handleItem('AMY')">充电桩</div>
        </div>
      </div>
      <div class="logout-wrap" @click="handleLogout">
        <img class="logout" src="../images/lgout.png">
        <span>退出</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    valueFilter(val) {
      const valueMap = { 'XYJ': '洗衣机', 'CDZ': '充电桩', 'AMY': '按摩椅' }
      return valueMap[val] || '全部设备'
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false,
      now: Date.now()
    }
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
      }).catch(res => {
        console.log(res)
      })
    },
    handleItem(item) {
      this.$emit('input', item)
    },
    /**
     * 格式化时间
     * @param {Date | string | number} date
     * @param {string} format 默认:`yyyy-MM-dd`
     * @returns {string} 格式化的时间
     */
    dateFormat(date, format = 'yyyy-MM-dd HH:mm:ss') {
      let time
      const toStr = Object.prototype.toString

      if (toStr.call(date) === '[object Date]') {
        time = date
      } else if (typeof date === 'string') {
        time = new Date(parseInt(date, 10))
      } else if (typeof date === 'number') {
        time = new Date(date)
      } else {
        throw TypeError('参数类型错误')
      }

      const o = {
        'M+': time.getMonth() + 1,
        'd+': time.getDate(),
        'H+': time.getHours(),
        'm+': time.getMinutes(),
        's+': time.getSeconds()
      }
      if (/(y+)/.test(format)) {
        time = format.replace(RegExp.$1, time.getFullYear()).substr(4 - RegExp.$1.length)
      } else {
        time = format
      }
      for (const k in o) {
        if (new RegExp(`(${k})`).test(time)) {
          time = time.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr((`${o[k]}`).length))
        }
      }
      return time
    }
  }
}
</script>

<style lang="less" scoped>
@import '../images/constant.less';
.header-wrapper{
  color: #44CFD9;
  position: relative;
  height: @107px;
  margin-bottom: @22px;
  width: 100%;
  font-size: @20px;
}
.time{
  position: absolute;
  bottom: @10px;
  left: @20px;
}
.title {
  display: inline-block;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: @40px;
  font-family:PingFangSC-Semibold;
  font-weight:600;
  color:rgba(68,207,217,1);
  height: @87px;
  line-height: @87px;
}
.header-bg{
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 580px;
  height: @137px;
}
.icon-wrapper{
  position: absolute;
  bottom: @10px;
  right: @20px;
  width: 300px;
  display: flex;
  justify-content: space-between;
  .logout-wrap {
    display: flex;
    align-items: center;
  }
  .logout{
    width: @22px;
    height: @22px;
    margin-right : @10px;
  }
  .all-equipment{
    position:relative;
    padding-right: @35px;
    .down{
      position: absolute;
      right: @18px;
      width: @12px;
      height: @6px;
      bottom: @4px;
    }
    .item-wrap{
      position:absolute;
      background: url('../images/select-bg.png');
      background-size: contain;
      z-index: 10;
      top: @40px;
      font-size: @20px;
      left: @10px;
      .item{
        min-width: @137px;
        padding: @10px @10px;
        text-align: left;
        color: #44CFD9;
      }
      .select{
        background: url('../images/select-item.png');
      }
      &::before{
        content: '';
      }
    }
  }
}
</style>
