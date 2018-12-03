<template>
  <el-main>
    <el-row :gutter="20" style="align-items: center;">
      <el-col :span="20">
        <el-alert :title="message" :closable="false" type="warning" class="info" />
      </el-col>
      <el-col :span="4">
        <div class="often-question" ><p @click="questionDialogVisible = true"><i class="el-icon-question"/> 常见问题 >></p></div>
      </el-col>
    </el-row>
    <!-- 查询条件 -->
    <el-form ref="form" :inline="true" :model="form" label-width="90px" class="deviceForm" style="padding: 10px 0;">
      <el-form-item label="设备类型" prop="equipmentTypeValue">
        <el-select v-model="form.equipmentTypeValue" placeholder="请选择">
          <el-option v-for="item in equipmentTypesArr" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="连号查询" prop="equipmentId">
        <div class="el-input-number el-input-number--medium is-without-controls input-300" style="width:200px;">
          <div class="el-input el-input--medium">
            <input v-model="form.equipmentIdStart" class="el-input__inner" type="number" placeholder="设备编号">
          </div>
        </div>
        <span style="text-align: center;">-</span>
        <div class="el-input-number el-input-number--medium is-without-controls input-300" style="width:200px;">
          <div class="el-input el-input--medium">
            <input v-model="form.equipmentIdEnd" class="el-input__inner" type="number" placeholder="设备编号">
          </div>
        </div>
        <el-button type="primary" @click="look">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 按钮 -->
    <div style="padding-bottom: 10px;">
      <el-button type="primary" @click="transfer">批量转移设备</el-button>
      <el-button type="primary" @click="importQrcode('pay')">导出支付二维码</el-button>
      <el-button style="margin-left: 10px;" type="primary" @click="importQrcode('register')">导出注册二维码</el-button>
      <el-button style="margin-left: 10px;" type="primary" @click="rebackEquipment">退换设备</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      ref="multipleTable"
      :key="tableKey"
      :data="list"
      :height="minHeightTable"
      border
      stripe
      fit
      highlight-current-row
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column label="设备编号" align="center" prop="equipmentValue">
        <template slot-scope="scope">
          <span>{{ scope.row.equipmentValue }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备类型" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.equipmentTypeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="固件版本" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.versionno }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-show="total>0"
      :current-page="listQuery.page"
      :page-sizes="[10,20,30, 50]"
      :page-size="listQuery.limit"
      :total="total"
      class="pagination-container"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="beforeClose"
      title="批量转移设备"
      width="450px">
      <el-dialog
        :visible.sync="innerVisible"
        width="360px"
        title="提示"
        append-to-body>
        <span style="font-size: 16px;color: #ef6969">请选择商家</span>
      </el-dialog>
      <el-row>
        <el-col :span="6">
          <p style="font-size: 16px;line-height: 150%;padding: 6px 0;">已选择设备：</p>
        </el-col>
        <el-col :span="18">
          <p style="font-size: 16px;line-height: 150%;padding: 6px 0;">{{ willTranfers.length }} 个</p>
        </el-col>
      </el-row>
      <el-row style="margin-top: 16px;align-items: center;">
        <el-col :span="6">
          <p style="font-size: 16px;line-height: 150%;padding: 6px 0;">转移给商家：</p>
        </el-col>
        <el-col :span="18">
          <el-autocomplete
            :fetch-suggestions="querySearch"
            v-model="selectAgent"
            class="width270"
            popper-class="my-autocomplete"
            placeholder="请输入商家名或手机号"
            @select="handleSelect">
            <template slot-scope="{ item }">
              <div class="name">{{ item.value }}</div>
            </template>
          </el-autocomplete>
        </el-col>
      </el-row>
      <p v-show="infoChecked" style="padding-top: 12px;font-size: 14px;color:red;">未查询到相应的商家，请重新输入！</p>
      <div slot="footer" style="text-align: center;" class="dialog-footer">
        <el-button :disabled="!selectAgent" type="primary" @click="confirmTranfer">确定转移设备</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible2" title="温馨提示" width="50%">
      <span>已选择设备：300个</span>
      <span>即将退还给上级代理：15521271697</span>
      <span>退还设备后，该设备将从你的设备列表消失，确定退还吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="questionDialogVisible"
      class="question-main-dialog"
      width="50%"
      title="设备转移常见问题">
      <div class="main question-main">
        <div class="item">
          <h2>1. 什么是“待转移设备”？</h2>
          <p class="info">“待转移设备”指由设备提供方，按设备编号批量导入的、且未注册绑定到商家账号的设备。如果购买了设备，而“待转移设备”列表为空，请及时联系你的设备提供方。</p>
        </div>
        <div class="item">
          <h2>2. 如何转移设备？</h2>
          <p class="info"> 勾选设备后，点击“批量转移设备”按钮，可将设备批量转移到某个商家（或某个代理）账号下。</p>
        </div>
        <div class="item">
          <h2>3. 代理将设备批量转移给商家后，商家如何批量注册？</h2>
          <p class="info">
            （1）代理将设备批量转移给商家后，需告知商家登录PC端管理后台（网址：https://fac.leyaoyao.com/#/login ），
            用商家账号、密码登录进去以后，点击“设备管理>未注册设备”，即可看到代理转移给商家的设备。
            勾选未注册的设备，并点击“批量注册”，然后选择要投放的场地，即可批量注册成功。</p>
          <p class="info">
            （2）批量注册成功后，商家再登录手机端管理后台，即可在相应场地查看到设备。商家无需再一个个扫码注册。
          </p>
        </div>
        <div class="item">
          <h2>4. 如果已转移的设备被商家解绑了，那设备会去往哪里？</h2>
          <p class="info">如果已转移的设备被商家解绑了，则解绑的设备将会重新返回到代理的“待转移设备”列表中。</p>
        </div>
      </div>
    </el-dialog>
    <a id="downLoad" ref="downloadZip" :href="loadUrl" :download="downLoadFileName" style="display: none;"/>
  </el-main>
</template>

<script>
import { getDeviceTypeBd } from '../../api/getEquiedType'
import { agentEquipmentList } from '../../api/getDeviceList'
import { childMerchants } from '../../api/businessManage'
import { transfer, rebackEquipment } from '../../api/transferDevice'
import { Throttle } from '../../utils/throttle'
import { exportPayOrCode, exportRegisterOrCode } from '../../api/qrcodeCreate'
export default {
  name: 'DeviceTransfer',
  data() {
    return {
      dialogVisible2: false,
      total: 0,
      throttle: null,
      downLoadFileName: '下载',
      questionDialogVisible: false,
      loadUrl: '',
      agentid: '',
      selectAgent: '',
      agentsArr: [],
      willTranfers: [],
      innerVisible: false,
      dialogVisible: false,
      listQuery: { page: 1, limit: 20 },
      infoChecked: false,
      tableKey: 0,
      listLoading: false,
      minHeightTable: 660,
      list: [],
      equipmentTypesArr: [],
      isOnline: [
        {
          label: '全部',
          value: 0
        },
        {
          label: '在线',
          value: 1
        },
        {
          label: '离线',
          value: 2
        }
      ],
      message: '将设备批量转移给商家后，需告知商家登录PC端管理后台及时批量注册设备（商家PC端管理后台网址：https://fac.leyaoyao.com/#/login  ）。',
      form: {
        isOnline: '',
        equipmentTypeValue: '',
        equipmentIdStart: null,
        equipmentIdEnd: null
      }
    }
  },
  created() {
    const clientHeight = document.body.clientHeight || document.documentElement.clientHeight
    this.minHeightTable = clientHeight - 388
    this.throttle = Throttle()
    getDeviceTypeBd()
      .then((res) => {
        if (res.result === 0 && res.data && res.data.length !== 0) {
          res.data.forEach((item) => {
            this.equipmentTypesArr.push({
              label: item.name,
              value: item.code
            })
          })
        }
      })
    this.getList()
  },
  methods: {
    // 退还设备
    rebackEquipmentDevidce() {
      this.dialogVisible = true
      // 设备id
      const equipmentIds = []
      this.willTranfers.forEach((v) => {
        equipmentIds.push(v.equipmentValue)
      })
      rebackEquipment({ value: equipmentIds }).then(res => {
        this.dialogVisible = false
      })
    },
    // 导出二维码
    importQrcode(type) {
      let diff = false
      if (this.willTranfers.length <= 0) {
        this.$message({ message: '请选择需要操作的设备！', type: 'warning' })
        return
      } else {
        this.willTranfers.reduce((prev, next) => {
          console.log(prev.equipmentTypeName, next.equipmentTypeName)
          if (!diff && (prev.equipmentTypeName !== next.equipmentTypeName)) {
            diff = true
          }
          return next
        })
      }
      if (diff) {
        this.$alert('仅支持导出同一种设备类型的二维码，请重新勾选。', '温馨提示', { confirmButtonText: '知道了' })
        return
      }
      // 设备id
      const equipmentIds = []
      this.willTranfers.forEach((v) => {
        equipmentIds.push(v.equipmentValue)
      })
      if (type === 'pay') {
        this.downLoadFileName = '支付二维码下载'
        this.loadUrl = exportPayOrCode({ valueStr: equipmentIds })
      } else if (type === 'register') {
        this.downLoadFileName = '注册二维码下载'
        this.loadUrl = exportRegisterOrCode({ valueStr: equipmentIds.join(',') })
      }
      this.throttle(() => {
        this.$nextTick(() => {
          this.$refs.downloadZip.click()
        })
      }, 2500)
    },
    beforeClose(done) {
      this.$refs.multipleTable.clearSelection()
      this.selectAgent = ''
      this.agentid = ''
      done()
    },
    confirmTranfer() {
      if (!this.selectAgent) {
        this.innerVisible = true
        return
      } else if (!this.agentid || this.infoChecked) {
        return
      }
      this.dialogVisible = false
      const loading = this.$loading({ lock: true, text: '转移中...', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)' })
      const arrTrans = []
      this.willTranfers.forEach(val => {
        arrTrans.push(val.equipmentValue)
      })
      const params = { values: arrTrans, adorgid: this.agentid }
      transfer(params)
        .then(() => {
          loading.close()
          this.listQuery.page = 1
          this.agentid = ''
          this.selectAgent = ''
          this.$message({ message: '转移成功！', type: 'success' })
          this.getList()
        })
        .catch(() => {
          loading.close()
          this.$message.error('设备转移失败！')
        })
    },
    handleSelectionChange(item) {
      this.willTranfers = item
    },
    querySearch(queryString, cb) {
      const quer = /^(.+)\((.+)\)$/.exec(queryString)
      if (quer) {
        queryString = quer[1] && quer[1].trim()
      }
      childMerchants({ agentQuery: queryString })
        .then(res => {
          if (res.result === 0 && res.data && res.data.length !== 0) {
            const results = []
            res.data.forEach(item => {
              results.push({
                value: `${item.merchantname} (${item.username})`,
                agentId: item.adorgid
              })
            })
            this.agentsArr = results
            this.infoChecked = false
            cb(results)
          } else {
            this.infoChecked = true
            cb([])
          }
        })
    },
    handleSelect(item) {
      this.agentid = item.agentId
    },
    getList() {
      this.listLoading = true
      this.form.pageSize = this.listQuery.limit
      this.form.pageIndex = this.listQuery.page
      // this.form.values = this.form.values.replace(/\s/g, '')
      // this.form.values = this.form.values.replace(/，/g, ',')
      agentEquipmentList(this.form).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.willTranfers = []
        this.checked = false
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    look() {
      if (parseInt(this.form.equipmentIdStart) < 0) {
        this.$alert('设备编号不能小于0。', '温馨提示', { confirmButtonText: '知道了' })
        return
      } else if (parseInt(this.form.equipmentIdStart) > parseInt(this.form.equipmentIdEnd)) {
        this.$alert('设备编号请按从小到大的顺序输入。', '温馨提示', { confirmButtonText: '知道了' })
        return
      } else if (parseInt(this.form.equipmentIdStart) + 100 < parseInt(this.form.equipmentIdEnd)) {
        this.$alert('支持连号查询，一次最多可查询100个。', '温馨提示', { confirmButtonText: '知道了' })
        return
      }
      this.listQuery.page = 1
      this.getList()
    },
    transfer() {
      if (this.willTranfers.length === 0) {
        this.$message({ showClose: false, message: '请选择要转移的设备！', type: 'warning' })
      } else {
        this.dialogVisible = true
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .width270{
    width: 270px;
  }
  .often-question{
    color: #1296DB;
    align-items: center;
    font-size: 15px;
    line-height: 150%;
    cursor: pointer;
  }
  .question-main{
    .item{
      margin-bottom: 10px;
      h2{
        font-size: 18px;
        color: #333;
        padding: 8px 0;
      }
      .info{
        font-size: 15px;
        color: #666;
        line-height: 150%;
        text-indent: 30px;
      }
    }
  }
</style>
