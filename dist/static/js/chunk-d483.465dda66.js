(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-d483"],{AzRD:function(t,a,s){},BZMP:function(t,a,s){"use strict";s.r(a);var n=s("t3Un");var i={name:"BaseInfo",data:function(){return{infoData:{},msg:"以下信息用户暂时不能主动修改，如需调整，请联系业务客服。"}},mounted:function(){var t=this;Object(n.a)({url:"/agentManage/getAgent",method:"get"}).then(function(a){t.infoData=a.data||{}})}},e=(s("BinK"),s("ZrdR")),l=Object(e.a)(i,function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("el-main",{staticClass:"base-info"},[s("el-alert",{staticClass:"info",attrs:{title:t.msg,closable:!1,type:"warning"}}),t._v(" "),s("div",{staticClass:"list-box"},[s("ul",{staticClass:"ul"},[s("li",[s("p",{staticClass:"left"},[t._v("合同编号：")]),t._v(" "),s("p",[t._v(t._s(t.infoData.contractId))])]),t._v(" "),s("li",[s("p",{staticClass:"left"},[t._v("代理商名称：")]),t._v(" "),s("p",[t._v(t._s(t.infoData.agentUserName))])]),t._v(" "),s("li",[s("p",{staticClass:"left"},[t._v("联系人姓名：")]),t._v(" "),s("p",[t._v(t._s(t.infoData.linkName))])]),t._v(" "),s("li",[s("p",{staticClass:"left"},[t._v("手机号码：")]),t._v(" "),s("p",[t._v(t._s(t.infoData.phone))])]),t._v(" "),s("li",[s("p",{staticClass:"left"},[t._v("联系地址： ")]),t._v(" "),s("p",[t._v(t._s(t.infoData.address))])]),t._v(" "),s("li",[s("p",{staticClass:"left"},[t._v("关联商家： ")]),t._v(" "),s("p",[t._v(t._s(t.infoData.loginPhone))])]),t._v(" "),s("li",[s("p",{staticClass:"left"},[t._v("业务客服：")]),t._v(" "),s("p",[t._v(t._s(t.infoData.bdName))])]),t._v(" "),s("li",[s("p",{staticClass:"left"},[t._v("经营项目：")]),t._v(" "),s("p",[t._v(t._s(t.infoData.bunissesNames))])])])])],1)},[],!1,null,"a3aa2bbe",null);l.options.__file="baseInfo.vue";a.default=l.exports},BinK:function(t,a,s){"use strict";var n=s("AzRD");s.n(n).a}}]);