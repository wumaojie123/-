(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-98bc"],{"1FWb":function(e,t,a){"use strict";var n=a("gSzn");a.n(n).a},Df2f:function(e,t,a){"use strict";a.r(t);var n=a("c1P4"),s={data:function(){return{baseInfo:{userName:"",linkName:"",merchantName:"",adOrgId:"",merchantAuthority:"",description:""},check:!1,baseInfoRules:{userName:[{required:!0,message:"请输入商家账号",trigger:"blur"}]}}},created:function(){var e=JSON.parse(decodeURIComponent(this.$route.params.info));this.baseInfo.userName=e.userName,this.baseInfo.linkName=e.linkName,this.baseInfo.merchantName=e.merchantName,this.baseInfo.adOrgId=e.adOrgId,this.baseInfo.description=e.description,this.check=1===e.merchantAuthority},methods:{handleBaseInfo:function(){var e=this;this.$refs.baseInfoRef.validate(function(t){if(!t)return!1;e.handleAngentInfo()})},handleAngentInfo:function(){var e=this,t=this.baseInfo;t.merchantAuthority=this.check?1:0,Object(n.e)(t).then(function(t){0===t.result?(e.$message({message:"编辑商家信息成功",type:"success"}),e.$router.go(-1)):e.$message({message:"编辑商家信息失败",type:"error"})})}}},r=(a("1FWb"),a("ZrdR")),o=Object(r.a)(s,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"content-area"},[a("el-form",{ref:"baseInfoRef",staticStyle:{"margin-top":"20px"},attrs:{model:e.baseInfo,rules:e.baseInfoRules,"label-width":"120px","label-position":"right"}},[a("el-form-item",{attrs:{label:"商家账号",prop:"userName"}},[a("el-input",{staticClass:"input-300",attrs:{placeholder:"请输入商家账号",type:"text",maxlength:"11",disabled:""},model:{value:e.baseInfo.userName,callback:function(t){e.$set(e.baseInfo,"userName",t)},expression:"baseInfo.userName"}}),e._v(" "),a("span",{staticClass:"input-anno"},[e._v("账号暂不支持修改")])],1),e._v(" "),a("el-form-item",{attrs:{label:"商家名称"}},[a("el-input",{staticClass:"input-300",attrs:{placeholder:"请输入商家名称",type:"tel",maxlength:"16",disabled:""},model:{value:e.baseInfo.merchantName,callback:function(t){e.$set(e.baseInfo,"merchantName",t)},expression:"baseInfo.merchantName"}}),e._v(" "),a("span",{staticClass:"input-anno"},[e._v("“商家名称”设置后，商家可以在手机B端后台修改。修改路径：我的 > 品牌信息设置 > 商户品牌名称")])],1),e._v(" "),a("el-form-item",{attrs:{label:"联系人姓名"}},[a("el-input",{staticClass:"input-300",attrs:{placeholder:"请输入联系人姓名",type:"text",maxlength:"16",disabled:""},model:{value:e.baseInfo.linkName,callback:function(t){e.$set(e.baseInfo,"linkName",t)},expression:"baseInfo.linkName"}}),e._v(" "),a("span",{staticClass:"input-anno"},[e._v("“姓名”设置后，将显示在手机B端后台的账号信息中，且无法修改。未设置的，请通知商家前往B端后台设置")])],1),e._v(" "),a("el-form-item",{attrs:{label:"备注信息"}},[a("el-input",{staticClass:"input-300",staticStyle:{width:"550px"},attrs:{placeholder:"请输入10字以内备注信息（备注信息仅供你自己查看，便于记录商家信息）",type:"text",maxlength:"10",clearable:""},model:{value:e.baseInfo.description,callback:function(t){e.$set(e.baseInfo,"description",t)},expression:"baseInfo.description"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商家权限"}},[a("el-checkbox-group",{model:{value:e.check,callback:function(t){e.check=t},expression:"check"}},[a("el-checkbox",{attrs:{label:"禁用设备/启用设备"}}),e._v(" "),a("span",{staticClass:"input-anno"},[e._v("（取消勾选后，该商家在B端后台则无权限 “禁用设备” 和 “启用设备”，此功能仅对与代理关联的设备生效）")])],1)],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.handleAngentInfo}},[e._v("保存")])],1)],1)],1)},[],!1,null,null,null);o.options.__file="EditBusiness.vue";t.default=o.exports},c1P4:function(e,t,a){"use strict";a.d(t,"d",function(){return s}),a.d(t,"b",function(){return r}),a.d(t,"e",function(){return o}),a.d(t,"a",function(){return i}),a.d(t,"c",function(){return c});var n=a("t3Un");function s(e){return Object(n.a)({url:"/merchant/manage/query",method:"post",data:e})}function r(e){return Object(n.a)({url:"/merchant/childMerchants/query",method:"get",params:e})}function o(e){return Object(n.a)({url:"/merchant/updateMerchant",method:"post",data:e})}function i(e){return Object(n.a)({url:"/merchant/addMerchant",method:"post",data:e})}function c(e){return Object(n.a)({url:"/merchant/deleteMerchant",method:"post",data:e})}},gSzn:function(e,t,a){}}]);