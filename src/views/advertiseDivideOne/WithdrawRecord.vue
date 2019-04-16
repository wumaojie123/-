<template>
  <div class="withdraw-record-list-container bd-manage">
    <div class="header-panel">
      <div class="wrap-panel">
        <div class="ovh">
          <div class="fl">
            <div class="mb10">统计日期</div>
            <div v-show="curClickBtnIndex === 1">
              <el-date-picker v-model="dateRange" :clearable="false" :picker-options="options" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" @change="onDateChange" />
            </div>
            <div v-show="curClickBtnIndex === 2">
              <el-date-picker v-model="dateRange2" :clearable="false" :picker-options="options2" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" @change="onDateChange2" />
            </div>
          </div>
          <div class="fl info-panel">
            <div class="mb10">提现至微信账户</div>
            <div class="ovh">
              <div class="fl account-panel">{{ accountInfo.openid ? accountInfo.withdrawalAccount : '微信账户' }}
                <svg-icon icon-class="wx" class="wx-icon" />
              </div>
              <el-button v-if="accountInfo.associated == 1 && !accountInfo.openid" class="fl" @click="onWidthdrawBtnClick">添加绑定</el-button>
              <el-button v-if="accountInfo.associated !== 1" class="fl" type="info">添加绑定</el-button>
            </div>
            <div v-if="!accountInfo.openid && accountInfo.associated === 1" class="hint-info">*请先添加微信提现账户</div>
            <div v-if="accountInfo.associated !== 1" class="hint-info">*非分成用户，无法绑定</div>
          </div>
          <div class="fl info-panel">
            <div class="mb10">账号余额</div>
            <div>
              <span class="balance">¥{{ accountInfo.balance || 0 }}</span>
              <template>
                <el-button v-if="accountInfo.associated == 1 && accountInfo.balance > 1.01" type="primary" @click="onWidthdrawBtnClick">提现</el-button>
                <el-button v-else type="info">提现</el-button>
              </template>
              <span v-if="accountInfo.balance < 1.01" class="hint-info">最低提现金额1.01元</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt20">
      <el-button :type="( curClickBtnIndex === 1 ? 'primary' : 'info' )" @click="onBtnClick(1)">提现记录</el-button>
      <el-button :type="( curClickBtnIndex === 2 ? 'primary' : 'info' )" @click="onBtnClick(2)">收益查询</el-button>
    </div>
    <div v-show="curClickBtnIndex === 1">
      <el-table v-loading="listLoading" :key="tableKey" :data="list" border stripe fit highlight-current-row style="width: 100%;margin-top: 20px;">
        <el-table-column :label="`提现时间`" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.withdrawDate }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="`提现账号`" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.wxBillno || '' }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="`提现金额（元）`" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.amount || '' }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="`手续费（0.6%）`" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.serviceFee || '' }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="`到账金额（元）`" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.actualPay || 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="`提现状态`" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.status }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination v-show="total > 0" :current-page="pageIndex" :page-sizes="[10, 20, 30, 40, 50]" :page-size="pageSize" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
      </div>
    </div>
    <div v-show="curClickBtnIndex === 2">
      <el-table v-loading="listLoading2" :key="tableKey2" :data="list2" border stripe fit highlight-current-row style="width: 100%;margin-top: 20px;">
        <el-table-column :label="`交易时间`" align="center" min-width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.created }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="`设备类型`" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.equipmentType || '' }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="`设备编号`" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.value || '' }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="`代理商名称`" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.agentName || '' }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="`商家名称`" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.distributor || '' }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="`联系方式`" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.distributorPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="`广告收益（元）`" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.agentpart || 0 }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination v-show="total2 > 0" :current-page="pageIndex2" :page-sizes="[10, 20, 30, 40, 50]" :page-size="pageSize2" :total="total2" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange2" @current-change="handleCurrentChange2"/>
      </div>
    </div>
  </div>
</template>

