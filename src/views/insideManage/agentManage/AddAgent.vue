<template>
  <div class="content-area">
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">基础信息</el-menu-item>
    </el-menu>
    <el-form ref="baseInfoRef" :model="baseInfo" :rules="baseInfoRules" label-width="120px" label-position="left" style="margin-top: 20px;">
      <el-form-item label="代理商名称" prop="angentName">
        <el-input v-model="baseInfo.angentName" placeholder="请输入代理商名称" class="input-300" maxlength="64" />
      </el-form-item>
      <el-form-item label="联系人姓名" prop="name">
        <el-input v-model="baseInfo.name" placeholder="请输入联系人姓名" class="input-300" maxlength="32" />
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="baseInfo.phone" placeholder="请输入手机号" type= "number" class="input-300" maxlength="11" />
      </el-form-item>
      <el-form-item label="联系地址" prop="address">
        <el-input v-model="baseInfo.address" placeholder="请输入联系地址" style="width: 600px;" maxlength="256" />
      </el-form-item>
      <el-form-item label="BD同事" prop="BD">
        <el-select v-model="baseInfo.BD" :placeholder="`选择一位BD同事作为跟进负责人`" clearable class="input-300" >
          <el-option v-for="item in bdList" :key="item.id" :label="item.name" :value="item.id" style="text-align: left"/>
        </el-select>
      </el-form-item>
      <el-form-item label="经营项目" prop="project">
        <el-checkbox-group v-model="baseInfo.projects" >
          <el-checkbox v-for="box in checkBoxList" :label="box.name" :key="box.id" name="type"/>
        </el-checkbox-group>
      </el-form-item>
      <br>
      <el-button type="primary" @click="handleBaseInfo">保存</el-button>
    </el-form>
    <!-- 账号信息区域 -->
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">账号信息</el-menu-item>
    </el-menu>
    <el-form ref="accountInfoRef" :model="accountInfo" :rules="accountInfoRules" style="margin-top: 20px;" label-width="120px" label-position="left">
      <el-form-item label="代理商登录账号" prop="account">
        <el-input v-model="accountInfo.account" placeholder="请输入代理商账号" class="input-300" maxlength="11" />
        <span class="input-anno">请输入与商家账号一致的手机号码，保持账号的一致性</span>
      </el-form-item>
      <el-form-item label="登录密码" prop="password">
        <el-input v-model="accountInfo.password" type="password" placeholder="请输入登录密码" class="input-300" maxlength="16" />
        <span class="input-anno">请输入6-16位的数字或字母作为密码</span>
      </el-form-item>
      <el-form-item label="关联商家" prop="acc">
        <el-input v-model="accountInfo.acc" placeholder="请输入关联商家" class="input-300" maxlength="32" />
        <span class="input-anno">请输入手机号码，选中对应的账号进行绑定</span>
      </el-form-item>
      <p/>
      <el-button type="primary" @click="handleAccountInfo">保存</el-button>
    </el-form>
  </div>
</template>

<script>
import { telCheck } from '@/utils/rules'
export default {
  data() {
    return {
      baseInfo: { angentName: '', name: '', phone: '', address: '', BD: '', projects: [] },
      baseInfoRules: {
        angentName: [{ required: true, message: '请输入代理商名称', trigger: 'blur' }],
        name: [{ required: true, message: '请输入联系人姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }, { validator: telCheck, trigger: 'blur' }],
        address: [{ required: true, message: '请输入联系地址', trigger: 'blur' }],
        BD: [{ required: true, message: '请输入一位BD同事', trigger: 'change' }],
        project: [{ type: 'array', required: true, message: '请输入至少一个经营项目', trigger: 'change' }]
      },
      accountInfo: { account: '', password: '', acc: '' },
      accountInfoRules: {
        account: [{ required: true, message: '请输入代理商名称', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '请输入6-16位的数字或字母', trigger: 'blur' }
        ],
        acc: [{ required: true, message: '请输入手机号码', trigger: 'blur' }]
      },
      bdList: [
        {
          name: 'aaa',
          id: 1
        },
        {
          name: 'bbbb',
          id: 2
        },
        {
          name: 'cccc',
          id: 3
        }
      ],
      checkBoxList: [
        {
          name: '按摩1',
          id: 0,
          isCheck: false
        },
        {
          name: '按摩2',
          id: 1,
          isCheck: false
        },
        {
          name: '按摩3',
          id: 2,
          isCheck: true
        }
      ]
    }
  },
  methods: {
    handleBaseInfo() {
      // todo 保存信息
      this.$refs['baseInfoRef'].validate(valid => {
        if (valid) {
          alert(valid)
        } else {
          return false
        }
      })
    },
    handleAccountInfo() {
      // todo 处理数据
      this.$refs['accountInfoRef'].validate(valid => {
        if (valid) {
          alert(valid)
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style>
  .input-300{
    width: 300px;
  }
  .input-anno{
    margin-left: 20px;
    font-size: 12px;
    color:#b1a8a8;
  }
</style>
