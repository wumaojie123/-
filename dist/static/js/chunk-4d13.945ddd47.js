(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-4d13","chunk-2529","chunk-9691","chunk-4b91","chunk-16f5"],{"+VCB":function(t,e,n){},"03DC":function(t,e,n){"use strict";var a=n("mrLi");n.n(a).a},"8t42":function(t,e,n){"use strict";n.r(e);var a={name:"CardWrapper",props:{label:{type:String,default:""}}},i=(n("X7TH"),n("ZrdR")),o=Object(i.a)(a,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-wrapper"},[e("h3",[this._v("\n    "+this._s(this.label)+"\n    "),this._t("sub-title")],2),this._v(" "),e("div",{staticClass:"content-wrapper"},[this._t("default")],2)])},[],!1,null,"282b517f",null);o.options.__file="index.vue";e.default=o.exports},"Efp+":function(t,e,n){"use strict";n.r(e);var a=n("bS4n"),i=n.n(a),o=n("7Qib"),s=n("s6oT"),l=n("8t5x"),r={name:"AnalysisPicker",props:{layout:{type:String,default:"date, merchant, equipmentType, area, export"}},data:function(){return{cascaderProps:{value:"value",label:"text"},agentId:-1,agent:!0,selectDates:[],district:-1,districtLevel:1,areaInfo:[-1],lyyEquipmentTypeId:-1,equipmentTypeOptions:[],layoutInfo:{isShowDate:!1,isShowMerchant:!1,isShowArea:!1,isShowEquipmentType:!1,isShowExport:!1},curQuicklySelect:-30,quicklySelectOptions:[{value:-1,label:"昨天"},{value:-7,label:"最近7天"},{value:-30,label:"最近30天"}],pickerOptions:{disabledDate:function(t){var e=new Date((new Date).toDateString());return Object(o.e)(t)>Object(o.e)(e)-86400}}}},computed:i()({},Object(l.b)(["areaList","agentMerchantList"])),created:function(){this.initLayout(),this.initSelectorData()},mounted:function(){this.emitPickerChange()},methods:{initLayout:function(){var t=this.layout.split(",");(t=t.map(function(t){return t.replace(/(^\s*)|(\s*$)/g,"")})).indexOf("date")>-1&&(this.toggleQuicklySelect(-30),this.layoutInfo.isShowDate=!0),t.indexOf("merchant")>-1&&(this.layoutInfo.isShowMerchant=!0),t.indexOf("equipmentType")>-1&&(this.layoutInfo.isShowEquipmentType=!0),t.indexOf("area")>-1&&(this.layoutInfo.isShowArea=!0),t.indexOf("export")>-1&&(this.layoutInfo.isShowExport=!0)},initSelectorData:function(){if(this.layoutInfo.isShowEquipmentType){this.getEquipmentType({agentUser:-1,agent:!0})}this.layoutInfo.isShowArea&&this.$store.dispatch("GetAreaList"),this.layoutInfo.isShowMerchant&&this.$store.dispatch("GetAgentAndMerchant")},getEquipmentType:function(t){var e=this;Object(s.m)(t).then(function(t){0===t.result&&(e.equipmentTypeOptions=[{lyyEquipmentTypeId:-1,equipmentTypeName:"全部"}],e.equipmentTypeOptions=e.equipmentTypeOptions.concat(t.data),e.lyyEquipmentTypeId=-1)})},toggleQuicklySelect:function(t){var e=new Date((new Date).toDateString()),n=new Date;e.setTime(e.getTime()-864e5),n.setTime(e.getTime()+864e5*(t+1)),this.curQuicklySelect=t,this.selectDates=[Object(o.h)(n,"{y}-{m}-{d}"),Object(o.h)(e,"{y}-{m}-{d}")]},merchantChange:function(t){var e=this;this.agentMerchantList.forEach(function(n){t===n.id&&(e.agent=!!n.agent)});var n={agentUser:t,agent:this.agent};this.getEquipmentType(n)},districtChange:function(t){this.district=t[t.length-1],this.districtLevel=t.length},emitPickerChange:function(){var t=this.getParamsData();this.$emit("change",t)},getParamsData:function(){var t={};return this.layoutInfo.isShowDate&&(t.startDate=this.selectDates[0],t.endDate=this.selectDates[1]),this.layoutInfo.isShowMerchant&&(t.agent=this.agent,t.agentId=this.agentId),this.layoutInfo.isShowEquipmentType&&(t.lyyEquipmentTypeId=this.lyyEquipmentTypeId),this.layoutInfo.isShowArea&&(t.district=this.district,t.districtLevel=this.districtLevel),t},exportDataHandle:function(){var t=this.getParamsData();this.$emit("exportFile",t)}}},c=(n("QTtk"),n("ZrdR")),u=Object(c.a)(r,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"analysis-picker"},[t.layoutInfo.isShowDate?n("div",{staticClass:"picker-panel"},[t._v("\n    时间：\n    "),n("ul",{staticClass:"quickly-select-list"},t._l(t.quicklySelectOptions,function(e){return n("li",{key:e.value,class:{cur:e.value===t.curQuicklySelect},on:{click:function(n){t.toggleQuicklySelect(e.value)}}},[t._v("\n        "+t._s(e.label)+"\n      ")])})),t._v(" "),n("el-date-picker",{staticClass:"picker-date-item",attrs:{"picker-options":t.pickerOptions,clearable:!1,type:"daterange",align:"center","value-format":"yyyy-MM-dd","unlink-panels":"","range-separator":"至","prefix-icon":"el-icon-time","start-placeholder":"开始时间","end-placeholder":"结束时间"},model:{value:t.selectDates,callback:function(e){t.selectDates=e},expression:"selectDates"}})],1):t._e(),t._v(" "),t.layoutInfo.isShowMerchant?n("div",{staticClass:"picker-panel"},[t._v("\n    代理/商家：\n    "),n("el-select",{attrs:{filterable:"",placeholder:"请选择"},on:{change:t.merchantChange},model:{value:t.agentId,callback:function(e){t.agentId=e},expression:"agentId"}},[n("el-option",{key:"-1",attrs:{value:-1,label:"全部"}}),t._v(" "),t._l(t.agentMerchantList,function(t){return n("el-option",{key:t.id,attrs:{label:(t.name||"")+"("+(t.agent?"代理账号":"商家账号")+(t.phone||"")+")",value:t.id}})})],2)],1):t._e(),t._v(" "),t.layoutInfo.isShowArea?n("div",{staticClass:"picker-panel"},[t._v("\n    区域：\n    "),n("el-cascader",{attrs:{options:t.areaList,"change-on-select":!0,"show-all-levels":!1,props:t.cascaderProps,placeholder:"全部",filterable:""},on:{change:t.districtChange},model:{value:t.areaInfo,callback:function(e){t.areaInfo=e},expression:"areaInfo"}})],1):t._e(),t._v(" "),t.layoutInfo.isShowEquipmentType?n("div",{staticClass:"picker-panel"},[t._v("\n    设备类型：\n    "),n("el-select",{attrs:{placeholder:"请选择"},model:{value:t.lyyEquipmentTypeId,callback:function(e){t.lyyEquipmentTypeId=e},expression:"lyyEquipmentTypeId"}},t._l(t.equipmentTypeOptions,function(t){return n("el-option",{key:t.lyyEquipmentTypeId,attrs:{label:t.equipmentTypeName,value:t.lyyEquipmentTypeId}})}))],1):t._e(),t._v(" "),n("div",{staticClass:"picker-panel"},[n("el-button",{attrs:{type:"primary"},on:{click:t.emitPickerChange}},[t._v("搜索")])],1),t._v(" "),t.layoutInfo.isShowExport?n("div",{staticClass:"picker-panel"},[n("el-button",{attrs:{type:"text"},on:{click:t.exportDataHandle}},[n("i",{staticClass:"el-icon-download"}),t._v("\n      导出数据\n    ")])],1):t._e(),t._v(" "),t._t("default")],2)},[],!1,null,"4a14fe1a",null);u.options.__file="index.vue";e.default=u.exports},"M/d4":function(t,e,n){"use strict";n.r(e);var a=n("bS4n"),i=n.n(a),o=n("88Rz"),s=n.n(o),l=(n("bGD1"),n("Efp+")),r=n("8t42"),c=n("M3to"),u=n("hddk"),p={xAxis:{type:"category",boundaryGap:!1,data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},yAxis:{type:"value",axisLabel:{textStyle:{color:"#333"},formatter:n("7Qib").b}},legend:{data:[{name:"商品出货量",icon:"rect"},{name:"成交金额(元)",icon:"rect"}],itemGap:80,bottom:0,itemHeight:15,itemWidth:15},tooltip:{trigger:"axis",textStyle:{fontSize:"11",color:"#fff"}},grid:{top:30,bottom:50,left:50,right:50},series:[{data:[820,932,901,934,1290,1330,1320],name:"商品出货量",type:"line",areaStyle:{color:"rgba(79, 168, 249, .4)"},color:"#4fa8f9"},{data:[400,1932,501,734,1790,1330,1920],name:"成交金额(元)",type:"line",areaStyle:{color:"rgba(110, 199, 30, .4)"},color:"#6ec71e"}]},d={tooltip:{trigger:"axis",axisPointer:{type:"cross",crossStyle:{color:"#999"}}},legend:{data:[{name:"成交金额(元)",icon:"rect"},{name:"出货量",icon:"rect"}],itemGap:80,bottom:0,itemHeight:15,itemWidth:15},xAxis:[{type:"category",data:["旺仔牛奶","可口可乐","雪碧","雪糕","阿根达斯","冰淇淋","三明治","蛋挞","巧克力","菊花茶","泡泡糖","喜之郎"],axisPointer:{type:"shadow"}}],yAxis:[{type:"value",name:"",min:0,max:400,interval:50,axisLabel:{formatter:"{value}"}}],series:[{name:"成交金额(元)",type:"bar",data:[20,389,70,232,256,76.7,136,162,326,200,60,30],areaStyle:{color:"rgba(79, 168, 249, .4)"},color:"#4fa8f9"},{name:"出货量",type:"bar",data:[26,59,90,264,287,307,176,122,287,18,60,23],areaStyle:{color:"rgba(110, 199, 30, .4)"},color:"#6ec71e"}]},f=n("s6oT"),h={name:"Zone",components:{AnalysisPicker:l.default,ColumnItem:c.default,ExplainModal:u.default,CardWrapper:r.default},data:function(){return{searchFormInfo:{pageIndex:1,pageSize:20,total:0,orderBy:"amount"},tooltipsVisible:!1,tooltipsInfo:{title:"说明",content:""},itemList:[{txt:"在架商品种数",tips:"“在架商品种数” 指统计时间段内，关联了设备的商品种类数量。",count:null,type:"sortCount"},{txt:"动销商品种数",tips:"“动销商品种数” 指统计时间段内，销量 > 0的商品种类数量。",count:null,type:"sortSales"},{txt:"商品出货量",tips:"“商品出货量” 指统计时间段内，出货的总数量。",count:null,type:"quantity"}],salesTrend:null,doneNumTrend:null,rankingList:[],profitTips:"利润贡献率=（单个商品零售总额-单个商品成本总额）/（全部售卖出去的商品成交总额-全部售卖出去的商品成本总额）*100%",salesTrendloading:!1,doneNumloading:!1,rankingloading:!1}},methods:{handleSizeChange:function(t){this.searchFormInfo.pageSize=t,this.getProductRanking()},handleCurrentChange:function(t){this.searchFormInfo.pageIndex=t,this.getProductRanking()},getProductTrend:function(){var t=this;this.salesTrendloading=!0,Object(f.f)(i()({},this.searchFormInfo)).then(function(e){if(0===e.result){t.salesTrendloading=!1;var n=e.data.yesterday,a=n.quantity,i=n.sortCount,o=n.sortSales;t.itemList=t.itemList.map(function(t){return"quantity"===t.type?t.count=a:"sortCount"===t.type?t.count=i:"sortSales"===t.type&&(t.count=o),t});var l=e.data.trend.map(function(t){return t.statisticsDate})||[],r=e.data.trend.map(function(t){return t.quantity})||[],c=e.data.trend.map(function(t){return t.amount})||[];p.xAxis.data=l,p.series[0].data=r,p.series[1].data=c,t.$nextTick(function(){t.salesTrend=s.a.init(t.$refs.salesTrend),t.salesTrend.setOption(p,!0)})}})},getProductDone:function(){var t=this;this.doneNumloading=!0,Object(f.d)(i()({},this.searchFormInfo)).then(function(e){if(0===e.result){t.doneNumloading=!1;var n=e.data.map(function(t){return t.lyyMaterialName})||[],a=e.data.map(function(t){return t.quantity})||[],i=e.data.map(function(t){return t.amount})||[];d.xAxis[0].data=n,d.series[0].data=i,d.series[1].data=a,t.$nextTick(function(){t.doneNumTrend=s.a.init(t.$refs.doneNumTrend),t.doneNumTrend.setOption(d,!0)})}})},getProductRanking:function(){var t=this;this.rankingloading=!0,Object(f.e)(i()({},this.searchFormInfo)).then(function(e){0===e.result&&(t.rankingloading=!1,t.rankingList=e.data.items,t.searchFormInfo.total=e.data.total)})},exportData:function(){Object(f.c)(this.searchFormInfo)},pickerChange:function(t){this.searchFormInfo=i()({},this.searchFormInfo,t),this.getProductTrend(),this.getProductDone(),this.getProductRanking()},showTooltip:function(t){this.tooltipsVisible=!0,this.tooltipsInfo={content:t}},closeTooltip:function(){this.tooltipsVisible=!1,this.tooltipsInfo={title:"说明",content:""}}}},m=(n("bb/W"),n("ZrdR")),y=Object(m.a)(h,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-container"},[n("div",{staticClass:"search-form-item"},[n("analysis-picker",{attrs:{layout:"date, merchant, equipmentType"},on:{change:t.pickerChange}},[n("el-button",{attrs:{type:"text"},on:{click:t.exportData}},[n("i",{staticClass:"el-icon-download"}),t._v("\n        导出数据\n      ")])],1)],1),t._v(" "),n("div",{staticClass:"main"},[n("card-wrapper",{attrs:{label:"整体销售趋势"}},[n("column-item",{attrs:{"item-list":t.itemList,"show-tips-icon":!0,mouseover:t.showTooltip}}),t._v(" "),n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.salesTrendloading,expression:"salesTrendloading"}],ref:"salesTrend",staticClass:"echarts-item"})],1),t._v(" "),n("card-wrapper",{attrs:{label:"各商品成交分析"}},[n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.doneNumloading,expression:"doneNumloading"}],ref:"doneNumTrend",staticClass:"echarts-item"})]),t._v(" "),n("card-wrapper",{attrs:{label:"商品销售排行榜"}},[n("el-radio-group",{staticClass:"radio-group",on:{change:t.getProductRanking},model:{value:t.searchFormInfo.orderBy,callback:function(e){t.$set(t.searchFormInfo,"orderBy",e)},expression:"searchFormInfo.orderBy"}},[n("el-radio",{attrs:{label:"amount"}},[t._v("按成交金额")]),t._v(" "),n("el-radio",{attrs:{label:"rate"}},[t._v("按利润贡献率")]),t._v(" "),n("el-radio",{attrs:{label:"quantity"}},[t._v("按出货量")]),t._v(" "),n("el-radio",{attrs:{label:"order_count"}},[t._v("按成交订单量")])],1),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.rankingloading,expression:"rankingloading"}],staticClass:"sales-range-table",attrs:{border:!0,data:t.rankingList,"header-cell-style":{backgroundColor:"#F3F3F3"},height:500,"default-sort":{prop:"devicenum",order:"descending"}}},[n("el-table-column",{attrs:{align:"center",prop:"rank",width:"50",label:"排名"}}),t._v(" "),n("el-table-column",{attrs:{prop:"lyyMaterialName",align:"center",label:"商品名称"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",prop:"quantity",label:"出货量"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",prop:"orderCount",label:"成交订单量（笔）"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",prop:"amount",label:"成交金额（元）"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",prop:"rate",label:"利润贡献率"},scopedSlots:t._u([{key:"header",fn:function(e){return[t._v("\n            利润贡献率\n            "),n("i",{staticClass:"el-icon-question",on:{click:function(e){t.showTooltip(t.profitTips)}}})]}}])})],1),t._v(" "),n("el-pagination",{attrs:{"current-page":t.searchFormInfo.pageIndex,"page-sizes":[20,50,100,200],"page-size":20,total:t.searchFormInfo.total,layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1),t._v(" "),n("explain-modal",{attrs:{visible:t.tooltipsVisible,content:t.tooltipsInfo.content,"confirm-fn":t.closeTooltip}})],1)},[],!1,null,"9e8bef4e",null);y.options.__file="index.vue";e.default=y.exports},M3to:function(t,e,n){"use strict";n.r(e);var a={name:"ColumnItem",components:{ExplainModal:n("hddk").default},props:{itemList:{type:Array,default:function(){return[]}},showTipsIcon:{type:Boolean,default:function(){return!1}}},data:function(){return{tooltipsVisible:!1,tooltipsInfo:{title:"说明",content:""}}},methods:{showTooltip:function(t){this.tooltipsVisible=!0,this.tooltipsInfo={content:t}},closeTooltip:function(){this.tooltipsVisible=!1,this.tooltipsInfo={title:"说明",content:""}}}},i=(n("xzx1"),n("ZrdR")),o=Object(i.a)(a,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"parent"},[n("div",{staticClass:"column-item"},[t._l(t.itemList,function(e,a){return[n("div",{key:a,staticClass:"item"},[n("p",{staticClass:"txt"},[t._v("\n          "+t._s(e.txt)+"\n          "),t.showTipsIcon?n("span",{staticClass:"el-icon-question",on:{click:function(n){t.showTooltip(e.tips)}}}):t._e()]),t._v(" "),n("p",{staticClass:"num"},[t._v(t._s(e.count))])])]}),t._v(" "),n("explain-modal",{attrs:{visible:t.tooltipsVisible,content:t.tooltipsInfo.content,"confirm-fn":t.closeTooltip}})],2)])},[],!1,null,"71425ea0",null);o.options.__file="index.vue";e.default=o.exports},"NN/J":function(t,e,n){},"OPk/":function(t,e,n){},QTtk:function(t,e,n){"use strict";var a=n("+VCB");n.n(a).a},X7TH:function(t,e,n){"use strict";var a=n("NN/J");n.n(a).a},"bb/W":function(t,e,n){"use strict";var a=n("OPk/");n.n(a).a},hddk:function(t,e,n){"use strict";n.r(e);var a=void 0,i={name:"ExplainModal",props:{visible:{type:Boolean,default:!0},title:{type:String,default:function(){return"说明"}},content:{type:String,default:function(){return"“在架商品种数” 指统计时间段内，关联了设备的商品种类数量。"}},confirmBtn:{type:String,default:function(){return"我知道了"}},confirmFn:{type:Function,default:function(){a.visible=!1}},selfDefineClass:{type:String,default:""}}},o=(n("03DC"),n("ZrdR")),s=Object(o.a)(i,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-dialog",{class:"explainModal "+t.selfDefineClass,attrs:{title:t.title,visible:t.visible,width:"350px",center:""},on:{close:t.confirmFn}},[n("div",{staticClass:"dialog-content",domProps:{innerHTML:t._s(t.content)}}),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("span",{on:{click:t.confirmFn}},[t._v(t._s(t.confirmBtn))])])])},[],!1,null,null,null);s.options.__file="index.vue";e.default=s.exports},mrLi:function(t,e,n){},sxNW:function(t,e,n){},xzx1:function(t,e,n){"use strict";var a=n("sxNW");n.n(a).a}}]);