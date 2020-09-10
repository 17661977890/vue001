<template>
  <div class="login">
      <el-form ref="form" :model="form"  :rules="rules" label-width="80px" class="login-form-box">
        <h1>奇点商城</h1>
        <el-form-item class="login_header_title">
          <span @click="pwdLogin('form')" class="pwdlogin">密码登录</span>
          <span @click="smsLogin('form')" class="smslogin">短信登录</span>
        </el-form-item>

        <!--短信登录-->
        <div v-show="show" >
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input v-model="form.code"  style="width: 200px;"></el-input>
            <el-button style="width:100px;margin: 0 0 0 15px;text-align: center">获取验证码</el-button>
          </el-form-item>
        
          <el-form-item>
            <el-button  @click="loginBySms('form')" :loading="loading" class="login-button">登录</el-button>
            <el-button  @click="reg" class="reg-button">注册</el-button>
          </el-form-item>
        </div>
        <!--密码登录-->
        <div v-show="!show">
          <el-form-item label="账户" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
        
          <el-form-item>
            <el-button  @click="loginByPwd('form')" :loading="loading" class="login-button">登录</el-button>
            <el-button  @click="reg" class="reg-button">注册</el-button>
          </el-form-item>
        </div>
      </el-form>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
      var validatePass = (rule, value, callback) => {
          if (this.show == false && value === '') {
            console.log(rule,value)
            console.log("表达式:",this.show == false && value === '')
            callback(new Error('请输入账号名称'));
          } else{
             callback();
          }
      };
      var validatePass2 = (rule, value, callback) => {
          if (this.show == false && value === '') {
            callback(new Error('请输入密码'));
          } else {
            callback();
          }
      };
      var validatePass3 = (rule, value, callback) => {
          if (this.show == true && value === '') {
            console.log(rule,value)
            console.log("表达式:",this.show == true && value === '')
            callback(new Error('请输入手机号'));
          } else{
             callback();
          }
      };
      var validatePass4 = (rule, value, callback) => {
          if (this.show == true && value === '') {
            callback(new Error('请输入短信验证码'));
          } else {
            callback();
          }
      };

      return {
        show:false,//true代表短信登陆, false代表密码
        form: {
          username: '',
          password: '',
          phone: '',
          code: ''
        },
        
        rules: {
          // username: [
          //   { required: true, message: '请输入账号名称', trigger: 'blur' }
          // ],
          // password: [
          //   { required: true, message: '请输入密码', trigger: 'blur' }
          // ]
          username: [{ validator: validatePass, trigger: 'blur' }],
          password: [{ validator: validatePass2, trigger: 'blur' }],
          phone: [{ validator: validatePass3, trigger: 'blur' }],
          code: [{ validator: validatePass4, trigger: 'blur' }],
        },
        loading: false,
        regLoading: false,
      }
    },
    methods: {
      loginByPwd: function(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading=true
            // 登录请求
            this.$store.dispatch('Login',this.form).then(()=>{
              this.loading=false
              console.log("登录成功")
              sessionStorage.setItem('isLogin','true')
              
              this.$router.push("/main")
            }).catch((e)=>{
              console.log("登录失败:"+e)
              this.loading=false

            })
            
          } else {
            this.$message({
              showClose: true,
              message: '请完善登录信息',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        });
        
      },
      loginBySms: function(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading=true
            // 登录请求
            this.$store.dispatch('SmsLogin',this.form).then(()=>{
              this.loading=false
              console.log("登录成功")
              sessionStorage.setItem('isLogin','true')
              
              this.$router.push("/main")
            }).catch((e)=>{
              console.log("登录失败:"+e)
              this.loading=false

            })
            
          } else {
            this.$message({
              showClose: true,
              message: '请完善登录信息',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        });
        
      },
      smsLogin(formName) {
        this.show = true
        this.$refs[formName].resetFields();
        console.log(this.show)
      },
      pwdLogin(formName) {
        this.show = false
        this.$refs[formName].resetFields();
        console.log(this.show)
      },
      reg() {
        this.$router.push({path: '/reg'})
      }

    }
}
</script>
<style scoped>
  
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url("../assets/image/back2.jpeg");
    background-size: cover;
    
  }
  .login-form-box {
    width: 400px;
    border: 1px solid #DCDFE6;
    margin: 0 auto;
    margin-top: 160px;
    border-radius: 5px;
    padding: 20px 30px 20px 20px;
    text-align: center;
    box-shadow: 0 0 20px;
    position: absolute;
    top: -13px;
    right: 120px;
  }
  .login-button {
    width: 150px;
    background-color: #0c0c0c;
    border-color: #0c0c0c;
    color: #fff;
  }
  .reg-button {
    width: 150px;
    background-color: #eef2f7;
    border-color: #eef2f7;
    color: #000;
  }
  .smslogin:hover,.pwdlogin:hover {
    cursor: pointer;
    border-bottom: 2px solid orange;
  }
  .smslogin {
    width: 80px;
    display: inline-block;
    font-size: 18px;
    text-align: left;
    margin: 0  0 0 70px;
    letter-spacing: 2px;
  }
  .pwdlogin {
    width: 80px;
    display: inline-block;
    font-size: 18px;
    text-align: right;
    margin: 0 70px 0 0 ;
    letter-spacing: 2px;
  }
  
</style>