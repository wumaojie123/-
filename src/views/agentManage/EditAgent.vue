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
      <el-button :disabled="baseInfo.linkUserId===''" type="primary" @click="handleBaseInfo">保存</el-button>
    </el-form>
    <!-- 账号信息区域 -->
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">账号信息</el-menu-item>
    </el-menu>
    <el-form :model="baseInfo" label-width="120px" label-position="left" style="margin-top: 20px;">
      <el-form-item label="代理商账号">
        <el-input v-model="baseInfo.loginPhone" placeholder="请输入代理商账号" class="input-300" maxlength="11" disabled/>
      </el-form-item>
      <el-form-item label="关联商家">
        <el-input v-model="linkName" placeholder="请输入关联商家账号" class="input-300" maxlength="32" disabled/>
        <span class="input-anno">如需更改，请输入新的手机号码重新进行绑定验证</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { telCheck } from '@/utils/rules'
import { getAngent, getMerchant, update } from '@/api/angentManage'
export default {
  data() {
    return {
      linkName: '',
      baseInfo: { agentUserName: '', linkName: '', phone: '', address: '', loginPhone: '', linkUserId: '', type: 2 },
      baseInfoRules: {
        agentUserName: [{ required: true, message: '请输入代理商名称', trigger: 'blur' }],
        linkName: [{ required: true, message: '请输入联系人姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }, { validator: telCheck, trigger: 'blur' }],
        address: [{ required: true, message: '请输入联系地址', trigger: 'change' }]
      }
    }
  },
  created() {
    const userID = this.$route.query.ID
    // 编辑需要先查询代理商信息
    if (userID) {
      this.getAngentDetail(userID)
    }
  },
  methods: {
    handleBaseInfo() {
      if (!this.baseInfo.linkUserId) {
        this.$message({ message: '请先获取关联商家相关信息', type: 'error' })
        return
      }
      this.$refs['baseInfoRef'].validate((valid) => {
        if (valid) {
          console.log('校验成功')
          this.handleAngentInfo()
        } else {
          // console.log('校验失败s')
          return false
        }
      })
    },
    // 获取代理商信息
    getAngentDetail(userID) {
      getAngent({ agentUserId: userID }).then(res => {
        console.log(res.data.result === '0', res.result)
        if (res.result === 0) {
          const angentDetail = res.data
          for (const key in this.baseInfo) {
            if (angentDetail[key]) {
              this.baseInfo[key] = angentDetail[key] || ''
            }
          }
          // this.baseInfo.loginPhone = '17745458565'
          this.getMerchant()
        } else {
          this.$message({ message: '获取代理商数据失败，请稍后再试', type: 'error' })
        }
      })
    },
    // 保存或者跟新代理商信息
    handleAngentInfo() {
      const postData = this.baseInfo
      postData.agentUserId = this.$route.query.ID
      // console.log(JSON.stringify(postData))
      update(postData).then(res => {
        if (res.result === 0) {
          this.$message({ message: '修改代理商信息成功', type: 'success' })
        } else {
          this.$message({ message: '修改代理商信息失败', type: 'error' })
        }
      })
    },
    getMerchant() {
      getMerchant({ phone: this.baseInfo.loginPhone }).then(res => {
        if (res.result === 0 && res.data) {
          this.baseInfo.linkUserId = res.data.adUserId
          this.linkName = res.data.name
        } else {
          this.$message({ message: '数据查询失败，请稍后再试', type: 'error' })
        }
      })
    }
  }
}
</script>
