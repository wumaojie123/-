(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-9a4a"],{"0VFk":function(e,t,a){},"D+xE":function(e,t,a){"use strict";var n=a("0VFk");a.n(n).a},J1F3:function(e,t,a){"use strict";a.d(t,"b",function(){return r}),a.d(t,"c",function(){return l}),a.d(t,"a",function(){return o});var n=a("t3Un");function r(e){return Object(n.a)({url:"/rest/reportFroms/query",method:"post",data:e})}function l(e){return Object(n.a)({url:"/rest/benefit/group",method:"get",params:e})}function o(e){return Object(n.a)({url:"/rest/benefit/equipment",method:"get",params:e})}},xBhl:function(e,t,a){"use strict";a.d(t,"c",function(){return r}),a.d(t,"f",function(){return l}),a.d(t,"a",function(){return o}),a.d(t,"b",function(){return i}),a.d(t,"d",function(){return s}),a.d(t,"e",function(){return c});var n=a("t3Un");function r(e){return Object(n.a)({url:"/agentManage/sendCode",method:"get",params:e})}function l(e){return Object(n.a)({url:"/agentManage/updateAgent",method:"post",data:e})}function o(e){return Object(n.a)({url:"/agentManage/addAgent",method:"post",data:e})}function i(e){return Object(n.a)({url:"/agentManage/getAgent",method:"get",params:e})}function s(e){return Object(n.a)({url:"/agentManage/getMerchant",method:"get",params:e})}function c(e){return Object(n.a)({url:"/agentManage/secondAgents/querySecondAgents",method:"get",params:e})}},yb5i:function(e,t,a){"use strict";a.r(t);var n=a("7Qib"),r=a("J1F3"),l=a("xBhl"),o=Date.now(),i={disabledDate:function(e){var t=e.getTime();return t<o-5184e6||t>o}},s={data:function(){return{roletype:"商家",queryParams:{agentUserName:"",associateSellerPhone:"",associateSellerName:""},dateRange:[],listLoading:!0,list:[],agentList:[],colums:[{key:"agentUserName",label:"商家名称",width:250},{key:"orderCount",label:"订单数量",sortable:!0},{key:"totalIncome",label:"收入总额(元)",sortable:!0},{key:"onlineIncome",label:"在线收入(元)",sortable:!0},{key:"cashIncome",label:"现金收入(元)",sortable:!0},{key:"adIncome",label:"广告收入(元)",sortable:!0}],colums2:[{key:"agentUserName",label:"代理名称",width:250},{key:"orderCount",label:"订单数量",sortable:!0},{key:"totalIncome",label:"收入总额(元)",sortable:!0},{key:"onlineIncome",label:"在线收入(元)",sortable:!0},{key:"cashIncome",label:"现金收入(元)",sortable:!0},{key:"adIncome",label:"广告收入(元)",sortable:!0}],pageInfo:{total:20,pageSize:10,currPage:1},options:i,active:"merchant",type:""}},beforeMount:function(){this.dateRange[0]=Object(n.d)(Date.now()-864e5,"{y}-{m}-{d}"),this.dateRange[1]=Object(n.d)(Date.now()-864e5,"{y}-{m}-{d}"),this.queryAgentType(),this.queryList()},methods:{queryAgentType:function(){var e=this;Object(l.b)().then(function(t){e.type=t.data.type})},handlerTabClick:function(e){this.roletype=e.label,this.list=[],this.agentList=[],this.pageInfo={total:20,pageSize:10,currPage:1},this.resetQueryParams(),this.queryList()},resetQueryParams:function(){this.queryParams={agentUserName:"",associateSellerPhone:"",associateSellerName:""},this.dateRange=[],this.dateRange[0]=Object(n.d)(Date.now()-864e5,"{y}-{m}-{d}"),this.dateRange[1]=Object(n.d)(Date.now()-864e5,"{y}-{m}-{d}")},handleQueryParams:function(){this.queryList(this.pageInfo.currPage)},queryList:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.listLoading=!0,this.pageInfo.currPage=t;var a=this.queryParams;a.pageIndex=this.pageInfo.currPage,a.pageSize=this.pageInfo.pageSize,a.startDate=this.dateRange[0],a.endDate=this.dateRange[1],a.roleStr=this.active,"agent"===this.active?this.list=[]:"merchant"===this.active&&(this.agentList=[]),Object(r.b)(a).then(function(t){if(e.listLoading=!1,t.data){var a=t.data&&t.data.items||[];"merchant"===e.active?e.list=a:"agent"===e.active&&(e.agentList=a),e.pageInfo.total=t.data.total||0}else e.pageInfo.total=0})},handleSizeChange:function(e){this.pageInfo.pageSize=e,this.queryList(this.pageInfo.currPage)},handleCurrentChange:function(e){this.queryList(e)}}},c=(a("D+xE"),a("KHd+")),u=Object(c.a)(s,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"content-area"},[a("el-form",{staticStyle:{"margin-bottom":"20px"},attrs:{inline:!0,"label-width":"100px","label-position":"right"}},[a("el-form-item",{attrs:{label:"统计日期"}},[a("el-date-picker",{attrs:{clearable:!1,"picker-options":e.options,type:"daterange","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},model:{value:e.dateRange,callback:function(t){e.dateRange=t},expression:"dateRange"}})],1),e._v(" "),a("el-form-item",{attrs:{label:e.roletype+"账号"}},[a("el-input",{attrs:{placeholder:"请输入"+e.roletype+"账号",clearable:""},model:{value:e.queryParams.associateSellerPhone,callback:function(t){e.$set(e.queryParams,"associateSellerPhone",t)},expression:"queryParams.associateSellerPhone"}})],1),e._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleQueryParams}},[e._v("查询")])],1),e._v(" "),a("el-tabs",{attrs:{type:"card"},on:{"tab-click":e.handlerTabClick},model:{value:e.active,callback:function(t){e.active=t},expression:"active"}},[a("el-tab-pane",{attrs:{label:"商家",name:"merchant"}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%","margin-bottom":"20px"},attrs:{data:e.list,"show-summary":"",border:""}},[a("el-table-column",{attrs:{prop:"associateSellerPhone",label:"账号",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("router-link",{staticClass:"lyy-a-link",attrs:{to:{path:"/placeReport",query:{agentUserName:t.row.agentUserName,associateSellerPhone:t.row.associateSellerPhone,begin:e.dateRange[0],end:e.dateRange[1]}}}},[e._v(e._s(t.row.associateSellerPhone))])]}}])}),e._v(" "),e._l(e.colums,function(e,t){return a("el-table-column",{key:t,attrs:{prop:e.key,label:e.label,width:e.width,sortable:e.sortable,align:"center"}})})],2),e._v(" "),a("el-pagination",{attrs:{"page-sizes":[10,20,30,40],"page-size":e.pageInfo.pageSize,total:e.pageInfo.total,"current-page":e.pageInfo.currPage,background:"",layout:"total, prev, pager, next, sizes, jumper"},on:{"size-change":e.handleSizeChange,"prev-click":e.handleCurrentChange,"next-click":e.handleCurrentChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),2!==e.type?a("el-tab-pane",{attrs:{label:"代理",name:"agent"}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%","margin-bottom":"20px"},attrs:{data:e.agentList,"show-summary":"",border:""}},[a("el-table-column",{attrs:{prop:"associateSellerPhone",label:"账号",align:"center"}}),e._v(" "),e._l(e.colums2,function(e,t){return a("el-table-column",{key:t,attrs:{prop:e.key,label:e.label,width:e.width,sortable:e.sortable,align:"center"}})})],2),e._v(" "),a("el-pagination",{attrs:{"page-sizes":[10,20,30,40],"page-size":e.pageInfo.pageSize,total:e.pageInfo.total,"current-page":e.pageInfo.currPage,background:"",layout:"total, prev, pager, next, sizes, jumper"},on:{"size-change":e.handleSizeChange,"prev-click":e.handleCurrentChange,"next-click":e.handleCurrentChange,"current-change":e.handleCurrentChange}})],1):e._e()],1)],1)},[],!1,null,null,null);u.options.__file="ManagerReport.vue";t.default=u.exports}}]);