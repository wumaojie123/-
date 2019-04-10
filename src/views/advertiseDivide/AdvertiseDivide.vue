<template>
  <div class="agent-list-container bd-manage">
    <div class="filter-container">
      <div class="item">
        <span class="label">代理商账号 </span>
        <el-input :placeholder="`请输入代理商账号`" v-model.number="agent" style="width: 200px;margin-right: 20px;" class="filter-item" />
      </div>
      <div class="item">
        <span class="label">是否广告分成 </span>
        <el-select v-model="isset" style="width: 100px;">
          <el-option v-for="item in isSetOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <br>
      <br>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ `查询` }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleEdit">{{ `设置` }}</el-button>
    </div>
    <el-table v-loading="listLoading" :key="tableKey" :data="list" border stripe fit highlight-current-row style="width: 100%;">
      <el-table-column :label="`操作`" fixed align="center" width="55">
        <template slot-scope="scope">
          <el-radio :label="scope.row.agentUserId" v-model="checked" class="radio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column :label="`代理商名称`" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.agentUserName || '' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`代理商账号`" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.agentUserLoginId|| '' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`是否广告分成`" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.isset == 1 ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`最少上线数目`" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.minEquipmentCount || 0 }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`广告分成比率`" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.adRate || 0 }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`总额`" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.total || 0 }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`余额`" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.balance || 0 }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination v-show="total > 0" :current-page="pageIndex" :page-sizes="[10, 20, 30, 40, 50]" :page-size="pageSize" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { agentList } from '@/api/advertiseDivide'
export default {
  name: 'AgentsList',
  data() {
    return {
      agent: '',
      isset: -1,
      isSetOptions: [{
        value: -1,
        label: '全部'
      }, {
        value: 1,
        label: '是'
      }, {
        value: 0,
        label: '否'
      }],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      pageIndex: 1,
      pageSize: 20,
      bdList: null,
      checked: false,
      checkedRow: null
    }
  },
  async created() {
    this.getList()
  },
  methods: {
    getTemplateRow(index, row) {
      this.checkedRow = row
    },
    getList() {
      this.listLoading = true
      this.checked = false
      const params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        agent: this.agent
      }
      if (this.isset !== -1) {
        params.isset = this.isset
      }
      agentList(params).then(res => {
        if (res.result === 0) {
          this.list = res.data.data.items
          this.total = res.data.data.total
          this.checkedRow = null
          this.checked = false
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        }
      })
    },
    handleFilter() {
      this.pageIndex = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.getList()
    },
    handleEdit() {
      if (!this.checkedRow) {
        this.$notify({
          title: '提示',
          message: '操作失败,请选中某一条数据进行操作',
          type: 'error',
          duration: 1500
        })
        return false
      }
      this.$router.push({
        name: 'editAdvertiseDivide',
        query: {
          row: JSON.stringify(this.checkedRow)
        }
      })
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
