(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-4c97"],{"7uq4":function(t,e,i){"use strict";i.r(e);var a=i("88Rz"),r=i.n(a),n={mixins:[i("9CxU").a],props:{className:{type:String,default:"chart"},id:{type:String,default:"chart"},width:{type:String,default:"200px"},height:{type:String,default:"200px"}},data:function(){return{chart:null}},mounted:function(){this.initChart()},beforeDestroy:function(){this.chart&&(this.chart.dispose(),this.chart=null)},methods:{initChart:function(){this.chart=r.a.init(document.getElementById(this.id));var t=function(){for(var t=[],e=1;e<13;e++)t.push(e+"month");return t}();this.chart.setOption({backgroundColor:"#344b58",title:{text:"statistics",x:"20",top:"20",textStyle:{color:"#fff",fontSize:"22"},subtextStyle:{color:"#90979c",fontSize:"16"}},tooltip:{trigger:"axis",axisPointer:{textStyle:{color:"#fff"}}},grid:{left:"5%",right:"5%",borderWidth:0,top:150,bottom:95,textStyle:{color:"#fff"}},legend:{x:"5%",top:"10%",textStyle:{color:"#90979c"},data:["female","male","average"]},calculable:!0,xAxis:[{type:"category",axisLine:{lineStyle:{color:"#90979c"}},splitLine:{show:!1},axisTick:{show:!1},splitArea:{show:!1},axisLabel:{interval:0},data:t}],yAxis:[{type:"value",splitLine:{show:!1},axisLine:{lineStyle:{color:"#90979c"}},axisTick:{show:!1},axisLabel:{interval:0},splitArea:{show:!1}}],dataZoom:[{show:!0,height:30,xAxisIndex:[0],bottom:30,start:10,end:80,handleIcon:"path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",handleSize:"110%",handleStyle:{color:"#d3dee5"},textStyle:{color:"#fff"},borderColor:"#90979c"},{type:"inside",show:!0,height:15,start:1,end:35}],series:[{name:"female",type:"bar",stack:"total",barMaxWidth:35,barGap:"10%",itemStyle:{normal:{color:"rgba(255,144,128,1)",label:{show:!0,textStyle:{color:"#fff"},position:"insideTop",formatter:function(t){return t.value>0?t.value:""}}}},data:[709,1917,2455,2610,1719,1433,1544,3285,5208,3372,2484,4078]},{name:"male",type:"bar",stack:"total",itemStyle:{normal:{color:"rgba(0,191,183,1)",barBorderRadius:0,label:{show:!0,position:"top",formatter:function(t){return t.value>0?t.value:""}}}},data:[327,1776,507,1200,800,482,204,1390,1001,951,381,220]},{name:"average",type:"line",stack:"total",symbolSize:10,symbol:"circle",itemStyle:{normal:{color:"rgba(252,230,48,1)",barBorderRadius:0,label:{show:!0,position:"top",formatter:function(t){return t.value>0?t.value:""}}}},data:[1036,3693,2962,3810,2519,1915,1748,4675,6209,4323,2865,4298]}]})}}},o=i("ZrdR"),s=Object(o.a)(n,function(){var t=this.$createElement;return(this._self._c||t)("div",{class:this.className,style:{height:this.height,width:this.width},attrs:{id:this.id}})},[],!1,null,null,null);s.options.__file="mixChart.vue";var l={name:"MixChart",components:{Chart:s.exports}},c=(i("UfkI"),Object(o.a)(l,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"chart-container"},[e("chart",{attrs:{height:"100%",width:"100%"}})],1)},[],!1,null,"9874541e",null));c.options.__file="mixChart.vue";e.default=c.exports},"9CxU":function(t,e,i){"use strict";var a=i("7Qib");e.a={mounted:function(){var t=this;this.__resizeHandler=Object(a.a)(function(){t.chart&&t.chart.resize()},100),window.addEventListener("resize",this.__resizeHandler),document.getElementsByClassName("sidebar-container")[0].addEventListener("transitionend",this.sidebarResizeHandler)},beforeDestroy:function(){window.removeEventListener("resize",this.__resizeHandler),document.getElementsByClassName("sidebar-container")[0].removeEventListener("transitionend",this.sidebarResizeHandler)},methods:{sidebarResizeHandler:function(t){"width"===t.propertyName&&this.__resizeHandler()}}}},BoRg:function(t,e,i){},UfkI:function(t,e,i){"use strict";var a=i("BoRg");i.n(a).a}}]);