<template>
 <el-dialog title="资源分配" :visible.sync="dialogFormVisible"  width="55%">
  <div class="list-container">
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      ref="tree"
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
import {saveRoleSource,querySourceByRole} from '@/api/sys/roleSource'
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
        loading:false,
        roleId:''
      }
  },
  created() {
    this.getTreeList();
  },
  methods: {
    init: function(id){
        this.roleId = id;
        this.dialogFormVisible=true;
        // 此段不能加，会使数据不能回显
        // this.getTreeList();
        this.getSourceByRoleId();
    },
    cancel: function(){
      this.dialogFormVisible=false
    },
    
    /** 查询资源列表 */
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
    addRoleSource(){
      // alert("确定分配权限")
      // console.log("选中的资源：",this.$refs.tree.getCheckedNodes());
      console.log("选中的资源id：",this.$refs.tree.getCheckedKeys());
      console.log("半选中的资源id：",this.$refs.tree.getHalfCheckedKeys());
      this.loading = true
      let ids=[];
      for(let i=0;i<this.$refs.tree.getCheckedKeys().length;i++){
        ids.push(this.$refs.tree.getCheckedKeys()[i]);
      }
      for(let i=0;i<this.$refs.tree.getHalfCheckedKeys().length;i++){
        ids.push(this.$refs.tree.getHalfCheckedKeys()[i]);
      }      
      var param = {
        sourceIdList:[],
        roleId:''
      }
      param.sourceIdList=ids
      param.roleId=this.roleId
      saveRoleSource(param).then(response => {
        this.$message({
            message: '保存成功',
            type: 'success',
            duration: 1000
        });
        this.loading = false
        this.dialogFormVisible=false
      }).catch(error => {
        this.loading = false
        this.$message({
            message: '保存失败',
            type: 'error',
            duration: 1000
        });
      });
    },
    getSourceByRoleId() {
      querySourceByRole(this.roleId).then((response)=>{
        let sourceIdList=[]
        console.log("角色的资源列表：",response)
        if(response.length>0){
          for(let i = 0;i < response.length;i++){
              var node = this.$refs.tree.getNode(response[i].id);
              console.log(node.isLeaf)
              if(node.isLeaf){
                this.$refs.tree.setChecked(node, true);
              }
              // sourceIdList.push(response[i].id)
          }
          // console.log("角色的资源列表：",sourceIdList)
          // this.$refs.tree.setCheckedKeys(sourceIdList)
        
        }else{
          console.log("角色无权限")
          this.$refs.tree.setCheckedKeys([]);
        }
      })
    },
  }
}
</script>

<style>
.filter-item {
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 10px;
  margin: 0 5px 10px 0;
  /* float: left; */
  
}
.pagination-container{
    background: #fff;
    padding: 32px 16px;
}
</style>