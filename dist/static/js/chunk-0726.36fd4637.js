(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0726","YKrQ"],{"3B1E":function(e,t,n){},UAQx:function(e,t,n){"use strict";n.r(t);var s=n("14Xm"),i=n.n(s),a=n("D3Ub"),r=n.n(a),o=n("qpgI"),l={1:"更换4G版本",2:"频繁离线",3:"系统不好用",4:"场地信号不好",5:"撤场调整",6:"支付设备坏了",7:"机器转手",8:"更换WIFI版本",9:"测试设备"},u={components:{verfyCode:n("YKrQ").default},data:function(){return{list:l,others:"",lyyEquipmentId:"",equipmentType:"",checkList:[],eqValue:"",disable:!1,verfyCodeVisible:!1,phoneNumber:"",name:"",lyyEquipmentValue:""}},created:function(){this.lyyEquipmentId=this.$route.query.lyyEquipmentId,this.lyyEquipmentValue=this.$route.query.value,this.eqValue=this.$route.query.value,this.equipmentType=this.$route.query.equipmentType,this.phoneNumber=this.$route.query.phoneNumber,this.name=this.$route.query.name},methods:{handleUnbindBefore:function(){""!==this.others||0!==this.checkList.length?this.verfyCodeVisible=!0:this.$message({message:"请选择或输入解绑原因",type:"error"})},handleUnbind:function(){var e=this;return r()(i.a.mark(function t(){var n,s,a;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.disable){t.next=2;break}return t.abrupt("return");case 2:return n=[],e.others&&(n=[e.others]),e.checkList.length&&(n=n.concat(e.checkList)),s={lyyEquipmentId:e.lyyEquipmentId,reasons:n},e.disable=!0,setTimeout(function(){e.disable=!1},2e3),t.next=10,Object(o.A)(s);case 10:a=t.sent,e.disable=!1,0===a.result?(e.verfyCodeVisible=!1,e.$message({message:"设备解绑成功",type:"success"}),window.history.go(-1)):e.$message({message:"解绑失败",type:"error"});case 13:case"end":return t.stop()}},t,e)}))()},handleCancel:function(){window.history.go(-1)}}},c=(n("zR97"),n("KHd+")),d=Object(c.a)(u,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"content-area"},[n("div",{staticClass:"text-info"},[e._v("\n    设备编号： "+e._s("SHJ"===e.equipmentType?"售货机":"充电桩")+e._s(e.lyyEquipmentValue)+"\n  ")]),e._v(" "),n("p",{staticClass:"text-info"},[e._v("解绑原因：")]),e._v(" "),n("el-checkbox-group",{staticClass:"text-info",model:{value:e.checkList,callback:function(t){e.checkList=t},expression:"checkList"}},e._l(e.list,function(t,s){return n("el-checkbox",{key:s,attrs:{label:t,size:"medium"},model:{value:e.others,callback:function(t){e.others=t},expression:"others"}})})),e._v(" "),n("p",{staticClass:"text-info"},[e._v("其他原因:")]),e._v(" "),n("el-input",{staticStyle:{width:"400px"},attrs:{rows:4,type:"textarea",placeholder:"请输入解绑原因",maxlength:"20"},model:{value:e.others,callback:function(t){e.others=t},expression:"others"}}),e._v(" "),n("p",{staticClass:"text-info"},[e._v("设备损坏、频繁离线、信号问题等设备问题，乐摇摇提供最优的设备升级方案，升级热线服务时间：每天9:00-21:00")]),e._v(" "),n("div",{staticStyle:{"margin-top":"20px"}},[n("el-button",{on:{click:e.handleCancel}},[e._v("取消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.handleUnbindBefore}},[e._v("确定解绑")])],1),e._v(" "),n("verfyCode",{attrs:{"phone-number":e.phoneNumber,name:e.name},on:{"on-OK":e.handleUnbind},model:{value:e.verfyCodeVisible,callback:function(t){e.verfyCodeVisible=t},expression:"verfyCodeVisible"}})],1)},[],!1,null,"4a5dc790",null);d.options.__file="unregister.vue";t.default=d.exports},YKrQ:function(e,t,n){"use strict";n.r(t);var s=n("14Xm"),i=n.n(s),a=n("D3Ub"),r=n.n(a),o=n("qpgI"),l={props:{value:{type:Boolean,default:!1},phoneNumber:{type:String,default:""},name:{type:String,default:""}},data:function(){return{verifyCode:"",disabled:!0}},computed:{info:function(){return this.name+"-"+this.phoneNumber}},methods:{handleSend:function(){var e=this;return r()(i.a.mark(function t(){var n;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.disabled){t.next=2;break}return t.abrupt("return");case 2:return e.disabled=!1,setTimeout(function(){e.disabled=!0},2e3),t.next=6,Object(o.F)({phoneNumber:e.phoneNumber});case 6:n=t.sent,e.disabled=!0,0===n.result?e.$message({message:"获取短信验证码成功",type:"success"}):e.$message({message:"获取短信验证码失败",type:"error"});case 9:case"end":return t.stop()}},t,e)}))()},handleCancel:function(){this.disabled=!0,this.$emit("input",!1)},handleOK:function(){this.verifyCode?this.handlevalidate():this.$message({message:"请输入短信验证码",type:"error"})},handlevalidate:function(){var e=this;return r()(i.a.mark(function t(){return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(o.E)({phoneNumber:e.phoneNumber,verifyCode:e.verifyCode});case 2:0===t.sent.result?(e.disabled=!0,e.$emit("on-OK")):e.$message({message:"短信验校验失败",type:"success"});case 4:case"end":return t.stop()}},t,e)}))()}}},u=n("KHd+"),c=Object(u.a)(l,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-dialog",{attrs:{visible:e.value,"close-on-click-modal":!1,title:"操作验证",width:"45%"},on:{"update:visible":function(t){e.value=t}}},[n("el-form",{attrs:{"label-width":"120px","label-position":"right"}},[n("el-form-item",{attrs:{label:"设备所属商家",prop:"description"}},[n("el-input",{staticClass:"input-300",attrs:{placeholder:"请输入菜单名称",maxlength:"6",readonly:""},model:{value:e.info,callback:function(t){e.info=t},expression:"info"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"操作验证码",prop:"price"}},[n("el-input",{staticClass:"input-300",attrs:{type:"tel",clearable:"",maxlength:"6"},model:{value:e.verifyCode,callback:function(t){e.verifyCode=t},expression:"verifyCode"}}),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.handleSend}},[e._v("获取验证码")])],1),e._v(" "),n("p",{staticStyle:{color:"red","margin-left":"120px"}},[e._v("请联系商家获取短信验证码")])],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:e.handleCancel}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.handleOK}},[e._v("确定")])],1)],1)},[],!1,null,null,null);c.options.__file="verfyCode.vue";t.default=c.exports},zR97:function(e,t,n){"use strict";var s=n("3B1E");n.n(s).a}}]);