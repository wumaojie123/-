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
      console.log('--log--:', params)
      const { value, name, seriesName } = params
      if (!value) {
        return '该省份暂无' + seriesName
      }
      var relVal = ''
      relVal += '<div class="hover-class">' +
        '<p class="province-item">' + name + '</p>' +
        '<div class="type-list">' +
        '<p class="type-item">' + seriesName + ':' + value + '</p>' +
        '</div>' +
        '</div>'
      return relVal
    }
  },
  legend: {
    data: [
      {
        name: '设备量',
        icon: 'circle',
        textStyle: {
          backgroundColor: '#fff'
        }
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
    textStyle: {},
    itemGap: 20,
    bottom: 0,
    itemHeight: 15,
    itemWidth: 15
  },
  visualMap: {
    bottom: 20,
    type: 'continuous',
    min: 0,
    max: 1000,
    text: ['高', '低'],
    orient: 'horizontal',
    itemWidth: 30,
    itemHeight: 60,
    inRange: {
      color: ['#e8f1fc', '#c0d8f5', '#87b5e7', '#5ab1ef'],
      symbolSize: [60, 200],
      symbol: 'triangle'
    },
    inverse: true
  },
  series: [
    {
      name: '设备量',
      type: 'map',
      mapType: 'china',
      roam: false,
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: true
        }
      },
      data: [
        { name: '北京', value: Math.round(Math.random() * 200) },
        { name: '天津', value: Math.round(Math.random() * 1000) },
        { name: '上海', value: Math.round(Math.random() * 1000) },
        { name: '重庆', value: Math.round(Math.random() * 40) },
        { name: '河北', value: Math.round(Math.random() * 1000) },
        { name: '河南', value: Math.round(Math.random() * 1000) },
        { name: '云南', value: Math.round(Math.random() * 300) },
        { name: '辽宁', value: Math.round(Math.random() * 1000) },
        { name: '黑龙江', value: Math.round(Math.random() * 1000) },
        { name: '湖南', value: Math.round(Math.random() * 1000) },
        { name: '安徽', value: Math.round(Math.random() * 1000) },
        { name: '山东', value: Math.round(Math.random() * 1000) },
        { name: '新疆', value: Math.round(Math.random() * 1000) },
        { name: '江苏', value: Math.round(Math.random() * 1000) },
        { name: '浙江', value: Math.round(Math.random() * 1000) },
        { name: '江西', value: Math.round(Math.random() * 1000) },
        { name: '湖北', value: Math.round(Math.random() * 1000) },
        { name: '广西', value: Math.round(Math.random() * 1000) },
        { name: '甘肃', value: Math.round(Math.random() * 100) },
        { name: '山西', value: Math.round(Math.random() * 1000) },
        { name: '内蒙古', value: Math.round(Math.random() * 1000) },
        { name: '陕西', value: Math.round(Math.random() * 1000) },
        { name: '吉林', value: Math.round(Math.random() * 1000) },
        { name: '福建', value: Math.round(Math.random() * 1000) },
        { name: '贵州', value: Math.round(Math.random() * 1000) },
        { name: '广东', value: Math.round(Math.random() * 1000) },
        { name: '青海', value: Math.round(Math.random() * 1000) },
        { name: '西藏', value: Math.round(Math.random() * 1000) },
        { name: '四川', value: Math.round(Math.random() * 1000) },
        { name: '宁夏', value: Math.round(Math.random() * 1000) },
        { name: '海南', value: Math.round(Math.random() * 1000) },
        { name: '台湾', value: Math.round(Math.random() * 1000) },
        { name: '香港', value: Math.round(Math.random() * 1000) },
        { name: '澳门', value: Math.round(Math.random() * 1000) }
      ]
    },
    {
      name: '订单量',
      type: 'map',
      mapType: 'china',
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: true
        }
      },
      data: [
        { name: '北京', value: Math.round(Math.random() * 1000) },
        { name: '天津', value: Math.round(Math.random() * 1000) },
        { name: '上海', value: Math.round(Math.random() * 700) },
        { name: '重庆', value: Math.round(Math.random() * 1000) },
        { name: '河北', value: Math.round(Math.random() * 1000) },
        { name: '河南', value: Math.round(Math.random() * 1000) },
        { name: '云南', value: Math.round(Math.random() * 1000) },
        { name: '辽宁', value: Math.round(Math.random() * 1000) },
        { name: '黑龙江', value: Math.round(Math.random() * 1000) },
        { name: '湖南', value: Math.round(Math.random() * 1000) },
        { name: '安徽', value: Math.round(Math.random() * 60) },
        { name: '山东', value: Math.round(Math.random() * 1000) },
        { name: '新疆', value: Math.round(Math.random() * 1000) },
        { name: '江苏', value: Math.round(Math.random() * 40) },
        { name: '浙江', value: Math.round(Math.random() * 1000) },
        { name: '江西', value: Math.round(Math.random() * 1000) },
        { name: '湖北', value: Math.round(Math.random() * 1000) },
        { name: '广西', value: Math.round(Math.random() * 40) },
        { name: '甘肃', value: Math.round(Math.random() * 1000) },
        { name: '山西', value: Math.round(Math.random() * 1000) },
        { name: '内蒙古', value: Math.round(Math.random() * 1000) },
        { name: '陕西', value: Math.round(Math.random() * 1000) },
        { name: '吉林', value: Math.round(Math.random() * 1000) },
        { name: '福建', value: Math.round(Math.random() * 1000) },
        { name: '贵州', value: Math.round(Math.random() * 1000) },
        { name: '广东', value: Math.round(Math.random() * 1000) },
        { name: '青海', value: Math.round(Math.random() * 1000) },
        { name: '西藏', value: Math.round(Math.random() * 1000) },
        { name: '四川', value: Math.round(Math.random() * 1000) },
        { name: '宁夏', value: Math.round(Math.random() * 1000) },
        { name: '海南', value: Math.round(Math.random() * 1000) },
        { name: '台湾', value: Math.round(Math.random() * 1000) },
        { name: '香港', value: Math.round(Math.random() * 1000) },
        { name: '澳门', value: Math.round(Math.random() * 1000) }
      ]
    },
    {
      name: '订单总额',
      type: 'map',
      mapType: 'china',
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: true
        }
      },
      data: [
        { name: '北京', value: Math.round(Math.random() * 1000) },
        { name: '天津', value: Math.round(Math.random() * 1000) },
        { name: '上海', value: Math.round(Math.random() * 1000) },
        { name: '重庆', value: Math.round(Math.random() * 1000) },
        { name: '河北', value: Math.round(Math.random() * 1000) },
        { name: '河南', value: Math.round(Math.random() * 1000) },
        { name: '云南', value: Math.round(Math.random() * 1000) },
        { name: '辽宁', value: Math.round(Math.random() * 1000) },
        { name: '黑龙江', value: Math.round(Math.random() * 1000) },
        { name: '湖南', value: Math.round(Math.random() * 1000) },
        { name: '安徽', value: Math.round(Math.random() * 1000) },
        { name: '山东', value: Math.round(Math.random() * 1000) },
        { name: '新疆', value: Math.round(Math.random() * 1000) },
        { name: '江苏', value: Math.round(Math.random() * 1000) },
        { name: '浙江', value: Math.round(Math.random() * 1000) },
        { name: '江西', value: Math.round(Math.random() * 1000) },
        { name: '湖北', value: Math.round(Math.random() * 1000) },
        { name: '广西', value: Math.round(Math.random() * 1000) },
        { name: '甘肃', value: Math.round(Math.random() * 1000) },
        { name: '山西', value: Math.round(Math.random() * 1000) },
        { name: '内蒙古', value: Math.round(Math.random() * 1000) },
        { name: '陕西', value: Math.round(Math.random() * 1000) },
        { name: '吉林', value: Math.round(Math.random() * 1000) },
        { name: '福建', value: Math.round(Math.random() * 1000) },
        { name: '贵州', value: Math.round(Math.random() * 1000) },
        { name: '广东', value: Math.round(Math.random() * 1000) },
        { name: '青海', value: Math.round(Math.random() * 1000) },
        { name: '西藏', value: Math.round(Math.random() * 1000) },
        { name: '四川', value: Math.round(Math.random() * 1000) },
        { name: '宁夏', value: Math.round(Math.random() * 1000) },
        { name: '海南', value: Math.round(Math.random() * 1000) },
        { name: '台湾', value: Math.round(Math.random() * 1000) },
        { name: '香港', value: Math.round(Math.random() * 1000) },
        { name: '澳门', value: Math.round(Math.random() * 1000) }
      ]
    },
    {
      name: '客单价',
      type: 'map',
      mapType: 'china',
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: true
        }
      },
      data: [
        { name: '北京', value: Math.round(Math.random() * 1000) },
        { name: '天津', value: Math.round(Math.random() * 1000) },
        { name: '上海', value: Math.round(Math.random() * 1000) },
        { name: '重庆', value: Math.round(Math.random() * 1000) },
        { name: '河北', value: Math.round(Math.random() * 1000) },
        { name: '河南', value: Math.round(Math.random() * 1000) },
        { name: '云南', value: Math.round(Math.random() * 1000) },
        { name: '辽宁', value: Math.round(Math.random() * 1000) },
        { name: '黑龙江', value: Math.round(Math.random() * 1000) },
        { name: '湖南', value: Math.round(Math.random() * 1000) },
        { name: '安徽', value: Math.round(Math.random() * 1000) },
        { name: '山东', value: Math.round(Math.random() * 1000) },
        { name: '新疆', value: Math.round(Math.random() * 1000) },
        { name: '江苏', value: Math.round(Math.random() * 1000) },
        { name: '浙江', value: Math.round(Math.random() * 1000) },
        { name: '江西', value: Math.round(Math.random() * 1000) },
        { name: '湖北', value: Math.round(Math.random() * 1000) },
        { name: '广西', value: Math.round(Math.random() * 1000) },
        { name: '甘肃', value: Math.round(Math.random() * 1000) },
        { name: '山西', value: Math.round(Math.random() * 1000) },
        { name: '内蒙古', value: Math.round(Math.random() * 1000) },
        { name: '陕西', value: Math.round(Math.random() * 1000) },
        { name: '吉林', value: Math.round(Math.random() * 1000) },
        { name: '福建', value: Math.round(Math.random() * 1000) },
        { name: '贵州', value: Math.round(Math.random() * 1000) },
        { name: '广东', value: Math.round(Math.random() * 1000) },
        { name: '青海', value: Math.round(Math.random() * 1000) },
        { name: '西藏', value: Math.round(Math.random() * 1000) },
        { name: '四川', value: Math.round(Math.random() * 1000) },
        { name: '宁夏', value: Math.round(Math.random() * 1000) },
        { name: '海南', value: Math.round(Math.random() * 1000) },
        { name: '台湾', value: Math.round(Math.random() * 1000) },
        { name: '香港', value: Math.round(Math.random() * 1000) },
        { name: '澳门', value: Math.round(Math.random() * 1000) }
      ]
    }
  ]
}
