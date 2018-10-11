<template>
  <el-main>
    <el-form ref="form" :model="form" :rules="rules" label-width="90px" class="modify" >
      <el-form-item label="旧密码" prop="oldPassWord">
        <el-input v-model="form.oldPassWord" autofocus type="password" placeholder="原始密码"/>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassWord">
        <el-input v-model="form.newPassWord" type="password" placeholder="新密码"/>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassWord">
        <el-input v-model="form.confirmPassWord" type="password" placeholder="确认密码"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">确定</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
export default {
  name: 'ModifyPassword',
  data() {
    return {
      form: {
        oldPassWord: '',
        newPassWord: '',
        confirmPassWord: ''
      },
      rules: {
        oldPassWord: {
          required: true, // 是否必填
          message: '初始密码为空', // 规则
          trigger: 'blur' // 何事件触发
        },
        newPassWord: {
          required: true, // 是否必填
          message: '新密码为空', // 规则
          trigger: 'blur' // 何事件触发
        },
        confirmPassWord: {
          required: true, // 是否必填
          validator: (rule, value, callback) => {
            if (this.form.newPassWord !== value) {
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
      if (this.form.newPassWord !== this.form.confirmPassWord) {
        this.$message.error('密码两次输入不一致')
        return false
      }
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
