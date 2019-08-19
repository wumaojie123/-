<template>
  <div class="lyy-open">
    <div style="margin: 20px;">
      <el-radio v-for="(item, index) in para" v-model="radio" :label="item.cmd" :key="index" :value="index" style=" margin-right: 30px;">{{ item.name }}</el-radio>
    </div>
    <el-form ref="ruleForm" :inline="true" style="margin-bottom: 20px;" label-width="100px" label-position="center">
      <el-form-item v-for="(item, index) in dataList" :label="item.name" :key="index" >
        <template v-if="item.componentType === 'inputFloat' || item.componentType==='inputInt'">
          <el-input v-model="item.componentValue" :disabled="disabled" type="number" maxlength="16" clearable style="width: 300px;">
            <template slot="append">
              {{ item.componentValueUnit }}
              <span style="color:red;">【取值范围{{ item.componentValueRange.min }}-{{ item.componentValueRange.max }}】</span>
            </template>
          </el-input>
        </template>
        <template v-else-if="item.componentType=== 'switch'">
          <el-switch v-model="item.componentValue" :active-value="item.componentValueSwitch.open" :inactive-value="item.componentValueSwitch.close" :disabled="disabled" style="width: 300px;" active-color="#13ce66"/>
        </template>
        <template v-else-if="item.componentType=== 'select'">
          <el-select v-model="item.componentValue" placeholder="请选择" style="width: 300px;">
            <el-option v-for="(item, index) in item.componentValueArray" :key="index" :label="item.text" :value="item.value" :disabled="disabled"/>
          </el-select>
        </template>
      </el-form-item>
    </el-form>
    <div style="text-align:left;margin-top:80px;">
      <el-button type="success" style="margin-left: 20px;" @click="query">重新加载服务套餐列表</el-button>
      <el-button v-if="!disabled" style="margin-left: 20px;" @click="query2()">刷新套餐信息</el-button>
      <el-button v-if="!disabled" style="margin-left: 20px;" type="primary" @click="handleSave">保存设置</el-button>
    </div>
  </div>
</template>

<script>
import { query, configList } from '@/api/device'

export default {
  name: 'ParamC',
  data() {
    return {
      dataList: [],
      para: [],
      radio: '',
      uniqueCode: '',
      disabled: false,
      cmd: '',
      count: 5
    }
  },
  watch: {
    radio(val, oldValue) {
      if (val !== oldValue) {
        this.dataList = []
        this.query2()
        // this.queryList()
      }
    }
  },
  created() {
    this.uniqueCode = this.$route.query.uniqueCode
    this.query()
  },
  methods: {
    // 设备配置
    async query() {
      const postData = {
        uniqueCode: this.uniqueCode,
        functionCode: 'BSYS_SAAS_QUERY_FUNCTION',
        t: Date.now()
      }
      const res = await query(postData)
      if (res.result === 1) {
        this.queryConfigList()
      } else {
        this.$message({ message: res.description || '系统异常', type: 'error' })
      }
    },
    async queryConfigList() {
      const params = {
        uniqueCode: this.uniqueCode,
        functionCode: 'BSYS_SAAS_QUERY_FUNCTION',
        t: Date.now()
      }
      const res = await configList(params)
      if (res.result === 1) {
        this.para = res.para
      }
    },
    async query2() {
      const postData = {
        uniqueCode: this.uniqueCode,
        functionCode: 'BSYS_SAAS_QUERY_PARAM',
        data: JSON.stringify({ 'cmd': this.radio }),
        t: Date.now()
      }
      const res = await query(postData)
      if (res.result === 1) {
        this.queryList()
      }
    },
    async queryList() {
      let list = []
      const params = {
        uniqueCode: this.uniqueCode,
        functionCode: 'BSYS_SAAS_QUERY_PARAM',
        data: JSON.stringify({ 'cmd': this.radio }),
        t: Date.now()
      }
      const res = await configList(params)
      if (res.result === 1 && res.para) {
        this.cmd = res.para.settingCmd
        list = JSON.parse(res.para.params)
        this.disabled = res.para.settingCmd === ''
      } else {
        setTimeout(() => {
          if (this.count > 0) {
            this.count--
            this.queryList()
          } else {
            this.count = 5
            this.$message({ message: `查询失败`, type: 'error' })
          }
        }, 3000)
      }

      for (const key in list) {
        for (const innerKey in list[key]) {
          if (innerKey === 'componentValueRange' || innerKey === 'componentValueSwitch' || innerKey === 'componentValueArray') {
            const check = JSON.parse(list[key][innerKey])
            list[key][innerKey] = check
          }
        }
      }
      this.dataList = list
    },
    async handleSave() {
      for (const key in this.dataList) {
        if (this.dataList[key].componentType === 'inputInt' || this.dataList[key].componentType === 'inputFloat') {
          const check = this.dataList[key].componentValueRange
          if (this.dataList[key].componentValue < parseFloat(check.min) || this.dataList[key].componentValue > parseFloat(check.max)) {
            console.log(this.dataList[key].componentValue, check.min, check.max)
            this.$message({ message: `${this.dataList[key].name}超出取值范围`, type: 'error' })
            return
          }
        }
      }
      const dataInfo = JSON.parse(JSON.stringify(this.dataList))
      for (const key in dataInfo) {
        if (dataInfo[key].componentType === 'inputInt' || dataInfo[key].componentType === 'inputFloat') {
          dataInfo[key].componentValueRange = JSON.stringify(dataInfo[key].componentValueRange)
        } else if (dataInfo[key].componentType === 'switch') {
          dataInfo[key].componentValueSwitch = JSON.stringify(dataInfo[key].componentValueSwitch)
        } else if (dataInfo[key].componentType === 'select') {
          dataInfo[key].componentValueArray = JSON.stringify(dataInfo[key].componentValueArray)
        }
      }
      const postData = {
        data: JSON.stringify({ params: JSON.stringify(dataInfo), cmd: this.cmd }),
        functionCode: 'BSYS_SAAS_SETTING',
        uniqueCode: this.uniqueCode
      }
      const res = await query(postData)
      if (res.result === 1) {
        this.$message({ message: '修改成功', type: 'success' })
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
