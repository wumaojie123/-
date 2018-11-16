<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default{
  name: 'App',
  created() {
    // 设置语言,默认是中文,暂时不支持切换为英文
    this.$store.dispatch('setLanguage', 'zh')
  }
}
</script>
<style>
  body .el-table th.gutter{
    display: table-cell!important;
  }

</style>
