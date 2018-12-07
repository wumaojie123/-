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
            <el-autocomplete
              :fetch-suggestions="querySearch"
              v-model="agentnick"
              class="width200"
              popper-class="my-autocomplete"
              placeholder="请输入内容"
              @select="handleSelect">
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
              </template>
            </el-autocomplete>
            <p v-show="infoChecked" style="font-size: 14px;color:red;">未查询到相应的商家，请重新输入！</p>
          </el-form-item>
        </el-col>
      </el-row>
      <el-upload
        ref="upload"
        :on-success="handleSuccess"
        :on-error="handleError"
        :file-list="fileList"
        :on-change="onChange"
        :on-remove="removeFile"
        :auto-upload="false"
        :data="uploadPar"
        :disabled="disabled"
        :on-exceed="handleExceed"
        :limit="1"
        accept=".txt"
        class="upload-demo"
        action="/agent/rest/file/batch/import"
      >
        <el-row slot="trigger">
          <el-col>
            <el-button :disabled="disabled || throttle" size="small" type="primary" >选择txt文件</el-button>
          </el-col>
          <el-col>
            <ul class="el-upload-list el-upload-list--text" />
          </el-col>
        </el-row>
        <div style="padding: 8px;"/>
        <el-button :disabled="disabled || throttle" size="small" type="success" @click="submitUpload">确定上传</el-button>
      </el-upload>
    </el-form>
    <!-- 失败对话框 -->
    <el-dialog :visible.sync="dialogVisible" title="导入结果" width="50%">
      <span>{{ failtTest }}</span>
      <p class="fail-reason">失败原因</p>
      <el-table :data="failList" :height="400" border highlight-current-row style="width: 100%;margin-bottom: 20px;" >
        <el-table-column v-for="(item, index) in colums" :key="index" :prop="item.key" :label="item.label" :width="item.width" :sortable="item.sortable" align="center"/>
      </el-table>
    </el-dialog>

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
      file: null,
      agentnick: '',
      infoChecked: false,
      throttle: false,
      form: {
        equipmentTypes: '',
        agent: ''
      },
      equipmentTypesArr: [],
      agentUsers: [],
      message: '请导入含设备编号的txt文档（注意：可以将Excel的数据直接复制到txt文档中，每一行代表一个设备编号）。不支持导入以下设备：出厂未通电的设备，已被导入的设备，老号段的设备。',
      colums: [
        { key: 'failIndex', label: '序号' },
        { key: 'value', label: '设备编号' },
        { key: 'failNote', label: '导入失败原因' }
      ],
      failList: [],
      dialogVisible: false,
      failtTest: ''
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
  },
  methods: {
    submitUpload() {
      if (this.throttle) {
        return
      }
      this.throttle = true
      if (!this.file) {
        this.$message.error('请选择上传文件！')
        return
      } else if (!this.form.agent || this.infoChecked) {
        this.$message.error('请选择代理商！')
        return
      }
      this.$refs.upload.submit()
    },
    removeFile() {
      this.file = null
    },
    onChange(file) {
      this.file = file
    },
    handleSelect(item) {
      this.form.agent = item.agentId
      console.log(this.form)
    },
    querySearch(queryString, cb) {
      const quer = /^(.+)\((.+)\)$/.exec(queryString)
      if (quer) {
        queryString = quer[1] && quer[1].trim()
      }
      queryAgents({ agentQuery: queryString })
        .then(res => {
          if (res.result === 0 && res.data && res.data.length !== 0) {
            const results = []
            res.data.forEach(item => {
              results.push({
                value: `${item.agentusername} (${item.phone})`,
                agentId: item.agentuserid
              })
            })
            this.agentUsers = results
            this.infoChecked = false
            cb(results)
          } else {
            this.infoChecked = true
            cb([])
          }
        })
      this.form.agent = ''
    },
    handleSuccess(par) {
      if (par.result === 0) {
        this.failtTest = par.description
        this.failList = par.data.fail
        this.dialogVisible = true
        this.throttle = false
        // this.$alert(`${par.description} ${failText}`, '导入结果', {
        //   confirmButtonText: '确定',
        //   callback: () => {
        //     this.throttle = false
        //     this.$refs.upload.clearFiles()
        //   }
        // })
      }
    },
    handleExceed() {
      this.$message.warning(`当前限制选择 1 个文件，一次只能上传一个文件`)
    },
    handleError() {
      this.throttle = false
      this.$message.error('导入失败！')
    }
  }
}
</script>
<style lang="scss" >
  .width200{
    width: 200px;
  }
  .el-message-box__message{
    word-wrap: break-word;
    word-break:break-all;
    word-break: break-word;
  }
  .upload-demo{
    position: relative;
    ul{
      position: absolute;
      left: 101px;
      top: -5px;
    }
  }
  .fail-reason{
    padding: 20px 0 10px 0;
    font-size: 18px;
  }
</style>
