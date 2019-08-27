<template>
  <section class="tend-wrapper">
    <div class="title">
      <div class="left">
        <span style="color:rgba(68,207,217,1);">支付方式分析</span>
      </div>
    </div>
    <section class="echart3"/>
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
      payTypeMap: { aliPay: '支付宝支付', JSAPI: '微信支付', unionPay: '云闪付' },
      dateList: []
    }
  },
  watch: {
    data(val) {
      const yData1 = []
      val.map(i => {
        const obj = {
          name: this.payTypeMap[i.tradeType],
          value: i.payCount
        }
        yData1.push(obj)
      })
      this.initData(yData1)
    }
  },
  methods: {
    initData(yData1) {
      const initData = echarts.init(document.querySelector('.echart3'))
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        color: ['#FFFD37', '#4060B9', '#49DDFA'],
        legend: {
          orient: 'vertical',
          x: '60%',
          y: 'center',
          right: '0',
          icon: 'circle',
          itemWidth: 10,
          itemHeight: 10,
          borderRadius: 10,
          textStyle: {
            color: '#7ED1FD'
          },
          data: ['微信支付', '支付宝支付', '云闪付']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            center: ['25%', '50%'],
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: '12',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: yData1
          }
        ]
      }
      initData.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../images/constant.less';

.tend-wrapper{
  color: #44CFD9;
  width: @480px;
  height: @243px;
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

.echart3{
  width: 100%;
  height: @161px;
}
</style>

