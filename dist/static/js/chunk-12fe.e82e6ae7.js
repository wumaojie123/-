(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-12fe"],{"+oFa":function(e,n,t){"use strict";t.r(n);var r=t("cLjf"),a=t.n(r),i=t("hDQ3"),o=t.n(i),s=t("qpgI"),u={name:"ParamC",components:{verfyCode:t("YKrQ").default},data:function(){return{dataList:[],loginFlag:"",uniqueCode:"",verfyCodeVisible:!1,phoneNumber:"",name:""}},created:function(){this.uniqueCode=this.$route.query.uniqueCode,this.loginFlag=this.$route.query.loginFlag,this.phoneNumber=this.$route.query.phoneNumber,this.name=this.$route.query.name,this.query()},methods:{query:function(){var e=this;return o()(a.a.mark(function n(){var t,r;return a.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return t={uniqueCode:e.uniqueCode,loginFlag:e.loginFlag,t:Date.now()},n.next=3,Object(s.q)(t);case 3:4===(r=n.sent).result?e.dataList=r.para.buttons:e.$message({message:r.description||"系统异常",type:"error"});case 5:case"end":return n.stop()}},n,e)}))()},handleClick:function(e,n){var t=this;n.params?this.$router.push({path:"/deviceParamsTyButton",query:{uniqueCode:this.uniqueCode,functionCode:n.functionCode,loginFlag:this.loginFlag,queryFunctionCode:n.queryFunctionCode}}):this.$confirm("确定"+n.name+"?","温馨提示").then(function(){t.handleInfo(n)})},handleInfo:function(e){var n=this;return o()(a.a.mark(function t(){var r,i;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r={uniqueCode:n.uniqueCode,functionCode:e.functionCode},t.next=3,Object(s.o)(r);case 3:1===(i=t.sent).result?n.$message({message:"设置成功",type:"success"}):0===i.result&&n.$message({message:i.description||"系统繁忙",type:"error"});case 5:case"end":return t.stop()}},t,n)}))()},handleSaveBefore:function(){this.verfyCodeVisible=!0},handleSave:function(){var e=this;return o()(a.a.mark(function n(){var t,r;return a.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return t={uniqueCode:e.uniqueCode},n.next=3,Object(s.t)(t);case 3:1===(r=n.sent).result?(e.verfyCodeVisible=!1,e.$message({message:"修改成功",type:"success"}),e.query()):e.$message({message:r.description,type:"error"});case 5:case"end":return n.stop()}},n,e)}))()}}},c=(t("1LP7"),t("ZrdR")),l=Object(c.a)(u,function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"lyy-open"},[t("el-row",{staticStyle:{margin:"20px"}},e._l(e.dataList,function(n,r){return t("el-button",{key:r,attrs:{type:"primary"},on:{click:function(t){e.handleClick(r,n)}}},[e._v(e._s(n.name))])})),e._v(" "),t("div",{staticStyle:{"text-align":"left","margin-top":"60px"}},[t("el-button",{staticStyle:{"margin-left":"20px"},on:{click:function(n){e.query()}}},[e._v("刷新")]),e._v(" "),t("el-button",{staticStyle:{"margin-left":"60px"},attrs:{type:"primary"},on:{click:e.handleSave}},[e._v("保存设置")])],1),e._v(" "),t("verfyCode",{attrs:{"phone-number":e.phoneNumber,name:e.name},on:{"on-OK":e.handleSave},model:{value:e.verfyCodeVisible,callback:function(n){e.verfyCodeVisible=n},expression:"verfyCodeVisible"}})],1)},[],!1,null,null,null);l.options.__file="deviceParamsTy.vue";n.default=l.exports},"1LP7":function(e,n,t){"use strict";var r=t("58rZ");t.n(r).a},"58rZ":function(e,n,t){}}]);