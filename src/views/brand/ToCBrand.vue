<template>
  <div class="content-area">
    <el-form ref="baseInfoRef" :model="baseInfo" :rules="baseInfoRules" label-width="180px" label-position="right" style="margin-top: 20px;">
      <el-form-item label="扫码消费页面标题" >
        <el-input v-model="baseInfo.title" placeholder="请输入扫码消费页面标题" type="text" class="input-300" maxlength="10" clearable/>
        <span class="input-anno">用户扫描设备二维码进入页面显示的顶部标题，不超过10个文字
          <el-popover placement="top-start" trigger="hover">
            <img src="@/assets/img/title.png" class="popver-img" style="width: 255px;height: 190px;">
            <span slot="reference" style="color: #409EFF;">查看示例></span>
          </el-popover>
        </span>
      </el-form-item>
      <el-form-item label="扫码消费页面banner图">
        <el-upload
          v-if="!imageUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="uploadUrl"
          class="avatar-uploader">
          <i class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
        <div v-if="imageUrl" class="uploader-wrap">
          <img :src="imageUrl" class="avatar">
          <div class="uploader-wrap-avatar" @click="handleRemove">
            <i class="el-icon-delete el-icon"/>
          </div>
        </div>
        <p class="input-anno" style="margin-left: 0;">1.用户扫描设备二维码进入页面显示的banner图,
          <el-popover placement="top-start" trigger="hover">
            <img src="@/assets/img/banner.png" class="popver-img" style="width: 315px;height: 190px;">
            <span slot="reference" style="color: #409EFF;">查看示例></span>
          </el-popover>
        </p>
        <p class="input-anno" style="margin-left: 0;">2.建议尺寸：375*125px，文件大小不超过500k。</p>
      </el-form-item>
      <el-form-item label="扫码支付品牌名称">
        <el-input v-model="baseInfo.businessName" placeholder="请输入扫码支付品牌名称" type="text" class="input-300" maxlength="10" clearable />
        <span class="input-anno">用户扫码支付时显示的商户品牌名称，不超过10个文字，
          <el-popover placement="top-start" trigger="hover">
            <img src="@/assets/img/pay.png" class="popver-img" style="width: 255px;height: 240px;">
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
        this.$message({ message: '配置信息不能全部为空', type: 'error' })
        return
      }
      editAdConsumersConfig(postData).then(res => {
        if (res.result === 0) {
          this.$message({ message: res.data || '配置信息成功', type: 'success' })
          this.getAdConfig(this.baseInfo.agentUserId)
        } else {
          this.$message({ message: '配置信息失败', type: 'error' })
        }
      })
    },
    handleRemove() {
      this.imageUrl = ''
      this.baseInfo.bannerImg = ''
    }
  }
}
</script>

<style>
  .avatar-uploader{
    display: inline-block;
    position: relative;
  }
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
  .avatar-del{
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate3d(50%, -50%, 0);
  }
  .popver-img {
    width: 300px;
    height: 300px;
  }
  .input-anno {
    font-size: 16px;
  }
  .avatar-wrap{
    width: 200px;
    height: 100px;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(240, 240, 240, .4);
    z-index: 10;
  }
  .avatar-wrap:hover{
    display: block;
  }
  .uploader-wrap{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    width: 302px;
    height: 102px;
  }
  .uploader-wrap-avatar{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    text-align: center;
    opacity: 0;
    background: rgba(0,0,0,.4);
  }
  .uploader-wrap-avatar .el-icon{
    position: absolute;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    text-align: center;
    color: #fff;
    font-size: 30px;
  }

  .uploader-wrap-avatar:hover{
    opacity: 1;
  }
</style>
