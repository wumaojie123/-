<template>
  <el-dialog :visible.sync="localValue" title="公众号菜单预览" width="35%">
    <div class="preview-wrap">
      <div class="preview-footer">
        <div style="width: 45px;text-align:center;border: 1px solid #f0f0f0;">
          <i class="el-icon-copy-document" style="font-size: 26px;height: 50px;line-height: 50px;" />
        </div>
        <div v-for="(item, index) in localMeau" :key="index" class="footer-item">
          <span v-for="(item, index2) in item" :key="index2" class="item-item">{{ item }}</span>
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
  },
  data() {
    return {
      localValue: this.value
    }
  },
  computed: {
    localMeau() {
      const arr = []
      this.menu.forEach(item => {
        const arr2 = []
        if (item.sub_button.length > 0) {
          item.sub_button.map(item2 => {
            arr2.push(item2.name)
          })
          arr2.push(item.name)
          arr.push(arr2.reverse())
        } else {
          arr2.push(item.name)
          arr.push(arr2)
        }
      })
      return arr
    }
  },
  watch: {
    value(val) {
      this.localValue = val
    },
    localValue(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
.preview-wrap{
  position: relative;
  width: 375px;
  height: 450px;
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
