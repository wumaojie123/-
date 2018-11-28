<template>
  <div class="content-area">
    <el-form ref="baseInfoRef" :model="baseInfo" :rules="baseInfoRules" label-width="120px" label-position="right" style="margin-top: 20px;">
      <el-form-item label="代理账号">
        <el-input v-model="baseInfo.loginPhone" placeholder="请输入代理商账号" class="input-300" maxlength="11" disabled />
        <span class="input-anno">账号不可修改</span>
      </el-form-item>
      <el-form-item label="代理商名称">
        <el-input v-model="baseInfo.agentUserName" placeholder="请输入代理商名称" type="text" class="input-300" maxlength="16" clearable />
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input v-model="baseInfo.linkName" placeholder="请输入联系人姓名" type="text" class="input-300" maxlength="16" clearable />
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="baseInfo.phone" placeholder="请输入手机号" type="tel" class="input-300" maxlength="11" clearable />
      </el-form-item>
      <el-form-item label="联系地址">
        <el-input v-model="baseInfo.address" placeholder="请输入联系地址" type="text" style="width: 600px;" maxlength="40" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleBaseInfo">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { telCheck } from '@/utils/rules'
import { getAngent, update } from '@/api/angentManage'
export default {
  data() {
    return {
      linkName: '',
      baseInfo: { agentUserName: '', linkName: '', phone: '', address: '', loginPhone: '', linkUserId: '' },
      baseInfoRules: {
        agentUserName: [{ required: true, message: '请输入代理商名称', trigger: 'blur' }],
        phone: [{ validator: telCheck, trigger: 'blur' }]
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
      // if (!this.baseInfo.linkUserId) {
      //   this.$message({ message: '关联商家相关信息获取失败，无法修改', type: 'error' })
      //   return
      // }
      this.$refs['baseInfoRef'].validate((valid) => {
        if (valid) {
          this.handleAngentInfo()
        } else {
          return false
        }
      })
    },
    // 获取代理商信息
    getAngentDetail(userID) {
      getAngent({ agentUserId: userID }).then(res => {
        if (res.result === 0) {
          const angentDetail = res.data
          for (const key in this.baseInfo) {
            if (angentDetail[key]) {
              this.baseInfo[key] = angentDetail[key] || ''
            }
          }
          // this.getMerchant()
        } else {
          this.$message({ message: '获取代理商数据失败，请稍后再试', type: 'error' })
        }
      })
    },
    // 保存或者跟新代理商信息
    handleAngentInfo() {
      const postData = this.baseInfo
      postData.agentUserId = this.$route.query.ID
      update(postData).then(res => {
        if (res.result === 0) {
          this.$message({ message: '修改代理商信息成功', type: 'success' })
          this.$router.go(-1)
        } else {
          this.$message({ message: '修改代理商信息失败', type: 'error' })
        }
      })
    }
    // getMerchant() {
    //   getMerchant({ phone: this.baseInfo.loginPhone }).then(res => {
    //     if (res.result === 0 && res.data) {
    //       this.baseInfo.linkUserId = res.data.adUserId
    //       this.linkName = res.data.name
    //     } else {
    //       this.$message({ message: '数据查询失败，请稍后再试', type: 'error' })
    //     }
    //   })
    // }
  }
}
</script>
