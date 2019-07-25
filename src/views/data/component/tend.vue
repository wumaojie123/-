<template>
  <section class="tend-wrapper">
    <div class="title">
      <div class="left">
        <span class="select">订单趋势</span>
        <span style="padding: 0 6px;">|</span>
        <span>营业额趋势</span>
      </div>
      <div class="right">
        <span class="select default">近1月</span>
        <span class="default">近半年</span>
      </div>
    </div>
    <section class="echart">
      1
    </section>
  </section>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      const initData = echarts.init(document.querySelector('.echart'))
      const options = {
        grid: {
          top: '5%',
          left: '10%',
          right: '10%',
          bottom: '43',
          containLabel: true
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
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210],
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(22,236,236,0.1)'
                }, {
                  offset: 0.8,
                  color: 'rgba(22,236,236,0.08)'
                }], false),
                shadowColor: '#44CFD9',
                shadowBlur: 10
              }
            },
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
  width: 480px;
  height: 413px;
  background-image: url('../images/tend-bg.png');
  background-size: 480px 413px;
  font-size: 0;
}
.title{
  padding: 32px 30px;
  display: flex;
  justify-content: space-between;
  .left{
    span{
      color: #fff;
      font-size:18px;
    }
    .select{
      color: #44CFD9;
    }
  }
  .right{
    color: #fff;
    font-size: 0;
    span{
      width: 54px;
      font-size: 12px;
      height: 22px;
      line-height: 22px;
      text-align: center;
      display: inline-block;
    }
    .select{
      background:rgba(68,207,217,1);
      border-radius:5px 0px 0px 5px!important;
    }
    .default{
      border-radius:0px 5px 5px 0px;
      border:1px solid rgba(68,207,217,1)
    }
  }
}

.echart{
  width: 100%;
  height: 329px;
}
</style>

