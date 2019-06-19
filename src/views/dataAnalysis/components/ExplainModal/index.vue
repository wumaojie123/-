<template lang="html">
  <el-dialog
    :title="title"
    :visible="visible"
    width="350px"
    center
    class="explainModal"
    @close="confirmFn"
  >
    <div class="dialog-content">{{ content }}</div>
    <div slot="footer" class="dialog-footer">
      <span @click="confirmFn">{{ confirmBtn }}</span>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'ExplainModal',
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: () => '说明'
    },
    content: {
      type: String,
      default: () => '“在架商品种数” 指统计时间段内，关联了设备的商品种类数量。'
    },
    confirmBtn: {
      type: String,
      default: () => '我知道了'
    },
    confirmFn: {
      type: Function,
      default: () => {
        this.visible = false
      }
    }
  }
}
</script>

<style lang="scss">
  .explainModal {
    .dialog-content {
      font-size: 14px;
      line-height: 20px;
      color: #333;
      padding: 5px 0;
    }
    .el-dialog__footer {
      padding: 0;
    }
    .dialog-footer {
      font-size: 16px;
      padding: 15px 0;
      color: rgb(2, 123, 254);
      border-top: 1px solid #dcdcdc;
    }
  }
</style>
