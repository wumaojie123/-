(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-e2b0"],{bSnj:function(e,i,t){"use strict";t.d(i,"a",function(){return o}),t.d(i,"b",function(){return n}),t.d(i,"c",function(){return l});var r=t("t3Un");function o(e){return Object(r.a)({url:"/rest/factory/agentGroupServiceList",method:"get",params:e})}function n(e){return Object(r.a)({url:"/rest/factory/savaGroupService",method:"post",data:e})}function l(e){return Object(r.a)({url:"/rest/factory/updateGroupService",method:"post",data:e})}},fm6N:function(e,i,t){"use strict";var r=t("yGjS");t.n(r).a},iR9m:function(e,i,t){"use strict";t.r(i);var r=t("XJYT"),o=t("bSnj"),n=t("Yfch"),l=function(e,i,t){Object(n.c)(i)&&i<1e4&&i>0?t():t(new Error("价格必须为大于0的正数,价格需小于10000,最多保留2位小数"))},s=function(e,i,t){Object(n.b)(i)&&i<=1440?t():t(new Error("服务时间必须为大于0的小于等于1440(24小时)正整数"))},c=function(e,i,t){""===i||Object(n.b)(i)&&i<=1440?t():t(new Error("服务时间必须为大于0的小于等于1440(24小时)正整数"))},a=function(e,i,t){Object(n.b)(i)&&i<=9999&&i>0?t():t(new Error("模拟投币数必须为大于0小于等于9999的正整数"))},u={props:{handleClose:{type:Function,default:function(){}},queryList:{type:Function,default:function(){}},visible:{type:Boolean,default:!1},actionRow:{type:Object,default:null},actionType:{type:String,default:""}},data:function(){return{ruleForm:{equipmentType:"CDZ",communication:1,billing:1,description:"",price:"",coins:"",serviceTime:""},rules:{equipmentType:[{required:!0,message:"请选择设备类型",trigger:"blur"}],communication:[{required:!0,message:"请选择通信方式",trigger:"blur"}],billing:[{required:!0,message:"请选择计费方式",trigger:"blur"}],description:[{required:!0,message:"请输入套餐名称",trigger:"change"},{max:12,message:"套餐名称长度不能超过12",trigger:"change"}],price:[{required:!0,message:"请输入价格",trigger:"change"},{validator:l}],coins:[{required:!0,message:"请输入模拟投币数",trigger:"change"},{validator:a}],serviceTime:[{required:!1,message:"请输入时长",trigger:"change"},{validator:c}]},loading_submit:!1}},computed:{getTitle:function(){return"add"===this.actionType?"添加服务套餐":"编辑服务套餐"}},created:function(){},methods:{onClose:function(){this.$refs.ruleForm.resetFields(),this.handleClose()},onOpen:function(){"edit"===this.actionType&&this.actionRow&&(this.ruleForm={equipmentType:this.actionRow.equipmentType,communication:this.actionRow.communication,billing:this.actionRow.billing,description:this.actionRow.description,price:this.actionRow.price,coins:this.actionRow.coins,serviceTime:this.actionRow.serviceTime})},onSubmit:function(){var e=this;e.$refs.ruleForm.validate(function(i){if(i){var t={equipmentType:e.ruleForm.equipmentType,communication:e.ruleForm.communication,billing:e.ruleForm.billing,description:e.ruleForm.description,price:Number(e.ruleForm.price),coins:Number(e.ruleForm.coins),serviceTime:Number(e.ruleForm.serviceTime)};2===e.ruleForm.communication&&delete t.coins,1===e.ruleForm.communication&&""===e.ruleForm.serviceTime&&delete t.serviceTime,e.loading_submit=!0,"edit"===e.actionType?(t.agentGroupServiceId=e.actionRow.agentGroupServiceId,Object(o.c)(t).then(function(i){0===i.result&&0===i.data&&(Object(r.Message)({message:"编辑服务套餐成功！",type:"success"}),e.queryList(1),e.onClose())}).finally(function(){e.loading_submit=!1})):Object(o.b)(t).then(function(i){0===i.result&&0===i.data&&(Object(r.Message)({message:"添加服务套餐成功！",type:"success"}),e.queryList(1),e.onClose())}).finally(function(){e.loading_submit=!1})}})},changeCommunication:function(e){1===e?(this.rules.serviceTime[0].required=!1,this.rules.serviceTime[1].validator=c):(this.rules.serviceTime[0].required=!0,this.rules.serviceTime[1].validator=s)}}},m=(t("fm6N"),t("KHd+")),p=Object(m.a)(u,function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("el-dialog",{attrs:{title:e.getTitle,visible:e.visible,width:"500px"},on:{close:e.onClose,opened:e.onOpen}},[t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-position":"left","label-width":"100px"}},[t("el-form-item",{attrs:{label:"设备类型",prop:"equipmentType"}},[t("el-select",{staticClass:"sel-item",attrs:{disabled:!0},model:{value:e.ruleForm.equipmentType,callback:function(i){e.$set(e.ruleForm,"equipmentType",i)},expression:"ruleForm.equipmentType"}},[t("el-option",{attrs:{label:"充电桩",value:"CDZ"}})],1)],1),e._v(" "),t("el-form-item",{attrs:{label:"通信方式",prop:"communication"}},[t("el-select",{staticClass:"sel-item",on:{change:e.changeCommunication},model:{value:e.ruleForm.communication,callback:function(i){e.$set(e.ruleForm,"communication",i)},expression:"ruleForm.communication"}},[t("el-option",{attrs:{value:1,label:"脉冲"}}),e._v(" "),t("el-option",{attrs:{value:2,label:"串口"}})],1)],1),e._v(" "),t("el-form-item",{attrs:{label:"计费方式",prop:"billing"}},[t("el-select",{staticClass:"sel-item",attrs:{disabled:!0},model:{value:e.ruleForm.billing,callback:function(i){e.$set(e.ruleForm,"billing",i)},expression:"ruleForm.billing"}},[t("el-option",{attrs:{value:1,label:"按时长计费"}})],1)],1),e._v(" "),t("el-form-item",{attrs:{label:"套餐名称",prop:"description"}},[t("el-input",{model:{value:e.ruleForm.description,callback:function(i){e.$set(e.ruleForm,"description",i)},expression:"ruleForm.description"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"价格",prop:"price"}},[t("el-input",{model:{value:e.ruleForm.price,callback:function(i){e.$set(e.ruleForm,"price",i)},expression:"ruleForm.price"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"时长(分钟)",prop:"serviceTime"}},[t("el-input",{model:{value:e.ruleForm.serviceTime,callback:function(i){e.$set(e.ruleForm,"serviceTime",i)},expression:"ruleForm.serviceTime"}})],1),e._v(" "),2!==e.ruleForm.communication?t("el-form-item",{attrs:{label:"模拟投币数",prop:"coins"}},[t("el-input",{model:{value:e.ruleForm.coins,callback:function(i){e.$set(e.ruleForm,"coins",i)},expression:"ruleForm.coins"}})],1):e._e()],1),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:e.onClose}},[e._v("取 消")]),e._v(" "),t("el-button",{attrs:{loading:e.loading_submit,type:"primary"},on:{click:e.onSubmit}},[e._v("保 存")])],1)],1)},[],!1,null,"6c623d2d",null);p.options.__file="serviceSellDialog.vue";i.default=p.exports},yGjS:function(e,i,t){}}]);