(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5809"],{"1oRo":function(e,t,n){"use strict";var a=n("jfIV");n.n(a).a},"3Fcl":function(e,t,n){"use strict";n.d(t,"a",function(){return a});var a=function(){var e=null,t=null;return function(n,a){for(var i=arguments.length,l=Array(i>2?i-2:0),o=2;o<i;o++)l[o-2]=arguments[o];var s=this,r=Date.now();t&&r-t<a?(clearTimeout(e),e=setTimeout(function(){t=r,n.apply(s,l),clearTimeout(e),e=null},a)):(t=r,n.apply(s,l))}}},"3Nqk":function(e,t,n){},"9Wgr":function(e,t,n){"use strict";var a=n("3Nqk");n.n(a).a},ACzA:function(e,t,n){"use strict";n.d(t,"a",function(){return i}),n.d(t,"b",function(){return l});var a=n("t3Un");function i(){return Object(a.a)({url:"/equipment/getEquipmentTypes",method:"get"})}function l(){return Object(a.a)({url:"/rest/equipment/equipmentType/querySHL",method:"get"})}},HpJO:function(e,t,n){"use strict";function a(e){return"/agent/rest/equipment/batch/exportPayOrCode?valueStr="+e.valueStr}function i(e){return"/agent/rest/equipment/batch/exportRegisterOrCode?valueStr="+e.valueStr}n.d(t,"a",function(){return a}),n.d(t,"b",function(){return i})},LAzu:function(e,t,n){"use strict";var a=n("4d7F"),i=n.n(a),l={name:"SetEquipmentParas",props:{checkedrow:{type:Array,default:function(){return[]}}},data:function(){return{equipmentParaForm:{pulseWidth:"",pulseInterval:"",standbyStatus:0},rules:{pulseWidth:{message:"请输入10-1000范围内的整数",trigger:"blur",validator:function(e,t,n){parseInt(t)<10||parseInt(t)>1e3||parseInt(t)!==+t?n(new Error):n()}},pulseInterval:{message:"请输入10-1000范围内的整数",trigger:"blur",validator:function(e,t,n){parseInt(t)<10||parseInt(t)>1e3||parseInt(t)!==+t?n(new Error):n()}}}}},methods:{submitChecked:function(e){var t=this;return new i.a(function(n,a){t.$refs[e].validate(function(e){e?n():a()})})},cancel:function(e){this.$refs[e].resetFields(),this.$emit("cancel")},confirmPara:function(e){var t=this;this.submitChecked(e).then(function(n){t.$emit("confirom",t.equipmentParaForm),t.$refs[e].resetFields()}).catch(function(){})}}},o=(n("9Wgr"),n("KHd+")),s=Object(o.a)(l,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-form",{ref:"equipmentParaForm",attrs:{model:e.equipmentParaForm,rules:e.rules,"label-width":"92px"}},[n("el-form-item",[n("div",{staticStyle:{"text-align":"left"},attrs:{slot:"label"},slot:"label"},[e._v("已勾选设备")]),e._v(" "),n("p",[e._v(" "+e._s(e.checkedrow.length)+" 个")])]),e._v(" "),n("el-form-item",{attrs:{prop:"pulseWidth"}},[n("div",{staticStyle:{"text-align":"left"},attrs:{slot:"label"},slot:"label"},[e._v("脉冲宽度")]),e._v(" "),n("el-input",{attrs:{type:"number",placeholder:"10~1000"},model:{value:e.equipmentParaForm.pulseWidth,callback:function(t){e.$set(e.equipmentParaForm,"pulseWidth",t)},expression:"equipmentParaForm.pulseWidth"}})],1),e._v(" "),n("el-form-item",{attrs:{prop:"pulseInterval"}},[n("div",{staticStyle:{"text-align":"left"},attrs:{slot:"label"},slot:"label"},[e._v("脉冲间隔")]),e._v(" "),n("el-input",{attrs:{type:"number",placeholder:"10~1000"},model:{value:e.equipmentParaForm.pulseInterval,callback:function(t){e.$set(e.equipmentParaForm,"pulseInterval",t)},expression:"equipmentParaForm.pulseInterval"}})],1),e._v(" "),n("el-form-item",{attrs:{prop:"standbyStatus"}},[n("div",{staticStyle:{"text-align":"left"},attrs:{slot:"label"},slot:"label"},[e._v("待机电平")]),e._v(" "),n("el-radio-group",{model:{value:e.equipmentParaForm.standbyStatus,callback:function(t){e.$set(e.equipmentParaForm,"standbyStatus",t)},expression:"equipmentParaForm.standbyStatus"}},[n("el-radio",{attrs:{label:0}},[e._v("常开")]),e._v(" "),n("el-radio",{attrs:{label:1}},[e._v("常闭")])],1)],1),e._v(" "),n("p",{staticStyle:{color:"#999999","font-size":"13px"}},[e._v("温馨提示：此处的参数设置，仅对 “脉冲版” 生效，对“串口版”无效。")]),e._v(" "),n("div",{staticStyle:{"padding-top":"22px","text-align":"right"}},[n("el-button",{on:{click:function(t){e.cancel("equipmentParaForm")}}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(t){e.confirmPara("equipmentParaForm")}}},[e._v("确 定")])],1)],1)},[],!1,null,"ab458e4c",null);s.options.__file="index.vue";t.a=s.exports},T67A:function(e,t,n){"use strict";n.r(t);var a=n("QbLZ"),i=n.n(a),l=n("pK9s"),o=n("ACzA"),s=n("LAzu"),r=n("HpJO"),c=n("3Fcl"),u=n("ZySA"),p=n("0FX9"),m=n.n(p),d=[{key:0,display_name:"冻结"},{key:1,display_name:"激活"}],f={name:"DeviceList",directives:{waves:u.a},components:{SetEquipmentParasForm:s.a},data:function(){return{tableKey:0,loadUrl:"",equipmentParaDialog:!1,throttle:null,downLoadFileName:"二维码下载",showQR:!1,list:null,minHeightTable:550,total:null,listLoading:!0,dialogVisiable:!1,disableOptions:[{value:0,label:"全部"},{value:1,label:"正常"},{value:2,label:"已禁用"}],basicConfig:{machineUrl:"https://m.leyaoyao.com/customer/message/t/",gashaponUrl:"https://m.leyaoyao.com/customer/message/g/",childUrl:"https://m.leyaoyao.com/customer/message/c/"},isOnline:[{label:"全部",value:0},{label:"在线",value:1},{label:"离线",value:2}],accountTypeList:[{label:"商家账号",value:1},{label:"代理账号",value:2}],equipmentTypeName:[],form:{equipmentIdStart:null,equipmentIdEnd:null,deviceName:"",status:"",groupName:"",agentUserName:"",equipmentTypeName:"",isOnline:""},accountType:1,accountName:"",listQuery:{page:1,limit:20,importance:void 0,title:void 0,type:void 0,sort:"+id"},calendarTypeOptions:d,checked:!1,checkedRowAlone:{},checkedRow:[],temp:{id:void 0,importance:1,remark:"",timestamp:new Date,title:"",type:"",status:"published"},downloadLoading:!1,signalUI:{0:"signal-none",1:"signal-bad",2:"signal-mid",3:"signal-good",4:"signal-best"}}},created:function(){var e=this;this.throttle=Object(c.a)(),this.getList(),Object(o.a)().then(function(t){var n=t.data;n&&0!==n.length&&n.forEach(function(e){e.label=e.equipmenttypename,e.value=e.equipmenttypename}),e.equipmentTypeName=n});var t=document.body.clientHeight||document.documentElement.clientHeight;this.minHeightTable=t-334},methods:{renderHeader:function(e){return[e("p",{},["设备参数"]),e("p",{},["(脉冲宽度/脉冲间隔/待机电平)"])]},renderEquipState:function(e){var t=this;return[e("span",{},["设备注册状态"]),e("i",{class:"el-icon-warning",style:"margin-left: 5px",on:{click:function(){t.dialogVisiable=!0}}})]},confirom:function(e){var t=this;this.equipmentParaDialog=!1;var n=[];this.checkedRow.forEach(function(e){n.push(e.equipmentId)}),Object(l.e)(i()({values:n},e)).then(function(e){0===e.result&&(t.getList(),t.$message({message:"参数设置成功！",type:"success"}))})},equipmentSetPara:function(){this.diffEquipmentType()||(this.equipmentParaDialog=!0)},diffEquipmentType:function(){var e=!1;return this.checkedRow.length<=0?(this.$message({message:"请选择需要操作的设备！",type:"warning"}),!0):(this.checkedRow.reduce(function(t,n){return e||t.equipmentTypeName===n.equipmentTypeName||(e=!0),n}),!!e&&(this.$alert("仅支持导出同一种设备类型的二维码，请重新勾选。","温馨提示",{confirmButtonText:"知道了"}),!0))},importQrcode:function(e){var t=this;if(!this.diffEquipmentType()){var n=[];this.checkedRow.forEach(function(e){n.push(e.equipmentId)}),"pay"===e?(this.downLoadFileName="支付二维码下载",this.loadUrl=Object(r.a)({valueStr:n})):"register"===e&&(this.downLoadFileName="注册二维码下载",this.loadUrl=Object(r.b)({valueStr:n.join(",")})),this.throttle(function(){t.$nextTick(function(){t.$refs.downloadZip.click()})},2500)}},disabledEquipment:function(e){var t=this;this.checkedRow.length<=0?this.$message({message:"请选择需要操作的设备！",type:"warning"}):"disable"===e?this.$confirm("禁用设备后，用户将无法付款启动该设备。你可以通过“解除禁用”来恢复使用。\n 确定要禁用设备吗？","温馨提示",{distinguishCancelAndClose:!0,confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){t.equipmentDisable("disabled")}):"enable"===e&&this.$confirm("确定要解除禁用吗？","温馨提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){t.equipmentDisable("1Normal")})},equipmentDisable:function(e){var t=this,n=this.$loading({lock:!0,text:"loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),a=[];this.checkedRow.forEach(function(e){a.push(e.equipmentId)}),Object(l.b)({status:e,values:a}).then(function(e){if(n.close(),0===e.result){var a=0===e.data.fail.length?"":"失败"+e.data.fail.length+"条;\n        失败的设备编号："+e.data.fail.join(",");t.$alert(e.description+" "+a,"操作结果",{confirmButtonText:"确定",callback:function(){t.getList()}})}}).catch(function(e){n.close()})},handleChange:function(){},createQRCode:function(){var e=document.getElementById("canvas"),t=this.checkedRow[0];this.checkedRowAlone=t;var n=void 0;n="儿童类"===t.equipmentTypeName?this.basicConfig.childUrl:"扭蛋机"===t.equipmentTypeName?this.basicConfig.gashaponUrl:this.basicConfig.machineUrl,m.a.toCanvas(e,n+t.equipmentId,{width:200,height:200})},handleCreateQRCode:function(){this.checkedRow.length?this.checkedRow.length>1?this.$message({message:"一次只能查看一个设备的二维码！",type:"warning"}):(this.showQR=!this.showQR,this.createQRCode()):this.$message({message:"请选择要生成二维码的设备！",type:"warning"})},getTemplateRow:function(e){this.checked=!0,this.checkedRow=e},getList:function(){var e=this;this.listLoading=!0,this.form.pageSize=this.listQuery.limit,this.form.pageIndex=this.listQuery.page,delete this.form.agentAccount,delete this.form.merchantAccount,1===this.accountType&&(this.form.merchantAccount=this.accountName),2===this.accountType&&(this.form.agentAccount=this.accountName),Object(l.c)(this.form).then(function(t){e.list=t.data.items,e.total=t.data.total,e.checkedRow=[],e.checked=!1,e.listLoading=!1})},handleSizeChange:function(e){this.listQuery.limit=e,this.getList()},handleCurrentChange:function(e){this.listQuery.page=e,this.getList()},handleBtn:function(e){if("find"===e){if(parseInt(this.form.equipmentIdStart)<0)return void this.$alert("设备编号不能小于0。","温馨提示",{confirmButtonText:"知道了"});if(parseInt(this.form.equipmentIdStart)>parseInt(this.form.equipmentIdEnd))return void this.$alert("设备编号请按从小到大的顺序输入。","温馨提示",{confirmButtonText:"知道了"});if(parseInt(this.form.equipmentIdStart)+100<parseInt(this.form.equipmentIdEnd))return void this.$alert("支持连号查询，一次最多可查询100个。","温馨提示",{confirmButtonText:"知道了"});this.getList()}else"clear"===e&&(this.accountName="",this.accountType=1,this.form.equipmentIdStart=null,this.form.equipmentIdEnd=null,this.$refs.form.resetFields())}}},h=(n("1oRo"),n("KHd+")),v=Object(h.a)(f,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-main",{staticClass:"agent-list-container"},[n("el-form",{ref:"form",staticClass:"deviceForm",attrs:{model:e.form,"label-width":"106px"}},[n("el-row",[n("el-col",{attrs:{span:8}},[n("el-form-item",{attrs:{label:"设备编号"}},[n("el-row",[n("el-col",{attrs:{span:11}},[n("div",{staticClass:"el-input-number el-input-number--medium is-without-controls",staticStyle:{width:"100%"}},[n("div",{staticClass:"el-input el-input--medium"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.form.equipmentIdStart,expression:"form.equipmentIdStart"}],staticClass:"el-input__inner",attrs:{type:"number",placeholder:"设备编号"},domProps:{value:e.form.equipmentIdStart},on:{input:function(t){t.target.composing||e.$set(e.form,"equipmentIdStart",t.target.value)}}})])])]),e._v(" "),n("el-col",{attrs:{span:2}},[n("div",{staticStyle:{"text-align":"center"}},[e._v("-")])]),e._v(" "),n("el-col",{attrs:{span:11}},[n("div",{staticClass:"el-input-number el-input-number--medium is-without-controls",staticStyle:{width:"100%"}},[n("div",{staticClass:"el-input el-input--medium"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.form.equipmentIdEnd,expression:"form.equipmentIdEnd"}],staticClass:"el-input__inner",attrs:{type:"number",placeholder:"设备编号"},domProps:{value:e.form.equipmentIdEnd},on:{input:function(t){t.target.composing||e.$set(e.form,"equipmentIdEnd",t.target.value)}}})])])])],1)],1)],1),e._v(" "),n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"场地名称",prop:"groupName"}},[n("el-input",{attrs:{placeholder:"请输入场地名称"},model:{value:e.form.groupName,callback:function(t){e.$set(e.form,"groupName",t)},expression:"form.groupName"}})],1)],1),e._v(" "),n("el-col",{attrs:{span:5}},[n("el-form-item",{attrs:{label:"禁用状态",prop:"status"}},[n("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}},e._l(e.disableOptions,function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),n("el-col",{attrs:{span:5}},[n("el-form-item",{attrs:{label:"设备类型",prop:"equipmentTypeName"}},[n("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.equipmentTypeName,callback:function(t){e.$set(e.form,"equipmentTypeName",t)},expression:"form.equipmentTypeName"}},e._l(e.equipmentTypeName,function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1)],1),e._v(" "),n("el-row",{staticStyle:{"margin-bottom":"10px"}},[n("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择"},model:{value:e.accountType,callback:function(t){e.accountType=t},expression:"accountType"}},e._l(e.accountTypeList,function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v(" "),n("el-input",{staticStyle:{"margin-left":"10px",width:"200px"},attrs:{placeholder:"请输入账号",type:"number"},model:{value:e.accountName,callback:function(t){e.accountName=t},expression:"accountName"}})],1)],1),e._v(" "),n("div",{staticClass:"filter-container"},[n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){e.handleBtn("find")}}},[e._v("查询")]),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-delete"},on:{click:function(t){e.handleBtn("clear")}}},[e._v("清空查询")]),e._v(" "),n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"预览支付二维码",placement:"top-start"}},[n("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-view"},on:{click:e.handleCreateQRCode}},[e._v("查看二维码")])],1),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"primary",icon:"el-icon-download"},on:{click:function(t){e.importQrcode("pay")}}},[e._v("导出支付二维码")]),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-download"},on:{click:function(t){e.importQrcode("register")}}},[e._v("导出注册二维码")]),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-goods"},on:{click:function(t){e.disabledEquipment("disable")}}},[e._v("禁用设备")]),e._v(" "),n("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-view"},on:{click:function(t){e.disabledEquipment("enable")}}},[e._v("解除禁用")]),e._v(" "),n("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-setting"},on:{click:e.equipmentSetPara}},[e._v("设置设备参数")])],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%","margin-top":"20px"},attrs:{data:e.list,border:"",stripe:"",fit:"","highlight-current-row":""},on:{"selection-change":e.getTemplateRow}},[n("el-table-column",{attrs:{type:"selection",width:"65"}}),e._v(" "),n("el-table-column",{attrs:{label:"设备编号",align:"center",prop:"equipmentId"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.equipmentId))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"设备类型",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.equipmentTypeName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"在线状态",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.online?"在线":"离线"))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"信号",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("ul",{staticClass:"signal-ui",class:t.row.online?e.signalUI[t.row.signal]:"signal-none"},[n("li"),n("li"),n("li"),n("li")])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"禁用状态",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s("正常"==t.row.status?t.row.status+"启用":t.row.status))])]}}])}),e._v(" "),n("el-table-column",{attrs:{"render-header":e.renderEquipState,align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.isRegister))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"固件版本",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.firmwareVersion))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"设备参数",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.equipmentParam||"默认"))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"设备机台号",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.groupNumber||"未设置"))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"区域",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.districtName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"场地名称",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.groupName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"代理/商家名称",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.agentUserName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"角色",align:"center",prop:"role"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.role))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"账号",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.phone))])]}}])})],1),e._v(" "),n("div",{staticClass:"pagination-container"},[n("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{"current-page":e.listQuery.page,"page-sizes":[10,20,30,50],"page-size":e.listQuery.limit,total:e.total,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.showQR,expression:"showQR"}],staticClass:"mask-box",on:{click:function(t){t.stopPropagation(),e.showQR=!e.showQR}}},[n("div",{staticClass:"wrapper",on:{click:function(e){e.stopPropagation()}}},[n("div",{staticClass:"close",on:{click:function(t){t.stopPropagation(),e.showQR=!e.showQR}}},[e._v("X")]),e._v(" "),n("h2",[e._v("请用微信或支付宝扫描二维码")]),e._v(" "),n("canvas",{attrs:{id:"canvas"}}),e._v(" "),n("p",[e._v(e._s(e.checkedRowAlone.equipmentId))]),e._v(" "),n("p",[e._v(e._s(e.checkedRowAlone.groupNumber?e.checkedRowAlone.groupNumber+"号机":"")+e._s(e.checkedRowAlone.groupName?"("+e.checkedRowAlone.groupName+")":""))]),e._v(" "),n("p",[e._v(e._s(e.checkedRowAlone.equipmentTypeName))])])]),e._v(" "),n("a",{ref:"downloadZip",staticStyle:{display:"none"},attrs:{id:"downLoad",href:e.loadUrl,download:e.downLoadFileName}}),e._v(" "),n("el-dialog",{attrs:{visible:e.equipmentParaDialog,"show-close":!1,"close-on-click-modal":!1,width:"500px",title:"设置设备参数"},on:{"update:visible":function(t){e.equipmentParaDialog=t}}},[n("set-equipment-paras-form",{attrs:{checkedrow:e.checkedRow},on:{cancel:function(t){e.equipmentParaDialog=!1},confirom:e.confirom}})],1),e._v(" "),n("el-dialog",{attrs:{visible:e.dialogVisiable,"close-on-click-modal":!1,width:"500px",title:"温馨提示"},on:{"update:visible":function(t){e.dialogVisiable=t}}},[n("p",{staticClass:"dialogP"},[e._v("1、“设备注册状态” 指的是该设备是否已被商家在B端进行绑定。")]),e._v(" "),n("p",{staticClass:"dialogP"},[e._v("2、已注册：该设备已被商家绑定。")]),e._v(" "),n("p",{staticClass:"dialogP"},[e._v("3、未注册：该设备未被商家绑定。")]),e._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVisiable=!1}}},[e._v("知道了")])],1)])],1)},[],!1,null,null,null);v.options.__file="DeviceList.vue";t.default=v.exports},ZySA:function(e,t,n){"use strict";var a=n("P2sY"),i=n.n(a),l=(n("jUE0"),{bind:function(e,t){e.addEventListener("click",function(n){var a=i()({},t.value),l=i()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},a),o=l.ele;if(o){o.style.position="relative",o.style.overflow="hidden";var s=o.getBoundingClientRect(),r=o.querySelector(".waves-ripple");switch(r?r.className="waves-ripple":((r=document.createElement("span")).className="waves-ripple",r.style.height=r.style.width=Math.max(s.width,s.height)+"px",o.appendChild(r)),l.type){case"center":r.style.top=s.height/2-r.offsetHeight/2+"px",r.style.left=s.width/2-r.offsetWidth/2+"px";break;default:r.style.top=(n.pageY-s.top-r.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",r.style.left=(n.pageX-s.left-r.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return r.style.backgroundColor=l.color,r.className="waves-ripple z-active",!1}},!1)}}),o=function(e){e.directive("waves",l)};window.Vue&&(window.waves=l,Vue.use(o)),l.install=o;t.a=l},jUE0:function(e,t,n){},jfIV:function(e,t,n){},pK9s:function(e,t,n){"use strict";n.d(t,"c",function(){return i}),n.d(t,"d",function(){return l}),n.d(t,"e",function(){return o}),n.d(t,"a",function(){return s}),n.d(t,"b",function(){return r});var a=n("t3Un");function i(e){return Object(a.a)({url:"/equipment/firstAgent/getEquipmentList",method:"get",params:e})}function l(e){return Object(a.a)({url:"/equipment/secondAgent/getSecondAgentEquipmentList",method:"post",data:e})}function o(e){return Object(a.a)({url:"/rest/equipment/batch/setEquipmentParam",method:"post",data:e})}function s(e){return Object(a.a)({url:"/rest/equipment/agentEquipment/query",method:"get",params:e})}function r(e){return Object(a.a)({url:"/equipment/batch/status",method:"post",data:e})}}}]);