<script>
import { getWithdrawalRecordList, getEarningsData, getAccountInfo } from '@/api/advertiseDivideOne'
import { parseTime } from '@/utils'
const NOW = Date.now()
const OPTIONS = {
  disabledDate: (time) => {
    const timeItem = time.getTime()
    return timeItem > NOW
  }
}
const OPTIONS2 = {
  disabledDate: (time) => {
    const timeItem = time.getTime()
    return timeItem < NOW - 24 * 60 * 60 * 180 * 1000 || timeItem > NOW
  }
}
export default {
  name: 'WithdrawRecord',
  data() {
    return {
      dateRange: [],
      options: OPTIONS,
      curClickBtnIndex: 1,
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: false,
      pageIndex: 1,
      pageSize: 10,
      dateRange2: [],
      options2: OPTIONS2,
      tableKey2: 1,
      list2: [],
      total2: 0,
      listLoading2: false,
      pageIndex2: 1,
      pageSize2: 10,
      accountInfo: {}
    }
  },
  async created() {
    this.getAccountInfo()
    this.dateRange[0] = parseTime(new Date(new Date().setHours(0, 0, 0, 0)).getTime() - 24 * 60 * 60 * 1000 * 6, '{y}-{m}-{d} {h}:{i}:{s}')
    this.dateRange[1] = parseTime(Date.now(), '{y}-{m}-{d} {h}:{i}:{s}')
    this.dateRange2[0] = parseTime(new Date(new Date().setHours(0, 0, 0, 0)).getTime() - 24 * 60 * 60 * 1000 * 6, '{y}-{m}-{d} {h}:{i}:{s}')
    this.dateRange2[1] = parseTime(Date.now(), '{y}-{m}-{d} {h}:{i}:{s}')
    this.getWithdrawRecordList()
  },
  methods: {
    getAccountInfo() {
      getAccountInfo({}).then(res => {
        if (res.result === 0) {
          this.accountInfo = res.data
        }
      })
    },
    getWithdrawRecordList() {
      const params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        startTime: this.dateRange[0],
        endTime: this.dateRange[1]
      }
      this.listLoading = true
      getWithdrawalRecordList(params).then(res => {
        if (res.result === 0) {
          let data = []
          let total = 0
          if (res.data) {
            if (res.data.items) {
              data = res.data.items
              for (let i = 0; i < data.length; i++) {
                const item = data[i]
                data[i].withdrawDate = parseTime(item.withdrawDate, '{y}-{m}-{d} {h}:{i}:{s}')
                if (item.status === 1) {
                  data[i].status = '申请中'
                } else if (item.status === 2) {
                  data[i].status = '提现成功'
                } else if (item.status === 3) {
                  data[i].status = '拒绝'
                }
              }
            }
            total = res.data.total
          }
          this.list = data
          this.total = total
        }
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getEarningsData() {
      const params = {
        pageIndex: this.pageIndex2,
        pageSize: this.pageSize2,
        startTime: this.dateRange2[0],
        endTime: this.dateRange2[1]
      }
      this.listLoading = true
      getEarningsData(params).then(res => {
        if (res.result === 0) {
          let data = []
          let total = 0
          if (res.data) {
            if (res.data.items) {
              data = res.data.items
              for (let i = 0; i < data.length; i++) {
                const item = data[i]
                data[i].created = parseTime(item.created, '{y}-{m}-{d} {h}:{i}:{s}')
              }
            }
            total = res.data.total
          }
          this.list2 = data
          this.total2 = total
        }
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    onDateChange() {
      this.pageIndex = 1
      this.getWithdrawRecordList()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getWithdrawRecordList()
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.getWithdrawRecordList()
    },
    handleSizeChange2(val) {
      this.pageSize2 = val
      this.getEarningsData()
    },
    handleCurrentChange2(val) {
      this.pageIndex2 = val
      this.getEarningsData()
    },
    onDateChange2() {
      if (new Date(this.dateRange2[1]).getTime() - new Date(this.dateRange2[0]).getTime() >= 30 * 24 * 3600 * 1000) {
        this.$message({ message: '时间跨度不能超过30天', type: 'error' })
        return
      }
      this.pageIndex2 = 1
      this.getEarningsData()
    },
    onBtnClick(typeId) {
      this.curClickBtnIndex = typeId
      if (typeId === 1) {
        this.getWithdrawRecordList()
      } else if (typeId === 2) {
        if (new Date(this.dateRange2[1]).getTime() - new Date(this.dateRange2[0]).getTime() >= 30 * 24 * 3600 * 1000) {
          this.$message({ message: '时间跨度不能超过30天', type: 'error' })
          return
        }
        this.getEarningsData()
      }
    },
    onWidthdrawBtnClick() {
      if (this.accountInfo.openid) {
        this.$router.push({
          name: 'withdraw',
          query: {
            withdrawalAccount: this.accountInfo.withdrawalAccount,
            balance: this.accountInfo.balance
          }
        })
      } else {
        this.$confirm('请添加实名认证的微信号，否则无法正常提现；绑定后将无法解绑账户?', '提示', {
          confirmButtonText: '继续',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({
            name: 'identityVerify'
          })
        }).catch(() => {

        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.withdraw-record-list-container {
  .header-panel{
    box-shadow: 0px 0px 21px 0px rgba(153,153,153,0.18);
    border-radius: 10px;
    height: 147px;
    .wrap-panel{
      padding-top: 35px;
      padding-left: 30px;
    }
    .info-panel{
      margin-left: 78px;
      .hint-info{
        color: #FF4040;
        margin-top: 8px;
      }
      .balance{
        font-size: 24px;
        color: #409EFF;
        margin-right: 10px;
      }
    }
    .account-panel{
      color: #999;
      height: 36px;
      border: 1px solid #E0E3E9;
      border-radius: 4px;
      line-height: 36px;
      padding-left: 34px;
      padding-right: 20px;
      margin-right: 10px;
      position: relative;
    }
  }
  .wx-icon{
    position: absolute;
    left: 0;
    width: 33px;
    height: 27px;
    top: 5px;
  }
}
.ovh{
  overflow: hidden;
}
.fl{
  float: left;
}
.mb10{
  margin-bottom: 10px;
}
.mt20{
  margin-top: 20px;
}
</style>
