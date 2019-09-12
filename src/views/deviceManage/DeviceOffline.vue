<template>
  <el-main v-loading="loading_table" :style="!selRow?'min-width:1100px':''" class="agent-list-container">
    <div class="top-box">
      <div v-if="!selRow" class="sel-box">
        <div>设备编号：</div>
        <div
          class="el-input-number el-input-number--medium is-without-controls"
          style="width: 200px;"
        >
          <div class="el-input el-input--medium">
            <el-input v-model.trim="equipment_id" placeholder="设备编号"/>
          </div>
        </div>
      </div>
      <div class="sel-box">
        <div>时间：</div>
        <el-radio-group v-model="date_btn" size="mini" @change="radioChange">
          <el-radio-button label="0">昨日</el-radio-button>
          <el-radio-button label="1">最近7天</el-radio-button>
          <el-radio-button label="2">最近30天</el-radio-button>
        </el-radio-group>
      </div>
      <div class="sel-box">
        <el-date-picker
          v-model="date_sel"
          :clearable="false"
          :picker-options="pickerOptions"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="dateChange"
        />
      </div>
      <el-button v-if="!selRow" type="primary" @click="getList(true)">查询</el-button>
    </div>
    <div v-if="(!(!selRow&&((tableData&&tableData.length==0)||tableData==null)))&&equipment_detail" class="mid-box">
      <div>设备编号：{{ equipment_detail.equipmentTypeName }} {{ equipment_detail.equipmentId }}</div>
      <div v-if="tableData&&tableData.length>0">
        当前设备状态：
        <div v-if="!equipment_detail.online" class="mid-offline">离线{{ equipment_detail.days?` > ${equipment_detail.days}天`:'' }}</div>
        <div v-if="equipment_detail.online" class="mid-online">在线</div>
        <a class="mid-reload" @click="getEquipmentState(true)">刷新</a>
      </div>
      <div>
        <a v-if="!selRow" @click="postExport">导出数据</a>
      </div>
    </div>
    <el-table
      v-if="tableData&&tableData.length>0"
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column align="center" prop="date" label="日期"/>
      <el-table-column align="center" prop="count" label="离线次数"/>
      <el-table-column align="center" prop="timeMap" label="离线时间点">
        <template slot-scope="scope">
          <div class="table-timeMap">
            <div v-for="(item, index) in scope.row.times" :key="index" class="table-timeMap-item">
              {{ parseTimeMap(item) }}
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!selRow&&!tableData" class="table-noData">
      请输入设备编号查询设备离线、在线明细
    </div>
    <div v-show="tableData&&tableData.length===0" class="table-noData">
      可能设备未注册等原因，暂无在线、离线记录
    </div>
    <!-- <div class="table-noDataRow" v-show="tableData&&tableData.length===0">
      可能设备未注册等原因，暂无离线记录
    </!-->
    <div class="pagination-container">
      <el-pagination
        v-show="listQuery.total>0&&tableData&&tableData.length>0"
        :current-page="listQuery.pageIndex"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.pageSize"
        :total="listQuery.total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-main>
</template>

