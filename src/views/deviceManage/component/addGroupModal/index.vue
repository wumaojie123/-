<template lang="html">
  <el-dialog
    :visible.sync="visible"
    :before-close="cancel"
    title="添加投放场地"
    class="add-group-modal"
    width="450px"
    destroy-on-close
    center
    @close="cancel"
  >
    <el-form :model="form">
      <el-form-item :label-width="formLabelWidth" label="场地名称">
        <el-input v-model="form.groupName" autocomplete="off" placeholder="请输入场地名称"/>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="所属地区">
        <el-cascader
          v-model="form.zone"
          :options="areaList.filter(v=>v.value!=-1)"
          :change-on-select="true"
          :props="cascaderProps"
          filterable
          placeholder="请输入所属地区"
          @change="districtChange"/>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="详细地址">
        <el-input v-model="form.address" autocomplete="off" placeholder="请输入详细地址"/>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="地址类型">
        <el-select
          v-model="form.addressType"
          filterable
          placeholder="请选择"
          @change="changeAddressType">
          <el-option
            v-for="item in addressType"
            :key="item.value"
            :label="item.name"
            :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label-width="155px" label="设为默认投放场地">
        <el-switch v-model="form.isDefault"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { addressType } from '../../constant'
  import { factorySaveEquipmentGroupApi } from '@/api/device'

  export default {
    mixins: [],
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      distributorId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        addressType,
        form: {
          groupName: '',
          address: '',
          isDefault: false,
          zone: [],
          addressType: '',
          groupId: ''
        },
        formLabelWidth: '100px',
        cascaderProps: {
          value: 'value',
          label: 'text'
        }
      }
    },
    computed: {
      ...mapGetters(['areaList'])
    },
    methods: {
      changeAddressType(value) {
        this.form.addressType = value
      },
      districtChange(val) {
        this.form.zone = val
      },
      async confirm() {
        this.form.districtId = this.form.zone[2]
        this.form.lyyDistributorId = this.distributorId
        const res = await factorySaveEquipmentGroupApi(this.form)
        if (res.result === 0) {
          this.form = {
            groupName: '',
            address: '',
            isDefault: false,
            zone: [],
            addressType: '',
            groupId: ''
          }
          this.$emit('confirmAddGroupName')
        } else {
          this.$message({ message: res.description || '添加场地失败', type: 'error' })
        }
      },
      cancel() {
        this.$emit('closeAddGroupModal')
      }
    }
  }
</script>

<style lang="less" scoped>
  .add-group-modal {
    .el-cascader {
      width: 100%;
    }

    .el-select {
      width: 100%;
    }
  }
</style>
