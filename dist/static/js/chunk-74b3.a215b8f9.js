(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-74b3","chunk-c3b1"],{"1XQG":function(e,t,a){"use strict";var n=a("tDeu");a.n(n).a},"57kU":function(e,t,a){"use strict";a.r(t);var n=a("14Xm"),s=a.n(n),i=a("D3Ub"),o=a.n(i),r=a("B5LO"),l=a("omMh"),c={components:{DialogAgent:a("ctKq").default},data:function(){return{baseInfo:{contractId:"",agentUserId:null,agentUserName:"",linkName:"",phone:"",address:"",BD:"",codeValidate:"1",dataMonitor:"0",projects:[],account:"",password:"",acc:""},baseInfoRules:{contractId:[{required:!0,message:"请输入合同号",trigger:"blur"}],agentUserName:[{required:!0,message:"请输入代理商名称",trigger:"blur"}],linkName:[{required:!0,message:"请输入联系人姓名",trigger:"blur"}],phone:[{required:!0,message:"请输入手机号码",trigger:"blur"},{validator:r.b,trigger:"input"}],address:[{required:!0,message:"请输入联系地址",trigger:"blur"}],BD:[{required:!0,message:"请输入一位BD同事",trigger:"change"}],loginPhone:[{required:!0,message:"请输入正确的账号",trigger:"blur"},{validator:r.b,trigger:"input"}],codeValidate:[{required:!0}],dataMonitor:[{required:!0}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:16,message:"请输入6-16位的数字或字母",trigger:"blur"}]},bdList:[],restaurants:"",checkBoxList:null,linkUserId:null,agentProject:[],showProjectTips:!1,allBusinProjects:[],dialogVisiable:!1}},computed:{projects:function(){var e=[];return this.allBusinProjects&&this.allBusinProjects.map(function(t){t.isChecked&&e.push(t.id)}),e}},created:function(){var e=this;return o()(s.a.mark(function t(){return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getBDList();case 2:return t.next=4,e.getBusinProjects();case 4:case"end":return t.stop()}},t,e)}))()},methods:{checkChange:function(){this.$nextTick(function(){})},getBDList:function(){var e=this;l.a.getBDList().then(function(t){t&&t.data&&(e.bdList=t.data)},function(){e.bdList=[]})},getBusinProjects:function(e){var t=this;l.a.getBusinProjects().then(function(e){var a=e.data;a instanceof Array?(t.allBusinProjects=a.map(function(e,t){return{name:e.name,id:e.agentBusinessId,isChecked:!1}}),t.$nextTick(function(){this.$refs.baseInfoRef.resetFields()})):(t.checkBoxList=[],t.$nextTick(function(){this.$refs.baseInfoRef.resetFields()}))},function(){t.checkBoxList=[]})},accountOnBlur:function(){var e=this,t=this.baseInfo.loginPhone;return!(!t||""===t)&&(!(t.length<11)&&void l.a.getShanghuInfo(t).then(function(t){t&&t.data?(e.restaurants=(t.data.name||null)+"</br>",e.linkUserId=t.data.adUserId):(e.restaurants="该手机号码未注册!",e.linkUserId="")},function(){e.linkUserId="",e.baseInfo.account,e.restaurants=""}))},createFilter:function(e){return function(t){return 0===t.value.toLowerCase().indexOf(e.toLowerCase())}},projectHandler:function(e,t){var a=[];return e&&e.length>0?(e.map(function(e){e.agentBusinessId===t&&a.push(e.name)}),a):[]},updataAgentInfo:function(e){var t=this;l.a.addAgentInfo(e).then(function(e){e&&(t.$message({message:"新增成功!",type:"success"}),setTimeout(function(){t.$router.push({path:"insideManage/agentRoleList"})},2e3))},function(){return!1})},handleAccountInfo:function(){var e=this;if(0===this.projects.length)return this.$message({message:"请至少选择一项经营项目!",type:"error"}),!1;this.$refs.baseInfoRef.validate(function(t){if(!t)return!1;var a=e.baseInfo,n=[];e.checkBoxList&&e.checkBoxList.length>1&&e.checkBoxList.map(function(e){e.isChecked&&n.push(e.id)});var s={type:1,loginPhone:a.loginPhone,code:"",contractId:a.contractId,agentUserName:a.agentUserName,linkName:a.linkName,phone:a.phone,address:a.address,bdId:a.BD,linkUserId:e.linkUserId,agentBusinessIds:e.projects,agentUserId:a.agentUserId,associatedType:Number(a.dataMonitor),issend:Number(a.codeValidate)};e.updataAgentInfo(s)})},toggleDialog:function(e){this.dialogVisiable=e.status;var t=e.response;if(t){var a={id:t.data,isChecked:!1,name:e.newAgentName};this.allBusinProjects.push(a),this.$message({message:"添加成功",type:"success"})}}}},u=(a("1XQG"),a("KHd+")),d=Object(u.a)(c,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"content-area bd-manage"},[a("el-menu",{staticClass:"el-menu-demo",attrs:{"default-active":"1",mode:"horizontal"}},[a("el-menu-item",{attrs:{index:"1"}},[e._v("基础信息")])],1),e._v(" "),a("el-form",{ref:"baseInfoRef",staticStyle:{"margin-top":"20px"},attrs:{model:e.baseInfo,rules:e.baseInfoRules,"label-width":"120px","label-position":"left"}},[a("el-form-item",{attrs:{label:"合同编号",prop:"contractId"}},[a("el-input",{staticClass:"input-300",attrs:{placeholder:"请输入合同编号",maxlength:"64"},model:{value:e.baseInfo.contractId,callback:function(t){e.$set(e.baseInfo,"contractId",t)},expression:"baseInfo.contractId"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"代理商名称",prop:"agentUserName"}},[a("el-input",{staticClass:"input-300",attrs:{placeholder:"请输入代理商名称",maxlength:"16"},model:{value:e.baseInfo.agentUserName,callback:function(t){e.$set(e.baseInfo,"agentUserName",t)},expression:"baseInfo.agentUserName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"联系人姓名",prop:"linkName"}},[a("el-input",{staticClass:"input-300",attrs:{placeholder:"请输入联系人姓名",maxlength:"16"},model:{value:e.baseInfo.linkName,callback:function(t){e.$set(e.baseInfo,"linkName",t)},expression:"baseInfo.linkName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"手机号码",prop:"phone"}},[a("el-input",{staticClass:"input-300",attrs:{placeholder:"请输入手机号",type:"number",maxlength:"11"},model:{value:e.baseInfo.phone,callback:function(t){e.$set(e.baseInfo,"phone",t)},expression:"baseInfo.phone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"联系地址",prop:"address"}},[a("el-input",{staticStyle:{width:"600px"},attrs:{placeholder:"请输入联系地址",maxlength:"40"},model:{value:e.baseInfo.address,callback:function(t){e.$set(e.baseInfo,"address",t)},expression:"baseInfo.address"}})],1),e._v(" "),e.bdList?a("el-form-item",{attrs:{label:"BD同事",prop:"BD"}},[a("el-select",{staticClass:"input-300",attrs:{placeholder:"选择一位BD同事",clearable:""},model:{value:e.baseInfo.BD,callback:function(t){e.$set(e.baseInfo,"BD",t)},expression:"baseInfo.BD"}},e._l(e.bdList,function(e){return a("el-option",{key:e.adUserId,staticStyle:{"text-align":"left"},attrs:{label:e.username,value:e.adUserId}})})),e._v(" "),a("span",{staticClass:"input-anno"},[e._v("选择一位BD同事作为跟进负责人")])],1):e._e(),e._v(" "),e.allBusinProjects&&e.allBusinProjects.length>0?a("el-form-item",{ref:"projectsRef",staticClass:"project-form",attrs:{label:"经营项目",prop:"project"}},[e._l(e.allBusinProjects,function(t,n){return[a("el-checkbox",{key:n,attrs:{checked:t.isChecked,label:t.name},model:{value:t.isChecked,callback:function(a){e.$set(t,"isChecked",a)},expression:"box.isChecked"}})]}),e._v(" "),a("span",{staticClass:"add-project",on:{click:function(t){e.dialogVisiable=!0}}},[e._v("+添加经营项目")]),e._v(" "),a("br"),e._v(" "),a("span",{staticClass:"input-anno ",staticStyle:{color:"red"}},[e._v("此处的经营项目是记录该代理的经营范围，仅作为记录用途。")])],2):e._e(),e._v(" "),a("br"),e._v(" "),a("el-menu",{staticClass:"el-menu-demo",attrs:{"default-active":"1",mode:"horizontal"}},[a("el-menu-item",{attrs:{index:"1"}},[e._v("账号信息")])],1),e._v(" "),a("br"),e._v(" "),a("br"),e._v(" "),a("el-form-item",{attrs:{label:"代理账号",prop:"phone"}},[a("el-input",{staticClass:"input-300",attrs:{placeholder:"请输入手机号",type:"number",maxlength:"11"},model:{value:e.baseInfo.loginPhone,callback:function(t){e.$set(e.baseInfo,"loginPhone",t)},expression:"baseInfo.loginPhone"}}),e._v(" "),a("span",{staticClass:"input-anno"},[e._v("代理账号设置后，不可修改。")])],1),e._v(" "),a("el-form-item",{staticClass:"mb5",attrs:{label:"验证设置",prop:"codeValidate"}},[a("el-radio-group",{model:{value:e.baseInfo.codeValidate,callback:function(t){e.$set(e.baseInfo,"codeValidate",t)},expression:"baseInfo.codeValidate"}},[a("el-radio",{attrs:{label:"1"}},[e._v("需要短信验证码")]),e._v(" "),a("el-radio",{attrs:{label:"0"}},[e._v("不需要短信验证码")])],1)],1),e._v(" "),a("div",{staticClass:"hint-info-panel"},[a("div",{staticClass:"fl"},[e._v("说明：")]),e._v(" "),a("div",{staticClass:"ovh"},[a("p",[e._v("（1）“验证设置” 的短信验证码，是指该一级代理在创建 下级代理、下级商家 的时候，是否需要短信验证码。")]),e._v(" "),a("p",[e._v("（2）如果勾选了 “不需要短信验证码”，则该一级代理在创建 下级代理、下级商家 的时候，就不需要输入短信验证码。")]),e._v(" "),a("p",[e._v("（3）为保证用户的信息安全，如非特殊情况，请不要轻易勾选 “不需要短信验证码”。")])])]),e._v(" "),a("el-form-item",{staticClass:"mb5 mt10",attrs:{label:"数据监控",prop:"dataMonitor"}},[a("el-radio-group",{model:{value:e.baseInfo.dataMonitor,callback:function(t){e.$set(e.baseInfo,"dataMonitor",t)},expression:"baseInfo.dataMonitor"}},[a("el-radio",{attrs:{label:"0"}},[e._v("手动关联")]),e._v(" "),a("el-radio",{attrs:{label:"1"}},[e._v("自动关联")])],1)],1),e._v(" "),a("div",{staticClass:"hint-info-panel"},[a("div",{staticClass:"fl"},[e._v("说明：")]),e._v(" "),a("div",{staticClass:"ovh"},[a("p",[e._v("（1）若勾选了 “手动关联” ，则BD将设备导入给该一级代理后，该一级代理必须在代理后台创建（或绑定）下级商家 ，才能看到的设备的经营数据。")]),e._v(" "),a("p",[e._v("（2）若勾选了“自动关联”，则该一级代理无需在代理后台手动创建（或绑定）下级商家，只要BD将设备导入给该一级代理，系统就会自动关联并显示下级商家和经营数据。")]),e._v(" "),a("p",[e._v("（3）为保证用户的信息安全，如非特殊情况，请不要轻易勾选 “自动关联”。")])])]),e._v(" "),a("br"),e._v(" "),a("p",{staticStyle:{margin:"10px","padding-bottom":"10px",color:"red"}},[e._v(e._s("注意：如果该账号未注册，则会直接开通注册，初始密码为16881688，请提醒及时修改密码。"))]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.handleAccountInfo}},[e._v("创建")])],1),e._v(" "),a("DialogAgent",{attrs:{visiable:e.dialogVisiable,projects:e.allBusinProjects},on:{"toggle-dialog":e.toggleDialog}})],1)},[],!1,null,"702f35aa",null);d.options.__file="AddAgent.vue";t.default=d.exports},B5LO:function(e,t,a){"use strict";a.d(t,"b",function(){return s}),a.d(t,"a",function(){return i});var n=a("Yfch"),s=function(e,t,a){if(!t||t&&!Object(n.b)(t))return a(new Error("请输入正确的11位手机号码"));a()},i=function(e,t,a){if(t&&!/^[A-Za-z0-9]{6,16}$/.test(t))return a(new Error("请输入6-16位的数字或字母"));a()}},Z6DV:function(e,t,a){"use strict";var n=a("t8il");a.n(n).a},ctKq:function(e,t,a){"use strict";a.r(t);var n=a("omMh"),s={props:{visiable:{type:Boolean,default:!1},projects:{type:Array,default:function(){(void 0).projects}}},data:function(){return{newAgentName:null}},methods:{toggleModal:function(e){var t=this,a=this.newAgentName;this.newAgentName&&(a=this.newAgentName.replace(/\s*/g,""));var s={status:!1,newAgentName:a,response:""};if("open"===e){var i=!1;if(!a||""===a)return void this.$message({message:"请输入要添加的项目名称",type:"warning"});if(a&&a.length>15)return void this.$message({message:"项目名称不能超过15个字",type:"warning"});if(this.projects.forEach(function(e){e.name===a&&(t.$message({message:"该项目已存在",type:"warning"}),i=!0)}),i)return;var o={agentBusinessId:"",name:a};n.a.saveAgentBusiness(o).then(function(e){e&&0===e.result?(s.response=e,t.newAgentName=null):t.$message.error("增加经营项目失败"),t.$emit("toggle-dialog",s)})}else this.newAgentName=null,this.$emit("toggle-dialog",s)}}},i=(a("Z6DV"),a("KHd+")),o=Object(i.a)(s,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{visible:e.visiable,"show-close":!1,"close-on-click-modal":!1,width:"500px",title:"添加经营项目"},on:{"update:visible":function(t){e.visiable=t}}},[a("el-input",{staticClass:"project-input",attrs:{placeholder:"请输入经营项目名称 (不超过15个字）"},model:{value:e.newAgentName,callback:function(t){e.newAgentName=t},expression:"newAgentName"}}),e._v(" "),a("p",{staticClass:"project-node"},[e._v("温馨提醒：添加后将作为公共选项，且不可删除，请认真填写。")]),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.toggleModal("open")}}},[e._v("确定")]),e._v(" "),a("el-button",{on:{click:function(t){e.toggleModal("close")}}},[e._v("取消")])],1)],1)},[],!1,null,"71213359",null);o.options.__file="DialogAgent.vue";t.default=o.exports},t8il:function(e,t,a){},tDeu:function(e,t,a){}}]);