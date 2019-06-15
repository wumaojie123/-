<template>
  <el-form-item label="权限设置" prop="authSetting" class="mb5 mt10">
    <el-checkbox label="经营报表"/>
    <el-checkbox label="数据分析"/>
    <el-checkbox-group v-model="dataAnalysisList">
      <el-checkbox label="订单分析"/>
      <el-checkbox label="设备分析"/>
      <el-checkbox label="客户分析"/>
      <el-checkbox label="区域分析"/>
      <el-checkbox label="点位分析"/>
      <el-checkbox label="商品分析"/>
    </el-checkbox-group>
    <el-checkbox label="代理列表"/>
    <el-checkbox label="商家列表"/>
    <el-checkbox label="设备管理"/>
    <el-checkbox label="用户中心"/>
    <el-checkbox label="广告分成"/>
  </el-form-item>
</template>
<script>
export default {
  props: {
    visiable: {
      type: Boolean,
      default: false
    },
    projects: {
      type: Array,
      default: () => {
        this.projects || []
      }
    }
  },
  data() {
    return {
      newAgentName: null,
      dataAnalysisList: ['订单分析', '设备分析', '客户分析', '区域分析', '点位分析', '商品分析']
    }
  },
  methods: {
    selectType() {
      console.log('--log--:', 1)
    }
  }
}
</script>
<style scoped>
  .project-input{
    text-align: center;
    margin-bottom: 10px;
  }
  .project-node{
    font-size: 12px;
    color: #666;
  }
</style>
