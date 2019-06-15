<template lang="html">
  <div class="analysis-picker">
    <h3>{{ label }}</h3>
    <el-select v-model="curQuicklySelect" class="picker-item" placeholder="请选择" @change="quicklySelectChange">
      <el-option
        v-for="item in quicklySelectOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>

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
      end-placeholder="结束时间"
      @change="dateChange"/>

    <el-select v-if="noGroup !== ''" v-model="curGroupType" class="picker-item" placeholder="请选择" @change="groupTypeChange">
      <el-option
        v-for="item in groupTypeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>

    <el-select v-if="noGroup !=='' && curGroupType === 1" v-model="curGroup" class="picker-item" placeholder="请选择" @change="groupChange">
      <el-option
        v-for="item in placeOptions"
        :key="item.group_id"
        :label="item.group_name"
        :value="item.group_id"/>
    </el-select>

    <el-select v-if="noGroup !=='' && curGroupType !== 1" v-model="curGroup" class="picker-item" placeholder="请选择" @change="groupChange">
      <el-option
        v-for="item in groupOptions"
        :key="item.group_id"
        :label="item.group_name"
        :value="item.group_id"/>
    </el-select>
  </div>
</template>

<script>
import {
  getTimeStamp,
  parseTime
} from '@/utils/index'
import {
  mapGetters
} from 'vuex'

export default {
  name: 'AnalysisPicker',
  props: {
    label: {
      type: String,
      default: ''
    },
    noGroup: {
      type: [String, Boolean],
      default: ''
    }
  },
  data() {
    return {
      selectDates: [],
      curQuicklySelect: 'yesterday',
      curGroupType: 1,
      curGroup: -1,
      quicklySelectOptions: [
        {
          value: 'yesterday',
          label: '昨天'
        },
        {
          value: 'week',
          label: '本周'
        },
        {
          value: 'month',
          label: '本月'
        },
        {
          value: 'selfDefine',
          label: '自定义'
        }
      ],
      groupTypeOptions: [
        {
          value: 1,
          label: '按场地'
        },
        {
          value: 0,
          label: '按分组'
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
    ...mapGetters(['groupList', 'placeList']),
    placeOptions() {
      const initOptions = [{
        group_id: -1,
        group_name: '全部'
      }].concat(this.placeList)
      return initOptions
    },
    groupOptions() {
      const initOptions = [{
        group_id: -1,
        group_name: '全部'
      }].concat(this.groupList)
      return initOptions
    }
  },
  created() {
    this.$store.dispatch('GetPlaceList')
    this.$store.dispatch('GetGroupList')
    this.initQuicklySelect()
    this.quicklySelectChange('yesterday')
  },
  methods: {
    // 周一和每月一号自动将本周和本月替换为上周和上月
    initQuicklySelect() {
      const monthDay = new Date().getDate()
      const weekDay = new Date().getDay()

      if (monthDay === 1) {
        const monthIndex = this.quicklySelectOptions.findIndex(item => item.value === 'month')
        this.quicklySelectOptions.splice(monthIndex, 1, {
          value: 'lastMonth',
          label: '上月'
        })
      }
      if (weekDay === 1) {
        const weekIndex = this.quicklySelectOptions.findIndex(item => item.value === 'week')
        this.quicklySelectOptions.splice(weekIndex, 1, {
          value: 'lastWeek',
          label: '上周'
        })
      }
    },
    quicklySelectChange(quicklyValue) {
      const today = new Date(new Date().toDateString())
      const monthDay = new Date().getDate()
      let start = new Date()
      let end = new Date()
      let year = new Date().getFullYear()
      let month = new Date().getMonth() + 1
      let weekDay = new Date().getDay()
      let startDate, day
      const lastMonth1st = this.getPreMonth(parseTime(getTimeStamp(today), '{y}-{m}-{d}'))
      const isLeapYear = this.isLeapYear(year)

      switch (quicklyValue) {
        case 'yesterday':
          start = start.setTime(today.getTime() - 3600 * 1000 * 24)
          end = end.setTime(today.getTime() - 3600 * 1000 * 24)
          break
        case 'week':
          if (weekDay === 0) {
            weekDay = 7
          }
          start = +getTimeStamp(today) - 3600 * 24 * (weekDay - 1)
          end = +getTimeStamp(today) - 1
          break
        case 'lastWeek':
          if (weekDay === 0) {
            weekDay = 7
          }
          start = +getTimeStamp(today) - 3600 * 24 * (weekDay - 1) - 3600 * 24 * 7
          end = +getTimeStamp(today) - 1
          break
        case 'month':
          start = +getTimeStamp(today) - 3600 * 24 * (monthDay - 1)
          end = +getTimeStamp(today) - 1
          break
        case 'lastMonth':
          start = +getTimeStamp(lastMonth1st)
          end = +getTimeStamp(today) - 1
          break
        case 'halfYear':
          day = monthDay - 1
          if (month > 6) {
            month -= 6
          } else {
            month += 6
            year -= 1
          }
          if (month === 2 && day > 28) {
            day = isLeapYear ? 29 : 28
          }
          startDate = `${year}-${month}-${day}`
          start = +getTimeStamp(startDate)
          end = +getTimeStamp(today) - 1
          break
        case 'selfDefine':
          start = +getTimeStamp(this.selectDates[0])
          end = +getTimeStamp(this.selectDates[1])
          break
        default:
      }

      this.selectDates = [parseTime(start, '{y}-{m}-{d}'), parseTime(end, '{y}-{m}-{d}')]
      this.emitPickerChange()
    },
    dateChange(val) {
      this.curQuicklySelect = 'selfDefine'
      this.emitPickerChange()
    },
    groupTypeChange(val) {
      this.curGroup = -1
      this.emitPickerChange()
    },
    groupChange(val) {
      this.emitPickerChange()
    },
    emitPickerChange() {
      const params = {
        startDate: this.selectDates[0],
        endDate: this.selectDates[1]
      }
      if (this.noGroup !== '') {
        params.model = this.curGroupType === 1
        params.groups = this.curGroup
      }
      this.$emit('change', params)
    },
    getPreMonth(date) {
      const arr = date.split('-')
      const year = arr[0] // 获取当前日期的年份
      const month = arr[1] // 获取当前日期的月份
      const day = arr[2] // 获取当前日期的日
      let year2 = year
      let month2 = parseInt(month) - 1
      if (month2 === 0) {
        year2 = parseInt(year2) - 1
        month2 = 12
      }
      let day2 = day
      let days2 = new Date(year2, month2, 0)
      days2 = days2.getDate()
      if (day2 > days2) {
        day2 = days2
      }
      if (month2 < 10) {
        month2 = '0' + month2
      }
      const t2 = year2 + '-' + month2 + '-' + '01'
      return t2
    },
    isLeapYear(year) {
      const cond1 = year % 4 === 0
      const cond2 = year % 100 === 0
      const cond3 = year % 400 === 0
      const cond = (cond1 && !cond2) || (cond1 && cond2 && cond3)
      if (cond) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.analysis-picker {
    padding-bottom: 20px;

    > h3 {
        display: inline-block;
        font-size: 20px;
        padding: 0 20px 0 10px;
        border-left: 6px solid #2F75F5;
        line-height: 22px;
        margin: 10px 0;
    }

    .picker-item {
        width: 160px;
        margin-right: 20px;
        margin-bottom: 10px;
    }

    .picker-date-item {
        margin-right: 20px;
        margin-bottom: 10px;
    }
}
</style>
