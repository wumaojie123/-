(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-db68"],{Nk7L:function(e,t,a){"use strict";var n=a("NouL");a.n(n).a},NouL:function(e,t,a){},ObM6:function(e,t,a){"use strict";a.r(t);var n=a("cLjf"),r=a.n(n),s=a("hDQ3"),i=a.n(s),l=a("ACzA"),o=a("jzU3"),c=a("Rl7X"),u={name:"OutsideDevicesImport",data:function(){return{fileList:[],file:null,agentnick:"",infoChecked:!1,throttle:!1,form:{equipmentTypes:"",agent:""},equipmentTypesArr:[],agentUsers:[],message:"请导入含外部编号、私钥的txt文档（注意：TXT格式，按【外部编号，私钥】格式），目前可导入金吉外部设备编号",colums:[{key:"failIndex",label:"序号"},{key:"value",label:"设备编号"},{key:"failNote",label:"导入失败原因"}],failList:[],dialogVisible:!1,failtTest:"",formSearch:{importStatus:[{label:"全部",value:-1},{label:"全部成功",value:0},{label:"部分成功",value:1},{label:"已撤回",value:2},{label:"导入失败",value:3}],agentAccount:"",selectedStatus:-1,agentList:[],selectedAgentUid:"",selectedAgentName:"",searchInfoChecked:!1},importDataList:[],total:0,pageIndex:1,pageSize:10,listLoading:!1,importDetailList:[],showImportDetailFlag:!1,detailPageIndex:1,detailPageSize:10,detailTotal:0,currentImportLogId:"",selectDevicesObjList:[],selectDevices:[],lyyEquipmentValues:[]}},computed:{disabled:function(){return!this.form.agent||!this.form.equipmentTypes},uploadPar:function(){return{agentUserId:this.form.agent,equipmentType:this.form.equipmentTypes}}},created:function(){this.getDevicesList()},mounted:function(){this.queryImportDeviceList()},methods:{handleUploadTxt:function(){this.form.equipmentTypes?this.form.agent?this.throttle=!1:this.$message.error("请选择代理商！"):this.$message.error("请选择设备类型！")},getDevicesList:function(){var e=this;Object(l.a)().then(function(t){t&&0===t.result&&t.data&&t.data.length&&t.data.forEach(function(t){"售货机"===t.name&&(e.equipmentTypesArr.push({value:t.lyyEquipmentTypeId,label:t.name}),e.form.equipmentTypes=e.equipmentTypesArr[0].value)})})},queryImportDeviceList:function(){var e=this;return i()(r.a.mark(function t(){var a,n;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.listLoading=!0,a={status:e.formSearch.selectedStatus,agentUserId:e.formSearch.selectedAgentUid,pageIndex:e.pageIndex,pageSize:e.pageSize},t.next=4,Object(c.d)(a);case 4:(n=t.sent)&&0===n.result&&(e.listLoading=!1,e.total=n.data.total,e.importDataList=[],n.data.items.forEach(function(t){e.importDataList.push({agentEquipmentImportLogId:t.agentEquipmentThirdImportLogId,lyyEquipmentTypeName:t.lyyEquipmentType,totalCount:t.totalCount,agentName:t.agentUserName,created:t.created,statusName:e.getStatusName(t.status),status:t.status})}),e.pageIndex=n.data.page);case 6:case"end":return t.stop()}},t,e)}))()},queryImportDetailList:function(){var e=this;return i()(r.a.mark(function t(){var a,n;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a={agentEquipmentImportLogId:e.currentImportLogId,pageIndex:e.detailPageIndex,pageSize:e.detailPageSize},t.next=3,Object(c.g)(a);case 3:(n=t.sent)&&0===n.result&&(e.detailTotal=n.data.total,e.importDetailList=[],n.data.items.forEach(function(t){e.importDetailList.push({agentEquipmentThirdImportDetailId:t.agentEquipmentThirdImportDetailId,agentEquipmentThirdImportLogId:t.agentEquipmentThirdImportLogId,lyyEquipmentValue:t.lyyEquipmentValue,reason:t.reason,value:t.value,statusName:e.getImportStatusName(t.status),status:t.status})}));case 5:case"end":return t.stop()}},t,e)}))()},handleSelectionChange:function(e){this.selectDevices=e.map(function(e){return e.agentEquipmentThirdImportDetailId}),this.lyyEquipmentValues=e.map(function(e){return e.lyyEquipmentValue}),this.selectDevicesObjList=e},handleWithdraw:function(){0!==this.selectDevices.length?this.cancelImport():this.$message.error("请选择设备！")},cancelImport:function(){var e=this;return i()(r.a.mark(function t(){var a,n;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a={ids:e.selectDevices.join(",")},t.next=3,Object(c.i)(a);case 3:(n=t.sent)&&0===n.result&&(e.$message.success("撤回成功！"),e.queryImportDetailList(),e.queryImportDeviceList());case 5:case"end":return t.stop()}},t,e)}))()},handleReflect:function(){var e=this;return i()(r.a.mark(function t(){var a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(0!==e.selectDevices.length){t.next=3;break}return e.$message.error("请选择设备！"),t.abrupt("return");case 3:return t.next=5,Object(c.h)({ids:e.selectDevices.join(",")});case 5:(a=t.sent)&&0===a.result&&(e.$message.success("映射成功！"),e.showImportDetailFlag=!1,e.queryImportDeviceList());case 7:case"end":return t.stop()}},t,e)}))()},handleDownload:function(){var e=this;return i()(r.a.mark(function t(){var a,n,s;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(0!==e.lyyEquipmentValues.length){t.next=3;break}return e.$message.error("请选择设备！"),t.abrupt("return");case 3:if(a=!0,e.selectDevicesObjList.forEach(function(e,t){3!==e.status&&(a=!1)}),a){t.next=8;break}return e.$message.error("只有映射成功才能下载！"),t.abrupt("return");case 8:return n={lyyEquipmentValues:e.lyyEquipmentValues.join(",")},t.next=11,Object(c.f)(n);case 11:(s=t.sent)&&0===s.result&&e.$message.success("下载成功！");case 13:case"end":return t.stop()}},t,e)}))()},submitUpload:function(){this.throttle||(this.throttle=!0,this.file?this.form.agent&&!this.infoChecked?this.$refs.upload.submit():this.$message.error("请选择代理商！"):this.$message.error("请选择上传文件！"))},removeFile:function(){this.file=null},onChange:function(e){this.file=e},handleSelect:function(e){this.form.agent=e.agentId},querySearch:function(e,t){var a=this,n=/^(.+)\((.+)\)$/.exec(e);n&&(e=n[1]&&n[1].trim()),Object(o.a)({agentQuery:e}).then(function(e){if(e&&0===e.result&&e.data&&0!==e.data.length){var n=[];e.data.forEach(function(e){n.push({value:e.agentusername+" ("+e.phone+")",agentId:e.agentuserid})}),a.agentUsers=n,a.infoChecked=!1,t(n)}else a.infoChecked=!0,t([])}),this.form.agent=""},handleSuccess:function(e){0===e.result?(this.$message.success("操作成功："+e.description),this.queryImportDeviceList()):(e.result,this.$message.error(e.description))},handleExceed:function(){this.$message.warning("当前限制选择 1 个文件，一次只能上传一个文件")},handleError:function(){this.throttle=!1,this.$message.error("导入失败！")},handleClose:function(e){this.queryImportDeviceList(),e()},searchImportData:function(){this.queryImportDeviceList()},queryAgentList:function(e,t){var a=this;""===e&&(this.formSearch.selectedAgentUid="");var n=/^(.+)\((.+)\)$/.exec(e);n&&(e=n[1]&&n[1].trim()),Object(o.a)({agentQuery:e}).then(function(e){if(e&&0===e.result&&e.data&&0!==e.data.length){var n=[];e.data.forEach(function(e){n.push({value:e.agentusername+" ( "+e.phone+" )",agentId:e.agentuserid})}),a.formSearch.agentList=n,a.formSearch.searchInfoChecked=!1,t(a.formSearch.agentList)}else a.formSearch.searchInfoChecked=!0,t([])})},selectedValue:function(e){this.formSearch.selectedAgentUid=e.agentId},showImportDetail:function(e){var t=e.agentEquipmentImportLogId;this.currentImportLogId=t,this.showImportDetailFlag=!0,this.queryImportDetailList()},handleSizeChange:function(e){this.pageSize=e,this.queryImportDeviceList()},handleCurrentChange:function(e){this.pageIndex=e,this.queryImportDeviceList()},handleDetailSizeChange:function(e){this.detailPageSize=e,this.queryImportDetailList()},handleDetailCurrentChange:function(e){this.detailPageIndex=e,this.queryImportDetailList()},getStatusName:function(e){var t="";switch(e){case 0:t="全部成功";break;case 1:t="部分成功";break;case 2:t="已撤回";break;case 3:t="导入失败"}return t},getImportStatusName:function(e){var t="";switch(e){case 0:t="成功";break;case 1:t="已撤回";break;case 2:t="失败";break;case 3:t="已映射"}return t}}},p=(a("Nk7L"),a("ZrdR")),m=Object(p.a)(u,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-main",[a("el-alert",{staticClass:"info",attrs:{title:e.message,closable:!1,type:"warning"}}),e._v(" "),a("a",{staticClass:"download-btn",attrs:{href:"../../../static/file/sample.txt",download:"sample.txt"}},[e._v("\n    模板下载\n  ")]),e._v(" "),a("el-form",{ref:"form",staticClass:"deviceForm",staticStyle:{padding:"16px 0",width:"400px"},attrs:{model:e.form,"label-width":"90px"}},[a("el-row",[a("el-col",[a("el-form-item",{attrs:{label:"设备类型",prop:"equipmentTypes"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.equipmentTypes,callback:function(t){e.$set(e.form,"equipmentTypes",t)},expression:"form.equipmentTypes"}},e._l(e.equipmentTypesArr,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1)],1),e._v(" "),a("el-row",[a("el-col",[a("el-form-item",{attrs:{label:"代理商",prop:"agent"}},[a("el-autocomplete",{staticClass:"width200",attrs:{"fetch-suggestions":e.querySearch,"popper-class":"my-autocomplete",placeholder:"请输入内容"},on:{select:e.handleSelect},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.item;return[a("div",{staticClass:"name"},[e._v(e._s(n.value))])]}}]),model:{value:e.agentnick,callback:function(t){e.agentnick=t},expression:"agentnick"}}),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.infoChecked,expression:"infoChecked"}],staticStyle:{"font-size":"14px",color:"red"}},[e._v("未查询到相应的商家，请重新输入！")])],1)],1)],1),e._v(" "),a("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{"on-success":e.handleSuccess,"on-error":e.handleError,"file-list":e.fileList,"on-change":e.onChange,"on-remove":e.removeFile,"auto-upload":!1,data:e.uploadPar,disabled:e.disabled,"on-exceed":e.handleExceed,limit:1,accept:".txt",action:"/agent/outsideDeviceImport/import"}},[a("el-row",{attrs:{slot:"trigger"},slot:"trigger"},[a("el-col",[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.handleUploadTxt}},[e._v("选择txt文件")])],1),e._v(" "),a("el-col",[a("ul",{staticClass:"el-upload-list el-upload-list--text"})])],1),e._v(" "),a("div",{staticStyle:{padding:"8px"}}),e._v(" "),a("el-button",{attrs:{size:"small",type:"success"},on:{click:e.submitUpload}},[e._v("确定上传\n      ")])],1)],1),e._v(" "),a("div",{staticStyle:{width:"100%",height:"1px",border:"1px solid #ccc"}}),e._v(" "),a("el-row",[a("el-col",{staticStyle:{"margin-top":"20px","margin-bottom":"20px","font-weight":"600"},attrs:{span:24}},[e._v("导入数据")])],1),e._v(" "),a("el-row",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formSearch}},[a("el-form-item",{attrs:{label:"状态"}},[a("el-select",{attrs:{placeholder:""},model:{value:e.formSearch.selectedStatus,callback:function(t){e.$set(e.formSearch,"selectedStatus",t)},expression:"formSearch.selectedStatus"}},e._l(e.formSearch.importStatus,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"代理商"}},[a("el-autocomplete",{staticClass:"width200",attrs:{"fetch-suggestions":e.queryAgentList,"popper-class":"my-autocomplete",placeholder:"请输入内容"},on:{select:e.selectedValue},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.item;return[a("div",{staticClass:"name"},[e._v(e._s(n.value))])]}}]),model:{value:e.formSearch.selectedAgentName,callback:function(t){e.$set(e.formSearch,"selectedAgentName",t)},expression:"formSearch.selectedAgentName"}}),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.formSearch.searchInfoChecked,expression:"formSearch.searchInfoChecked"}],staticStyle:{"font-size":"14px",color:"red"}},[e._v("未查询到相应的商家，请重新输入！")])],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.searchImportData}},[e._v("查询")])],1)],1)],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.importDataList,border:""}},[a("el-table-column",{attrs:{prop:"lyyEquipmentTypeName",label:"设备类型",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"totalCount",label:"导入设备数",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"agentName",label:"一级代理商",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"created",label:"导入时间",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"statusName",label:"导入状态",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){e.showImportDetail(t.row)}}},[e._v("查看导入详情")])]}}])})],1),e._v(" "),a("div",{staticClass:"pagination-container"},[a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total > 0"}],attrs:{"current-page":e.pageIndex,"page-sizes":[10,20,30,40,50],"page-size":e.pageSize,total:e.total,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("el-dialog",{attrs:{visible:e.showImportDetailFlag,title:"导入详情"},on:{"update:visible":function(t){e.showImportDetailFlag=t}}},[a("div",{staticClass:"handle-btn-list"},[a("el-button",{attrs:{type:"primary"},on:{click:e.handleReflect}},[e._v("\n        映射设备\n      ")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.handleWithdraw}},[e._v("\n        撤回\n      ")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.handleDownload}},[e._v("\n        下载\n      ")])],1),e._v(" "),a("el-table",{attrs:{data:e.importDetailList,border:""},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"lyyEquipmentValue",label:"设备编号",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"value",label:"外部编号",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"statusName",label:"导入状态",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"reason",label:"备注",align:"center"}})],1),e._v(" "),a("div",{staticClass:"pagination-container"},[a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.detailTotal>0,expression:"detailTotal > 0"}],attrs:{"current-page":e.detailPageIndex,"page-sizes":[10,20,30,40,50],"page-size":e.detailPageSize,total:e.detailTotal,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":e.handleDetailSizeChange,"current-change":e.handleDetailCurrentChange}})],1)],1)],1)},[],!1,null,null,null);m.options.__file="outsideDeviceImport.vue";t.default=m.exports},jzU3:function(e,t,a){"use strict";a.d(t,"a",function(){return r});var n=a("t3Un");function r(e){return Object(n.a)({url:"/rest/equipment/childAgents/query",method:"get",params:e})}}}]);