(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0b43"],{"6zW7":function(e,n,t){"use strict";var a=t("LTVQ");t.n(a).a},"7xce":function(e,n,t){"use strict";t.r(n);var a=t("omMh"),o={name:"BdeditView",data:function(){return{BDInfo:{name:"",phone:"1111111",agentUserId:""},BDInfoRules:{name:[{required:!0,message:"请输入BD姓名",trigger:"blur"}]}}},created:function(){this.$route.query.id&&this.getBdInfo(this.$route.query.id,this.$route.query.phone)},methods:{submit:function(){var e=this;this.$refs.InsideManageEditBdRef.validate(function(n){if(!n)return!1;e.editBD({type:0,agentUserId:e.BDInfo.agentUserId,phone:e.BDInfo.phone,agentUserName:e.BDInfo.name})})},getBdInfo:function(e,n){var t=this;a.a.getAgentInfo(e).then(function(e){t.BDInfo.name=e.data.agentUserName||"",t.BDInfo.phone=e.data.phone||"未录入手机号",t.BDInfo.agentUserId=e.data.agentUserId||""},function(e){})},editBD:function(e){var n=this;a.a.updateAgentInfo(e).then(function(e){n.$message({message:"修改成功,稍后跳转!",type:"success"}),setTimeout(function(){n.$router.push({path:"insideManage/bdRoleManage"})},500)},function(e){})}}},i=(t("6zW7"),t("ZrdR")),s=Object(i.a)(o,function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"content-area bd-manage"},[t("el-form",{ref:"InsideManageEditBdRef",staticStyle:{"margin-top":"20px"},attrs:{model:e.BDInfo,rules:e.BDInfoRules,"label-width":"120px","label-position":"left"}},[t("el-form-item",{attrs:{label:"BD姓名",prop:"name"}},[t("el-input",{staticClass:"input-300",attrs:{placeholder:"请输入BD姓名",maxlength:"11"},model:{value:e.BDInfo.name,callback:function(n){e.$set(e.BDInfo,"name",n)},expression:"BDInfo.name"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"手机号码"}},[t("div",[e._v(e._s(e.BDInfo.phone)),t("span",{staticClass:"input-anno"},[e._v("如需更改账号或密码，请联系系统管理员")])])]),e._v(" "),t("br"),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("保存")])],1)],1)},[],!1,null,null,null);s.options.__file="editBd.vue";n.default=s.exports},LTVQ:function(e,n,t){}}]);