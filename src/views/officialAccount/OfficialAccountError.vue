<template>
  <div class="content-area">
    <div style="color: red;margin: 20px 0;font-size: 20px;">{{ msg }}</div>
    <el-button style="width: 200px;" type="primary" @click="handleBack">返回</el-button>
    <div style="margin-top: 40px;">
      <img src="./images/qr-code.png" style="width: 200px;height: 200px;">
      <p style="margin-top: 30px;">如有疑问，请联系客服中心</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: ''
    }
  },
  created() {
    const reg = 'OfficialAccountError?'
    const arr = window.location.href.split(reg)[1].split('&')
    const map = {
      1: '参数错误，请检查后重试',
      2: '代理商不存在',
      3: '已绑定公众号'
    }
    this.msg = map[arr[0].split('=')[1]]
  },
  methods: {
    handleBack() {
      this.$router.push({
        path: '/officialAccount/OfficialAccountDocker'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.content-area{
  font-size: 14px;
  width: 600px;
  text-align: center;
  .auth-info{
    color: #fff;
    background: #409EFF;
    padding: 20px 0;
    width: 400px;
    display: inline-block;
    border-radius: 10px;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 30px;
  }
}
</style>
