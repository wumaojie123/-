<template>
  <el-main>
    <el-alert :title="message" :closable="false" type="warning" class="info" />
    <el-form ref="form" :model="form" label-width="90px" class="deviceForm" style="padding: 16px 0; width: 400px;">
      <el-row>
        <el-col >
          <el-form-item label="设备类型" prop="equipmentTypes">
            <el-select v-model="form.equipmentTypes" placeholder="请选择">
              <el-option
                v-for="item in equipmentTypesArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col >
          <el-form-item label="代理商" prop="agent">
            <el-select v-model="form.agent" placeholder="请选择">
              <el-option
                v-for="item in agentUsers"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-upload
        ref="upload"
        :on-success="handleSuccess"
        :on-error="handleError"
        :file-list="fileList"
        :auto-upload="false"
        :data="uploadPar"
        :disabled="disabled"
        :on-exceed="handleExceed"
        :limit="1"
        class="upload-demo"
        action="/agent/rest/file/batch/import"
      >
        <el-row slot="trigger">
          <el-col>
            <el-button :disabled="disabled" size="small" type="primary" >选取文件</el-button>
          </el-col>
          <el-col>
            <ul class="el-upload-list el-upload-list--text" />
          </el-col>
        </el-row>
        <div style="padding: 8px;"/>
        <el-button :disabled="disabled" size="small" type="success" @click="submitUpload">确定上传</el-button>
      </el-upload>
    </el-form>
  </el-main>
</template>

<script>
import { getDeviceTypeBd } from '../../api/getEquiedType'
import { queryAgents } from '../../api/getAgentUserId'
export default {
  name: 'DevicesImport',
  data() {
    return {
      fileList: [],
      form: {
        equipmentTypes: '',
        agent: ''
      },
      equipmentTypesArr: [],
      agentUsers: [],
      message: '请将设备注册编号放入txt文档，每一行代表一个设备编号，如果编号未被绑定注册或待调拨，导入将成功，反之，则将失败。注意：Excel的数据可以直接复制到txt文档中。'
    }
  },
  computed: {
    disabled() {
      if (!this.form.equipmentTypes || !this.form.agent) {
        return true
      } else {
        return false
      }
    },
    uploadPar() {
      return {
        agentUserId: this.form.agent,
        equipmentType: this.form.equipmentTypes
      }
    }
  },
  created() {
    getDeviceTypeBd()
      .then(res => {
        if (res.result === 0 && res.data && res.data.length) {
          res.data.forEach(item => {
            this.equipmentTypesArr.push({
              value: item.code,
              label: item.name
            })
          })
        }
      })
    queryAgents({ queryLevel: 1 })
      .then(res => {
        if (res.result === 0 && res.data && res.data.length !== 0) {
          res.data.forEach(item => {
            this.agentUsers.push({
              value: item.agentuserid,
              label: `${item.agentusername} (${item.phone})`
            })
          })
        } else {
          this.disabled = true
        }
      })
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleSuccess(par) {
      if (par.result === 0) {
        const failText = par.data.fail.length === 0 ? '' : `失败${par.data.fail.length}条;
        失败的设备编号：${par.data.fail.join(',')}`
        this.$alert(`${par.description} ${failText}`, '导入结果', {
          confirmButtonText: '确定'
        })
      }
    },
    handleExceed() {
      this.$message.warning(`当前限制选择 1 个文件，一次只能上传一个文件`)
    },
    handleError() {
      this.$message.error('导入失败！')
    }
  }
}
</script>
