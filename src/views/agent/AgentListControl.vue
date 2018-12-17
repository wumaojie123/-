<template>
  <div class="content-area">
    <el-form :inline="true" style="margin-bottom: 20px;" label-position="right">
      <el-form-item label="BD人员">
        <el-select v-model="queryParams.bdName" placeholder="请选择" clearable>
          <el-option v-for="item in DBlist" :key="item.value" :label="item.label" :value="item.label"/>
        </el-select>
      </el-form-item>
      <el-form-item label="设备类型">
        <el-select v-model="queryParams.equipmentTypeValue" placeholder="请选择" clearable>
          <el-option v-for="item in equipmentTypesArr" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryParams.userName" placeholder="请输入代理账号" class="input-300" maxlength="11" clearable />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="filterQueryList">查询</el-button>
    </el-form>
    <!-- 列表 -->
    <el-table v-loading="listLoading" :data="list" :height="400" border highlight-current-row style="width: 100%;margin-bottom: 20px;" >
      <el-table-column v-for="(item, index) in colums" :key="index" :prop="item.key" :label="item.label" :width="item.width" :sortable="item.sortable" align="center"/>
    </el-table>
    <el-pagination
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageInfo.pageSize"
      :total="pageInfo.total"
      :current-page="pageInfo.currPage"
      background
      layout="total, prev, pager, next, sizes, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  </div>
</template>

<script>
import insideManage from '@/api/insideManage'
import { getDeviceTypeBd } from '@/api/getEquiedType'
export default {
  data() {
    return {
      listLoading: true,
      queryParams: { userName: '', equipmentTypeValue: '', bdName: '' },
      list: [],
      equipmentTypesArr: [],
      DBlist: [],
      colums: [
        { key: 'contractId', label: '合同编号' },
        { key: 'agentUserName', label: '代理名称' },
        { key: 'userName', label: '账号' },
        { key: 'bunissesNames', label: '经营项目' },
        { key: 'equipmentCount', label: '设备类型' },
        { key: 'equipmentCount', label: '已导入设备总量' },
        { key: 'equipmentOnlineCount', label: '昨日在线设备量' },
        { key: 'subordinateCount', label: '下级代理数量' },
        { key: 'subordinateMerchantCount', label: '下级商家数量' },
        { key: 'bdName', label: 'BD人员' },
        { key: 'createDate', label: '创建日期' }
      ],
      pageInfo: { total: 0, pageSize: 10, currPage: 1 },
      angentInfo: []
    }
  },
  created() {
    this.queryEquipList()
    this.queryBDList()
    this.queryList()
  },
  methods: {
    queryBDList() {
      insideManage.getUserByRole().then(res => {
        if (res.result === 0 && res.data && res.data.length) {
          console.log(res.data.length)
          res.data.forEach(item => {
            this.DBlist.push({
              value: item.adUserId,
              label: item.username
            })
          })
        }
      })
    },
    queryEquipList() {
      getDeviceTypeBd().then(res => {
        if (res.result === 0 && res.data && res.data.length) {
          res.data.forEach(item => {
            this.equipmentTypesArr.push({
              value: item.code,
              label: item.name
            })
          })
        }
      })
    },
    queryList(page = 1) {
      this.angentInfo = []
      this.list = []
      this.pageInfo.currPage = page
      const postData = { pageSize: this.pageInfo.pageSize, pageIndex: this.pageInfo.currPage }
      postData.userName = this.queryParams.userName
      postData.equipmentTypeValue = this.queryParams.equipmentTypeValue
      postData.bdName = this.queryParams.bdName
      insideManage.queryFirstAgentsByControl(postData).then(res => {
        this.listLoading = false
        if (res.data) {
          this.list = res.data.items || []
          this.pageInfo.total = res.data.total || 0
        } else {
          this.pageInfo.total = 0
        }
      })
    },
    handleSizeChange(pageSize) {
      this.pageInfo.pageSize = pageSize
      this.pageInfo.total = 0
      this.queryList(1)
    },
    handleCurrentChange(page) {
      this.queryList(page)
    },
    filterQueryList() {
      this.pageInfo.total = 0
      this.queryList(this.pageInfo.currPage)
    }
  }
}
</script>
