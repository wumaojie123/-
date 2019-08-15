<template>
  <div class="content-area">
    <el-form :inline="true" style="margin-bottom: 20px;" label-width="90px" label-position="right">
      <el-form-item label="设备类型">
        <el-select v-model="queryParams.equipmentType" placeholder="请选择">
          <el-option v-for="item in equipmentTypesArr" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="设备编号">
        <el-input v-model="queryParams.equipmentValue" placeholder="输入多台设备时用,隔开" class="input-300" maxlength="100" clearable />
        <el-button type="primary" icon="el-icon-search" @click="filerQueryList">查询</el-button>
        <el-button type="primary" style="margin-left: 20px;" icon="el-icon-plus" @click="handleRegister">设备注册</el-button>
        <router-link :to="{path: '/registerRecord'}"><el-button type="primary" style="margin-left: 20px;">设备注册记录</el-button></router-link>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table :data="list" border highlight-current-row style="width: 100%;margin-bottom: 20px;" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
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
import { registeredList } from '@/api/device'
import { deviceMap, deviceMapInfo, communicationMap } from './constant'

export default {
  data() {
    return {
      queryParams: { equipmentType: 'CDZ', equipmentValue: '', registered: 0 },
      equipmentTypesArr: deviceMap,
      list: [],
      colums: [
        { key: 'equipmentTypeText', label: '设备类型' },
        { key: 'value', label: '设备编号' },
        { key: 'communicationText', label: '通信方式' },
        { key: 'sourceText', label: '设备来源' },
        { key: 'updated', label: '操作时间' }
      ],
      pageInfo: { total: 0, pageSize: 10, currPage: 1 },
      selectList: []
    }
  },
  created() {
    this.queryList()
  },
  methods: {
    async queryList(page = 1) {
      this.selectList = []
      this.list = []
      this.pageInfo.currPage = page
      const postData = { pageSize: this.pageInfo.pageSize, pageIndex: this.pageInfo.currPage }
      for (const key in this.queryParams) {
        postData[key] = this.queryParams[key]
      }
      const res = await registeredList(postData)
      if (res.result === 0) {
        this.listLoading = false
        if (res.data) {
          let list = res.data.items || []
          list = list.map(item => {
            item.sourceText = item.source === 1 ? '商家解绑' : (item.source === 0 ? '平台导入' : '')
            item.communicationText = communicationMap[item.communication]
            const equipmentTypeMap = deviceMapInfo
            item.equipmentTypeText = equipmentTypeMap[item.equipmentType]
            return item
          })
          this.list = list
          this.pageInfo.total = res.data.total || 0
        } else {
          this.pageInfo.total = 0
        }
      }
    },
    handleSelectionChange(value) {
      this.selectList = value
    },
    getTemplateRow(value) {
      this.check = value
      this.selectList = [this.list[value]]
    },
    handleAngent(type) {
      if (this.selectList.length === 1) {
        console.log('kkk')
      } else if (this.selectList.length > 1) {
        this.$message({ message: '只能编辑一条代理商信息', type: 'error' })
      } else {
        this.$message({ message: '请选中一条代理商信息！！', type: 'error' })
      }
    },
    handleSizeChange(pageSize) {
      this.pageInfo.pageSize = pageSize
      this.pageInfo.total = 0
      this.queryList(1)
    },
    handleCurrentChange(page) {
      this.queryList(page)
    },
    filerQueryList() {
      this.pageInfo.total = 0
      this.queryList(this.pageInfo.currPage)
    },
    // 设备注册
    handleRegister() {
      if (this.selectList.length === 0) {
        this.$message({ message: '请选择要注册的设备', type: 'error' })
        return
      }
      const equipmentArr = []
      const equipmentType = []
      this.selectList.forEach(item => {
        equipmentArr.push(item.value)
        equipmentType.push(item.communication)
      })
      const flag = equipmentType.some(item => item !== equipmentType[0])
      if (flag) {
        this.$message({ message: '请选择要注册的设备', type: 'error' })
        return
      } else {
        this.$router.push({ path: '/register', query: { deviceType: this.queryParams.equipmentType, equipmentArr: equipmentArr, communication: equipmentType[0] }})
      }
    }
  }
}
</script>
