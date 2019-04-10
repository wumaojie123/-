 <!--suppress ALL -->
<template>
  <div class="content-area bd-manage">
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">提现</el-menu-item>
    </el-menu>
    <el-form ref="baseInfoRef" :model="baseInfo" :rules="baseInfo&&baseInfoRules" label-width="150px" label-position="left" style="margin-top: 20px;">
      <el-form-item label="提现账号" prop="withdrawalAccount">
        <el-input v-model="baseInfo.withdrawalAccount" disabled style="width: 260px;" />
      </el-form-item>
      <el-form-item label="提现金额" prop="amount">
        <div style="position: relative;">
          <el-input v-model.number="baseInfo.amount" placeholder="请输入提现金额" style="width: 260px;" @blur="onInputBlur" />
          <span style="margin-left: 10px;color: #999999;">余额 ¥{{ baseInfo.balance }}</span>
          <el-button type="text" @click="onAllBtnClick">全部提现</el-button>
          <span style="position: absolute;left: 2px;top: 0;color: #333333;">￥</span>
          <div style="color: #FF4040;">*最低提现金额1.01元</div>
        </div>
      </el-form-item>
      <el-form-item label="手续费" prop="serviceFee">
        <div style="position: relative;">
          <el-input v-model="baseInfo.serviceFee" disabled style="width: 260px;" />
          <span style="margin-left: 10px;color: #999999;">微信收取0.6%手续费</span>
          <span style="position: absolute;left: 2px;top: 0;color: #c0c4cc;">￥</span>
        </div>
      </el-form-item>
      <el-form-item label="实际到账金额" prop="actualPay">
        <div style="position: relative;">
          <el-input v-model="baseInfo.actualPay" disabled style="width: 260px;" />
          <span style="position: absolute;left: 2px;top: 0;color: #c0c4cc;">￥</span>
        </div>
      </el-form-item>
      <br>
      <el-button :type="(isCanClickTag ? 'primary' : 'info')" @click="handleAccountInfo">提现</el-button>
      <el-button @click="onCancelBtnClick">取消</el-button>
    </el-form>
    <div style="margin-top: 40px;">
      <span style="display: inline-block;border-radius: 4px;color: #1B5DA2;font-weight: 500;padding: 18px 25px 24px;background:rgba(64,158,255,0.1);line-height: 24px;">
        <div>温馨提示：</div>
        <div>1.乐摇摇账户提现的金额将会到你授权的微信钱包。</div>
        <div>微信非实名用户，单日限额提取2,0000元（实名用户每日最高可提现20,000元）</div>
        <div>2.提现金额1.01元起付出，微信收取0.6%提现手续费</div>
        <div>3.每天只可以提现4次</div>
      </span>
    </div>
  </div>
</template>

<script>
import { sub, mul } from '@/utils/index'
import { postWithdrawal } from '@/api/advertiseDivideOne'
const reg = /^[1-9]\d*(.[0-9]{1,2})?$/
export default {
  data() {
    const checkNum = (rule, value, callback) => {
      this.isCanClickTag = false
      if (!reg.test(value)) {
        callback(new Error('请输入数字，且最多2位小数，且最低提现金额1.01元'))
      } else {
        if (value > 20000) {
          callback(new Error('最高提现金额2万元'))
        } else if (value < 1.01) {
          callback(new Error('最低提现金额1.01元'))
        } else if (value > this.baseInfo.balance) {
          callback(new Error('最高提现金额' + this.baseInfo.balance + '元'))
        } else {
          this.isCanClickTag = true
          callback()
        }
      }
    }
    return {
      isCanClickTag: false,
      baseInfo: {
        withdrawalAccount: '',
        balance: '',
        actualPay: '0.00',
        serviceFee: '0.00',
        amount: '0.00'
      },
      baseInfoRules: {
        amount: { validator: checkNum, trigger: 'blur' }
      }
    }
  },
  async created() {
    this.baseInfo.withdrawalAccount = this.$route.query.withdrawalAccount
    this.baseInfo.balance = this.$route.query.balance
  },
  methods: {
    handleAccountInfo() {
      this.$refs['baseInfoRef'].validate(valid => {
        if (valid) {
          this.postWithdrawal()
        } else {
          return false
        }
      })
    },
    postWithdrawal() {
      const params = {
        amount: parseFloat(this.baseInfo.amount),
        serviceFee: parseFloat(this.baseInfo.serviceFee),
        actualPay: parseFloat(this.baseInfo.actualPay)
      }
      postWithdrawal(params).then(res => {
        if (res.result === 0) {
          if (res.data === 3) {
            this.$message({ message: '当日提现不能超过20000', type: 'error' })
          } else if (res.data === 4) {
            this.$message({ message: '提现次数不能超过四次', type: 'error' })
          } else if (res.data === 5) {
            this.$message({ message: '支付系统正在维护中，请稍后操作', type: 'error' })
          } else if (res.data === 6) {
            this.$message({ message: '乐呵呵打款开关已关闭', type: 'error' })
          } else if (res.data === 7) {
            this.$message({ message: '未授权提现微信账号', type: 'error' })
          } else if (res.data === 8) {
            this.$message({ message: '余额小于1.01', type: 'error' })
          } else if (res.data === 9) {
            this.$message({ message: '提现余额小于1.01或者大于20000', type: 'error' })
          }
        }
      })
    },
    onCancelBtnClick() {
      this.$router.go(-1)
    },
    onInputBlur() {
      if (reg.test(this.baseInfo.amount) && this.baseInfo.amount > 1.01 && this.baseInfo.amount < 20000 && this.baseInfo.amount <= this.baseInfo.balance) {
        this.baseInfo.serviceFee = (Math.round(mul(this.baseInfo.amount, 0.006) * 1000 / 10) / 100).toFixed(2)
        this.baseInfo.actualPay = sub(this.baseInfo.amount, this.baseInfo.serviceFee)
      }
    },
    onAllBtnClick() {

    }
  }
}
</script>

<style scoped>
.ovh{
  overflow: hidden;
}
.fl{
  float: left;
}
.mb5{
  margin-bottom: 5px;
}
.mt10{
  margin-top: 10px;
}
</style>
