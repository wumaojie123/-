(window.webpackJsonp=window.webpackJsonp||[]).push([["jujd"],{jujd:function(t,e,s){"use strict";s.r(e);var o={computed:{roles:function(){return this.$store.getters.roles},switchRoles:{get:function(){return this.roles[0]},set:function(t){var e=this;this.$store.dispatch("ChangeRoles",t).then(function(){e.$emit("change")})}}}},i=s("KHd+"),n=Object(i.a)(o,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticStyle:{"margin-bottom":"15px"}},[t._v(t._s(t.$t("permission.roles"))+"： "+t._s(t.roles))]),t._v("\n  "+t._s(t.$t("permission.switchRoles"))+"：\n  "),s("el-radio-group",{model:{value:t.switchRoles,callback:function(e){t.switchRoles=e},expression:"switchRoles"}},[s("el-radio-button",{attrs:{label:"editor"}}),t._v(" "),s("el-radio-button",{attrs:{label:"admin"}})],1)],1)},[],!1,null,null,null);n.options.__file="SwitchRoles.vue";e.default=n.exports}}]);