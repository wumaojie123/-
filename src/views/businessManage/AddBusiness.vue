<template>
  <div class="content-area">
    <el-form ref="baseInfoRef" :model="baseInfo" :rules="baseInfoRules" label-width="120px" label-position="right" style="margin-top: 20px;">
      <el-form-item label="商家账号" prop="userName">
        <el-input v-model="baseInfo.userName" placeholder="请输入商家账号" type="text" class="input-300" maxlength="64" clearable />
        <span class="input-anno">账号设置后，不可修改</span>
      </el-form-item>
      <el-form-item label="账号状态">
        <el-input v-model="baseInfo.linkName" placeholder="系统自动识别" type="text" class="input-300" disabled/>
      </el-form-item>
      <el-form-item label="手机验证码" prop="code">
        <el-input v-model="baseInfo.code" placeholder="请输入验证码" style="width: 150px;margin-right: 32px;" maxlength="4" clearable />
        <el-button type="primary" @click="getCode">获取验证码</el-button>
        <span class="input-anno">请及时让商家告知手机验证码</span>
      </el-form-item>
      <el-form-item label="商家名称">
        <el-input v-model="baseInfo.merchantName" placeholder="请输入商家名称" type="tel" class="input-300" maxlength="11" clearable />
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input v-model="baseInfo.linkName" placeholder="请输入联系人姓名" type="text" class="input-300" maxlength="256" clearable />
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="handleBaseInfo">创建/绑定</el-button>
      </el-form-item>
      <div style="font-size: 14px;padding-left: 120px; color: #b1a8a8;">
        <p>如果该账号之前已注册，将会直接关联绑定，原账号密码不变；</p>
        <p>如果该账号未注册，则会直接开通注册，初始密码为16881688，请提醒及时修改密码</p>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getMerchant, getCode, update } from '@/api/angentManage'
import { validateTel } from '@/utils/validate'
export default {
  data() {
    return {
      baseInfo: { userName: '', linkName: '', merchantName: '', code: '' },
      baseInfoRules: {
        userName: [{ required: true, message: '请输入商家账号', trigger: 'blur' }],
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
    handleAngentInfo() {
      const postData = this.baseInfo
      update(postData).then(res => {
        if (res.result === 0) {
          this.$message({ message: '新增商家信息成功', type: 'success' })
          this.$router.go(-1)
        } else {
          this.$message({ message: '新增商家信息失败', type: 'error' })
        }
      })
    },
    changLoginPhone() {
      this.linkName = ''
      this.baseInfo.linkUserId = ''
    },
    handelBlur() {
      this.baseInfo.linkUserId = ''
      if (!validateTel(this.baseInfo.loginPhone)) {
        this.$message({ message: '请输入正确的商家账号(11手机号)', type: 'error' })
        return
      }
      getMerchant({ phone: this.baseInfo.loginPhone }).then(res => {
        console.log(res.result)
        if (res.result === 0 && res.data && res.data.adUserId) {
          this.baseInfo.linkUserId = res.data.adUserId
          this.linkName = `${res.data.name}`
          this.description = null
        } else if (res.result === 0 && !res.data) {
          this.description = res.description
        } else if (res.result === -1) {
          this.linkName = ''
          this.baseInfo.linkUserId = ''
        }
      })
    },
    getCode() {
      if (!validateTel(this.baseInfo.loginPhone)) {
        this.$message({ message: '请输入正确的商家账号(11手机号)', type: 'error' })
        return
      }
      getCode({ phone: this.baseInfo.loginPhone }).then(res => {
        if (res.result === 0) {
          this.$message({ message: '手机短信验证码已经发送成功', type: 'success' })
        } else {
          this.$message({ message: '手机短信验证码已经发送失败', type: 'error' })
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .borderNone{
    input{
      border: none;
      background-color: #fff;
    }
  }
</style>
