<template>
  <el-main class="agent-list-container">
    <el-form ref="form" :model="form" label-width="106px" class="deviceForm">
      <el-row>
        <el-col :span="8">
          <el-form-item label="设备编号" >
            <el-row>
              <el-col :span="11" >
                <div class="el-input-number el-input-number--medium is-without-controls" style="width: 100%;">
                  <div class="el-input el-input--medium">
                    <input v-model="form.equipmentIdStart" class="el-input__inner" type="number" placeholder="设备编号">
                  </div>
                </div>
              </el-col>
              <el-col :span="2">
                <div style="text-align: center;">-</div>
              </el-col>
              <el-col :span="11" >
                <div class="el-input-number el-input-number--medium is-without-controls" style="width: 100%;">
                  <div class="el-input el-input--medium">
                    <input v-model="form.equipmentIdEnd" class="el-input__inner" type="number" placeholder="设备编号">
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="场地名称" prop="groupName">
            <el-input v-model="form.groupName" placeholder="请输入场地名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="设备状态" prop="status">
            <!--<el-input v-model="form.groupNumber" placeholder="请输入机台号"/>-->
            <el-select v-model="form.status" placeholder="请选择">
              <el-option
                v-for="item in disableOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="设备类型" prop="equipmentTypeName">
            <el-select v-model="form.equipmentTypeName" placeholder="请选择">
              <el-option
                v-for="item in equipmentTypeName"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <!--<el-col :span="8">
          <el-form-item label="设备类型" prop="equipmentTypeName">
            <el-select v-model="form.equipmentTypeName" placeholder="请选择">
              <el-option
                v-for="item in equipmentTypeName"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>-->
        <!--<el-col :span="8">
          <el-form-item label="在线状态" prop="isOnline">
            <el-select v-model="form.isOnline" placeholder="请选择">
              <el-option
                v-for="item in isOnline"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>-->
      </el-row>
    </el-form>
    <div class="filter-container">
      <el-button v-waves type="primary" icon="el-icon-search" @click="handleBtn('find')">查询</el-button>
      <el-button v-waves style="margin-left: 10px;" type="primary" icon="el-icon-delete" @click="handleBtn('clear')">清空查询</el-button>
      <el-tooltip class="item" effect="dark" content="预览支付二维码" placement="top-start">
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-view" @click="handleCreateQRCode">查看二维码</el-button>
      </el-tooltip>
      <el-button v-waves type="primary" icon="el-icon-download" @click="importQrcode('pay')">导出支付二维码</el-button>
      <el-button v-waves style="margin-left: 10px;" type="primary" icon="el-icon-download" @click="importQrcode('register')">导出注册二维码</el-button>
      <el-button v-waves style="margin-left: 10px;" type="primary" icon="el-icon-goods" @click="disabledEquipment('disable')">禁用设备</el-button>
      <el-button style="margin-left: 10px;" type="primary" icon="el-icon-view" @click="disabledEquipment('enable')">解除禁用</el-button>
      <el-button style="margin-left: 10px;" type="primary" icon="el-icon-setting" @click="equipmentSetPara">设置设备参数</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      stripe
      fit
      highlight-current-row
      style="width: 100%;margin-top: 20px;"
      @selection-change="getTemplateRow">
      <el-table-column type="selection" width="65"/>
      <el-table-column label="设备编号" align="center" prop="equipmentId">
        <template slot-scope="scope">
          <span>{{ scope.row.equipmentId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="禁用状态" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备机台号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.groupNumber || '' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="场地名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.groupName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备类型" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.equipmentTypeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="代理/商家名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.agentUserName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" align="center" prop="role">
        <template slot-scope="scope">
          <span>{{ scope.row.role }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="区域" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.districtName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册状态" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.isRegister }}</span>
        </template>
      </el-table-column>
      <el-table-column label="在线状态" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.online ? '在线' : '离线' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="固件版本" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.firmwareVersion }}</span>
        </template>
      </el-table-column>
      <el-table-column :render-header="renderHeader" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.equipmentParam }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        v-show="total>0"
        :current-page="listQuery.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.limit"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
    <div v-show="showQR" class="mask-box" @click.stop="showQR = !showQR" >
      <div class="wrapper" @click.stop="" >
        <div class="close" @click.stop="showQR = !showQR">X</div>
        <h2>请用微信或支付宝扫描二维码</h2>
        <canvas id="canvas"/>
        <p>{{ checkedRowAlone.equipmentId }}</p>
        <p>{{ checkedRowAlone.groupNumber ? checkedRowAlone.groupNumber + '号机' : '' }}{{ checkedRowAlone.groupName ? '(' + checkedRowAlone.groupName + ')': '' }}</p>
        <p>{{ checkedRowAlone.equipmentTypeName }}</p>
      </div>
    </div>
    <a id="downLoad" ref="downloadZip" :href="loadUrl" :download="downLoadFileName" style="display: none;"/>
    <!---参数设置弹框-->
    <el-dialog :visible.sync="equipmentParaDialog" width="500px" title="设置设备参数">
      <set-equipment-paras-form
        :checkedrow="checkedRow"
        @cancel="equipmentParaDialog = false"
        @confirom="confirom"/>
    </el-dialog>
  </el-main>
