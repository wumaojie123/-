<template>
  <div class="lyy-open">
    <div style="margin: 20px;">
      <el-radio v-for="(item, index) in para" v-model="radio" :label="item.cmd" :key="index" :value="index">{{ item.name }}</el-radio>
    </div>
    <el-form ref="ruleForm" :inline="true" style="margin-bottom: 20px;" label-width="190px" label-position="center">
      <el-form-item v-for="(item, index) in dataList" :label="item.name" :key="index" style="width: 400px;">
        <template v-if="item.componentType === 'inputFloat' || item.componentType==='inputInt'">
          <el-input v-model="item.componentValue" :disabled="disabled" type="number" style="width: 200px;" maxlength="16" clearable>
            <template slot="append">{{ item.componentValueUnit }}</template>
          </el-input>
        </template>
        <template v-else-if="item.componentType=== 'switch'">
          <el-switch v-model="item.componentValue" :active-value="item.componentValueSwitch.open" :inactive-value="item.componentValueSwitch.close" :disabled="disabled" active-color="#13ce66"/>
        </template>
        <template v-else-if="item.componentType=== 'select'">
          <el-select v-model="item.componentValue" placeholder="请选择">
            <el-option v-for="(item, index) in item.componentValueArray" :key="index" :label="item.text" :value="item.value" :disabled="disabled"/>
          </el-select>
        </template>
      </el-form-item>
    </el-form>
    <div style="text-align:center;margin-top:80px;">
      <el-button v-if="!disabled" @click="handleValue">刷新</el-button>
      <el-button v-if="!disabled" style="margin-left: 200px;" type="primary" @click="handleValue">保存设置</el-button>
    </div>
  </div>
</template>

<script>
import { query, configList } from '@/api/device'
// import { info2 } from './constant'

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
        this.queryList()
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
        console.log(this.disabled, 'this.disabled')
        // console.log(JSON.stringify(list))
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
    handleValue() {
      for (const key in this.dataList) {
        if (this.dataList[key].componentType === 'inputInt' || this.dataList[key].componentType === 'inputFloat') {
          const check = this.dataList[key].componentValueRange
          if (this.dataList[key].componentValue < check.min || this.dataList[key].componentValue > check.max) {
            this.$message({ message: '请选择或输入解绑原因', type: 'error' })
            return
          }
        }
      }
    }
  }
}
</script>

<style >
.lyy-open .el-radio+.el-radio {
    margin-left: 0;
    margin-right: 30px;
    margin-top: 20px;

}
</style>
