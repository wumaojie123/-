<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left">
      <div class="title-container">
        <h3 class="title">{{ `代理商管理后台` }}</h3>
        <!--<hr style="margin-bottom: 30px;height:1px;background-color:white;border: none;"/>-->
        <lang-select class="set-language"/>
      </div>
      <!-- 用户名 -->
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
          v-model="loginForm.username"
          :placeholder="`用户名`"
          name="username"
          type="text"
          auto-complete="on"
        />
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :type="passwordType"
          v-model="loginForm.password"
          :placeholder="`密码`"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin"/>
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="verifyCode">
        <el-input
          v-model="loginForm.verifyCode"
          :placeholder="`验证码`"
          name="code"
          type="text"
        />
      </el-form-item>
      <el-form-item class="identifybox-wrap">
        <div class="identifybox">
          <div @click="refreshCode">
            <img :src="validateCodeUrl" alt="" style="width: 150px;height:40px;">
          </div>
          <el-button type="text" class="textbtn" @click="refreshCode">看不清，换一张</el-button>
        </div>
      </el-form-item>
      <!-- 登录 -->
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">{{ $t('login.logIn') }}</el-button>
    </el-form>
  </div>
</template>

<script>
// import { isvalidUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import router from '../../router/index'
import { routerFormat } from '@/utils/routerFormat'
import { saveSession, getSession } from '../../utils/savaSession'
import { getMenu } from '../../api/getMenu'
import SocialSign from './socialsignin'
import SIdentify from './SIdentify.vue'
import MD5 from 'js-md5'

export default {
  name: 'Login',
  components: { LangSelect, SocialSign, 's-identify': SIdentify },
  data() {
    const validateUsername = (rule, value, callback) => {
      const pattern = /^1[345789]\d{9}$/
      if (pattern.test(value)) {
        callback()
      } else if ((value.trim() === '')) {
        callback(new Error('请输入手机号'))
      } else {
        callback(new Error('请输入正确的手机号'))
      }
    }
    const validatePassword = (rule, value, callback) => {
      const pattern = /^[0-9a-zA-Z_]{5,15}$/
      if (value.trim() === '') {
        callback(new Error('请输入密码'))
      } else if (pattern.test(value)) {
        callback()
      } else {
        callback(new Error('请输入6-16位数字、字母或下划线，不能以数字开头'))
      }
    }
    const validateCode = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        verifyCode: ''
      },
      validateCodeUrl: 'agent/rest/verifycode?' + new Date().getTime(),
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        verifyCode: [{ required: true, trigger: 'blur', validator: validateCode }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  mounted() {
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    throttle(fn, duration = 500) {
      if (fn === undefined) {
        console.error(`Vue.util.throttle函数参数缺失`)
        return
      }
      let timer = null; let firstTime = true
      return function(...args) {
        if (firstTime) {
          firstTime = false
          return fn.apply(this, args)
        } else {
          if (timer) return
          timer = setTimeout(() => {
            timer = null
            clearTimeout(timer)
            return fn.apply(this, args)
          }, duration)
        }
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', {
            username: this.loginForm.username,
            password: MD5(this.loginForm.password),
            verifyCode: this.loginForm.verifyCode
          }).then((data) => {
            this.loading = false
            console.log(data)
            getMenu().then(res => {
              // console.log(res)
              debugger
              saveSession('addRoute', res.data)
              router.addRoutes(routerFormat(JSON.parse(getSession('addRoute'))))
              this.$router.push({ path: this.redirect || '/' })
            })
          }, err => {
            this.loading = false
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 切换验证码
    refreshCode() {
      this.validateCodeUrl = (process.env.ENV_CONFIG === 'dev' ? '/agent' : '.') + '/rest/verifycode?' + new Date().getTime()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #eee;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    &::first-line {
      color: $light_gray;
    }
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .identifybox-wrap{
    border: none;
    height: 50px;
    background-color: transparent;
    display: flex;
    align-items: center;
    .identifybox{
      display: flex;
      padding-left: 20px ;
      justify-content: flex-start;
      align-items: center;
      .textbtn{
        margin-left: 100px;
      }
    }
  }
}
</style>
