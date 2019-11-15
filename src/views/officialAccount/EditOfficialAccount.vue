<template>
  <div class="official-account-edit" style="margin: 20px;">
    <p class="title">关注公众号方式</p>
    <el-radio v-model="subscribeMode" label="0">
      <span>支付后引导关注<span style="color: #888;">（顾客扫码支付后页面会引导顾客关注公众号)</span></span>
      <div class="radio-wrap">
        <span class="title-desc">引导关注语</span>
        <el-input v-model="tempLead1" placeholder="关注公众号，可接收充电消息通知" class="input-500" maxlength="30"/>
      </div>
    </el-radio><br>
    <el-radio v-model="subscribeMode" label="1">
      <span>先关注后支付<span style="color: #888;">（顾客扫码必须先关注公众号才可进行消费）</span></span>
      <div class="radio-wrap">
        <span class="title-desc">引导关注语</span>
        <el-input v-model="tempLead2" placeholder="请先关注后使用" class="input-500" maxlength="30"/>
      </div>
    </el-radio>
    <!-- 服务消息通知 -->
    <p class="title" style="margin-top: 20px;">
      <span>服务消息通知</span>
      <el-switch v-model="configValue" active-color="#13ce66" size="big" inactive-color="#f0f0f0" style="margin-left: 20px;"/>
    </p>
    <div>客户扫码消费后可在公众号接收服务开始、服务结束消息通知，<el-popover placement="top-start" trigger="hover">
      <img src="./images/title.png" class="popver-img" style="width: 300px;height: 448px;">
      <span slot="reference" style="color: #409EFF;">查看示例></span>
    </el-popover></div>
    <!-- 收益统计通知 -->
    <p class="title" style="margin-top: 20px;">
      <span>收益统计通知</span>
      <el-switch v-model="incomeValue" active-color="#13ce66" size="big" inactive-color="#f0f0f0" style="margin-left: 20px;"/>
    </p>
    <div>商户可在每日9:00接收昨日收益统计提醒，<el-popover placement="top-start" trigger="hover">
      <img src="./images/1.png" class="popver-img" style="width: 300px;height: 448px;">
      <span slot="reference" style="color: #409EFF;">查看示例></span>
    </el-popover></div>
    <!-- 交易通知 -->
    <p class="title" style="margin-top: 20px;">
      <span>交易通知</span>
      <el-switch v-model="trateVlue" active-color="#13ce66" size="big" inactive-color="#f0f0f0" style="margin-left: 20px;"/>
    </p>
    <div>客户扫码交易后商家可在公众号接收交易提醒通知，<el-popover placement="top-start" trigger="hover">
      <img src="./images/2.png" class="popver-img" style="width: 300px;height: 448px;">
      <span slot="reference" style="color: #409EFF;">查看示例></span>
    </el-popover></div>
    <!-- 设备警告通知 -->
    <p class="title" style="margin-top: 20px;">
      <span>设备警告通知</span>
      <el-switch v-model="equipWarnValue" active-color="#13ce66" size="big" inactive-color="#f0f0f0" style="margin-left: 20px;"/>
    </p>
    <div>设备上报烟雾告警，商家可在公众号接收提醒，<el-popover placement="top-start" trigger="hover">
      <img src="./images/title.png" class="popver-img" style="width: 300px;height: 448px;">
      <span slot="reference" style="color: #409EFF;">查看示例></span>
    </el-popover></div>

    <p class="title" style="margin-top: 20px;">
      <span>公众号菜单配置</span>
      <el-switch v-model="value" active-color="#13ce66" inactive-color="#f0f0f0" style="margin-left: 20px;"/>
    </p>
    <!-- 公众号菜单 -->
    <template v-show="dataInfo.isMenuAuth === 'Y'">
      <edit-dialog v-show="value" ref="datepicker" :ag="ag" :device-type="dataInfo.eType" :app-id="appId" :action-type="actionType" :menu-list="menuList" @on-OK="update"/>
    </template>
    <div style="margin: 20px 40px 0 80px;">
      <el-button type="success" @click="handlePreview">公众号菜单预览</el-button>
      <el-button type="primary" @click="updateConfig">保存</el-button>
    </div>
    <preview v-model="previewVisible" :menu="params.menus"/>
  </div>
