<template>
  <div>
    <div class="login-container">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <div class="flex-wrapper">
            <h3 :class="{'select': type === '1'}" class="title" @click="type='1'">{{ `生产商管理平台` }}</h3>
            <h3
              :class="{'select': type === 'dlpt'}"
              class="title"
              @click="type='dlpt'"
            >{{ `运维管理平台` }}</h3>
          </div>
          <!--<hr style="margin-bottom: 30px;height:1px;background-color:white;border: none;"/>-->
          <lang-select class="set-language" />
        </div>
        <!-- 用户名 -->
        <el-form-item prop="username" style="margin-top: 20px;">
          <span class="svg-container svg-container_login">
            <svg-icon icon-class="user" />
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
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :type="passwordType"
            v-model="loginForm.password"
            :placeholder="`密码`"
            name="password"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon icon-class="eye" />
          </span>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="verifyCode">
          <el-input
            v-model="loginForm.verifyCode"
            :placeholder="`验证码`"
            name="code"
            type="text"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <el-form-item class="identifybox-wrap">
          <div class="identifybox">
            <div @click="refreshCode">
              <img :src="validateCodeUrl" alt style="width: 150px;height:40px;" >
            </div>
            <el-button type="text" class="textbtn" @click="refreshCode">看不清，换一张</el-button>
          </div>
        </el-form-item>
        <!-- 登录 -->
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;margin-bottom:30px;"
          @click.native.prevent="handleLogin"
        >{{ $t('login.logIn') }}</el-button>
        <a class="reset-btn" @click="vis_reset=true">忘记密码？</a>
      </el-form>
    </div>
    <el-dialog :close-on-click-modal="false" :visible.sync="vis_reset" width="500px" title="重设密码" @close="hideReset">
      <div v-show="!vis_confirmPassword">
        <el-form ref="ruleForm" :model="reset" :rules="reset_rules" label-position="left">
          <el-form-item :label-width="'100px'" prop="phone" label="手机号码">
            <el-input v-model.trim="reset.phone" autocomplete="off"/>
          </el-form-item>
          <el-form-item :label-width="'100px'" prop="code" label="短信验证码">
            <el-input v-model.trim="reset.code" class="reset-codeInput" autocomplete="off"/>
            <el-button
              :disabled="canGetCode"
              :loading="loading_code"
              class="reset-codeBtn"
              type="primary"
              @click="getCode"
            >{{ code_time?code_time+'s':'获取短信验证码' }}</el-button>
          </el-form-item>
        </el-form>
        <div class="reset-footer">
          <el-button
            :disabled="canChangePassword"
            :loading="loading_verifyCode"
            class="reset-footer-btn"
            type="primary"
            @click="verifyCode"
          >下一步</el-button>
        </div>
      </div>
      <div v-show="vis_confirmPassword">
        <el-form ref="passwordForm" :model="password" :rules="password_rules" label-position="left">
          <el-form-item :label-width="'100px'" prop="password" label="新密码">
            <el-input v-model.trim="password.password" autocomplete="off"/>
          </el-form-item>
          <el-form-item :label-width="'100px'" prop="confirm_password" label="确认密码">
            <el-input v-model.trim="password.confirm_password" autocomplete="off"/>
          </el-form-item>
        </el-form>
        <div class="reset-footer">
          <el-button
            :disabled="canSave"
            :loading="loading_savePassword"
            class="reset-footer-btn"
            type="primary"
            @click="savePassword"
          >保存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import LangSelect from '@/components/LangSelect'
