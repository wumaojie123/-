<template>
  <section class="tend-wrapper" style="margin-bottom: 30px;">
    <div class="title">
      <div class="left">
        <span class="select">功率曲线</span>
      </div>
    </div>
    <section class="echart"/>
  </section>
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      localData: this.data,
      dateList: [],
      incomeList: [],
      orderList: []
    }
  },
  watch: {
    data(val) {
      const dateList = []
      const orderList = []
      val.map(i => {
        dateList.push(i.statisticsDate)
        orderList.push(i.dayPayCount)
      })
      this.dateList = dateList
      this.orderList = orderList
      this.initData(this.dateList, this.orderList)
    }
  },
  methods: {
    handleType(type) {
      this.type = type
      this.initData(this.dateList, this.orderList)
    },
    initData(dateList, dataList) {
      const initData = echarts.init(document.querySelector('.echart'))
      const name = '功率(W)'
      const options = {
        grid: {
          top: '5%',
          left: '8%',
          right: '8%',
          bottom: '23',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: dateList,
            axisTick: {
              alignWithLabel: true,
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#7E7E7E'
              }
            },
            axisLine: {
              lineStyle: {
                width: 2,
                color: '#F1F1F1'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#F1F1F1'
              }
            },
            axisLabel: {
              color: '#7E7E7E'
            }
          }
        ],
        series: [
          {
            name: name,
            type: 'line',
            stack: '总量',
            data: dataList,
            smooth: true,
            itemStyle: {
              normal: {
                color: '#628DF2',
                // borderColor: '#FFF',
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

.tend-wrapper{
  color: #44CFD9;
  width: 100%;
  height: 230px;
  background-size: 100% 100%;
  background: #fff;
  font-size: 0;
}
.title {
    position: relative;
    font-size: 18px;
    margin-bottom: 20px;
    font-family: PingFangSC-Semibold;
    margin-left: 10px;
    padding-top: 10px;
    color: rgba(30, 32, 33, 1);
    position: relative;
  }

.echart{
  margin: 0 auto;
  width: 90%;
  height: 200px;
}
</style>

