 <!--suppress ALL -->
<template>
  <div class="content-area bd-manage">
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">身份验证</el-menu-item>
    </el-menu>
    <el-form ref="baseInfoRef" :model="baseInfo" :rules="baseInfo&&baseInfoRules" label-width="80px" label-position="left" style="margin-top: 20px;">
      <el-form-item label="手机号" prop="loginPhone">
        <el-input v-model="baseInfo.loginPhone" placeholder="请输入手机号" maxlength="11" clearable style="width: 275px;" />
        <span class="input-anno">请填写手机号码</span>
      </el-form-item>
      <el-form-item v-if="isShowCodeTag" label="验证码" prop="code">
        <el-input v-model="baseInfo.code" placeholder="请输入验证码" style="width: 160px;" maxlength="8" clearable />
        <el-button :disabled="text !== '获取验证码' || flag" type="primary" @click="getCode">{{ text }}</el-button>
        <span class="input-anno">请查收手机短信，并填写短信中的验证码</span>
      </el-form-item>
      <el-form-item style="padding-top: 20px;">
        <el-button type="primary" @click="onNextStepBtnClick">下一步</el-button>
        <el-button @click="onCancelBtnClick">取消</el-button>
      </el-form-item>
    </el-form>
    <div v-show="showQRTag" class="mask-box">
      <div class="wrapper">
        <div class="close" @click.stop="showQRTag = !showQRTag">X</div>
        <h2>微信关联</h2>
        <canvas id="canvas"/>
        <p>请用提现的微信扫描二维码</p>
        <p>广告收益将提现至此微信钱包</p>
        <div class="back-btn">
          <el-button type="primary" @click="onBackBtnClick">返回首页</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validateTel } from '@/utils/validate'
import { telCheck } from '@/utils/rules'
import { getCode } from '@/api/angentManage'
import { getQRCode } from '@/api/advertiseDivideOne'
import QRCode from 'qrcode'
export default {
  data() {
    return {
      showQRTag: false,
      text: '获取验证码',
      time: 60,
      timer: null,
      isShowCodeTag: true,
      flag: false,
      baseInfo: { code: '', loginPhone: '' },
      baseInfoRules: {
        loginPhone: [{ required: true, validator: telCheck, message: '请填写有效的11位手机号码', trigger: 'blur' }],
        code: [{ required: true, message: '请填写短信验证码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onCancelBtnClick() {
      this.$router.go(-1)
    },
    onNextStepBtnClick() {
      this.$refs['baseInfoRef'].validate((valid) => {
        if (valid) {
          this.getQRCode()
        } else {
          return false
        }
      })
    },
    getQRCode() {
      const params = {
        phone: this.baseInfo.loginPhone,
        code: this.baseInfo.code
      }
      getQRCode(params).then(res => {
        if (res.result === 0) {
          this.createQRCode(res.data)
        } else {
          this.$message({ message: '请输入正确的验证码', type: 'error' })
        }
      })
    },
    getCode() {
      if (!validateTel(this.baseInfo.loginPhone)) {
        this.$message({ message: '请填写有效的11位手机号码', type: 'error' })
        return
      }
      if (this.flag) {
        return
      }
      this.flag = true
      getCode({ phone: this.baseInfo.loginPhone }).then(res => {
        setTimeout(() => { this.flag = false }, 1000)
        if (res.result === 0) {
          this.timer = setInterval(() => {
            this.time = this.time - 1
            this.text = this.time + '秒后可以重新获取验证码'
            if (this.time === -1) {
              clearInterval(this.timer)
              this.timer = null
              this.text = '获取验证码'
              this.time = 60
            }
          }, 1000)
          this.$message({ message: '手机短信验证码已经发送成功', type: 'success' })
        } else {
          this.$message({ message: '手机短信验证码已经发送失败', type: 'error' })
        }
      })
    },
    createQRCode(url) {
      this.showQRTag = true
      const canvas = document.getElementById('canvas')
      QRCode.toCanvas(canvas, url, {
        width: 200,
        height: 200
      })
    },
    onBackBtnClick() {
      this.$router.go(-1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.input-anno {
  margin-left: 20px;
  font-size: 12px;
  color: #b1a8a8;
}
.ovh{
  overflow: hidden;
}
.fl{
  float: left;
}
.mb5{
  margin-bottom: 5px;
}
.mt10{
  margin-top: 10px;
}
.mask-box{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 8888;
  background-color: rgba(0,0,0,.5);
  .wrapper{
    position: absolute;
    min-width: 300px;
    left: 50%;
    top: 50%;
    background-color: #fff;
    padding: 20px;
    transform: translate(-50%,-50%);
    .close{
      font-size: 16px;
      position: absolute;
      top: 14px;
      cursor: pointer;
      right: 20px;
    }
    h2{
      font-size: 16px;
      color: #666;
      padding-bottom: 20px;
    }
    canvas{
      display: block;
      margin: 0 auto;
    }
    p{
      padding-top: 10px;
      font-size: 14px;
      color: #666;
      text-align: center;
    }
  }
  .back-btn{
    text-align: center;
    margin-top: 15px;
  }
}
</style>
