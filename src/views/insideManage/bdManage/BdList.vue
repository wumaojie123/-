<template>
  <div class="bd-container">
    <div class="filter-container">
      <div class="item">
        <span class="label">&nbsp;&nbsp;BD姓名&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <el-input v-model="listQuery.name" placeholder="请输入BD姓名" class="input-300" maxlength="11" />
      </div>
      <div class="item">
        <span class="label">手机号码</span>
        <el-input v-model="listQuery.phone" placeholder="请输入手机号码" class="input-300" maxlength="11" />
      </div>
      <br>
      <br>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ `查找` }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleEdit('edit')">{{ `编辑` }}</el-button>
      <!--<el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-delete" @click="handleEdit('delete')">{{ `删除` }}</el-button>-->
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleEdit('add')">{{ `新增BD` }}</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      height="550"
      highlight-current-row
      style="width: 100%;">
      <el-table-column :label="`操作`" align="center" width="65">
        <template slot-scope="scope">
          <el-radio :label="scope.row.adUserId" v-model="checked" class="radio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column :label="`序号`" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index+1 }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`BD姓名`" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username||'' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`手机号码`" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone || '' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`一级代理数量`" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.agentCounts||0 }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`创建日期`" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[25]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import insideManage from '@/api/insideManage'

export default {
  name: 'BdList',
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        name: '',
        phone: ''
      },
      BDList: [],
      checked: 0,
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
    this.getList()
  },
  methods: {
    getTemplateRow(index, row) {
      // 获取选中数据
      // this.checked = true
      this.checkedRow = row
    },
    getList() {
      this.listLoading = true
      insideManage.getBDList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
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
    handleEdit(type) {
      const checkIsNull = () => {
        if (!this.checkedRow) {
          this.$notify({
            title: '提示',
            message: '操作失败,请选中某一条数据进行操作',
            type: 'error',
            duration: 2000
          })
          return false
        } else {
          return true
        }
      }
      if (type === 'add') { // 新增代理商
        // this.$route.
        this.$router.push({ path: '/insideManage/bdRoleManage/addBD', query: { plan: 'private' }})
      } else {
        if (!checkIsNull()) {
          return false
        }
        if (type === 'edit') { // 编辑代理商
          this.$router.push({ path: '/insideManage/bdRoleManage/editBD' + '/' + this.checkedRow.adUserId, query: { id: this.checkedRow.adUserId, phone: this.checkedRow.phone }})
        }
      }
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
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
<style lang="scss" scoped>
  .bd-container{
    padding-right: 30px;
  }
  .radio{
    .el-radio__input{
      // border: 1px solid #000;
    }
  }
  .item{
    display: inline-block;
    margin: 5px 10px;
    .el-input{
      margin-bottom: 0;
    }
    .label{
      margin-right: 10px;
      vertical-align: middle;
      font-weight: 700;
    }
  }
</style>
