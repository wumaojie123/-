<template>
  <div class="bd-container">
    <div class="filter-container">
      <el-input :placeholder="`合同编号`" v-model="listQuery.title" style="width: 250px;margin-right: 20px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="`代理商名称`" v-model="listQuery.title" style="width: 250px;margin-right: 20px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="`商家手机`" v-model="listQuery.title" style="width: 250px;margin-right: 20px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <br>
      <br>
      <el-input :placeholder="`商家名称`" v-model="listQuery.title" style="width: 250px;margin-right: 20px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.importance" :placeholder="`BD同事`" clearable style="width: 250px;margin-right: 20px;" class="filter-item">
        <el-option v-for="item in BDList" :key="item" :label="item" :value="item"/>
      </el-select>
      <el-select v-model="listQuery.type" :placeholder="`账号状态`" clearable class="filter-item" style="width: 200px;margin-right: 20px;">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" style="text-align: left"/>
      </el-select>
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
      <el-table-column :label="`操作`" fixed align="center" width="65">
        <template scope="scope">
          <el-radio :label="scope.row.id" v-model="checked" class="radio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column :label="`序号`" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`BD姓名`" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ `广州三疯实业广州三疯实业广州三疯实业广州三疯实业` }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`手机号码`" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ 13177006613 }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`一级代理数量`" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`账号状态`" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ `激活` }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`创建日期`" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { fetchList, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'

const calendarTypeOptions = [
  { key: 0, display_name: '冻结' },
  { key: 1, display_name: '激活' }
]

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'BdList',
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
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
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
      calendarTypeOptions,
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
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
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
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
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
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleEdit(type) {
      const checkIsNull = () => {
        if (!this.checkedRow) {
          this.$notify({
            title: '提示',
            message: '操作失败,请选中某一条数据',
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
        this.$router.push({ path: '/insideManage/bdRoleManage/add', query: { plan: 'private' }})
      } else {
        if (!checkIsNull()) {
          return false
        }
        if (type === 'edit') { // 编辑代理商
          this.$router.push({ path: '/insideManage/bdRoleManage/edit' + '/' + this.checkedRow.id, query: { id: this.checkedRow.id }})
        }
      }
    },
    handleDelete(row) {
      // todo 删除
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
  .radio{
    .el-radio__input{
      // border: 1px solid #000;
    }
  }
  th.gutter{
    display: none !important;
  }
</style>
