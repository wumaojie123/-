<template>
  <div class="content-area">
    <el-form ref="baseInfoRef" :model="baseInfo" :rules="baseInfoRules" label-width="180px" label-position="right" style="margin-top: 20px;">
      <el-form-item label="扫码消费页面标题" >
        <el-input v-model="baseInfo.title" placeholder="请输入扫码消费页面标题" type="text" class="input-300" maxlength="10" clearable/>
        <span class="input-anno">用户扫描设备二维码进入页面显示的顶部标题，不超过10个文字
          <el-popover placement="top-start" trigger="hover">
            <img src="@/assets/img/title.png" class="popver-img">
            <span slot="reference" style="color: #409EFF;">查看示例></span>
          </el-popover>
        </span>
      </el-form-item>
      <el-form-item label="扫码消费页面banner图">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-remove="handleRemove"
          :action="uploadUrl"
          class="avatar-uploader">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
        <p class="input-anno">1.用户扫描设备二维码进入页面显示的banner图,
          <el-popover placement="top-start" trigger="hover">
            <img src="@/assets/img/banner.png" class="popver-img">
            <span slot="reference" style="color: #409EFF;">查看示例></span>
          </el-popover>
        </p>
        <p class="input-anno">2.建议尺寸：xxx*xxxcm，文件大小不超过500k。</p>
      </el-form-item>
      <el-form-item label="扫码支付品牌名称">
        <el-input v-model="baseInfo.businessName" placeholder="请输入扫码支付品牌名称" type="text" class="input-300" maxlength="10" clearable />
        <span class="input-anno">用户扫码支付时显示的商户品牌名称，不超过10个文字，
          <el-popover placement="top-start" trigger="hover">
            <img src="@/assets/img/pay.png" class="popver-img">
            <span slot="reference" style="color: #409EFF;">查看示例></span>
          </el-popover>
        </span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleBaseInfo">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { editAdConsumersConfig, getAdConsumersConfig } from '@/api/brand'
import { getAngent } from '@/api/angentManage'
import uploadUrl from '@/api/upload'

export default {
  data() {
    return {
      baseInfo: { title: '', businessName: '', agentUserId: '', isdel: 'N', adConsumersConfigId: '' },
      baseInfoRules: {},
      imageUrl: '',
      uploadUrl: uploadUrl,
      preUrl: 'http://lyy-public.oss-cn-shenzhen.aliyuncs.com/'
    }
  },
  created() {
    this.getAngentInfo()
  },
  methods: {
    async getAngentInfo() {
      const res = await getAngent()
      if (res.result === 0 && res.data && res.data.agentUserId) {
        this.getAdConfig(res.data.agentUserId)
      }
    },
    async getAdConfig(agentUserId) {
      const res = await getAdConsumersConfig({ agentUserId: agentUserId })
      if (res.result === 0) {
        if (res.data) {
          this.baseInfo = res.data
          if (this.baseInfo.bannerImg) {
            this.imageUrl = `${this.preUrl}${this.baseInfo.bannerImg}`
          }
        } else {
          this.baseInfo = { title: '', businessName: '', agentUserId: agentUserId, isdel: 'N', adConsumersConfigId: '', bannerImg: '' }
        }
      }
    },
    handleAvatarSuccess(res, file) {
      this.baseInfo.bannerImg = res.para
      this.imageUrl = `${this.preUrl}${res.para}`
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 0.5
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      if (!isJPG) {
        this.$message.error('格式为jpeg，png， jpg')
      }
      if (!isLt2M) {
        this.$message.error('文件不能超过500K!')
      }
      return isJPG && isLt2M
    },
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
      if (!postData.title && !postData.bannerImg && !postData.businessName) {
        this.$message({ message: '至少输入一项配置信息失败', type: 'error' })
        return
      }
      editAdConsumersConfig(postData).then(res => {
        if (res.result === 0) {
          this.$message({ message: res.data || '配置信息成功', type: 'success' })
        } else {
          this.$message({ message: '配置信息失败', type: 'error' })
        }
      })
    },
    handleRemove() {

    }
  }
}
</script>

<style>
   .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 300px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 300px;
    height: 100px;
    display: block;
    position: relative;
  }
  .popver-img {
    width: 300px;
    height: 300px;
  }
  .input-anno {
    font-size: 16px;
  }
</style>
