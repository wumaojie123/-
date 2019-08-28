<template>
  <!-- 菜单对话框配置 -->
  <el-dialog :visible.sync="dialogFormVisible" title="编辑套餐服务" width="45%">
    <el-radio v-for="(item, index) in deviceMapInfo" v-model="menuType" :key="index" :label="index" style="display:block;margin-left: 30px!important;">
      <span class="">{{ item.title }}</span>
      <div class="radio-wrap">
        <span class="title-desc"> {{ item.desc }}</span>
      </div>
    </el-radio>
    <el-radio v-model="menuType" label="4">
      <span class="">自定义菜单</span>
    </el-radio>
    <el-form ref="baseInfoRules" :model="modalData" :rules="baseInfoRules" label-width="120px" label-position="right" style="margin-top: 20px;" >
      <el-form-item label="菜单名称" prop="description">
        <el-input :disabled="menuType !== '4'" placeholder="请输入菜单名称" class="input-300" maxlength="10"/>
      </el-form-item>
      <el-form-item label="菜单链接" prop="price">
        <el-input :disabled="menuType !== '4'" placeholder="请输入菜单链接" type="text" class="input-300" maxlength="16" clearable/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary">保存并使用</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { DeviceMap } from '../constant'

export default {
  props: {
    deviceType: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    },
    actionType: {
      type: String,
      default: 'add'
    },
    menuList: {
      type: Array,
      default: () => []
    },
    appId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      deviceMapInfo: DeviceMap[this.deviceType],
      modalData: {},
      menuType: '',
      dialogFormVisible: true,
      baseInfoRules: {}
    }
  },
  watch: {
    deviceType(val) {
      console.log('val', val)
      this.deviceMapInfo = DeviceMap[val]
    },
    value(val) {
      this.dialogFormVisible = val
    }
  },
  methods: {
    handleSave() {

    }
  }
}
</script>
