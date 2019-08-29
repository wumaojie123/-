<template>
  <div style="margin: 20px;">
    <el-form style="margin-top: 40px;">
      <el-form-item label="请选择需要绑定的设备类型:">
        <el-select v-model="deviceType" placeholder="请选择" style="width: 200px;" filterable>
          <el-option v-for="item in list" :key="item.value" :label="item.label" :value="item.adOrgId"/>
        </el-select>
      </el-form-item>
    </el-form >
    <p class="title" style="margin-top: 100px;">对接后您的公众号可实现以下能力</p>
    <section class="flex-wrap" style="text-align:center;">
      <div v-for="(item, index) in descList" :key="index" class="flex-item">
        <section style="padding-bottom: 20px;">
          <img :src="item.url" style="width: 303px;height: 448px;">
        </section>
        <p>{{ item.title }}</p>
        <p style="text-align:left;padding-top: 20px; color: #888;">{{ item.desc }}</p>
      </div>
    </section>
    <section style="margin-top: 40px; text-align:center; width: 800px;" >
      <p style="color: red;margin-bottom: 30px;">温馨提示：请确保您的公众号为服务号且已完成微信认证！</p>
      <el-button type="primary" @click="queryResult">开始对接</el-button>
    </section>
  </div>
</template>

<script>
import { descList, deviceMap } from './constant'
import { getAllResult } from '@/api/officialAccount'
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
      const res = await getAllResult()
      if (res.result === 0) {
        const list = res.data
        this.list = list.map(item => {
          item.deviceName = deviceMap[item.name]
          return item
        })
      }
    },
    queryResult() {
      window.location.href = '/agent/rest/officialAccounts/getAuthUrl?eType=CDZ'
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
