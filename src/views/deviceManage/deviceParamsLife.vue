<template>
  <div style="margin: 40px;">
    <div style="margin-bottom: 20px;font-size: 14px;">{{ params.equipmentTypeName }}: {{ params.value }}<span style="color: #888;margin-left: 10px;">(脉冲宽度 / 间隔范围为10-1000)</span></div>
    <el-form>
      <el-form-item label="脉冲设置">
        <el-select v-model="index" placeholder="请选择">
          <el-option v-for="(item, index) in list" :key="item.value" :label="item.pulsePatternName" :value="index"/>
        </el-select>
      </el-form-item>
      <p style="font-size: 14px;color: #888;margin-top: 20px;margin-bottom: 20px;"> 脉冲设置： 脉冲宽度{{ saveData.pulseWidth }}, 脉冲间隔 {{ saveData.pulseInterval }} </p>
      <div v-if="flag">
        <el-form-item label="脉冲宽度">
          <el-input v-model="modalData.pulseWidth" placeholder="请输入10~1000之间整数" type="number" class="input-300" maxlength="4" clearable />
        </el-form-item>
        <el-form-item label="脉冲间隔">
          <el-input v-model="modalData.pulseInterval" placeholder="请输入10~1000之间整数" type="number" class="input-300" maxlength="4" clearable />
        </el-form-item>
        <!-- <el-button type="primary" @click="saveTemp">使用自定义脉冲设置</el-button> -->
      </div>
      <el-form-item label="待机电平">
        <el-radio v-model="saveData.battery" label="0">常开</el-radio>
        <el-radio v-model="saveData.battery" label="1">常闭</el-radio>
      </el-form-item>
    </el-form>

    <div style="text-align:left;margin-top:80px;">
      <el-button @click="goBack">返回上一页</el-button>
      <el-button @click="query">重新加载页面</el-button>
      <el-button style="margin-left: 20px;" type="primary" @click="saveNewEquipmentBefore">保存设置</el-button>
    </div>
    <verfyCode v-model="verfyCodeVisible" :phone-number="phoneNumber" :name="name" @on-OK="saveNewEquipment"/>
  </div>
</template>

<script>
import { cxNewEquipment, readNewEquipment, equipmentParamDef, szNewEquipment } from '@/api/device'
import verfyCode from './component/verfyCode'

