(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-dcc1"],{EnMo:function(t,e,r){"use strict";r.r(e);var n=r("cLjf"),o=r.n(n),i=r("hDQ3"),a=r.n(i),c=r("88Rz"),u=r.n(c),s=(r("bGD1"),{name:"China",props:{dataList:{type:Array,default:function(){return[]}},totalAgent:{type:Number,default:0}},data:function(){return{localList:this.dataList,echartData:[],geoCoordMap:{}}},computed:{total:function(){var t=0;return this.localList.map(function(e){t+=e.lyyDistributorCount||0}),t}},watch:{dataList:function(t){this.localList=t},localList:function(t){var e=[],r={};t.map(function(t){var n={name:t.cityName,value:t.lyyDistributorCount,equipmentCount:t.equipmentCount};r[t.cityName]=[parseFloat(t.lng),parseFloat(t.lat)],e.push(n)}),this.echartData=e,this.geoCoordMap=r,this.initDatas()}},methods:{initDatas:function(){var t=this;return a()(o.a.mark(function e(){var r,n,i,a,c,s,l;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:r=u.a.init(document.getElementById("china")),n="china",i=t.echartData,a=t.geoCoordMap,c=[],l={tooltip:{padding:0,enterable:!0,transitionDuration:1,textStyle:{color:"#000",decoration:"none"},grid:{bottom:"6%"},formatter:function(t,e){if(!(t.dataIndex<0))return'<div class="hover-bg" >\n                <p style="color:#fff;font-size:12px;">\n                  '+c[t.dataIndex].name+'</p>\n                <p style="color:#fff;font-size:12px;">\n                  投放商'+c[t.dataIndex].distributorCount+'个\n                <p style="color:#fff;font-size:12px;">\n                  共计投放设备'+c[t.dataIndex].equipmentCount+"台\n                </p>\n              </div>"}},geo:{show:!0,zoom:1.1,map:n,label:{normal:{show:!1},emphasis:{show:!1}},regions:[{name:"南海诸岛",value:0,itemStyle:{normal:{opacity:0,label:{show:!1}}}}],roam:!1,itemStyle:{normal:{areaColor:"#023677",borderColor:"#1180c7"},emphasis:{areaColor:"#4499d0"}}},series:[{name:"散点",type:"scatter",coordinateSystem:"geo",data:(s=function(t){for(var e=[],r=0;r<t.length;r++){var n=a[t[r].name];n&&e.push({name:t[r].name,distributorCount:t[r].value,equipmentCount:t[r].equipmentCount,value:n.concat(t[r].value)})}return c=e,e})(i),symbolSize:function(t){return t[2]/10},label:{normal:{formatter:"{b}",position:"right",show:!0},emphasis:{show:!0}},itemStyle:{normal:{color:"#fff"}}},{type:"map",map:n,geoIndex:0,aspectScale:.75,showLegendSymbol:!1,label:{normal:{show:!0},emphasis:{show:!1,textStyle:{color:"#fff"}}},roam:!0,itemStyle:{normal:{areaColor:"#031525",borderColor:"#3B5077"},emphasis:{areaColor:"#2B91B7"}},animation:!1,data:i},{name:"点",type:"scatter",coordinateSystem:"geo",symbolSize:function(t){return 10},zlevel:6},{name:"Top 1",type:"effectScatter",coordinateSystem:"geo",data:s(i),symbolSize:function(t){return 10},showEffectOn:"render",rippleEffect:{brushType:"stroke"},hoverAnimation:!0,label:{normal:{formatter:"{b}",position:"left",show:!1}},itemStyle:{normal:{color:"#44CFD9",shadowBlur:10,shadowColor:"#44CFD9"}},zlevel:1}]},r.setOption(l);case 8:case"end":return e.stop()}},e,t)}))()},getLocationInfo:function(t){var e=this;return a()(o.a.mark(function t(){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}},t,e)}))()}}}),l=(r("HbFy"),r("ZrdR")),f=Object(l.a)(s,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"china-wrap"},[r("section",{staticClass:"order-total"},[r("p",[t._v("全国投放点位分布图")]),t._v(" "),r("p",{staticStyle:{"margin-top":"18px"}},[t._v("覆盖城市\n      "),r("span",{staticStyle:{color:"#44CFD9","font-weight":"700"}},[t._v(t._s(t.localList.length))]),t._v("\n      个，共计投放商\n      "),r("span",{staticStyle:{color:"#44CFD9","font-weight":"700"}},[t._v(t._s(t.totalAgent))]),t._v("\n      个\n    ")])]),t._v(" "),r("section",{staticStyle:{width:"100%",height:"3.200416666rem",margin:"0 auto","margin-top":"0.15625rem"},attrs:{id:"china"}})])},[],!1,null,null,null);f.options.__file="china.vue";e.default=f.exports},HbFy:function(t,e,r){"use strict";var n=r("MFii");r.n(n).a},MFii:function(t,e,r){},cLjf:function(t,e,r){t.exports=r("xOJF")},hDQ3:function(t,e,r){"use strict";e.__esModule=!0;var n,o=r("Asgo"),i=(n=o)&&n.__esModule?n:{default:n};e.default=function(t){return function(){var e=t.apply(this,arguments);return new i.default(function(t,r){return function n(o,a){try{var c=e[o](a),u=c.value}catch(t){return void r(t)}if(!c.done)return i.default.resolve(u).then(function(t){n("next",t)},function(t){n("throw",t)});t(u)}("next")})}}},k4Ii:function(t,e){!function(e){"use strict";var r,n=Object.prototype,o=n.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",u=i.toStringTag||"@@toStringTag",s="object"==typeof t,l=e.regeneratorRuntime;if(l)s&&(t.exports=l);else{(l=e.regeneratorRuntime=s?t.exports:{}).wrap=x;var f="suspendedStart",h="suspendedYield",p="executing",m="completed",d={},y={};y[a]=function(){return this};var v=Object.getPrototypeOf,g=v&&v(v(D([])));g&&g!==n&&o.call(g,a)&&(y=g);var w=E.prototype=L.prototype=Object.create(y);_.prototype=w.constructor=E,E.constructor=_,E[u]=_.displayName="GeneratorFunction",l.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===_||"GeneratorFunction"===(e.displayName||e.name))},l.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,E):(t.__proto__=E,u in t||(t[u]="GeneratorFunction")),t.prototype=Object.create(w),t},l.awrap=function(t){return{__await:t}},C(S.prototype),S.prototype[c]=function(){return this},l.AsyncIterator=S,l.async=function(t,e,r,n){var o=new S(x(t,e,r,n));return l.isGeneratorFunction(e)?o:o.next().then(function(t){return t.done?t.value:o.next()})},C(w),w[u]="Generator",w[a]=function(){return this},w.toString=function(){return"[object Generator]"},l.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},l.values=D,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(k),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,o){return c.type="throw",c.arg=t,e.next=n,o&&(e.method="next",e.arg=r),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var u=o.call(a,"catchLoc"),s=o.call(a,"finallyLoc");if(u&&s){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),k(r),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;k(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:D(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),d}}}function x(t,e,r,n){var o=e&&e.prototype instanceof L?e:L,i=Object.create(o.prototype),a=new j(n||[]);return i._invoke=function(t,e,r){var n=f;return function(o,i){if(n===p)throw new Error("Generator is already running");if(n===m){if("throw"===o)throw i;return I()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=F(a,r);if(c){if(c===d)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=m,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=p;var u=b(t,e,r);if("normal"===u.type){if(n=r.done?m:h,u.arg===d)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n=m,r.method="throw",r.arg=u.arg)}}}(t,r,a),i}function b(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}function L(){}function _(){}function E(){}function C(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function S(t){var e;this._invoke=function(r,n){function i(){return new Promise(function(e,i){!function e(r,n,i,a){var c=b(t[r],t,n);if("throw"!==c.type){var u=c.arg,s=u.value;return s&&"object"==typeof s&&o.call(s,"__await")?Promise.resolve(s.__await).then(function(t){e("next",t,i,a)},function(t){e("throw",t,i,a)}):Promise.resolve(s).then(function(t){u.value=t,i(u)},a)}a(c.arg)}(r,n,e,i)})}return e=e?e.then(i,i):i()}}function F(t,e){var n=t.iterator[e.method];if(n===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=r,F(t,e),"throw"===e.method))return d;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var o=b(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,d;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,d):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,d)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function D(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(o.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=r,e.done=!0,e};return i.next=i}}return{next:I}}function I(){return{value:r,done:!0}}}(function(){return this}()||Function("return this")())},xOJF:function(t,e,r){var n=function(){return this}()||Function("return this")(),o=n.regeneratorRuntime&&Object.getOwnPropertyNames(n).indexOf("regeneratorRuntime")>=0,i=o&&n.regeneratorRuntime;if(n.regeneratorRuntime=void 0,t.exports=r("k4Ii"),o)n.regeneratorRuntime=i;else try{delete n.regeneratorRuntime}catch(t){n.regeneratorRuntime=void 0}}}]);