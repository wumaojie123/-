 <!--suppress ALL -->
<template>
  <div class="content-area bd-manage withdraw-panel">
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">提现</el-menu-item>
    </el-menu>
    <el-form ref="baseInfoRef" :model="baseInfo" :rules="baseInfo&&baseInfoRules" label-width="150px" label-position="left" class="mt20">
      <el-form-item label="提现账号" prop="withdrawalAccount">
        <el-input v-model="baseInfo.withdrawalAccount" disabled style="width: 260px;" />
      </el-form-item>
      <el-form-item label="提现金额" prop="amount">
        <div class="rel">
          <el-input v-model.number="baseInfo.amount" type="number" placeholder="请输入提现金额" style="width: 260px;" @blur="onInputBlur" />
          <span class="balance">余额 ¥{{ baseInfo.balance }}</span>
          <el-button type="text" @click="onAllBtnClick">全部提现</el-button>
          <span class="money-sign">￥</span>
          <!-- <div style="color: #FF4040;">*最低提现金额1.01元</div> -->
        </div>
      </el-form-item>
      <el-form-item label="手续费" prop="serviceFee">
        <div class="rel">
          <el-input v-model="baseInfo.serviceFee" disabled style="width: 260px;" />
          <span class="service-fee">微信收取0.6%手续费</span>
          <span class="money-sign2">￥</span>
        </div>
      </el-form-item>
      <el-form-item label="实际到账金额" prop="actualPay">
        <div class="rel">
          <el-input v-model="baseInfo.actualPay" disabled style="width: 260px;" />
          <span class="money-sign2">￥</span>
        </div>
      </el-form-item>
      <br>
      <el-button :type="(isCanClickTag ? 'primary' : 'info')" @click="handleAccountInfo">提现</el-button>
      <el-button @click="onCancelBtnClick">取消</el-button>
    </el-form>
    <div class="mt40">
      <span class="hint-info">
        <div>温馨提示：</div>
        <div>1.乐摇摇账户提现的金额将会到你授权的微信钱包。</div>
        <div>微信非实名用户，单日限额提取2,0000元（实名用户每日最高可提现20,000元）</div>
        <div>2.提现金额1.01元起付出，微信收取0.6%提现手续费</div>
        <div>3.每天只可以提现4次</div>
      </span>
    </div>
    <div v-show="showSucTag" class="mask-box">
      <div class="wrapper">
        <div class="suc-hint-info">提现申请成功</div>
        <div class="back-btn">
          <el-button type="primary" @click="onBackBtnClick">返回首页{{ text }}</el-button>
        </div>
      </div>
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
        callback(new Error('请输入数字，最多2位小数，且最低提现金额1.01元'))
      } else {
        if (value > 20000) {
          callback(new Error('最高提现金额2万元'))
        } else if (value < 1.01) {
          callback(new Error('最低提现金额1.01元'))
        } else if (value > this.baseInfo.balance) {
          callback(new Error('余额不足'))
        } else {
          this.isCanClickTag = true
          callback()
        }
      }
    }
    return {
      isCanClickTag: false,
      showSucTag: false,
      timer: null,
      time: 10,
      text: '',
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
          } else {
            this.showSucTag = true
            this.timer = setInterval(() => {
              this.time = this.time - 1
              this.text = '(' + this.time + '秒)'
              if (this.time === -1) {
                this.showSucTag = false
                this.$router.go(-1)
                clearInterval(this.timer)
                this.timer = null
                this.text = ''
                this.time = 10
              }
            }, 1000)
          }
        }
      })
    },
    onCancelBtnClick() {
      this.$router.go(-1)
    },
    onInputBlur() {
      if (reg.test(this.baseInfo.amount) && this.baseInfo.amount >= 1.01 && this.baseInfo.amount <= 20000 && this.baseInfo.amount <= this.baseInfo.balance) {
        this.baseInfo.serviceFee = (Math.round(mul(this.baseInfo.amount, 0.006) * 1000 / 10) / 100).toFixed(2)
        this.baseInfo.actualPay = sub(this.baseInfo.amount, this.baseInfo.serviceFee)
      } else {
        this.baseInfo.actualPay = '0.00'
        this.baseInfo.serviceFee = '0.00'
      }
    },
    onAllBtnClick() {
      if (this.baseInfo.balance > 20000) {
        this.$message({ message: '最高提现金额2万元', type: 'error' })
      } else if (this.baseInfo.balance < 1.01) {
        this.$message({ message: '最低提现金额1.01元', type: 'error' })
      } else {
        this.baseInfo.amount = this.baseInfo.balance
        this.baseInfo.serviceFee = (Math.round(mul(this.baseInfo.amount, 0.006) * 1000 / 10) / 100).toFixed(2)
        this.baseInfo.actualPay = sub(this.baseInfo.amount, this.baseInfo.serviceFee)
        this.isCanClickTag = true
      }
    },
    onBackBtnClick() {
      this.showSucTag = false
      clearInterval(this.timer)
      this.$router.go(-1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.ovh{
  overflow: hidden;
}
.rel{
  position: relative;
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
.mt20{
  margin-top: 20px;
}
.mt40{
  margin-top: 40px;
}
.withdraw-panel{
  .balance, .service-fee{
    margin-left: 10px;
    color: #999999;
  }
  .money-sign{
    position: absolute;
    left: 2px;
    top: 0;
    color: #333333;
  }
  .money-sign2{
    position: absolute;
    left: 2px;
    top: 0;
    color: #c0c4cc;
  }
  .hint-info{
    display: inline-block;
    border-radius: 4px;
    color: #1B5DA2;
    font-weight: 500;
    padding: 18px 25px 24px;
    background: rgba(64,158,255,0.1);
    line-height: 24px;
  }
  .mask-box{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 8888;
    background-color: rgba(0,0,0,.5);
    .wrapper{
      position: absolute;
      min-width: 300px;
      left: 50%;
      top: 50%;
      background-color: #fff;
      padding: 20px;
      transform: translate(-50%,-50%);
    }
    .suc-hint-info{
      color: #ff0000;
      font-size: 20px;
      text-align: center;
      padding: 20px 0;
    }
    .back-btn{
      text-align: center;
    }
  }
}
</style>
