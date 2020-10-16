<template>
 <el-dialog title="角色分配" :visible.sync="dialogFormVisible"  width="55%">
  <div class="list-container">
    <div class="filter-container">
      <el-input v-model="listQuery.body.roleCode" placeholder="请输入角色编码" clearable style="width: 200px" class="filter-item"></el-input>
      <el-input v-model="listQuery.body.roleName" placeholder="请输入角色名称" clearable style="width: 200px" class="filter-item"></el-input>
      <el-button type="primary" icon="el-icon-search" class="filter-item"  @click="getList()">搜索</el-button>
    </div>
    <div>
      
    </div>
    <div>
    <el-table :data="roleList" ref="multipleTable" tooltip-effect="dark" style="width: 100%" border  @selection-change="handleSelectionChange"  v-loading="listLoading">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
      <el-table-column prop="roleCode" label="角色编码" align="center"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
    </el-table>
    </div>
    <!--分页工具-->
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <div>
      <el-button type="primary" @click="addUserRole('SourceForm')" :loading="loading">确定</el-button>
      <el-button @click="cancel()">取消</el-button>
    </div>
  </div>
  </el-dialog>
</template>

<script>
import {listRole} from '@/api/sys/role'
export default {
  name: "UserRole",
  data() {
      return {
        roleList: null,
        listQuery: {
          body:{
            roleCode:null,
            roleName:null
          },
          header:{
            pageNum: 1,
            pageSize: 10
          }
          
        },
        dialogFormVisible: false,
        listLoading: true,
        multipleSelection: [],
        total: null,
        loading:false
      }
  },
  created() {
    this.getList();
  },
  methods: {
     init: function(id){
       let userId = id;
      
      this.dialogFormVisible=true
    },
    cancel: function(){
      this.dialogFormVisible=false
    },
    
    /** 查询角色列表 */
    getList() {
      this.listLoading = true;
      if(!this.listQuery.body.roleCode){
        this.listQuery.body.roleCode =null;
      }
      if(!this.listQuery.body.roleName){
        this.listQuery.body.roleName =null;
      }
      listRole(this.listQuery).then(
        (response) => {
          console.log("角色列表：",response.records)
          this.roleList = response.records;
          this.total = response.total;
          this.totalPage = response.pages;
          this.pageSize = response.size;
          this.listLoading = false;
        }
      );
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // 遍历 进行 角色id数组的组装，进行角色分配 
      console.log("选中角色：",this.multipleSelection)
      console.log("选中角色：",this.multipleSelection[0].id)
    },
    indexMethod(index) {
        return index+1;
    },
    // 分页工具方法
    handleSizeChange(val) {
      this.listQuery.header.pageNum = 1;
      this.listQuery.header.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.header.pageNum = val;
      this.getList();
    },

    addUserRole(){
      alert("确定分配角色")
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