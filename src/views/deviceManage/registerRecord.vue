<template>
  <div class="content-area">
    <el-table :data="list" border highlight-current-row style="width: 100%;margin-bottom: 20px;min-height: 600px;" >
      <el-table-column v-for="(item, index) in colums" :key="index" :prop="item.key" :label="item.label" :width="item.width" :sortable="item.sortable" align="center"/>
      <el-table-column label="操作" width="155" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleItem(scope.$index)">查看注册详情</el-button>
        </template>
      </el-table-column>
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

    <!-- 设备注册详情 -->
    <el-dialog :visible.sync="dialogFormVisible" title="设备注册详情" >
      <el-table :data="list2" border highlight-current-row style="width: 100%;margin-bottom: 20px;" height="450">
        <el-table-column v-for="(item, index) in colums2" :key="index" :prop="item.key" :label="item.label" :width="item.width" :sortable="item.sortable" align="center"/>
      </el-table>
      <el-pagination
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageInfo2.pageSize"
        :total="pageInfo2.total"
        :current-page="pageInfo2.currPage"
        background
        layout="total, prev, pager, next, sizes, jumper"
        @size-change="handleSizeChange2"
        @current-change="handleCurrentChange2"/>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button type="primary" @click="dialogFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 设备注册详情/ -->
  </div>

</template>

<script>
import { registeredLogList, registeredDetailList } from '@/api/device'
import { communicationMap, statusMap } from './constant'
export default {
  data() {
    return {
      list: [],
      colums: [
        { key: 'equipmentType', label: '设备类型' },
        { key: 'communicationText', label: '通信方式' },
        { key: 'equipmentCount', label: '注册设备总数(台)' },
        { key: 'registeredCount', label: '注册成功设备(台)' },
        { key: 'unregisteredCount', label: '注册失败设备(台)' },
        { key: 'distributor', label: '绑定商家' },
        { key: 'created', label: '操作时间' },
        { key: 'createdby', label: '操作人' }
      ],
      pageInfo: { total: 0, pageSize: 10, currPage: 1 },
      list2: [],
      colums2: [
        { key: 'equipmentType', label: '设备类型' },
        { key: 'value', label: '设备编号' },
        { key: 'status', label: '注册状态' },
        { key: 'reason', label: '原因' }
      ],
      pageInfo2: { total: 0, pageSize: 10, currPage: 1 },
      dialogFormVisible: false,
      selectItem: {}
    }
  },
  created() {
    this.queryList()
  },
  methods: {
    async queryList(page = 1) {
      this.list = []
      this.pageInfo.currPage = page
      const postData = { pageSize: this.pageInfo.pageSize, pageIndex: this.pageInfo.currPage }
      const res = await registeredLogList(postData)
      if (res.result === 0) {
        this.listLoading = false
        if (res.data) {
          let list = res.data.items || []
          list = list.map(item => {
            item.communicationText = communicationMap[item.communication]
            return item
          })
          this.list = list
          this.pageInfo.total = res.data.total || 0
        } else {
          this.pageInfo.total = 0
        }
      }
    },
    async queryDetailList(page = 1) {
      this.list2 = []
      this.pageInfo2.currPage = page
      const postData = { pageSize: this.pageInfo2.pageSize, pageIndex: this.pageInfo2.currPage, agentEquipmentRegisteredLogId: this.selectItem.agentEquipmentRegisteredLogId }
      const res = await registeredDetailList(postData)
      if (res.result === 0) {
        this.listLoading = false
        if (res.data) {
          let list = res.data.items || []
          list = list.map(item => {
            item.equipmentType = this.selectItem.equipmentType
            item.statusText = statusMap[item.status]
            return item
          })
          this.list2 = list
          this.pageInfo2.total = res.data.total || 0
        } else {
          this.pageInfo2.total = 0
        }
      }
    },
    handleItem(index) {
      this.selectItem = this.list[index]
      this.queryDetailList(1)
      this.dialogFormVisible = true
    },
    handleSizeChange(pageSize) {
      this.pageInfo.pageSize = pageSize
      this.pageInfo.total = 0
      this.queryList(1)
    },
    handleCurrentChange(page) {
      this.queryList(page)
    },
    handleSizeChange2(pageSize) {
      this.pageInfo2.pageSize = pageSize
      this.pageInfo2.total = 0
      this.queryDetailList(1)
    },
    handleCurrentChange2(page) {
      this.queryDetailList(page)
    }
  }
}
</script>
