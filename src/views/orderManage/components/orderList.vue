<!--  此页面是列表组件  -->
<template>
  <el-container>
    <el-main>
      <el-table :data="cell.list" border>
        <!-- 1、表格 -->
        <template v-for="(item,index) in cell.name">
          <el-table-column
            v-if="!cell.style||cell.style.length==0||index>cell.style.length"
            :label="item"
            :prop="cell.prop[index]"
            :key="index"
            align="center"
          />
          <el-table-column
            v-else-if="cell.style&&cell.style.length>0&&index<=cell.style.length-1"
            :width="cell.style[index].width"
            :label="item"
            :prop="cell.prop[index]"
            :key="index"
            align="center"
          />
        </template>

        <!-- 2、操作 -->
        <el-table-column v-if="handler.isShow" :label="handler.text">
          <template slot-scope="scope">
            <el-button
              v-if="curHandler(scope,'isShow')"
              :type="curHandler(scope,'type')"
              :size="curHandler(scope,'size')"
              @click="handleClick(scope.row)"
            >{{ curHandler(scope,'name') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <template v-if="summary.showFlag">
        <div style="background-color:pink;padding:10px">
          <span>合计投币金额:</span>
          <span>{{ summary.total }} 元</span>
        </div>
      </template>
    </el-main>
    <el-footer>
      <!-- 3、分页 -->
      <el-pagination
        :current-page="pagination.pageIndex"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.pageSize"
        :total="pagination.totalCount"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-footer>
  </el-container>
</template>
<script>
export default {
  props: {
    /**
     * 表格相关信息
     * name:表头
     * prop属性
     * list:数据
     * style:样式
     */
    cell: {
      type: Object,
      default: function() {
        return {
          name: [],
          prop: [],
          list: [],
          style: []
        }
      }
    },
    /**
     * 操作列
     * isShow:是否显示操作列 eg(true)
     * text:名称 eg(操作)
     * list:需要和上面的list的length保持一致
     *      eg[{ isShow:false,name:'查看',type:'text',size:'small'，fn: },
     *         { isShow:true,name:'修改',,type:'text',size:'small',fn:}]
     */
    handler: {
      type: Object,
      default: function() {
        return {
          isShow: false,
          text: '',
          list: []
        }
      }
    },
    /**
     * 分页信息
     * totalCount：总页数
     * pageIndex:当前页码
     * pageSizes:共多少页
     * pageSize:每页多少条数据
     * sizeChangeHd:每页显示条数发生变化事件
     * currentChangeHd:切换页数变化事件
     */
    pagination: {
      type: Object,
      default: function() {
        return {
          totalCount: 0,
          pageIndex: 0,
          pageSizes: [],
          pageSize: 10,
          sizeChangeHd: '',
          currentChangeHd: ''
        }
      }
    },
    /**
     * 是否展示统计
     */
    summary: {
      type: Object,
      default: function() {
        return {
          showFlag: false,
          total: 0
        }
      }
    }
  },
  methods: {
    /**
     * 获取当前操作item
     * 行 obj
     */
    curHandler: function(scope, attr) {
      return this.handler.list[scope.row.curIndex][attr]
    },
    /**
     * 切换页数事件
     * val:pageIndex
     */
    handleCurrentChange(val) {
      this.$emit(this.pagination.currentChangeHd, val)
    },
    /**
     * 切换条数事件
     * val:pageSize
     */
    handleSizeChange(val) {
      this.$emit(this.pagination.sizeChangeHd, val)
    },
    handleClick(item) {
      this.$emit(this.handler.list[item.curIndex].fn, item)
    }
  }
}
</script>
