(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-cd61"],{"3Fcl":function(e,t,n){"use strict";n.d(t,"a",function(){return a});var a=function(){var e=null,t=null;return function(n,a){for(var i=arguments.length,l=Array(i>2?i-2:0),r=2;r<i;r++)l[r-2]=arguments[r];var o=this,s=Date.now();t&&s-t<a?(clearTimeout(e),e=setTimeout(function(){t=s,n.apply(o,l),clearTimeout(e),e=null},a)):(t=s,n.apply(o,l))}}},"7/Q1":function(e,t,n){"use strict";n.r(t);var a=n("bS4n"),i=n.n(a),l=n("pK9s"),r=n("ACzA"),o=n("HpJO"),s=n("LAzu"),u=n("3Fcl"),c=n("ZySA"),p=n("bYEJ"),m=n.n(p),d=[{key:0,display_name:"冻结"},{key:1,display_name:"激活"}],f={name:"DeviceList",directives:{waves:c.a},components:{SetEquipmentParasForm:s.a},data:function(){return{tableKey:0,loadUrl:"",equipmentParaDialog:!1,throttle:null,downLoadFileName:"二维码下载",showQR:!1,list:null,minHeightTable:550,total:null,listLoading:!0,disableOptions:[{value:0,label:"全部"},{value:1,label:"正常"},{value:2,label:"已禁用"}],basicConfig:{machineUrl:"https://m.leyaoyao.com/customer/message/t/",gashaponUrl:"https://m.leyaoyao.com/customer/message/g/",childUrl:"https://m.leyaoyao.com/customer/message/c/"},isOnline:[{label:"全部",value:0},{label:"在线",value:1},{label:"离线",value:2}],equipmentTypeName:[],form:{equipmentIdStart:null,equipmentIdEnd:null,deviceName:"",status:"",groupName:"",agentUserName:"",equipmentTypeName:"",isOnline:""},listQuery:{page:1,limit:20,importance:void 0,title:void 0,type:void 0,sort:"+id"},calendarTypeOptions:d,checked:!1,checkedRowAlone:{},checkedRow:[],temp:{id:void 0,importance:1,remark:"",timestamp:new Date,title:"",type:"",status:"published"},downloadLoading:!1}},created:function(){var e=this;this.throttle=Object(u.a)(),this.getList(),Object(r.a)().then(function(t){var n=t.data;n&&0!==n.length&&n.forEach(function(e){e.label=e.equipmenttypename,e.value=e.equipmenttypename}),e.equipmentTypeName=n});var t=document.body.clientHeight||document.documentElement.clientHeight;this.minHeightTable=t-334},methods:{renderHeader:function(e){return[e("p",{},["设备参数"]),e("p",{},["(脉冲宽度/脉冲间隔/待机电平)"])]},confirom:function(e){var t=this;this.equipmentParaDialog=!1;var n=[];this.checkedRow.forEach(function(e){n.push(e.equipmentId)}),Object(l.e)(i()({values:n},e)).then(function(e){0===e.result&&(t.getList(),t.$message({message:"参数设置成功！",type:"success"}))})},equipmentSetPara:function(){this.diffEquipmentType()||(this.equipmentParaDialog=!0)},diffEquipmentType:function(){var e=!1;return this.checkedRow.length<=0?(this.$message({message:"请选择需要操作的设备！",type:"warning"}),!0):(this.checkedRow.reduce(function(t,n){return e||t.equipmentTypeName===n.equipmentTypeName||(e=!0),n}),!!e&&(this.$alert("仅支持导出同一种设备类型的二维码，请重新勾选。","温馨提示",{confirmButtonText:"知道了"}),!0))},importQrcode:function(e){var t=this;if(!this.diffEquipmentType()){var n=[];this.checkedRow.forEach(function(e){n.push(e.equipmentId)}),"pay"===e?(this.downLoadFileName="支付二维码下载",this.loadUrl=Object(o.a)({valueStr:n})):"register"===e&&(this.downLoadFileName="注册二维码下载",this.loadUrl=Object(o.b)({valueStr:n.join(",")})),this.throttle(function(){t.$nextTick(function(){t.$refs.downloadZip.click()})},2500)}},disabledEquipment:function(e){var t=this;this.checkedRow.length<=0?this.$message({message:"请选择需要操作的设备！",type:"warning"}):"disable"===e?this.$confirm("禁用设备后，用户将无法付款启动该设备。你可以通过“解除禁用”来恢复使用。\n 确定要禁用设备吗？","温馨提示",{distinguishCancelAndClose:!0,confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){t.equipmentDisable("disabled")}):"enable"===e&&this.$confirm("确定要解除禁用吗？","温馨提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){t.equipmentDisable("1Normal")})},equipmentDisable:function(e){var t=this,n=this.$loading({lock:!0,text:"loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),a=[];this.checkedRow.forEach(function(e){a.push(e.equipmentId)}),Object(l.b)({status:e,values:a}).then(function(e){if(n.close(),0===e.result){var a=0===e.data.fail.length?"":"失败"+e.data.fail.length+"条;\n        失败的设备编号："+e.data.fail.join(",");t.$alert(e.description+" "+a,"操作结果",{confirmButtonText:"确定",callback:function(){t.getList()}})}}).catch(function(e){n.close()})},handleChange:function(){},createQRCode:function(){var e=document.getElementById("canvas"),t=this.checkedRow[0];this.checkedRowAlone=t;var n=void 0;n="儿童类"===t.equipmentTypeName?this.basicConfig.childUrl:"扭蛋机"===t.equipmentTypeName?this.basicConfig.gashaponUrl:this.basicConfig.machineUrl,m.a.toCanvas(e,n+t.equipmentId,{width:200,height:200})},handleCreateQRCode:function(){this.checkedRow.length?this.checkedRow.length>1?this.$message({message:"一次只能查看一个设备的二维码！",type:"warning"}):(this.showQR=!this.showQR,this.createQRCode()):this.$message({message:"请选择要生成二维码的设备！",type:"warning"})},getTemplateRow:function(e){this.checked=!0,this.checkedRow=e},getList:function(){var e=this;this.listLoading=!0,this.form.pageSize=this.listQuery.limit,this.form.pageIndex=this.listQuery.page,Object(l.d)(this.form).then(function(t){e.list=t.data.items,e.total=t.data.total,e.checkedRow=[],e.checked=!1,e.listLoading=!1})},handleSizeChange:function(e){this.listQuery.limit=e,this.getList()},handleCurrentChange:function(e){this.listQuery.page=e,this.getList()},handleBtn:function(e){if("find"===e){if(parseInt(this.form.equipmentIdStart)<0)return void this.$alert("设备编号不能小于0。","温馨提示",{confirmButtonText:"知道了"});if(parseInt(this.form.equipmentIdStart)>parseInt(this.form.equipmentIdEnd))return void this.$alert("设备编号请按从小到大的顺序输入。","温馨提示",{confirmButtonText:"知道了"});if(parseInt(this.form.equipmentIdStart)+100<parseInt(this.form.equipmentIdEnd))return void this.$alert("支持连号查询，一次最多可查询100个。","温馨提示",{confirmButtonText:"知道了"});this.getList()}else"clear"===e&&(this.form.equipmentIdStart=null,this.form.equipmentIdEnd=null,this.$refs.form.resetFields())}}},h=(n("ZwRz"),n("ZrdR")),v=Object(h.a)(f,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-main",{staticClass:"agent-list-container"},[n("el-form",{ref:"form",staticClass:"deviceForm",attrs:{model:e.form,"label-width":"106px"}},[n("el-row",[n("el-col",{attrs:{span:8}},[n("el-form-item",{attrs:{label:"设备编号"}},[n("el-row",[n("el-col",{attrs:{span:11}},[n("div",{staticClass:"el-input-number el-input-number--medium is-without-controls",staticStyle:{width:"100%"}},[n("div",{staticClass:"el-input el-input--medium"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.form.equipmentIdStart,expression:"form.equipmentIdStart"}],staticClass:"el-input__inner",attrs:{type:"number",placeholder:"设备编号"},domProps:{value:e.form.equipmentIdStart},on:{input:function(t){t.target.composing||e.$set(e.form,"equipmentIdStart",t.target.value)}}})])])]),e._v(" "),n("el-col",{attrs:{span:2}},[n("div",{staticStyle:{"text-align":"center"}},[e._v("-")])]),e._v(" "),n("el-col",{attrs:{span:11}},[n("div",{staticClass:"el-input-number el-input-number--medium is-without-controls",staticStyle:{width:"100%"}},[n("div",{staticClass:"el-input el-input--medium"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.form.equipmentIdEnd,expression:"form.equipmentIdEnd"}],staticClass:"el-input__inner",attrs:{type:"number",placeholder:"设备编号"},domProps:{value:e.form.equipmentIdEnd},on:{input:function(t){t.target.composing||e.$set(e.form,"equipmentIdEnd",t.target.value)}}})])])])],1)],1)],1),e._v(" "),n("el-col",{attrs:{span:8}},[n("el-form-item",{attrs:{label:"设备状态",prop:"status"}},[n("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}},e._l(e.disableOptions,function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),n("el-col",{attrs:{span:8}},[n("el-form-item",{attrs:{label:"场地名称",prop:"groupName"}},[n("el-input",{attrs:{placeholder:"请输入场地名称"},model:{value:e.form.groupName,callback:function(t){e.$set(e.form,"groupName",t)},expression:"form.groupName"}})],1)],1)],1),e._v(" "),n("el-row",[n("el-col",{attrs:{span:8}},[n("el-form-item",{attrs:{label:"商家名称",prop:"agentUserName"}},[n("el-input",{attrs:{placeholder:"请输入商家名称"},model:{value:e.form.agentUserName,callback:function(t){e.$set(e.form,"agentUserName",t)},expression:"form.agentUserName"}})],1)],1),e._v(" "),n("el-col",{attrs:{span:8}},[n("el-form-item",{attrs:{label:"设备类型",prop:"equipmentTypeName"}},[n("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.equipmentTypeName,callback:function(t){e.$set(e.form,"equipmentTypeName",t)},expression:"form.equipmentTypeName"}},e._l(e.equipmentTypeName,function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1)],1)],1),e._v(" "),n("div",{staticClass:"filter-container"},[n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){e.handleBtn("find")}}},[e._v("查询")]),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-delete"},on:{click:function(t){e.handleBtn("clear")}}},[e._v("清空查询")]),e._v(" "),n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"预览支付二维码",placement:"top-start"}},[n("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-view"},on:{click:e.handleCreateQRCode}},[e._v("查看二维码")])],1),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"primary",icon:"el-icon-download"},on:{click:function(t){e.importQrcode("pay")}}},[e._v("导出支付二维码")]),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-download"},on:{click:function(t){e.importQrcode("register")}}},[e._v("导出注册二维码")]),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-goods"},on:{click:function(t){e.disabledEquipment("disable")}}},[e._v("禁用设备")]),e._v(" "),n("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-view"},on:{click:function(t){e.disabledEquipment("enable")}}},[e._v("解除禁用")]),e._v(" "),n("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-setting"},on:{click:e.equipmentSetPara}},[e._v("设置设备参数")])],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%","margin-top":"20px"},attrs:{data:e.list,border:"",stripe:"",fit:"","highlight-current-row":""},on:{"selection-change":e.getTemplateRow}},[n("el-table-column",{attrs:{type:"selection",width:"65"}}),e._v(" "),n("el-table-column",{attrs:{label:"设备编号",align:"center",prop:"equipmentId"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.equipmentId))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"禁用状态",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.status))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"设备机台号",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.groupNumber||""))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"场地名称",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.groupName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"设备类型",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.equipmentTypeName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"商家名称",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.agentUserName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"账号",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.phone))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"区域",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.districtName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"注册状态",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.isRegister))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"在线状态",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.online?"在线":"离线"))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"固件版本",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.firmwareVersion))])]}}])}),e._v(" "),n("el-table-column",{attrs:{"render-header":e.renderHeader,align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.equipmentParam))])]}}])})],1),e._v(" "),n("div",{staticClass:"pagination-container"},[n("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{"current-page":e.listQuery.page,"page-sizes":[10,20,30,50],"page-size":e.listQuery.limit,total:e.total,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.showQR,expression:"showQR"}],staticClass:"mask-box",on:{click:function(t){t.stopPropagation(),e.showQR=!e.showQR}}},[n("div",{staticClass:"wrapper",on:{click:function(e){e.stopPropagation()}}},[n("div",{staticClass:"close",on:{click:function(t){t.stopPropagation(),e.showQR=!e.showQR}}},[e._v("X")]),e._v(" "),n("h2",[e._v("请用微信或支付宝扫描二维码")]),e._v(" "),n("canvas",{attrs:{id:"canvas"}}),e._v(" "),n("p",[e._v(e._s(e.checkedRowAlone.equipmentId))]),e._v(" "),n("p",[e._v(e._s(e.checkedRowAlone.groupNumber?e.checkedRowAlone.groupNumber+"号机":"")+e._s(e.checkedRowAlone.groupName?"("+e.checkedRowAlone.groupName+")":""))]),e._v(" "),n("p",[e._v(e._s(e.checkedRowAlone.equipmentTypeName))])])]),e._v(" "),n("a",{ref:"downloadZip",staticStyle:{display:"none"},attrs:{id:"downLoad",href:e.loadUrl,download:e.downLoadFileName}}),e._v(" "),n("el-dialog",{attrs:{visible:e.equipmentParaDialog,"show-close":!1,"close-on-click-modal":!1,width:"500px",title:"设置设备参数"},on:{"update:visible":function(t){e.equipmentParaDialog=t}}},[n("set-equipment-paras-form",{attrs:{checkedrow:e.checkedRow},on:{cancel:function(t){e.equipmentParaDialog=!1},confirom:e.confirom}})],1)],1)},[],!1,null,null,null);v.options.__file="DeviceListAgent.vue";t.default=v.exports},ACzA:function(e,t,n){"use strict";n.d(t,"a",function(){return i}),n.d(t,"b",function(){return l});var a=n("t3Un");function i(){return Object(a.a)({url:"/equipment/getEquipmentTypes",method:"get"})}function l(){return Object(a.a)({url:"/rest/equipment/equipmentType/querySHL",method:"get"})}},HpJO:function(e,t,n){"use strict";function a(e){return"/agent/rest/equipment/batch/exportPayOrCode?valueStr="+e.valueStr}function i(e){return"/agent/rest/equipment/batch/exportRegisterOrCode?valueStr="+e.valueStr}n.d(t,"a",function(){return a}),n.d(t,"b",function(){return i})},LAzu:function(e,t,n){"use strict";var a=n("Asgo"),i=n.n(a),l={name:"SetEquipmentParas",props:{checkedrow:{type:Array,default:function(){return[]}}},data:function(){return{equipmentParaForm:{pulseWidth:"",pulseInterval:"",standbyStatus:0},rules:{pulseWidth:{message:"请输入10-1000范围内的整数",trigger:"blur",validator:function(e,t,n){parseInt(t)<10||parseInt(t)>1e3||parseInt(t)!==+t?n(new Error):n()}},pulseInterval:{message:"请输入10-1000范围内的整数",trigger:"blur",validator:function(e,t,n){parseInt(t)<10||parseInt(t)>1e3||parseInt(t)!==+t?n(new Error):n()}}}}},methods:{submitChecked:function(e){var t=this;return new i.a(function(n,a){t.$refs[e].validate(function(e){e?n():a()})})},cancel:function(e){this.$refs[e].resetFields(),this.$emit("cancel")},confirmPara:function(e){var t=this;this.submitChecked(e).then(function(n){t.$emit("confirom",t.equipmentParaForm),t.$refs[e].resetFields()}).catch(function(){})}}},r=(n("qlNb"),n("ZrdR")),o=Object(r.a)(l,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-form",{ref:"equipmentParaForm",attrs:{model:e.equipmentParaForm,rules:e.rules,"label-width":"92px"}},[n("el-form-item",[n("div",{staticStyle:{"text-align":"left"},attrs:{slot:"label"},slot:"label"},[e._v("已勾选设备")]),e._v(" "),n("p",[e._v(" "+e._s(e.checkedrow.length)+" 个")])]),e._v(" "),n("el-form-item",{attrs:{prop:"pulseWidth"}},[n("div",{staticStyle:{"text-align":"left"},attrs:{slot:"label"},slot:"label"},[e._v("脉冲宽度")]),e._v(" "),n("el-input",{attrs:{type:"number",placeholder:"10~1000"},model:{value:e.equipmentParaForm.pulseWidth,callback:function(t){e.$set(e.equipmentParaForm,"pulseWidth",t)},expression:"equipmentParaForm.pulseWidth"}})],1),e._v(" "),n("el-form-item",{attrs:{prop:"pulseInterval"}},[n("div",{staticStyle:{"text-align":"left"},attrs:{slot:"label"},slot:"label"},[e._v("脉冲间隔")]),e._v(" "),n("el-input",{attrs:{type:"number",placeholder:"10~1000"},model:{value:e.equipmentParaForm.pulseInterval,callback:function(t){e.$set(e.equipmentParaForm,"pulseInterval",t)},expression:"equipmentParaForm.pulseInterval"}})],1),e._v(" "),n("el-form-item",{attrs:{prop:"standbyStatus"}},[n("div",{staticStyle:{"text-align":"left"},attrs:{slot:"label"},slot:"label"},[e._v("待机电平")]),e._v(" "),n("el-radio-group",{model:{value:e.equipmentParaForm.standbyStatus,callback:function(t){e.$set(e.equipmentParaForm,"standbyStatus",t)},expression:"equipmentParaForm.standbyStatus"}},[n("el-radio",{attrs:{label:0}},[e._v("常开")]),e._v(" "),n("el-radio",{attrs:{label:1}},[e._v("常闭")])],1)],1),e._v(" "),n("p",{staticStyle:{color:"#999999","font-size":"13px"}},[e._v("温馨提示：此处的参数设置，仅对 “脉冲版” 生效，对“串口版”无效。")]),e._v(" "),n("div",{staticStyle:{"padding-top":"22px","text-align":"right"}},[n("el-button",{on:{click:function(t){e.cancel("equipmentParaForm")}}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(t){e.confirmPara("equipmentParaForm")}}},[e._v("确 定")])],1)],1)},[],!1,null,"541b4cfc",null);o.options.__file="index.vue";t.a=o.exports},ZwRz:function(e,t,n){"use strict";var a=n("ie6N");n.n(a).a},ZySA:function(e,t,n){"use strict";var a=n("6ZY3"),i=n.n(a),l=(n("jUE0"),{bind:function(e,t){e.addEventListener("click",function(n){var a=i()({},t.value),l=i()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},a),r=l.ele;if(r){r.style.position="relative",r.style.overflow="hidden";var o=r.getBoundingClientRect(),s=r.querySelector(".waves-ripple");switch(s?s.className="waves-ripple":((s=document.createElement("span")).className="waves-ripple",s.style.height=s.style.width=Math.max(o.width,o.height)+"px",r.appendChild(s)),l.type){case"center":s.style.top=o.height/2-s.offsetHeight/2+"px",s.style.left=o.width/2-s.offsetWidth/2+"px";break;default:s.style.top=(n.pageY-o.top-s.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",s.style.left=(n.pageX-o.left-s.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return s.style.backgroundColor=l.color,s.className="waves-ripple z-active",!1}},!1)}}),r=function(e){e.directive("waves",l)};window.Vue&&(window.waves=l,Vue.use(r)),l.install=r;t.a=l},ie6N:function(e,t,n){},jUE0:function(e,t,n){},lLuZ:function(e,t,n){},pK9s:function(e,t,n){"use strict";n.d(t,"c",function(){return i}),n.d(t,"d",function(){return l}),n.d(t,"e",function(){return r}),n.d(t,"a",function(){return o}),n.d(t,"b",function(){return s});var a=n("t3Un");function i(e){return Object(a.a)({url:"/equipment/firstAgent/getEquipmentList",method:"get",params:e})}function l(e){return Object(a.a)({url:"/equipment/secondAgent/getSecondAgentEquipmentList",method:"post",data:e})}function r(e){return Object(a.a)({url:"/rest/equipment/batch/setEquipmentParam",method:"post",data:e})}function o(e){return Object(a.a)({url:"/rest/equipment/agentEquipment/query",method:"get",params:e})}function s(e){return Object(a.a)({url:"/equipment/batch/status",method:"post",data:e})}},qlNb:function(e,t,n){"use strict";var a=n("lLuZ");n.n(a).a}}]);