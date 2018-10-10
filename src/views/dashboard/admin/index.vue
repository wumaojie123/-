<template>
  <div class="dashboard-editor-container">
    <h3>欢迎来到乐摇摇代理商管理后台</h3>
    <footer>©2018 Copyright 深圳乐摇摇信息科技有限公司 备案号：粤ICP备16014453号-1</footer>
  </div>
</template>

<script>

export default {
  name: 'DashboardAdmin',
  components: {

  },
  data() {
    return {
    }
  },
  methods: {
    handleSetLineChartData(type) {
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  width: 100%;
  height: 100% !important;
  background-color: rgb(240, 242, 245);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
