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
      disabled: false
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
          if (this.dataList[key].componentValue < check.min || this.dataList[key].componentValue > check.max) {
            console.log(this.dataList[key].componentValue, check.min, check.max)
            this.$message({ message: `${this.dataList[key].name}超出取值范围`, type: 'error' })
            return
          }
        }
      }
      const postData = {
        data: JSON.stringify(this.dataList),
        functionCode: 'BSYS_SAAS_SETTING',
        uniqueCode: this.uniqueCode
      }
      const res = await query(postData)
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
