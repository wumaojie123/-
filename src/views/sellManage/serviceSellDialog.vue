<template>
  <el-dialog :title="getTitle" :visible="visible" width="500px" @close="onClose" @opened="onOpen">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-position="left"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="设备类型" prop="equipmentType">
        <el-select :disabled="true" v-model="ruleForm.equipmentType" class="sel-item">
          <el-option label="充电桩" value="CDZ" />
        </el-select>
      </el-form-item>
      <el-form-item label="通信方式" prop="communication">
        <el-select v-model="ruleForm.communication" class="sel-item" @change="changeCommunication">
          <el-option :value="1" label="脉冲" />
          <el-option :value="2" label="串口" />
        </el-select>
      </el-form-item>
      <el-form-item label="计费方式" prop="billing">
        <el-select
          :disabled="ruleForm.communication!==2"
          v-model="ruleForm.billing"
          class="sel-item"
        >
          <!-- <el-option :value="TIME" label="按时长计费" /> -->
          <el-option
            v-for="(i,index) in arrBilling"
            :key="index"
            :value="i.value"
            :label="i.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="套餐名称" prop="description">
        <el-input v-model="ruleForm.description" />
      </el-form-item>
      <el-form-item label="价格(元)" prop="price">
        <el-input v-model="ruleForm.price" />
      </el-form-item>
      <!-- modify by lss 20190831 -->
      <el-form-item v-if="ruleForm.billing==2" key="2" label="电量(度)" prop="electric">
        <el-input key="2" v-model="ruleForm.electric" />
      </el-form-item>
      <el-form-item v-if="ruleForm.billing!==2" key="1" label="时长(分钟)" prop="serviceTime">
        <el-input key="1" v-model="ruleForm.serviceTime" />
      </el-form-item>
      <el-form-item v-if="ruleForm.communication!==2" label="模拟投币数" prop="coins">
        <el-input v-model="ruleForm.coins" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button :loading="loading_submit" type="primary" @click="onSubmit">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { Message } from 'element-ui'
import { postService, putService } from '@/api/sellManage'
import { validateMoney, isPosInt } from '@/utils/validate'

