<template>
  <div class="content-area">
    <div class="text-info">
      设备编号： {{ equipmentType === 'SHJ' ? '售货机' : '充电桩' }}{{ lyyEquipmentValue }}
    </div>
    <p class="text-info">解绑原因：</p>
    <el-checkbox-group v-model="checkList" class="text-info">
      <el-checkbox v-for="(item, index) in list" :label="item" :key="index" v-model="others" size="medium"/>
    </el-checkbox-group>
    <p class="text-info">其他原因:</p>
    <el-input v-model="others" :rows="4" style="width: 400px;" type="textarea" placeholder="请输入解绑原因" maxlength="20"/>
    <p class="text-info">设备损坏、频繁离线、信号问题等设备问题，乐摇摇提供最优的设备升级方案，升级热线服务时间：每天9:00-21:00</p>

    <div style="margin-top: 20px;">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleUnbindBefore">确定解绑</el-button>
    </div>
    <verfyCode v-model="verfyCodeVisible" :phone-number="phoneNumber" :name="name" @on-OK="handleUnbind"/>
  </div>
</template>

<script>
  import { unbundling } from '@/api/device'
  import verfyCode from './component/verfyCode'

  const mapInfo = {
    1: '更换4G版本',
    2: '频繁离线',
    3: '系统不好用',
    4: '场地信号不好',
    5: '撤场调整',
    6: '支付设备坏了',
    7: '机器转手',
    8: '更换WIFI版本',
    9: '测试设备'
  }
  export default {
    components: {
      verfyCode
    },
    data() {
      return {
        list: mapInfo,
        others: '',
        lyyEquipmentId: '',
        equipmentType: '',
        checkList: [],
        eqValue: '',
        disable: false,
        verfyCodeVisible: false,
        phoneNumber: '',
        name: '',
        lyyEquipmentValue: ''
      }
    },
    created() {
      this.lyyEquipmentId = this.$route.query.lyyEquipmentId
      this.lyyEquipmentValue = this.$route.query.value
      this.eqValue = this.$route.query.value
      this.equipmentType = this.$route.query.equipmentType
      this.phoneNumber = this.$route.query.phoneNumber
      this.name = this.$route.query.name
    },
    methods: {
      handleUnbindBefore() {
        if (this.others === '' && this.checkList.length === 0) {
          this.$message({ message: '请选择或输入解绑原因', type: 'error' })
          return
        }
        this.verfyCodeVisible = true
      },
      async handleUnbind() {
        if (this.disable) {
          return
        }
        let reasons = []
        if (this.others) {
          reasons = [this.others]
        }
        if (this.checkList.length) {
          reasons = reasons.concat(this.checkList)
        }
        const params = {
          lyyEquipmentId: this.lyyEquipmentId,
          reasons
        }
        this.disable = true
        setTimeout(() => {
          this.disable = false
        }, 2000)
        const res = await unbundling(params)
        this.disable = false
        if (res.result === 0) {
          this.verfyCodeVisible = false
          this.$message({ message: '设备解绑成功', type: 'success' })
          window.history.go(-1)
        } else {
          this.$message({ message: '解绑失败', type: 'error' })
        }
      },
      handleCancel() {
        window.history.go(-1)
      }
    }
  }
</script>

<style scoped>
  .content-area {
    font-size: 14px;
  }

  .text-info {
    padding: 14px 0;
  }
</style>
