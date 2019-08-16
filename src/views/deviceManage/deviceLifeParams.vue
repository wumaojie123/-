<template>
  <div style="margin: 40px;">
    <div class="">{{ params.type }} {{ params.value }}</div>
    <el-form>
      <el-form-item label="脉冲设置">
        <el-select v-model="index" placeholder="请选择">
          <el-option v-for="(item, index) in list" :key="item.value" :label="item.pulsePatternName" :value="index"/>
        </el-select>
      </el-form-item>
      <div v-if="flag">
        <el-form-item label="脉冲宽度">
          <el-input v-model="modalData.agentUserName" placeholder="请输入10~1000之间整数" type="number" class="input-300" maxlength="4" clearable />
        </el-form-item>
        <el-form-item label="脉冲间隔">
          <el-input v-model="modalData.linkName" placeholder="请输入10~1000之间整数" type="number" class="input-300" maxlength="4" clearable />
        </el-form-item>
      </div>
      <el-form-item label="待机电平">
        <el-radio v-model="type" label="1">常开</el-radio>
        <el-radio v-model="type" label="2">常闭</el-radio>
      </el-form-item>
    </el-form>
    <p style="font-size: 14px;color: red;"> 脉冲设置： 脉冲宽度{{ dataInfo.pulseWidth1 }}, 脉冲间隔 {{ dataInfo.pulseInterval1 }}</p>
  </div>
</template>

<script>
import { cxNewEquipment, readNewEquipment, equipmentParamDef, szNewEquipment } from '@/api/device'
import { k, b } from './constant'

export default {
  name: 'ParamC',
  data() {
    return {
      params: {},
      list: [],
      index: '',
      dataInfo: {},
      modalData: {},
      type: '1',
      flag: true
    }
  },
  watch: {
    index(val) {
      const info = this.list[val]
      if (info.pulsePatternName === '自定义') {
        this.flag = true
      } else {
        this.flag = false
      }
    }
  },
  created() {
    this.params = this.$route.query
    this.list = k.data.concat([{ pulsePatternName: '自定义 ' }])
    this.dataInfo = b.para
    this.query()
  },
  methods: {
    async query() {
      const postData = {
        value: this.params.value,
        data: 1
      }
      const res = await cxNewEquipment(postData)
      if (res.result === 1) {
        this.getReadNewEquipment()
      } else {
        this.$message({ message: '参数读取失败,不能设置', type: 'error' })
      }
    },
    async getReadNewEquipment() {
      const params = {
        typeValue: this.params.typeValue,
        value: this.params.value
      }
      const res = await readNewEquipment(params)
      if (res.result === 0) {
        this.list = res.data
      }
    },
    async getEquipmentParamDef() {
      const params = { equipmentId: this.params.value }
      const res = await equipmentParamDef(params)
      if (res.result === 1) {
        this.dataInfo = res.para
      }
    },
    async saveNewEquipment() {
      const params = {
        value: this.params.value
      }
      const res = await szNewEquipment(params)
      if (res.result === 0) {
        this.$message({ message: '设置成功', type: 'error' })
      }
    }
  }
}
</script>
