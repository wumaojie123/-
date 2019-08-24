<template>
  <section class="tend-wrapper">
    <div class="title">
      <div class="left">
        <span style="color:rgba(68,207,217,1);">昨日投放地址类型与收益分析</span>
      </div>
    </div>
    <section class="echart5"/>
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
      localData: this.data,
      dateList: [],
      incomeList: [],
      orderList: []
    }
  },
  watch: {
    data(val) {
      this.localData = val
      const yData = []
      const seriesData1 = []
      const seriesData2 = []
      this.localData.forEach(item => {
        yData.push(item.groupTypeName)
        seriesData1.push(item.onlineIncomde)
        seriesData2.push(item.lyyDistributorCount)
      })
      this.initData(yData, seriesData1, seriesData2)
    }
  },
  methods: {
    initData(yData, seriesData1, seriesData2) {
      const initData = echarts.init(document.querySelector('.echart5'))
      const option = {
        legend: {
          data: ['投放设备数', '营业额'],
          textStyle: {
            color: '#7ED1FD'
          },
          top: '1%'
        },
        barGap: '1%',
        grid: {
          left: '10%',
          right: '10%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          show: false
        },
        yAxis: {
          type: 'category',
          axisLine: { show: false },
          splitLine: {
            show: false
          },
          nameTextStyle: {
            color: '#7ED1FD'
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#7ED1FD'
          },
          data: yData
        },
        series: [

          {
            name: '投放设备数',
            type: 'bar',
            itemStyle: {
              borderWidth: 10,
              color: '#189ACA'
            },
            barMaxWidth: 10,
            label: {
              normal: {
                show: true,
                position: 'right',
                formatter: '{c}'
              }
            },
            data: seriesData1
          },
          {
            name: '营业额',
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'right'
              }
            },
            itemStyle: {
              borderWidth: 10,
              color: '#4060B9'
            },
            barMaxWidth: 10,
            data: seriesData2
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
  height: @343px;
  background-image: url('../images/tend-bg.png');
  background-size: 100% 100%;
  font-size: 0;
}
.title{
  padding: @20px @30px;
  display: flex;
  color:rgba(68,207,217,1);
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

.echart5{
  width: 100%;
  height: @200px;
}
</style>

