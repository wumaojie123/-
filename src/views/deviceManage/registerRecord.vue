<template>
  <div class="content-area">
    <el-table :data="list" border highlight-current-row style="width: 100%;margin-bottom: 20px;" >
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

    <!--  -->
    <el-dialog :visible.sync="dialogFormVisible" title="设备注册详情">
      <el-table :data="list2" border highlight-current-row style="width: 100%;margin-bottom: 20px;" >
        <el-table-column v-for="(item, index) in colums2" :key="index" :prop="item.key" :label="item.label" :width="item.width" :sortable="item.sortable" align="center"/>
      </el-table>
      <el-pagination
        :page-sizes="[20, 30, 40]"
        :page-size="pageInfo.pageSize"
        :total="pageInfo.total"
        :current-page="pageInfo.currPage"
        background
        layout="total, prev, pager, next, sizes, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { getSecList } from '@/api/angentManage'
export default {
  data() {
    return {
      list: [],
      colums: [
        { key: 'agentUserName', label: '设备类型' },
        { key: 'userName', label: '通信方式' },
        { key: 'subordinateCount', label: '注册设备总数(台)' },
        { key: 'subordinateCount', label: '注册成功设备(台)' },
        { key: 'subordinateCount', label: '注册失败设备(台)' },
        { key: 'subordinateCount', label: '绑定商家' },
        { key: 'subordinateCount', label: '操作时间' },
        { key: 'subordinateCount', label: '操作人' }
      ],
      pageInfo: { total: 0, pageSize: 10, currPage: 1 },
      list2: [],
      colums2: [
        { key: 'agentUserName', label: '设备类型' },
        { key: 'userName', label: '设备编号' },
        { key: 'subordinateCount', label: '注册状态' },
        { key: 'subordinateCount', label: '原因' }
      ],
      pageInfo2: { total: 0, pageSize: 10, currPage: 1 },
      angentInfo: [],
      dialogFormVisible: false
    }
  },
  created() {
    this.queryList()
  },
  methods: {
    queryList(page = 1) {
      this.angentInfo = []
      this.list = []
      this.pageInfo.currPage = page
      const postData = { pageSize: this.pageInfo.pageSize, pageIndex: this.pageInfo.currPage }
      getSecList(postData).then(res => {
        this.listLoading = false
        if (res.data) {
          this.list = res.data.items || []
          this.pageInfo.total = res.data.total || 0
        } else {
          this.pageInfo.total = 0
        }
      })
    },
    handleItem(item) {
      console.log(item)
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
    }
  }
}
</script>
