<template>
  <div class="content-area">
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">基础信息</el-menu-item>
    </el-menu>
    <el-form ref="baseInfoRef" :model="baseInfo" :rules="baseInfoRules" label-width="120px" label-position="left" style="margin-top: 20px;">
      <el-form-item label="代理商名称" prop="angentName">
        <el-input v-model="baseInfo.angentName" placeholder="请输入代理商名称" type="text" class="input-300" maxlength="64" clearable />
      </el-form-item>
      <el-form-item label="联系人姓名" prop="name">
        <el-input v-model="baseInfo.name" placeholder="请输入联系人姓名" type="text" class="input-300" maxlength="32" clearable />
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="baseInfo.phone" placeholder="请输入手机号" type="tel" class="input-300" maxlength="11" clearable />
      </el-form-item>
      <el-form-item label="联系地址" prop="address">
        <el-input v-model="baseInfo.address" placeholder="请输入联系地址" type="text" style="width: 600px;" maxlength="256" clearable />
      </el-form-item>
      <p/>
      <el-button type="primary" @click="handleBaseInfo">保存</el-button>
    </el-form>
    <!-- 账号信息区域 -->
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">账号信息</el-menu-item>
    </el-menu>
    <el-form ref="accountInfoRef" :model="accountInfo" :rules="accountInfoRules" style="margin-top: 20px;" label-width="120px" label-position="left">
      <el-form-item label="代理商账号" prop="account">
        <el-input v-model="accountInfo.account" placeholder="请输入代理商账号" class="input-300" maxlength="11" clearable />
      </el-form-item>
      <el-form-item label="代理商密码" prop="password">
        <el-input v-model="accountInfo.password" type="password" placeholder="请输入代理商密码" class="input-300" maxlength="16" clearable />
        <span class="input-anno">请输入6-16位的数字或字母</span>
      </el-form-item>
      <el-form-item label="关联商家账号" prop="acc">
        <el-input v-model="accountInfo.acc" placeholder="请输入关联商家账号" class="input-300" maxlength="32" clearable />
        <span class="input-anno">如需更改，请输入新的手机号码重新进行绑定验证</span>
      </el-form-item>
      <p/>
      <el-button type="primary" @click="handleAccountInfo">保存</el-button>
    </el-form>
  </div>
</template>

<script>
import { telCheck } from '@/utils/rules'
export default {
  data() {
    return {
      baseInfo: { angentName: '', name: '', phone: '', address: '' },
      baseInfoRules: {
        angentName: [{ required: true, message: '请输入代理商名称', trigger: 'blur' }],
        name: [{ required: true, message: '请输入联系人姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }, { validator: telCheck, trigger: 'blur' }],
        address: [{ required: true, message: '请输入联系地址', trigger: 'blur' }]
      },
      accountInfo: { account: '', password: '', acc: '' },
      accountInfoRules: {
        account: [{ required: true, message: '请输入代理商名称', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '请输入6-16位的数字或字母', trigger: 'blur' }
        ],
        acc: [{ required: true, message: '请输入手机号码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleBaseInfo() {
      this.$refs['baseInfoRef'].validate(valid => {
        if (valid) {
          alert(valid)
        } else {
          return false
        }
      })
    },
    handleAccountInfo() {
    }
  }
}
</script>

<style>
.content-area{
	padding-top: 20px;
	padding-left: 20px;
}
.input-300{
  width: 300px;
}
.input-anno{
  margin-left: 20px;
  font-size: 12px;
  color:#b1a8a8;
}
</style>
