<template>
  <div class="content-area">
    <!-- 列表 -->
    <el-button class="creat-btn" type="primary" icon="el-icon-edit" @click="()=>handleEdit('add')">添加服务套餐</el-button>
    <el-table v-loading="listLoading" :data="list" :height="550" border highlight-current-row style="width: 100%;margin-bottom: 20px;" >
      <el-table-column v-for="(item, index) in colums" :key="index" :prop="item.key" :label="item.label" :width="item.width" :sortable="item.sortable" align="center">
        <template slot-scope="scope">
          {{ item.render?item.render(scope.row[item.key]):scope.row[item.key] }}
        </template>
      </el-table-column>
      <el-table-column width="150px" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="()=>handleEdit('edit',scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="()=>handleDelete(scope.row)">删除</el-button>
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
    <edit-dialog :query-list="queryList" :visible="vis_edit" :handle-close="handleClose" :action-row="actionRow" :action-type="actionType" />
  </div>
</template>

<script>
const deviceTypeMap = {
  XYJ: '洗衣机', CDZ: '充电桩', AMY: '按摩椅', ZLJ: '足疗机', AMD: '按摩垫'
}
const communicationMap = ['无', '脉冲', '串口']
const billingMap = ['无', '按时长计费']
import { fetchList, putService } from '@/api/sellManage'
import { parseTime } from '@/utils/index'
import { Message } from 'element-ui'
import editDialog from './serviceSellDialog'
export default {
  components: { editDialog },
  data() {
    return {
      listLoading: true,
      list: [],
      colums: [
        { key: 'equipmentType', label: '设备类型', render: (text) => deviceTypeMap[text] },
        { key: 'communication', label: '通信方式', render: (text) => communicationMap[text] },
        { key: 'billing', label: '计费方式', render: (text) => billingMap[text] },
        { key: 'description', label: '套餐名称' },
        { key: 'price', label: '价格', render: (text) => text + '元' },
        { key: 'serviceTime', label: '时长', render: (text) => text + '分钟' },
        { key: 'coins', label: '模拟投币数', render: (text) => text ? text + '币' : '-' },
        { key: 'updated', label: '最新编辑时间', render: (text) => parseTime(text) }
      ],
      pageInfo: { total: 0, pageSize: 10, currPage: 1 },
      actionType: '',
      actionRow: null,
      vis_edit: false
    }
  },
  created() {
    this.queryList()
  },
  methods: {
    handleDelete(row) {
      const self = this
      self.$confirm('确定要删除该服务套餐吗？', '删除服务套餐', {
        confirmButtonText: '保存',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        self.listLoading = true
        putService({
          agentGroupServiceId: row.agentGroupServiceId,
          deleted: 1
        }).then(res => {
          if (res.result === 0) {
            Message({
              message: '删除成功！',
              type: 'success'
            })
            self.queryList()
          }
        }).finally(() => { self.listLoading = false })
      }).catch(() => {
      })
    },
    handleEdit(actionType, actionRow) {
      this.actionType = actionType
      this.actionRow = actionRow
      this.vis_edit = true
    },
    handleClose() {
      this.vis_edit = false
    },
    queryList(page = 1) {
      this.listLoading = true
      this.pageInfo.currPage = page
      const postData = { pageSize: this.pageInfo.pageSize, pageIndex: page }
      fetchList(postData).then(res => {
        if (res.data) {
          this.list = res.data.items || []
          this.pageInfo.total = res.data.total || 0
        } else {
          this.pageInfo.total = 0
        }
      }).finally(() => { this.listLoading = false })
    },
    // 翻页
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
<style rel="stylesheet/scss" lang="scss" scoped>
.creat-btn{
  float:right;
  margin-bottom:20px;
}
</style>
