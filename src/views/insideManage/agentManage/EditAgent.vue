<!--suppress ALL -->
<template>
  <div class="content-area bd-manage">
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">基础信息</el-menu-item>
    </el-menu>
    <el-form
      ref="baseInfoRef"
      :model="baseInfo"
      :rules="baseInfo&&baseInfoRules"
      label-width="120px"
      label-position="left"
      style="margin-top: 20px;">
      <el-form-item label="合同编号" prop="num">
        <el-input v-model="baseInfo.num" placeholder="请输入合同编号" class="input-300" maxlength="64"/>
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
      <el-form-item label="BD同事" prop="BD">
        <el-select v-model="baseInfo.BD" :placeholder="`选择一位BD同事`" clearable class="input-300">
          <el-option
            v-for="item in bdList"
            :key="item.id"
            :label="item.username"
            :value="item.adUserId"
            style="text-align: left"/>
        </el-select>
        <span class="input-anno">选择一位BD同事作为跟进负责人</span>
      </el-form-item>
      <el-form-item
        v-if="checkBoxList&&checkBoxList.length>0"
        ref="projectsRef"
        label="经营项目"
        prop="project"
        class="project-checkbox">
        <template v-for="(box, index) in checkBoxList">
          <el-checkbox :key="index" v-model="box.isChecked" :checked="box.isChecked" :label="box.name"/>
        </template>
        <span class="add-project" @click="dialogVisiable = true">+添加经营项目</span>
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
      <el-form-item label="验证设置" prop="codeValidate" class="mb5">
        <el-radio-group v-model="baseInfo.codeValidate">
          <el-radio label="1">需要短信验证码</el-radio>
          <el-radio label="0">不需要短信验证码</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="hint-info-panel">
        <div class="fl">说明：</div>
        <div class="ovh">
          <p>（1）“验证设置” 的短信验证码，是指该一级代理在创建 下级代理、下级商家 的时候，是否需要短信验证码。</p>
          <p>（2）如果勾选了 “不需要短信验证码”，则该一级代理在创建 下级代理、下级商家 的时候，就不需要输入短信验证码。</p>
          <p>（3）为保证用户的信息安全，如非特殊情况，请不要轻易勾选 “不需要短信验证码”。</p>
        </div>
      </div>
      <el-form-item label="数据监控" prop="dataMonitor" class="mb5 mt10">
        <el-radio-group v-model="baseInfo.dataMonitor">
          <el-radio label="0">手动关联</el-radio>
          <el-radio label="1">自动关联</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="hint-info-panel">
        <div class="fl">说明：</div>
        <div class="ovh">
          <p>（1）若勾选了 “手动关联” ，则BD将设备导入给该一级代理后，该一级代理必须在代理后台创建（或绑定）下级商家 ，才能看到的设备的经营数据。</p>
          <p>（2）若勾选了“自动关联”，则该一级代理无需在代理后台手动创建（或绑定）下级商家，只要BD将设备导入给该一级代理，系统就会自动关联并显示下级商家和经营数据。</p>
          <p>（3）为保证用户的信息安全，如非特殊情况，请不要轻易勾选 “自动关联”。</p>
        </div>
      </div>
      <el-form-item label="权限设置" class="checkbox-group-form">
        <el-tree
          ref="tree"
          :data="authSettingList"
          :props="treeProps"
          show-checkbox
          accordion
          node-key="adResourcesId"
          highlight-current/>
      </el-form-item>
      <br>
      <el-button type="primary" @click="handleAccountInfo">保存</el-button>
    </el-form>
    <DialogAgent :visiable="dialogVisiable" :projects="allBusinProjects" @toggle-dialog="toggleDialog"/>
  </div>
</template>
<script>
import { telCheck } from '@/utils/rules'
import insideManage from '@/api/insideManage'
import DialogAgent from './DialogAgent'

export default {
  components: { DialogAgent },
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
        codeValidate: '1',
        dataMonitor: '0',
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
        codeValidate: [
          { required: true }
        ],
        dataMonitor: [
          { required: true }
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
      allBusinProjects: [], // 所有的经营项目
      dialogVisiable: false,
      authSettingList: [],
      treeProps: {
        children: 'menuResourcesList',
        label: 'name'
      },
      adRoleId: ''
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
      await this.getRolesList()
    }
  },
  mounted() {
  },
  methods: {
    getRolesList() {
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys([])
        insideManage.agentManageRoleMapResourcesApi().then((res) => {
          if (res.result === 0) {
            this.authSettingList = res.data.map((v, i) => {
              return {
                ...v
              }
            })
          }
        })
      })
    },
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
          this.getAgentInfo(this.$route.query.id)
        },
        () => {
          this.checkBoxList = []
          this.getAgentInfo(this.$route.query.id)
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
            this.$refs.tree.setCheckedNodes(data.adResourcesDTOS)
            this.adRoleId = data.adRoleSaveParam.adRoleId
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
              acc: data.phone,
              codeValidate: '' + data.issend,
              dataMonitor: '' + data.associatedType
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
        () => {
        }
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
        () => {
        }
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
          const selectedMenu = this.$refs.tree.getCheckedNodes()
          const selectedIDList = []
          selectedMenu.map(item => {
            selectedIDList.push(item.adResourcesId)
          })
          if (selectedIDList.length <= 0) {
            this.$message({
              message: '请设置权限',
              type: 'error'
            })
            return
          }
          if (tempCheckBoxArr.length === 0) {
            this.$message({
              message: '请至少选择一项经营项目!',
              type: 'error'
            })
            return false
          }
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
            loginPhone: info.loginPhone, // 登录账号
            associatedType: Number(info.dataMonitor), // 关联类型  0：手动关联 1：自动关联
            issend: Number(info.codeValidate), // 是否发生验证码  0：不发送 1：发送
            adRoleSaveParam: {
              adResourceIds: selectedIDList,
              adRoleId: this.adRoleId
            }
          }
          this.updataAgentInfo(submitData)
        } else {
          return false
        }
      })
    },
    // 接收从Dialog组件返回的数据
    toggleDialog(data) {
      this.dialogVisiable = data.status
      const res = data.response
      if (res) {
        const newAgentProto = {
          id: res.data,
          isChecked: false,
          name: data.newAgentName
        }
        this.allBusinProjects.push(newAgentProto)
        this.$message({
          message: '添加成功',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .checkbox-group-form {
    margin-top: 20px;

    .el-checkbox {
      display: block;
      margin-left: 0;
      width: 100px;
    }

    .el-checkbox-group {
      margin-left: 30px;
    }
  }

  .project-checkbox {
    .el-checkbox {
      margin-left: 0;
      width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: top;
    }
  }

  .input-300 {
    width: 350px;
  }

  .input-anno {
    margin-left: 20px;
    font-size: 12px;
    color: #b1a8a8;
  }

  .ovh {
    overflow: hidden;
  }

  .fl {
    float: left;
  }

  .mb5 {
    margin-bottom: 5px;
  }

  .mt10 {
    margin-top: 10px;
  }

  .hint-info-panel {
    margin-left: 120px;
    color: #666;
    text-align: justify;
    line-height: 20px;
    font-size: 13px;
    overflow: hidden;
  }

  .add-project {
    font-size: 14px;
    color: #3089dc;
    cursor: pointer;
    margin-left: 10px;
  }
</style>
