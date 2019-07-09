<template>
  <el-main>
    <div>导入单蓝牙设备</div>
    <el-form ref="form" :model="form" :rules="rules" label-width="90px" class="deviceForm" style="padding: 16px 0; width: 400px;">
      <el-row>
        <el-col >
          <el-form-item label="代理商" prop="agent">
            <el-autocomplete
              :fetch-suggestions="querySearch"
              v-model="agentnick"
              popper-class="my-autocomplete"
              placeholder="非必选"
              style="width: 250px;"
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
        :on-success="onUploadSuccess"
        :before-upload="onBeforeUpload"
        :on-change="onChange"
        :on-remove="removeFile"
        :auto-upload="false"
        :limit="1"
        :action="url"
        accept="application/vnd.ms-excel,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        class="upload-demo"
      >
        <el-button slot="trigger" size="small" type="success">选取文件</el-button>
        <div style="padding: 8px;"/>
        <el-button size="small" type="primary" @click="submitUpload">确定上传</el-button>
      </el-upload>
    </el-form>
    <!-- 失败对话框 -->
    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="isCanClickModalTag" title="导入结果" width="50%">
      <span>{{ failtTest }}</span>
      <p v-if="failList.length > 0" class="fail-reason">失败原因</p>
      <el-table v-if="failList.length > 0" :data="failList" :height="400" border highlight-current-row style="width: 100%;margin-bottom: 20px;">
        <el-table-column v-for="(item, index) in colums" :key="index" :prop="item.key" :label="item.label" :width="item.width" :sortable="item.sortable" align="center"/>
      </el-table>
    </el-dialog>
  </el-main>
</template>

<script>
import { queryAgents } from '../../api/getAgentUserId'
export default {
  name: 'SingleBluetoothDeviceImport',
  data() {
    const validateChinese = (rule, value, callback) => {
      if (/[\u4e00-\u9fa5]/.test(value)) {
        callback(new Error('生产商标识不能有中文'))
      } else {
        callback()
      }
    }
    return {
      file: null,
      agentnick: '',
      isCanClickModalTag: false,
      infoChecked: false,
      form: {
        agent: '',
        salt: ''
      },
      rules: {
        salt: [
          { required: true, message: '请输入长度为16位的密钥', trigger: 'blur' },
          { min: 16, max: 16, message: '长度为16个字符', trigger: 'blur' },
          { validator: validateChinese, trigger: 'blur' }
        ]
      },
      isCanClickTag: true,
      agentUsers: [],
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
    url() {
      return '/agent/lyyEquipmentBluetooth/import?agentUserId=' + this.form.agent + '&salt=' + this.form.salt
    }
  },
  methods: {
    onUploadSuccess(par) {
      if (par.result === 0) {
        if (par.data.fail) {
          this.failtTest = par.description
          this.failList = par.data.fail
          this.dialogVisible = true
        } else {
          this.$message({
            message: '上传成功',
            type: 'success'
          })
        }
      } else {
        this.$message.error(par.description)
      }
    },
    submitUpload() {
      this.$refs.upload.submit()
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (!this.file) {
            this.$message.error('请选择上传文件！')
            return
          }
          this.$refs.upload.submit()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onBeforeUpload(file) {
      var Xls = file.name.split('.')
      if (Xls[1] === 'xls' || Xls[1] === 'xlsx') {
        return file
      } else {
        this.$message.error('上传文件只能是 xls/xlsx 格式!')
        return false
      }
    },
    onChange(file) {
      this.file = file
    },
    removeFile() {
      this.file = null
    },
    handleSelect(item) {
      this.form.agent = item.agentId
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
