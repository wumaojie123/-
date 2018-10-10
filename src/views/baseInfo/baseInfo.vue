<template>
  <div class="base-info">
    <p class="info">{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'BaseInfo',
  data() {
    return {
      msg: '以下信息用户暂时不能主动修改，如需调整，请联系业务客服。'
    }
  }
}
</script>

<style scoped lang="scss" scope>
  .base-info{
    .info{
      padding: 10px;
      background-color: rgba(255, 255, 204, 1);
      color: #666;
      font-size: 14px;
      margin-left: 20px;
    }
  }
</style>
