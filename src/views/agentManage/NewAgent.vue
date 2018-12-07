<template>
  <div class="content-area">
    <el-form ref="baseInfoRef" :model="baseInfo" :rules="baseInfoRules" label-width="120px" label-position="right" style="margin-top: 20px;">
      <el-form-item label="代理账号" prop="loginPhone">
        <el-input v-model="baseInfo.loginPhone" placeholder="请输入代理商账号（手机号码）" class="input-300" maxlength="11" clearable />
        <span class="input-anno">账号设置后，不可修改</span>
      </el-form-item>
      <el-form-item label="短信验证码" prop="code">
        <el-input v-model="baseInfo.code" placeholder="请输入短信验证码" style="width: 160px;margin-right: 22px;" maxlength="4" clearable />
        <el-button :disabled="text !== '获取验证码' || flag" style="width: 112px;" type="primary" @click="getCode">{{ text }}</el-button>
        <span class="input-anno">请及时让代理告知短信验证码</span>
      </el-form-item>
      <el-form-item label="代理商名称">
        <el-input v-model="baseInfo.agentUserName" placeholder="请输入代理商名称" type="text" class="input-300" maxlength="16" clearable />
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input v-model="baseInfo.linkName" placeholder="请输入联系人姓名" type="text" class="input-300" maxlength="16" clearable />
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="baseInfo.phone" placeholder="请输入联系电话" type="tel" class="input-300" maxlength="11" clearable />
      </el-form-item>
      <el-form-item label="联系地址">
        <el-input v-model="baseInfo.address" placeholder="请输入联系地址" type="text" style="width: 600px;" maxlength="40" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleBaseInfo">创建</el-button>
      </el-form-item>
      <div style="font-size: 14px;padding-left: 120px; color: #b1a8a8;">
        <p>如果该账号未注册，则会直接开通注册，初始密码为16881688，请提醒及时修改密码</p>
      </div>
    </el-form>
  </div>
</template>

<script>
import { telCheck } from '@/utils/rules'
import { getCode, addAngent } from '@/api/angentManage'
import { validateTel } from '@/utils/validate'
export default {
  data() {
    return {
      text: '获取验证码',
      time: 120,
      timer: null,
      flag: false,
      linkName: '',
      baseInfo: { agentUserName: '', linkName: '', phone: '', address: '', code: '', loginPhone: '', linkUserId: '' },
      baseInfoRules: {
        phone: [{ validator: telCheck, trigger: 'blur' }],
        loginPhone: [{ required: true, message: '请输入代理商账号', trigger: 'blur' }],
        code: [{ required: true, message: '请输入4位手机验证码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleBaseInfo() {
      this.$refs['baseInfoRef'].validate(valid => {
        if (valid) {
          this.handleAngentInfo()
        } else {
          return false
        }
      })
    },
    // 保存或者跟新代理商信息
    handleAngentInfo() {
      const postData = this.baseInfo
      postData.type = 2
      addAngent(postData).then(res => {
        if (res.result === 0) {
          this.$message({ message: '新增代理信息成功', type: 'success' })
          this.$router.go(-1)
        } else {
          this.$message({ message: '新增代理信息失败', type: 'error' })
        }
      })
    },
    changLoginPhone() {
      this.linkName = ''
      this.baseInfo.linkUserId = ''
    },
    getCode() {
      if (!validateTel(this.baseInfo.loginPhone)) {
        this.$message({ message: '请输入正确的代理账号(11手机号)', type: 'error' })
        return
      }
      if (this.flag) {
        return
      }
      this.flag = true
      getCode({ phone: this.baseInfo.loginPhone }).then(res => {
        setTimeout(() => { this.flag = false }, 1000)
        if (res.result === 0) {
          this.timer = setInterval(() => {
            this.time = this.time - 1
            this.text = `${this.time}s`
            if (this.time === -1) {
              clearInterval(this.timer)
              this.timer = null
              this.text = '获取验证码'
              this.time = 120
            }
          }, 1000)
          this.$message({ message: '手机短信验证码已经发送成功', type: 'success' })
        } else {
          this.$message({ message: '手机短信验证码已经发送失败', type: 'error' })
        }
      })
    }
  }
}
</script>