import router from '../../router/index'
import { routerFormat } from '@/utils/routerFormat'
import { saveSession, getSession } from '../../utils/savaSession'
import { getMenu, userMapRoles } from '../../api/getMenu'
import SocialSign from './socialsignin'
import MD5 from 'js-md5'
import { Message } from 'element-ui'
import { validateTel } from '@/utils/validate'
export default {
  name: 'Login',
  components: { LangSelect, SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      const pattern = /^1[345789]\d{9}$/
      if (pattern.test(value)) {
        callback()
      } else if (value.trim() === '') {
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
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        verifyCode: [
          { required: true, trigger: 'blur', validator: validateCode }
        ]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined,
      timerId: null,
      type: '1',
      vis_reset: false,
      code_time: null,
      reset_rules: {
        phone: [
          { required: true, trigger: 'change', validator: validateUsername }
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'change' }]
      },
      reset: {
        phone: '',
        code: ''
      },
      password_rules: {
        password: [
          { required: true, trigger: 'change', validator: validatePassword }
        ],
        confirm_password: [
          { required: true, trigger: 'change', validator: validatePassword }
        ]
      },
      password: {
        password: '',
        confirm_password: ''
      },
      loading_code: false,
      loading_verifyCode: false,
      vis_confirmPassword: false,
      loading_savePassword: false
    }
  },
  computed: {
    canGetCode() {
      return !(
        validateTel(this.reset.phone) &&
        !this.code_time &&
        !this.loading_code
      )
    },
    canChangePassword() {
      return !(validateTel(this.reset.phone) && this.reset.code !== '')
    },
    canSave() {
      return (
        this.password.password === '' || this.password.confirm_password === ''
      )
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
    this.timerId = setInterval(() => {
      this.refreshCode()
    }, 60 * 1000)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    savePassword(formName) {
      const self = this
      if (this.password.password !== this.password.confirm_password) {
        Message({
          message: '两次密码不一致',
          type: 'error'
        })
        return
      }
      self.$refs['passwordForm'].validate(valid => {
        if (valid) {
          self.loading_savePassword = true
          self.$store
            .dispatch('savePassword', {
              phoneNumber: self.reset.phone,
              verifyCode: self.reset.code,
              newPassword: self.password.password
            })
            .then(data => {
              if (data.result === 0) {
                Message({
                  message: '修改密码成功！',
                  type: 'success'
                })
                self.vis_reset = false
              }
            })
            .finally(() => {
              self.loading_savePassword = false
            })
        }
      })
    },
    verifyCode(formName) {
      const self = this
      self.loading_verifyCode = true
      self.$refs['ruleForm'].validate(valid => {
        if (valid) {
          self.$store
            .dispatch('postVerifyCode', {
              phoneNumber: self.reset.phone,
              verifyCode: self.reset.code
            })
            .then(data => {
              if (data.result === 0) {
                self.vis_confirmPassword = true
              }
            })
            .finally(() => {
              self.loading_verifyCode = false
            })
        }
      })
    },
    getCode() {
      const self = this
      if (self.code_time) {
        return
      }
      this.loading_code = true
      self.$store
        .dispatch('getVerifyCode', {
          phoneNumber: self.reset.phone
        })
        .then(data => {
          if (data.result === 0) {
            self.code_time = 60
            const code_interval = setInterval(() => {
              if (self.code_time <= 0) {
                self.code_time = 0
                clearInterval(code_interval)
              } else {
                self.code_time--
              }
            }, 1000)
          }
        })
        .finally(() => {
          this.loading_code = false
        })
    },
    hideReset() {
      this.vis_confirmPassword = false
      this.$refs['ruleForm'].resetFields()
      this.$refs['passwordForm'].resetFields()
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      const self = this
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('LoginByUsername', {
              username: this.loginForm.username,
              password: MD5(this.loginForm.password),
              verifyCode: this.loginForm.verifyCode
            })
            .then(
              data => {
                this.loading = false
                clearInterval(self.timerId)
                saveSession('username', this.loginForm.username)
                const params = {}
                if (data.result !== 0) {
                  return
                }
                if (this.type === 'dlpt') {
                  params.value = 'dlpt'
                  userMapRoles({}).then(res => {
                    if (res.result === 0) {
                      // const arr = ['MC_AGENT_AGENT_SECOND', 'MC_AGENT_AGENT_FIRST', 'MC_AGENT_AGENT_FIRST_DEFAULT']
                      const arr = [
                        'MC_AGENT_AGENT_FIRST',
                        'MC_AGENT_AGENT_FIRST_DEFAULT'
                      ]
                      const flag = (res.data || []).some(item => {
                        // return arr.indexOf(item.value) > -1 || item.name.indexOf('Role_Agent_First') > -1 || item.name.indexOf('Role_Agent_Second') > -1
                        return (
                          arr.indexOf(item.value) > -1 ||
                          item.name.indexOf('Role_Agent_First') > -1
                        )
                      })
                      if (flag) {
                        saveSession('addRoute', [])
                        router.addRoutes(
                          routerFormat(JSON.parse(getSession('addRoute')))
                        )
                        this.$router.push({ path: '/data' })
                      } else {
                        this.$message({ message: '暂无权限', type: 'error' })
                      }
                    }
                  })
                } else {
                  getMenu(params).then(res => {
                    saveSession('addRoute', res.data)
                    router.addRoutes(
                      routerFormat(JSON.parse(getSession('addRoute')))
                    )
                    this.$router.push({ path: this.redirect || '/' })
                  })
                }
              },
              err => {
                this.loading = false
                console.log(err)
              }
            )
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 切换验证码
    refreshCode() {
      this.validateCodeUrl = '/agent/rest/verifycode?' + new Date().getTime()
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
      // margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      padding: 0 0 40px 0;
      color: #cbbcbc;
      flex: 1;
      &::after {
        content: '';
        width: 100%;
        display: inline-block;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        color: #cbbcbc;
        background: #cbbcbc;
      }
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
  .identifybox-wrap {
    border: none;
    height: 50px;
    background-color: transparent;
    display: flex;
    align-items: center;
    .identifybox {
      display: flex;
      padding-left: 20px;
      justify-content: flex-start;
      align-items: center;
      .textbtn {
        margin-left: 100px;
      }
    }
  }
  .flex-wrapper {
    display: flex;
    justify-content: space-between;
  }
  .flex-wrapper .select {
    // border-bottom: 4px solid red;
    position: relative;
    color: #fff;
    &::after {
      content: '';
      width: 100%;
      display: inline-block;
      bottom: 0;
      left: 0;
      right: 0;
      height: 4px;
      color: #fff;
      background: #fff;
    }
  }
}
.reset-btn {
  text-align: center;
  display: block;
  color: #1890FF;
}
.reset-codeInput {
  width: 180px;
  margin-right: 20px;
}
.reset-codeBtn{
  float: right;
}
.reset-footer {
  text-align: center;
  padding-top: 20px;
}
.reset-footer-btn {
  width: 300px;
}
</style>
