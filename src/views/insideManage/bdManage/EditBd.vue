<template>
  <div class="content-area bd-manage">
    <!-- 账号信息区域 -->
    <el-form ref="InsideManageEditBdRef" :model="BDInfo" :rules="BDInfoRules" style="margin-top: 20px;" label-width="120px" label-position="left">
      <el-form-item label="BD姓名" prop="name">
        <el-input v-model="BDInfo.name" placeholder="请输入BD姓名" class="input-300" maxlength="11" />
      </el-form-item>
      <el-form-item label="手机号码" >
        <div>{{ BDInfo.phone }}<span class="input-anno">如需更改账号或密码，请联系系统管理员</span></div>
      </el-form-item>
      <br>
      <el-button type="primary" @click="submit">保存</el-button>
    </el-form>
  </div>
</template>

<script>
import insideManage from '@/api/insideManage'
export default {
  name: 'BdeditView',
  data() {
    return {
      BDInfo: { name: '', phone: '1111111', agentUserId: '' },
      BDInfoRules: {
        name: [{ required: true, message: '请输入BD姓名', trigger: 'blur' }]
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      this.getBdInfo(this.$route.query.id, this.$route.query.phone)
    }
  },
  methods: {
    submit() {
      this.$refs['InsideManageEditBdRef'].validate(valid => {
        if (valid) {
          this.editBD({
            type: 0,
            agentUserId: this.BDInfo.agentUserId,
            phone: this.BDInfo.phone,
            agentUserName: this.BDInfo.name
          })
        } else {
          return false
        }
      })
    },
    getBdInfo(id, phone) {
      insideManage.getAgentInfo(id).then(res => {
        this.BDInfo.name = res.data.agentUserName || ''
        this.BDInfo.phone = res.data.phone || '未录入手机号'
        this.BDInfo.agentUserId = res.data.agentUserId || ''
      }, err => {
        console.log(err)
      })
    },
    editBD(data) {
      insideManage.updateAgentInfo(data).then(res => {
        this.$message({
          message: '修改成功,稍后跳转!',
          type: 'success'
        })
        setTimeout(() => {
          this.$router.push({ path: 'insideManage/bdRoleManage' })
        }, 500)
      }, err => {
        console.log(err, 'updateAgentInfo')
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