const validatePrice = (rule, value, callback) => {
  if (validateMoney(value) && value < 10000 && value > 0) {
    callback()
  } else {
    callback(new Error('价格必须为大于0的正数,价格需小于10000,最多保留2位小数'))
  }
}
const validateServiceTime = (rule, value, callback) => {
  if (isPosInt(value) && value <= 1440) {
    callback()
  } else {
    callback(new Error('服务时间必须为大于0的小于等于1440(24小时)正整数'))
  }
}
const validateElectric = (rule, value, callback) => {
  if (/^-?\d+\.?\d{0,1}$/.test(value) && value < 50 && value > 0) {
    callback()
  } else {
    callback(new Error('电量必须为大于0的正数，电量需小于50，最多一位小数'))
  }
}
// const validateServiceTime2 = (rule, value, callback) => {
//   if (value === '' || (isPosInt(value) && value <= 1440)) {
//     callback()
//   } else {
//     callback(new Error('服务时间必须为大于0的小于等于1440(24小时)正整数'))
//   }
// }
const validateCoins = (rule, value, callback) => {
  if (isPosInt(value) && value <= 9999 && value > 0) {
    callback()
  } else {
    callback(new Error('模拟投币数必须为大于0小于等于9999的正整数'))
  }
}
export default {
  props: {
    handleClose: {
      type: Function,
      default: () => {}
    },
    queryList: {
      type: Function,
      default: () => {}
    },
    visible: {
      type: Boolean,
      default: false
    },
    actionRow: {
      type: Object,
      default: null
    },
    actionType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      ruleForm: {
        equipmentType: 'CDZ',
        communication: 1,
        billing: 1,
        description: '',
        price: '',
        coins: '',
        serviceTime: '',
        electric: ''
      },
      rules: {
        equipmentType: [
          { required: true, message: '请选择设备类型', trigger: 'blur' }
        ],
        communication: [
          { required: true, message: '请选择通信方式', trigger: 'blur' }
        ],
        billing: [
          { required: true, message: '请选择计费方式', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入套餐名称', trigger: 'change' },
          { max: 12, message: '套餐名称长度不能超过12', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'change' },
          { validator: validatePrice }
        ],
        coins: [
          { required: true, message: '请输入模拟投币数', trigger: 'change' },
          { validator: validateCoins }
        ],
        serviceTime: [
          { required: true, message: '请输入时长', trigger: 'change' },
          { validator: validateServiceTime }
        ],
        electric: [
          { required: true, message: '请输入电量', trigger: 'change' },
          { validator: validateElectric }
        ]
      },
      loading_submit: false,
      arrBilling: [
        { value: 1, label: '按时长计费' },
        { value: 2, label: '按电量计费' }
      ]
    }
  },
  computed: {
    getTitle() {
      return this.actionType === 'add' ? '添加服务套餐' : '编辑服务套餐'
    }
  },
  created() {},
  methods: {
    onClose() {
      this.$refs['ruleForm'].resetFields()
      this.ruleForm.coins = ''
      this.ruleForm.serviceTime = ''
      this.ruleForm.electric = ''
      this.handleClose()
    },
    onOpen() {
      if (this.actionType === 'edit' && this.actionRow) {
        this.ruleForm = {
          equipmentType: this.actionRow.equipmentType,
          communication: this.actionRow.communication,
          billing: this.actionRow.billing,
          description: this.actionRow.description,
          price: this.actionRow.price,
          coins: this.actionRow.coins === null ? '' : this.actionRow.coins
          // serviceTime:
          //   this.actionRow.serviceTime === null
          //     ? ''
          //     : this.actionRow.serviceTime,
          // // modify by lss 20190831
          // electric: this.actionRow.electric
        }
        if (this.actionRow.billing === 2) {
          this.ruleForm['electric'] = this.actionRow.electric
        } else {
          this.ruleForm['serviceTime'] =
            this.actionRow.serviceTime === null
              ? ''
              : this.actionRow.serviceTime
        }
      }
    },
    onSubmit() {
      const self = this
      self.$refs['ruleForm'].validate(valid => {
        if (valid) {
          const postData = {
            equipmentType: self.ruleForm.equipmentType,
            communication: self.ruleForm.communication,
            billing: self.ruleForm.billing,
            description: self.ruleForm.description,
            price: Number(self.ruleForm.price),
            coins: Number(self.ruleForm.coins),
            serviceTime: Number(self.ruleForm.serviceTime)
          }
          if (self.ruleForm.communication === 2) {
            // modify by lss 20190831
            if (self.ruleForm.billing !== 2) {
              postData.coins = Number(self.ruleForm.serviceTime)
            } else {
              // modify by lss 20190831
              postData.electric = Number(self.ruleForm.electric)
              postData.serviceTime = parseInt(postData.electric * 100)
              postData.coins = Number(postData.serviceTime)
            }
          }
          if (
            self.ruleForm.communication === 1 &&
            self.ruleForm.serviceTime === ''
          ) {
            delete postData.serviceTime
          }
          self.loading_submit = true
          if (self.actionType === 'edit') {
            postData.agentGroupServiceId = self.actionRow.agentGroupServiceId
            putService(postData)
              .then(res => {
                if (res.result === 0 && res.data === 0) {
                  Message({
                    message: '编辑服务套餐成功！',
                    type: 'success'
                  })
                  self.queryList(1)
                  self.onClose()
                }
              })
              .finally(() => {
                self.loading_submit = false
              })
          } else {
            postService(postData)
              .then(res => {
                if (res.result === 0 && res.data === 0) {
                  Message({
                    message: '添加服务套餐成功！',
                    type: 'success'
                  })
                  self.queryList(1)
                  self.onClose()
                }
              })
              .finally(() => {
                self.loading_submit = false
              })
          }
        }
      })
    },
    changeCommunication(value) {
      // if (value === 1) {
      //   this.rules.serviceTime[0].required = false
      //   this.rules.serviceTime[1].validator = validateServiceTime2
      // } else {
      //   this.rules.serviceTime[0].required = true
      //   this.rules.serviceTime[1].validator = validateServiceTime
      // }
    }
  }
}
</script>
<style lang="less" scoped>
.sel-item {
  width: 100%;
}
</style>
