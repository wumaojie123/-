(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-09ec"],{"14Xm":function(t,e,r){t.exports=r("u938")},"8YNn":function(t,e,r){"use strict";r.r(e);var n=r("14Xm"),o=r.n(n),a=r("D3Ub"),i=r.n(a),u=r("qpgI"),c=r("mG/D"),s={data:function(){return{list:[],colums:[{key:"equipmentType",label:"设备类型"},{key:"communicationText",label:"通信方式"},{key:"equipmentCount",label:"注册设备总数(台)"},{key:"registeredCount",label:"注册成功设备(台)"},{key:"unregisteredCount",label:"注册失败设备(台)"},{key:"distributor",label:"绑定商家"},{key:"created",label:"操作时间"},{key:"createdby",label:"操作人"}],pageInfo:{total:0,pageSize:10,currPage:1},list2:[],colums2:[{key:"equipmentType",label:"设备类型"},{key:"value",label:"设备编号"},{key:"statusText",label:"注册状态"},{key:"reasonText",label:"原因"}],pageInfo2:{total:0,pageSize:10,currPage:1},dialogFormVisible:!1,selectItem:{}}},created:function(){this.queryList()},methods:{queryList:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return i()(o.a.mark(function r(){var n,a,i;return o.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return t.list=[],t.pageInfo.currPage=e,n={pageSize:t.pageInfo.pageSize,pageIndex:t.pageInfo.currPage},r.next=5,Object(u.m)(n);case 5:0===(a=r.sent).result&&(t.listLoading=!1,a.data?(i=(i=a.data.items||[]).map(function(t){return t.communicationText=c.a[t.communication],t}),t.list=i,t.pageInfo.total=a.data.total||0):t.pageInfo.total=0);case 7:case"end":return r.stop()}},r,t)}))()},queryDetailList:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return i()(o.a.mark(function r(){var n,a,i;return o.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return t.list2=[],t.pageInfo2.currPage=e,n={pageSize:t.pageInfo2.pageSize,pageIndex:t.pageInfo2.currPage,agentEquipmentRegisteredLogId:t.selectItem.agentEquipmentRegisteredLogId},r.next=5,Object(u.k)(n);case 5:0===(a=r.sent).result&&(t.listLoading=!1,a.data?(i=(i=a.data.items||[]).map(function(e){e.equipmentType=t.selectItem.equipmentType;e.statusText={0:"待注册",1:"成功",2:"失败"}[e.status];return e.reasonText={0:"未找到设备",1:"已绑定",2:"失败"}[e.reason],e}),t.list2=i,t.pageInfo2.total=a.data.total||0):t.pageInfo2.total=0);case 7:case"end":return r.stop()}},r,t)}))()},handleItem:function(t){this.selectItem=this.list[t],this.queryDetailList(1),this.dialogFormVisible=!0},handleSizeChange:function(t){this.pageInfo.pageSize=t,this.pageInfo.total=0,this.queryList(1)},handleCurrentChange:function(t){this.queryList(t)},handleSizeChange2:function(t){this.pageInfo2.pageSize=t,this.pageInfo2.total=0,this.queryDetailList(1)},handleCurrentChange2:function(t){this.queryDetailList(t)}}},l=r("KHd+"),f=Object(l.a)(s,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"content-area"},[r("el-table",{staticStyle:{width:"100%","margin-bottom":"20px","min-height":"600px"},attrs:{data:t.list,border:"","highlight-current-row":""}},[t._l(t.colums,function(t,e){return r("el-table-column",{key:e,attrs:{prop:t.key,label:t.label,width:t.width,sortable:t.sortable,align:"center"}})}),t._v(" "),r("el-table-column",{attrs:{label:"操作",width:"155",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{type:"primary"},on:{click:function(r){t.handleItem(e.$index)}}},[t._v("查看注册详情")])]}}])})],2),t._v(" "),r("el-pagination",{attrs:{"page-sizes":[10,20,30,40],"page-size":t.pageInfo.pageSize,total:t.pageInfo.total,"current-page":t.pageInfo.currPage,background:"",layout:"total, prev, pager, next, sizes, jumper"},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}),t._v(" "),r("el-dialog",{attrs:{visible:t.dialogFormVisible,title:"设备注册详情"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[r("el-table",{staticStyle:{width:"100%","margin-bottom":"20px"},attrs:{data:t.list2,border:"","highlight-current-row":"",height:"450"}},t._l(t.colums2,function(t,e){return r("el-table-column",{key:e,attrs:{prop:t.key,label:t.label,width:t.width,sortable:t.sortable,align:"center"}})})),t._v(" "),r("el-pagination",{attrs:{"page-sizes":[10,20,30,40],"page-size":t.pageInfo2.pageSize,total:t.pageInfo2.total,"current-page":t.pageInfo2.currPage,background:"",layout:"total, prev, pager, next, sizes, jumper"},on:{"size-change":t.handleSizeChange2,"current-change":t.handleCurrentChange2}}),t._v(" "),r("div",{staticClass:"dialog-footer",staticStyle:{"text-align":"center"},attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("关闭")])],1)],1)],1)},[],!1,null,null,null);f.options.__file="registerRecord.vue";e.default=f.exports},D3Ub:function(t,e,r){"use strict";e.__esModule=!0;var n,o=r("4d7F"),a=(n=o)&&n.__esModule?n:{default:n};e.default=function(t){return function(){var e=t.apply(this,arguments);return new a.default(function(t,r){return function n(o,i){try{var u=e[o](i),c=u.value}catch(t){return void r(t)}if(!u.done)return a.default.resolve(c).then(function(t){n("next",t)},function(t){n("throw",t)});t(c)}("next")})}}},ls82:function(t,e){!function(e){"use strict";var r,n=Object.prototype,o=n.hasOwnProperty,a="function"==typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",u=a.asyncIterator||"@@asyncIterator",c=a.toStringTag||"@@toStringTag",s="object"==typeof t,l=e.regeneratorRuntime;if(l)s&&(t.exports=l);else{(l=e.regeneratorRuntime=s?t.exports:{}).wrap=w;var f="suspendedStart",h="suspendedYield",p="executing",g="completed",d={},m={};m[i]=function(){return this};var y=Object.getPrototypeOf,v=y&&y(y(z([])));v&&v!==n&&o.call(v,i)&&(m=v);var b=O.prototype=L.prototype=Object.create(m);j.prototype=b.constructor=O,O.constructor=j,O[c]=j.displayName="GeneratorFunction",l.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===j||"GeneratorFunction"===(e.displayName||e.name))},l.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,O):(t.__proto__=O,c in t||(t[c]="GeneratorFunction")),t.prototype=Object.create(b),t},l.awrap=function(t){return{__await:t}},I(k.prototype),k.prototype[u]=function(){return this},l.AsyncIterator=k,l.async=function(t,e,r,n){var o=new k(w(t,e,r,n));return l.isGeneratorFunction(e)?o:o.next().then(function(t){return t.done?t.value:o.next()})},I(b),b[c]="Generator",b[i]=function(){return this},b.toString=function(){return"[object Generator]"},l.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},l.values=z,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(q),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,o){return u.type="throw",u.arg=t,e.next=n,o&&(e.method="next",e.arg=r),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],u=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=o.call(i,"catchLoc"),s=o.call(i,"finallyLoc");if(c&&s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var a=n;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,d):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),q(r),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;q(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:z(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),d}}}function w(t,e,r,n){var o=e&&e.prototype instanceof L?e:L,a=Object.create(o.prototype),i=new S(n||[]);return a._invoke=function(t,e,r){var n=f;return function(o,a){if(n===p)throw new Error("Generator is already running");if(n===g){if("throw"===o)throw a;return C()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var u=E(i,r);if(u){if(u===d)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=g,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=p;var c=x(t,e,r);if("normal"===c.type){if(n=r.done?g:h,c.arg===d)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=g,r.method="throw",r.arg=c.arg)}}}(t,r,i),a}function x(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}function L(){}function j(){}function O(){}function I(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function k(t){var e;this._invoke=function(r,n){function a(){return new Promise(function(e,a){!function e(r,n,a,i){var u=x(t[r],t,n);if("throw"!==u.type){var c=u.arg,s=c.value;return s&&"object"==typeof s&&o.call(s,"__await")?Promise.resolve(s.__await).then(function(t){e("next",t,a,i)},function(t){e("throw",t,a,i)}):Promise.resolve(s).then(function(t){c.value=t,a(c)},i)}i(u.arg)}(r,n,e,a)})}return e=e?e.then(a,a):a()}}function E(t,e){var n=t.iterator[e.method];if(n===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=r,E(t,e),"throw"===e.method))return d;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var o=x(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,d;var a=o.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,d):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,d)}function _(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function q(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(_,this),this.reset(!0)}function z(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,a=function e(){for(;++n<t.length;)if(o.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=r,e.done=!0,e};return a.next=a}}return{next:C}}function C(){return{value:r,done:!0}}}(function(){return this}()||Function("return this")())},"mG/D":function(t,e,r){"use strict";r.d(e,"b",function(){return n}),r.d(e,"c",function(){return o}),r.d(e,"a",function(){return a});var n=[{value:"CDZ",label:"充电桩"}],o={CDZ:"充电桩"},a={0:"无",1:"脉冲",2:"串口"}},qpgI:function(t,e,r){"use strict";r.d(e,"t",function(){return o}),r.d(e,"n",function(){return a}),r.d(e,"b",function(){return i}),r.d(e,"h",function(){return u}),r.d(e,"e",function(){return c}),r.d(e,"u",function(){return s}),r.d(e,"g",function(){return l}),r.d(e,"m",function(){return f}),r.d(e,"k",function(){return h}),r.d(e,"l",function(){return p}),r.d(e,"a",function(){return g}),r.d(e,"c",function(){return d}),r.d(e,"i",function(){return m}),r.d(e,"r",function(){return y}),r.d(e,"s",function(){return v}),r.d(e,"p",function(){return b}),r.d(e,"d",function(){return w}),r.d(e,"f",function(){return x}),r.d(e,"j",function(){return L}),r.d(e,"q",function(){return j}),r.d(e,"o",function(){return O});var n=r("t3Un");function o(t){return Object(n.a)({url:"/rest/factory/unbundling",method:"post",data:t})}function a(t){return Object(n.a)({url:"/rest/factory/savaEquipmentService",method:"post",data:t})}function i(t){return Object(n.a)({url:"/rest/factory/batchRegisteredEquipment",method:"post",data:t})}function u(){return Object(n.a)({url:"/query/merchants",method:"get"})}function c(t){return Object(n.a)({url:"/rest/factory/dateleEquipmentService",method:"post",data:t})}function s(t){return Object(n.a)({url:"/rest/factory/updateEquipmentService",method:"post",data:t})}function l(t){return Object(n.a)({url:"/rest/factory/groupServiceList",method:"get",params:t})}function f(t){return Object(n.a)({url:"/rest/factory/registeredLogList",method:"get",params:t})}function h(t){return Object(n.a)({url:"/rest/factory/registeredDetailList",method:"get",params:t})}function p(t){return Object(n.a)({url:"/rest/factory/registeredList",method:"get",params:t})}function g(t){return Object(n.a)({url:"/rest/factory/agentGroupServiceList",method:"get",params:t})}function d(t){return Object(n.a)({url:"/rest/setting/lyyopen/load",method:"get",params:t})}function m(t){return Object(n.a)({url:"/rest/setting/lyyopen/query",method:"post",data:t})}function y(t){return Object(n.a)({url:"/rest/setting/setting/ty",method:"get",params:t})}function v(t){return Object(n.a)({url:"/rest/setting/queryEquipment/ty",method:"get",params:t})}function b(t){return Object(n.a)({url:"/rest/setting/button/setting",method:"get",params:t})}function w(t){return Object(n.a)({url:"/rest/setting/cxNewEquipment",method:"get",params:t})}function x(t){return Object(n.a)({url:"/rest/setting/getEquipmentParamDef",method:"get",params:t})}function L(t){return Object(n.a)({url:"/rest/setting/readNewEquipment",method:"get",params:t})}function j(t){return Object(n.a)({url:"/rest/setting/szNewEquipment",method:"get",params:t})}function O(t){return Object(n.a)({url:"/rest/setting/setEquipment",method:"post",data:t})}},u938:function(t,e,r){var n=function(){return this}()||Function("return this")(),o=n.regeneratorRuntime&&Object.getOwnPropertyNames(n).indexOf("regeneratorRuntime")>=0,a=o&&n.regeneratorRuntime;if(n.regeneratorRuntime=void 0,t.exports=r("ls82"),o)n.regeneratorRuntime=a;else try{delete n.regeneratorRuntime}catch(t){n.regeneratorRuntime=void 0}}}]);