</template>

<script>
import editDialog from './component/edit'
import preview from './component/preview'
import { getConfig, updateConfig } from '@/api/officialAccount'
import { getAngent } from '@/api/angentManage'

export default {
  components: {
    editDialog,
    preview
  },
  data() {
    return {
      tempLead1: '关注公众号，可接收消息通知',
      tempLead2: '请先关注后使用',
      previewVisible: false,
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
      subscribeMode: 0,
      ag: '',
      incomeValue: true, // 收益统计通知
      trateVlue: true, // 交易通知
      equipWarnValue: true // 设备警告通知

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
      const res2 = await getAngent()
      if (res2.result === 0) {
        this.ag = res2.data.agentUserId + ''
      }
      const res = await getConfig({ appId: this.appId })
      if (res.result === 0) {
        this.dataInfo = res.data
        this.subscribeMode = res.data.subscribeMode + ''
        if (this.subscribeMode === '0') {
          this.tempLead1 = res.data.lead || '关注公众号，可接收消息通知'
          if (this.isFirstAuth === 'NY') {
            this.tempLead1 = '关注公众号，可接收消息通知'
          }
        } else if (this.subscribeMode === '1') {
          this.tempLead2 = res.data.lead || '请先关注后使用'
        }
        this.menuList = res.data.menuConfig && res.data.menuConfig.button || []
        this.configValue = res.data.templateSuccess === 'Y' && res.data.isTemplateAuth === 'Y'
        this.value = res.data.menuSuccess === 'Y' && res.data.isMenuAuth === 'Y'
        // 添加三个消息推送
        // this.incomeValue = res.data.sendBenefitMsg === 'Y'
        // this.trateVlue = res.data.sendPaymentMsg === 'Y'
        // this.equipWarnValue = res.data.sendFaultMsg === 'Y'
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
      console.log('data')
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
    handlePreview() {
      if (!this.value) {
        this.$message({ message: '公众号菜单未开启', type: 'success' })
        return
      }
      this.$refs.datepicker.handleDataInfo()
      this.previewVisible = true
    },
    updateConfig(flag = false) {
      this.$refs.datepicker.handleDataInfo()
      this.$nextTick(() => {
        this.updateConfigAction()
      })
    },
    async updateConfigAction() {
      const result = this.params.menus.some(item => {
        if (item.sub_button.length > 0) {
          if (item.name.length >= 6) {
            return true
          }
        }
      })
      if (result) {
        this.$message({ message: '二级菜单超过一个，一级菜单名称不能超过5个汉字', type: 'error' })
        return
      }
      console.log(JSON.stringify(this.params))
      // 关注公众号方式
      this.params.subscribeMode = this.subscribeMode
      if (this.subscribeMode === '0') {
        this.params.lead = this.tempLead1
      } else {
        this.params.lead = this.tempLead2
      }
      // 更新数据
      if (this.industry === this.dataInfo.primaryIndustrySecond) {
        this.params.industryId1 = this.dataInfo.forceIndustryCode
        this.params.industryId2 = this.dataInfo.secondaryIndustryCode
      }
      if (this.industry === this.dataInfo.secondaryIndustrySecond) {
        this.params.industryId1 = this.dataInfo.primaryIndustryCode
        this.params.industryId2 = this.dataInfo.forceIndustryCode
      }
      // 增加三个消息的参数
      this.params.sendPaymentMsg = this.trateVlue
      this.params.sendBenefitMsg = this.incomeValue
      this.params.sendFaultMsg = this.equipWarnValue
      console.log(this.params.type)
      const res = await updateConfig(this.params)
      if (res.result === 0) {
        this.$message({ message: '公众号配置成功', type: 'success' })
        window.history.go(-1)
        // this.$router.push({ path: 'OfficialAccountDetail', query: { appId: this.appId }})
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
.input-500{
  width: 500px;
}
</style>
