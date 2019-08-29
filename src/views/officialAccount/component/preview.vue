<template>
  <el-dialog :visible.sync="value" title="公众号菜单预览" width="35%">
    <div class="preview-wrap">
      <div class="preview-footer">
        <div style="width: 45px;text-align:center;border: 1px solid #f0f0f0;">
          <i class="el-icon-copy-document" style="font-size: 26px;height: 50px;line-height: 50px;" />
        </div>
        <div class="footer-item">
          <span >扫码冲抵</span>
          <span class="item-item">扫码冲抵2</span>
          <span class="item-item">扫码冲抵3</span>
        </div>
        <div class="footer-item">
          <span>商户管理平台</span>
          <span>商户管理平台2</span>
        </div>
        <div class="footer-item">
          <span>附近充电桩</span>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'Preview',
  props: {
    menu: {
      type: Array,
      default: () => []
    },
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.preview-wrap{
  position: relative;
  width: 375px;
  height: 600px;
  background: #f0f0f0;
}
.preview-footer{
  position: absolute;
  bottom: 0;
  display:flex;
  width: 375px;
  background: #fff;
  justify-content: space-around;
  font-size: 0;
  .footer-item{
    width: 110px;
    text-align: center;
    height: 50px;
    border: 1px solid #f0f0f0;
    font-size: 14px;
    line-height: 50px;
    display: flex;
    flex-direction: column-reverse;
    .item-item{
      width: 110px;
      background: #fff;
      height: 50px;
      line-height: 50px;
      border: 1px solid #f0f0f0;
      border-bottom: none;
    }
  }
}
</style>
