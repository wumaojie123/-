<template>
  <div class="content-area">
    <div class="auth-info">{{ authInfo }}</div>
    <el-button style="width: 200px;" type="primary" @click="handleBack">返回</el-button>
    <div style="margin-top: 40px;">
      <img src="" style="width: 100px;height: 100px;">
      <p style="margin-top: 30px;">如有疑问，请联系客服中心</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '',
      appId: '',
      authCode: '',
      authInfo: '',
      showStatus: false,
      contentShowStatus: false,
      isMenuAuth: false,
      isTemplateAuth: false
    }
  },
  created() {
    const reg = 'officialAccountResult?'
    const arr = window.location.href.split(reg)[1].split('&')
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i].split('=')
      if (i === 0) {
        this.appId = item[1]
      }
      if (i === 1) {
        this.authCode = item[1]
      }
      if (i === 2) {
        this.msg = parseInt(item[1], 10)
      }
      if (i === 3) {
        this.isMenuAuth = item[1] === 'Y'
      }
      if (i === 4) {
        this.isTemplateAuth = item[1] === 'Y'
      }
    }
    if (this.msg === 0) {
      this.authInfo = '授权失败，未查到授权记录'
    } else if (this.msg === 1) {
      this.authInfo = '授权成功'
    } else if (this.msg === 2) {
      this.authInfo = '您的公众号不是服务号，无法绑定'
    } else if (this.msg === 3) {
      this.authInfo = '您的服务号未认证，请先认证'
    } else if (this.msg === 4) {
      this.authInfo = '该公众号已绑定商家，请选择其他公众号'
    } else if (this.msg === 5) {
      this.authInfo = '授权成功微服务添加关联失败'
    } else if (this.msg === 6) {
      this.authInfo = '获取授权信息失败'
    } else if (this.msg === 7) {
      this.authInfo = '授权成功'
    } else if (this.msg === 9) {
      this.authInfo = '该公众号已绑定，请选择其他公众号绑定'
    } else if (this.msg === 8) {
      this.authInfo = '授权成功，您已绑定公众号'
    }
    if (this.msg === 1 || this.msg === 7) {
      if (this.isMenuAuth || this.isTemplateAuth) {
        if (this.msg === 7) {
          this.$router.push({ path: '/OfficialAccountDetail', query: { typeId: 2, appId: this.appId }})
        } else {
          this.$router.push({ path: '/OfficialAccountDetail', query: { typeId: 2, appId: this.appId, isFirstAuth: 'Y' }})
        }
      }
    }
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
