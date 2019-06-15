import {
  echartsAxisLabelFormatter
} from '@/utils/'

export const siteEarnTrendOption = {
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      textStyle: {
        color: '#333'
      },
      formatter: echartsAxisLabelFormatter
    }
  },
  legend: {
    data: [{
      name: '商场-成交金额(元)',
      icon: 'circle'
    }, {
      name: '游艺场-成交金额(元)',
      icon: 'circle'
    }],
    itemGap: 20,
    bottom: 0,
    itemHeight: 15,
    itemWidth: 15
  },
  tooltip: {
    trigger: 'axis',
    textStyle: {
      fontSize: '11',
      color: '#fff'
    }
  },
  grid: {
    top: 30,
    bottom: 50,
    left: 50,
    right: 50
  },
  series: [{
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    name: '商场-成交金额(元)',
    type: 'line',
    areaStyle: {
      color: 'rgba(79,168,249, .4)'
    },
    color: '#4fa8f9'
  }, {
    data: [400, 1932, 501, 734, 1790, 1330, 1920],
    name: '游艺场-成交金额(元)',
    type: 'line',
    areaStyle: {
      color: 'rgba(110,199,30, .4)'
    },
    color: '#6ec71e'
  }]
}
