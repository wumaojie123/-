(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-28f4"],{TKPd:function(e,t,i){},jzU3:function(e,t,i){"use strict";i.d(t,"a",function(){return a});var n=i("t3Un");function a(e){return Object(n.a)({url:"/rest/equipment/childAgents/query",method:"get",params:e})}},ltpp:function(e,t,i){"use strict";var n=i("TKPd");i.n(n).a},"wj+h":function(e,t,i){"use strict";i.r(t);var n=i("QbLZ"),a=i.n(n),s=i("ACzA"),l=i("pK9s"),o=i("c1P4"),r=i("jzU3"),u=i("BSo3"),c=i("3Fcl"),p=i("HpJO"),d={name:"DeviceTransfer",components:{SetEquipmentParasForm:i("LAzu").a},data:function(){return{type:"1",total:0,equipmentParaDialog:!1,throttle:null,downLoadFileName:"下载",questionDialogVisible:!1,loadUrl:"",agentid:"",selectAgent:"",agentsArr:[],willTranfers:[],innerVisible:!1,dialogVisible:!1,listQuery:{page:1,limit:20},infoChecked:!1,tableKey:0,listLoading:!1,minHeightTable:660,list:[],equipmentTypesArr:[],isOnline:[{label:"全部",value:0},{label:"在线",value:1},{label:"离线",value:2}],message:"将设备批量转移给商家后，需告知商家登录PC端管理后台及时批量注册设备（商家PC端管理后台网址：https://fac.leyaoyao.com/#/login  ）。",form:{isOnline:"",equipmentTypeValue:"",equipmentIdStart:null,equipmentIdEnd:null}}},watch:{type:function(e){}},created:function(){var e=this,t=document.body.clientHeight||document.documentElement.clientHeight;this.minHeightTable=t-388,this.throttle=Object(c.a)(),Object(s.b)().then(function(t){0===t.result&&t.data&&0!==t.data.length&&t.data.forEach(function(t){e.equipmentTypesArr.push({label:t.name,value:t.code})})}),this.getList()},methods:{renderHeader:function(e){return[e("p",{},["设备参数"]),e("p",{},["(脉冲宽度/脉冲间隔/待机电平)"])]},equipmentSetPara:function(){this.diffEquipmentType()||(this.equipmentParaDialog=!0)},diffEquipmentType:function(){var e=!1;return this.willTranfers.length<=0?(this.$message({message:"请选择需要操作的设备！",type:"warning"}),!0):(this.willTranfers.reduce(function(t,i){return e||t.equipmentTypeName===i.equipmentTypeName||(e=!0),i}),!!e&&(this.$alert("仅支持导出同一种设备类型的二维码，请重新勾选。","温馨提示",{confirmButtonText:"知道了"}),!0))},oftenquestionFn:function(){this.questionDialogVisible=!0},confirom:function(e){var t=this;this.equipmentParaDialog=!1;var i=[];this.willTranfers.forEach(function(e){i.push(e.equipmentValue)}),Object(l.e)(a()({values:i},e)).then(function(e){0===e.result&&(t.getList(),t.$message({message:"参数设置成功！",type:"success"}))})},importQrcode:function(e){var t=this;if(!this.diffEquipmentType()){var i=[];this.willTranfers.forEach(function(e){i.push(e.equipmentValue)}),"pay"===e?(this.downLoadFileName="支付二维码下载",this.loadUrl=Object(p.a)({valueStr:i})):"register"===e&&(this.downLoadFileName="注册二维码下载",this.loadUrl=Object(p.b)({valueStr:i.join(",")})),this.throttle(function(){t.$nextTick(function(){t.$refs.downloadZip.click()})},2500)}},beforeClose:function(e){this.$refs.multipleTable.clearSelection(),this.selectAgent="",this.agentid="",e()},confirmTranfer:function(){var e=this;if(this.selectAgent){if(this.agentid&&!this.infoChecked){this.dialogVisible=!1;var t=this.$loading({lock:!0,text:"转移中...",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),i=[];this.willTranfers.forEach(function(e){i.push(e.equipmentValue)});var n={},a=null;"1"===this.type?(n={values:i,adorgid:this.agentid},a=u.b):"2"===this.type&&(n={values:i,agentUserId:this.agentid},a=u.c),a(n).then(function(){t.close(),e.listQuery.page=1,e.agentid="",e.selectAgent="",e.$message({message:"转移成功！",type:"success"}),e.getList()}).catch(function(){t.close(),e.$message.error("设备转移失败！")})}}else this.innerVisible=!0},handleSelectionChange:function(e){this.willTranfers=e},querySearch:function(e,t){var i=this,n=void 0;if("1"===this.type?n=o.b:"2"===this.type&&(n=r.a),n){var a=/^(.+)\((.+)\)$/.exec(e);a&&(e=a[1]&&a[1].trim()),n({agentQuery:e}).then(function(e){if(0===e.result&&e.data&&0!==e.data.length){var n=[];e.data.forEach(function(e){"1"===i.type?n.push({value:e.merchantname+" ("+e.username+")",agentId:e.adorgid}):"2"===i.type&&n.push({value:e.phone+" ("+e.agentusername+")",agentId:e.agentuserid})}),i.agentsArr=n,i.infoChecked=!1,t(n)}else i.infoChecked=!0,t([])})}},handleSelect:function(e){this.agentid=e.agentId},getList:function(){var e=this;this.listLoading=!0,this.form.pageSize=this.listQuery.limit,this.form.queryLevel=1,this.form.pageIndex=this.listQuery.page,Object(l.a)(this.form).then(function(t){e.list=t.data.items,e.total=t.data.total,e.willTranfers=[],e.checked=!1,e.listLoading=!1})},handleSizeChange:function(e){this.listQuery.limit=e,this.getList()},handleCurrentChange:function(e){this.listQuery.page=e,this.getList()},look:function(){parseInt(this.form.equipmentIdStart)<0?this.$alert("设备编号不能小于0。","温馨提示",{confirmButtonText:"知道了"}):parseInt(this.form.equipmentIdStart)>parseInt(this.form.equipmentIdEnd)?this.$alert("设备编号请按从小到大的顺序输入。","温馨提示",{confirmButtonText:"知道了"}):parseInt(this.form.equipmentIdStart)+100<parseInt(this.form.equipmentIdEnd)?this.$alert("支持连号查询，一次最多可查询100个。","温馨提示",{confirmButtonText:"知道了"}):(this.listQuery.page=1,this.getList())},transfer:function(){this.type="1",0===this.willTranfers.length?this.$message({showClose:!1,message:"请选择要转移的设备！",type:"warning"}):this.dialogVisible=!0}}},m=(i("ltpp"),i("KHd+")),f=Object(m.a)(d,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-main",[i("el-row",{staticStyle:{"align-items":"center"},attrs:{gutter:20}},[i("el-col",{attrs:{span:20}},[i("el-alert",{staticClass:"info",attrs:{title:e.message,closable:!1,type:"warning"}})],1),e._v(" "),i("el-col",{attrs:{span:4}},[i("div",{staticClass:"often-question"},[i("p",{on:{click:e.oftenquestionFn}},[i("i",{staticClass:"el-icon-question"}),e._v(" 常见问题 >>")])])])],1),e._v(" "),i("el-form",{ref:"form",staticClass:"deviceForm",staticStyle:{padding:"10px 0"},attrs:{inline:!0,model:e.form,"label-width":"90px"}},[i("el-form-item",{attrs:{label:"设备类型",prop:"equipmentTypeValue"}},[i("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.equipmentTypeValue,callback:function(t){e.$set(e.form,"equipmentTypeValue",t)},expression:"form.equipmentTypeValue"}},e._l(e.equipmentTypesArr,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),i("el-form-item",{attrs:{label:"设备查询",prop:"equipmentId"}},[i("div",{staticClass:"el-input-number el-input-number--medium is-without-controls input-300",staticStyle:{width:"200px"}},[i("div",{staticClass:"el-input el-input--medium"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.form.equipmentIdStart,expression:"form.equipmentIdStart"}],staticClass:"el-input__inner",attrs:{type:"number",placeholder:"设备编号"},domProps:{value:e.form.equipmentIdStart},on:{input:function(t){t.target.composing||e.$set(e.form,"equipmentIdStart",t.target.value)}}})])]),e._v(" "),i("span",{staticStyle:{"text-align":"center"}},[e._v("-")]),e._v(" "),i("div",{staticClass:"el-input-number el-input-number--medium is-without-controls input-300",staticStyle:{width:"200px"}},[i("div",{staticClass:"el-input el-input--medium"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.form.equipmentIdEnd,expression:"form.equipmentIdEnd"}],staticClass:"el-input__inner",attrs:{type:"number",placeholder:"设备编号"},domProps:{value:e.form.equipmentIdEnd},on:{input:function(t){t.target.composing||e.$set(e.form,"equipmentIdEnd",t.target.value)}}})])]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.look}},[e._v("查询")])],1)],1),e._v(" "),i("div",{staticStyle:{"padding-bottom":"10px"}},[i("el-button",{attrs:{type:"primary"},on:{click:e.transfer}},[e._v("批量转移设备")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(t){e.importQrcode("pay")}}},[e._v("导出支付二维码")]),e._v(" "),i("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary"},on:{click:function(t){e.importQrcode("register")}}},[e._v("导出注册二维码")]),e._v(" "),i("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-setting"},on:{click:e.equipmentSetPara}},[e._v("设置设备参数")])],1),e._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,ref:"multipleTable",attrs:{data:e.list,height:e.minHeightTable,border:"",stripe:"",fit:"","highlight-current-row":""},on:{"selection-change":e.handleSelectionChange}},[i("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),i("el-table-column",{attrs:{label:"设备编号",align:"center",prop:"equipmentValue"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.equipmentValue))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"设备类型",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.equipmentTypeName))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"固件版本",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.versionno))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"设备来源",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.agentEquipmentStatus))])]}}])}),e._v(" "),i("el-table-column",{attrs:{"render-header":e.renderHeader,align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.equipmentParam))])]}}])})],1),e._v(" "),i("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],staticClass:"pagination-container",attrs:{"current-page":e.listQuery.page,"page-sizes":[10,20,30,50],"page-size":e.listQuery.limit,total:e.total,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}),e._v(" "),i("el-dialog",{attrs:{visible:e.dialogVisible,"before-close":e.beforeClose,title:"批量转移设备",width:"450px"},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("el-dialog",{attrs:{visible:e.innerVisible,width:"360px",title:"提示","append-to-body":""},on:{"update:visible":function(t){e.innerVisible=t}}},[i("span",{staticStyle:{"font-size":"16px",color:"#ef6969"}},[e._v("请选择商家")])]),e._v(" "),i("el-row",[i("el-col",{attrs:{span:6}},[i("p",{staticStyle:{"font-size":"16px","line-height":"150%",padding:"6px 0"}},[e._v("已选择设备：")])]),e._v(" "),i("el-col",{attrs:{span:18}},[i("p",{staticStyle:{"font-size":"16px","line-height":"150%",padding:"6px 0"}},[e._v(e._s(e.willTranfers.length)+" 个")])])],1),e._v(" "),i("el-row",{staticStyle:{display:"flex","align-items":"center"}},[i("el-col",{attrs:{span:6}},[i("p",{staticStyle:{"font-size":"16px","line-height":"150%",padding:"6px 0"}},[e._v("转移给目标：")])]),e._v(" "),i("el-col",{attrs:{span:18}},[i("el-radio",{attrs:{label:"1"},model:{value:e.type,callback:function(t){e.type=t},expression:"type"}},[e._v("商家")]),e._v(" "),i("el-radio",{attrs:{label:"2"},model:{value:e.type,callback:function(t){e.type=t},expression:"type"}},[e._v("代理")])],1)],1),e._v(" "),i("el-row",{staticStyle:{"margin-top":"16px","align-items":"center"}},[i("el-col",{attrs:{span:6}}),e._v(" "),i("el-col",{attrs:{span:18}},[i("el-autocomplete",{staticClass:"width270",attrs:{"fetch-suggestions":e.querySearch,"popper-class":"my-autocomplete",placeholder:"请输入商家名或手机号"},on:{select:e.handleSelect},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.item;return[i("div",{staticClass:"name"},[e._v(e._s(n.value))])]}}]),model:{value:e.selectAgent,callback:function(t){e.selectAgent=t},expression:"selectAgent"}})],1)],1),e._v(" "),i("p",{directives:[{name:"show",rawName:"v-show",value:e.infoChecked,expression:"infoChecked"}],staticStyle:{"padding-top":"12px","font-size":"14px",color:"red"}},[e._v("未查询到相应的商家，请重新输入！")]),e._v(" "),i("div",{staticClass:"dialog-footer",staticStyle:{"text-align":"center"},attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{disabled:!e.selectAgent,type:"primary"},on:{click:e.confirmTranfer}},[e._v("确定转移设备")])],1)],1),e._v(" "),i("el-dialog",{staticClass:"question-main-dialog",attrs:{visible:e.questionDialogVisible,width:"50%",title:"设备转移常见问题"},on:{"update:visible":function(t){e.questionDialogVisible=t}}},[i("div",{staticClass:"main question-main"},[i("div",{staticClass:"item"},[i("h2",[e._v("1. 什么是“待转移设备”？")]),e._v(" "),i("p",{staticClass:"info"},[e._v("“待转移设备”指由设备提供方，按设备编号批量导入的、且未注册绑定到商家账号的设备。如果购买了设备，而“待转移设备”列表为空，请及时联系你的设备提供方。")])]),e._v(" "),i("div",{staticClass:"item"},[i("h2",[e._v("2. 如何转移设备？")]),e._v(" "),i("p",{staticClass:"info"},[e._v(" 勾选设备后，点击“批量转移设备”按钮，可将设备批量转移到某个商家（或某个代理）账号下。")])]),e._v(" "),i("div",{staticClass:"item"},[i("h2",[e._v("3. 代理将设备批量转移给商家后，商家如何批量注册？")]),e._v(" "),i("p",{staticClass:"info"},[e._v("\n          （1）代理将设备批量转移给商家后，需告知商家登录PC端管理后台（网址：https://fac.leyaoyao.com/#/login ），\n          用商家账号、密码登录进去以后，点击“设备管理>未注册设备”，即可看到代理转移给商家的设备。\n          勾选未注册的设备，并点击“批量注册”，然后选择要投放的场地，即可批量注册成功。")]),e._v(" "),i("p",{staticClass:"info"},[e._v("\n          （2）批量注册成功后，商家再登录手机端管理后台，即可在相应场地查看到设备。商家无需再一个个扫码注册。\n        ")])]),e._v(" "),i("div",{staticClass:"item"},[i("h2",[e._v("4. 如果已转移的设备被商家解绑了，那设备会去往哪里？")]),e._v(" "),i("p",{staticClass:"info"},[e._v("如果已转移的设备被商家解绑了，则解绑的设备将会重新返回到代理的“待转移设备”列表中。")])])])]),e._v(" "),i("a",{ref:"downloadZip",staticStyle:{display:"none"},attrs:{id:"downLoad",href:e.loadUrl,download:e.downLoadFileName}}),e._v(" "),i("el-dialog",{attrs:{visible:e.equipmentParaDialog,width:"500px",title:"设置设备参数"},on:{"update:visible":function(t){e.equipmentParaDialog=t}}},[i("set-equipment-paras-form",{attrs:{checkedrow:e.willTranfers},on:{cancel:function(t){e.equipmentParaDialog=!1},confirom:e.confirom}})],1)],1)},[],!1,null,"728f4419",null);f.options.__file="deviceTransfer.vue";t.default=f.exports}}]);