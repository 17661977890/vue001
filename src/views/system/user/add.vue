<template>
  <el-dialog :title="!admin.id?'新增':'编辑'" :visible.sync="dialogFormVisible"  width="35%">
    <el-form :model="admin" ref="UserFrom" label-width="100px" :rules="rules">
      <el-form-item label="用户账号：" prop="username">
        <el-input v-model="admin.username"></el-input>
      </el-form-item>
      <el-form-item label="手机号码：" prop="mobile">
        <el-input v-model="admin.mobile"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称：" prop="nickName" >
        <el-input v-model="admin.nickName"></el-input>
      </el-form-item>
      <el-form-item label="用户密码：" prop="password">
        <el-input v-model="admin.password" show-password ></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱：" prop="email">
        <el-input v-model="admin.email"></el-input>
      </el-form-item>
      <el-form-item label="用户性别：" prop="sex" >
        <el-radio-group v-model="admin.sex">
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveUser('UserFrom')">保存</el-button>
        <el-button @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: "UserAdd",
  data(){
    return{
      admin:{
        nickName:'',
        username:'',
        password:'',
        emial:'',
        mobile:'',
        sex:'',
        id:''
      },
      dialogFormVisible: false,
      rules: {
        username: [
          { required: true, message: '请输入用户账号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        nickName: [
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
         this.$refs.UserFrom.resetFields();
      }
    },
    cancel: function(){
      this.dialogFormVisible=false
    },
    saveUser: function(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            // 调用保存用户接口
            alert('submit!');
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