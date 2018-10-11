<template>
  <div class="dashboard-editor-container">
    <h3 class="title">乐摇摇代理商管理后台, 欢迎您!</h3>
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
  height: 100%;
  min-height: 600px;
  /*background-color: rgb(240, 242, 245);*/
  //display: flex;
  //flex-direction: column;
  //justify-content: space-between;
  .title{
    text-align: center;
    font-weight: bolder;
    font-size: 32px;
    color: #A089D5;
    margin: 0 auto;
  }
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
