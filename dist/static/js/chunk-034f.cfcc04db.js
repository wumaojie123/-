(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-034f","chunk-0fdf","chunk-adfe","chunk-421b"],{"03DC":function(e,t,a){"use strict";var n=a("AIHX");a.n(n).a},"8t42":function(e,t,a){"use strict";a.r(t);var n={name:"CardWrapper",props:{label:{type:String,default:""}}},i=(a("Y3Ou"),a("KHd+")),o=Object(i.a)(n,function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"card-wrapper"},[t("h3",[this._v("\n    "+this._s(this.label)+"\n    "),this._t("sub-title")],2),this._v(" "),t("div",{staticClass:"content-wrapper"},[this._t("default")],2)])},[],!1,null,"15295ef4",null);o.options.__file="index.vue";t.default=o.exports},"9jAg":function(e,t,a){},AIHX:function(e,t,a){},"Efp+":function(e,t,a){"use strict";a.r(t);var n=a("QbLZ"),i=a.n(n),o=a("7Qib"),s=a("s6oT"),r=a("L2JU"),l={name:"AnalysisPicker",props:{layout:{type:String,default:"date, merchant, equipmentType, area, export"}},data:function(){return{cascaderProps:{value:"value",label:"text"},agentId:-1,agent:!0,selectDates:[],district:-1,districtLevel:1,areaInfo:[-1],lyyEquipmentTypeId:-1,equipmentTypeOptions:[],layoutInfo:{isShowDate:!1,isShowMerchant:!1,isShowArea:!1,isShowEquipmentType:!1,isShowExport:!1},curQuicklySelect:-30,quicklySelectOptions:[{value:-1,label:"昨天"},{value:-7,label:"最近7天"},{value:-30,label:"最近30天"}],pickerOptions:{disabledDate:function(e){var t=new Date((new Date).toDateString()),a=new Date(new Date("2019/7/1").toDateString());return Object(o.f)(e)>Object(o.f)(t)-86400||Object(o.f)(e)<Object(o.f)(a)}}}},computed:i()({},Object(r.b)(["areaList","agentMerchantList"])),created:function(){this.initLayout(),this.initSelectorData()},mounted:function(){this.emitPickerChange()},methods:{initLayout:function(){var e=this.layout.split(",").map(function(e){return e.replace(/(^\s*)|(\s*$)/g,"")});e.indexOf("date")>-1&&(this.toggleQuicklySelect(-30),this.layoutInfo.isShowDate=!0),this.layoutInfo.isShowMerchant=e.indexOf("merchant")>-1,this.layoutInfo.isShowEquipmentType=e.indexOf("equipmentType")>-1,this.layoutInfo.isShowArea=e.indexOf("area")>-1,this.layoutInfo.isShowExport=e.indexOf("export")>-1},initSelectorData:function(){if(this.layoutInfo.isShowEquipmentType){this.getEquipmentType({agentUser:-1,agent:!0})}this.layoutInfo.isShowArea&&this.$store.dispatch("GetAreaList"),this.layoutInfo.isShowMerchant&&this.$store.dispatch("GetAgentAndMerchant")},getEquipmentType:function(e){var t=this;Object(s.m)(e).then(function(e){0===e.result&&(t.equipmentTypeOptions=[{lyyEquipmentTypeId:-1,equipmentTypeName:"全部"}],t.equipmentTypeOptions=t.equipmentTypeOptions.concat(e.data),t.lyyEquipmentTypeId=-1)})},toggleQuicklySelect:function(e){var t=new Date((new Date).toDateString()),a=new Date,n=new Date(new Date("2019/7/1").toDateString());t.setTime(t.getTime()-864e5),a.setTime(t.getTime()+864e5*(e+1)),new Date(n)>new Date(a)&&(a=n),this.curQuicklySelect=e,this.selectDates=[Object(o.i)(a,"{y}-{m}-{d}"),Object(o.i)(t,"{y}-{m}-{d}")]},merchantChange:function(e){var t=this;this.agentMerchantList.forEach(function(a){e===a.id&&(t.agent=!!a.agent)});var a={agentUser:e,agent:this.agent};this.getEquipmentType(a)},districtChange:function(e){this.district=e[e.length-1],this.districtLevel=e.length},emitPickerChange:function(){var e=this.getParamsData();this.$emit("change",e)},getParamsData:function(){var e={};return this.layoutInfo.isShowDate&&(e.startDate=this.selectDates[0],e.endDate=this.selectDates[1]),this.layoutInfo.isShowMerchant&&(e.agent=this.agent,e.agentId=this.agentId),this.layoutInfo.isShowEquipmentType&&(e.lyyEquipmentTypeId=this.lyyEquipmentTypeId),this.layoutInfo.isShowArea&&(e.district=this.district,e.districtLevel=this.districtLevel),e},exportDataHandle:function(){var e=this.getParamsData();this.$emit("exportFile",e)}}},c=(a("X6zN"),a("KHd+")),p=Object(c.a)(l,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"analysis-picker"},[e.layoutInfo.isShowDate?a("div",{staticClass:"picker-panel"},[e._v("\n    时间：\n    "),a("ul",{staticClass:"quickly-select-list"},e._l(e.quicklySelectOptions,function(t){return a("li",{key:t.value,class:{cur:t.value===e.curQuicklySelect},on:{click:function(a){e.toggleQuicklySelect(t.value)}}},[e._v("\n        "+e._s(t.label)+"\n      ")])})),e._v(" "),a("el-date-picker",{staticClass:"picker-date-item",attrs:{"picker-options":e.pickerOptions,clearable:!1,type:"daterange",align:"center","value-format":"yyyy-MM-dd","unlink-panels":"","range-separator":"至","prefix-icon":"el-icon-time","start-placeholder":"开始时间","end-placeholder":"结束时间"},model:{value:e.selectDates,callback:function(t){e.selectDates=t},expression:"selectDates"}})],1):e._e(),e._v(" "),e.layoutInfo.isShowMerchant?a("div",{staticClass:"picker-panel"},[e._v("\n    代理/商家：\n    "),a("el-select",{attrs:{filterable:"",placeholder:"请选择"},on:{change:e.merchantChange},model:{value:e.agentId,callback:function(t){e.agentId=t},expression:"agentId"}},[a("el-option",{key:"-1",attrs:{value:-1,label:"全部"}}),e._v(" "),e._l(e.agentMerchantList,function(e){return a("el-option",{key:e.id,attrs:{label:(e.name||"")+"("+(e.agent?"代理账号":"商家账号")+(e.phone||"")+")",value:e.id}})})],2)],1):e._e(),e._v(" "),e.layoutInfo.isShowArea?a("div",{staticClass:"picker-panel"},[e._v("\n    区域：\n    "),a("el-cascader",{attrs:{options:e.areaList,"change-on-select":!0,"show-all-levels":!1,props:e.cascaderProps,placeholder:"全部",filterable:""},on:{change:e.districtChange},model:{value:e.areaInfo,callback:function(t){e.areaInfo=t},expression:"areaInfo"}})],1):e._e(),e._v(" "),e.layoutInfo.isShowEquipmentType?a("div",{staticClass:"picker-panel"},[e._v("\n    设备类型：\n    "),a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.lyyEquipmentTypeId,callback:function(t){e.lyyEquipmentTypeId=t},expression:"lyyEquipmentTypeId"}},e._l(e.equipmentTypeOptions,function(e){return a("el-option",{key:e.lyyEquipmentTypeId,attrs:{label:e.equipmentTypeName,value:e.lyyEquipmentTypeId}})}))],1):e._e(),e._v(" "),a("div",{staticClass:"picker-panel"},[a("el-button",{attrs:{type:"primary"},on:{click:e.emitPickerChange}},[e._v("搜索")])],1),e._v(" "),e.layoutInfo.isShowExport?a("div",{staticClass:"picker-panel"},[a("el-button",{attrs:{type:"text"},on:{click:e.exportDataHandle}},[a("i",{staticClass:"el-icon-download"}),e._v("\n      导出数据\n    ")])],1):e._e(),e._v(" "),e._t("default")],2)},[],!1,null,"3e613069",null);p.options.__file="index.vue";t.default=p.exports},Mlyn:function(e,t,a){"use strict";var n=a("bpt0");a.n(n).a},"Q/pn":function(e,t,a){},X6zN:function(e,t,a){"use strict";var n=a("Q/pn");a.n(n).a},Y3Ou:function(e,t,a){"use strict";var n=a("9jAg");a.n(n).a},bpt0:function(e,t,a){},eNqq:function(e,t,a){"use strict";a.r(t);var n=a("QbLZ"),i=a.n(n),o=a("Efp+"),s=a("8t42"),r=a("hddk"),l=a("MT78"),c=a.n(l),p=a("s6oT"),d=a("7Qib"),u=["#5c70ea","#ff46a9","#5ce5ea","#2b75f5","#ac7cbb","#8d98b3","#e5cf0d","#97b552","#95706d","#dc69aa","#07a2a4","#9a7fd1","#588dd5","#f5994e","#c05050","#59678c","#c9ab00","#7eb00a","#6f5553","#c14089"],f={color:u,xAxis:{type:"category",boundaryGap:!1,data:[]},yAxis:{type:"value",axisLabel:{textStyle:{color:"#333"},formatter:d.b},splitLine:{lineStyle:{color:"#dcdcdc"}}},legend:{data:[{name:"成交订单(笔)",icon:"circle"},{name:"成交金额(元)",icon:"circle"},{name:"退款订单(笔)",icon:"circle"},{name:"退款金额(元)",icon:"circle"}],itemGap:20,bottom:0,itemHeight:15,itemWidth:15},tooltip:{trigger:"axis",textStyle:{fontSize:"11",color:"#fff"}},grid:{top:30,bottom:50,left:50,right:50},series:[{data:[],name:"成交订单(笔)",type:"line",areaStyle:{color:"rgba(79, 168, 249, .4)"},color:"#4fa8f9"},{data:[],name:"成交金额(元)",type:"line",areaStyle:{color:"rgba(110, 199, 30, .4)"},color:"#6ec71e"},{data:[],name:"退款订单(笔)",type:"line",areaStyle:{color:"rgba(103, 91, 186, .4)"},color:"#675bba"},{data:[],name:"退款金额(元)",type:"line",areaStyle:{color:"rgba(209, 74, 97, .4)"},color:"#d14a61"}]},h={color:u,xAxis:{type:"category",boundaryGap:!1,data:["0:00","2:00","4:00","6:00","8:00","10:00","12:00","14:00","16:00","18:00","20:00","22:00"]},yAxis:{type:"value",axisLabel:{textStyle:{color:"#333"},formatter:d.b},splitLine:{lineStyle:{color:"#dcdcdc"}}},tooltip:{trigger:"axis",textStyle:{fontSize:"11",color:"#fff"}},grid:{top:30,bottom:20,left:50,right:50},series:[{data:[],name:"订单量(笔)",type:"line",areaStyle:{color:"rgba(79, 168, 249, .5)"},color:"#4fa8f9"}]},y={color:u,legend:{data:[{name:"微信",icon:"rect"},{name:"支付宝",icon:"rect"},{name:"云闪付",icon:"rect"}],x:"center",bottom:0,itemHeight:15,itemWidth:15},tooltip:{trigger:"item",formatter:"{a} <br/>{b}: {c} ({d}%)",textStyle:{fontSize:"11",color:"#fff"}},series:[{name:"支付方式占比",type:"pie",radius:"55%",avoidLabelOverlap:!0,minShowLabelAngle:1,data:[{name:"微信",value:0},{name:"支付宝",value:0},{name:"云闪付",value:0}]}]},v={color:u,legend:{data:[{name:"已成交",icon:"rect"},{name:"退款",icon:"rect"}],x:"center",bottom:0,itemHeight:15,itemWidth:15},tooltip:{trigger:"item",formatter:"{a} <br/>{b}: {c} ({d}%)",textStyle:{fontSize:"11",color:"#fff"}},series:[{name:"支付结果占比",type:"pie",radius:"55%",avoidLabelOverlap:!0,minShowLabelAngle:1,data:[{name:"已成交",value:0},{name:"退款",value:0}]}]},m={components:{AnalysisPicker:o.default,CardWrapper:s.default,ExplainModal:r.default},filters:{percentFilter:function(e){return e?(+e).toFixed(2):0}},data:function(){return{checkedType:[1,2],typeOptions:[{text:"成交订单",value:1,unit:"(笔)"},{text:"成交金额",value:2,unit:"(元)"},{text:"退款订单",value:3,unit:"(笔)"},{text:"退款金额",value:4,unit:"(元)"}],orderTrendData:[],orderTrend:null,orderTimeTrend:null,paymentType:null,paymentState:null,translate:null,orderTrendLoading:!1,orderTimeTrendLoading:!1,paymentTypeLoading:!1,paymentStateLoading:!1,orderTableLoading:!1,orderTableData:[],paginationInfo:{pageIndex:1,pageSize:20,total:0},conversionData:{},paramsData:{},tooltipsInfo:{tooltipsVisible:!1,content:"",title:""}}},methods:{checkedTypeChange:function(){var e=this;this.typeOptions.forEach(function(t){e.checkedType.some(function(e){return t.value===e})?e.orderTrend.dispatchAction({type:"legendSelect",name:t.text+t.unit}):e.orderTrend.dispatchAction({type:"legendUnSelect",name:t.text+t.unit})})},exportDataHandle:function(e){Object(p.g)(e)},showTooltip:function(e){switch(e){case 1:this.tooltipsInfo.selfDefineClass="long-text",this.tooltipsInfo.title="订单高峰分布",this.tooltipsInfo.content="\n            <p class='text'>1.横轴为具体的时间点，纵轴为查询时段内对应时间点下，各天的订单量之和。</p>\n            <p class='text'>举例：假设查询时段为最近7天。则4点对应的纵轴是最近这7天在4点的下单量之和。</p>\n          ",this.tooltipsInfo.tooltipsVisible=!0;break;case 2:this.tooltipsInfo.selfDefineClass="long-text",this.tooltipsInfo.title="订单转化率",this.tooltipsInfo.content="\n            <p class='title'>\n                漏斗每一层统计订单说明：\n            </p>\n            <p class='text'>1.提交订单层：显示统计区间内全部订单（支付成功&支付失败，包含退款的）的总数。</p>\n            <p class='text'>2.支付成功层：显示统计区间内全部订单（支付成功包含退款的）的总数。</p>\n            <p class='text'>3.完成交易层：显示统计区间内全部订单（支付成功的订单剔除全额退款的订单）对应的总数。</p>\n          ",this.tooltipsInfo.tooltipsVisible=!0;break;case 3:this.tooltipsInfo.title="温馨提示",this.tooltipsInfo.content="单笔平均支付金额 = 成交金额 / 成交订单量",this.tooltipsInfo.tooltipsVisible=!0;break;case 4:this.tooltipsInfo.title="温馨提示",this.tooltipsInfo.content="客单价= 成交金额 / 成交人数",this.tooltipsInfo.tooltipsVisible=!0}},pickerChange:function(e){var t=i()({},e);this.paramsData=t,this.getOrderTrendData(t),this.getOrderPeakData(t),this.getOrderPattern(t),this.getOrderResult(t),this.getOrderConversion(t),this.getOrderReportForms(t)},getOrderTrendData:function(e){var t=this;this.orderTrendLoading=!0,Object(p.t)(e).then(function(e){if(t.orderTrendLoading=!1,e.data){var a=t._orderTrendDataTube(e.data);t.orderTrend=c.a.init(t.$refs.orderTrend),t.orderTrendData=a,f.series[0].data=a.line1,f.series[1].data=a.line2,f.series[2].data=a.line3,f.series[3].data=a.line4,f.xAxis.data=a.xAxis,t.orderTrend.setOption(f),t.checkedTypeChange()}}).catch(function(){t.orderTrendLoading=!1})},_orderTrendDataTube:function(e){var t=[],a=[],n=[],i=[],o=[];return e.forEach(function(e){o.push(e.statisticsDate),t.push(e.payCount||0),a.push(e.payAmount||0),n.push(e.refundCount||0),i.push(e.refundAmount||0)}),{line1:t,line2:a,line3:n,line4:i,xAxis:o}},getOrderPeakData:function(e){var t=this;this.orderTimeTrendLoading=!0,Object(p.q)(e).then(function(e){if(t.orderTimeTrendLoading=!1,e.data){t.orderTimeTrend=c.a.init(t.$refs.orderTimeTrend);var a=t._orderPeakDataTube(e.data);h.series[0].data=a.line1,h.xAxis.data=a.xAxis,t.orderTimeTrend.setOption(h)}}).catch(function(){t.orderTimeTrendLoading=!1})},_orderPeakDataTube:function(e){var t=[],a=[];return e.forEach(function(e){a.push(e.statisticsTime),t.push(e.orderCount||0)}),{line1:t,xAxis:a}},getOrderPattern:function(e){var t=this;this.paymentTypeLoading=!0,Object(p.p)(e).then(function(e){if(t.paymentType=c.a.init(t.$refs.paymentType),!e.data||e.data.length<=0)return t.paymentTypeLoading=!1,y.series[0].data[0].value=0,y.series[0].data[1].value=0,y.series[0].data[2].value=0,void t.paymentType.setOption(y);y.series[0].data[0].value=e.data[1].payCount,y.series[0].data[1].value=e.data[0].payCount,y.series[0].data[2].value=e.data[2].payCount,t.paymentType.setOption(y)}).catch(function(){t.paymentTypeLoading=!1})},getOrderResult:function(e){var t=this;this.paymentStateLoading=!0,Object(p.s)(e).then(function(e){if(t.paymentStateLoading=!1,t.paymentState=c.a.init(t.$refs.paymentState),!e.data||e.data.length<=0)return v.series[0].data[0].value=0,v.series[0].data[1].value=0,void t.paymentState.setOption(v);v.series[0].data[0].value=e.data[0].payCount,v.series[0].data[1].value=e.data[1].payCount,t.paymentState.setOption(v)}).catch(function(){t.paymentStateLoading=!1})},getOrderConversion:function(e){var t=this;Object(p.o)(e).then(function(e){e.data&&(t.conversionData.totalCount=e.data.totalCount,t.conversionData.payCount=e.data.payCount,t.conversionData.compCount=e.data.compCount,t.conversionData.linkPay=e.data.linkPay,t.conversionData.linkComp=e.data.linkComp)})},getOrderReportForms:function(e){var t=this;this.orderTableLoading=!0,e.pageIndex=this.paginationInfo.pageIndex,e.pageSize=this.paginationInfo.pageSize,Object(p.r)(e).then(function(e){t.orderTableLoading=!1,e.data&&(t.orderTableData=e.data.items,t.paginationInfo.total=e.data.total)}).catch(function(){t.orderTableLoading=!1})},handleSizeChange:function(){this.getOrderReportForms(i()({},this.paramsData))},handleCurrentChange:function(e){this.paginationInfo.pageIndex=e,this.getOrderReportForms(i()({},this.paramsData))},closeTooltip:function(){this.tooltipsInfo={tooltipsVisible:!1,title:"",content:""}}}},g=(a("Mlyn"),a("KHd+")),b=Object(g.a)(m,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page-container"},[a("analysis-picker",{on:{change:e.pickerChange,exportFile:e.exportDataHandle}}),e._v(" "),a("card-wrapper",{attrs:{label:"订单趋势"}},[a("el-checkbox-group",{attrs:{min:1,max:4},on:{change:e.checkedTypeChange},model:{value:e.checkedType,callback:function(t){e.checkedType=t},expression:"checkedType"}},e._l(e.typeOptions,function(t){return a("el-checkbox",{key:t.value,attrs:{label:t.value}},[e._v(e._s(t.text))])})),e._v(" "),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.orderTrendLoading,expression:"orderTrendLoading"}],ref:"orderTrend",staticClass:"echarts-item"})],1),e._v(" "),a("card-wrapper",{attrs:{label:"订单高峰分布"}},[a("template",{slot:"sub-title"},[a("i",{staticClass:"el-icon-question",on:{click:function(t){e.showTooltip(1)}}})]),e._v(" "),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.orderTimeTrendLoading,expression:"orderTimeTrendLoading"}],ref:"orderTimeTrend",staticClass:"echarts-item"})],2),e._v(" "),a("card-wrapper",{attrs:{label:"占比分析"}},[a("el-row",[a("el-col",{staticClass:"echarts-panel",attrs:{span:8}},[a("p",{staticClass:"title"},[e._v("支付方式")]),e._v(" "),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.paymentTypeLoading,expression:"paymentTypeLoading"}],ref:"paymentType",staticClass:"echarts-item"})]),e._v(" "),a("el-col",{staticClass:"echarts-panel",attrs:{span:8}},[a("p",{staticClass:"title"},[e._v("支付结果")]),e._v(" "),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.paymentStateLoading,expression:"paymentStateLoading"}],ref:"paymentState",staticClass:"echarts-item"})]),e._v(" "),a("el-col",{staticClass:"echarts-panel",attrs:{span:8}},[a("p",{staticClass:"title"},[e._v("订单转化率 "),a("i",{staticClass:"el-icon-question",on:{click:function(t){e.showTooltip(2)}}})]),e._v(" "),a("div",{staticClass:"translate-charts"},[a("div",{staticClass:"charts-panel"},[a("div",{staticClass:"col-1"},[a("p",[a("span",[e._v(e._s("("+(e.conversionData.totalCount||0)+")笔提交订单"))])])]),e._v(" "),a("div",{staticClass:"col-2"},[a("p",[a("span",[e._v(e._s("("+(e.conversionData.payCount||0)+")笔支付成功"))]),e._v(" "),a("span",[e._v("转化率为"+e._s(e._f("percentFilter")(e.conversionData.linkPay))+"%")])])]),e._v(" "),a("div",{staticClass:"col-3"},[a("p",[a("span",[e._v(e._s("("+(e.conversionData.compCount||0)+")笔交易成功"))]),e._v(" "),a("span",[e._v("转化率为"+e._s(e._f("percentFilter")(e.conversionData.linkComp))+"%")])])])]),e._v(" "),a("div",{staticClass:"legend-panel"},[a("p",{staticClass:"order-prepare"},[e._v("提交订单")]),e._v(" "),a("p",{staticClass:"order-pay"},[e._v("支付成功")]),e._v(" "),a("p",{staticClass:"order-successful"},[e._v("交易成功")])])])])],1)],1),e._v(" "),a("card-wrapper",{attrs:{label:"订单报表"}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.orderTableLoading,expression:"orderTableLoading"}],staticClass:"rank-table",staticStyle:{width:"100%"},attrs:{data:e.orderTableData,"header-cell-style":{backgroundColor:"#F8F8F8"},height:"280",border:""}},[a("el-table-column",{attrs:{align:"center",prop:"statisticsDate",label:"日期"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"成交订单量(笔)"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(t.row.payCount||0)+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"成交金额(元)"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(e._f("moneyFilter")(t.row.payAmount))+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"成交人数"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(t.row.payUser||0)+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"240",align:"center"},scopedSlots:e._u([{key:"header",fn:function(t){return[a("span",[e._v("单笔平均支付金额(元) "),a("i",{staticClass:"el-icon-question",on:{click:function(t){e.showTooltip(3)}}})])]}},{key:"default",fn:function(t){return[e._v("\n          "+e._s(e._f("moneyFilter")(t.row.unitPrice))+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center"},scopedSlots:e._u([{key:"header",fn:function(t){return[a("span",[e._v("客单价 "),a("i",{staticClass:"el-icon-question",on:{click:function(t){e.showTooltip(4)}}})])]}},{key:"default",fn:function(t){return[e._v("\n          "+e._s(t.row.unitPrice||0)+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"退款订单量(笔)"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(t.row.refundCount||0)+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"退款金额(元)"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(e._f("moneyFilter")(t.row.refundAmount))+"\n        ")]}}])})],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.paginationInfo.pageIndex,"page-sizes":[10,20,50,100],"page-size":e.paginationInfo.pageSize,total:e.paginationInfo.total,layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("explain-modal",{attrs:{visible:e.tooltipsInfo.tooltipsVisible,title:e.tooltipsInfo.title,content:e.tooltipsInfo.content,"self-define-class":e.tooltipsInfo.selfDefineClass,"confirm-fn":e.closeTooltip}})],1)},[],!1,null,"3f94cc4c",null);b.options.__file="index.vue";t.default=b.exports},hddk:function(e,t,a){"use strict";a.r(t);var n=void 0,i={name:"ExplainModal",props:{visible:{type:Boolean,default:!0},title:{type:String,default:function(){return"说明"}},content:{type:String,default:function(){return"“在架商品种数” 指统计时间段内，关联了设备的商品种类数量。"}},confirmBtn:{type:String,default:function(){return"我知道了"}},confirmFn:{type:Function,default:function(){n.visible=!1}},selfDefineClass:{type:String,default:""}}},o=(a("03DC"),a("KHd+")),s=Object(o.a)(i,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{class:"explainModal "+e.selfDefineClass,attrs:{title:e.title,visible:e.visible,width:"350px",center:""},on:{close:e.confirmFn}},[a("div",{staticClass:"dialog-content",domProps:{innerHTML:e._s(e.content)}}),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("span",{on:{click:e.confirmFn}},[e._v(e._s(e.confirmBtn))])])])},[],!1,null,null,null);s.options.__file="index.vue";t.default=s.exports}}]);