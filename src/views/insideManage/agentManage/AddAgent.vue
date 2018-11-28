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
        <el-input v-model="baseInfo.agentUserName" placeholder="请输入代理商名称" class="input-300" maxlength="16"/>
      </el-form-item>
      <el-form-item label="联系人姓名" prop="linkName">
        <el-input v-model="baseInfo.linkName" placeholder="请输入联系人姓名" class="input-300" maxlength="16"/>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="baseInfo.phone" placeholder="请输入手机号" type="number" class="input-300" maxlength="11"/>
      </el-form-item>
      <el-form-item label="联系地址" prop="address">
        <el-input v-model="baseInfo.address" placeholder="请输入联系地址" style="width: 600px;" maxlength="40"/>
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
      <el-form-item v-if="allBusinProjects&&allBusinProjects.length>0" ref="projectsRef" class="project-form" label="经营项目" prop="project">
        <template v-for="(box,index) in allBusinProjects">
          <el-checkbox :key="index" v-model="box.isChecked" :checked="box.isChecked" :label="box.name"/>
        </template>
        <br>
        <!-- el-form-item__error -->
        <span class="input-anno " style="position: absolute;left: 0;bottom: -100%;transition: all 0.2s linear;">请选择至少一个经营项目.</span>
      </el-form-item>
      <br>
      <!-- 账号信息区域 -->
      <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">账号信息</el-menu-item>
      </el-menu>
      <br>
      <br>
      <el-form-item label="代理账号" prop="phone">
        <el-input
          v-model="baseInfo.loginPhone"
          placeholder="请输入手机号"
          type="number"
          class="input-300"
          maxlength="11"/>
        <!--<span class="input-anno">请输入手机号码，如果客户此前有注册乐摇摇商家账号，请输入相同的号码。</span>-->
        <span class="input-anno">代理账号设置后，不可修改。</span>
      </el-form-item>
      <!--<el-form-item label="关联商家">-->
      <!--<div style="" v-html="restaurants"/>-->
      <!--</el-form-item>-->
      <br>
      <p style="margin: 10px;padding-bottom:10px;color: red;">{{ `注意：如果该账号未注册，则会直接开通注册，初始密码为16881688，请提醒及时修改密码。` }}</p>
      <el-button type="primary" @click="handleAccountInfo">创建</el-button>
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
        phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }, { validator: telCheck, trigger: 'input' }],
        address: [{ required: true, message: '请输入联系地址', trigger: 'blur' }],
        BD: [{ required: true, message: '请输入一位BD同事', trigger: 'change' }],
        // project: { type: 'array', required: true, message: '请输入至少一个经营项目', trigger: 'change' },
        // project: [{ required: true, type: 'array', message: '请输入至少一个经营项目', trigger: 'change' }],
        loginPhone: [
          { required: true, message: '请输入正确的账号', trigger: 'blur' },
          { validator: telCheck, trigger: 'input' }
        ],
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
      showProjectTips: false, // 经营项目提示
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
      if (!phone || phone === '') {
        return false
      }
      if (phone.length < 11) {
        return false
      }
      insideManage.getShanghuInfo(phone).then(res => {
        if (res && res.data) {
          this.restaurants = `${res.data.name || null}</br>`
          this.linkUserId = res.data.adUserId
        } else {
          this.restaurants = `该手机号码未注册!`
          this.linkUserId = ''
        }
      }, () => {
        this.linkUserId = ''
        if (this.baseInfo.account === '') {
          this.restaurants = ''
        } else {
          this.restaurants = ''
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
      insideManage.addAgentInfo(submitData).then(res => {
        if (res) {
          this.$message({
            message: '新增成功!',
            type: 'success'
          })
          setTimeout(() => {
            this.$router.push({ path: 'insideManage/agentRoleList' })
          }, 2000)
        }
      }, () => {
        return false
      })
    },
    handleAccountInfo() {
      if (this.projects.length === 0) {
        this.$message({
          message: '请至少选择一项经营项目!',
          type: 'error'
        })
        return false
      }
      this.$refs['baseInfoRef'].validate(valid => {
        if (valid) {
          const info = this.baseInfo
          const tempCheckBoxArr = []
          if (this.checkBoxList && this.checkBoxList.length > 1) {
            this.checkBoxList.map(item => {
              if (item.isChecked) {
                tempCheckBoxArr.push(item.id)
              }
            })
          }
          const submitData = {
            type: 1, // 0:BD用户 1:一级代理商  2:子级代理商
            loginPhone: info.loginPhone, // 登录账号
            code: '', // 短信验证码
            contractId: info.contractId, // 合同号
            agentUserName: info.agentUserName, // 代理商名称
            linkName: info.linkName, // 联系人姓名
            phone: info.phone, // 手机号
            address: info.address, // 联系地址
            bdId: info.BD, // BD同事ID
            linkUserId: this.linkUserId, // 关联商户 id
            agentBusinessIds: this.projects, // 经营项目
            agentUserId: info.agentUserId // 代理商Id，修改时使用
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

<style lang="scss" scoped>
  .input-300 {
    width: 350px;
  }
  .project-form{
    position: relative;
  }
  .project-form label.el-form-item__label{
    padding: 0 12px 0 0;
    box-sizing: border-box;
    &::before{
      content: '*';
      color: red;
      margin-right: 4px;
      position: absolute;
      font-weight: 700;
      transform: translate3d(50%,50%,0);
      /*top: 0;*/
    }
  }

  .input-anno {
    margin-left: 20px;
    font-size: 12px;
    color: #b1a8a8;
  }
</style>
