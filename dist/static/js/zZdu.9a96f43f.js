(window.webpackJsonp=window.webpackJsonp||[]).push([["zZdu"],{zZdu:function(e,a,r){"use strict";r.r(a);var t=r("gDS+"),n=r.n(t),s=r("14Xm"),o=r.n(s),i=r("D3Ub"),c=r.n(i),d=r("KpQh"),l=r("gO3j"),m={components:{"order-list":d.default},data:function(){return{commProps:{cell:{name:["交易设备","投币金额(元)","商户账号","商户姓名","创建时间"],prop:["device","coins","account","name","time"],list:[]},handler:{isShow:!1},pagination:{totalCount:0,pageIndex:1,pageSizes:[10,20,50],pageSize:10,sizeChangeHd:"size-change",currentChangeHd:"current-change"},summary:{showFlag:!0,total:0}},searchParam:{deviceNo:"",adOrgId:"",date:""},merchantList:[],option:{disabledDate:function(e){var a=Date.now(),r=e.getTime();return r<a-2592e6||r>a}}}},mounted:function(){var e=this;return c()(o.a.mark(function a(){return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e.merchantList=[],a.next=3,Object(l.a)();case 3:e.merchantList=a.sent;case 5:case"end":return a.stop()}},a,e)}))()},methods:{sizeChangeHd:function(e){this.commProps.pagination.pageSize=e,this.queryCoinOrderList()},currentChangeHd:function(e){this.commProps.pagination.pageIndex=e,this.queryCoinOrderList()},queryCoinOrderList:function(){if(""===this.searchParam.adOrgId&&""===this.searchParam.deviceNo)return this.$message({message:"请输入商户账号或设备编号进行查询",type:"error"}),!1;this.getList()},getList:function(){var e=this;return c()(o.a.mark(function a(){var r,t,s,i,c,d;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return(r=JSON.parse(n()(e.searchParam))).pageIndex=e.commProps.pagination.pageIndex,r.pageSize=e.commProps.pagination.pageSize,r.date&&(r.date=e.searchParam.date+" 00:00:00"),a.next=6,Object(l.c)(r,"coin");case 6:if(0!==(t=a.sent).result){a.next=21;break}if(null!==(s=t.data)){a.next=11;break}return a.abrupt("return");case 11:if(null!==(i=s.pagination)){a.next=14;break}return a.abrupt("return");case 14:e.commProps.summary.total=s.totalCoins,e.commProps.summary.showFlag=!0,e.commProps.pagination.totalCount=i.total,e.commProps.cell.list=[],c=i.items||[],d=0,c.forEach(function(a){var r=a.groupNumber;a.device=r?r+"号机-"+a.deviceType+a.deviceNo+"-"+a.groupName:""+a.deviceType+a.deviceNo+"-"+a.groupName,a.curIndex=d,e.commProps.cell.list.push(a),d++});case 21:case 22:case"end":return a.stop()}},a,e)}))()},download:function(){var e="";if(""===this.searchParam.adOrgId&&""===this.searchParam.deviceNo)return this.$message({message:"请输入商户账号或设备编号进行导出",type:"error"}),!1;e+="&adOrgId="+this.searchParam.adOrgId+"&deviceNo="+this.searchParam.deviceNo,this.searchParam.date&&(e+="&date="+this.searchParam.date+" 00:00:00"),location.href=encodeURI("/agent/export/coinOrders?1=1&"+e)}}},u=r("KHd+"),p=Object(u.a)(m,function(){var e=this,a=e.$createElement,r=e._self._c||a;return r("el-container",[r("el-header",{staticStyle:{"margin-top":"10px"}},[e._v("\n    商户账号\n    "),r("el-select",{attrs:{filterable:"",placeholder:"请选择",clearable:""},model:{value:e.searchParam.adOrgId,callback:function(a){e.$set(e.searchParam,"adOrgId",a)},expression:"searchParam.adOrgId"}},e._l(e.merchantList,function(e){return r("el-option",{key:e.adOrgId,attrs:{label:e.label,value:e.adOrgId}})})),e._v("设备编号\n    "),r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入设备编号"},model:{value:e.searchParam.deviceNo,callback:function(a){e.$set(e.searchParam,"deviceNo",a)},expression:"searchParam.deviceNo"}}),e._v("时间\n    "),r("el-date-picker",{attrs:{"picker-options":e.option,type:"date",placeholder:"请选择","value-format":"yyyy-MM-dd"},model:{value:e.searchParam.date,callback:function(a){e.$set(e.searchParam,"date",a)},expression:"searchParam.date"}}),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:e.queryCoinOrderList}},[e._v("查询")]),e._v(" "),r("el-button",{attrs:{type:"success"},on:{click:e.download}},[e._v("导出")])],1),e._v(" "),r("order-list",{attrs:{cell:e.commProps.cell,summary:e.commProps.summary,pagination:e.commProps.pagination},on:{"current-change":e.currentChangeHd,"size-change":e.sizeChangeHd}})],1)},[],!1,null,null,null);p.options.__file="coinOrderList.vue";a.default=p.exports}}]);