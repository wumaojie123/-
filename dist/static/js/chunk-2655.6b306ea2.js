(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2655"],{B5LO:function(e,t,n){"use strict";n.d(t,"b",function(){return s}),n.d(t,"a",function(){return r});var a=n("Yfch"),s=function(e,t,n){if(t&&!Object(a.b)(t))return n(new Error("请输入正确的11位手机号码"));n()},r=function(e,t,n){if(t&&!/^[A-Za-z0-9]{6,16}$/.test(t))return n(new Error("请输入6-16位的数字或字母"));n()}},Ry7M:function(e,t,n){},nuLI:function(e,t,n){"use strict";n.r(t);var a=n("cLjf"),s=n.n(a),r=n("hDQ3"),o=n.n(r),i=n("B5LO"),c=n("omMh"),l={data:function(){return{baseInfo:{num:"",agentUserName:"",linkName:"",phone:"",address:"",BD:"",agentUserId:"",loginPhone:"",password:"",account:"",acc:""},baseInfoRules:{num:[{required:!0,message:"请输入代理商名称",trigger:"blur"}],agentUserName:[{required:!0,message:"请输入代理商名称",trigger:"blur"}],linkName:[{required:!0,message:"请输入联系人姓名",trigger:"blur"}],phone:[{required:!0,message:"请输入手机号码",trigger:"blur"},{validator:i.b,trigger:"blur"}],address:[{required:!0,message:"请输入联系地址",trigger:"blur"}],BD:[{required:!0,message:"请输入一位BD同事",trigger:"change"}],project:[{required:!1,type:"array",message:"请输入至少一个经营项目",trigger:"change"}],loginPhone:[{required:!0,message:"请输入登录账号",trigger:"blur"},{validator:i.b,trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:16,message:"请输入6-16位的数字或字母",trigger:"blur"}],acc:[{required:!1,message:"请输入手机号码",trigger:"blur"},{validator:i.b,trigger:"blur"}]},bdList:[],restaurants:"",checkBoxList:null,agentProject:[],allBusinProjects:[]}},computed:{checkedProjects:function(){var e=this,t=[];return this.baseInfo.projects.map(function(n){e.checkBoxList.map(function(e){n===e.name&&t.push(e.id)})}),t}},created:function(){var e=this;return o()(s.a.mark(function t(){return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.$route.query.id){t.next=7;break}return t.next=3,e.getBDList();case 3:return t.next=5,e.getBusinProjects();case 5:return t.next=7,e.getAgentInfo(e.$route.query.id);case 7:case"end":return t.stop()}},t,e)}))()},mounted:function(){},methods:{checkChange:function(){this.$nextTick(function(){this.$refs.baseInfoRef.clearValidate(["preject"])})},getBDList:function(){var e=this;c.a.getBDList(function(t){t&&t.data&&(e.bdList=t.data)},function(){e.bdList=[]})},getBusinProjects:function(e){var t=this;c.a.getBusinProjects().then(function(e){var n=e.data;n instanceof Array?(t.allBusinProjects=n.map(function(e,t){return{name:e.name,id:e.agentBusinessId,isChecked:!1}}),t.$nextTick(function(){this.$refs.baseInfoRef.resetFields()})):(t.checkBoxList=[],t.$nextTick(function(){this.$refs.baseInfoRef.resetFields()}))},function(){t.checkBoxList=[]})},accountOnBlur:function(){var e=this;c.a.getShanghuInfo(this.baseInfo.account).then(function(t){t&&t.data?e.restaurants=(t.data.phone||"")+" ("+(t.data.name||null)+")":""===e.baseInfo.account?e.restaurants="":e.restaurants="不存在此账号!"},function(){""===e.baseInfo.account?e.restaurants="":e.restaurants="不存在此账号!"})},createFilter:function(e){return function(t){return 0===t.value.toLowerCase().indexOf(e.toLowerCase())}},getAgentInfo:function(e){var t=this;this.baseInfo.agentUserId=e,c.a.getAgentInfo(e).then(function(e){var n=e&&e.data;if(n){t.baseInfo={num:n.contractId,agentUserName:n.agentUserName,linkName:n.linkName,phone:n.phone,address:n.address,BD:n.bdId,agentUserId:n.agentUserId,loginPhone:n.loginPhone,password:"",acc:n.phone},t.agentProject=n.agentBusiness;var a=[];t.allBusinProjects&&t.allBusinProjects.length>0&&t.allBusinProjects.map(function(e){t.agentProject&&t.agentProject.map(function(t){t.agentBusinessId===e.id&&(e.isChecked=!0)}),a.push(e)}),t.checkBoxList=a}},function(){})},projectHandler:function(e,t){var n=[];return e&&e.length>0?(e.map(function(e){e.agentBusinessId===t&&n.push(e.name)}),n):[]},updataAgentInfo:function(e){var t=this;c.a.updateAgentInfo(e).then(function(e){e&&t.$router.push({path:"/insideManage/agentRoleManage/agentsList"})},function(){})},handleAccountInfo:function(){var e=this;this.$refs.baseInfoRef.validate(function(t){if(!t)return!1;var n=e.baseInfo,a=[];e.checkBoxList&&e.checkBoxList.length>1&&e.checkBoxList.map(function(e){e.isChecked&&a.push(e.id)});var s={type:1,code:"",agentUserId:n.agentUserId,contractId:n.num,agentUserName:n.agentUserName,linkName:n.linkName,phone:n.phone,address:n.address,bdId:n.BD,loginPhone:n.password,agentBusinessIds:a};e.updataAgentInfo(s)})}}},u=(n("xyo7"),n("ZrdR")),f=Object(u.a)(l,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"content-area bd-manage"},[n("el-menu",{staticClass:"el-menu-demo",attrs:{"default-active":"1",mode:"horizontal"}},[n("el-menu-item",{attrs:{index:"1"}},[e._v("基础信息")])],1),e._v(" "),n("el-form",{ref:"baseInfoRef",staticStyle:{"margin-top":"20px"},attrs:{model:e.baseInfo,rules:e.baseInfo&&e.baseInfoRules,"label-width":"120px","label-position":"left"}},[n("el-form-item",{attrs:{label:"合同编号",prop:"num"}},[n("el-input",{staticClass:"input-300",attrs:{placeholder:"请输入合同编号",maxlength:"64"},model:{value:e.baseInfo.num,callback:function(t){e.$set(e.baseInfo,"num",t)},expression:"baseInfo.num"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"代理商名称",prop:"agentUserName"}},[n("el-input",{staticClass:"input-300",attrs:{placeholder:"请输入代理商名称",maxlength:"64"},model:{value:e.baseInfo.agentUserName,callback:function(t){e.$set(e.baseInfo,"agentUserName",t)},expression:"baseInfo.agentUserName"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"联系人姓名",prop:"linkName"}},[n("el-input",{staticClass:"input-300",attrs:{placeholder:"请输入联系人姓名",maxlength:"32"},model:{value:e.baseInfo.linkName,callback:function(t){e.$set(e.baseInfo,"linkName",t)},expression:"baseInfo.linkName"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"手机号码",prop:"phone"}},[n("el-input",{staticClass:"input-300",attrs:{placeholder:"请输入手机号",type:"number",maxlength:"11"},model:{value:e.baseInfo.phone,callback:function(t){e.$set(e.baseInfo,"phone",t)},expression:"baseInfo.phone"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"联系地址",prop:"address"}},[n("el-input",{staticStyle:{width:"600px"},attrs:{placeholder:"请输入联系地址",maxlength:"256"},model:{value:e.baseInfo.address,callback:function(t){e.$set(e.baseInfo,"address",t)},expression:"baseInfo.address"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"BD同事",prop:"BD"}},[n("el-select",{staticClass:"input-300",attrs:{placeholder:"选择一位BD同事",clearable:""},model:{value:e.baseInfo.BD,callback:function(t){e.$set(e.baseInfo,"BD",t)},expression:"baseInfo.BD"}},e._l(e.bdList,function(e){return n("el-option",{key:e.id,staticStyle:{"text-align":"left"},attrs:{label:e.name,value:e.id}})})),e._v(" "),n("span",{staticClass:"input-anno"},[e._v("选择一位BD同事作为跟进负责人")])],1),e._v(" "),e.checkBoxList&&e.checkBoxList.length>0?n("el-form-item",{ref:"projectsRef",attrs:{label:"经营项目",prop:"project"}},[e._l(e.checkBoxList,function(t,a){return[n("el-checkbox",{key:a,attrs:{checked:t.isChecked,label:t.name},model:{value:t.isChecked,callback:function(n){e.$set(t,"isChecked",n)},expression:"box.isChecked"}})]})],2):e._e(),e._v(" "),n("br"),e._v(" "),n("el-menu",{staticClass:"el-menu-demo",attrs:{"default-active":"1",mode:"horizontal"}},[n("el-menu-item",{attrs:{index:"1"}},[e._v("账号信息")])],1),e._v(" "),n("br"),e._v(" "),n("br"),e._v(" "),n("el-form-item",{attrs:{label:"代理商登录账号",prop:"account"}},[n("el-input",{staticClass:"input-300",attrs:{placeholder:"请输入手机号",type:"number",maxlength:"11"},on:{blur:e.accountOnBlur},model:{value:e.baseInfo.loginPhone,callback:function(t){e.$set(e.baseInfo,"loginPhone",t)},expression:"baseInfo.loginPhone"}}),e._v(" "),n("span",{staticClass:"input-anno"},[e._v("请输入手机号码，如果客户此前有注册乐摇摇商家账号，请输入相同的号码。")])],1),e._v(" "),n("el-form-item",{attrs:{label:"关联商家"}},[n("div",{},[e._v(e._s(e.restaurants||"未找到此账号!"))])]),e._v(" "),n("br"),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.handleAccountInfo}},[e._v("保存")])],1)],1)},[],!1,null,"89ca760c",null);f.options.__file="EditAgent.vue";t.default=f.exports},xyo7:function(e,t,n){"use strict";var a=n("Ry7M");n.n(a).a}}]);