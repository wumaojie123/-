<template lang="html">
  <div class="parent">
    <div class="column-item">
      <template v-for="(item,i) in itemList">
        <div :key="i" class="item">
          <p class="txt">
            {{ item.txt }}
            <span v-if="showTipsIcon" class="el-icon-question" @mouseover="showTooltip(item.tips)"/>
          </p>
          <p class="num">{{ item.count }}</p>
        </div>
      </template>
      <explain-modal
        :visible="tooltipsVisible"
        :content="tooltipsInfo.content"
        :confirm-fn="closeTooltip"
      />
    </div>
  </div>
</template>

<script>
import ExplainModal from '../ExplainModal'

export default {
  name: 'ColumnItem',
  components: {
    ExplainModal
  },
  props: {
    itemList: {
      type: Array,
      default: () => []
    },
    showTipsIcon: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      tooltipsVisible: false,
      tooltipsInfo: {
        title: '说明',
        content: ''
      }
    }
  },
  methods: {
    showTooltip(content) {
      this.tooltipsVisible = true
      this.tooltipsInfo = {
        content
      }
    },
    closeTooltip() {
      this.tooltipsVisible = false
      this.tooltipsInfo = {
        title: '说明',
        content: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .column-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100px;
    text-align: center;

    .item {
      width: 25%;
      position: relative;

      &::after {
        display: inline-block;
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        height: 90%;
        width: 1px;
        background: #dcdcdc;
      }

      &:last-child {
        &::after {
          display: none;
        }
      }

      .num {
        margin-top: 20px;
      }
    }
  }
</style>
