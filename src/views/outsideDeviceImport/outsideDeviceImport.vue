<template>
  <el-main>
    <el-alert
      :title="message"
      :closable="false"
      type="warning"
      class="info"
    />
    <a class="download-btn" href="../../../static/file/sample.txt" download="sample.txt">
      模板下载
    </a>
    <el-form
      ref="form"
      :model="form"
      label-width="90px"
      class="deviceForm"
      style="padding: 16px 0; width: 400px;"
    >
      <el-row>
        <el-col>
          <el-form-item label="设备类型" prop="equipmentTypes">
            <el-select v-model="form.equipmentTypes" placeholder="请选择">
              <el-option
                v-for="item in equipmentTypesArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="代理商" prop="agent">
            <el-autocomplete
              :fetch-suggestions="querySearch"
              v-model="agentnick"
              class="width200"
              popper-class="my-autocomplete"
              placeholder="请输入内容"
              @select="handleSelect"
            >
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
              </template>
            </el-autocomplete>
            <p v-show="infoChecked" style="font-size: 14px;color:red;">未查询到相应的商家，请重新输入！</p>
          </el-form-item>
        </el-col>
      </el-row>
      <el-upload
        ref="upload"
        :on-success="handleSuccess"
        :on-error="handleError"
        :file-list="fileList"
        :on-change="onChange"
        :on-remove="removeFile"
        :auto-upload="false"
        :data="uploadPar"
        :disabled="disabled"
        :on-exceed="handleExceed"
        :limit="1"
        accept=".txt"
        class="upload-demo"
        action="/agent/outsideDeviceImport/import"
      >
        <el-row slot="trigger">
          <el-col>
            <el-button size="small" type="primary" @click="handleUploadTxt">选择txt文件</el-button>
          </el-col>
          <el-col>
            <ul class="el-upload-list el-upload-list--text"/>
          </el-col>
        </el-row>
        <div style="padding: 8px;"/>
        <el-button
          :disabled="false"
          size="small"
          type="success"
          @click="submitUpload"
        >确定上传
        </el-button>
      </el-upload>
    </el-form>
    <div style="width:100%;height:1px;border:1px solid #ccc"/>
    <el-row>
      <el-col :span="24" style="margin-top:20px;margin-bottom:20px;font-weight:600">导入数据</el-col>
    </el-row>
    <el-row>
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="状态">
          <el-select v-model="formSearch.selectedStatus" placeholder>
            <el-option
              v-for="item in formSearch.importStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="代理商">
          <el-autocomplete
            :fetch-suggestions="queryAgentList"
            v-model="formSearch.selectedAgentName"
            class="width200"
            popper-class="my-autocomplete"
            placeholder="请输入内容"
            @select="selectedValue"
          >
            <template slot-scope="{ item }">
              <div class="name">{{ item.value }}</div>
            </template>
          </el-autocomplete>
          <p
            v-show="formSearch.searchInfoChecked"
            style="font-size: 14px;color:red;"
          >未查询到相应的商家，请重新输入！</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchImportData">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table v-loading="listLoading" :data="importDataList" border>
      <el-table-column prop="lyyEquipmentTypeName" label="设备类型" align="center"/>
      <el-table-column prop="totalCount" label="导入设备数" align="center"/>
      <el-table-column prop="agentName" label="一级代理商" align="center"/>
      <el-table-column prop="created" label="导入时间" align="center"/>
      <el-table-column prop="statusName" label="导入状态" align="center"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="showImportDetail(scope.row)">查看导入详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        v-show="total > 0"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pageSize"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 导入详情 -->
    <el-dialog :visible.sync="showImportDetailFlag" title="导入详情">
      <div class="handle-btn-list">
        <el-button
          type="primary"
          @click="handleReflect"
        >
          映射设备
        </el-button>
        <el-button
          type="primary"
          @click="handleWithdraw"
        >
          撤回
        </el-button>
        <el-button
          type="primary"
          @click="handleDownload"
        >
          下载
        </el-button>
      </div>
      <el-table :data="importDetailList" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"/>
        <el-table-column prop="lyyEquipmentValue" label="设备编号" align="center"/>
        <el-table-column prop="value" label="外部编号" align="center"/>
        <el-table-column prop="statusName" label="导入状态" align="center"/>
        <el-table-column prop="reason" label="备注" align="center"/>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          v-show="detailTotal > 0"
          :current-page="detailPageIndex"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="detailPageSize"
          :total="detailTotal"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleDetailSizeChange"
          @current-change="handleDetailCurrentChange"
        />
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
import { getAllEquipment } from '../../api/getEquiedType'
import { queryAgents } from '../../api/getAgentUserId'
import {
  outsideDeviceImportExecuteRevocation,
  outsideDeviceImportExecuteORM,
  outsideDeviceImportDetailList,
  outsideDeviceImportBatchExportCode,
  getOutsideDeviceImportList
} from '../../api/deviceImport'

