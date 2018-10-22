<template>
  <el-main>
    <el-alert :title="message" :closable="false" type="warning" class="info" />
    <el-form ref="form" :model="form" label-width="90px" class="deviceForm" style="padding: 16px 0;">
      <el-row>
        <el-col :span="6">
          <el-form-item label="设备类型" prop="equipmentTypes">
            <el-select v-model="form.equipmentTypes" placeholder="请选择">
              <el-option
                v-for="item in equipmentTypesArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="在线状态" prop="isOnline">
            <el-select v-model="form.isOnline" placeholder="请选择">
              <el-option
                v-for="item in isOnline"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="设备编号">
            <el-input v-model="form.equipmentIds" type="textarea"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-button type="primary" @click="look">查看</el-button>
        <el-button type="primary" @click="transfer">勾选批量转移</el-button>
      </el-row>
    </el-form>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      :height="minHeightTable"
      border
      stripe
      fit
      highlight-current-row>
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column label="设备编号" align="center" prop="equipmentId">
        <template slot-scope="scope">
          <span>{{ scope.row.equipmentId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备类型" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.equipmentTypeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="区域" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.districtName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="在线状态" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.online ? '在线' : '离线' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="固件版本" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.firmwareVersion }}</span>
        </template>
      </el-table-column>
      <!--
      <el-table-column label="设备机台号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.groupNumber || '' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="代理商名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.agentUserName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="场地名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.groupName }}</span>
        </template>
      </el-table-column>-->
    </el-table>
    <el-pagination
      v-show="total>0"
      :current-page="listQuery.page"
      :page-sizes="[10,20,30, 50]"
      :page-size="listQuery.limit"
      :total="total"
      class="pagination-container"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  </el-main>
</template>

<script>
export default {
  name: 'DeviceTransfer',
  data() {
    return {
      total: 40,
      listQuery: {
        page: 1,
        limit: 20
      },
      tableKey: 0,
      listLoading: false,
      minHeightTable: 660,
      list: [],
      equipmentTypesArr: [
        {
          value: '娃娃机',
          label: '娃娃机'
        },
        {
          value: '按摩椅',
          label: '按摩椅'
        }
      ],
      isOnline: [
        {
          label: '全部',
          value: 0
        },
        {
          label: '在线',
          value: 1
        },
        {
          label: '离线',
          value: 2
        }
      ],
      message: '转移设备指的是由BD协助批量导入到代理商的、且未注册绑定的设备编号。通过勾选批量转移，可以将设备转移到某个商家下。被转移的设备被商家解绑后，还会显示到该列表。',
      form: {
        isOnline: '',
        equipmentTypes: '',
        equipmentIds: ''
      }
    }
  },
  created() {
    const clientHeight = document.body.clientHeight || document.documentElement.clientHeight
    this.minHeightTable = clientHeight - 388
  },
  methods: {
    handleCurrentChange() {},
    handleSizeChange() {},
    look() {
      console.log(99)
    },
    transfer() {
      console.log(11)
    }
  }
}
</script>

<style scoped>

</style>
