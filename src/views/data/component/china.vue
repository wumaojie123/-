/* eslint-disable */
<template>
  <section >
    <section class="order-total">
      <p >全国投放点位分布图</p>
      <p style="margin-top: 18px;">覆盖城市
        <span style="color: #44CFD9;font-weight: 700;">{{ localList.length }}</span>
        个，共计投放商
        <span style="color: #44CFD9;font-weight: 700;">{{ total }}</span>
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
    dataList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      localList: this.dataList,
      echartData: [],
      geoCoordMap: {}
    }
  },
  computed: {
    total() {
      let num = 0
      this.localList.map(i => {
        num += i.lyyDistributorCount || 0
      })
      return num
    }
  },
  watch: {
    dataList(val) {
      const arr = []
      const geoCoordMap = {}
      val.map(i => {
        const obj = { name: i.cityName, value: i.lyyDistributorCount }
        geoCoordMap[i.cityName] = [i.lng, i.lat]
        arr.push(obj)
      })
      this.echartData = arr
      this.geoCoordMap = geoCoordMap
      this.localList = val
    }
  },
  mounted() {
    this.initDatas()
  },
  methods: {
    async initDatas() {
      const myChart = echarts.init(document.getElementById('china'))
      const mapName = 'china'
      const data = [
        { name: '北京', value: 199 }
      ]

      const geoCoordMap = {}
      const toolTipData = [
        { name: '北京', value: [{ name: '科技人才总数', value: 95 }, { name: '理科', value: 82 }] }
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
    },
    async getLocationInfo(name) {

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

