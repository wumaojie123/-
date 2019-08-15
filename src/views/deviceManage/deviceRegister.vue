<template>
  <div class="content-area">
    <el-form :inline="true" style="margin-bottom: 20px;" label-width="90px" label-position="right">
      <el-form-item>
        <el-input v-model="queryParams.userName" placeholder="请输入代理账号" class="input-300" maxlength="11" clearable />
        <el-button type="primary" icon="el-icon-search" @click="filerQueryList">查询</el-button>
        <el-button type="primary" icon="el-icon-search" @click="handlePage('1')">设备参数设置</el-button>
        <el-button type="primary" icon="el-icon-search" @click="handlePage('2')">设备服务套餐</el-button>
        <el-button type="primary" icon="el-icon-search" @click="handlePage('3')">解绑设备</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table :data="list" border highlight-current-row style="width: 100%;margin-bottom: 20px;" >
      <el-table-column label="操作" width="55" align="center">
        <template slot-scope="scope">
          <el-radio :label="scope.$index" v-model="check" @change.native="getTemplateRow(scope.$index)">&nbsp;</el-radio>
        </template>
      </el-table-column>
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
import { deviceMap, deviceMapInfo } from './constant'

export default {
  data() {
    return {
      queryParams: { equipmentType: 'CDZ', equipmentValue: '', registered: 1 },
      list: [],
      deviceMapInfo: deviceMap,
      colums: [
        { key: 'value', label: '设备编号' },
        { key: 'equipmentTypeText', label: '设备类型' },
        { key: 'subordinateCount', label: '通信方式' },
        { key: 'equipmentParam', label: '设备参数' },
        { key: 'groupNumber', label: '机台号' },
        { key: 'signal', label: '信号' },
        { key: 'onlineText', label: '在线状态' },
        { key: 'statusText', label: '禁用状态' },
        { key: 'account', label: '账号' },
        { key: 'distributor', label: '商家名称' },
        { key: 'area', label: '区域' },
        { key: 'registerDate', label: '注册时间' }
      ],
      pageInfo: { total: 0, pageSize: 10, currPage: 1 },
      selectItems: []
    }
  },
  created() {
    this.queryList()
  },
  methods: {
    queryList(page = 1) {
      this.selectItems = []
      this.list = []
      this.pageInfo.currPage = page
      const postData = { pageSize: this.pageInfo.pageSize, pageIndex: this.pageInfo.currPage }
      for (const key in this.queryParams) {
        postData[key] = this.queryParams[key]
      }
      registeredList(postData).then(res => {
        this.listLoading = false
        if (res.data) {
          let list = res.data.items || []
          list = list.map(item => {
            item.sourceText = item.source === 1 ? '商家解绑' : (item.source === 0 ? '平台导入' : '')
            const communicationMap = { 0: '无', 1: '脉冲', 2: '串口' }
            item.communicationText = communicationMap[item.communication]
            const equipmentTypeMap = deviceMapInfo
            item.equipmentTypeText = equipmentTypeMap[item.equipmentType]
            const onlineMap = { 0: '不在线', 1: '在线' }
            item.onlineText = onlineMap[item.online]
            const statusMap = { disabled: '禁用', Normal: '启用' }
            item.statusText = statusMap[item.status]
            return item
          })
          this.list = list
          this.pageInfo.total = res.data.total || 0
        } else {
          this.pageInfo.total = 0
        }
      })
    },
    getTemplateRow(value) {
      this.check = value
      this.selectItems = [this.list[value]]
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
    handlePage(type) {
      if (this.selectItems.length === 1) {
        console.log('info')
      } else if (this.selectItems.length > 1) {
        this.$message({ message: '只能编辑一条代理商信息', type: 'error' })
      } else {
        this.$message({ message: '只能选择一台设备设置服务套餐', type: 'error' })
      }
    }
  }
}
</script>
