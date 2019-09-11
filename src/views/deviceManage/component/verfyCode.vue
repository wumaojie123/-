<template>
  <el-dialog :visible.sync="value" :close-on-click-modal="false" title="操作验证" width="45%">
    <el-form label-width="120px" label-position="right" >
      <el-form-item label="设备所属商家" prop="description">
        <el-input v-model="info" placeholder="请输入菜单名称" class="input-300" maxlength="6" readonly/>
      </el-form-item>
      <el-form-item label="操作验证码" prop="price">
        <el-input v-model="verifyCode" type="tel" class="input-300" clearable maxlength="6"/>
        <el-button type="primary" @click="handleSend">获取验证码</el-button>
      </el-form-item>
      <p style="color:red; margin-left: 120px;">请联系商家获取短信验证码</p>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleOK">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { verifyCode, validate } from '@/api/device'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    phoneNumber: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      verifyCode: '',
      disabled: true
    }
  },
  computed: {
    info() {
      return `${this.name}-${this.phoneNumber}`
    }
  },
  methods: {
    async handleSend() {
      if (!this.disabled) {
        return
      }
      this.disabled = false
      setTimeout(() => { this.disabled = true }, 2000)
      const res = await verifyCode({ phoneNumber: this.phoneNumber })
      this.disabled = true
      if (res.result === 0) {
        this.$message({ message: '获取短信验证码成功', type: 'success' })
      } else {
        this.$message({ message: '获取短信验证码失败', type: 'error' })
      }
    },
    handleCancel() {
      this.disabled = true
      this.$emit('input', false)
    },
    handleOK() {
      if (!this.verifyCode) {
        this.$message({ message: '请输入短信验证码', type: 'error' })
        return
      }
      this.handlevalidate()
    },
    async handlevalidate() {
      const res = await validate({ phoneNumber: this.phoneNumber, verifyCode: this.verifyCode })
      if (res.result === 0) {
        this.disabled = true
        this.$emit('on-OK')
      } else {
        this.$message({ message: '短信验校验失败', type: 'success' })
      }
    }
  }
}
</script>
