<template>
  <div class="content-area">
    <el-form ref="baseInfoRef" :model="baseInfo" :rules="baseInfoRules" label-width="120px" label-position="left" style="margin-top: 20px;">
      <el-form-item label="商家账号" prop="agentUserName">
        <el-input v-model="baseInfo.agentUserName" placeholder="请输入商家账号" type="text" class="input-300" maxlength="64" clearable />
        <span class="input-anno">账号暂不支持修改</span>
      </el-form-item>
      <el-form-item label="商家名称">
        <el-input v-model="baseInfo.phone" placeholder="请输入商家名称" type="tel" class="input-300" maxlength="11" clearable />
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input v-model="baseInfo.linkName" placeholder="请输入联系人姓名" type="text" style="width: 600px;" maxlength="256" clearable />
      </el-form-item>
      <el-button type="primary" @click="handleBaseInfo">保存</el-button>
    </el-form>
  </div>
</template>

<script>
import { update } from '@/api/angentManage'
export default {
  data() {
    return {
      linkName: '',
      baseInfo: { agentUserName: '', linkName: '', phone: '', address: '', code: '', loginPhone: '', type: 2, linkUserId: '' }
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
    },
    changLoginPhone() {
      this.linkName = ''
      this.baseInfo.linkUserId = ''
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
