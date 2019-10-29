<template>
  <div class="content-area bd-manage">
    <!-- 账号信息区域 -->
    <el-form
      ref="BDInfoRef"
      :model="BDInfo"
      :rules="BDInfoRules"
      style="margin-top: 20px;"
      label-width="120px"
      label-position="left"
    >
      <el-form-item label="BD姓名" prop="name">
        <el-input v-model="BDInfo.name" placeholder="请输入BD姓名" class="input-300" maxlength="11" />
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="BDInfo.phone" placeholder="请输入手机号码" class="input-300" maxlength="11" />
        <span class="input-anno">请输入11位的手机号码</span>
      </el-form-item>
      <el-form-item label="验证码" prop="phoneCode">
        <el-input v-model="BDInfo.phoneCode" placeholder="请输入验证码" class="input-300" maxlength="6" />
        <el-button
          :disabled="isForbidden"
          type="primary"
          style="margin-left:20px"
          @click="getPhoneCode"
        >{{ text }}</el-button>
      </el-form-item>
      <el-button type="primary" @click.stop.prevent="submit">保存</el-button>
    </el-form>
  </div>
</template>

<script>
// import { telCheck } from '@/utils/rules'
// import { getCode } from '@/api/angentManage'
// import { getQRCode } from '@/api/advertiseDivideOne'
// import QRCode from 'qrcode'
import { verifyCode, validate } from '@/api/device'
import insideManage from '@/api/insideManage'
export default {
  data() {
    // 无号段验证的手机验证
    const validPhoneCode = (rule, value, callback) => {
      if (/^1\d{10}$/.test(value)) callback()
      else {
        callback(new Error('请输入正确的11位手机号'))
      }
    }
    // const validCode = (rule, value, callback) => {
    //   if (this.code) callback()
    //   else {
    //     callback(new Error('验证码不正确'))
    //   }
    // }
    return {
      code: false,
      isgetCode: false, // 是否发送了验证码
      flag: false,
      time: 60,
      timer: null,
      isForbidden: false, // 发送按钮禁用状态
      text: '获取验证码',
      BDInfo: { name: '', phone: '', phoneCode: '' },
      BDInfoRules: {
        name: [{ required: true, message: '请输入BD姓名', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            validator: validPhoneCode,
            trigger: 'blur'
          }
        ],
        phoneCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
          // { validator: validCode, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 获取手机验证码 modify by mjp 2019-10-29
    getPhoneCode() {
      console.log('发送验证码')
      if (!/^1\d{10}/.test(this.BDInfo.phone)) {
        this.$message({ message: '请填写有效的11位手机号码', type: 'error' })
        return
      }
      if (this.flag) {
        return
      }
      this.isForbidden = true
      this.isgetCode = true
      this.text = '正在发送'
      this.flag = true
      verifyCode({ phoneNumber: this.BDInfo.phone }).then(res => {
        // console.log('verifyCode', res)
        setTimeout(() => {
          this.flag = false
        }, 1000)
        if (res.result === 0) {
          this.timer = setInterval(() => {
            this.time = this.time - 1
            this.text = '已发送（' + this.time + '）'
            if (this.time === -1) {
              this.isForbidden = false
              // this.isgetCode = false
              clearInterval(this.timer)
              this.timer = null
              this.text = '重新发送'
              this.time = 60
            }
          }, 1000)
          this.$message({
            message: '手机短信验证码已发送',
            type: 'success'
          })
        } else if (res.result === 102) {
          // console.log(5555)
          this.isForbidden = false
          this.isgetCode = false
          this.$message({
            message: '手机未注册或失效',
            type: 'error'
          })
          this.text = '获取验证码'
        } else {
          this.isForbidden = false
          this.isgetCode = false
          this.$message({
            message: '手机短信验证码发送失败',
            type: 'error'
          })
          this.text = '重新发送'
        }
      })
      // getCode({ phone: this.BDInfo.phone }).then(res => {
      //   console.log('返回的验证码', res)
      // })
    },

    // 验证码校验
    validateCode(valid) {
      const params = {
        phoneNumber: this.BDInfo.phone,
        verifyCode: this.BDInfo.phoneCode
      }
      validate(params).then(res => {
        // console.log('validate', res)
        if (res) {
          // this.createQRCode(res.data)
          // console.log('成功验证', res)
          this.code = true
          if (valid) {
            this.creatBd({
              bdName: this.BDInfo.name,
              loginPhone: this.BDInfo.phone,
              type: 0,
              code: this.BDInfo.phoneCode
            })
            // console.log('增加BD')
          } else {
            return false
          }
        } else {
          this.code = false
          // console.log('error22222222')
          // this.$message({ message: '请输入正确的验证码', type: 'error' })
          // this.BDInfoRules.phoneCode[0].message = '000'
          return false
        }
      })
    },
    submit() {
      this.$refs['BDInfoRef'].validate(valid => {
        if (valid) {
          // console.log('验证完成')
          if (this.isgetCode) {
            this.validateCode(valid)
          } else {
            this.$message({
              message: '请发送验证码',
              type: 'error'
            })
            return
          }
        }
      })
    },
    creatBd(data) {
      insideManage.addBDInfo(data).then(
        res => {
          if (res) {
            // console.log('addBDInfo', res)
            this.$message({
              message: '新增成功!',
              type: 'success'
            })
            setTimeout(() => {
              this.$router.push({ path: 'insideManage/bdRoleManage' })
            }, 1500)
          }
        },
        err => {
          console.log(err, 6655444)
        }
      )
    }
  }
}
</script>

<style>
.input-300 {
  width: 300px;
}

.input-anno {
  margin-left: 20px;
  font-size: 12px;
  color: #b1a8a8;
}
</style>
