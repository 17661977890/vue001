<template>
  <div class="list-container">
    <div class="filter-container">
      <el-input v-model="listQuery.body.sourceName" placeholder="请输入名称" clearable style="width: 200px" class="filter-item"></el-input>
      <el-select v-model="listQuery.body.sourceType"  placeholder="资源类型" clearable style="width: 200px" class="filter-item">
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button type="primary" icon="el-icon-search" class="filter-item"  @click="getList()">搜索</el-button>
      <el-button type="primary" icon="el-icon-edit" class="filter-item"  @click="addSource()">新增</el-button>
    </div>
    <div>
      
    </div>
    <div>
      <!-- 参数选项： 默认展开树default-expand-all hasChildren 后边的值随便 如果和接口出参属性名一样 就不会显示子节点 -->
    <el-table 
      :data="sourceTreeList" 
      ref="multipleTable" 
      tooltip-effect="dark" 
      style="width: 100%" 
      border
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'XXX'}"
      @select="rowSelect"
      @select-all="selectAll"
      @selection-change="handleSelectionChange"  
      v-loading="listLoading">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
      <el-table-column prop="sourceName" label="资源名称" align="center"></el-table-column>
      <el-table-column prop="sourceCode" label="资源code" align="center"></el-table-column>
      <el-table-column prop="parentName" label="上级资源" align="center"></el-table-column>
      <el-table-column prop="sourceType" label="资源类型" align="center" :formatter="formatType"></el-table-column>
      <el-table-column prop="url" label="资源url" align="center"></el-table-column>
      <el-table-column prop="sort" label="排序号" align="center"></el-table-column>
      <el-table-column prop="showFlag" label="是否显示" align="center">
         <template slot-scope="scope">
            <el-switch
                @change="handleShowStatusChange(scope.$index, scope.row)"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value='active'
                :inactive-value='inactive'
                v-model="scope.row.showFlag">
            </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <SourceAdd v-if="addOrUpdateVisible" ref="sourceAdd"></SourceAdd>
  </div>
</template>

<script>
import {TreelistSource,delSource,updateShowStatus} from '@/api/sys/source'
import SourceAdd from './add'
const TREE_LIST =
      [{
          id: "1",
          parentName: '',
          sourceName: '首页',
          sourceType: 1,
          url:'/home',
          sort:0,
          showFlag:'Y',
          children: [],
          hasChildren: false
        }, {
          id: "2",
          parentName: '',
          sourceName: '系统管理',
          sourceType: 1,
          url:'/system',
          sort:1,
          showFlag:'Y',
          children: [],
           hasChildren: false
        }, {
          id: "515937101326319617",
          parentName: '',
          sourceName: '会员管理',
          sourceType: 1,
          url:'/member',
          sort:2,
          showFlag:'Y',
           hasChildren: true,
          children: [{
              id: 31,
              parentName: '会员管理',
              sourceName: '会员列表',
              sourceType: 2,
              url:'/list',
              sort:21,
              showFlag:'Y',
              children: [],
               hasChildren: false
            }, {
              id: 32,
              parentName: '会员管理',
              sourceName: '会员等级',
              sourceType: 2,
              url:'level',
              sort:22,
              showFlag:'Y',
               hasChildren: false
          }]
        }, {
          id: 4,
          parentName: '',
          sourceName: '订单管理',
          sourceType: 1,
          url:'/order',
          sort:3,
          showFlag:'N',
          children: [],
           hasChildren: false
        }]
export default {
  name: "sourceList",
  components:{
    SourceAdd
  },
  data() {
      return {
        sourceTreeList: [],
        listQuery: {
          body:{
            sourceName:null,
            sourceType:null
          },
          header:{
          }
          
        },
        typeOptions: [{
          value: '1',
          label: '目录'
        }, {
          value: '2',
          label: '菜单'
        }, {
          value: '3',
          label: '按钮'
        }],
        value: '',
        listLoading: true,
        multipleSelection: [],
        addOrUpdateVisible:false,
        inactive:"N",
        active:"Y",
      }
  },
  created() {
    this.getList();
  },
  methods: {
    
    /** 查询资源列表 */
    getList() {
      this.listLoading = true;
      if(!this.listQuery.body.sourceName){
        this.listQuery.body.sourceName =null;
      }
      if(!this.listQuery.body.sourceType){
        this.listQuery.body.sourceType =null;
      }
      TreelistSource(this.listQuery).then(
        (response) => {
          console.log("菜单列表：",response)
          this.sourceTreeList = response;
          // this.sourceTreeList = TREE_LIST;
          console.log("菜单列表：",TREE_LIST)
          this.listLoading = false;
        }
      );
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    toggleSelection(rows, flag) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row, flag);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    rowSelect(selection, row) {
      if (selection.indexOf(row) > -1 && row.sourceType === 1) {
        this.toggleSelection(row.children, true);
      }
      if (selection.indexOf(row) === -1 && row.sourceType === 1) {
        this.toggleSelection(row.children, false);
      }
      if (selection.indexOf(row) > -1 && row.sourceType === 2) {
        let s = this.sourceTreeList.filter(item => {
          if (item.id === row.parentId) {
            return item;
          }
        });
        this.toggleSelection(s, true);
      }
    },
    selectAll(selection) {
      var flag = false; // 默认 为全不选
      selection.forEach(item => {
        if (item.sourceType === 1) {
          flag = true;
          this.toggleSelection(item.children, true);
        }
      });
      if (!flag) {
        this.toggleSelection();
      }
    },

    indexMethod(index) {
        return index+1;
    },
    handleEdit(index, row) {
      console.log(index, row);
       this.addOrUpdateVisible=true,
      this.$nextTick(()=>{
        this.$refs.sourceAdd.init(row.id)
      })
    },
    handleDelete(index, row) {
      delSource(row.id).then(response => {
        this.getTreeList()
      }).catch(error => {
        console.log(error)
      })
      console.log(index, row);
    },
    handleShowStatusChange(index, row) {
      var updateShow = {
          id:'',
          showFlag:''
      }
      updateShow.id = row.id
      updateShow.showFlag= row.showFlag
      console.log("入参：",updateShow)
      updateShowStatus(updateShow).then(response => {
        this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
        });
      }).catch(error => {
        //编辑开关失败 
        if (row.showFlag === "N") {
            row.showFlag = "Y";
        } else {
            row.showFlag = "N";
        }
      });
    },
    
    // 表格 列值的格式化
    formatType: function (row, column) {
      return row.sourceType === 1 ? '目录' : row.sourceType === 2 ? '菜单' : row.sourceType === 3 ? '按钮':'未知'
    },
    formatShowFlag: function (row, column) {
      return row.showFlag === 'Y' ? '显示' : row.showFlag === 'N' ? '隐藏':'未知'
    },
    addSource: function(){
      this.addOrUpdateVisible=true,
      this.$nextTick(()=>{
        this.$refs.sourceAdd.init()
      })
     
    }
  }
}
</script>

<style>
.filter-item {
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 10px;
  margin: 0 5px 10px 0;
  float: left;
  
}
.pagination-container{
    background: #fff;
    padding: 32px 16px;
}
</style>