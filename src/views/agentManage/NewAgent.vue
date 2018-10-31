<template>
  <div class="content-area">
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">基础信息</el-menu-item>
    </el-menu>
    <el-form ref="baseInfoRef" :model="baseInfo" :rules="baseInfoRules" label-width="120px" label-position="left" style="margin-top: 20px;">
      <el-form-item label="代理商名称" prop="agentUserName">
        <el-input v-model="baseInfo.agentUserName" placeholder="请输入代理商名称" type="text" class="input-300" maxlength="64" clearable />
      </el-form-item>
      <el-form-item label="联系人姓名" prop="linkName">
        <el-input v-model="baseInfo.linkName" placeholder="请输入联系人姓名" type="text" class="input-300" maxlength="32" clearable />
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="baseInfo.phone" placeholder="请输入手机号" type="tel" class="input-300" maxlength="11" clearable />
      </el-form-item>
      <el-form-item label="联系地址" prop="address">
        <el-input v-model="baseInfo.address" placeholder="请输入联系地址" type="text" style="width: 600px;" maxlength="256" clearable />
      </el-form-item>
      <!-- 账号信息区域 -->
      <el-menu default-active="1" class="el-menu-demo" mode="horizontal" style="margin-bottom: 20px;">
        <el-menu-item index="1">账号信息</el-menu-item>
      </el-menu>
      <el-form-item label="代理商账号" prop="loginPhone">
        <el-input v-model="baseInfo.loginPhone" placeholder="请输入代理商账号" class="input-300" maxlength="11" clearable @blur="handelBlur" @change="changLoginPhone" />
        <span class="input-anno">请输入手机号码，如果客户此前有注册乐摇摇商家账号，请输入相同的号码</span>
      </el-form-item>
      <el-form-item label=" 关联商家">
        <el-input v-show="!description" v-model="linkName" :readonly="true" class="input-300 borderNone" maxlength="32" clearable/>
        <span v-show="description" style="font-size: 14px;color: red;">{{ description }}</span>
        <span v-if="type==='edit'" class="input-anno">如需更改，请输入新的手机号码重新进行绑定验证</span>
      </el-form-item>
      <el-form-item label="手机验证码" prop="code">
        <el-input v-model="baseInfo.code" placeholder="请输入验证码" style="width: 150px;margin-right: 32px;" maxlength="4" clearable />
        <el-button type="primary" @click="getCode">获取验证码</el-button>
        <span class="input-anno">请及时让商家告知手机验证码</span>
      </el-form-item>
      <p/>
      <p style="font-size: 12px;color:red;padding-left: 120px;font-weight: 700;">
        注意：代理商后台与商家后台的登录账号都是手机号码。如果此前未注册，初始密码16881688，请提醒用户及时更换密码。如果此前已经注册，密码不会更改
      </p>
      <el-button type="primary" @click="handleBaseInfo">保存</el-button>
    </el-form>
  </div>
</template>

<script>
import { telCheck } from '@/utils/rules'
import { getMerchant, getCode, update } from '@/api/angentManage'
import { validateTel } from '@/utils/validate'
export default {
  data() {
    return {
      // 操作类型
      type: 'new',
      description: null,
      linkName: '',
      baseInfo: { agentUserName: '', linkName: '', phone: '', address: '', code: '', loginPhone: '', type: 2, linkUserId: '' },
      // baseInfo: { agentUserName: '', linkName: '', phone: '', address: '', code: '', loginPhone: '', type: 2 },
      baseInfoRules: {
        agentUserName: [{ required: true, message: '请输入代理商名称', trigger: 'blur' }],
        linkName: [{ required: true, message: '请输入联系人姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }, { validator: telCheck, trigger: 'blur' }],
        address: [{ required: true, message: '请输入联系地址', trigger: 'blur' }],
        loginPhone: [{ required: true, message: '请输入代理商账号', trigger: 'blur' }],
        code: [{ required: true, message: '请输入4位手机验证码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleBaseInfo() {
      // if (this.linkUserId) {
      //   this.$message({ message: '用户已存在，请换一个代理商账号', type: 'error' })
      //   return
      // }
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
      update(postData).then(res => {
        if (res.result === 0) {
          // console.log('保存代理商信息成功')
          this.$message({ message: '新增代理商信息成功', type: 'success' })
          this.$router.go(-1)
        } else {
          this.$message({ message: '新增代理商信息失败', type: 'error' })
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
        this.$message({ message: '请输入正确的代理商账号(11手机号)', type: 'error' })
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
        this.$message({ message: '请输入正确的代理商账号(11手机号)', type: 'error' })
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
