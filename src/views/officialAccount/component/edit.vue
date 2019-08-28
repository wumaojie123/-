<template>
  <div>
    <section v-for="(item, index) in meanListLocal" :key="index" style="font-size: 18px; width: 1000px; margin-top: 60px;border:1px solid #f0f0f0;position:relative;">
      <div class="title-info">菜单{{ index }}</div>
      <div class="flex-wrap border-bottom" style="">
        <span class="flex-item">菜单类型</span>
        <span class="flex-item">菜单名称</span>
        <span class="flex-item">操作</span>
      </div>
      <section class="flex-wrap border-bottom">
        <span class="flex-item">一级菜单</span>
        <template v-if="(item.sub_button.length > 1)">
          <span class="flex-item" style="font-weight: 700;">{{ item.name }}</span>
        </template>
        <template v-else>
          <span class="flex-item" style="font-weight: 700;">--{{ item.name }}</span>
          <!-- <span class="flex-item" style="font-weight: 700;">菜单{{ numMap[index] }}</span> -->
        </template>
        <template v-if="actionType !== 'detail'">
          <span class="flex-item">
            <el-button size="small" type="primary" @click="handleParentMenu(index, item.name)">编辑</el-button>
            <el-button v-if="!(item.sub_botton && item.sub_botton.length >= 5)" size="small" type="success" @click="handleEdit('add', index, -1)">添加二级菜单</el-button>
          </span>
        </template>
      </section>

      <section v-for="(item2, index2) in item.sub_button" :key="index2" style="font-size: 18px;" class="flex-wrap border-bottom">
        <span class="flex-item">二级菜单</span>
        <p class="flex-item">{{ item2.name }}</p>
        <span v-if="actionType !== 'detail'" class="flex-item">
          <el-button size="small" type="primary" @click="handleEdit('modify', index, index2, item2)">编辑</el-button>
          <el-button size="small" type="success" @click="handleDel(index, index2)">删除</el-button>
        </span>
      </section>
    </section>

    <el-dialog :visible.sync="editVisible" title="菜单编辑" width="35%">
      <el-form :model="menuInfo" :rules="baseInfoRules" label-width="120px" label-position="right" style="margin-top: 20px;" >
        <el-form-item label="菜单名称" prop="description">
          <el-input v-model="menuInfo.name" placeholder="请输入菜单名称" class="input-300" maxlength="6" />
        </el-form-item>
        <el-form-item v-if="menuInfo.editable" label="菜单链接" prop="price">
          <el-input v-model="menuInfo.url" :rows="4" placeholder="请输入菜单链接" type="textarea" class="input-300" clearable />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible=false">取 消</el-button>
        <el-button type="primary" @click="handelMenuName">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="editParentVisible" title="一级菜单名称编辑" width="35%">
      <el-input v-model="parentMenuInfo.name" maxlength="6" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="editParentVisible=false">取 消</el-button>
        <el-button type="primary" @click="handelParentMenuName">确定</el-button>
      </div>
    </el-dialog>

    <!-- 添加工作号菜单 -->
    <el-dialog :visible.sync="visible" title="添加二级菜单" width="45%">
      <div v-for="(item, index) in mapInfoList" :key="index" class="action-item" @click="handleMenuClick(item, index)">
        <img v-if="!item.checked" class="action-check" src="../images/un-check.png">
        <img v-if="item.checked" class="action-check" src="../images/check.png">
        <section class="desc-wrap">
          <section class="desc-title">{{ item.title }}</section>
          <section class="desc-content">{{ item.desc }}</section>
        </section>
      </div>
      <div class="action-item">
        <img v-if="!selfMenu" class="action-check" src="../images/un-check.png" @click="handleSelfMenuClick">
        <img v-if="selfMenu" class="action-check" src="../images/check.png" @click="handleSelfMenuClick">
        <section class="desc-wrap" style="border-bottom: none;" @click="handleSelfMenuClick">
          <section class="desc-title">自定义菜单</section>
          <section class="desc-content">商家可配置菜单名称和菜单跳转链接。</section>
        </section>
        <el-form ref="baseInfoRules" :model="menuInfo" :rules="baseInfoRules" label-width="120px" label-position="right" style="margin-top: 20px;" >
          <el-form-item label="菜单名称" prop="description">
            <el-input v-model="menuInfo.name" placeholder="请输入菜单名称" class="input-300" maxlength="6" />
          </el-form-item>
          <el-form-item label="菜单链接" prop="price">
            <el-input v-model="menuInfo.url" :rows="4" placeholder="请输入以https://为开头的菜单链接" type="textarea" class="input-300" clearable />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelMenu">取 消</el-button>
        <el-button type="primary" @click="addMenu">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapInfo } from '../constant'
