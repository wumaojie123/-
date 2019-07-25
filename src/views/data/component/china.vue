/* eslint-disable */
<template>
  <section >
    <section class="order-total">
      <p >全国投放点位分布图</p>
      <p style="margin-top: 18px;">覆盖城市
        <span style="color: #44CFD9;font-weight: 700;">34</span>
        个，共计投放商
        <span style="color: #44CFD9;font-weight: 700;">300</span>
        个
      </p>
    </section>
    <section id="china" style="width: 100%;height: 2.815625rem; margin: 0 auto; margin-top: 20px;"/>
  </section>
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js'
export default {
  name: 'China',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    this.initDatas()
  },
  methods: {
    initDatas() {
      const myChart = echarts.init(document.getElementById('china'))
      const mapName = 'china'
      const data = [
        { name: '北京', value: 199 },
        { name: '天津', value: 42 },
        { name: '河北', value: 102 },
        { name: '山西', value: 81 },
        { name: '内蒙古', value: 47 },
        { name: '武汉市', value: 47 },
        { name: '辽宁', value: 67 },
        { name: '吉林', value: 82 },
        { name: '黑龙江', value: 123 },
        { name: '上海', value: 24 }

      ]

      const geoCoordMap = {}
      const toolTipData = [
        { name: '北京', value: [{ name: '科技人才总数', value: 95 }, { name: '理科', value: 82 }] },
        { name: '天津', value: [{ name: '文科', value: 22 }, { name: '理科', value: 20 }] },
        { name: '河北', value: [{ name: '文科', value: 60 }, { name: '理科', value: 42 }] },
        { name: '山西', value: [{ name: '文科', value: 40 }, { name: '理科', value: 41 }] },
        { name: '内蒙古', value: [{ name: '文科', value: 23 }, { name: '理科', value: 24 }] },
        { name: '辽宁', value: [{ name: '文科', value: 39 }, { name: '理科', value: 28 }] },
        { name: '武汉市', value: [{ name: '文科', value: 39 }, { name: '理科', value: 28 }] },
        { name: '吉林', value: [{ name: '文科', value: 41 }, { name: '理科', value: 41 }] },
        { name: '黑龙江', value: [{ name: '文科', value: 35 }, { name: '理科', value: 31 }] },
        { name: '上海', value: [{ name: '文科', value: 12 }, { name: '理科', value: 12 }] },
        { name: '江苏', value: [{ name: '文科', value: 47 }, { name: '理科', value: 45 }] },
        { name: '浙江', value: [{ name: '文科', value: 57 }, { name: '理科', value: 57 }] },
        { name: '安徽', value: [{ name: '文科', value: 57 }, { name: '理科', value: 52 }] },
        { name: '福建', value: [{ name: '文科', value: 59 }, { name: '理科', value: 57 }] },
        { name: '江西', value: [{ name: '文科', value: 49 }, { name: '理科', value: 42 }] },
        { name: '山东', value: [{ name: '文科', value: 67 }, { name: '理科', value: 52 }] },
        { name: '河南', value: [{ name: '文科', value: 69 }, { name: '理科', value: 68 }] },
        { name: '湖北', value: [{ name: '文科', value: 60 }, { name: '理科', value: 56 }] },
        { name: '湖南', value: [{ name: '文科', value: 62 }, { name: '理科', value: 52 }] },
        { name: '重庆', value: [{ name: '文科', value: 47 }, { name: '理科', value: 44 }] },
        { name: '四川', value: [{ name: '文科', value: 65 }, { name: '理科', value: 60 }] },
        { name: '贵州', value: [{ name: '文科', value: 32 }, { name: '理科', value: 30 }] },
        { name: '云南', value: [{ name: '文科', value: 42 }, { name: '理科', value: 41 }] },
        { name: '西藏', value: [{ name: '文科', value: 5 }, { name: '理科', value: 4 }] },
        { name: '陕西', value: [{ name: '文科', value: 38 }, { name: '理科', value: 42 }] },
        { name: '甘肃', value: [{ name: '文科', value: 28 }, { name: '理科', value: 28 }] },
        { name: '青海', value: [{ name: '文科', value: 5 }, { name: '理科', value: 5 }] },
        { name: '宁夏', value: [{ name: '文科', value: 10 }, { name: '理科', value: 8 }] },
        { name: '新疆', value: [{ name: '文科', value: 36 }, { name: '理科', value: 31 }] },
        { name: '广东', value: [{ name: '文科', value: 63 }, { name: '理科', value: 60 }] },
        { name: '广西', value: [{ name: '文科', value: 29 }, { name: '理科', value: 30 }] },
        { name: '海南', value: [{ name: '文科', value: 8 }, { name: '理科', value: 6 }] }
      ]

      /* 获取地图数据*/
      myChart.showLoading()
      const mapFeatures = echarts.getMap(mapName).geoJson.features
      myChart.hideLoading()
      mapFeatures.forEach(function(v) {
        // 地区名称
        const name = v.properties.name
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp
      })

      console.log(data)
      console.log(toolTipData)
      // const max = 480, min = 9 // todo
      // const maxSize4Pin = 100,
      //   minSize4Pin = 20

      const convertData = function(data) {
        const res = []
        for (let i = 0; i < data.length; i++) {
          const geoCoord = geoCoordMap[data[i].name]
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            })
          }
        }
        return res
      }
      const option = {
        tooltip: {
          padding: 0,
          enterable: true,
          transitionDuration: 1,
          textStyle: {
            color: '#000',
            decoration: 'none'
          },
          formatter: function(params) {
            let tipHtml = ''
            if (!params.name) {
              return
            }
            tipHtml =
                  `<div style="padding:10px;background: rgba(68, 207, 217, .4);">
                    <p style="color:#fff;font-size:12px;">
                      ${params.name}</p>
                    <p style="color:#fff;font-size:12px;">
                      投放商${toolTipData.length}个
                    <p style="color:#fff;font-size:12px;">
                      共计投放设备${toolTipData.length}台
                    </p>
                  </div>`
            setTimeout(function() {
              if (params.name) {
                // tooltipCharts(params.name)
              }
            }, 10)
            return tipHtml
          }

        },
        geo: {
          show: true,
          zoom: 1.2,
          map: mapName,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          regions: [
            {
              name: '南海诸岛',
              value: 0,
              itemStyle:
                      { normal:
                          { opacity: 0,
                            label: {
                              show: false

                            }
                          }
                      }
            }],
          roam: false,
          itemStyle: {
            normal: {
              areaColor: '#023677',
              borderColor: '#1180c7'
            },
            emphasis: {
              areaColor: '#4499d0'
            }
          }
        },
        series: [{
          name: '散点',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: convertData(data),
          symbolSize: function(val) {
            return val[2] / 10
          },
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: '#fff'
            }
          }
        },
        {
          type: 'map',
          map: mapName,
          geoIndex: 0,
          aspectScale: 0.75, // 长宽比
          showLegendSymbol: false, // 存在legend时显示
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: false,
              textStyle: {
                color: '#fff'
              }
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#031525',
              borderColor: '#3B5077'
            },
            emphasis: {
              areaColor: '#2B91B7'
            }
          },
          animation: false,
          data: data
        },
        {
          name: '点',
          type: 'scatter',
          coordinateSystem: 'geo',
          zlevel: 6
        },
        {
          name: 'Top 100',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: convertData(data.sort(function(a, b) {
            return b.value - a.value
          }).slice(0, 10)),
          symbolSize: function(val) {
            return val[2] / 10
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          label: {
            normal: {
              formatter: '{b}',
              position: 'left',
              show: false
            }
          },
          itemStyle: {
            normal: {
              color: '#44CFD9',
              shadowBlur: 10,
              shadowColor: '#44CFD9'
            }
          },
          zlevel: 1
        }

        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped lang="less">
@import '../images/constant.less';

.order-total{
    font-size: @30px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    text-align:center;
}
.total {
    padding-top: @23px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.order-total .total span{
    font-size: @26px;
    font-weight: 500;
    margin: 0 @20px;
    color:rgba(82,195,255,1);
}
.total .total-icon{
    width: @40px;
}

.total-num {
    color: #D071FF;
    font-size: @30px;
    font-weight:bold;
}

</style>