export default {
  name: 'OutsideDevicesImport',
  data() {
    return {
      fileList: [],
      file: null,
      agentnick: '',
      infoChecked: false,
      throttle: false,
      form: {
        equipmentTypes: '',
        agent: ''
      },
      equipmentTypesArr: [],
      agentUsers: [],
      message:
        '请导入含外部编号、私钥的txt文档（注意：TXT格式，按【外部编号+1个空格+私钥】格式），目前可导入金吉外部设备编号',
      colums: [
        { key: 'failIndex', label: '序号' },
        { key: 'value', label: '设备编号' },
        { key: 'failNote', label: '导入失败原因' }
      ],
      failList: [],
      dialogVisible: false,
      failtTest: '',
      formSearch: {
        importStatus: [
          {
            label: '全部',
            value: -1
          },
          {
            label: '全部成功',
            value: 0
          },
          {
            label: '部分成功',
            value: 1
          },
          {
            label: '已撤回',
            value: 2
          },
          {
            label: '导入失败',
            value: 3
          }
        ],
        agentAccount: '',
        selectedStatus: -1,
        agentList: [],
        selectedAgentUid: '',
        selectedAgentName: '',
        searchInfoChecked: false
      },
      importDataList: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      listLoading: false,
      importDetailList: [],
      showImportDetailFlag: false,
      detailPageIndex: 1,
      detailPageSize: 10,
      detailTotal: 0,
      currentImportLogId: '',
      selectDevices: [],
      lyyEquipmentValues: []
    }
  },
  computed: {
    disabled() {
      if (!this.form.agent) {
        return true
      } else if (!this.form.equipmentTypes) {
        return true
      } else {
        return false
      }
    },
    uploadPar() {
      return {
        agentUserId: this.form.agent,
        equipmentType: this.form.equipmentTypes
      }
    }
  },
  created() {
    this.getDevicesList()
  },
  mounted() {
    this.queryImportDeviceList()
  },
  methods: {
    // 校验上传必填项
    handleUploadTxt() {
      if (!this.form.equipmentTypes) {
        this.$message.error('请选择设备类型！')
      } else if (!this.form.agent) {
        this.$message.error('请选择代理商！')
      }
    },
    // 获取设备类型
    getDevicesList() {
      getAllEquipment().then(res => {
        if (res.result === 0 && res.data && res.data.length) {
          res.data.forEach(item => {
            if (item.name === '售货机') {
              this.equipmentTypesArr.push({
                value: item.lyyEquipmentTypeId,
                label: item.name
              })
              this.form.equipmentTypes = this.equipmentTypesArr[0].value
            }
          })
        }
      })
    },
    // 获取导入设备列表
    async queryImportDeviceList() {
      this.listLoading = true
      const param = {
        status: this.formSearch.selectedStatus, // 状态：-1全部、0全部成功、1部分成功、2已撤回、3导入失败
        agentUserId: this.formSearch.selectedAgentUid,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      const res = await getOutsideDeviceImportList(param)
      if (res.result === 0) {
        this.listLoading = false
        this.total = res.data.total
        this.importDataList = []
        res.data.items.forEach(i => {
          this.importDataList.push({
            agentEquipmentImportLogId: i.agentEquipmentThirdImportLogId,
            lyyEquipmentTypeName: i.lyyEquipmentType,
            totalCount: i.totalCount,
            agentName: i.agentUserName,
            created: i.created,
            statusName: this.getStatusName(i.status),
            status: i.status
          })
        })
        this.pageIndex = res.data.page
      }
    },
    // 查看导入详情列表
    async queryImportDetailList() {
      const param = {
        agentEquipmentImportLogId: this.currentImportLogId,
        pageIndex: this.detailPageIndex,
        pageSize: this.detailPageSize
      }
      const res = await outsideDeviceImportDetailList(param)
      if (res.result === 0) {
        this.detailTotal = res.data.total
        this.importDetailList = []
        res.data.items.forEach(i => {
          this.importDetailList.push({
            agentEquipmentThirdImportDetailId: i.agentEquipmentThirdImportDetailId,
            agentEquipmentThirdImportLogId: i.agentEquipmentThirdImportLogId,
            lyyEquipmentValue: i.lyyEquipmentValue,
            reason: i.reason,
            value: i.value,
            statusName: this.getImportStatusName(i.status),
            status: i.status
          })
        })
      }
    },
    // 导入详情设备列表选择
    handleSelectionChange(val) {
      this.selectDevices = val.map(v => v.agentEquipmentThirdImportDetailId)
      this.lyyEquipmentValues = val.map(v => v.lyyEquipmentValue)
    },
    // 设备导入批量撤回
    handleWithdraw() {
      if (this.selectDevices.length === 0) {
        this.$message.error('请选择设备！')
        return
      }
      this.$confirm(
        '确定要撤回导入该批次设备吗？',
        '确认信息',
        {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
        this.cancelImport()
      })
    },
    // 撤回
    async cancelImport() {
      const param = {
        ids: this.selectDevices.join(',')
      }
      const res = await outsideDeviceImportExecuteRevocation(param)
      if (res.result === 0) {
        this.$message.success('撤回成功！')
        this.queryImportDetailList()
        this.queryImportDeviceList()
      }
    },
    // 设备导入映射
    async handleReflect() {
      if (this.selectDevices.length === 0) {
        this.$message.error('请选择设备！')
        return
      }
      const res = await outsideDeviceImportExecuteORM({ ids: this.selectDevices.join(',') })
      if (res.result === 0) {
        this.$message.success('映射成功！')
        this.queryImportDetailList()
        this.queryImportDeviceList()
      }
    },
    // 下载
    async handleDownload() {
      if (this.lyyEquipmentValues.length === 0) {
        this.$message.error('请选择设备！')
        return
      }
      const param = {
        lyyEquipmentValues: this.lyyEquipmentValues.join(',')
      }
      const res = await outsideDeviceImportBatchExportCode(param)
      if (res.result === 0) {
        this.$message.success('下载成功！')
      }
    },
    // 上传文件txt
    submitUpload() {
      if (this.throttle) {
        return
      }
      this.throttle = true
      if (!this.file) {
        this.$message.error('请选择上传文件！')
        return
      } else if (!this.form.agent || this.infoChecked) {
        this.$message.error('请选择代理商！')
        return
      }
      this.$refs.upload.submit()
    },
    // 删除文件
    removeFile() {
      this.file = null
    },
    // 上传文件监听
    onChange(file) {
      this.file = file
    },
    // 选择代理商
    handleSelect(item) {
      this.form.agent = item.agentId
    },
    // 搜索
    querySearch(queryString, cb) {
      const quer = /^(.+)\((.+)\)$/.exec(queryString)
      if (quer) {
        queryString = quer[1] && quer[1].trim()
      }
      queryAgents({ agentQuery: queryString }).then(res => {
        if (res.result === 0 && res.data && res.data.length !== 0) {
          const results = []
          res.data.forEach(item => {
            results.push({
              value: `${item.agentusername} (${item.phone})`,
              agentId: item.agentuserid
            })
          })
          this.agentUsers = results
          this.infoChecked = false
          cb(results)
        } else {
          this.infoChecked = true
          cb([])
        }
      })
      this.form.agent = ''
    },
    // 上传文件成功
    handleSuccess(par) {
      if (par.result === 0) {
        this.$message.success('导入数据成功！')
        this.queryImportDeviceList()
      } else if (par.result === -1) {
        this.$message.error(par.description)
      } else {
        this.$message.error(par.description)
      }
    },
    handleExceed() {
      this.$message.warning(`当前限制选择 1 个文件，一次只能上传一个文件`)
    },
    handleError() {
      this.throttle = false
      this.$message.error('导入失败！')
    },
    handleClose(done) {
      this.queryImportDeviceList()
      done()
    },
    searchImportData() {
      this.queryImportDeviceList()
    },
    queryAgentList(queryString, cb) {
      if (queryString === '') {
        console.log('输入为空')
        this.formSearch.selectedAgentUid = ''
      }
      const quer = /^(.+)\((.+)\)$/.exec(queryString)
      if (quer) {
        queryString = quer[1] && quer[1].trim()
      }
      queryAgents({ agentQuery: queryString }).then(res => {
        if (res.result === 0 && res.data && res.data.length !== 0) {
          const results = []
          res.data.forEach(item => {
            results.push({
              value: `${item.agentusername} ( ${item.phone} )`,
              agentId: item.agentuserid
            })
          })
          console.log(this.formSearch.agentList)
          this.formSearch.agentList = results
          this.formSearch.searchInfoChecked = false
          cb(this.formSearch.agentList)
        } else {
          this.formSearch.searchInfoChecked = true
          cb([])
        }
      })
    },
    selectedValue(item) {
      this.formSearch.selectedAgentUid = item.agentId
    },
    // 导入详情
    showImportDetail(row) {
      const agentEquipmentImportLogId = row.agentEquipmentImportLogId
      this.currentImportLogId = agentEquipmentImportLogId
      this.showImportDetailFlag = true
      this.queryImportDetailList()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.queryImportDeviceList()
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.queryImportDeviceList()
    },
    handleDetailSizeChange(val) {
      this.detailPageSize = val
      this.queryImportDetailList()
    },
    handleDetailCurrentChange(val) {
      this.detailPageIndex = val
      this.queryImportDetailList()
    },
    getStatusName(status) {
      let str = ''
      switch (status) {
        case 0:
          str = '全部成功'
          break
        case 1:
          str = '部分成功'
          break
        case 2:
          str = '已撤回'
          break
        case 3:
          str = '导入失败'
          break
      }
      return str
    },
    getImportStatusName(val) {
      let str = ''
      switch (val) {
        case 0:
          str = '成功'
          break
        case 1:
          str = '已撤回'
          break
        case 2:
          str = '失败'
          break
        case 3:
          str = '已映射'
          break
      }
      return str
    }
  }
}
</script>
<style lang="scss">
  .download-btn {
    position: absolute;
    top: 32px;
    right: 35px;
    color: blue;
  }

  .handle-btn-list {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 30px;
  }

  .width200 {
    width: 200px;
  }

  .el-message-box__message {
    word-wrap: break-word;
    word-break: break-all;
    word-break: break-word;
  }

  .upload-demo {
    position: relative;

    ul {
      position: absolute;
      left: 101px;
      top: -5px;
    }
  }

  .fail-reason {
    padding: 20px 0 10px 0;
    font-size: 18px;
  }
</style>
