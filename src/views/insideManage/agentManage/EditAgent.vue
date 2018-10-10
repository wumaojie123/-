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
        <!--<el-input v-model="accountInfo.acc" placeholder="请输入关联商家" class="input-300" maxlength="32" />-->
        <el-autocomplete
          v-model="accountInfo.acc"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          class="inline-input"
          placeholder="请输入关联商家"
          @select="handleSelect"
        />
        <span class="input-anno">请输入手机号码，选中对应的账号进行绑定</span>
      </el-form-item>
      <br>
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
        acc: [{ required: true, message: '请输入手机号码', trigger: 'blur' }, { validator: telCheck, trigger: 'blur' }]
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
      ],
      restaurants: []
    }
  },
  mounted() {
    this.restaurants = [{ 'value': '13177006613', 'address': '长宁区新渔路144号' },
      { 'value': '13177006613', 'address': '上海市长宁区淞虹路661号' },
      { 'value': '18306661807', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113' },
      { 'value': '18306662807', 'address': '天山西路438号' },
      { 'value': '12306662807', 'address': '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
      { 'value': '贡茶', 'address': '上海市长宁区金钟路633号' },
      { 'value': '豪大大香鸡排超级奶爸', 'address': '上海市嘉定区曹安公路曹安路1685号' },
      { 'value': '茶芝兰（奶茶，手抓饼）', 'address': '上海市普陀区同普路1435号' },
      { 'value': '十二泷町', 'address': '上海市北翟路1444弄81号B幢-107' },
      { 'value': '星移浓缩咖啡', 'address': '上海市嘉定区新郁路817号' },
      { 'value': '阿姨奶茶/豪大大', 'address': '嘉定区曹安路1611号' },
      { 'value': '新麦甜四季甜品炸鸡', 'address': '嘉定区曹安公路2383弄55号' },
      { 'value': 'Monica摩托主题咖啡店', 'address': '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F' },
      { 'value': '浮生若茶（凌空soho店）', 'address': '上海长宁区金钟路968号9号楼地下一层' },
      { 'value': 'NONO JUICE  鲜榨果汁', 'address': '上海市长宁区天山西路119号' },
      { 'value': 'CoCo都可(北新泾店）', 'address': '上海市长宁区仙霞西路' },
      { 'value': '快乐柠檬（神州智慧店）', 'address': '上海市长宁区天山西路567号1层R117号店铺' },
      { 'value': 'Merci Paul cafe', 'address': '上海市普陀区光复西路丹巴路28弄6号楼819' },
      { 'value': '猫山王（西郊百联店）', 'address': '上海市长宁区仙霞西路88号第一层G05-F01-1-306' },
      { 'value': '枪会山', 'address': '上海市普陀区棕榈路' },
      { 'value': '纵食', 'address': '元丰天山花园(东门) 双流路267号' },
      { 'value': '钱记', 'address': '上海市长宁区天山西路' },
      { 'value': '壹杯加', 'address': '上海市长宁区通协路' },
      { 'value': '唦哇嘀咖', 'address': '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元' },
      { 'value': '爱茜茜里(西郊百联)', 'address': '长宁区仙霞西路88号1305室' }
    ]
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
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item) {
      console.log(item)
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
