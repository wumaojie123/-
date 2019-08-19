<template>
  <div class="lyy-open">
    <div style="margin: 20px;">
      <el-radio v-for="(item, index) in para" v-model="radio" :label="item.cmd" :key="index" :value="index" style=" margin-right: 30px;">{{ item.name }}</el-radio>
    </div>
    <el-form ref="ruleForm" :inline="true" style="margin-bottom: 20px;" label-width="100px" label-position="center">
      <el-form-item v-for="(item, index) in dataList" :label="item.name" :key="index" :class="{'display-none-key': !item.visible}">
        <template v-if="(item.componentType === 'inputFloat' || item.componentType==='inputInt') ">
          <el-input v-model="item.componentValue" :disabled="disabled" type="number" maxlength="16" clearable style="width: 300px;">
            <template slot="append">
              {{ item.componentValueUnit }}
              <span style="color:red;">【取值范围{{ item.componentValueRange.min }}-{{ item.componentValueRange.max }}】</span>
            </template>
          </el-input>
        </template>
        <template v-else-if="item.componentType=== 'switch' ">
          <el-switch v-model="item.componentValue" :active-value="item.componentValueSwitch.open" :inactive-value="item.componentValueSwitch.close" :disabled="disabled" style="width: 300px;" active-color="#13ce66"/>
        </template>
        <template v-else-if="item.componentType=== 'select' ">
          <el-select v-model="item.componentValue" placeholder="请选择" style="width: 300px;">
            <el-option v-for="(item, index) in item.componentValueArray" :key="index" :label="item.text" :value="item.value" :disabled="disabled"/>
          </el-select>
        </template>
      </el-form-item>
    </el-form>
    <div style="text-align:left;margin-top:80px;margin-left: 80px;">
      <el-button type="success" @click="back">返回上一页</el-button>
      <el-button v-if="!disabled" style="margin-left: 100px;" @click="reload">刷新</el-button>
      <el-button v-if="!disabled" style="margin-left: 100px;" type="primary" @click="handleSave">保存设置</el-button>
    </div>
  </div>
</template>

<script>
import { tyBtn, setting } from '@/api/device'
// import { tybtns } from './constant'

export default {
  name: 'ParamC',
  data() {
    return {
      dataList: [],
      para: [],
      disabled: false,
      queryParams: {}
    }
  },
  created() {
    this.queryParams = this.$route.query
    this.queryList()
  },
  methods: {
    async queryList() {
      let list = []
      const res = await tyBtn(this.queryParams)
      // const res = tybtns
      if (res.result === 0) {
        this.$message({ message: res.description, type: 'error' })
      } else if (res.result === 4) {
        const buttons = res.para.buttons
        buttons.forEach(item => {
          /* eslint-disable-next-line */
          if (item.functionCode == this.queryParams.functionCode) {
            list = item.params
          }
        })
      }
      for (const key in list) {
        if (list[key].componentType === 'select') {
          list[key].componentValue = parseInt(list[key].componentValue)
        }
        for (const innerKey in list[key]) {
          if (innerKey === 'componentValueRange' || innerKey === 'componentValueSwitch' || innerKey === 'componentValueArray') {
            const check = list[key][innerKey]
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
      const params = {}
      for (const key in this.dataList) {
        if (this.dataList[key].visible) {
          params[key] = this.dataList[key].componentValue
        }
      }
      params.functionCode = this.queryParams.functionCode
      params.uniqueCode = this.queryParams.uniqueCode
      console.log(JSON.stringify(params))
      const res = await setting(params)
      if (res.result === 1) {
        this.$message({ message: '修改成功', type: 'success' })
        this.queryList()
      } else {
        this.$message({ message: res.description, type: 'error' })
      }
    },
    reload() {
      window.location.reload()
    },
    back() {
      window.history.go(-1)
    }
  }
}
</script>

<style >
.lyy-open .el-radio+.el-radio {
    margin-left: 0;

    margin-top: 20px;

}
.display-none-key{
  display:none!important;
}
</style>
