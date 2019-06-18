<template lang="html">
  <div class="analysis-picker">

    <div v-if="layoutInfo.isShowDate" class="picker-panel">
      时间：
      <ul class="quickly-select-list">
        <li
          v-for="item in quicklySelectOptions"
          :class="{'cur': item.value === curQuicklySelect}"
          :key="item.value"
          @click="toggleQuicklySelect(item.value)">
          {{ item.label }}
        </li>
      </ul>

      <el-date-picker
        v-model="selectDates"
        :picker-options="pickerOptions"
        class="picker-date-item"
        type="daterange"
        align="center"
        value-format="yyyy-MM-dd"
        unlink-panels
        range-separator="至"
        prefix-icon="el-icon-time"
        start-placeholder="开始时间"
        end-placeholder="结束时间" />
    </div>

    <div v-if="layoutInfo.isShowMerchant" class="picker-panel" >
      代理/商家：
      <el-select v-model="merchantName" filterable placeholder="请选择">
        <el-option
          v-for="item in merchantOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
      </el-select>
    </div>

    <div v-if="layoutInfo.isShowEquipmentType" class="picker-panel">
      设备类型：
      <el-select v-model="equipmentType" placeholder="请选择">
        <el-option
          v-for="item in dataAnalysisEquipmentType"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
      </el-select>
    </div>

    <div class="picker-panel">
      <el-button type="primary" @click="search">搜索</el-button>
    </div>

    <slot />
  </div>
</template>

<script>
import {
  getTimeStamp,
  parseTime
} from '@/utils/index'

import { mapGetters } from 'vuex'

export default {
  name: 'AnalysisPicker',
  props: {
    layout: {
      type: String,
      default: 'date, merchant, equipmentType'
    }
  },
  data() {
    return {
      merchantName: '',
      merchantOptions: [],
      selectDates: [],
      equipmentType: '',
      layoutInfo: {
        isShowDate: false,
        isShowMerchant: false,
        isShowEquipmentType: false,
        isShowExport: false
      },
      curQuicklySelect: -1,
      quicklySelectOptions: [
        {
          value: -1,
          label: '昨天'
        },
        {
          value: -7,
          label: '最近7天'
        },
        {
          value: -30,
          label: '最近30天'
        }
      ],
      pickerOptions: {
        disabledDate: function(val) {
          const today = new Date(new Date().toDateString())
          if (getTimeStamp(val) > getTimeStamp(today) - 3600 * 24) {
            return true
          } else {
            return false
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters(['dataAnalysisEquipmentType'])
  },
  mounted() {
    this.initLayout()
    this.initSelectorData()
  },
  methods: {
    // 初始化组件结构
    initLayout() {
      let layoutArray = this.layout.split(',')

      layoutArray = layoutArray.map(item => {
        return item.replace(/(^\s*)|(\s*$)/g, '')
      })

      if (layoutArray.indexOf('date') > -1) {
        this.toggleQuicklySelect(-1)
        this.layoutInfo.isShowDate = true
      }
      if (layoutArray.indexOf('merchant') > -1) {
        this.layoutInfo.isShowMerchant = true
      }
      if (layoutArray.indexOf('equipmentType') > -1) {
        this.layoutInfo.isShowEquipmentType = true
      }
    },
    initSelectorData() {
      if (this.layoutInfo.isShowEquipmentType) {
        this.$store.dispatch('GetEquipmentType')
      }
    },
    toggleQuicklySelect(quicklyValue) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
      start.setTime(end.getTime() + 3600 * 1000 * 24 * quicklyValue)
      this.curQuicklySelect = quicklyValue
      this.selectDates = [parseTime(start, '{y}-{m}-{d}'), parseTime(end, '{y}-{m}-{d}')]
    },
    search() {
      this.emitPickerChange()
    },
    emitPickerChange() {
      const params = {}

      if (this.layoutInfo.isShowDate) {
        params.startDate = this.selectDates[0]
        params.endDate = this.selectDates[1]
      }
      if (this.layoutInfo.isShowMerchant) {
        params.merchantName = this.merchantName
      }
      if (this.layoutInfo.isShowEquipmentType) {
        params.equipmentType = this.equipmentType
      }

      this.$emit('change', params)
    }
  }
}
</script>

<style lang="scss" scoped>
.analysis-picker {
  padding: 20px;

  .picker-panel {
    margin-right: 25px;
    display: inline-block;

    .quickly-select-list {
      display: inline-flex;
      align-items: center;
      width: 240px;
      height: 30px;
      margin-right: 10px;
      line-height: 30px;
      border: 1px solid #e5e5e5;
      border-radius: 3px;

      >li {
        flex: 1;
        text-align: center;
        cursor: pointer;
        border-right: 1px solid #e5e5e5;

        &.cur {
          background-color: #66b1ff;
          color: #fff;
        }
      }

      >li:nth-child(3) {
        border-right: none;
      }
    }
  }

  .picker-item {
    width: 160px;
    margin-bottom: 10px;
  }

  .picker-date-item {
    width: 380px;
    margin-right: 20px;
    margin-bottom: 10px;
  }
}
</style>
