<template>
  <section class="tend-wrapper">
    <div class="title">
      <div class="left">
        <span>设备进出货趋势</span>
      </div>
    </div>
    <section class="echart2"/>
  </section>
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    timeType: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      type: '1',
      localData: this.data,
      dateList: [],
      incomeList: [],
      orderList: []
    }
  },
  watch: {
    data(val) {
      const dateList = []
      const incomeList = []
      const orderList = []
      this.data.map(i => {
        dateList.push(i.statisticsDate)
        orderList.push(i.dayPayCount)
        incomeList.push(i.dayOnlineIncomde)
      })
      this.dateList = dateList
      this.incomeList = incomeList
      this.orderList = orderList
      console.log('watch', JSON.stringify(this.orderList))
      this.initData(this.dateList, this.orderList)
      this.localData = val
    },
    timeType(val) {
      const dateList = []
      const incomeList = []
      const orderList = []
      this.localData.map(i => {
        dateList.push(i.statisticsDate)
        orderList.push(i.dayPayCount)
        incomeList.push(i.dayOnlineIncomde)
      })
      if (this.type === '1') {
        this.initData(dateList, orderList)
      } else {
        this.initData(dateList, incomeList)
      }
    }
  },
  methods: {
    handleTime(value) {
      this.$emit('on-change-time', value)
    },
    handleType(type) {
      this.type = type
      if (type === '1') {
        this.initData(this.dateList, this.orderList)
      } else {
        this.initData(this.dateList, this.incomeList)
      }
    },
    initData(dateList, dataList) {
      console.log(JSON.stringify(dataList))
      const initData = echarts.init(document.querySelector('.echart2'))
      let name = ''
      if (this.type === '1') {
        name = '订单数(笔)'
      } else {
        name = '营业额(元)'
      }
      const options = {
        grid: {
          top: '5%',
          left: '10%',
          right: '10%',
          bottom: '43',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            axisTick: {
              alignWithLabel: true,
              show: false
            },
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#44CFD9'
              }
            },
            axisLine: {
              lineStyle: {
                width: 2,
                color: '#44CFD9'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitNumber: '4',
            min: 0,
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              color: '#44CFD9',
              textStyle: {
                color: '#44CFD9'
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 2,
                color: '#44CFD9'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#44CFD9',
                type: 'dashed'
              }
            }
          }
        ],
        series: [
          {
            name: name,
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210],
            smooth: false,
            itemStyle: {
              normal: {
                color: '#16ECEC',
                borderColor: '#16ECEC',
                borderWidth: 4
              }
            }
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量2',
            data: [220, 182, 191, 234, 290, 330, 310],
            smooth: false,
            itemStyle: {
              normal: {
                color: '#16ECEC',
                borderColor: '#16ECEC',
                borderWidth: 4

              }
            }
          }
        ]
      }
      initData.setOption(options)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../images/constant.less';

.tend-wrapper{
  color: #44CFD9;
  width: @480px;
  height: @303px;
  background-image: url('../images/tend-bg.png');
  background-size: 100% 100%;
  font-size: 0;
}
.title{
  padding: @20px @30px;
  display: flex;
  justify-content: space-between;
  .left{
    span{
      color: #fff;
      font-size: @18px;
    }
    .select{
      color: #44CFD9;
    }
  }
  .right{
    color: #fff;
    font-size: 0;
    span{
      width: @54px;
      font-size: @12px;
      height: @22px;
      line-height: @22px;
      text-align: center;
      display: inline-block;
    }
    .select{
      background:rgba(68,207,217,1);
    }
    .default{
      border:1px solid rgba(68,207,217,1)
    }
    .default_left{
      border-radius: @5px 0px 0px @5px!important;

    }
    .default_right{
      border-radius:0px @5px @5px 0px;
      // border-radius: @5px 0px 0px @5px!important;
    }

  }
}

.echart2{
  width: 100%;
  height: @200px;
}
</style>

