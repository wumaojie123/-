<template>
  <div class="agent-list-container bd-manage">
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">下级代理商</el-menu-item>
    </el-menu>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column :label="`序号`" align="center" width="65px">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`代理商名称`" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.agentUserName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`商家信息`" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`联系人`" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.linkName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`联系手机`" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`商家设备数量`" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ownEquipmentCount || 0 }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`再下级代理商数量`" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.subordinateCount || 0 }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`创建日期`" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createDate || '' }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import insideManage from '@/api/insideManage'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
export default {
  name: 'ShowSubAgent',
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      BDList: ['默哀', '啊哈哈', '哈哈哈'],
      checked: false,
      checkedRow: null,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList(this.$route.query.id)
  },
  methods: {
    getTemplateRow(index, row) {
      // 获取选中数据
      // this.checked = true
      this.checkedRow = row
    },
    getList(id) {
      this.listLoading = true
      insideManage.getAgentList({
        agentUserId: id
      }).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        // Just to simulate the time of the request
        this.checkedRow = null
        this.checked = false
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      }, () => {

      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  /* + 是兄弟选择器,获取选中后的label元素*/
 .el-menu-demo{
   margin-bottom: 20px;
 }

</style>
