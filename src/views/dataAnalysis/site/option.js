import {
  echartsAxisLabelFormatter
} from '@/utils/'

var colors = ['#5793f3', '#d14a61', '#675bba']

// 点位收益趋势配参
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

// 点位投放效果配参
export const siteInfoOption = {
  color: ['#3398DB', '#6ec71e'],
  legend: {
    data: [{
      name: '设备数量(台)',
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
    data: ['商场', '游艺厅', '电影院', 'KTV', '火车站', '机场']
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
    barMaxWidth: 30,
    barGap: 0,
    name: '设备数量(台)'
  }, {
    data: [2000, 400, 6000, 1000, 8000, 9000],
    type: 'bar',
    barMaxWidth: 30,
    barGap: 0,
    name: '出货数量(台)'
  }]
}

export const siteInfoPercentOption = {
  color: colors,
  title: {
    text: '点位分布占比',
    left: '50%',
    textAlign: 'center'
  },
  legend: {
    data: [{
      name: 'a',
      icon: 'rect'
    }, {
      name: 'b',
      icon: 'rect'
    }, {
      name: 'c',
      icon: 'rect'
    }, {
      name: 'd',
      icon: 'rect'
    }, {
      name: 'e',
      icon: 'rect'
    }, {
      name: 'f',
      icon: 'rect'
    }],
    x: 'center',
    bottom: 20,
    itemHeight: 15,
    itemWidth: 15
  },
  tooltip: {
    trigger: 'item',
    formatter: '{ a } <br/>{ b }: { c } ({ d }%)',
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
        name: 'a',
        value: 1
      },
      {
        name: 'b',
        value: 2
      },
      {
        name: 'c',
        value: 3
      },
      {
        name: 'd',
        value: 4
      },
      {
        name: 'e',
        value: 5
      },
      {
        name: 'f',
        value: 6
      }
    ]
  }]
}
