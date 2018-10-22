<template>
  <el-main>
    <el-alert :title="message" :closable="false" type="warning" class="info" />
    <el-form ref="form" :model="form" label-width="90px" class="deviceForm" style="padding: 16px 0;">
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
                v-for="item in equipmentTypesArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-upload
        ref="upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false"
        class="upload-demo"
        action=""
      >
        <el-row slot="trigger">
          <el-col>
            <el-button size="small" type="primary">选取文件</el-button>
          </el-col>
          <el-col>
            <ul class="el-upload-list el-upload-list--text" />
          </el-col>
        </el-row>
        <div style="padding: 8px;"/>
        <el-button size="small" type="success" @click="submitUpload">确定上传</el-button>
      </el-upload>
      <!--<el-row>
        <el-col :span="3">
          <el-button type="primary">选择txt文件</el-button>
        </el-col>
        <el-col :span="20">
          <div class="file-list">
            www
          </div>
        </el-col>
      </el-row>-->
    </el-form>
  </el-main>
</template>

<script>
export default {
  name: 'DevicesImport',
  data() {
    return {
      fileList: [],
      form: {
        equipmentTypes: '',
        agent: ''
      },
      equipmentTypesArr: [
        {
          value: '娃娃机',
          label: '娃娃机'
        },
        {
          value: '按摩椅',
          label: '按摩椅'
        },
        {
          value: '洗衣机',
          label: '洗衣机'
        }
      ],
      message: '请将设备注册编号放入txt文档，每一行代表一个设备编号，如果编号未被绑定注册或待调拨，导入将成功，反之，则将失败。注意：Excel的数据可以直接复制到txt文档中。'
    }
  },
  methods: {
    handleRemove() {},
    handlePreview() {},
    submitUpload() {}
  }
}
</script>
<style scoped>

</style>
