/* eslint-disable */

const colors = [
    '#5c70ea','#ff46a9','#5ce5ea','#2b75f5','#ac7cbb',
    '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
    '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
    '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
]

export const zoneChinaMapOption = {
  color: colors,
  tooltip: {
    trigger: 'item',
    backgroundColor: '#ffffff',
    extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
    padding: [0, 0],
    textStyle: {
      color: '#666666'
    },
    formatter: function(params) {
      const data = params.data
      if (!data) {
        return '该省份暂无数据！'
      }
      var relVal = ''
      relVal += '<div class="hover-class">' +
        '<p class="province-item">' + data.name + '</p>' +
        '<div class="type-list">' +
        '<p class="type-item">' + '设备量: ' + data['equipmentCount'] + '</p>' +
        '<p class="type-item">' + '订单量: ' + data['payCount'] + '</p>' +
        '<p class="type-item">' + '订单总额(元): ' + data['payAmount'] + '</p>' +
        '<p class="type-item">' + '客单价(元): ' + data['unitPrice'] + '</p>' +
        '</div>' +
        '</div>'
      return relVal
    }
  },
  visualMap: {
    show: false,
    bottom: 40,
    type: 'continuous',
    min: 0,
    max: 2000,
    text: ['高', '低'],
    orient: 'horizontal',
    itemWidth: 30,
    itemHeight: 120,
    inRange: {
      color: ['#ea5cba','#e938ad','#e10f9a','#c80285'],
      symbolSize: [110, 230]
    },
    inverse: true
  },
  series: [
    {
      name: '设备量',
      type: 'map',
      mapType: 'china',
      data: [
        {
          name: '北京',
          value: 1467,
          equipmentCount: 345,
          payCount: 765,
          payAmount: 457,
          unitPrice: 1094
        }
      ]
    }
  ]
}
