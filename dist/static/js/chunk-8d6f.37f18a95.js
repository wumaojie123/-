(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-8d6f"],{eyRr:function(t,e,a){"use strict";a.r(e);var i=a("MT78"),o=a.n(i),s={props:{data:{type:Array,default:function(){return[]}},timeType:{type:Number,default:1}},data:function(){return{type:"1",localData:this.data,dateList:[],incomeList:[],orderList:[]}},watch:{data:function(t){var e=[],a=[],i=[];this.data.map(function(t){e.push(t.statisticsDate),a.push(t.stock),i.push(t.outCount)}),this.initData(e,a,i)}},methods:{initData:function(t,e,a){var i=o.a.init(document.querySelector(".echart2")),s={legend:{data:["进货量","出货量"],textStyle:{color:"#7ED1FD"},top:"0",right:"10%"},grid:{top:"5%",left:"5%",right:"10%",bottom:"23",containLabel:!0},tooltip:{trigger:"axis"},xAxis:[{type:"category",boundaryGap:!1,data:t,axisTick:{alignWithLabel:!0,show:!1},axisPointer:{type:"shadow"},axisLabel:{show:!0,textStyle:{color:"#44CFD9"}},axisLine:{lineStyle:{width:2,color:"#44CFD9"}}}],yAxis:[{type:"value",splitNumber:"4",min:0,axisTick:{show:!1},axisLabel:{show:!0,color:"#44CFD9",textStyle:{color:"#44CFD9"}},axisLine:{show:!0,lineStyle:{width:2,color:"#44CFD9"}},splitLine:{show:!1,lineStyle:{color:"#44CFD9",type:"dashed"}}}],series:[{name:"进货量",type:"line",stack:"总量",data:e,smooth:!1,itemStyle:{normal:{color:"#4060B9",borderColor:"#4060B9",borderWidth:4}}},{name:"出货量",type:"line",stack:"总量2",data:a,smooth:!1,itemStyle:{normal:{color:"#16ECEC",borderColor:"#16ECEC",borderWidth:4}}}]};i.setOption(s)}}},r=(a("qwLr"),a("KHd+")),n=Object(r.a)(s,function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"tend-wrapper"},[e("div",{staticClass:"title"},[e("div",{staticClass:"left"},[e("span",{staticStyle:{color:"rgba(68,207,217,1)"}},[this._v("设备进出货趋势")]),this._v(" "),e("el-popover",{staticClass:"lyy-tend-wrapper",attrs:{placement:"top-start",width:"200",trigger:"hover",content:"进货量指由乐摇摇购进的设备总数进货量=待转移设备+已转移设备出货量即已转移设备"}},[e("i",{staticClass:"el-icon-question",staticStyle:{"font-size":"20px",color:"#44cfd9"},attrs:{slot:"reference"},slot:"reference"})])],1)]),this._v(" "),e("section",{staticClass:"echart2"})])},[],!1,null,"5c08dc85",null);n.options.__file="payTend.vue";e.default=n.exports},q8XW:function(t,e,a){},qwLr:function(t,e,a){"use strict";var i=a("q8XW");a.n(i).a}}]);