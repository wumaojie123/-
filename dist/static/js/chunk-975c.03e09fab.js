(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-975c"],{"/1Qt":function(t,e,a){},"3aUj":function(t,e,a){"use strict";a.r(e);var i=a("88Rz"),o=a.n(i),r={props:{data:{type:Array,default:function(){return[]}},timeType:{type:Number,default:1}},data:function(){return{localData:this.data,dateList:[],incomeList:[],orderList:[]}},watch:{data:function(t){this.localData=t;var e=[],a=[],i=[];this.localData.forEach(function(t){t.groupTypeName.length>5?e.push(t.groupTypeName.slice(0,5)+"..."):e.push(t.groupTypeName),a.push(t.equipmentCount),i.push(t.onlineIncomde)}),this.initData(e.reverse(),a.reverse(),i.reverse())}},methods:{initData:function(t,e,a){var i=o.a.init(document.querySelector(".echart5")),r={legend:{data:["投放设备数","营业额"],textStyle:{color:"#7ED1FD"},top:"1%"},barGap:"1%",grid:{left:"10%",right:"10%",bottom:"3%",containLabel:!0},xAxis:{type:"value",show:!1},yAxis:{type:"category",axisLine:{show:!1},splitLine:{show:!1},nameTextStyle:{color:"#7ED1FD"},axisTick:{show:!1},axisLabel:{color:"#7ED1FD"},data:t},series:[{name:"投放设备数",type:"bar",itemStyle:{borderWidth:10,color:"#189ACA"},barMaxWidth:10,label:{normal:{show:!0,position:"right",formatter:"{c}"}},data:e},{name:"营业额",type:"bar",label:{normal:{show:!0,position:"right"}},itemStyle:{borderWidth:10,color:"#4060B9"},barMaxWidth:10,data:a}]};i.setOption(r)}}},s=(a("H0B3"),a("ZrdR")),n=Object(s.a)(r,function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"tend-wrapper"},[e("div",{staticClass:"title"},[e("div",{staticClass:"left"},[e("span",{staticStyle:{color:"rgba(68,207,217,1)"}},[this._v("昨日投放地址类型与收益分析")])])]),this._v(" "),e("section",{staticClass:"echart5"})])}],!1,null,"91981790",null);n.options.__file="placeAndIncome.vue";e.default=n.exports},H0B3:function(t,e,a){"use strict";var i=a("/1Qt");a.n(i).a}}]);