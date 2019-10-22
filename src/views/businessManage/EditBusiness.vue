<template>
  <div class="content-area">
    <el-form ref="baseInfoRef" :model="baseInfo" :rules="baseInfoRules" label-width="120px" label-position="right" style="margin-top: 20px;">
      <el-form-item label="商家账号" prop="userName">
        <el-input v-model="baseInfo.userName" placeholder="请输入商家账号" type="text" class="input-300" maxlength="11" disabled />
        <span class="input-anno">账号暂不支持修改</span>
      </el-form-item>
      <el-form-item label="商户品牌名称">
        <el-input v-model="baseInfo.merchantName" placeholder="请输入商户品牌名称" type="tel" class="input-300" maxlength="16" disabled />
        <span class="input-anno">“商户品牌名称”设置后，商家可以在手机B端后台修改。修改路径：我的 > 品牌信息设置 > 商户品牌名称</span>
      </el-form-item>
      <el-form-item label="商家名称">
        <el-input v-model="baseInfo.linkName" placeholder="请输入商家名称" type="text" class="input-300" maxlength="16" disabled />
        <span class="input-anno">“商家名称”设置后，将显示在手机B端后台的账号信息中，且无法修改。未设置的，请通知商家前往B端后台设置</span>
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input v-model="baseInfo.description" style="width: 550px;" placeholder="请输入10字以内备注信息（备注信息仅供你自己查看，便于记录商家信息）" type="text" class="input-300" maxlength="10" clearable />
      </el-form-item>
      <el-form-item label="商家权限">
        <el-checkbox-group v-model="check">
          <el-checkbox label="禁用设备/启用设备"/>
          <span class="input-anno">（取消勾选后，该商家在B端后台则无权限 “禁用设备” 和 “启用设备”，此功能仅对与代理关联的设备生效）</span>
        </el-checkbox-group>
        <p style="color: #606266;">注意：“禁用设备”功能，目前只适用于  按摩椅、足疗机、按摩垫、洗衣机、充电桩、扭蛋机。</p>
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
      baseInfo: { userName: '', linkName: '', merchantName: '', adOrgId: '', merchantAuthority: '', description: '' },
      check: false,
      baseInfoRules: {
        userName: [{ required: true, message: '请输入商家账号', trigger: 'blur' }]
      }
    }
  },
  created() {
    const baseInfo = JSON.parse(decodeURIComponent(this.$route.params.info))
    this.baseInfo.userName = baseInfo.userName
    this.baseInfo.linkName = baseInfo.linkName
    this.baseInfo.merchantName = baseInfo.merchantName
    this.baseInfo.adOrgId = baseInfo.adOrgId
    this.baseInfo.description = baseInfo.description
    this.check = baseInfo.merchantAuthority === 1
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
      console.log(this.check ? 1 : 0)
      postData.merchantAuthority = this.check ? 1 : 0
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
