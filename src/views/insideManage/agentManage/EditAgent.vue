<!--suppress ALL -->
<template>
  <div class="content-area bd-manage">
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">基础信息</el-menu-item>
    </el-menu>
    <el-form ref="baseInfoRef" :model="baseInfo" :rules="baseInfo&&baseInfoRules" label-width="120px" label-position="left" style="margin-top: 20px;">
      <el-form-item label="合同编号" prop="num">
        <el-input v-model="baseInfo.num" placeholder="请输入合同编号" class="input-300" maxlength="64" />
      </el-form-item>
      <el-form-item label="代理商名称" prop="agentUserName">
        <el-input v-model="baseInfo.agentUserName" placeholder="请输入代理商名称" class="input-300" maxlength="64" />
      </el-form-item>
      <el-form-item label="联系人姓名" prop="linkName">
        <el-input v-model="baseInfo.linkName" placeholder="请输入联系人姓名" class="input-300" maxlength="32" />
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="baseInfo.phone" placeholder="请输入手机号" type="number" class="input-300" maxlength="11" />
      </el-form-item>
      <el-form-item label="联系地址" prop="address">
        <el-input v-model="baseInfo.address" placeholder="请输入联系地址" style="width: 600px;" maxlength="256" />
      </el-form-item>
      <el-form-item label="BD同事" prop="BD">
        <el-select v-model="baseInfo.BD" :placeholder="`选择一位BD同事`" clearable class="input-300">
          <el-option v-for="item in bdList" :key="item.id" :label="item.username" :value="item.adUserId" style="text-align: left" />
        </el-select>
        <span class="input-anno">选择一位BD同事作为跟进负责人</span>
      </el-form-item>
      <el-form-item v-if="checkBoxList&&checkBoxList.length>0" ref="projectsRef" label="经营项目" prop="project">
        <template v-for="(box, index) in checkBoxList">
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
      <el-form-item label="代理账号" prop="account">
        <el-input
          v-model="baseInfo.loginPhone"
          :placeholder="baseInfo.loginPhone"
          :disabled="true"
          type="number"
          class="input-300"/>
        <span class="input-anno">账号暂不支持修改。</span>
      </el-form-item>
      <!--<el-form-item label="关联商家">-->
      <!--<div style="">{{ restaurants || '未找到此账号!' }}</div>-->
      <!--</el-form-item>-->
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
        num: '',
        agentUserName: '',
        linkName: '',
        phone: '',
        address: '',
        BD: '',
        agentUserId: '',
        loginPhone: '',
        password: '',
        account: '',
        acc: ''
      },
      baseInfoRules: {
        num: [
          {
            required: true,
            message: '请输入代理商名称',
            trigger: 'blur'
          }
        ],
        agentUserName: [
          {
            required: true,
            message: '请输入代理商名称',
            trigger: 'blur'
          }
        ],
        linkName: [
          {
            required: true,
            message: '请输入联系人姓名',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: '请输入手机号码',
            trigger: 'blur'
          },
          {
            validator: telCheck,
            trigger: 'blur'
          }
        ],
        address: [
          {
            required: true,
            message: '请输入联系地址',
            trigger: 'blur'
          }
        ],
        BD: [
          {
            required: true,
            message: '请输入一位BD同事',
            trigger: 'change'
          }
        ],
        // project: { type: 'array', required: true, message: '请输入至少一个经营项目', trigger: 'change' },
        project: [
          {
            required: false,
            type: 'array',
            message: '请输入至少一个经营项目',
            trigger: 'change'
          }
        ],
        loginPhone: [
          {
            required: true,
            message: '请输入登录账号',
            trigger: 'blur'
          },
          {
            validator: telCheck,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 16,
            message: '请输入6-16位的数字或字母',
            trigger: 'blur'
          }
        ],
        acc: [
          {
            required: false,
            message: '请输入手机号码',
            trigger: 'blur'
          },
          {
            validator: telCheck,
            trigger: 'blur'
          }
        ]
      },
      bdList: [],
      restaurants: '',
      checkBoxList: null,
      agentProject: [],
      allBusinProjects: [] // 所有的经营项目
    }
  },
  computed: {
    checkedProjects() {
      const temArr = []
      this.baseInfo.projects.map(item => {
        this.checkBoxList.map(ele => {
          if (item === ele.name) {
            temArr.push(ele.id)
          }
        })
      })
      return temArr
    }
  },
  async created() {
    if (this.$route.query.id) {
      await this.getBDList()
      await this.getBusinProjects()
      await this.getAgentInfo(this.$route.query.id)
    }
  },
  mounted() {},
  methods: {
    checkChange() {
      this.$nextTick(function() {
        this.$refs['baseInfoRef'].clearValidate(['preject'])
      })
    },
    getBDList() {
      insideManage.getBDList().then(
        res => {
          if (res && res.data) {
            this.bdList = res.data
          }
        },
        () => {
          this.bdList = []
        }
      )
    },
    getBusinProjects(id) {
      // 获取经营项目
      insideManage.getBusinProjects().then(
        res => {
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
        },
        () => {
          this.checkBoxList = []
        }
      )
    },
    accountOnBlur() {
      // 调用 callback 返回建议列表的数据
      // const phone = this.baseInfo.loginPhone
      // insideManage.getShanghuInfo(phone).then(
      //   res => {
      //     if (res && res.data) {
      //       this.restaurants = `${res.data.name || null})`
      //     } else {
      //       if (this.baseInfo.account === '') {
      //         this.restaurants = ''
      //       } else {
      //         this.restaurants = '不存在此账号!'
      //       }
      //     }
      //   },
      //   () => {
      //     if (this.baseInfo.account === '') {
      //       this.restaurants = ''
      //     } else {
      //       this.restaurants = '不存在此账号!'
      //     }
      //   }
      // )
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    // 获取代理商信息
    getAgentInfo(id) {
      this.baseInfo.agentUserId = id
      insideManage.getAgentInfo(id).then(
        res => {
          const data = res && res.data
          if (data) {
            this.baseInfo = {
              num: data.contractId,
              agentUserName: data.agentUserName,
              linkName: data.linkName,
              phone: data.phone,
              address: data.address,
              BD: data.bdId,
              agentUserId: data.agentUserId,
              loginPhone: data.loginPhone,
              password: '',
              acc: data.phone
            }
            this.agentProject = data.agentBusiness
            // this.accountOnBlur()
            const tempArr = []
            this.allBusinProjects &&
              this.allBusinProjects.length > 0 &&
              this.allBusinProjects.map(item => {
                this.agentProject &&
                  this.agentProject.map(ele => {
                    if (ele.agentBusinessId === item.id) {
                      item.isChecked = true
                    }
                  })
                tempArr.push(item)
              })
            this.checkBoxList = tempArr
          }
        },
        () => {}
      )
    },
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
      insideManage.updateAgent(submitData).then(
        res => {
          if (res) {
            this.$message({
              message: '修改成功!',
              type: 'success'
            })
            setTimeout(() => {
              this.tips = ''
              this.$router.push({ path: 'insideManage/agentRoleList' })
            }, 500)
          }
        },
        () => {}
      )
    },
    handleAccountInfo() {
      this.$refs['baseInfoRef'].validate(valid => {
        if (valid) {
          const info = this.baseInfo
          // info.projects =
          const tempCheckBoxArr = []
          if (this.checkBoxList && this.checkBoxList.length > 1) {
            this.checkBoxList.map(item => {
              if (item.isChecked) {
                tempCheckBoxArr.push(item.id)
              }
            })
          }
          if (tempCheckBoxArr.length === 0) {
            this.$message({
              message: '请至少选择一项经营项目!',
              type: 'error'
            })
            return false
          }
          console.log(info, '-表单的信息-')
          const submitData = {
            // type: 1, // 0:BD用户 1:一级代理商  2:子级代理商
            // code: '', // 短信验证码
            contractId: info.num, // 合同号
            agentUserName: info.agentUserName, // 代理商名称
            linkName: info.linkName, // 联系人姓名
            phone: info.phone, // 手机号
            address: info.address, // 联系地址
            agentUserId: info.agentUserId, // 代理商Id，修改时使用
            bdId: info.BD, // BD同事ID
            agentBusinessIds: tempCheckBoxArr, // 经营项目
            loginPhone: info.password // 登录账号
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
