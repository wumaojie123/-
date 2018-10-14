<template>
  <div class="agent-list-container bd-manage">
    <div class="filter-container">
      <div class="item">
        <span class="label">合同编号 </span>
        <el-input :placeholder="`请输入合同编号`" v-model="listQuery.contractId" style="width: 300px;margin-right: 20px;" class="filter-item" @keyup.enter.native="handleFilter" />
      </div>
      <div class="item">
        <span class="label">代理商名称</span>
        <el-input :placeholder="`请输入代理商名称`" v-model="listQuery.agentUserName" style="width: 300px;margin-right: 20px;" class="filter-item" @keyup.enter.native="handleFilter" />
      </div>
      <br>
      <br>
      <div class="item">
        <span class="label">账号</span>
        <el-input :placeholder="`请输入账号`" v-model="listQuery.phone" style="width: 300px;margin-right: 20px;" class="filter-item" @keyup.enter.native="handleFilter" />
      </div>
      <div class="item">
        <span class="label">&nbsp;&nbsp;BD同事&nbsp;&nbsp;&nbsp;&nbsp; </span>
        <el-select v-model="listQuery.bdId" :placeholder="`请选择BD同事`" clearable style="width: 300px;margin-right: 20px;vertical-align: baseline;" class="filter-item">
          <el-option v-for="item in bdList" :key="item.adUserId" :label="item.username" :value="item.adUserId" />
        </el-select>
      </div>
      <br>
      <br>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ `查找` }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleEdit('edit')">{{ `编辑` }}</el-button>
      <!--<el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-delete" @click="handleEdit('delete')">{{ `删除` }}</el-button>-->
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-view" @click="handleEdit('showSubAgentList')">{{ `查看下级代理` }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleEdit('add')">{{ `新增代理商` }}</el-button>
    </div>
    <el-table v-loading="listLoading" :key="tableKey" :data="list" border stripe fit height="550" highlight-current-row style="width: 100%;">
      <el-table-column :label="`操作`" fixed align="center" width="65">
        <template slot-scope="scope">
          <el-radio :label="scope.row.agentUserId" v-model="checked" class="radio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column :label="`合同编号`" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.contractId || '' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`代理商名称`" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.agentUserName|| '' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`账号`" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userName || '' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`经营项目`" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bunissesNames || '未知' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`自营设备数量`" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ownEquipmentCount || 0 }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`下级代理数量`" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.subordinateCount|| 0 }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`代理设备数量`" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.equipmentCount|| 0 }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`BD同事`" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bdName||'' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`创建日期`" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[25]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import insideManage from '@/api/insideManage'
import waves from '@/directive/waves' // 水波纹指令
import {
  parseTime
} from '@/utils'
  // const calendarTypeOptions = [
  //   { key: 0, display_name: '冻结' },
  //   { key: 1, display_name: '激活' }
  // ]
  // arr to obj ,such as { CN : "China", US : "USA" }
  // const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  //   acc[cur.key] = cur.display_name
  //   return acc
  // }, {})
export default {
  name: 'AgentsList',
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
        contractId: '', // 合同号
        agentUserName: '', // 代理商名称
        phone: '', // 手机号
        bdId: '' // BD同事id
      },
      bdList: null,
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
        type: [{
          required: true,
          message: 'type is required',
          trigger: 'change'
        }],
        timestamp: [{
          type: 'date',
          required: true,
          message: 'timestamp is required',
          trigger: 'change'
        }],
        title: [{
          required: true,
          message: 'title is required',
          trigger: 'blur'
        }]
      },
      downloadLoading: false
    }
  },
  async created() {
    await this.getBDList()
    this.getList()
  },
  methods: {
    getTemplateRow(index, row) {
      // 获取选中数据
      // this.checked = true
      this.checkedRow = row
    },
    getBDList() {
      insideManage.getBDList().then(res => {
        this.bdList = res.data
      }, () => {
        this.bdList = []
      })
    },
    getList() {
      this.listLoading = true
      insideManage.getAgentList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        // Just to simulate the time of the request
        this.checkedRow = null
        this.checked = false
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      }, err => {
        this.list = []
        this.total = null
        this.checkedRow = null
        this.checked = false
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
        console.log(err, 'err')
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
        this.$router.push({
          name: 'createOneAgent',
          query: {
            plan: 'private'
          }
        })
      } else {
        if (!checkIsNull()) {
          return false
        }
        const agentUserId = this.checkedRow.agentUserId
        if (type === 'edit') { // 编辑代理商
          this.$router.push({
            name: 'oneAgentEdit',
            query: {
              id: agentUserId
            }
          })
        } else if (type === 'showSubAgentList') {
          this.$router.push({
            name: 'subAgent',
            query: {
              id: agentUserId
            }
          })
        } else if (type === 'delete') {
          this.getList()
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

<style rel="stylesheet/scss" lang="scss" scoped>
  /* + 是兄弟选择器,获取选中后的label元素*/
  .agent-list-container {
    padding-right: 30px;
  }
  .filter-container {
    .item {
      display: inline-block;
      margin: 5px 10px;
      .el-input {
        margin-bottom: 0;
      }
      .label {
        margin-right: 10px;
        vertical-align: middle;
        font-weight: 700;
      }
    }
  }
</style>
