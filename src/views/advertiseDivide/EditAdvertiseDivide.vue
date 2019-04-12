 <!--suppress ALL -->
<template>
  <div v-loading="showLoadingTag" class="content-area bd-manage edit-ad-divide-panel">
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">基础信息</el-menu-item>
    </el-menu>
    <el-form ref="baseInfoRef" :model="baseInfo" :rules="rules" status-icon label-width="150px" label-position="left" style="margin-top: 20px;">
      <el-form-item label="代理商名称" prop="agentUserName">
        <el-input v-model="baseInfo.agentUserName" disabled placeholder="请输入代理商名称" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="代理商账号" prop="agentUserLoginId">
        <el-input v-model="baseInfo.agentUserLoginId" disabled placeholder="请输入代理商账号" style="width: 370px;" />
      </el-form-item>
      <div class="info-panel">
        <span>总额</span>
        <span class="rel">
          <el-input v-model="baseInfo.total" disabled style="margin-right: 28px;margin-left: 118px;width: 150px;" />
          <span class="money-sign">￥</span>
        </span>
        <span>余额</span>
        <span class="rel">
          <el-input v-model="baseInfo.balance" disabled style="margin-left: 5px;width: 150px;" />
          <span class="money-sign2">￥</span>
        </span>
      </div>
      <el-form-item label="是否广告分成" prop="isset">
        <el-radio v-model="baseInfo.isset" label="1">是</el-radio>
        <el-radio v-model="baseInfo.isset" label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="广告分成最少上线数" prop="minEquipmentCount">
        <el-input v-model="baseInfo.minEquipmentCount" maxlength="6" placeholder="请输入广告分成最小上线数" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="广告分成比率" prop="adRate">
        <el-input v-model="baseInfo.adRate" placeholder="请输入广告分成比率" style="width: 370px;" />
        <span>&nbsp;%</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAccountInfo('baseInfoRef')">保存</el-button>
        <el-button type="primary" @click="onBackBtnClick">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updateAgentInfo } from '@/api/advertiseDivide'
export default {
  data() {
    const checkInteger = (rule, value, callback) => {
      const reg = /^(0|[1-9][0-9]*)$/
      if (!reg.test(value)) {
        callback(new Error('请输入0-100范围内的整数'))
      } else {
        if (value > 100) {
          callback(new Error('请输入0-100范围内的整数'))
        } else {
          callback()
        }
      }
    }
    const checkInteger2 = (rule, value, callback) => {
      const reg = /^(0|[1-9][0-9]*)$/
      if (!reg.test(value)) {
        callback(new Error('请输入整数'))
      } else {
        callback()
      }
    }
    return {
      baseInfo: {},
      showLoadingTag: false,
      rules: {
        minEquipmentCount: [
          { validator: checkInteger2, trigger: 'blur' }
        ],
        adRate: [
          { validator: checkInteger, trigger: 'blur' }
        ]
      }
    }
  },
  async created() {
    const baseInfo = JSON.parse(this.$route.query.row)
    baseInfo.total = baseInfo.total || '0.00'
    baseInfo.isset = baseInfo.isset ? ('' + baseInfo.isset) : '0'
    baseInfo.minEquipmentCount = baseInfo.minEquipmentCount || 0
    baseInfo.balance = baseInfo.balance || '0.00'
    baseInfo.adRate = baseInfo.adRate * 100 || 0
    this.baseInfo = baseInfo
  },
  methods: {
    handleAccountInfo(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const submitData = {
            bdId: this.baseInfo.bdId,
            agentUserId: this.baseInfo.agentUserId,
            isset: this.baseInfo.isset,
            minEquipmentCount: this.baseInfo.minEquipmentCount,
            adRate: this.baseInfo.adRate / 100
          }
          this.showLoadingTag = true
          updateAgentInfo(submitData).then(res => {
            this.showLoadingTag = false
            if (res.result === 0) {
              this.$message({ message: '保存成功', type: 'success' })
              setTimeout(function() {
                _this.$router.go(-1)
              }, 1000)
            }
          })
        } else {
          return false
        }
      })
    },
    onBackBtnClick() {
      this.$router.go(-1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.ovh{
  overflow: hidden;
}
.fl{
  float: left;
}
.rel{
  position: relative;
}
.mb5{
  margin-bottom: 5px;
}
.mt10{
  margin-top: 10px;
}
.edit-ad-divide-panel{
  .info-panel{
    padding-bottom: 35px;
    border-bottom: 1px solid #F0F0F0;
    .money-sign{
      position: absolute;
      left: 118px;
      top: 2px;
      color: #c0c4cc;
    }
    .money-sign2{
      position: absolute;
      left: 5px;
      top: 2px;
      color: #c0c4cc;
    }
  }
}
.hint-info-panel{
  margin-left: 120px;
  color: #666;
  text-align: justify;
  line-height: 20px;
  font-size: 13px;
  overflow: hidden;
}
</style>
