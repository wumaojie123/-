<template>
  <el-dialog :visible.sync="visiable" :show-close="false" :close-on-click-modal="false" width="500px" title="添加经营项目">
    <el-input v-model="newAgentName" placeholder="请输入经营项目名称 (不超过15个字）" class="project-input" />
    <p class="project-node">温馨提醒：添加后将作为公共选项，且不可删除，请认真填写。</p>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="toggleModal('open')">确定</el-button>
      <el-button @click="toggleModal('close')">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import insideManage from '@/api/insideManage'
export default {
  props: {
    visiable: {
      type: Boolean,
      default: false
    },
    projects: {
      type: Array,
      default: () => {
        this.projects || []
      }
    }
  },
  data() {
    return {
      newAgentName: null
    }
  },
  methods: {
    toggleModal(type) {
      var newAgentName = this.newAgentName
      if (this.newAgentName) {
        newAgentName = this.newAgentName.replace(/\s*/g, '')
      }
      const modalObj = {
        status: false,
        newAgentName: newAgentName,
        response: ''
      }
      if (type === 'open') {
        let flag = false
        if (!newAgentName || newAgentName === '') {
          this.$message({
            message: '请输入要添加的项目名称',
            type: 'warning'
          })
          return
        }
        if (newAgentName && newAgentName.length > 15) {
          this.$message({
            message: '项目名称不能超过15个字',
            type: 'warning'
          })
          return
        }
        this.projects.forEach(item => {
          if (item.name === newAgentName) {
            this.$message({
              message: '该项目已存在',
              type: 'warning'
            })
            flag = true
          }
        })
        if (flag) return
        const newAgentData = {
          agentBusinessId: '',
          name: newAgentName
        }
        insideManage.saveAgentBusiness(newAgentData).then(res => {
          if (res && res.result === 0) {
            modalObj.response = res
            this.newAgentName = null
          } else {
            this.$message.error('增加经营项目失败')
          }
          this.$emit('toggle-dialog', modalObj)
        })
      } else {
        this.newAgentName = null
        this.$emit('toggle-dialog', modalObj)
      }
    }
  }
}
</script>
<style scoped>
  .project-input{
    text-align: center;
    margin-bottom: 10px;
  }
  .project-node{
    font-size: 12px;
    color: #666;
  }
</style>
