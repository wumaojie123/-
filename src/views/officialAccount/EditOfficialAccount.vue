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
      <el-switch v-model="value" active-color="#13ce66" inactive-color="#f0f0f0" style="margin-left: 20px;"/>
    </p>
    <div>客户扫码消费后可在公众号接收服务开始、服务结束消息通知，查看充电桩示例>；</div>
    <p class="title" style="margin-top: 20px;">
      <span>公众号菜单配置</span>
      <el-switch v-model="value" active-color="#13ce66" inactive-color="#f0f0f0" style="margin-left: 20px;"/>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deviceType: '',
      type: '',
      value: true
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
