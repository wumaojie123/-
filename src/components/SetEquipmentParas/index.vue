<template>
  <el-form ref="equipmentParaForm" :model="equipmentParaForm" :rules="rules" label-width="92px" >
    <el-form-item >
      <div slot="label" style="text-align: left">已勾选设备</div>
      <p> {{ checkedrow.length }} 个</p>
    </el-form-item>
    <el-form-item prop="pulseWidth">
      <div slot="label" style="text-align: left">脉冲宽度</div>
      <el-input v-model="equipmentParaForm.pulseWidth" type="number" placeholder="10~1000"/>
    </el-form-item>
    <el-form-item prop="pulseInterval">
      <div slot="label" style="text-align: left">脉冲间隔</div>
      <el-input v-model="equipmentParaForm.pulseInterval" type="number" placeholder="10~1000"/>
    </el-form-item>
    <el-form-item prop="standbyStatus">
      <div slot="label" style="text-align: left">待机电平</div>
      <el-radio-group v-model="equipmentParaForm.standbyStatus">
        <el-radio :label="0">常开</el-radio>
        <el-radio :label="1">常闭</el-radio>
      </el-radio-group>
    </el-form-item>
    <p style="color: #999999;font-size: 13px;">温馨提示：此处的参数设置，仅对 “脉冲版” 生效，对“串口版”无效。</p>
    <div style="padding-top: 22px;text-align: right">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirmPara('equipmentParaForm')">确 定</el-button>
    </div>
  </el-form>
</template>

<script>
export default {
  name: 'SetEquipmentParas',
  props: {
    checkedrow: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      equipmentParaForm: {
        pulseWidth: '',
        pulseInterval: '',
        standbyStatus: 0
      },
      rules: {
        pulseWidth: {
          message: '请输入10-1000范围内的整数',
          trigger: 'blur',
          validator: (rule, value, callback) => {
            if (parseInt(value) < 10 || parseInt(value) > 1000 || parseInt(value) !== +value) {
              callback(new Error())
            } else {
              callback()
            }
          }
        },
        pulseInterval: {
          message: '请输入10-1000范围内的整数',
          trigger: 'blur',
          validator: (rule, value, callback) => {
            if (parseInt(value) < 10 || parseInt(value) > 1000 || parseInt(value) !== +value) {
              callback(new Error())
            } else {
              callback()
            }
          }
        }
      }
    }
  },
  methods: {
    submitChecked(formName) {
      return new Promise((resolve, reject) => {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    cancel() {
      this.$emit('cancel')
    },
    confirmPara(formName) {
      this.submitChecked(formName)
        .then(res => {
          this.$emit('confirom', this.equipmentParaForm)
        })
        .catch(() => {
          console.log('err')
        })
    }
  }
}
</script>

<style scoped>

</style>
