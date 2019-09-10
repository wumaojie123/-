<template>
  <div class="anthorize-wrap">
    <div class="header">{{ title }}</div>
    <div class="content-wrap">
      <h3>如何重置授权有效期？</h3>
      <div>
        <div class="img-wrap">
          <img src="../images/authorize-bg.png" >
        </div>如何重置授权有效期？点击底部【重置授权有效期】按钮，进入扫码授权页，用公众号管理员手机微信扫描二维码进入权限确认页面，若【素材管理】权限处于已勾选状态，则去掉勾选后点击授权；若【素材管理】权限处于非勾选状态，则勾选后点击授权；
      </div>
    </div>
    <div class="footer" @click="reAuthorize">重置授权有效期</div>
  </div>
</template>
<script>
export default {
  props: {
    day: {
      type: [Number, String],
      default: ''
    }
  },
  computed: {
    title() {
      if (this.day === -1) {
        return '公众号失效时，【重置授权有效期】即可恢复公众号功能。'
      }
      if (this.day > 0) {
        return `您的公众号授权剩余有效期：${
          this.day
        }天，到期前请【重置授权有效期】。`
      }
      return '您的公众号授权已过期，【重置授权有效期】即可恢复公众号功能'
    }
  },
  created() {
    console.log(this.$route.params.id)
  },
  methods: {
    reAuthorize() {}
  }
}
</script>
<style lang="less" scoped>
.anthorize-wrap {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   bottom: 0;
  //   right: 0;
  //   overflow: scroll;
  .content-wrap {
    padding: 26px 16px;
    background: #fff;
  }
  .header {
    width: 100%;
    background: rgba(237, 244, 255, 1);
    height: 36px;
    line-height: 36px;
    color: rgba(61, 123, 232, 1);
    text-align: center;
  }
  .img-wrap {
    width: 100%;
    height: 500px;
  }
  .img-wrap > img {
    width: 100%;
    height: 100%;
  }
  .footer {
    // position: fixed;
    // bottom: 0;
    height: 80px;
    line-height: 80px;
    background: rgba(61, 123, 232, 1);
    width: 100%;
    color: rgba(255, 255, 255, 1);
    text-align: center;
  }
}
</style>
