<!--suppress ALL -->
<template>
  <div class="content-area bd-manage">
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">基础信息</el-menu-item>
    </el-menu>
    <el-form
      ref="baseInfoRef"
      :model="baseInfo"
      :rules="baseInfoRules"
      label-width="120px"
      label-position="left"
      style="margin-top: 20px;">
      <el-form-item label="合同编号" prop="contractId">
        <el-input v-model="baseInfo.contractId" placeholder="请输入合同编号" class="input-300" maxlength="64"/>
      </el-form-item>
      <el-form-item label="代理商名称" prop="agentUserName">
        <el-input v-model="baseInfo.agentUserName" placeholder="请输入代理商名称" class="input-300" maxlength="64"/>
      </el-form-item>
      <el-form-item label="联系人姓名" prop="linkName">
        <el-input v-model="baseInfo.linkName" placeholder="请输入联系人姓名" class="input-300" maxlength="32"/>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="baseInfo.phone" placeholder="请输入手机号" type="number" class="input-300" maxlength="11"/>
      </el-form-item>
      <el-form-item label="联系地址" prop="address">
        <el-input v-model="baseInfo.address" placeholder="请输入联系地址" style="width: 600px;" maxlength="256"/>
      </el-form-item>
      <el-form-item v-if="bdList" label="BD同事" prop="BD">
        <el-select v-model="baseInfo.BD" :placeholder="`选择一位BD同事`" clearable class="input-300">
          <el-option
            v-for="item in bdList"
            :key="item.adUserId"
            :label="item.username"
            :value="item.adUserId"
            style="text-align: left"/>
        </el-select>
        <span class="input-anno">选择一位BD同事作为跟进负责人</span>
      </el-form-item>
      <el-form-item v-if="allBusinProjects&&allBusinProjects.length>0" ref="projectsRef" label="经营项目" prop="project">
        <template v-for="(box,index) in allBusinProjects">
          <el-checkbox :key="index" v-model="box.isChecked" :checked="box.isChecked" :label="box.name"/>
        </template>
      </el-form-item>

      <br>
      <!-- 账号信息区域 -->
      <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">账号信息</el-menu-item>
      </el-menu>
      <br>
      <br>
      <el-form-item label="代理商登录账号" prop="phone">
        <el-input
          v-model="baseInfo.loginPhone"
          placeholder="请输入手机号"
          type="number"
          class="input-300"
          maxlength="11"
          @blur="accountOnBlur"/>
        <span class="input-anno">请输入手机号码，如果客户此前有注册乐摇摇商家账号，请输入相同的号码。</span>
      </el-form-item>
      <el-form-item label="关联商家">
        <div style="">{{ restaurants || '未找到此账号!' }}</div>
      </el-form-item>
      <br>
      <el-button type="primary" @click="handleAccountInfo">保存</el-button>
    </el-form>
  </div>
</template>

<script>
import { telCheck } from '@/utils/rules'
import insideManage from '@/api/insideManage'

