(window.webpackJsonp=window.webpackJsonp||[]).push([["PWUT"],{PWUT:function(e,a,t){"use strict";t.r(a);var s=t("cLjf"),r=t.n(s),n=t("hDQ3"),l=t.n(n),u=t("qpgI"),i={name:"DBJ",components:{verfyCode:t("YKrQ").default},data:function(){return{params:{},dataInfo:{},saveData:{pulseWidth:"",pulseInterval:"",battery:""},verfyCodeVisible:!1,phoneNumber:"",name:""}},created:function(){this.params=this.$route.query,this.phoneNumber=this.$route.query.phoneNumber,this.name=this.$route.query.name,this.query()},methods:{query:function(){var e=this;return l()(r.a.mark(function a(){var t;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t={value:e.params.value,data:1},a.next=3,Object(u.d)(t);case 3:1===a.sent.result?e.getEquipmentParamDef():e.$message({message:"参数读取失败,不能设置",type:"error"});case 5:case"end":return a.stop()}},a,e)}))()},getEquipmentParamDef:function(){var e=this;return l()(r.a.mark(function a(){var t,s;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t={typeValue:e.params.typeValue,value:e.params.value},a.next=3,Object(u.j)(t);case 3:1===(s=a.sent).result&&(e.dataInfo=s.para,e.saveData.pulseWidth=e.dataInfo.pulseWidth1,e.saveData.pulseInterval=e.dataInfo.pulseInterval1,e.saveData.battery=e.dataInfo.battery);case 5:case"end":return a.stop()}},a,e)}))()},saveNewEquipmentBefore:function(){this.saveData.pulseWidth<10||this.saveData.pulseWidth>1e3?this.$message({message:"脉冲宽度为10~1000整数",type:"error"}):this.saveData.pulseInterval<10||this.saveData.pulseInterval>1e3?this.$message({message:'"脉冲间隔为10~1000整数',type:"error"}):this.verfyCodeVisible=!0},saveNewEquipment:function(){var e=this;return l()(r.a.mark(function a(){var t;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(!(e.saveData.pulseWidth<10||e.saveData.pulseWidth>1e3)){a.next=3;break}return e.$message({message:"脉冲宽度为10~1000整数",type:"error"}),a.abrupt("return");case 3:if(!(e.saveData.pulseInterval<10||e.saveData.pulseInterval>1e3)){a.next=6;break}return e.$message({message:'"脉冲间隔为10~1000整数',type:"error"}),a.abrupt("return");case 6:return t={value:e.params.value,pulseWidth1:e.saveData.pulseWidth,pulseInterval1:e.saveData.pulseInterval,battery:e.saveData.battery,pulseWidth2:0,pulseInterval2:0,gift:0,drag:0,interfaceType:0,interfaceBaudRate:0,noteTypes:0},a.next=9,Object(u.p)(t);case 9:1===a.sent.result&&(e.verfyCodeVisible=!1,e.$message({message:"设置成功",type:"success"}),setTimeout(function(){e.query()},1500));case 11:case"end":return a.stop()}},a,e)}))()}}},p=t("ZrdR"),o=Object(p.a)(i,function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticStyle:{margin:"40px"}},[t("div",{staticStyle:{"margin-bottom":"20px","font-size":"14px"}},[e._v(e._s(e.params.equipmentTypeName)+": "+e._s(e.params.value))]),e._v(" "),t("el-form",[t("div",[t("el-form-item",{attrs:{label:"脉冲宽度"}},[t("el-input",{staticClass:"input-300",attrs:{placeholder:"请输入10~1000之间整数",type:"number",maxlength:"4",clearable:""},model:{value:e.saveData.pulseWidth,callback:function(a){e.$set(e.saveData,"pulseWidth",a)},expression:"saveData.pulseWidth"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"脉冲间隔"}},[t("el-input",{staticClass:"input-300",attrs:{placeholder:"请输入10~1000之间整数",type:"number",maxlength:"4",clearable:""},model:{value:e.saveData.pulseInterval,callback:function(a){e.$set(e.saveData,"pulseInterval",a)},expression:"saveData.pulseInterval"}})],1)],1),e._v(" "),t("el-form-item",{attrs:{label:"待机电平"}},[t("el-radio",{attrs:{label:"0"},model:{value:e.saveData.battery,callback:function(a){e.$set(e.saveData,"battery",a)},expression:"saveData.battery"}},[e._v("常开")]),e._v(" "),t("el-radio",{attrs:{label:"1"},model:{value:e.saveData.battery,callback:function(a){e.$set(e.saveData,"battery",a)},expression:"saveData.battery"}},[e._v("常闭")])],1)],1),e._v(" "),t("div",{staticStyle:{"text-align":"left","margin-top":"80px"}},[t("el-button",{on:{click:e.query}},[e._v("重新加载")]),e._v(" "),t("el-button",{staticStyle:{"margin-left":"100px"},attrs:{type:"primary"},on:{click:e.saveNewEquipmentBefore}},[e._v("保存设置")])],1),e._v(" "),t("verfyCode",{attrs:{"phone-number":e.phoneNumber,name:e.name},on:{"on-OK":e.saveNewEquipment},model:{value:e.verfyCodeVisible,callback:function(a){e.verfyCodeVisible=a},expression:"verfyCodeVisible"}})],1)},[],!1,null,null,null);o.options.__file="deviceParamsOthers.vue";a.default=o.exports}}]);