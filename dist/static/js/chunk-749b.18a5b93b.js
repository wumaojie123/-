(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-749b"],{hTS4:function(e,t,n){"use strict";n.r(t);var a=n("Yfch"),r=n("xBhl"),i={data:function(){return{check:-1,queryParams:{agentUserName:"",userName:"",linkName:"",phone:""},list:[],colums:[{key:"agentUserName",label:"代理商名称"},{key:"userName",label:"账号"},{key:"subordinateCount",label:"下一级商家数量"},{key:"linkName",label:"联系人"},{key:"phone",label:"手机号码"},{key:"createDate",label:"创建日期"},{key:"equipmentCount",label:"当前设备总量"},{key:"equipmentOnlineCount",label:"昨日在线设备量"}],pageInfo:{total:0,pageSize:10,currPage:1},angentInfo:[]}},created:function(){this.queryList()},methods:{resetQueryParams:function(){this.queryParams={agentUserName:"",userName:"",linkName:"",phone:""}},queryList:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.angentInfo=[],this.list=[],this.pageInfo.currPage=t;var n={pageSize:this.pageInfo.pageSize,pageIndex:this.pageInfo.currPage};for(var a in this.queryParams)this.queryParams[a]&&(n[a]=this.queryParams[a]);Object(r.g)(n).then(function(t){e.listLoading=!1,t.data?(e.list=t.data.items||[],e.pageInfo.total=t.data.total||0):e.pageInfo.total=0})},handleItem:function(e){this.angentInfo=e},getTemplateRow:function(e){this.check=e,this.angentInfo=[this.list[e]]},onDelBtnClick:function(){var e=this;this.angentInfo.length<1?this.$message({message:"请至少选中一条代理商信息！！",type:"error"}):this.$confirm("删除后，相关信息和数据将会彻底删除，且无法恢复。确定要删除吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",closeOnClickModal:!1}).then(function(){e.deleteAgent()}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},deleteAgent:function(){var e=this,t={ids:[this.angentInfo[0].agentUserId]};this.listLoading=!0,Object(r.b)(t).then(function(t){e.listLoading=!1,e.$message({type:"success",message:"删除成功!"})})},handleAngent:function(e){1===this.angentInfo.length?"edit"===e?this.$router.push({path:"/edit",query:{ID:this.angentInfo[0].agentUserId,action:"edit"}}):"del"===e&&this.$confirm("是否删除该代理商信息",{callback:function(e){}}):this.angentInfo.length>1?this.$message({message:"只能编辑一条代理商信息",type:"error"}):this.$message({message:"请选中一条代理商信息！！",type:"error"})},handleSizeChange:function(e){this.pageInfo.pageSize=e,this.pageInfo.total=0,this.queryList(1)},handleCurrentChange:function(e){this.queryList(e)},filerQueryList:function(){this.pageInfo.total=0,this.queryParams.phone&&!Object(a.b)(this.queryParams.phone)||this.queryParams.userName&&!Object(a.b)(this.queryParams.userName)?this.$message({message:"请正确输入11位手机号码",type:"error"}):this.queryList(this.pageInfo.currPage)}}},s=n("KHd+"),o=Object(s.a)(i,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"content-area"},[n("el-form",{staticStyle:{"margin-bottom":"20px"},attrs:{inline:!0,"label-width":"90px","label-position":"right"}},[n("el-form-item",[n("el-input",{staticClass:"input-300",attrs:{placeholder:"请输入代理账号",maxlength:"11",clearable:""},model:{value:e.queryParams.userName,callback:function(t){e.$set(e.queryParams,"userName",t)},expression:"queryParams.userName"}}),e._v(" "),n("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.filerQueryList}},[e._v("查询")]),e._v(" "),n("p",{staticStyle:{"padding-bottom":"10px"}}),e._v(" "),n("div",{staticClass:"flex-layout"},[n("div",{staticClass:"flex-item"},[n("el-button",{attrs:{type:"primary",icon:"el-icon-edit"},on:{click:function(t){e.handleAngent("edit")}}},[e._v("编辑代理")]),e._v(" "),n("router-link",{attrs:{to:{path:"/add"}}},[n("el-button",{attrs:{type:"primary",icon:"el-icon-plus"}},[e._v("新增代理")])],1),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.onDelBtnClick}},[e._v("删除")])],1)])],1)],1),e._v(" "),n("el-table",{staticStyle:{width:"100%","margin-bottom":"20px"},attrs:{data:e.list,border:"","highlight-current-row":""}},[n("el-table-column",{attrs:{label:"操作",width:"55",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-radio",{attrs:{label:t.$index},nativeOn:{change:function(n){e.getTemplateRow(t.$index)}},model:{value:e.check,callback:function(t){e.check=t},expression:"check"}},[e._v(" ")])]}}])}),e._v(" "),e._l(e.colums,function(e,t){return n("el-table-column",{key:t,attrs:{prop:e.key,label:e.label,width:e.width,sortable:e.sortable,align:"center"}})})],2),e._v(" "),n("el-pagination",{attrs:{"page-sizes":[10,20,30,40],"page-size":e.pageInfo.pageSize,total:e.pageInfo.total,"current-page":e.pageInfo.currPage,background:"",layout:"total, prev, pager, next, sizes, jumper"},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)},[],!1,null,null,null);o.options.__file="AgentsList.vue";t.default=o.exports},xBhl:function(e,t,n){"use strict";n.d(t,"d",function(){return r}),n.d(t,"h",function(){return i}),n.d(t,"a",function(){return s}),n.d(t,"c",function(){return o}),n.d(t,"f",function(){return l}),n.d(t,"g",function(){return u}),n.d(t,"e",function(){return c}),n.d(t,"b",function(){return g});var a=n("t3Un");function r(e){return Object(a.a)({url:"/agentManage/sendCode",method:"get",params:e})}function i(e){return Object(a.a)({url:"/agentManage/updateAgent",method:"post",data:e})}function s(e){return Object(a.a)({url:"/agentManage/addAgent",method:"post",data:e})}function o(e){return Object(a.a)({url:"/agentManage/getAgent",method:"get",params:e})}function l(e){return Object(a.a)({url:"/agentManage/getMerchant",method:"get",params:e})}function u(e){return Object(a.a)({url:"/agentManage/secondAgents/querySecondAgents",method:"get",params:e})}function c(){return Object(a.a)({url:"/agentManage/getIssend",method:"get"})}function g(e){return Object(a.a)({url:"/agentManage/deleteAgent",method:"post",data:e})}}}]);