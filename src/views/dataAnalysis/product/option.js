import {
  echartsAxisLabelFormatter
} from '@/utils/'

export const salesTrendOption = {
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
    data: [
      {
        name: '商品出货量',
        icon: 'circle'
      },
      {
        name: '成交金额(元)',
        icon: 'circle'
      }
    ],
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
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      name: '商品出货量',
      type: 'line',
      areaStyle: {
        color: 'rgba(79, 168, 249, .4)'
      },
      color: '#4fa8f9'
    },
    {
      data: [400, 1932, 501, 734, 1790, 1330, 1920],
      name: '成交金额(元)',
      type: 'line',
      areaStyle: {
        color: 'rgba(110, 199, 30, .4)'
      },
      color: '#6ec71e'
    }
  ]
}

export const doneNumOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  // toolbox: {
  //   feature: {
  //     dataView: { show: true, readOnly: false },
  //     magicType: { show: true, type: ['line', 'bar'] },
  //     restore: { show: true },
  //     saveAsImage: { show: true }
  //   }
  // },
  legend: {
    data: [
      {
        name: '成交金额(元)',
        icon: 'circle'
      },
      {
        name: '出货量',
        icon: 'circle'
      }
    ],
    itemGap: 20,
    bottom: 0,
    itemHeight: 15,
    itemWidth: 15
  },
  xAxis: [
    {
      type: 'category',
      data: ['旺仔牛奶', '可口可乐', '雪碧', '雪糕', '阿根达斯', '冰淇淋', '三明治', '蛋挞', '巧克力', '菊花茶', '泡泡糖', '喜之郎'],
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '',
      min: 0,
      max: 400,
      interval: 50,
      axisLabel: {
        formatter: '{value}'
      }
    }
  ],
  series: [
    {
      name: '成交金额(元)',
      type: 'bar',
      data: [20, 389, 70, 232, 256, 76.7, 136, 162, 326, 200, 60, 30],
      areaStyle: {
        color: 'rgba(79, 168, 249, .4)'
      },
      color: '#4fa8f9'
    },
    {
      name: '出货量',
      type: 'bar',
      data: [26, 59, 90, 264, 287, 307, 176, 122, 287, 18, 60, 23],
      areaStyle: {
        color: 'rgba(110, 199, 30, .4)'
      },
      color: '#6ec71e'
    }
  ]
}
