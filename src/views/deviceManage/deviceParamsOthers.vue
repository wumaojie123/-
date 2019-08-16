<template>
  <div style="margin: 40px;">
    <div style="margin-bottom: 20px;font-size: 14px;">{{ params.equipmentTypeName }}: {{ params.value }}</div>
    <el-form>
      <div >
        <el-form-item label="脉冲宽度">
          <el-input v-model="saveData.pulseWidth" placeholder="请输入10~1000之间整数" type="number" class="input-300" maxlength="4" clearable />
        </el-form-item>
        <el-form-item label="脉冲间隔">
          <el-input v-model="saveData.pulseInterval" placeholder="请输入10~1000之间整数" type="number" class="input-300" maxlength="4" clearable />
        </el-form-item>
      </div>
      <el-form-item label="待机电平">
        <el-radio v-model="saveData.battery" label="0">常开</el-radio>
        <el-radio v-model="saveData.battery" label="1">常闭</el-radio>
      </el-form-item>
    </el-form>
    <div style="text-align:left;margin-top:80px;">
      <el-button style="margin-left: 100px;" type="primary" @click="saveNewEquipment">保存设置</el-button>
    </div>
  </div>
</template>

<script>
import { cxNewEquipment, readNewEquipment, szNewEquipment } from '@/api/device'

export default {
  name: 'DBJ',
  data() {
    return {
      params: {},
      dataInfo: {},
      saveData: { pulseWidth: '', pulseInterval: '', battery: '' }
    }
  },
  created() {
    this.params = this.$route.query
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
        this.getEquipmentParamDef()
      } else {
        this.$message({ message: '参数读取失败,不能设置', type: 'error' })
      }
    },
    async getEquipmentParamDef() {
      const params = {
        typeValue: this.params.typeValue,
        value: this.params.value
      }
      const res = await readNewEquipment(params)
      if (res.result === 1) {
        this.dataInfo = res.para
        this.saveData.pulseWidth = this.dataInfo.pulseWidth1
        this.saveData.pulseInterval = this.dataInfo.pulseInterval1
        this.saveData.battery = this.dataInfo.battery
      }
    },
    async saveNewEquipment() {
      const params = {
        value: this.params.value,
        pulseWidth1: this.saveData.pulseWidth,
        pulseInterval1: this.saveData.pulseInterval,
        battery: this.saveData.battery,
        pulseWidth2: 0,
        pulseInterval2: 0,
        gift: 0,
        drag: 0,
        interfaceType: 0,
        interfaceBaudRate: 0,
        noteTypes: 0
      }
      const res = await szNewEquipment(params)
      if (res.result === 1) {
        this.$message({ message: '设置成功', type: 'success' })
        setTimeout(() => {
          this.query()
        }, 1500)
      }
    }
  }
}
</script>
