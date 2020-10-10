<template>
  <el-dialog :title="!admin.id?'新增':'编辑'" :visible.sync="dialogFormVisible"  width="35%">
    <el-form :model="admin" ref="UserFrom" label-width="100px" :rules="rules">
      <el-form-item label="用户账号：" prop="username">
        <el-input v-model="admin.username"></el-input>
      </el-form-item>
      <el-form-item label="手机号码：" prop="mobile">
        <el-input v-model="admin.mobile"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称：" prop="nickname" >
        <el-input v-model="admin.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱：" prop="email">
        <el-input v-model="admin.email"></el-input>
      </el-form-item>
      <el-form-item label="用户性别：" prop="sex" >
        <el-radio-group v-model="admin.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveUser('UserFrom')" :loading="loading">保存</el-button>
        <el-button @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {addUser, updateUser, delUser,getUserInfo} from '@/api/sys/user'
import { isvalidMobile,isValidatUsername,validEmail } from '@/utils/validate'
export default {
  name: "UserAdd",
  data(){
    const validateUsername = (rule, value, callback) => {
      if (!isValidatUsername(value)) {
        callback(new Error('用户名必须有6-12位大小写英文和数字组成'))
      } else {
        callback()
      }
    };
    const validateMobile = (rule, value, callback) => {
      if (!isvalidMobile(value)) {
        callback(new Error('请输入正确手机号'))
      } else {
        callback()
      }
    };
    const validEmail = (rule, value, callback) => {
      if (!isvalidEmail(value)) {
        callback(new Error('请输入正确邮箱'))
      } else {
        callback()
      }
    };
    return{
      admin:{
        nickname:'',
        username:'',
        email:'',
        mobile:'',
        sex:'',
        id:''
      },
      dialogFormVisible: false,
      loading: false,
      rules: {
        username: [
          { required: true, trigger: 'blur' ,validator: validateUsername},
        ],
        mobile: [
          { required: true, trigger: 'blur' ,validator: validateMobile}
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
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
         this.$refs.UserFrom.resetFields();
      }else{
        console.log("编辑：",this.admin.id)
        getUserInfo(this.admin.id).then(response => {
          this.admin = response;
        });
      
      }
    },
    cancel: function(){
      this.dialogFormVisible=false
    },
    saveUser: function(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            
            this.loading=true
            // 调用保存用户接口
            if(this.admin.id){
              // 有id 就是编辑
              updateUser(this.admin).then(response => {
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
              addUser(this.admin).then(response => {
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