</template>

<script>
import { getFirstDeviceList, equipmentStatus, setEquipmentParam } from '@/api/getDeviceList'
import { getDeviceType } from '@/api/getEquiedType'
import SetEquipmentParasForm from '@/components/SetEquipmentParas'
import { exportPayOrCode, exportRegisterOrCode } from '@/api/qrcodeCreate'
import { Throttle } from '@/utils/throttle'
import waves from '@/directive/waves' // 水波纹指令
import QRCode from 'qrcode'

const calendarTypeOptions = [
  { key: 0, display_name: '冻结' },
  { key: 1, display_name: '激活' }
]
export default {
  name: 'DeviceList',
  directives: {
    waves
  },
  components: {
    SetEquipmentParasForm
  },
  data() {
    return {
      tableKey: 0,
      loadUrl: '',
      equipmentParaDialog: false,
      throttle: null,
      downLoadFileName: '二维码下载',
      showQR: false,
      list: null,
      minHeightTable: 550,
      total: null,
      listLoading: true,
      disableOptions: [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '正常'
        },
        {
          value: 2,
          label: '已禁用'
        }
      ],
      basicConfig: {
        machineUrl: 'https://m.leyaoyao.com/customer/message/t/',
        gashaponUrl: 'https://m.leyaoyao.com/customer/message/g/',
        childUrl: 'https://m.leyaoyao.com/customer/message/c/'
      },
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
      equipmentTypeName: [],
      form: {
        equipmentIdStart: null,
        equipmentIdEnd: null,
        deviceName: '',
        status: '',
        groupName: '',
        agentUserName: '',
        equipmentTypeName: '',
        isOnline: ''
      },
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      calendarTypeOptions,
      checked: false,
      checkedRowAlone: {},
      checkedRow: [],
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      downloadLoading: false
    }
  },
  created() {
    this.throttle = Throttle()
    this.getList()
    getDeviceType().then(res => {
      const types = res.data
      if (types && types.length !== 0) {
        types.forEach(item => {
          item.label = item.equipmenttypename
          item.value = item.equipmenttypename
        })
      }
      this.equipmentTypeName = types
    })
    const clientHeight = document.body.clientHeight || document.documentElement.clientHeight
    this.minHeightTable = clientHeight - 334
  },
  methods: {
    renderHeader(h) {
      return [h('p', {}, ['设备参数']), h('p', {}, ['(脉冲宽度/脉冲间隔/待机电平)'])]
    },
    confirom(data) {
      this.equipmentParaDialog = false
      const equipmentIds = []
      this.checkedRow.forEach((v) => {
        equipmentIds.push(v.equipmentId)
      })
      setEquipmentParam({ values: equipmentIds, ...data })
        .then(res => {
          if (res.result === 0) {
            this.getList()
            this.$message({
              message: '参数设置成功！',
              type: 'success'
            })
          }
        })
    },
    // 设备参数设置
    equipmentSetPara() {
      if (this.diffEquipmentType()) {
        return
      }
      this.equipmentParaDialog = true
    },
    // 判断选择设备的类型是否一致
    diffEquipmentType() {
      let diff = false
      if (this.checkedRow.length <= 0) {
        this.$message({
          message: '请选择需要操作的设备！',
          type: 'warning'
        })
        return true
      } else {
        this.checkedRow.reduce((prev, next) => {
          if (!diff && (prev.equipmentTypeName !== next.equipmentTypeName)) {
            diff = true
          }
          return next
        })
      }
      if (diff) {
        this.$alert('仅支持导出同一种设备类型的二维码，请重新勾选。', '温馨提示', {
          confirmButtonText: '知道了'
        })
        return true
      }
      return false
    },
    // 导出二维码
    importQrcode(type) {
      // 如果没有选择设备或者选择了不同的设备就退出
      if (this.diffEquipmentType()) {
        return
      }
      // 设备id
      const equipmentIds = []
      this.checkedRow.forEach((v) => {
        equipmentIds.push(v.equipmentId)
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
    // 解除禁用
    disabledEquipment(type) {
      if (this.checkedRow.length <= 0) {
        this.$message({
          message: '请选择需要操作的设备！',
          type: 'warning'
        })
        return
      }
      if (type === 'disable') {
        this.$confirm('禁用设备后，用户将无法付款启动该设备。你可以通过“解除禁用”来恢复使用。\n 确定要禁用设备吗？', '温馨提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(() => {
            this.equipmentDisable('disabled')
          })
      } else if (type === 'enable') {
        this.$confirm('确定要解除禁用吗？', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(() => {
            this.equipmentDisable('1Normal')
          })
      }
    },
    // 设备禁用和解禁
    equipmentDisable(type) {
      const loading = this.$loading({
        lock: true,
        text: 'loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const disEquimentIds = []
      this.checkedRow.forEach(item => {
        disEquimentIds.push(item.equipmentId)
      })
      equipmentStatus({
        status: type,
        values: disEquimentIds
      })
        .then((res) => {
          loading.close()
          if (res.result === 0) {
            const failText = res.data.fail.length === 0 ? '' : `失败${res.data.fail.length}条;
        失败的设备编号：${res.data.fail.join(',')}`
            this.$alert(`${res.description} ${failText}`, '操作结果', {
              confirmButtonText: '确定',
              callback: () => {
                this.getList()
              }
            })
          }
          // loading.close()
        })
        .catch((err) => {
          console.log(err)
          loading.close()
        })
    },
    handleChange() {
      console.log(999)
    },
    createQRCode() {
      const canvas = document.getElementById('canvas')
      const checkedRow = this.checkedRow[0]
      this.checkedRowAlone = checkedRow
      let url
      console.log(checkedRow.equipmentTypeName)
      if (checkedRow.equipmentTypeName === '儿童类') {
        url = this.basicConfig.childUrl
      } else if (checkedRow.equipmentTypeName === '扭蛋机') {
        url = this.basicConfig.gashaponUrl
      } else {
        url = this.basicConfig.machineUrl
      }
      QRCode.toCanvas(canvas, url + checkedRow.equipmentId, {
        width: 200,
        height: 200
      })
    },
    handleCreateQRCode() {
      if (!this.checkedRow.length) {
        this.$message({
          message: '请选择要生成二维码的设备！',
          type: 'warning'
        })
        return
      } else if (this.checkedRow.length > 1) {
        this.$message({
          message: '一次只能查看一个设备的二维码！',
          type: 'warning'
        })
        return
      }
      this.showQR = !this.showQR
      this.createQRCode()
    },
    getTemplateRow(row) {
      // 获取选中数据
      this.checked = true
      console.log(row)
      this.checkedRow = row
    },
    getList() {
      this.listLoading = true
      this.form.pageSize = this.listQuery.limit
      this.form.pageIndex = this.listQuery.page
      getFirstDeviceList(this.form).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.checkedRow = []
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
    handleBtn(type) {
      if (type === 'find') { // 新增代理商
        if (parseInt(this.form.equipmentIdStart) < 0) {
          this.$alert('设备编号不能小于0。', '温馨提示', {
            confirmButtonText: '知道了'
          })
          return
        } else if (parseInt(this.form.equipmentIdStart) > parseInt(this.form.equipmentIdEnd)) {
          this.$alert('设备编号请按从小到大的顺序输入。', '温馨提示', {
            confirmButtonText: '知道了'
          })
          return
        } else if (parseInt(this.form.equipmentIdStart) + 100 < parseInt(this.form.equipmentIdEnd)) {
          this.$alert('支持连号查询，一次最多可查询100个。', '温馨提示', {
            confirmButtonText: '知道了'
          })
          return
        }
        this.getList()
      } else if (type === 'clear') {
        this.form.equipmentIdStart = null
        this.form.equipmentIdEnd = null
        this.$refs.form.resetFields()
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
  .el-message-box /deep/ .el-message-box__message{
    word-wrap: break-word;
    word-break:break-all;
    word-break: break-word;
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
      .close{
        font-size: 16px;
        position: absolute;
        top: 14px;
        cursor: pointer;
        right: 20px;
      }
      h2{
        font-size: 16px;
        color: #666;
        padding-bottom: 20px;
      }
      canvas{
        display: block;
        margin: 0 auto;
      }
      p{
        padding-top: 10px;
        font-size: 14px;
        color: #666;
        text-align: center;
      }
    }
  }
  .agent-list-container{
    padding-right: 30px;
  }
  .filter-container{
    .item{
      display: inline-block;
      .el-input{
        margin-bottom: 0;
      }
      .label{
        margin-right: 10px;
        vertical-align: middle;
        font-weight: 700;
      }
    }
  }

</style>