<script>
import { Message } from 'element-ui'
import { parseTime } from '@/utils/index'
import { getList, getState } from '@/api/equipmentState'
export default {
  name: 'DeviceOffline',
  props: {
    selRow: {
      type: Object,
      default: null
    },
    saveVisExport: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      date_btn: '2',
      date_sel: '',
      equipment_id: '',
      listQuery: { total: 99, pageSize: 10, pageIndex: 1 },
      tableData: null,
      loading_table: false,
      pickerOptions: {
        disabledDate(time) {
          const halfYear = 180 * 24 * 3600 * 1000
          const item_time = time.getTime()
          const now_time = Date.now()
          return item_time > now_time || item_time < (now_time - halfYear)
        }
      },
      equipment_detail: null,
      page_data: {},
      nowOption: null
    }
  },
  computed: {
    visExportBtn() {
      return this.tableData.length > 0
    }
  },
  watch: {
    tableData(val) {
      if (this.selRow) {
        this.saveVisExport(val && val.length > 0)
      }
    }
  },
  created() {
    if (this.selRow) {
      this.getList(true)
      // this.equipment_detail = {
      //   equipmentTypeName: this.selRow.equipmentTypeName,
      //   equipmentId: this.selRow.equipmentId
      // }
    }
  },
  methods: {
    parseTimeMap(value) {
      return parseTime(value)
    },
    postExport() {
      const param = 'value=' + this.nowOption.value + '&startDate=' + this.nowOption.startDate + '&endDate=' + this.nowOption.endDate
      console.log(param)
      location.href = encodeURI('/agent/equipment/error/export?' + param)
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    getEquipmentState(reload) {
      if (reload) {
        this.loading_table = true
      }
      getState({ value: this.nowOption.value }).then((res) => {
        if (res.result === 0) {
          this.equipment_detail = {
            equipmentTypeName: res.data.typeName,
            equipmentId: res.data.value,
            online: res.data.online,
            days: res.data.days
          }
        }
      }).finally(() => {
        if (reload) {
          this.loading_table = false
        }
      })
    },
    getList(reload) {
      const { date_sel, date_btn, parseDateBtn, listQuery, selRow, page_data } = this
      let { equipment_id } = this
      if (selRow) {
        equipment_id = selRow.equipmentId
      } else {
        this.equipment_detail = null
      }
      let date = []
      if (reload) {
        this.listQuery.pageIndex = 1
        if (date_sel !== '') {
          date[0] = parseTime(date_sel[0], '{y}-{m}-{d}')
          date[1] = parseTime(date_sel[1], '{y}-{m}-{d}')
          if (new Date(date_sel[1]).getTime() > Date.now()) {
            Message({
              message: '结束日期不能大于今天',
              type: 'error'
            })
            return
          }
        }
        if (date_btn !== '') {
          date = parseDateBtn()
        }
      } else {
        date = page_data.date
        equipment_id = page_data.equipment_id
      }
      if (equipment_id === '') {
        Message({
          message: '请填写设备编号',
          type: 'error'
        })
        this.tableData = null
        return
      }
      const jsonData = {
        value: equipment_id,
        startDate: date[0],
        endDate: date[1],
        pageSize: listQuery.pageSize,
        pageIndex: listQuery.pageIndex
      }
      this.loading_table = true
      this.page_data = {
        equipment_id,
        date
      }
      this.tableData = []
      this.nowOption = JSON.parse(JSON.stringify({
        value: equipment_id,
        startDate: date[0],
        endDate: date[1],
        pageSize: listQuery.pageSize,
        pageIndex: listQuery.pageIndex
      }))
      getList(jsonData).then((res) => {
        if (res.result === 0 && res.data) {
          if (res.data.date) {
            this.tableData = res.data.date
            this.getEquipmentState()
          }
          this.listQuery = { total: res.data.total, pageSize: res.data.pageSize, pageIndex: res.data.page }
        }
      }).finally(() => {
        this.loading_table = false
      })
    },
    parseDateBtn(val) {
      const { date_btn } = this
      let dateRange
      if (date_btn === '0') {
        dateRange = [parseTime(Date.now() - 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(Date.now() - 24 * 60 * 60 * 1000, '{y}-{m}-{d}')]
      } else if (date_btn === '1') {
        dateRange = [parseTime(Date.now() - 6 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(Date.now(), '{y}-{m}-{d}')]
      } else if (date_btn === '2') {
        dateRange = [parseTime(Date.now() - 29 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(Date.now(), '{y}-{m}-{d}')]
      }
      return dateRange
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val
      this.getList()
    },
    radioChange(time) {
      this.date_sel = ''
      if (this.selRow) {
        this.getList(true)
      }
    },
    dateChange(value) {
      this.date_btn = ''
      if (this.selRow) {
        this.getList(true)
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // if ([0,1].includes(columnIndex)) {
      //   if (row.first) {
      //     return {
      //       rowspan: 4,
      //       colspan: 1
      //     };
      //   } else {
      //     return {
      //       rowspan: 0,
      //       colspan: 0
      //     };
      //   }
      // }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
.agent-list-container{
  max-width: 1100px;
}
.top-box {
  display: flex;
}
.sel-box {
  margin-right: 20px;
  display: flex;
  align-items: center;
  vertical-align: middle;
  font-size: 14px;
}
.mid-box {
  margin-top: 40px;
  justify-content: space-between;
  text-align: left;
  font-size: 14px;
  color: #000000;
  font-weight: 700;
  display: flex;
  a {
    color: #1890ff;
    font-weight: normal;
  }
  .mid-reload {
    margin-left: 20px;
  }
  .mid-offline {
    display: inline-block;
    color: #ff3300;
  }
  .mid-online {
    display: inline-block;
    color: #008000;
  }
}
.table-noData{
    text-align: center;
    padding: 100px 0;
    color: #999999;
    font-size: 24px;
  }
  .table-noDataRow{
    margin-top: 40px;
    color: #666666;
  }
  .table-timeMap{
    max-height: 179px;
    overflow-y: auto;
    margin: -10px;
    .table-timeMap-item{
      border-bottom: 1px solid #ebeef5;
      line-height: 35px;
    }
    .table-timeMap-item:last-of-type{
      border-bottom: none;
    }
  }
  /*滚动条样式*/
    .table-timeMap::-webkit-scrollbar {/*滚动条整体样式*/
        width: 3px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 3px;
        border-radius: 3px;
    }
    .table-timeMap::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px #ebeef5;
        background: rgba(0,0,0,0.2);
    }
    .table-timeMap::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px #ebeef5;
        border-radius: 0;
        background:#ebeef5;
    }
</style>
