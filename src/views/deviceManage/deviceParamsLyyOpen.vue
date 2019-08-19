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
    <div style="text-align:center;margin-top:80px;">
      <el-button v-if="!disabled" @click="query2()">刷新</el-button>
      <el-button v-if="!disabled" style="margin-left: 200px;" type="primary" @click="handleSave">保存设置</el-button>
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
      cmd: ''
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
        t: Date.now()
      }
      const res = await query(postData)
      if (res.result === 1) {
        this.queryList()
      }
    },
    async queryList() {
      let list = []
      console.log(this.radio)
      const params = {
        uniqueCode: this.uniqueCode,
        functionCode: 'BSYS_SAAS_QUERY_PARAM',
        data: JSON.stringify({ 'cmd': this.radio }),
        t: Date.now()
      }
      const res = await configList(params)
      if (res.result === 1) {
        this.cmd = res.para.settingCmd
        list = JSON.parse(res.para.params)
        this.disabled = res.para.settingCmd === ''
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
      console.log(JSON.stringify(this.dataList))
      const postData = {
        data: JSON.stringify({ params: JSON.stringify(this.dataList), cmd: this.cmd }),
        functionCode: 'BSYS_SAAS_SETTING',
        uniqueCode: this.uniqueCode
      }
      console.log(postData.data)
      postData.data = JSON.stringify({ 'params': '[{"key":"MAX_POWER","name":"最大输出限制功率","length":2,"componentType":"inputInt","componentValueType":"int","componentValue":"123","componentValueUnit":"W","componentValueRange":"{\\"min\\":\\"0\\",\\"max\\":\\"10000\\"}"},{"key":"IC_MONEY","name":"每次刷IC卡的消耗金额","length":1,"componentType":"inputFloat","componentValueType":"float_0.1","componentValue":"1.9","componentValueUnit":"元","componentValueRange":"{\\"min\\":\\"0\\",\\"max\\":\\"25.5\\"}"},{"key":"TIME1","name":"第一个币的充电时间","length":2,"componentType":"inputInt","componentValueType":"int","componentValue":"12","componentValueUnit":"分","componentValueRange":"{\\"min\\":\\"0\\",\\"max\\":\\"999\\"}"},{"key":"TIME2","name":"第二个币的充电时间","length":2,"componentType":"inputInt","componentValueType":"int","componentValue":"34","componentValueUnit":"分","componentValueRange":"{\\"min\\":\\"0\\",\\"max\\":\\"999\\"}"},{"key":"TIME3","name":"第三个币的充电时间","length":2,"componentType":"inputInt","componentValueType":"int","componentValue":"56","componentValueUnit":"分","componentValueRange":"{\\"min\\":\\"0\\",\\"max\\":\\"999\\"}"}]', 'cmd': 'ee08' })
      console.log(postData.data)

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
