<template>
  <div style="margin: 20px;">
    <el-form style="margin-top: 40px;">
      <el-form-item label="请选择需要绑定的设备类型:">
        <el-select v-model="deviceType" placeholder="请选择" style="width: 200px;" filterable>
          <el-option v-for="item in list" :key="item.value" :label="item.label" :value="item.typeValue" :disabled="item.disabled"/>
        </el-select>
      </el-form-item>
    </el-form >
    <p class="title" style="margin-top: 100px;">对接后您的公众号可实现以下能力</p>
    <section class="flex-wrap" style="text-align:center;">
      <div v-for="(item, index) in descList" :key="index" class="flex-item">
        <section style="padding-bottom: 20px;">
          <img :src="item.url" style="width: 300px;height: 448px;">
        </section>
        <p>{{ item.title }}</p>
        <p style="text-align:left;padding: 20px; color: #888;line-height: 18px;">{{ item.desc }}</p>
      </div>
    </section>
    <section style="margin-top: 40px; text-align:center; width: 800px;" >
      <p style="color: red;margin-bottom: 30px;">温馨提示：请确保您的公众号为服务号且已完成微信认证！</p>
      <el-button type="primary" @click="queryResult">开始对接</el-button>
    </section>
  </div>
</template>

<script>
import { descList } from './constant'
import { authTypes } from '@/api/officialAccount'
export default {
  data() {
    return {
      deviceType: '',
      list: [],
      descList: descList
    }
  },
  created() {
    this.queryList()
  },
  methods: {
    async queryList() {
      const res = await authTypes()
      if (res.result === 0) {
        const list = res.data || []
        this.list = list.map(item => {
          if (item.hasAuth === 'Y') {
            item.label = `${item.typeName} (已绑定)`
            item.disabled = true
          } else {
            item.label = `${item.typeName}`
            item.disabled = false
          }
          return item
        })
      }
    },
    queryResult() {
      if (!this.deviceType) {
        this.$message({ message: '请选择设备类型', type: 'error' })
        return
      }
      window.location.href = '/agent/rest/officialAccounts/getAuthUrl?eType=' + this.deviceType
    }
  }
}
</script>

<style lang="less" scoped>
.title{
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 16px;
}
.flex-wrap{
  display:flex;
  font-size: 14px;
  justify-content: space-around;
  .flex-item{
    flex: 1;
  }
}
</style>
