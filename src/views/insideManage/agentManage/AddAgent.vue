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
      <el-form-item
        v-if="allBusinProjects&&allBusinProjects.length>0"
        ref="projectsRef"
        class="project-form"
        label="经营项目"
        prop="project">
        <template v-for="(box,index) in allBusinProjects">
          <el-checkbox :key="index" v-model="box.isChecked" :checked="box.isChecked" :label="box.name"/>
        </template>
        <span class="add-project" @click="dialogVisiable = true">+添加经营项目</span>
        <span class="input-anno " style="color: red;">此处的经营项目是记录该代理的经营范围，仅作为记录用途。</span>
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
          <p>
            （1）若勾选了 “手动关联” ，则BD将设备导入给该一级代理后，
            该一级代理必须在代理后台创建（或绑定）下级商家 ，才能看到的设备的经营数据。
          </p>
          <p>
            （2）若勾选了“自动关联”，则该一级代理无需在代理后台手动创建（或绑定）下级商家，
            只要BD将设备导入给该一级代理，系统就会自动关联并显示下级商家和经营数据。
          </p>
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
      <p style="margin: 10px;padding-bottom:10px;color: red;">
        {{ `注意：如果该账号未注册，则会直接开通注册，初始密码为16881688，请提醒及时修改密码。` }}
      </p>
      <el-button type="primary" @click="handleAccountInfo">创建</el-button>
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
        contractId: '',
        agentUserId: null,
        agentUserName: '',
        linkName: '',
        phone: '',
        address: '',
        BD: '',
        codeValidate: '1',
        dataMonitor: '0',
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
        codeValidate: [
          { required: true }
        ],
        dataMonitor: [
          { required: true }
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
      allBusinProjects: [], // 所有的经营项目
      dialogVisiable: false,
      authSettingList: [],
      treeProps: {
        children: 'menuResourcesList',
        label: 'name'
      }
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
    await this.getDefaultCheckedList()
    await this.getRolesList()
    console.log('--log--:', 520)
  },
  methods: {
    getDefaultCheckedList() {
      insideManage.agentManageListDefaultMenuApi().then((res) => {
        if (res.result === 0) {
          this.$refs.tree.setCheckedNodes(res.data)
        }
      })
    },
    getRolesList() {
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys([])
        insideManage.agentManageRoleMapResourcesApi().then((res) => {
          if (res.result === 0) {
            this.authSettingList = res.data
          }
        })
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
            agentUserId: info.agentUserId, // 代理商Id，修改时使用
            associatedType: Number(info.dataMonitor), // 关联类型  0：手动关联 1：自动关联
            issend: Number(info.codeValidate), // 是否发生验证码  0：不发送 1：发送
            adRoleSaveParam: {
              adResourceIds: selectedIDList
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
  .input-300 {
    width: 350px;
  }

  .checkbox-group-form {
    margin-top: 20px;
  }

  .project-form {
    position: relative;

    .el-checkbox {
      margin-left: 0;
      width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: top;
    }
  }

  .project-form label.el-form-item__label {
    padding: 0 12px 0 0;
    box-sizing: border-box;

    &::before {
      content: '*';
      color: red;
      margin-right: 4px;
      position: absolute;
      font-weight: 700;
      transform: translate3d(50%, 50%, 0);
    }
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
    display: block;
    font-size: 14px;
    color: #3089dc;
    cursor: pointer;
  }
</style>
