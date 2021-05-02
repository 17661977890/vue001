<template>
 <el-dialog title="角色分配" :visible.sync="dialogFormVisible"  width="55%">
  <div class="list-container">
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      :props="defaultProps">
    </el-tree>
    <div>
      <el-button type="primary" @click="addRoleSource('SourceForm')" :loading="loading">确定</el-button>
      <el-button @click="cancel()">取消</el-button>
    </div>
  </div>
  </el-dialog>
</template>

<script>
import {TreelistSource} from '@/api/sys/source'
export default {
  name: "RoleSource",
  data() {
      return {
        roleList: null,
        listQuery: {
          body:{
          },
          header:{
          }
          
        },
        data:[],
        defaultProps: {
          children: 'children',
          label: 'sourceName'
        },
        dialogFormVisible: false,
        listLoading: true,
        multipleSelection: [],
        loading:false
      }
  },
  created() {
    this.getTreeList();
  },
  methods: {
    init: function(id){
        let roleId = id;
        this.dialogFormVisible=true
    },
    cancel: function(){
      this.dialogFormVisible=false
    },
    
    /** 查询角色列表 */
    getTreeList() {
      this.listLoading = true;
      if(!this.listQuery.body.roleCode){
        this.listQuery.body.roleCode =null;
      }
      if(!this.listQuery.body.roleName){
        this.listQuery.body.roleName =null;
      }
      TreelistSource(this.listQuery).then(
        (response) => {
          console.log("资源树列表：",response)
          this.data = response;
        }
      );
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    addRoleSource(){
      alert("确定分配权限")
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