export default {
  name: 'ParamC',
  components: {
    verfyCode
  },
  data() {
    return {
      params: {},
      list: [],
      index: '',
      dataInfo: {},
      modalData: { pulseWidth: '', pulseInterval: '' },
      type: '1',
      flag: false,
      saveData: { pulseWidth: '', pulseInterval: '', battery: '' },
      verfyCodeVisible: false,
      phoneNumber: '',
      name: ''
    }
  },
  watch: {
    index(val) {
      const info = this.list[val]
      if (info.pulsePatternName === '自定义') {
        this.flag = true
        this.saveData.pulseWidth = ''
        this.saveData.pulseInterval = ''
        this.modalData = { pulseWidth: '', pulseInterval: '' }
      } else {
        this.saveData.pulseWidth = info.pulseWidth
        this.saveData.pulseInterval = info.pulseInterval
        this.modalData.pulseWidth = info.pulseWidth
        this.modalData.pulseInterval = info.pulseInterval
        this.flag = false
      }
    }
  },
  created() {
    this.params = this.$route.query
    this.phoneNumber = this.$route.query.phoneNumber
    this.name = this.$route.query.name
    this.query()
  },
  methods: {
    saveTemp() {
      if (this.modalData.pulseWidth < 10 || this.modalData.pulseWidth > 1000) {
        this.$message({ message: '脉冲宽度为10~1000整数', type: 'error' })
        return
      }
      if (this.modalData.pulseInterval < 10 || this.modalData.pulseInterval > 1000) {
        this.$message({ message: '"脉冲间隔为10~1000整数', type: 'error' })
        return
      }
      this.saveData.pulseWidth = this.modalData.pulseWidth
      this.saveData.pulseInterval = this.modalData.pulseInterval
    },
    async query() {
      const postData = {
        value: this.params.value,
        data: 1,
        t: Date.now()
      }
      const res = await cxNewEquipment(postData)
      if (res.result === 1) {
        setTimeout(() => {
          this.getEquipmentParamDef()
        }, 2500)
      } else {
        this.$message({ message: '参数读取失败,不能设置', type: 'error' })
      }
    },
    async getEquipmentParamDef() {
      const params = {
        typeValue: this.params.typeValue,
        value: this.params.value,
        t: Date.now()
      }
      const postData = { equipmentId: this.params.value }
      const res2 = await equipmentParamDef(postData)
      const res = await readNewEquipment(params)
      if (res.result === 1) {
        this.dataInfo = res.para
        this.$nextTick(() => {
          this.saveData.pulseWidth = this.dataInfo.pulseWidth1
          this.saveData.pulseInterval = this.dataInfo.pulseInterval1
          this.saveData.battery = this.dataInfo.battery
        })
      }
      if (res2.result === 0) {
        this.list = (res2.data || []).concat([{ pulsePatternName: '自定义' }])
        this.list.forEach((item, index) => {
          if (item.pulsePatternName === this.dataInfo.pulsePatternName) {
            this.index = index
            return
          }
        })
        if (this.index === this.list.length - 1) {
          this.modalData.pulseWidth = this.dataInfo.pulseWidth
          this.modalData.pulseInterval = this.dataInfo.pulseInterval
          setTimeout(() => {
            this.saveData.pulseWidth = this.dataInfo.pulseWidth1
            this.saveData.pulseInterval = this.dataInfo.pulseInterval1
            this.saveData.battery = this.dataInfo.battery
          }, 500)
        }
      }
      this.$nextTick(() => {
        if (res.para.pulsePatternName === '自定义') {
          this.modalData.pulseWidth = this.dataInfo.pulseWidth1
          this.modalData.pulseInterval = this.dataInfo.pulseInterval1
        }
      })
    },
    saveNewEquipmentBefore() {
      if (this.index === this.list.length - 1) {
        this.saveData.pulseWidth = this.modalData.pulseWidth
        this.saveData.pulseInterval = this.modalData.pulseInterval
      }
      if (!this.saveData.pulseWidth || !this.saveData.pulseInterval) {
        this.$message({ message: '脉冲设置或脉冲间隔不能为空', type: 'error' })
        return
      }
      if (this.modalData.pulseWidth < 10 || this.modalData.pulseWidth > 1000) {
        this.$message({ message: '脉冲宽度为10~1000整数', type: 'error' })
        return
      }
      if (this.modalData.pulseInterval < 10 || this.modalData.pulseInterval > 1000) {
        this.$message({ message: '"脉冲间隔为10~1000整数', type: 'error' })
        return
      }
      this.verfyCodeVisible = true
    },
    async saveNewEquipment() {
      if (this.index === this.list.length - 1) {
        this.saveData.pulseWidth = this.modalData.pulseWidth
        this.saveData.pulseInterval = this.modalData.pulseInterval
      }
      if (!this.saveData.pulseWidth || !this.saveData.pulseInterval) {
        this.$message({ message: '脉冲设置或脉冲间隔不能为空', type: 'error' })
        return
      }
      if (this.modalData.pulseWidth < 10 || this.modalData.pulseWidth > 1000) {
        this.$message({ message: '脉冲宽度为10~1000整数', type: 'error' })
        return
      }
      if (this.modalData.pulseInterval < 10 || this.modalData.pulseInterval > 1000) {
        this.$message({ message: '"脉冲间隔为10~1000整数', type: 'error' })
        return
      }
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
        this.verfyCodeVisible = false
        this.$message({ message: '设置成功', type: 'success' })
      }
    },
    goBack() {
      window.history.go(-1)
    }
  }
}
</script>
