<template>
  <div class="content-area">
    <!-- 列表 -->
    <el-table :data="list" border highlight-current-row style="width: 100%;margin-bottom: 20px;">
      <el-table-column
        v-for="(item, index) in colums"
        :key="index"
        :prop="item.key"
        :label="item.label"
        :width="item.width"
        :sortable="item.sortable"
        align="center"
      />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="unbind(scope.row)">公众号解绑</el-button>
          <el-button type="text" @click="resetValidDate(scope.row)">重置授权有效期</el-button>
          <el-button type="text" @click="handleNewAuth(scope.row)">重新授权</el-button>
          <el-button type="text" @click="handleConfig(scope.row)">公众号功能配置</el-button>
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
      @current-change="handleCurrentChange"
    />
    <el-dialog :visible.sync="dialogVisible" title="重置授权有效期" center>
      <re-authorize :day="vilidDay" />
    </el-dialog>
  </div>
</template>

<script>
import { getAllResult } from '@/api/officialAccount'
import reAuthorize from './component/reAuthorize'

export default {
  components: { reAuthorize },
  data() {
    return {
      list: [],
      colums: [
        { key: 'officialAccountName', label: '公众号名称' },
        { key: 'equipmentTypeValue', label: '绑定设备类型' },
        // modify by lss 20190910
        { key: 'day', label: '公众号授权剩余有效期（天）' }
      ],
      pageInfo: { total: 0, pageSize: 10, currPage: 1 },
      selectList: [],
      // modify by lss 20190910 start
      dialogVisible: true,
      vilidDay: '' // -1 不显示 0 过期  >0 未过期
      // end
    }
  },
  created() {
    this.queryList()
  },
  methods: {
    /**
     * modify by lss 20190910
     * 解绑
     */
    unbind(item) {
      var title = `公众号${
        item.officialAccountName
      }确认解绑吗？<p style="color:red;font-size:0.24rem">解绑后沉淀粉丝、服务消息通知、配置菜单等功能将失效</p>`
      this.$messagebox
        .confirm(title, '公众号解绑')
        .then(action => {})
        .catch(() => {})
    },
    /**
     * 重置有效期
     */
    resetValidDate(item) {},
    async queryList(page = 1) {
      this.list = []
      this.pageInfo.currPage = page
      const postData = {
        pageSize: this.pageInfo.pageSize,
        pageIndex: this.pageInfo.currPage
      }
      const res = await getAllResult(postData)
      if (res.result === 0) {
        this.listLoading = false
        if (res.data) {
          const list = res.data.items || []
          this.list = list
          this.pageInfo.total = res.data.total || 0
        } else {
          this.pageInfo.total = 0
        }
      }
    },
    handleNewAuth(item) {
      window.location.href = `/agent/rest/officialAccounts/againAuthUrl?eType=${
        item.equipmentType
      }`
    },
    handleConfig(item) {
      this.$router.push({
        path: '/EditOfficialAccount',
        query: { appId: item.appId, eType: item.equipmentType }
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
    filerQueryList() {
      this.pageInfo.total = 0
      this.queryList(this.pageInfo.currPage)
    }
  }
}
</script>
