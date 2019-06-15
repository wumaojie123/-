import {
  echartsAxisLabelFormatter
} from '@/utils/'

export const orderTrendOption = {
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
      name: '成交订单(笔)',
      icon: 'circle'
    }, {
      name: '成交金额(元)',
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
    name: '成交订单(笔)',
    type: 'line',
    areaStyle: {
      color: 'rgba(79, 168, 249, .4)'
    },
    color: '#4fa8f9'
  }, {
    data: [400, 1932, 501, 734, 1790, 1330, 1920],
    name: '成交金额(元)',
    type: 'line',
    areaStyle: {
      color: 'rgba(110, 199, 30, .4)'
    },
    color: '#6ec71e'
  }]
}

export const orderTimeTrendOption = {
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['0:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']
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
  tooltip: {
    trigger: 'axis',
    textStyle: {
      fontSize: '11',
      color: '#fff'
    }
  },
  grid: {
    top: 30,
    bottom: 20,
    left: 50,
    right: 50
  },
  series: [{
    data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290],
    name: '订单量(笔)',
    type: 'line',
    areaStyle: {
      color: 'rgba(79, 168, 249, .5)'
    },
    color: '#4fa8f9'
  }]
}
