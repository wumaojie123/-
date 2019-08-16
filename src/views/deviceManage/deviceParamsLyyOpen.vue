<template>
  <div>
    <div style="margin: 20px;">
      <el-radio v-for="(item, index) in para" v-model="radio" :label="item.cmd" :key="index">{{ item.name }}</el-radio>
    </div>
    <el-form ref="ruleForm" :inline="true" style="margin-bottom: 20px;" label-width="190px" label-position="center">
      <el-form-item v-for="(item, index) in dataList" :label="item.name" :key="index" style="width: 400px;">
        <template v-if="item.componentType === 'inputFloat' || item.componentType==='inputInt'">
          <el-input v-model="item.componentValue" type="number" style="width: 200px;" maxlength="16" clearable>
            <template slot="append">{{ item.componentValueUnit }}</template>
          </el-input>
        </template>
        <template v-else-if="item.componentType=== 'switch'">
          <el-switch v-model="item.componentValue" :active-value="item.componentValueSwitch.open" :inactive-value="item.componentValueSwitch.close" active-color="#13ce66"/>
        </template>
      </el-form-item>
    </el-form>
    <div >
      <el-button @click="handleValue">保存设置</el-button>
    </div>
  </div>
</template>

<script>
import { query, configList } from '@/api/device'
import { info, info2 } from './constant'

export default {
  name: 'ParamC',
  data() {
    return {
      dataList: [],
      para: [],
      radio: '',
      uniqueCode: ''
    }
  },
  watch: {
    radio(val, oldValue) {
      if (val !== oldValue) {
        console.log(val)
        this.dataList = []
        setTimeout(() => {
          this.queryList()
        }, 1000)
      }
    }
  },
  created() {
    this.uniqueCode = this.$route.query.uniqueCode
    this.para = info.para
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
      if (res.result === 0) {
        this.para = res.para
      }
    },
    async query2() {
      const postData = {
        uniqueCode: this.uniqueCode,
        data: { 'cmd': this.radio },
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
      // const params = {
      //   uniqueCode: this.uniqueCode,
      //   functionCode: 'BSYS_SAAS_QUERY_PARAM',
      //   t: Date.now()
      // }
      list = JSON.parse(info2.para.params)
      // const res = await configList(params)
      // if (res.result === 0) {
      //   this.para = res.para
      // }

      for (const key in list) {
        for (const innerKey in list[key]) {
          if (innerKey === 'componentValueRange' || innerKey === 'componentValueSwitch') {
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
