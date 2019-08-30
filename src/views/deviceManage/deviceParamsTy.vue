<template>
  <div class="lyy-open">
    <el-row style="margin: 20px;">
      <el-button v-for="(item, index) in dataList" :key="index" type="primary" @click="handleClick(index, item)">{{ item.name }}</el-button>
    </el-row>
    <div style="text-align:left;margin-top:60px;">
      <el-button style="margin-left: 20px;" @click="query()">刷新</el-button>
      <el-button style="margin-left: 60px;" type="primary" @click="handleSave">保存设置</el-button>
    </div>
    <verfyCode v-model="verfyCodeVisible" :phone-number="phoneNumber" :name="name" @on-OK="handleSave"/>
  </div>
</template>

<script>
import { ty, setEquipment, tyPost } from '@/api/device'
import verfyCode from './component/verfyCode'

export default {
  name: 'ParamC',
  components: {
    verfyCode
  },
  data() {
    return {
      dataList: [],
      loginFlag: '',
      uniqueCode: '',
      verfyCodeVisible: false,
      phoneNumber: '',
      name: ''
    }
  },
  created() {
    this.uniqueCode = this.$route.query.uniqueCode
    this.loginFlag = this.$route.query.loginFlag
    this.phoneNumber = this.$route.query.phoneNumber
    this.name = this.$route.query.name
    this.query()
  },
  methods: {
    // 设备配置
    async query() {
      const postData = {
        uniqueCode: this.uniqueCode,
        loginFlag: this.loginFlag,
        t: Date.now()
      }
      const res = await ty(postData)
      if (res.result === 4) {
        this.dataList = res.para.buttons
      } else {
        this.$message({ message: res.description || '系统异常', type: 'error' })
      }
    },
    handleClick(index, item) {
      if (item.params) {
        this.$router.push({ path: '/deviceParamsTyButton', query: { uniqueCode: this.uniqueCode, functionCode: item.functionCode, loginFlag: this.loginFlag, queryFunctionCode: item.queryFunctionCode }})
      } else {
        this.$confirm(`确定${item.name}?`, '温馨提示').then(() => {
          this.handleInfo(item)
        })
      }
    },
    async handleInfo(item) {
      const params = {
        uniqueCode: this.uniqueCode,
        functionCode: item.functionCode
      }
      const res = await setEquipment(params)
      if (res.result === 1) {
        this.$message({ message: '设置成功', type: 'success' })
      } else if (res.result === 0) {
        this.$message({ message: res.description || '系统繁忙', type: 'error' })
      }
    },
    handleSaveBefore() {
      this.verfyCodeVisible = true
    },
    async handleSave() {
      const postData = {
        uniqueCode: this.uniqueCode
      }
      const res = await tyPost(postData)
      if (res.result === 1) {
        this.verfyCodeVisible = false
        this.$message({ message: '修改成功', type: 'success' })
        this.query()
      } else {
        this.$message({ message: res.description, type: 'error' })
      }
    }
  }
}
</script>

<style >
.lyy-open .el-radio+.el-radio {
    margin-left: 0;
    margin-top: 20px;

}
</style>
