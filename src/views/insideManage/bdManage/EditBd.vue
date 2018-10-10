<template>
  <div class="content-area">
    <!-- 账号信息区域 -->
    <el-form ref="BDInfoRef" :model="BDInfo" :rules="BDInfoRules" style="margin-top: 20px;" label-width="120px" label-position="left">
      <el-form-item label="BD姓名" prop="account">
        <el-input v-model="BDInfo.account" placeholder="请输入代理商账号" class="input-300" maxlength="11" />
      </el-form-item>
      <el-form-item label="手机号码" prop="acc">
        <el-input v-model="BDInfo.acc" placeholder="请输入手机号码" class="input-300" maxlength="11" />
        <span class="input-anno">请输入11位的手机号码</span>
      </el-form-item>
      <el-form-item label="登录密码" prop="password">
        <el-input v-model="BDInfo.password" type="password" placeholder="请输入代理商密码" class="input-300" maxlength="16" />
        <span class="input-anno">请输入6-16位的数字或字母作为密码</span>
      </el-form-item>
      <el-form-item label="账号状态" prop="status">
        <el-select v-model="BDInfo.status" placeholder="请选择账号状态">
          <el-option label="激活" value="1"/>
          <el-option label="冻结" value="0"/>
        </el-select>
      </el-form-item>
      <br>
      <el-button type="primary" @click="submit">保存</el-button>
    </el-form>
  </div>
</template>

<script>
import { telCheck } from '@/utils/rules'
export default {
  data() {
    return {
      BDInfo: { account: '', password: '', acc: '', status: '激活' },
      BDInfoRules: {
        account: [{ required: true, message: '请输入代理商名称', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '请输入6-16位的数字或字母', trigger: 'blur' }
        ],
        acc: [{ required: true, message: '请输入手机号码', trigger: 'blur' }, { validator: telCheck, trigger: 'blur' }],
        status: [{ required: true, message: '请选择活动区域', trigger: 'change' }]
      }
    }
  },
  methods: {
    submit() {
      this.$refs['BDInfoRef'].validate(valid => {
        if (valid) {
          alert(valid)
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style>
  .input-300{
    width: 300px;
  }
  .input-anno{
    margin-left: 20px;
    font-size: 12px;
    color:#b1a8a8;
  }
</style>
