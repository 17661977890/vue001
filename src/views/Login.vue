<template>
  <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="login-box">
        <h1>欢迎登录</h1>
        <el-form-item label="账户" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('form')" class="login-button">登录</el-button>
          <el-button>注册</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
      return {
        form: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入账号名称', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      login: function(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 登录请求
            this.$store.dispatch('Login',this.form)
            console.log("=======登录成功========")
            sessionStorage.setItem('isLogin','true')
            this.$router.push("/main")
          } else {
            this.$message.error('请输入账号密码');
            return false;
          }
        });
        
      }
    }
}
</script>
<style scoped>
  .login-box {
    width: 400px;
    border: 1px solid #DCDFE6;
    margin: 0 auto;
    margin-top: 160px;
    border-radius: 5px;
    padding: 20px 30px 20px 20px;
    text-align: center;
    box-shadow: 0 0 20px;
  }
  .login-button {
    width: 320px;
  }
</style>