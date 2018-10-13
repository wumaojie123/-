<template>
  <div class="content-area">
    <!-- 账号信息区域 -->
    <el-form ref="BDInfoRef" :model="BDInfo" :rules="BDInfoRules" style="margin-top: 20px;" label-width="120px" label-position="left">
      <el-form-item label="BD姓名" prop="name">
        <el-input v-model="BDInfo.name" placeholder="请输入BD姓名" class="input-300" maxlength="11" />
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="BDInfo.phone" placeholder="请输入手机号码" class="input-300" maxlength="11" />
        <span class="input-anno">请输入11位的手机号码</span>
      </el-form-item>
      <br>
      <el-button type="primary" @click.stop.prevent="submit">保存</el-button>
    </el-form>
  </div>
</template>

<script>
import { telCheck } from '@/utils/rules'
import insideManage from '@/api/insideManage'
export default {
  data() {
    return {
      BDInfo: { name: '', phone: '' },
      BDInfoRules: {
        name: [{ required: true, message: '请输入BD姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }, { validator: telCheck, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submit() {
      this.$refs['BDInfoRef'].validate(valid => {
        if (valid) {
          this.creatBd({
            type: 0,
            agentUserName: this.BDInfo.name,
            loginPhone: this.BDInfo.phone
          })
        } else {
          return false
        }
      })
    },
    creatBd(data) {
      insideManage.addBD(data).then(res => {
        this.$router.push({ path: '/insideManage/bdRoleManage/bdList' })
      }, err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
  .input-300{
    width: 300px;
  }
  .input-anno{
    margin-left: 20px;
    font-size: 12px;
    color:#b1a8a8;
  }
</style>
