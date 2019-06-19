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
      <el-select
        v-model="agentId"
        filterable
        placeholder="请选择"
        @change="merchantChange">
        <el-option
          v-for="item in agentMerchantList"
          :key="item.id"
          :label="item.name"
          :value="item.id" />
      </el-select>
    </div>

    <div v-if="layoutInfo.isShowArea" class="picker-panel" >
      区域：
      <el-cascader
        v-model="areaInfo"
        :options="areaList"
        :show-all-levels="false"
        :props="cascaderProps"
        placeholder="全部"
        filterable
        @change="districtChange"/>
    </div>

    <div v-if="layoutInfo.isShowEquipmentType" class="picker-panel">
      设备类型：
      <el-select v-model="lyyEquipmentTypeId" placeholder="请选择">
        <el-option
          v-for="item in equipmentTypeOptions"
          :key="item.lyyEquipmentTypeId"
          :label="item.equipmentTypeName"
          :value="item.lyyEquipmentTypeId" />
      </el-select>
    </div>

    <div class="picker-panel">
      <el-button type="primary" @click="emitPickerChange">搜索</el-button>
    </div>

    <slot />
  </div>
</template>

<script>
import {
  getTimeStamp,
  parseTime
} from '@/utils/index'

import { getEquipmentType } from '@/api/dataAnalysis'
import { mapGetters } from 'vuex'

export default {
  name: 'AnalysisPicker',
  props: {
    layout: {
      type: String,
      default: 'date, merchant, equipmentType, area'
    }
  },
  data() {
    return {
      cascaderProps: {
        value: 'value',
        label: 'text'
      },
      agentId: -1,
      agent: true,
      selectDates: [],
      district: '',
      areaInfo: ['', '', ''],
      lyyEquipmentTypeId: -1,
      equipmentTypeOptions: [],
      layoutInfo: {
        isShowDate: false,
        isShowMerchant: false,
        isShowArea: false,
        isShowEquipmentType: false
      },
      curQuicklySelect: -30,
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
    ...mapGetters(['areaList', 'agentMerchantList'])
  },
  created() {
    this.initLayout()
    this.initSelectorData()
  },
  mounted() {
    this.emitPickerChange()
  },
  methods: {
    // 初始化组件结构
    initLayout() {
      let layoutArray = this.layout.split(',')

      layoutArray = layoutArray.map(item => {
        return item.replace(/(^\s*)|(\s*$)/g, '')
      })

      if (layoutArray.indexOf('date') > -1) {
        this.toggleQuicklySelect(-30)
        this.layoutInfo.isShowDate = true
      }
      if (layoutArray.indexOf('merchant') > -1) {
        this.layoutInfo.isShowMerchant = true
      }
      if (layoutArray.indexOf('equipmentType') > -1) {
        this.layoutInfo.isShowEquipmentType = true
      }
      if (layoutArray.indexOf('area') > -1) {
        this.layoutInfo.isShowArea = true
      }
    },
    initSelectorData() {
      if (this.layoutInfo.isShowEquipmentType) {
        const sendData = {
          agentUser: -1,
          agent: true
        }
        this.getEquipmentType(sendData)
      }
      if (this.layoutInfo.isShowArea) {
        this.$store.dispatch('GetAreaList')
      }
      if (this.layoutInfo.isShowMerchant) {
        this.$store.dispatch('GetAgentAndMerchant')
      }
    },
    getEquipmentType(sendData) {
      getEquipmentType(sendData).then(res => {
        if (res.result === 0) {
          this.equipmentTypeOptions = [{
            lyyEquipmentTypeId: -1,
            equipmentTypeName: '全部'
          }]
          this.equipmentTypeOptions = this.equipmentTypeOptions.concat(res.data)
        }
      })
    },
    toggleQuicklySelect(quicklyValue) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
      start.setTime(end.getTime() + 3600 * 1000 * 24 * quicklyValue)
      this.curQuicklySelect = quicklyValue
      this.selectDates = [parseTime(start, '{y}-{m}-{d}'), parseTime(end, '{y}-{m}-{d}')]
    },
    merchantChange(val) {
      this.agentMerchantList.forEach(item => {
        if (val === item.id) {
          this.agent = item.agent
        }
      })
      const sendData = {
        agentUser: val,
        agent: this.agent
      }
      this.getEquipmentType(sendData)
    },
    districtChange(val) {
      this.district = val[2]
    },
    emitPickerChange() {
      const params = {}

      if (this.layoutInfo.isShowDate) {
        params.startDate = this.selectDates[0]
        params.endDate = this.selectDates[1]
      }
      if (this.layoutInfo.isShowMerchant) {
        params.agent = this.agent
        params.agentId = this.agentId
      }
      if (this.layoutInfo.isShowEquipmentType) {
        params.lyyEquipmentTypeId = this.lyyEquipmentTypeId
      }
      if (this.layoutInfo.isShowArea) {
        params.district = this.district
        params.districtLevel = this.district === '' ? 1 : 3
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
