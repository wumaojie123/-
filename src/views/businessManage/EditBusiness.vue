<template>
  <div class="content-area">
    <el-form ref="baseInfoRef" :model="baseInfo" :rules="baseInfoRules" label-width="120px" label-position="right" style="margin-top: 20px;">
      <el-form-item label="商家账号" prop="loginPhone">
        <el-input v-model="baseInfo.loginPhone" placeholder="请输入商家账号" type="text" class="input-300" maxlength="64" disabled />
        <span class="input-anno">账号暂不支持修改</span>
      </el-form-item>
      <el-form-item label="商家名称">
        <el-input v-model="baseInfo.agentUserName" placeholder="请输入商家名称" type="tel" class="input-300" maxlength="11" clearable />
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input v-model="baseInfo.linkName" placeholder="请输入联系人姓名" type="text" class="input-300" maxlength="256" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAngentInfo">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { update } from '@/api/businessManage'
export default {
  data() {
    return {
      baseInfo: { loginPhone: '', linkName: '', agentUserName: '', adOrgId: '' },
      baseInfoRules: {
        loginPhone: [{ required: true, message: '请输入商家账号', trigger: 'blur' }]
      }
    }
  },
  created() {
    const baseInfo = JSON.parse(decodeURIComponent(this.$route.params.info))
    this.baseInfo.loginPhone = baseInfo.userName
    this.baseInfo.linkName = baseInfo.linkName
    this.baseInfo.agentUserName = baseInfo.merchantName
    this.baseInfo.adOrgId = baseInfo.adOrgId
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
    // 更新商家信息
    handleAngentInfo() {
      const postData = this.baseInfo
      update(postData).then(res => {
        if (res.result === 0) {
          this.$message({ message: '编辑商家信息成功', type: 'success' })
          this.$router.go(-1)
        } else {
          this.$message({ message: '编辑商家信息失败', type: 'error' })
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
