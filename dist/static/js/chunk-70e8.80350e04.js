(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-70e8"],{"3K+r":function(e,t,a){"use strict";var i=a("GG63");a.n(i).a},"Efp+":function(e,t,a){"use strict";a.r(t);var i=a("QbLZ"),n=a.n(i),s=a("7Qib"),l=a("s6oT"),o=a("L2JU"),c={name:"AnalysisPicker",props:{layout:{type:String,default:"date, merchant, equipmentType, area, export"}},data:function(){return{cascaderProps:{value:"value",label:"text"},agentId:-1,agent:!0,selectDates:[],district:-1,districtLevel:1,areaInfo:[-1],lyyEquipmentTypeId:-1,equipmentTypeOptions:[],layoutInfo:{isShowDate:!1,isShowMerchant:!1,isShowArea:!1,isShowEquipmentType:!1,isShowExport:!1},curQuicklySelect:-30,quicklySelectOptions:[{value:-1,label:"昨天"},{value:-7,label:"最近7天"},{value:-30,label:"最近30天"}],pickerOptions:{disabledDate:function(e){var t=new Date((new Date).toDateString());return Object(s.e)(e)>Object(s.e)(t)-86400}}}},computed:n()({},Object(o.b)(["areaList","agentMerchantList"])),created:function(){this.initLayout(),this.initSelectorData()},mounted:function(){this.emitPickerChange()},methods:{initLayout:function(){var e=this.layout.split(",");(e=e.map(function(e){return e.replace(/(^\s*)|(\s*$)/g,"")})).indexOf("date")>-1&&(this.toggleQuicklySelect(-30),this.layoutInfo.isShowDate=!0),e.indexOf("merchant")>-1&&(this.layoutInfo.isShowMerchant=!0),e.indexOf("equipmentType")>-1&&(this.layoutInfo.isShowEquipmentType=!0),e.indexOf("area")>-1&&(this.layoutInfo.isShowArea=!0),e.indexOf("export")>-1&&(this.layoutInfo.isShowExport=!0)},initSelectorData:function(){if(this.layoutInfo.isShowEquipmentType){this.getEquipmentType({agentUser:-1,agent:!0})}this.layoutInfo.isShowArea&&this.$store.dispatch("GetAreaList"),this.layoutInfo.isShowMerchant&&this.$store.dispatch("GetAgentAndMerchant")},getEquipmentType:function(e){var t=this;Object(l.m)(e).then(function(e){0===e.result&&(t.equipmentTypeOptions=[{lyyEquipmentTypeId:-1,equipmentTypeName:"全部"}],t.equipmentTypeOptions=t.equipmentTypeOptions.concat(e.data),t.lyyEquipmentTypeId=-1)})},toggleQuicklySelect:function(e){var t=new Date((new Date).toDateString()),a=new Date;t.setTime(t.getTime()-864e5),a.setTime(t.getTime()+864e5*(e+1)),this.curQuicklySelect=e,this.selectDates=[Object(s.h)(a,"{y}-{m}-{d}"),Object(s.h)(t,"{y}-{m}-{d}")]},merchantChange:function(e){var t=this;this.agentMerchantList.forEach(function(a){e===a.id&&(t.agent=!!a.agent)});var a={agentUser:e,agent:this.agent};this.getEquipmentType(a)},districtChange:function(e){this.district=e[e.length-1],this.districtLevel=e.length},emitPickerChange:function(){var e=this.getParamsData();this.$emit("change",e)},getParamsData:function(){var e={};return this.layoutInfo.isShowDate&&(e.startDate=this.selectDates[0],e.endDate=this.selectDates[1]),this.layoutInfo.isShowMerchant&&(e.agent=this.agent,e.agentId=this.agentId),this.layoutInfo.isShowEquipmentType&&(e.lyyEquipmentTypeId=this.lyyEquipmentTypeId),this.layoutInfo.isShowArea&&(e.district=this.district,e.districtLevel=this.districtLevel),e},exportDataHandle:function(){var e=this.getParamsData();this.$emit("exportFile",e)}}},r=(a("3K+r"),a("KHd+")),p=Object(r.a)(c,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"analysis-picker"},[e.layoutInfo.isShowDate?a("div",{staticClass:"picker-panel"},[e._v("\n    时间：\n    "),a("ul",{staticClass:"quickly-select-list"},e._l(e.quicklySelectOptions,function(t){return a("li",{key:t.value,class:{cur:t.value===e.curQuicklySelect},on:{click:function(a){e.toggleQuicklySelect(t.value)}}},[e._v("\n        "+e._s(t.label)+"\n      ")])})),e._v(" "),a("el-date-picker",{staticClass:"picker-date-item",attrs:{"picker-options":e.pickerOptions,clearable:!1,type:"daterange",align:"center","value-format":"yyyy-MM-dd","unlink-panels":"","range-separator":"至","prefix-icon":"el-icon-time","start-placeholder":"开始时间","end-placeholder":"结束时间"},model:{value:e.selectDates,callback:function(t){e.selectDates=t},expression:"selectDates"}})],1):e._e(),e._v(" "),e.layoutInfo.isShowMerchant?a("div",{staticClass:"picker-panel"},[e._v("\n    代理/商家：\n    "),a("el-select",{attrs:{filterable:"",placeholder:"请选择"},on:{change:e.merchantChange},model:{value:e.agentId,callback:function(t){e.agentId=t},expression:"agentId"}},[a("el-option",{key:"-1",attrs:{value:-1,label:"全部"}}),e._v(" "),e._l(e.agentMerchantList,function(e){return a("el-option",{key:e.id,attrs:{label:(e.name||"")+"("+(e.agent?"代理账号":"商家账号")+(e.phone||"")+")",value:e.id}})})],2)],1):e._e(),e._v(" "),e.layoutInfo.isShowArea?a("div",{staticClass:"picker-panel"},[e._v("\n    区域：\n    "),a("el-cascader",{attrs:{options:e.areaList,"change-on-select":!0,"show-all-levels":!1,props:e.cascaderProps,placeholder:"全部",filterable:""},on:{change:e.districtChange},model:{value:e.areaInfo,callback:function(t){e.areaInfo=t},expression:"areaInfo"}})],1):e._e(),e._v(" "),e.layoutInfo.isShowEquipmentType?a("div",{staticClass:"picker-panel"},[e._v("\n    设备类型：\n    "),a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.lyyEquipmentTypeId,callback:function(t){e.lyyEquipmentTypeId=t},expression:"lyyEquipmentTypeId"}},e._l(e.equipmentTypeOptions,function(e){return a("el-option",{key:e.lyyEquipmentTypeId,attrs:{label:e.equipmentTypeName,value:e.lyyEquipmentTypeId}})}))],1):e._e(),e._v(" "),a("div",{staticClass:"picker-panel"},[a("el-button",{attrs:{type:"primary"},on:{click:e.emitPickerChange}},[e._v("搜索")])],1),e._v(" "),e.layoutInfo.isShowExport?a("div",{staticClass:"picker-panel"},[a("el-button",{attrs:{type:"text"},on:{click:e.exportDataHandle}},[a("i",{staticClass:"el-icon-download"}),e._v("\n      导出数据\n    ")])],1):e._e(),e._v(" "),e._t("default")],2)},[],!1,null,"bfbac330",null);p.options.__file="index.vue";t.default=p.exports},GG63:function(e,t,a){}}]);