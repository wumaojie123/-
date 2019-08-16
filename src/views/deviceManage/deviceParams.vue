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
import { info } from './constant'

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
        this.dataList = []
        setTimeout(() => {
          this.queryList()
        }, 3000)
      }
    }
  },
  created() {
    this.uniqueCode = this.$route.query.uniqueCode || '0000000000030809'
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
    queryList() {
      const list =
        [
          {
            key: 'COIN',
            name: '投币设置',
            length: 1,
            componentType: 'switch',
            componentValueType: 'int',
            componentValue: '01',
            componentValueUnit: '',
            componentValueSwitch: '{"open":"01","close":"00"}'
          },
          {
            key: 'MAX_POWER',
            name: '大输出限制功率',
            length: 2,
            componentType: 'inputInt',
            componentValueType: 'int',
            componentValue: '5033319',
            componentValueUnit: 'W',
            componentValueRange: '{"min":"0","max":"10000"}'
          },
          {
            'key': 'IC_MONEY',
            'name': '每次刷IC卡的消耗金额',
            'length': 1,
            'componentType': 'inputFloat',
            'componentValueType': 'float_0.1',
            'componentValue': '1.3',
            'componentValueUnit': '元',
            'componentValueRange': '{"min":"0","max":"25.5"}'
          },
          {
            'key': 'IC',
            'name': '刷卡设置',
            'length': 1,
            'componentType': 'switch',
            'componentValueType': 'int',
            'componentValue': '00',
            'componentValueUnit': '',
            'componentValueSwitch': '{"open":"01","close":"00"}'
          }
        ]
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
