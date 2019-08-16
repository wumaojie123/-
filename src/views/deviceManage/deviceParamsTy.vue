<template>
  <div class="lyy-open">
    <el-row style="margin: 20px;">
      <el-button v-for="(item, index) in dataList" :key="index" type="primary" @click="handleClick(index, item)">{{ item.name }}</el-button>
    </el-row>
    <div style="text-align:center;margin-top:80px;">
      <el-button @click="query()">刷新</el-button>
      <el-button style="margin-left: 200px;" type="primary" @click="handleSave">保存设置</el-button>
    </div>
  </div>
</template>

<script>
import { ty, setEquipment } from '@/api/device'

export default {
  name: 'ParamC',
  data() {
    return {
      dataList: [],
      loginFlag: '',
      uniqueCode: ''
    }
  },
  created() {
    this.uniqueCode = this.$route.query.uniqueCode
    this.loginFlag = this.$route.query.loginFlag
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
        console.log('ifno')
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
    async handleSave() {
      const postData = {
        uniqueCode: this.uniqueCode
      }
      const res = await ty(postData)
      if (res.result === 1) {
        this.$message({ message: '修改成功', type: 'error' })
        this.query2()
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
