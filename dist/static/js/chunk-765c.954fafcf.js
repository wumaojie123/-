(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-765c"],{"70GS":function(e,t,a){"use strict";var i=a("LtzX");a.n(i).a},LtzX:function(e,t,a){},azuH:function(e,t,a){"use strict";a.r(t);var i=a("omC7"),n=a.n(i),l=a("RYct"),s=a("7Qib"),o=a("t3Un");var r={name:"DeviceOffline",props:{selRow:{type:Object,default:null},saveVisExport:{type:Function,default:function(){}}},data:function(){return{date_btn:"2",date_sel:"",equipment_id:"",listQuery:{total:99,pageSize:10,pageIndex:1},tableData:null,loading_table:!1,pickerOptions:{disabledDate:function(e){var t=e.getTime(),a=Date.now();return t>a||t<a-15552e6}},equipment_detail:null,page_data:{},nowOption:null}},computed:{visExportBtn:function(){return this.tableData.length>0}},watch:{tableData:function(e){this.selRow&&this.saveVisExport(e&&e.length>0)}},created:function(){this.selRow&&this.getList(!0)},methods:{parseTimeMap:function(e){return Object(s.i)(e)},postExport:function(){var e="value="+this.nowOption.value+"&startDate="+this.nowOption.startDate+"&endDate="+this.nowOption.endDate;location.href=encodeURI("/agent/equipment/error/export?"+e)},handleSizeChange:function(e){this.listQuery.pageSize=e,this.getList()},getEquipmentState:function(e){var t,a=this;e&&(this.loading_table=!0),(t={value:this.nowOption.value},Object(o.a)({url:"/equipment/error/queryEquipmentType",method:"get",params:t})).then(function(e){0===e.result&&(a.equipment_detail={equipmentTypeName:e.data.typeName,equipmentId:e.data.value,online:e.data.online,days:e.data.days})}).finally(function(){e&&(a.loading_table=!1)})},getList:function(e){var t=this,a=this.date_sel,i=this.date_btn,r=this.parseDateBtn,d=this.listQuery,u=this.selRow,p=this.page_data,c=this.equipment_id;u?c=u.equipmentId:this.equipment_detail=null;var m=[];if(e){if(this.listQuery.pageIndex=1,""!==a&&(m[0]=Object(s.i)(a[0],"{y}-{m}-{d}"),m[1]=Object(s.i)(a[1],"{y}-{m}-{d}"),new Date(a[1]).getTime()>Date.now()))return void Object(l.Message)({message:"结束日期不能大于今天",type:"error"});""!==i&&(m=r())}else m=p.date,c=p.equipment_id;if(""===c)return Object(l.Message)({message:"请填写设备编号",type:"error"}),void(this.tableData=null);var v,_={value:c,startDate:m[0],endDate:m[1],pageSize:d.pageSize,pageIndex:d.pageIndex};this.loading_table=!0,this.page_data={equipment_id:c,date:m},this.tableData=[],this.nowOption=JSON.parse(n()({value:c,startDate:m[0],endDate:m[1],pageSize:d.pageSize,pageIndex:d.pageIndex})),(v=_,Object(o.a)({url:"/equipment/error/getEquipmentErrorLog",method:"get",params:v})).then(function(e){0===e.result&&e.data&&(e.data.date&&(t.tableData=e.data.date,t.getEquipmentState()),t.listQuery={total:e.data.total,pageSize:e.data.pageSize,pageIndex:e.data.page})}).finally(function(){t.loading_table=!1})},parseDateBtn:function(e){var t=this.date_btn,a=void 0;return"0"===t?a=[Object(s.i)(Date.now()-864e5,"{y}-{m}-{d}"),Object(s.i)(Date.now()-864e5,"{y}-{m}-{d}")]:"1"===t?a=[Object(s.i)(Date.now()-5184e5,"{y}-{m}-{d}"),Object(s.i)(Date.now(),"{y}-{m}-{d}")]:"2"===t&&(a=[Object(s.i)(Date.now()-25056e5,"{y}-{m}-{d}"),Object(s.i)(Date.now(),"{y}-{m}-{d}")]),a},handleCurrentChange:function(e){this.listQuery.pageIndex=e,this.getList()},radioChange:function(e){this.date_sel="",this.selRow&&this.getList(!0)},dateChange:function(e){this.date_btn="",this.selRow&&this.getList(!0)},objectSpanMethod:function(e){e.row,e.column,e.rowIndex,e.columnIndex}}},d=(a("70GS"),a("ZrdR")),u=Object(d.a)(r,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-main",{directives:[{name:"loading",rawName:"v-loading",value:e.loading_table,expression:"loading_table"}],staticClass:"agent-list-container",style:e.selRow?"":"min-width:1100px"},[a("div",{staticClass:"top-box"},[e.selRow?e._e():a("div",{staticClass:"sel-box"},[a("div",[e._v("设备编号：")]),e._v(" "),a("div",{staticClass:"el-input-number el-input-number--medium is-without-controls",staticStyle:{width:"200px"}},[a("div",{staticClass:"el-input el-input--medium"},[a("el-input",{attrs:{placeholder:"设备编号"},model:{value:e.equipment_id,callback:function(t){e.equipment_id="string"==typeof t?t.trim():t},expression:"equipment_id"}})],1)])]),e._v(" "),a("div",{staticClass:"sel-box"},[a("div",[e._v("时间：")]),e._v(" "),a("el-radio-group",{attrs:{size:"mini"},on:{change:e.radioChange},model:{value:e.date_btn,callback:function(t){e.date_btn=t},expression:"date_btn"}},[a("el-radio-button",{attrs:{label:"0"}},[e._v("昨日")]),e._v(" "),a("el-radio-button",{attrs:{label:"1"}},[e._v("最近7天")]),e._v(" "),a("el-radio-button",{attrs:{label:"2"}},[e._v("最近30天")])],1)],1),e._v(" "),a("div",{staticClass:"sel-box"},[a("el-date-picker",{attrs:{clearable:!1,"picker-options":e.pickerOptions,type:"daterange","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:e.dateChange},model:{value:e.date_sel,callback:function(t){e.date_sel=t},expression:"date_sel"}})],1),e._v(" "),e.selRow?e._e():a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.getList(!0)}}},[e._v("查询")])],1),e._v(" "),!e.selRow&&(e.tableData&&0==e.tableData.length||null==e.tableData)||!e.equipment_detail?e._e():a("div",{staticClass:"mid-box"},[a("div",[e._v("设备编号："+e._s(e.equipment_detail.equipmentTypeName)+" "+e._s(e.equipment_detail.equipmentId))]),e._v(" "),e.tableData&&e.tableData.length>0?a("div",[e._v("\n      当前设备状态：\n      "),e.equipment_detail.online?e._e():a("div",{staticClass:"mid-offline"},[e._v("离线"+e._s(e.equipment_detail.days?" > "+e.equipment_detail.days+"天":""))]),e._v(" "),e.equipment_detail.online?a("div",{staticClass:"mid-online"},[e._v("在线")]):e._e(),e._v(" "),a("a",{staticClass:"mid-reload",on:{click:function(t){e.getEquipmentState(!0)}}},[e._v("刷新")])]):e._e(),e._v(" "),a("div",[e.selRow?e._e():a("a",{on:{click:e.postExport}},[e._v("导出数据")])])]),e._v(" "),e.tableData&&e.tableData.length>0?a("el-table",{staticStyle:{width:"100%","margin-top":"20px"},attrs:{data:e.tableData,"span-method":e.objectSpanMethod,border:""}},[a("el-table-column",{attrs:{align:"center",prop:"date",label:"日期"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"count",label:"离线次数"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"timeMap",label:"离线时间点"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"table-timeMap"},e._l(t.row.times,function(t,i){return a("div",{key:i,staticClass:"table-timeMap-item"},[e._v("\n            "+e._s(e.parseTimeMap(t))+"\n          ")])}))]}}])})],1):e._e(),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!e.selRow&&!e.tableData,expression:"!selRow&&!tableData"}],staticClass:"table-noData"},[e._v("\n    请输入设备编号查询设备离线、在线明细\n  ")]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.tableData&&0===e.tableData.length,expression:"tableData&&tableData.length===0"}],staticClass:"table-noData"},[e._v("\n    可能设备未注册等原因，暂无在线、离线记录\n  ")]),e._v(" "),a("div",{staticClass:"pagination-container"},[a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.listQuery.total>0&&e.tableData&&e.tableData.length>0,expression:"listQuery.total>0&&tableData&&tableData.length>0"}],attrs:{"current-page":e.listQuery.pageIndex,"page-sizes":[10,20,30,50],"page-size":e.listQuery.pageSize,total:e.listQuery.total,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},[],!1,null,"3f2c86ea",null);u.options.__file="DeviceOffline.vue";t.default=u.exports}}]);