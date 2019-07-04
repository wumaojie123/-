<template>
  <el-main>
    <el-alert :title="message" :closable="false" type="warning" class="info" />
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
        action="/agent/rest/file/batch/import"
      >
        <el-row slot="trigger">
          <el-col>
            <el-button :disabled="disabled || throttle" size="small" type="primary">选择txt文件</el-button>
          </el-col>
          <el-col>
            <ul class="el-upload-list el-upload-list--text" />
          </el-col>
        </el-row>
        <div style="padding: 8px;" />
        <el-button
          :disabled="disabled || throttle"
          size="small"
          type="success"
          @click="submitUpload"
        >确定上传</el-button>
      </el-upload>
    </el-form>
    <!-- 失败对话框 -->
    <el-dialog :before-close="handleClose" :visible.sync="dialogVisible" title="导入结果" width="50%">
      <span>{{ failtTest }}</span>
      <p v-if="failList.length > 0" class="fail-reason">失败原因</p>
      <el-table
        v-if="failList.length > 0"
        :data="failList"
        :height="400"
        border
        highlight-current-row
        style="width: 100%;margin-bottom: 20px;"
      >
        <el-table-column
          v-for="(item, index) in colums"
          :key="index"
          :prop="item.key"
          :label="item.label"
          :width="item.width"
          :sortable="item.sortable"
          align="center"
        />
      </el-table>
    </el-dialog>

    <!-- add by lss 20190702 导入数据统计 -->
    <div style="width:100%;height:1px;border:1px solid #ccc" />

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
      <el-table-column prop="lyyEquipmentTypeName" label="设备类型" />
      <el-table-column prop="totalCount" label="导入设备数" />
      <el-table-column prop="agentName" label="一级代理商" />
      <el-table-column prop="created" label="导入时间" />
      <el-table-column prop="statusName" label="导入状态" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="showImportDetail(scope.row)">查看导入详情</el-button>
          <el-button
            v-show="scope.row.status==0||scope.row.status==1"
            type="text"
            @click="batchCancelImport(scope.row)"
          >批次撤回</el-button>
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
      <el-button
        type="primary"
        style="margin-bottom:10px;margin-top:-10px;float:right"
        @click="myDownload"
      >下载</el-button>
      <el-table :data="importDetailList" border>
        <el-table-column prop="lyyEquipmentValue" label="设备编号" />
        <el-table-column prop="statusName" label="导入状态" />
        <el-table-column prop="reason" label="原因" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.status==0"
              type="text"
              @click="ckCancelImport(scope.row)"
            >导入撤回</el-button>
          </template>
        </el-table-column>
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
// import AnalysisPicker from '../components/AnalysisPicker/'
import { getDeviceTypeBd } from '../../api/getEquiedType'
import { queryAgents } from '../../api/getAgentUserId'
import {
  getDeviceImportList,
  getImportDetailList,
  myCancelImport,
  download
} from '../../api//deviceImport'
export default {
  name: 'DevicesImport',
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
        '请导入含设备编号的txt文档（注意：可以将Excel的数据直接复制到txt文档中，每一行代表一个设备编号）。不支持导入以下设备：出厂未通电的设备，已被导入的设备。',
      colums: [
        { key: 'failIndex', label: '序号' },
        { key: 'value', label: '设备编号' },
        { key: 'failNote', label: '导入失败原因' }
      ],
      failList: [],
      dialogVisible: false,
      failtTest: '',
      // add by lss 20190702 新增导入记录
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
            label: '导入失败',
            value: 2
          },
          {
            label: '已撤回',
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
      currentImportLogId: ''
    }
  },
  // components: {
  //   AnalysisPicker
  // },
  computed: {
    disabled() {
      if (!this.form.agent) {
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
    getDeviceTypeBd().then(res => {
      if (res.result === 0 && res.data && res.data.length) {
        res.data.forEach(item => {
          this.equipmentTypesArr.push({
            value: item.code,
            label: item.name
          })
        })
        this.equipmentTypesArr.push({
          label: '其他',
          value: ''
        })
      }
    })
  },
  mounted() {
    this.queryImportDeviceList()
  },

  methods: {
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
    removeFile() {
      this.file = null
    },
    onChange(file) {
      this.file = file
    },
    handleSelect(item) {
      this.form.agent = item.agentId
      console.log(this.form)
    },
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
    handleSuccess(par) {
      if (par.result === 0) {
        this.failtTest = par.description
        this.failList = par.data.fail
        this.dialogVisible = true
        this.throttle = false
        // this.$alert(`${par.description} ${failText}`, '导入结果', {
        //   confirmButtonText: '确定',
        //   callback: () => {
        //     this.throttle = false
        //     this.$refs.upload.clearFiles()
        //   }
        // })
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

    // add by lss 20190702 新增导入记录

    searchImportData() {
      this.queryImportDeviceList()
    },

    queryAgentList(queryString, cb) {
      const quer = /^(.+)\((.+)\)$/.exec(queryString)
      if (quer) {
        queryString = quer[1] && quer[1].trim()
      }
      queryAgents({ agentQuery: queryString }).then(res => {
        if (res.result === 0 && res.data && res.data.length !== 0) {
          res.data.forEach(item => {
            this.formSearch.agentList.push({
              value: `${item.agentusername} (${item.phone})`,
              agentId: item.agentuserid
            })
          })
          console.log(this.formSearch.agentList)
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
      var agentEquipmentImportLogId = row.agentEquipmentImportLogId
      this.currentImportLogId = agentEquipmentImportLogId
      this.showImportDetailFlag = true
      this.queryImportDetailList()
      console.log(row)
    },
    batchCancelImport(row) {
      var id = row.agentEquipmentImportLogId
      this.$confirm('确定要撤回导入该批次设备吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.cancelImport(id, '1')
      })
    },
    ckCancelImport(row) {
      var id = row.agentEquipmentImportDetailId
      this.$confirm('确定要撤回导入该设备吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.cancelImport(id, '0')
      })
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
      var str = ''
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
      var str = ''
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
      }
      return str
    },

    async queryImportDeviceList() {
      this.listLoading = true
      var param = {
        status: this.formSearch.selectedStatus,
        agentUserId: this.formSearch.selectedAgentUid,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      var res = await getDeviceImportList(param)
      if (res.result === 0) {
        this.listLoading = false
        this.total = res.data.total
        this.importDataList = []
        res.data.items.forEach(i => {
          this.importDataList.push({
            agentEquipmentImportLogId: i.agentEquipmentImportLogId,
            lyyEquipmentTypeName: i.lyyEquipmentTypeName,
            totalCount: i.totalCount,
            agentName: i.agentUserName + i.agentUserLoginId,
            created: i.created,
            statusName: this.getStatusName(i.status),
            status: i.status
          })
        })
        this.pageIndex = res.data.page
      }
    },

    async queryImportDetailList() {
      var param = {
        agentEquipmentImportLogId: this.currentImportLogId,
        pageIndex: this.detailPageIndex,
        pageSize: this.detailPageSize
      }
      var res = await getImportDetailList(param)
      if (res.result === 0) {
        this.detailTotal = res.data.total
        this.importDetailList = []
        res.data.items.forEach(i => {
          this.importDetailList.push({
            agentEquipmentImportDetailId: i.agentEquipmentImportDetailId,
            lyyEquipmentValue: i.lyyEquipmentValue,
            reason: i.reason,
            statusName: this.getImportStatusName(i.status),
            status: i.status
          })
        })
      }
    },
    /**
     * isBatch 是否批量撤回 1 是  0 否
     */

    async cancelImport(id, isBatch) {
      var param = {}
      if (isBatch === '1') {
        param.agentEquipmentImportLogId = id
      } else {
        param.agentEquipmentImportDetailId = id
      }
      var res = await myCancelImport(param)
      if (res.result === 0) {
        this.$message({
          message: res.description,
          type: 'success'
        })
        if (isBatch === '1') {
          this.queryImportDeviceList()
        } else {
          this.queryImportDetailList()
        }
      }
    },
    async myDownload() {
      var param = {
        importLogId: this.currentImportLogId
      }
      download(param)
    }
  }
}
</script>
<style lang="scss" >
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
