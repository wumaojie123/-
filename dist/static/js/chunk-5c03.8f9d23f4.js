(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5c03"],{"7nR4":function(e,t,n){"use strict";n.r(t);var i=n("P2sY"),a=n.n(i),s=n("14Xm"),l=n.n(s),r=n("D3Ub"),o=n.n(r),c=n("omMh"),u=n("ZySA"),d=n("7Qib"),p={name:"AgentsList",directives:{waves:u.a},data:function(){return{tableKey:0,list:null,total:null,listLoading:!0,listQuery:{contractId:"",agentUserName:"",userName:"",bdId:""},bdList:null,checked:!1,checkedRow:null,temp:{id:void 0,importance:1,remark:"",timestamp:new Date,title:"",type:"",status:"published"},rules:{type:[{required:!0,message:"type is required",trigger:"change"}],timestamp:[{type:"date",required:!0,message:"timestamp is required",trigger:"change"}],title:[{required:!0,message:"title is required",trigger:"blur"}]},downloadLoading:!1}},created:function(){var e=this;return o()(l.a.mark(function t(){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.getList();case 1:case"end":return t.stop()}},t,e)}))()},methods:{getTemplateRow:function(e,t){this.checkedRow=t},getBDList:function(){var e=this;c.a.getBDList().then(function(t){e.bdList=t.data},function(){e.bdList=[]})},getList:function(){var e=this;this.listLoading=!0,this.checked=!1,c.a.getFirstAgentList(this.listQuery).then(function(t){e.list=t.data.items,e.total=t.data.total,e.checkedRow=null,e.checked=!1,setTimeout(function(){e.listLoading=!1},1500)},function(t){e.list=[],e.total=null,e.checkedRow=null,e.checked=!1,setTimeout(function(){e.listLoading=!1},1500)})},handleFilter:function(){this.listQuery.page=1,this.getList()},handleSizeChange:function(e){this.listQuery.limit=e,this.getList()},handleCurrentChange:function(e){this.listQuery.page=e,this.getList()},handleModifyStatus:function(e,t){this.$message({message:"操作成功",type:"success"}),e.status=t},resetTemp:function(){this.temp={id:void 0,importance:1,remark:"",timestamp:new Date,title:"",status:"published",type:""}},handleUpdate:function(e){var t=this;this.temp=a()({},e),this.temp.timestamp=new Date(this.temp.timestamp),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs.dataForm.clearValidate()})},handleEdit:function(e){var t=this;if("add"===e)this.$router.push({name:"createOneAgent",query:{plan:"private"}});else{if(!t.checkedRow&&(t.$notify({title:"提示",message:"操作失败,请选中某一条数据进行操作",type:"error",duration:2e3}),1))return!1;var n=this.checkedRow.agentUserId;"edit"===e?this.$router.push({name:"oneAgentEdit",query:{id:n}}):"showSubAgentList"===e?this.$router.push({name:"subAgent",query:{id:n}}):"delete"===e&&this.getList()}},handleDelete:function(e){this.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3});var t=this.list.indexOf(e);this.list.splice(t,1)},formatJson:function(e,t){return t.map(function(t){return e.map(function(e){return"timestamp"===e?Object(d.e)(t[e]):t[e]})})}}},m=(n("yabZ"),n("KHd+")),h=Object(m.a)(p,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"agent-list-container bd-manage"},[n("div",{staticClass:"filter-container"},[n("div",{staticClass:"item"},[n("span",{staticClass:"label"},[e._v("合同编号 ")]),e._v(" "),n("el-input",{staticClass:"filter-item",staticStyle:{width:"300px","margin-right":"20px"},attrs:{placeholder:"请输入合同编号"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.listQuery.contractId,callback:function(t){e.$set(e.listQuery,"contractId",t)},expression:"listQuery.contractId"}})],1),e._v(" "),n("div",{staticClass:"item"},[n("span",{staticClass:"label"},[e._v("代理商名称")]),e._v(" "),n("el-input",{staticClass:"filter-item",staticStyle:{width:"300px","margin-right":"20px"},attrs:{placeholder:"请输入代理商名称"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.listQuery.agentUserName,callback:function(t){e.$set(e.listQuery,"agentUserName",t)},expression:"listQuery.agentUserName"}})],1),e._v(" "),n("br"),e._v(" "),n("br"),e._v(" "),n("div",{staticClass:"item"},[n("span",{staticClass:"label"},[e._v("    账号   ")]),e._v(" "),n("el-input",{staticClass:"filter-item",staticStyle:{width:"300px","margin-right":"20px"},attrs:{placeholder:"请输入账号"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.listQuery.userName,callback:function(t){e.$set(e.listQuery,"userName",t)},expression:"listQuery.userName"}})],1),e._v(" "),n("br"),e._v(" "),n("br"),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(e._s("查找"))]),e._v(" "),n("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:function(t){e.handleEdit("edit")}}},[e._v(e._s("编辑"))]),e._v(" "),n("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-view"},on:{click:function(t){e.handleEdit("showSubAgentList")}}},[e._v(e._s("查看下级代理"))]),e._v(" "),n("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-plus"},on:{click:function(t){e.handleEdit("add")}}},[e._v(e._s("新增代理商"))])],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",stripe:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{label:"操作",fixed:"",align:"center",width:"55"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-radio",{staticClass:"radio",attrs:{label:t.row.agentUserId},nativeOn:{change:function(n){e.getTemplateRow(t.$index,t.row)}},model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}},[e._v(" ")])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"合同编号",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.contractId||""))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"代理商名称",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.agentUserName||""))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"账号",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.userName||""))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"经营项目",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.bunissesNames||"未知"))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"下级代理数量",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.subordinateCount||0))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"BD同事",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.bdName||""))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"创建日期",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.createDate))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"已导入设备总量",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.equipmentCount))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"昨日在线设备量",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.equipmentOnlineCount))])]}}])})],1),e._v(" "),n("div",{staticClass:"pagination-container"},[n("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{"current-page":e.listQuery.page,"page-sizes":[25],"page-size":e.listQuery.limit,total:e.total,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},[],!1,null,"5a316ad8",null);h.options.__file="AgentsList.vue";t.default=h.exports},ZySA:function(e,t,n){"use strict";var i=n("P2sY"),a=n.n(i),s=(n("jUE0"),{bind:function(e,t){e.addEventListener("click",function(n){var i=a()({},t.value),s=a()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},i),l=s.ele;if(l){l.style.position="relative",l.style.overflow="hidden";var r=l.getBoundingClientRect(),o=l.querySelector(".waves-ripple");switch(o?o.className="waves-ripple":((o=document.createElement("span")).className="waves-ripple",o.style.height=o.style.width=Math.max(r.width,r.height)+"px",l.appendChild(o)),s.type){case"center":o.style.top=r.height/2-o.offsetHeight/2+"px",o.style.left=r.width/2-o.offsetWidth/2+"px";break;default:o.style.top=(n.pageY-r.top-o.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",o.style.left=(n.pageX-r.left-o.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return o.style.backgroundColor=s.color,o.className="waves-ripple z-active",!1}},!1)}}),l=function(e){e.directive("waves",s)};window.Vue&&(window.waves=s,Vue.use(l)),s.install=l;t.a=s},jUE0:function(e,t,n){},yabZ:function(e,t,n){"use strict";var i=n("z6dz");n.n(i).a},z6dz:function(e,t,n){}}]);