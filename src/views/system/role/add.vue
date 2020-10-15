<template>
  <el-dialog :title="!admin.id?'新增':'编辑'" :visible.sync="dialogFormVisible"  width="35%">
    <el-form :model="admin" ref="RoleFrom" label-width="100px" :rules="rules">
      <el-form-item label="角色编码" prop="roleCode">
        <el-input v-model="admin.roleCode"  maxlength="10" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="admin.roleName" maxlength="10" show-word-limit></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveRole('RoleFrom')" :loading="loading">保存</el-button>
        <el-button @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {addRole, updateRole,getRoleInfo} from '@/api/sys/role'
export default {
  name: "RoleAdd",
  data(){
    return{
      admin:{
        roleCode:'',
        roleName:'',
        id:''
      },
      dialogFormVisible: false,
      loading: false,
      rules: {
        roleCode: [
          { required: true, message: '请输入角色编码', trigger: 'blur' }
        ],
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
        
      }
    }
  },
  methods: {
    init: function(id){
      this.admin.id = id
      this.dialogFormVisible=true
      if(!id){
         console.log("新增:",this.admin.id)
         this.$refs.RoleFrom.resetFields();
      }else{
        console.log("编辑：",this.admin.id)
        getRoleInfo(this.admin.id).then(response => {
          this.admin = response;
        });
      
      }
    },
    cancel: function(){
      this.dialogFormVisible=false
    },
    saveRole: function(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            
            this.loading=true
            // 调用保存角色接口
            if(this.admin.id){
              // 有id 就是编辑
              updateRole(this.admin).then(response => {
                this.$message({
                  showClose: true,
                  message: '编辑成功',
                  type: 'success',
                  duration: 1000
                });
                this.$parent.getList()
              }).catch(error => {
                console.log(error)
              })
                this.loading=false
                this.dialogFormVisible=false
            }else{
              // 没有id 就是保存
              addRole(this.admin).then(response => {
                this.$message({
                  showClose: true,
                  message: '新增成功',
                  type: 'success',
                  duration: 1000
                });
                this.$parent.getList()
              }).catch(error => {
                console.log(error)
                
              })
              this.loading=false
              this.dialogFormVisible=false
            }
          
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    }
  }

}
</script>

<style >

</style>