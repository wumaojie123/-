(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-b127"],{ZySA:function(e,t,n){"use strict";var a=n("6ZY3"),i=n.n(a),s=(n("jUE0"),{bind:function(e,t){e.addEventListener("click",function(n){var a=i()({},t.value),s=i()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},a),r=s.ele;if(r){r.style.position="relative",r.style.overflow="hidden";var l=r.getBoundingClientRect(),o=r.querySelector(".waves-ripple");switch(o?o.className="waves-ripple":((o=document.createElement("span")).className="waves-ripple",o.style.height=o.style.width=Math.max(l.width,l.height)+"px",r.appendChild(o)),s.type){case"center":o.style.top=l.height/2-o.offsetHeight/2+"px",o.style.left=l.width/2-o.offsetWidth/2+"px";break;default:o.style.top=(n.pageY-l.top-o.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",o.style.left=(n.pageX-l.left-o.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return o.style.backgroundColor=s.color,o.className="waves-ripple z-active",!1}},!1)}}),r=function(e){e.directive("waves",s)};window.Vue&&(window.waves=s,Vue.use(r)),s.install=r;t.a=s},hcPF:function(e,t,n){"use strict";n.r(t);var a=n("6ZY3"),i=n.n(a),s=n("xBhl"),r=n("ZySA"),l=n("7Qib"),o={name:"ShowSubAgent",directives:{waves:r.a},filters:{statusFilter:function(e){return{published:"success",draft:"info",deleted:"danger"}[e]}},data:function(){return{tableKey:0,list:null,total:null,listLoading:!0,listQuery:{page:1,limit:20,importance:void 0,title:void 0,type:void 0,sort:"+id"},BDList:["默哀","啊哈哈","哈哈哈"],checked:!1,checkedRow:null,temp:{id:void 0,importance:1,remark:"",timestamp:new Date,title:"",type:"",status:"published"},rules:{type:[{required:!0,message:"type is required",trigger:"change"}],timestamp:[{type:"date",required:!0,message:"timestamp is required",trigger:"change"}],title:[{required:!0,message:"title is required",trigger:"blur"}]},downloadLoading:!1}},created:function(){this.getList(this.$route.query.id)},methods:{getTemplateRow:function(e,t){this.checkedRow=t},getList:function(e){var t=this;this.listLoading=!0,Object(s.g)({agentUserId:e}).then(function(e){t.list=e.data.items,t.total=e.data.total,t.checkedRow=null,t.checked=!1,setTimeout(function(){t.listLoading=!1},1500)},function(){})},handleFilter:function(){this.listQuery.page=1,this.getList()},handleSizeChange:function(e){this.listQuery.limit=e,this.getList()},handleCurrentChange:function(e){this.listQuery.page=e,this.getList()},handleModifyStatus:function(e,t){this.$message({message:"操作成功",type:"success"}),e.status=t},resetTemp:function(){this.temp={id:void 0,importance:1,remark:"",timestamp:new Date,title:"",status:"published",type:""}},handleUpdate:function(e){var t=this;this.temp=i()({},e),this.temp.timestamp=new Date(this.temp.timestamp),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs.dataForm.clearValidate()})},formatJson:function(e,t){return t.map(function(t){return e.map(function(e){return"timestamp"===e?Object(l.h)(t[e]):t[e]})})}}},u=(n("qrfI"),n("ZrdR")),c=Object(u.a)(o,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"agent-list-container bd-manage"},[n("el-menu",{staticClass:"el-menu-demo",attrs:{"default-active":"1",mode:"horizontal"}},[n("el-menu-item",{attrs:{index:"1"}},[e._v("下级代理商")])],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{label:"序号",align:"center",width:"65px"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.$index+1))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"代理商名称",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.agentUserName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"商家信息",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.userName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"联系人",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.linkName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"联系手机",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.phone))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"商家设备数量",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.ownEquipmentCount||0))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"再下级代理商数量",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.subordinateCount||0))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"创建日期",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.createDate||""))])]}}])})],1),e._v(" "),n("div",{staticClass:"pagination-container"},[n("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{"current-page":e.listQuery.page,"page-sizes":[10,20,30,50],"page-size":e.listQuery.limit,total:e.total,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},[],!1,null,"3ae66d36",null);c.options.__file="ShowSubAgent.vue";t.default=c.exports},htga:function(e,t,n){},jUE0:function(e,t,n){},qrfI:function(e,t,n){"use strict";var a=n("htga");n.n(a).a},xBhl:function(e,t,n){"use strict";n.d(t,"d",function(){return i}),n.d(t,"h",function(){return s}),n.d(t,"a",function(){return r}),n.d(t,"c",function(){return l}),n.d(t,"f",function(){return o}),n.d(t,"g",function(){return u}),n.d(t,"e",function(){return c}),n.d(t,"b",function(){return d});var a=n("t3Un");function i(e){return Object(a.a)({url:"/agentManage/sendCode",method:"get",params:e})}function s(e){return Object(a.a)({url:"/agentManage/updateAgent",method:"post",data:e})}function r(e){return Object(a.a)({url:"/agentManage/addAgent",method:"post",data:e})}function l(e){return Object(a.a)({url:"/agentManage/getAgent",method:"get",params:e})}function o(e){return Object(a.a)({url:"/agentManage/getMerchant",method:"get",params:e})}function u(e){return Object(a.a)({url:"/agentManage/secondAgents/querySecondAgents",method:"get",params:e})}function c(){return Object(a.a)({url:"/agentManage/getIssend",method:"get"})}function d(e){return Object(a.a)({url:"/agentManage/deleteAgent",method:"post",data:e})}}}]);