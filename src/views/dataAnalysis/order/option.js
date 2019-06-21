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

// 订单趋势配参
export const orderTrendOption = {
  color: colors,
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: []
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
    }, {
      name: '退款订单(笔)',
      icon: 'circle'
    }, {
      name: '退款金额(元)',
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
    data: [],
    name: '成交订单(笔)',
    type: 'line',
    areaStyle: {
      color: 'rgba(79, 168, 249, .4)'
    },
    color: '#4fa8f9'
  }, {
    data: [],
    name: '成交金额(元)',
    type: 'line',
    areaStyle: {
      color: 'rgba(110, 199, 30, .4)'
    },
    color: '#6ec71e'
  }, {
    data: [],
    name: '退款订单(笔)',
    type: 'line',
    areaStyle: {
      color: 'rgba(103, 91, 186, .4)'
    },
    color: '#675bba'
  }, {
    data: [],
    name: '退款金额(元)',
    type: 'line',
    areaStyle: {
      color: 'rgba(209, 74, 97, .4)'
    },
    color: '#d14a61'
  }]
}

// 订单时间分布配参
export const orderTimeTrendOption = {
  color: colors,
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
    data: [],
    name: '订单量(笔)',
    type: 'line',
    areaStyle: {
      color: 'rgba(79, 168, 249, .5)'
    },
    color: '#4fa8f9'
  }]
}

// 支付方式占比
export const paymentTypeOption = {
  color: colors,
  legend: {
    data: [{
      name: '微信',
      icon: 'rect'
    }, {
      name: '支付宝',
      icon: 'rect'
    }, {
      name: '云闪付',
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
    name: '支付方式占比',
    type: 'pie',
    radius: '55%',
    avoidLabelOverlap: true,
		minShowLabelAngle: 1,
    data: [
      {
        name: '微信',
        value: 0
      },
      {
        name: '支付宝',
        value: 0
      },
      {
        name: '云闪付',
        value: 0
      }
    ]
  }]
}

// 支付结果
export const paymentStateOption = {
  color: colors,
  legend: {
    data: [{
      name: '已成交',
      icon: 'rect'
    }, {
      name: '退款',
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
    name: '支付结果占比',
    type: 'pie',
    radius: '55%',
    avoidLabelOverlap: true,
		minShowLabelAngle: 1,
    data: [
      {
        name: '已成交',
        value: 0
      },
      {
        name: '退款',
        value: 0
      }
    ]
  }]
}
