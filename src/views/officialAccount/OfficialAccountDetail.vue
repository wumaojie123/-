<template>
  <div class="official-account-edit" style="margin: 20px;">
    <p class="title">关注公众号方式</p>
    <el-radio v-if="subscribeMode ==='0'" v-model="subscribeMode" label="0">
      <span>支付后引导关注<span style="color: #888;">（顾客扫码支付后页面会引导顾客关注公众号)</span></span>
      <div class="radio-wrap">
        <span class="title-desc">引导关注语</span>
        <el-input v-model="tempLead1" placeholder="关注公众号，可接收充电消息通知" class="input-500" maxlength="30" readonly/>
      </div>
    </el-radio><br>
    <el-radio v-if="subscribeMode ==='1'" v-model="subscribeMode" label="1">
      <span>先关注后支付<span style="color: #888;">（顾客扫码必须先关注公众号才可进行消费）</span></span>
      <div class="radio-wrap">
        <span class="title-desc">引导关注语</span>
        <el-input v-model="tempLead2" placeholder="请先关注后使用" class="input-500" maxlength="30" readonly/>
      </div>
    </el-radio>
    <template v-if="!allVisible">
      <p class="title" style="margin-top: 20px;">
        <span>服务消息通知</span>
        <el-switch v-model="configValue" active-color="#13ce66" inactive-color="#f0f0f0" style="margin-left: 20px;" disabled/>
      </p>
      <div>客户扫码消费后可在公众号接收服务开始、服务结束消息通知，查看充电桩示例>；</div>
      <template v-if="dataInfo.isMenuAuth === 'Y' && dataInfo.menuSuccess =='Y'">
        <p class="title" style="margin-top: 20px;">
          <span>公众号菜单配置</span>
          <el-switch v-model="value" active-color="#13ce66" inactive-color="#f0f0f0" style="margin-left: 20px;" disabled/>
        </p>
      </template>
      <!-- 公众号菜单 -->
      <div v-show="dataInfo.isMenuAuth == 'Y' && dataInfo.menuSuccess =='Y'">
        <edit-dialog v-if="dataInfo.isMenuAuth !='N'" :device-type="dataInfo.eType" :action-type="actionType" :menu-list="menuList"/>
      </div>
    </template>
    <div v-if="allVisible">
      您暂未配置功能
    </div>
  </div>
</template>

<script>
import editDialog from './component/edit'
import { getConfig } from '@/api/officialAccount'

export default {
  components: {
    editDialog
  },
  data() {
    return {
      dataInfo: {},
      tempLead1: '关注公众号，可接收充电消息通知',
      tempLead2: '请先关注后使用',
      appId: '',
      value: true,
      configValue: true,
      actionType: 'detail',
      menuList: [],
      industry: '',
      serviceVisible: false,
      params: {},
      allVisible: false,
      subscribeMode: ''
    }
  },
  created() {
    this.appId = this.$route.query.id
    this.getConfigInfo()
  },
  methods: {
    async getConfigInfo() {
      const res = await getConfig({ appId: this.appId })
      if (res.result === 0) {
        this.tempLead1 = res.data.lead
        this.tempLead2 = res.data.lead
        this.dataInfo = res.data
        this.subscribeMode = (res.data.subscribeMode || 0) + ''
        this.menuList = res.data.menuConfig && res.data.menuConfig.button || []
        this.allVisible = (res.data.isMenuAuth === 'N' && res.data.isTemplateAuth === 'N') ||
            ((res.data.isMenuAuth === 'Y' && res.data.menuSuccess === 'N') && res.data.isTemplateAuth === 'Y' && res.data.templateSuccess === 'N')
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
