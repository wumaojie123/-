function randomData() {
  return Math.round(Math.random() * 1000)
}

function randomData2() {
  return Math.round(Math.random() * 2000)
}

function randomData3() {
  return Math.round(Math.random() * 3000)
}

function randomData4() {
  return Math.round(Math.random() * 4000)
}

export const zoneChinaMapOption = {
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
        '<p class="type-item">' + '设备量: ' + data['value1'] + '</p>' +
        '<p class="type-item">' + '订单量: ' + data['value2'] + '</p>' +
        '<p class="type-item">' + '订单总额: ' + data['value3'] + '</p>' +
        '<p class="type-item">' + '客单价: ' + data['value4'] + '</p>' +
        '</div>' +
        '</div>'
      return relVal
    }
  },
  legend: {
    data: [
      {
        name: '设备量',
        icon: 'circle'
      },
      {
        name: '订单量',
        icon: 'circle'
      },
      {
        name: '订单总额',
        icon: 'circle'
      },
      {
        name: '客单价',
        icon: 'circle'
      }
    ],
    itemGap: 20,
    bottom: 0,
    itemHeight: 15,
    itemWidth: 15
  },
  visualMap: {
    bottom: 40,
    type: 'continuous',
    min: 0,
    max: 4000,
    text: ['高', '低'],
    orient: 'horizontal',
    itemWidth: 30,
    itemHeight: 120,
    inRange: {
      color: ['#e8f1fc', '#c0d8f5', '#87b5e7', '#5ab1ef'],
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
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '天津',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '上海',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '重庆',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '河北',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '河南',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '云南',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '辽宁',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '黑龙江',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '湖南',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '安徽',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '山东',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '新疆',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '江苏',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '浙江',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '江西',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '湖北',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '广西',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '甘肃',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '山西',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '内蒙古',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '陕西',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '吉林',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '福建',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '贵州',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '广东',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '青海',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '西藏',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '四川',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '宁夏',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '海南',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '台湾',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '香港',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '澳门',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        }
      ]
    },
    {
      name: '订单量',
      type: 'map',
      mapType: 'china',
      data: [
        {
          name: '北京',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '天津',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '上海',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '重庆',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '河北',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '安徽',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '新疆',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '浙江',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '江西',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '山西',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '内蒙古',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '吉林',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '福建',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '广东',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '西藏',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '四川',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '宁夏',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '香港',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '澳门',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        }
      ]
    },
    {
      name: '订单总额',
      type: 'map',
      mapType: 'china',
      data: [
        {
          name: '北京',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '天津',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '上海',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '广东',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '台湾',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '香港',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '澳门',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        }
      ]
    },
    {
      name: '客单价',
      type: 'map',
      mapType: 'china',
      data: [
        {
          name: '北京',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '天津',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '上海',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '广东',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '台湾',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '香港',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        },
        {
          name: '澳门',
          value: randomData(),
          value1: randomData(),
          value2: randomData2(),
          value3: randomData3(),
          value4: randomData4()
        }
      ]
    }
  ]
}
