<template>
  <el-main>
    <el-alert :title="message" :closable="false" type="warning" class="info" />
    <el-form ref="form" :model="form" label-width="90px" class="deviceForm" style="padding: 16px 0;">
      <el-row>
        <el-col :span="6">
          <el-form-item label="设备类型" prop="equipmentTypeValue">
            <el-select v-model="form.equipmentTypeValue" placeholder="请选择">
              <el-option
                v-for="item in equipmentTypesArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <!--<el-col :span="6">
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
      <el-row>
        <el-col :span="12">
          <el-form-item label="设备编号">
            <el-input v-model="form.values" type="textarea"/>
            <p style="color: #666;font-size: 14px;">最多支持查询100个设备，每个设备编号请用逗号【，】隔开</p>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-button type="primary" @click="look">查看</el-button>
        <el-button type="primary" @click="transfer">勾选批量转移</el-button>
      </el-row>
    </el-form>
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
      <!--<el-table-column label="区域" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.districtName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="在线状态" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.online ? '在线' : '离线' }}</span>
        </template>
      </el-table-column>-->
      <el-table-column label="固件版本" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.versionno }}</span>
        </template>
      </el-table-column>
      <!--
      <el-table-column label="设备机台号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.groupNumber || '' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="代理商名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.agentUserName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="场地名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.groupName }}</span>
        </template>
      </el-table-column>-->
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
      <el-autocomplete
        :fetch-suggestions="querySearch"
        v-model="selectAgent"
        class="width270"
        popper-class="my-autocomplete"
        placeholder="请输入内容"
        @select="handleSelect">
        <template slot-scope="{ item }">
          <div class="name">{{ item.value }}</div>
        </template>
      </el-autocomplete>
      <p v-show="infoChecked" style="padding-top: 12px;font-size: 14px;color:red;">未查询到相应的商家，请重新输入！</p>
      <p style="padding-top: 12px;font-size: 14px;color:#666;">请选择目标商家，支持输入名称或手机号码查询。</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmTranfer">确定转移</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
import { getDeviceTypeBd } from '../../api/getEquiedType'
import { agentEquipmentList } from '../../api/getDeviceList'
import { queryAgents } from '../../api/getAgentUserId'
import { transfer } from '../../api/transferDevice'
export default {
  name: 'DeviceTransfer',
  data() {
    return {
      total: 0,
      agentid: '',
      selectAgent: '',
      agentsArr: [],
      willTranfers: [],
      innerVisible: false,
      dialogVisible: false,
      listQuery: {
        page: 1,
        limit: 20
      },
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
      message: '转移设备指的是由BD协助批量导入到代理商的、且未注册绑定的设备编号。通过勾选批量转移，可以将设备转移到某个商家下。被转移的设备被商家解绑后，还会显示到该列表。',
      form: {
        isOnline: '',
        equipmentTypeValue: '',
        values: ''
      }
    }
  },
  created() {
    const clientHeight = document.body.clientHeight || document.documentElement.clientHeight
    this.minHeightTable = clientHeight - 388
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
    beforeClose(done) {
      this.$refs.multipleTable.clearSelection()
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
      const loading = this.$loading({
        lock: true,
        text: '转移中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const arrTrans = []
      this.willTranfers.forEach(val => {
        arrTrans.push(val.equipmentValue)
      })
      const params = {
        values: arrTrans,
        agentUserId: this.agentid
      }
      transfer(params)
        .then(() => {
          loading.close()
          this.listQuery.page = 1
          this.agentid = ''
          this.selectAgent = ''
          this.$message({
            message: '转移成功！',
            type: 'success'
          })
          this.getList()
        })
        .catch(() => {
          loading.close()
          this.$message.error('设备转移失败！')
        })
    },
    handleSelectionChange(item) {
      this.willTranfers = item
      console.log(this.willTranfers)
    },
    querySearch(queryString, cb) {
      const quer = /^(.+)\((.+)\)$/.exec(queryString)
      if (quer) {
        queryString = quer[1] && quer[1].trim()
      }
      queryAgents({ agentQuery: queryString })
        .then(res => {
          if (res.result === 0 && res.data && res.data.length !== 0) {
            const results = []
            res.data.forEach(item => {
              results.push({
                value: `${item.agentusername} (${item.phone})`,
                agentId: item.agentuserid
              })
            })
            this.agentsArr = results
            this.infoChecked = false
            cb(results)
          } else {
            this.infoChecked = true
            cb([])
          }
          console.log(res)
        })
      // console.log(queryString)
      // console.log(cb)
    },
    handleSelect(item) {
      console.log(item)
      this.agentid = item.agentId
      console.log(this.agentid)
    },
    getList() {
      this.listLoading = true
      this.form.pageSize = this.listQuery.limit
      this.form.pageIndex = this.listQuery.page
      this.form.values = this.form.values.replace(/\s/g, '')
      this.form.values = this.form.values.replace(/，/g, ',')
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
      this.listQuery.page = 1
      this.getList()
    },
    transfer() {
      if (this.willTranfers.length === 0) {
        this.$message({
          showClose: true,
          message: '请选择要转移的设备！',
          type: 'info'
        })
        return
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
</style>
