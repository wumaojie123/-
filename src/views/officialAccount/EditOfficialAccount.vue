<template>
  <div class="official-account-edit" style="margin: 20px;">
    <p style="margin-bottom: 20px;">关注公众号方式</p>
    <el-radio v-model="type" label="1">
      <span class="">支付后引导关注<span class="">（顾客扫码支付后页面会引导顾客关注公众号)</span></span>
      <div style="margin-left: 20px;margin-top: 20px;">
        <span style="display:inline-block;margin-right: 20px;">引导关注语</span>
        <el-input placeholder="关注公众号，可接收充电消息通知" class="input-300" maxlength="64"/>
      </div>
    </el-radio><br>
    <el-radio v-model="type" label="2">
      <span class="">先关注后支付<span class="">（顾客扫码必须先关注公众号才可进行消费）</span></span>
      <div style="margin-left: 20px;margin-top: 20px;">
        <span style="display:inline-block;margin-right: 20px;">引导关注语</span>
        <el-input placeholder="请先关注后使用" class="input-300" maxlength="64"/>
      </div>
    </el-radio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deviceType: '',
      type: ''
    }
  }
}
</script>

<style lang="less" scoped>
.official-account-edit{
  font-size: 14px;
}

</style>
