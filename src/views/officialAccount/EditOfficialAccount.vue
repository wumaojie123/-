<template>
  <div class="official-account-edit" style="margin: 20px;">
    <p class="title">关注公众号方式</p>
    <el-radio v-model="type" label="1">
      <span class="">支付后引导关注<span class="">（顾客扫码支付后页面会引导顾客关注公众号)</span></span>
      <div class="radio-wrap">
        <span class="title-desc">引导关注语</span>
        <el-input placeholder="关注公众号，可接收充电消息通知" class="input-300" maxlength="64"/>
      </div>
    </el-radio><br>
    <el-radio v-model="type" label="2">
      <span class="">先关注后支付<span class="">（顾客扫码必须先关注公众号才可进行消费）</span></span>
      <div class="radio-wrap">
        <span class="title-desc">引导关注语</span>
        <el-input placeholder="请先关注后使用" class="input-300" maxlength="64"/>
      </div>
    </el-radio>
    <p class="title" style="margin-top: 20px;">
      <span>服务消息通知</span>
      <el-switch v-model="configValue" active-color="#13ce66" inactive-color="#f0f0f0" style="margin-left: 20px;"/>
    </p>
    <div>客户扫码消费后可在公众号接收服务开始、服务结束消息通知，查看充电桩示例>；</div>
    <p class="title" style="margin-top: 20px;">
      <span>公众号菜单配置</span>
      <el-switch v-model="value" active-color="#13ce66" inactive-color="#f0f0f0" style="margin-left: 20px;"/>
    </p>
    <!-- 公众号菜单 -->
    <div v-show="dataInfo.isMenuAuth == 'Y' && dataInfo.menuSuccess =='Y'">
      <edit-dialog v-show="dialogVisible" :device-type="dataInfo.eType" :app-id="appId" :action-type="actionType" :menu-list="menuList"/>
    </div>
  </div>
</template>

<script>
import editDialog from './component/edit'
// import { res } from './data'
import { getConfig } from '@/api/officialAccount'

export default {
  components: {
    editDialog
  },
  data() {
    return {
      dataInfo: {},
      appId: '',
      value: true,
      configValue: true,
      actionType: '',
      menuList: [],
      industry: '',
      typeId: false,
      serviceVisible: false,
      params: {},
      isFirstAuth: 'N',
      publicTypeVisible: false,
      subscribeMode: 0
    }
  },
  beforeMount() {
    this.appId = this.$route.query.appId
    this.typeId = this.$route.query.typeId || false
    this.isFirstAuth = this.$route.query.isFirstAuth || 'N'
    this.getConfigInfo()
  },
  methods: {
    /**
       * 查询公众号主体信息
       */
    async getConfigInfo() {
      const res = await getConfig({ appId: this.appId })
      if (res.result === 0) {
        this.dataInfo = res.data
        this.subscribeMode = res.data.subscribeMode
        this.menuList = res.data.menuConfig && res.data.menuConfig.button || []
        this.configValue = res.data.templateSuccess === 'Y' && res.data.isTemplateAuth === 'Y'
        this.value = res.data.menuSuccess === 'Y' && res.data.isMenuAuth === 'Y'
        if (this.isFirstAuth === 'Y') {
          this.configValue = true
          this.value = true
        }
      }
    },
    // 设置公众号关注方式
    handleType(val) {
      this.subscribeMode = val
    },
    selectIndustry(val) {
      this.industry = val
    },
    /**
       * 跟新配置信息
       */
    update(data) {
      const params = {
        appId: this.appId
      }
      if (this.configValue && this.value) {
        params.type = 'all'
      } else if (this.configValue && !this.value) {
        params.type = 'template'
      } else if (!this.configValue && this.value) {
        params.type = 'menu'
      }
      params.menus = data
      this.params = params
    },
    updateConfig() {
      this.$refs.datepicker.handleDataInfo()
      this.updateConfigAction()
    },
    async updateConfigAction() {
      // this.publicTypeVisible = true
      const result = this.params.menus.some(item => {
        if (item.sub_button.length > 0) {
          if (item.name.length >= 6) {
            console.log(item.name)
            return true
          }
        }
      })
      console.log('result:', result)
      if (result) {
        this.$toast('多个子菜单，一级菜单名称不能超过5个汉字')
        return
      }
      // 关注公众号方式
      this.params.subscribeMode = this.subscribeMode
      // 更新数据
      if (this.industry === this.dataInfo.primaryIndustrySecond) {
        this.params.industryId1 = this.dataInfo.forceIndustryCode
        this.params.industryId2 = this.dataInfo.secondaryIndustryCode
      }
      if (this.industry === this.dataInfo.secondaryIndustrySecond) {
        this.params.industryId1 = this.dataInfo.primaryIndustryCode
        this.params.industryId2 = this.dataInfo.forceIndustryCode
      }
      console.log(JSON.stringify(this.params.menus))
      const res = await getConfig(this.params)
      if (res.result === 0) {
        this.$toast('更新成功')
        this.$router.push({ path: 'publicSuccess', query: { id: this.appId }})
      }
    }
  }
}
</script>

<style lang="less" scoped>
.official-account-edit{
  font-size: 14px;
  .title{
    margin-bottom: 20px;
    font-weight: 700;
    font-size: 16px;
  }
  .radio-wrap{
    color: rgb(96, 98, 102);;
    margin-left: 20px;
    margin-top: 20px;
  }
  .title-desc{
    display:inline-block;
    margin-right: 20px;
  }
}

</style>
