<template>
  <div class="list-container">
    <div class="filter-container">
      <el-input v-model="listQuery.body.roleCode" placeholder="请输入角色编码" clearable style="width: 200px" class="filter-item"></el-input>
      <el-input v-model="listQuery.body.roleName" placeholder="请输入角色名称" clearable style="width: 200px" class="filter-item"></el-input>
      <el-button type="primary" icon="el-icon-search" class="filter-item"  @click="getList()">搜索</el-button>
      <el-button type="primary" icon="el-icon-edit" class="filter-item"  @click="addRole()">新增</el-button>
    </div>
    <div>
      
    </div>
    <div>
    <el-table :data="roleList" ref="multipleTable" tooltip-effect="dark" style="width: 100%" border  @selection-change="handleSelectionChange"  :row-key="getRowKey" v-loading="listLoading">
      <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
      <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
      <el-table-column prop="roleCode" label="角色编码" align="center"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit">编辑</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleAllotPermission(scope.$index, scope.row)" icon="el-icon-edit">分配权限</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <!--分页工具-->
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.header.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="listQuery.header.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <RoleAdd v-if="addOrUpdateVisible" ref="roleAdd"></RoleAdd>
    <RoleSource v-if="addOrUpdateVisible" ref="roleSource"></RoleSource>
  </div>
</template>

<script>
import {listRole,delRole} from '@/api/sys/role'
import RoleAdd from './add'
import RoleSource from './RoleSource'
export default {
  name: "roleList",
  components:{
    RoleAdd,
    RoleSource
  },
  data() {
      return {
        roleList: [],
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
        listLoading: true,
        multipleSelection: [],
        total: null,
        addOrUpdateVisible:false
      }
  },
  created() {
    this.getList();
  },
  methods: {
    
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
    getRowKey (row) {
      return row.id
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    indexMethod(index) {
        return index+1;
    },
    handleEdit(index, row) {
      console.log(index, row);
       this.addOrUpdateVisible=true,
      this.$nextTick(()=>{
        this.$refs.roleAdd.init(row.id)
      })
    },
    handleAllotPermission(index, row) {
      console.log(index, row);
      // alert("分配权限")
      this.addOrUpdateVisible=true,
      this.$nextTick(()=>{
        this.$refs.roleSource.init(row.id)
      })
    },
    handleDelete(index, row) {
      delRole(row.id).then(response => {
        this.getList()
      }).catch(error => {
        console.log(error)
      })
      console.log(index, row);
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
  
    addRole: function(){
      // this.$router.push({path: '/system/role/add'})
      this.addOrUpdateVisible=true,
      this.$nextTick(()=>{
        this.$refs.roleAdd.init()
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