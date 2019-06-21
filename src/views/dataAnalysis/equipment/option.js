/* eslint-disable */

import {
  echartsAxisLabelFormatter
} from '@/utils/'

const colors = [
    '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
    '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
    '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
    '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
]

// 在线数量占比配参
export const onlineScaleOption = {
  color: colors,
  title: {
    text: '设备在线、离线占比(昨日)',
    left: '50%',
    textAlign: 'center'
  },
  legend: {
    data: [{
      name: '在线',
      icon: 'rect'
    }, {
      name: '离线',
      icon: 'rect'
    }],
    x: 'center',
    bottom: 0,
    itemHeight: 15,
    itemWidth: 15
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)',
    textStyle: {
      fontSize: '11',
      color: '#fff'
    }
  },
  series: [{
    name: '订单占比',
    type: 'pie',
    radius: '55%',
    label: {
      show: false
    },
    labelLine: {
      show: false
    },
    data: [
      {
        name: '在线',
        value: 0
      },
      {
        name: '离线',
        value: 0
      }
    ]
  }]
}

// 设备类型占比图表配参
export const equipmentTypeScaleOption = {
  color: colors,
  title: {
    text: '设备类型占比',
    left: '50%',
    textAlign: 'center'
  },
  legend: {
    data: [],
    x: 'center',
    bottom: 0,
    itemHeight: 15,
    itemWidth: 15
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)',
    textStyle: {
      fontSize: '11',
      color: '#fff'
    }
  },
  series: [{
    name: '订单占比',
    type: 'pie',
    radius: '55%',
    label: {
      show: false
    },
    labelLine: {
      show: false
    },
    data: []
  }]
}

// 进出货配置参数
export const shipmentOption = {
  color: colors,
  legend: {
    data: [{
      name: '进货数量(台)',
      icon: 'rect'
    }, {
      name: '出货数量(台)',
      icon: 'rect'
    }],
    itemGap: 20,
    bottom: 0,
    itemHeight: 15,
    itemWidth: 15
  },
  grid: {
    top: 20,
    left: 50,
    right: 20,
    bottom: 50
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  xAxis: {
    type: 'category',
    data: ['2019.01', '2019.02', '2019.03', '2019.04', '2019.05', '2019.06']
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
  series: [{
    data: [1000, 3000, 5000, 7000, 8000, 12000],
    type: 'bar',
    barMaxWidth: 40,
    name: '进货数量(台)'
  }, {
    data: [2000, 400, 6000, 1000, 8000, 9000],
    type: 'bar',
    barMaxWidth: 40,
    name: '出货数量(台)'
  }]
}
