<template>
  <div class="content-area">
    <div style="border-bottom: 1px solid #f0f0f0;">
      <h1 style="font-size: 28px;font-weight: 700;">运营商后台定制链接</h1>
      <el-form label-position="right" style="margin-top: 20px;">
        <el-form-item >
          <el-input v-model="linkInfo" placeholder="链接地址" type="text" class="input-600" readonly maxlength="10" clearable/>
          <el-button class="copy-link" type="primary" @click="handleClipboard($event)">复制链接</el-button>
          <p class="input-anno">1.通过定制链接进入管理后台可实现以下配置的功能。</p>
          <p class="input-anno">2.可将链接插入公众号菜单或发送给运营商。</p>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-top: 20px;border-bottom: 1px solid #f0f0f0;">
      <h1 style="font-size: 28px;font-weight: 700;">品牌信息配置</h1>
      <el-form ref="baseInfoRef" :model="baseInfo" :rules="baseInfoRules" label-width="180px" label-position="right" style="margin-top: 20px;">
        <el-form-item label="运营商后台标题" >
          <el-input v-model="baseInfo.title" placeholder="请输入运营商后台标题" type="text" class="input-300" maxlength="10" clearable/>
          <span class="input-anno">运营商管理后台页面顶部标题，最多可输入10个文字
            <el-popover placement="top-start" trigger="hover">
              <img src="@/assets/img/b-title.png" class="popver-img">
              <span slot="reference" style="color: #409EFF;">查看示例></span>
            </el-popover>
          </span>
        </el-form-item>
        <el-form-item label="运营商后台logo">
          <el-upload
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :action="uploadUrl"
            class="avatar-uploader">
            <img v-if="bannerUrl" :src="bannerUrl" class="avatar" style="width: 74px;height: 98px;">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
          <p class="input-anno">1.运营商后台登陆页logo，
            <el-popover placement="top-start" trigger="hover">
              <img src="@/assets/img/logo.png" class="popver-img">
              <span slot="reference" style="color: #409EFF;">查看示例></span>
            </el-popover>
          </p>
          <p class="input-anno">2.建议尺寸：148*195px，文件大小不超过500k，建议格式：png格式，透明底</p>
        </el-form-item>
        <el-form-item label="运营商后台客服电话">
          <el-input v-model="baseInfo.telephone" placeholder="请输入运营商后台客服电话" type="text" class="input-300" maxlength="10" clearable />
          <span class="input-anno">
            <el-popover placement="top-start" trigger="hover">
              <img src="@/assets/img/phone.png" class="popver-img">
              <span slot="reference" style="color: #409EFF;">查看示例></span>
            </el-popover>
          </span>
        </el-form-item>
        <el-form-item label="运营商后台客服微信">
          <el-upload
            :show-file-list="false"
            :on-success="handleWechartSuccess"
            :before-upload="beforeAvatarUpload"
            :action="uploadUrl"
            class="avatar-uploader">
            <img v-if="wechartUrl" :src="wechartUrl" class="avatar" style="width: 130px;height: 130px;">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
          <span class="input-anno">请上传客服公众号或个人微信二维码; 建议尺寸：344*344px
            <el-popover placement="top-start" trigger="hover">
              <img src="@/assets/img/qrcode.png" class="popver-img">
              <span slot="reference" style="color: #409EFF;">查看示例></span>
            </el-popover>
          </span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleBaseInfo">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-top: 20px;">
      <h1 style="font-size: 28px;font-weight: 700;">功能配置</h1>
      <div style="height: 160px;line-height: 160px;text-align:center;font-weight: 700;font-size: 30px;">功能开发中，敬请期待！</div>
    </div>
  </div>
</template>

<script>
import { getAdBrandConfig, editAdBrandConfig } from '@/api/brand'
import { getAngent } from '@/api/angentManage'
import uploadUrl from '@/api/upload'
import clipboard from '@/utils/clipboard'

export default {
  data() {
    return {
      baseInfo: { title: '', agentUserId: '', isdel: '', wechatImg: '', telephone: '', bannerImg: '', adBrandConfigId: '' },
      baseInfoRules: {
      },
      imageUrl: '',
      bannerUrl: '',
      wechartUrl: '',
      uploadUrl: uploadUrl,
      preUrl: 'http://lyy-public.oss-cn-shenzhen.aliyuncs.com/',
      linkInfo: '',
      btn: ''
    }
  },
  created() {
    this.getAngentInfo()
  },
  mounted() {
  },
  methods: {
    handleClipboard() {
      clipboard(this.linkInfo, event)
    },
    async getAngentInfo() {
      const res = await getAngent()
      if (res.result === 0) {
        if (res.data && res.data.agentUserId) {
          this.linkInfo = `https://b.leyaoyao.com/group/index.html?ag=${res.data.agentUserId}`
          this.getAdConfig(res.data.agentUserId)
        }
      }
    },
    async getAdConfig(agentUserId) {
      const res = await getAdBrandConfig({ agentUserId: agentUserId })
      if (res.result === 0) {
        if (res.data) {
          this.baseInfo = res.data
          this.bannerUrl = `${this.preUrl}${this.baseInfo.bannerImg}`
          this.wechartUrl = `${this.preUrl}${this.baseInfo.wechatImg}`
        } else {
          this.baseInfo = { title: '', agentUserId: agentUserId, isdel: '', wechatImg: '', telephone: '', bannerImg: '', adBrandConfigId: '' }
        }
      }
    },
    handleAvatarSuccess(res, file) {
      this.baseInfo.bannerImg = res.para
      this.bannerUrl = `${this.preUrl}${res.para}`
    },
    handleWechartSuccess(res, file) {
      this.baseInfo.wechatImg = res.para
      this.wechartUrl = `${this.preUrl}${res.para}`
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 0.5
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      if (!isJPG) {
        this.$message.error('文件格式为jpeg，png，jpg')
      }
      if (!isLt2M) {
        this.$message.error('文件大小不能超过500K!')
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
      if (postData.title && !postData.wechatImg && !postData.telephone && !postData.bannerImg) {
        this.$message({ message: '至少输入一项配置信息失败', type: 'error' })
        return
      }
      editAdBrandConfig(postData).then(res => {
        if (res.result === 0) {
          this.$message({ message: res.data || '消费者前台信息配置成功', type: 'success' })
        } else {
          this.$message({ message: '配置信息失败', type: 'error' })
        }
      })
    }
  }
}
</script>

<style>
  .input-600{
    width: 600px;
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
    width: 200px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 200px;
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
