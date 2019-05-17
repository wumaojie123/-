<template>
  <el-dialog :visible.sync="visiable" :show-close="false" :close-on-click-modal="false" width="500px" title="投币/出礼说明">
    <el-table :data="dialogTableData" border style="width: 100%;">
      <el-table-column label="名称" align="left" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="解释说明" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.explain }}</span>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="closeDialog">知道了</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'DialogExplain',
  props: {
    visiable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogTableData: [
        { name: '线上投币', explain: '手机上投得币，包括：顾客在线购买的游戏币，商家赠送的红包币、派币、充值抽奖币，广告主赠送的广告笔等' },
        { name: '线下投币', explain: '顾客直接在机器上投的游戏币（包含当天或之前购买的）或者硬币' },
        { name: '出礼比例', explain: '机器投币的总数/出礼总数' },
        { name: '出礼数量(个)', explain: '被顾客获得的礼品总数' },
        { name: '礼品成本(元)', explain: '被顾客获得的礼品成本总数' }
      ]
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close-dialog', false)
    }
  }
}
</script>
