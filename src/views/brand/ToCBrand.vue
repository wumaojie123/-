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
      baseInfo: { title: '', businessName: '', agentUserId: '', isdel: '', adConsumersConfigId: '' },
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
      if (!isLt2M) {
        this.$message.error('图片大小不能超过500K!')
      }
      return isLt2M
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
      editAdConsumersConfig(postData).then(res => {
        if (res.result === 0) {
          this.$message({ message: res.data, type: 'success' })
        } else {
          this.$message({ message: '新增商家信息失败', type: 'error' })
        }
      })
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
  }
  .popver-img {
    width: 300px;
    height: 300px;
  }
  .input-anno {
    font-size: 16px;
  }
</style>