export default {
  data() {
    return {
      baseInfo: {
        contractId: '',
        agentUserId: null,
        agentUserName: '',
        linkName: '',
        phone: '',
        address: '',
        BD: '',
        projects: [],
        account: '',
        password: '',
        acc: ''
      },
      baseInfoRules: {
        contractId: [{ required: true, message: '请输入合同号', trigger: 'blur' }],
        agentUserName: [{ required: true, message: '请输入代理商名称', trigger: 'blur' }],
        linkName: [{ required: true, message: '请输入联系人姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }, { validator: telCheck, trigger: 'blur' }],
        address: [{ required: true, message: '请输入联系地址', trigger: 'blur' }],
        BD: [{ required: true, message: '请输入一位BD同事', trigger: 'change' }],
        // project: { type: 'array', required: true, message: '请输入至少一个经营项目', trigger: 'change' },
        project: [{ required: false, type: 'array', message: '请输入至少一个经营项目', trigger: 'change' }],
        loginPhone: [{ required: true, message: '请输入登录账号', trigger: 'blur' }, {
          validator: telCheck,
          trigger: 'blur'
        }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '请输入6-16位的数字或字母', trigger: 'blur' }
        ]
      },
      bdList: [],
      restaurants: '',
      checkBoxList: null,
      linkUserId: null,
      agentProject: [],
      allBusinProjects: [] // 所有的经营项目
    }
  },
  computed: {
    projects() {
      const temArr = []
      this.allBusinProjects && this.allBusinProjects.map(item => {
        if (item.isChecked) {
          temArr.push(item.id)
        }
      })
      return temArr
    }
  },
  async created() {
    await this.getBDList()
    await this.getBusinProjects()
  },
  methods: {
    checkChange() {
      this.$nextTick(function() {
        this.$refs['baseInfoRef'].clearValidate(['preject'])
      })
    },
    getBDList() {
      insideManage.getBDList().then(res => {
        if (res && res.data) {
          this.bdList = res.data
        }
      }, () => {
        this.bdList = []
      })
    },
    getBusinProjects(id) { // 获取经营项目
      insideManage.getBusinProjects().then(res => {
        const data = res.data
        if (data instanceof Array) {
          this.allBusinProjects = data.map((item, index) => {
            return {
              name: item.name,
              id: item.agentBusinessId,
              isChecked: false
            }
          })
          this.$nextTick(function() {
            this.$refs['baseInfoRef'].resetFields()
          })
        } else {
          this.checkBoxList = []
          this.$nextTick(function() {
            this.$refs['baseInfoRef'].resetFields()
          })
        }
      }, () => {
        this.checkBoxList = []
      })
    },
    accountOnBlur() {
      // 调用 callback 返回建议列表的数据
      const phone = this.baseInfo.loginPhone
      insideManage.getShanghuInfo(phone).then(res => {
        if (res && res.data) {
          this.restaurants = `${res.data.phone || ''} (${res.data.name || null})`
          this.linkUserId = res.data.adUserId
        } else {
          this.linkUserId = ''
          if (phone === '') {
            this.restaurants = ''
          } else {
            this.restaurants = '不存在此账号,可注册!'
          }
        }
      }, () => {
        this.linkUserId = ''
        if (this.baseInfo.account === '') {
          this.restaurants = ''
        } else {
          this.restaurants = '不存在此账号,可注册!'
        }
      })
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    // 获取代理商信息
    projectHandler(arr, id) {
      const temp = []
      if (arr && arr.length > 0) {
        arr.map(item => {
          if (item.agentBusinessId === id) {
            temp.push(item.name)
          }
        })
      } else {
        return []
      }
      return temp
    },

    // 获取代理商信息
    updataAgentInfo(submitData) {
      insideManage.updateAgentInfo(submitData).then(res => {
        if (res) {
          this.$router.push({ name: 'oneAgentsList' })
        }
      }, () => {
        return false
      })
    },
    handleAccountInfo() {
      // todo 处理数据
      this.$refs['baseInfoRef'].validate(valid => {
        console.log(valid, 'valid')
        if (valid) {
          console.log(valid, 'alert(valid)')
          const info = this.baseInfo
          console.log(this.checkBoxList, '--checkBoxList--')
          // info.projects =
          const tempCheckBoxArr = []
          if (this.checkBoxList && this.checkBoxList.length > 1) {
            this.checkBoxList.map(item => {
              if (item.isChecked) {
                tempCheckBoxArr.push(item.id)
              }
            })
          }
          console.log(info, '-表单的信息-')
          const submitData = {
            type: 1, // 0:BD用户 1:一级代理商  2:子级代理商
            code: '', // 短信验证码
            agentUserId: info.agentUserId, // 代理商Id，修改时使用
            contractId: info.contractId, // 合同号
            agentUserName: info.agentUserName, // 代理商名称
            linkName: info.linkName, // 联系人姓名
            phone: info.phone, // 手机号
            address: info.address, // 联系地址
            bdId: info.BD, // BD同事ID
            loginPhone: info.loginPhone, // 登录账号
            agentBusinessIds: this.projects, // 经营项目
            linkUserId: this.linkUserId // 关联商户 id
          }
          this.updataAgentInfo(submitData)
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .input-300 {
    width: 350px;
  }

  .input-anno {
    margin-left: 20px;
    font-size: 12px;
    color: #b1a8a8;
  }
</style>
