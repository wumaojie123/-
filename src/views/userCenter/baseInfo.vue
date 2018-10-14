<template>
  <el-main class="base-info">
    <el-alert :title="msg" :closable="false" type="warning" class="info" />
    <div class="list-box">
      <ul class="ul">
        <li>
          <p class="left">合同编号：</p>
          <p>{{ infoData.contractId }}</p>
        </li>
        <li>
          <p class="left">代理商名称：</p>
          <p>{{ infoData.agentUserName }}</p>
        </li>
        <li>
          <p class="left">联系人姓名：</p>
          <p>{{ infoData.linkName }}</p>
        </li>
        <li>
          <p class="left">手机号码：</p>
          <p>{{ infoData.phone }}</p>
        </li>
        <li>
          <p class="left">联系地址： </p>
          <p>{{ infoData.address }}</p>
        </li>
        <li>
          <p class="left">关联商家： </p>
          <p>{{ infoData.loginPhone }}</p>
        </li>
        <li>
          <p class="left">业务客服：</p>
          <p>{{ infoData.bdName }}</p>
        </li>
        <li>
          <p class="left">经营项目：</p>
          <p>{{ infoData.agentBusinessId && infoData.agentBusinessId.name }}</p>
        </li>
      </ul>
    </div>
  </el-main>
</template>

<script>
import { getAuthInfo } from '../../api/getAuthInfo'
export default {
  name: 'BaseInfo',
  data() {
    return {
      infoData: {},
      msg: '以下信息用户暂时不能主动修改，如需调整，请联系业务客服。'
    }
  },
  mounted() {
    getAuthInfo().then(res => {
      this.infoData = res.data || {}
    })
  }
}
</script>

<style  lang="scss" scoped>
  /*@import "@/styles/mixin.scss";*/
  .base-info{
    .info{
      padding: 10px;
      background-color: rgba(255, 255, 204, 1);
      color: #666;
      font-size: 14px;
    }
    .list-box{
      padding-top: 20px;
    }
    .ul{
      li{
        @include flex(flex-start);
        padding: 12px 0 12px 16px;
        font-size: 16px;
        color: #333333;
        .left{
          width: 110px;
        }
        &:hover{
          background-color: #F5F5F5;
        }
      }
    }
  }
</style>
