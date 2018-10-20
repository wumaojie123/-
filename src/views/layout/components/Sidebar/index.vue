<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <h3 class="left-nav-title" >代理商管理后台</h3>
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#2a3542"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style scoped lang="scss">
  .left-nav-title{
    height: 50px;
    margin: 0;
    font-size: 16px;
    font-weight:700;
    text-align: center;
    line-height: 50px;
    background-color:rgba(0, 0, 0, 1);
   // border-bottom: 0.5px solid white;
    color: #C2C2C2;
    position: relative;
    &::after{
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      background-color: white;
      transform: scale(1,0.5);
      bottom: 0;
      left: 0;
    }
  }

</style>
