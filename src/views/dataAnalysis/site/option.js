/* eslint-disable */

import {
  echartsAxisLabelFormatter
} from '@/utils/'

const colors = [
    '#5c70ea','#ff46a9','#5ce5ea','#2b75f5','#ac7cbb',
    '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
    '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
    '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
]

export const siteDict = [
  { 'name': '商场', 'value': 'Mall_Aisle' },
  { 'name': '电影院', 'value': 'Cinema' },
  { 'name': 'KTV', 'value': 'KTV' },
  { 'name': '游艺厅', 'value': 'Games_Hall' },
  { 'name': '酒店', 'value': 'MALL,002' },
  { 'name': '步行街', 'value': 'MALL,004' },
  { 'name': '4S店', 'value': 'MALL,003' },
  { 'name': '旅游景点', 'value': 'SCENIC_SPOT,001' },
  { 'name': '机场', 'value': 'STATION,001' },
  { 'name': '火车站', 'value': 'STATION,002' },
  { 'name': '汽车站', 'value': 'STATION,003' },
  { 'name': '地铁站', 'value': 'STATION,004' },
  { 'name': '工厂', 'value': 'FACTORY,001' },
  { 'name': '社区', 'value': 'COMMUNITY,001' },
  { 'name': '办公楼', 'value': 'OFFICE,001' },
  { 'name': '医院', 'value': 'HOSPITAL,001' },
  { 'name': '政府机构', 'value': 'GOVERNMENT,001' },
  { 'name': '大学', 'value': 'SCHOOL,005' },
  { 'name': '初中', 'value': 'SCHOOL,003' },
  { 'name': '小学', 'value': 'SCHOOL,002' },
  { 'name': '幼儿园', 'value': 'SCHOOL,001' },
  { 'name': '培训机构', 'value': 'SCHOOL,006' },
  { 'name': '高中&职业技术学院', 'value': 'SCHOOL,004' },
  { 'name': '其他', 'value': 'OTHERS,001' }
]

// 点位收益趋势配参
export const siteEarnTrendOption = {
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
    data: [],
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
  series: []
}

// 点位投放效果配参
export const siteInfoOption = {
  color: colors,
  legend: {
    data: [{
      name: '设备数量(台)',
      icon: 'rect'
    }, {
      name: '成交金额(元)',
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
    name: '成交金额(元)'
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
    data: [],
    x: 'center',
    bottom: 20,
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
