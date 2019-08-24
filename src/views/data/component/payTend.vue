<template>
  <section class="tend-wrapper">
    <div class="title">
      <div class="left">
        <span style="color:rgba(68,207,217,1);">设备进出货趋势</span>
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
      const xData = []
      const yData1 = []
      const yData2 = []
      this.data.map(i => {
        xData.push(i.statisticsDate)
        yData1.push(i.stock)
        yData2.push(i.outCount)
      })
      this.initData(xData, yData1, yData2)
    }
  },
  methods: {
    initData(xData, yData1, yData2) {
      const initData = echarts.init(document.querySelector('.echart2'))
      const options = {
        legend: {
          data: ['进货量', '出货量'],
          textStyle: {
            color: '#7ED1FD'
          },
          top: '0',
          right: '10%'
        },
        grid: {
          top: '5%',
          left: '5%',
          right: '10%',
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
            data: xData,
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
            name: '进货量',
            type: 'line',
            stack: '总量',
            data: yData1,
            smooth: false,
            itemStyle: {
              normal: {
                color: '#4060B9',
                borderColor: '#4060B9',
                borderWidth: 4
              }
            }
          },
          {
            name: '出货量',
            type: 'line',
            stack: '总量2',
            data: yData2,
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
  height: @243px;
}
</style>