import { flatten } from '@/utils/index'

export default {
  name: 'Edit',
  props: {
    actionType: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    deviceType: {
      type: String,
      default: ''
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
      localDeviceType: this.deviceType,
      mapInfoList: [],
      // 操作类型，新增或者修改
      type: '',
      list: [],
      visible: false,
      meanListLocal: [],
      menuInfo: { name: '', url: '' },
      numMap: ['一', '二', '三'],
      menuIndex: -1,
      editVisible: false,
      selfMenu: false,
      // 修改或删除的索引信息
      modifyMeauIndex: { parentIndex: -1, index: -1 },
      parentMenuInfo: { name: '', index: -1 },
      editParentVisible: false,
      baseInfoRules: {}
    }
  },
  watch: {
    deviceType(value) {
      let list = JSON.parse(JSON.stringify(mapInfo[value]))
      list = flatten(list)
      list = list.map(item => {
        item.checked = false
        item.url = `${item.url}?appId=${this.appId}&ut=2`
        return item
      })
      this.mapInfoList = list
    },
    menuList(val) {
      // 若没有菜单的处理方式
      if (val.length === 0 && this.actionType !== 'detail') {
        const info = mapInfo[this.deviceType]
        info.map(item => {
          if (Array.isArray(item)) {
            const arr2 = []
            item.forEach(item2 => {
              const obj = { url: `${item2.url}?appId=${this.appId}&ut=2`, name: item2.title, type: 'view', editable: false, sub_button: [] }
              arr2.push(obj)
            })
            const obj = { editable: false, name: '个人中心', sub_button: arr2, type: '', url: '' }
            val.push(obj)
          } else {
            const obj = { url: `${item.url}?appId=${this.appId}&ut=2`, name: item.title, type: 'view', editable: false, sub_button: []
            }
            val.push(obj)
          }
        })
      }
      const len = val.length
      for (let i = 0; i < 3 - len; i++) {
        val.push({
          url: '',
          name: '菜单',
          type: 'default',
          editable: true,
          sub_button: []
        })
      }
      // 处理数据结构
      const list = val.map(item => {
        // 只有一个一级菜单
        if (item.type === 'view' && item.sub_button && item.sub_button.length === 0) {
          const obj = {
            url: item.url,
            name: item.name,
            type: 'view',
            editable: item.editable
          }
          item.sub_button.push(obj)
        }
        return item
      })
      this.meanListLocal = list
    }
  },
  methods: {

    /**
       *
       */
    handleParentMenu(parentIndex, name) {
      this.parentMenuInfo = { name, index: parentIndex }
      this.editParentVisible = true
    },
    handelParentMenuName() {
      this.meanListLocal[this.parentMenuInfo.index].name = this.parentMenuInfo.name
      this.editParentVisible = false
      this.meanListLocal = JSON.parse(JSON.stringify(this.meanListLocal))
    },
    /**
       * @param {string} type 操作类型 信息或修改 `add | modify`
       * @param {number} index 父级索引(一级菜单索引)
       * @param {number} index2  子级索引(二级菜单索引)
       */
    handleEdit(type, index = -1, index2 = -1, item) {
      this.modifyMeauIndex.parentIndex = index
      this.modifyMeauIndex.index = index2
      this.type = type

      // 二级菜单最多为5个
      if (this.meanListLocal[index].sub_button.length >= 5 && type === 'add') {
        this.$toast('二级菜单最多添加5个')
        return
      }

      this.resetMapInfoList()

      if (type === 'add') {
        this.menuInfo = { name: '', url: '', editable: true }
        this.visible = true
      } else if (type === 'modify') {
        this.menuInfo = { name: item.name, url: item.url, editable: item.editable }
        this.editVisible = true
      }
    },
    handleDel(parentIndex, index) {
      this.$confirm('确定要删除选择的菜单？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        this.meanListLocal[parentIndex].sub_button.splice(index, 1)
        console.log('删除', JSON.stringify(this.meanListLocal))
        this.handleDataInfo()
      })
    },
    handelMenuName() {
      this.meanListLocal[this.modifyMeauIndex.parentIndex].sub_button[this.modifyMeauIndex.index].name = this.menuInfo.name
      this.meanListLocal[this.modifyMeauIndex.parentIndex].sub_button[this.modifyMeauIndex.index].url = this.menuInfo.url
      this.editVisible = false
      this.meanListLocal = JSON.parse(JSON.stringify(this.meanListLocal))
    },
    // 新增菜单信息
    addMenu() {
      if (!this.menuInfo.url || !this.menuInfo.name) {
        this.$message({ message: '请输入访问链接和菜单名称', type: 'error' })
        return
      }
      const result = this.meanListLocal[this.modifyMeauIndex.parentIndex].sub_button.some(item => item.name === this.menuInfo.name || item.url.indexOf(this.menuInfo.url) > -1)
      if (result) {
        this.$message({ message: '二级菜单已添加，访问链接和菜单名称均不可重复', type: 'error' })
        return
      }
      this.meanListLocal[this.modifyMeauIndex.parentIndex].sub_button.push(this.menuInfo)
      this.visible = false
      this.handleDataInfo()
    },
    // 处理数据，返回后端需要的数据格式
    handleDataInfo() {
      let list = JSON.parse(JSON.stringify(this.meanListLocal))
      list = list.filter(item => item.sub_button.length >= 1)
      const handleList = list.map(item => {
        if (item.sub_button && item.sub_button.length === 1) {
          item.name = item.sub_button[0].name
          item.url = item.sub_button[0].url
          item.type = 'view'
          item.editable = item.sub_button[0].editable
          item.sub_button = []
        }
        return item
      })
      this.menuInfo = { name: '', url: '' }
      this.resetMapInfoList()
      this.selfMenu = false
      this.$emit('on-OK', handleList)
    },
    // 取消按钮操作
    cancelMenu() {
      this.visible = false
      this.menuInfo = { name: '', url: '', editable: false }
    },
    // 点击弹框菜单信息
    handleMenuClick(item, index) {
      this.selfMenu = false
      this.menuIndex = index
      this.resetMapInfoList()
      item.checked = !item.checked
      this.mapInfoList.splice(index, 1, item)
      // 如果选择默认菜单
      if (item.checked) {
        this.menuInfo = { name: item.title, url: item.url, editable: false }
      }
    },
    // 点击自定义菜单信息
    handleSelfMenuClick() {
      this.selfMenu = !this.selfMenu
      this.resetMapInfoList()
      if (this.selfMenu) {
        this.menuInfo = { name: '', url: '', editable: true }
      }
    },
    // 重置菜单信息
    resetMapInfoList() {
      this.mapInfoList = this.mapInfoList.map(item2 => {
        item2.checked = false
        return item2
      })
    }
  }
}
</script>

<style lang="less" scoped>
.flex-wrap{
  display:flex;
  height: 45px;
  line-height: 45px;
  justify-content: space-between;
  .flex-item{
    flex: 1;
    text-align:center;
  }
}

.title-info{
  position: absolute;
  top: -30px;

}
  .is-block {
    display: block !important;
  }

  .action-item {
    position: relative;

    .action-check {
      width: 20px;
      height: 20px;
      position: absolute;
      left: 20px;
      top: 0;
    }

    .input-area {
      margin-left: 10px;
      display: none;
    }

    .desc-wrap {
      margin-left: 60px;
      font-size: 14px;
      border-bottom: 1px solid #f0f0f0;
      padding-bottom: 10px;
      margin-top: 10px;
      // margin: 0 60px 10px 10px;
      .desc-title {
        font-size: 14px;
        font-weight: 700;
      }

      .desc-content {
        padding-top: 10px;
        color: #CCC;
      }
    }
  }

  .border-bottom {
    border-bottom: 1px solid #f0f0f0;
  }

</style>
