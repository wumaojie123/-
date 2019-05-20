<template>
  <el-main>
    <el-alert :title="message" :closable="false" type="warning" class="info" />
    <el-form ref="form" :model="form" :rules="rules" label-width="90px" class="modify" >
      <el-form-item label="旧密码" prop="originPwd">
        <el-input v-model="form.originPwd" type="password" placeholder="原始密码"/>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input v-model="form.newPwd" type="password" placeholder="新密码"/>
      </el-form-item>
      <el-form-item label="确认密码" prop="verifyPwd">
        <el-input v-model="form.verifyPwd" type="password" placeholder="确认密码"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">确定</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
import { passwordCheck } from '../../utils/rules'
import { modifyPassword } from '../../api/modifyPassword'
import { clearSession } from '../../utils/savaSession'
import MD5 from 'js-md5'
const checkfn = (rule, value, callback, msg) => {
  if (!value.trim()) {
    callback(new Error(msg))
  } else {
    passwordCheck(rule, value, callback)
  }
} // 规则
export default {
  name: 'ModifyPassword',
  data() {
    return {
      message: '注意：此页面修改到的密码暂时只是代理商系统的，商家后台的登录密码请在微信端页面内修改。',
      form: {
        originPwd: '',
        newPwd: '',
        verifyPwd: ''
      },
      rules: {
        originPwd: {
          required: true, // 是否必填
          validator: (rule, value, callback) => {
            checkfn(rule, value, callback, '原始密码不能为空')
          },
          trigger: 'blur' // 何事件触发
        },
        newPwd: {
          required: true, // 是否必填
          validator: (rule, value, callback) => {
            if (this.form.newPwd === this.form.originPwd) {
              callback(new Error('新旧密码不能相同'))
            } else {
              checkfn(rule, value, callback, '新密码为空')
            }
          },
          trigger: 'blur' // 何事件触发
        },
        verifyPwd: {
          required: true, // 是否必填
          validator: (rule, value, callback) => {
            if (this.form.newPwd !== value) {
              callback(new Error('两次输入不一致'))
            } else {
              callback()
            }
          }, // 规则
          trigger: 'blur' // 何事件触发
        }
      }
    }
  },
  methods: {
    submit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.form.newPwd = MD5(this.form.newPwd)
          this.form.originPwd = MD5(this.form.originPwd)
          this.form.verifyPwd = MD5(this.form.verifyPwd)
          modifyPassword(this.form).then(res => {
            this.$store.dispatch('LogOut').then(() => {
              clearSession('addRoute')
              location.reload() // In order to re-instantiate the vue-router object to avoid bugs
            })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  /deep/ .modify{
    width: 400px;
    margin: 30px 0 0 30px;
  }
</style>
