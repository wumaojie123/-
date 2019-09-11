<template>
  <el-container>

    <el-main>
      <template v-for="(item,index) in cell.prop">
        <el-row :key="index" class="border-set">
          <el-col :span="12" class="right-border-set">
            <div>{{ cell.name[index] }}</div>
          </el-col>
          <el-col :span="12">
            <div>{{ cell.obj[item] }}</div>
          </el-col>
        </el-row>
      </template>
    </el-main>
  </el-container>
</template>
<script>
export default {
  props: {
    /**
     * prop:数据表存储值
     * name:列名
     * obj: 对象
     */
    cell: {
      type: Object,
      default: function() {
        return {
          prop: [],
          name: [],
          obj: {}
        }
      }
    }
  }
}
</script>
<style scoped>
.border-set {
  border: 1px solid #ccc;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.right-border-set {
  border-right: 1px solid #ccc;
}
</style>
