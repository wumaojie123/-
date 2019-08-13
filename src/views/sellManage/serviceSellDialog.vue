<template>
  <el-dialog :title="getTitle" :visible.sync="visible" width="30%" @close="handleClose">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"/>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"/>
          <el-option label="区域二" value="beijing"/>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    handleClose: {
      type: Function,
      default: () => {}
    },
    visible: {
      type: Boolean,
      default: false
    },
    actionRow: {
      type: Object,
      default: null
    },
    actionType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  computed: {
    getTitle() {
      return this.actionType === 'add' ? '添加服务套餐' : '编辑服务套餐'
    }
  },
  methods: {
  }
}
</script>
