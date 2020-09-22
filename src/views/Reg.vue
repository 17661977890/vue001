<template>
  <div class="reg">
      <el-form ref="form" :model="form"  :rules="rules" label-width="80px" class="reg-form-box" style="margin-left: 0;">
        <h1>奇点商城注册</h1>
          <el-form-item prop="username" label="账号名称">
            <el-input v-model="form.username" placeholder="请输入账号名称" prefix-icon="el-icon-chat-dot-square"></el-input>
          </el-form-item>
          <el-form-item prop="mobile" label="手机号">
            <el-input v-model="form.mobile" placeholder="请输入手机号"  prefix-icon="el-icon-mobile-phone">
              <span slot="append" class="getCode" @click="getCodes('form')"  v-if="countDown">获取验证码</span>
              <span slot="append" class="reSend" v-if="!countDown">重新发送({{timer}}s)</span>
            </el-input>
          </el-form-item>
          <el-form-item prop="smsCode" label="验证码">
            <el-input v-model="form.smsCode" placeholder="请输入验证码" prefix-icon="el-icon-chat-dot-square"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
             
            <el-input v-model="form.password" type="password" placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword" label="确认密码">
            <el-input v-model="form.confirmPassword" type="password" placeholder="请再次输入密码" prefix-icon="el-icon-check"></el-input>
          </el-form-item>
        
          <el-form-item>
            <el-button  @click="regUser('form')" class="reg-button" :loading="loading" >注册</el-button>
          </el-form-item>
       <span class="toLoginMsg">已有账号，<a @click="login" class="toLogin">立即登录</a></span>
      </el-form>
      
  </div>
</template>
<script>
import { reg, getSmsCode, getInfo } from '@/api/sys/login'
import { isvalidMobile,isValidatUsername } from '@/utils/validate'
export default {
  name: 'Reg',
  data() {
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
      const validatePass = (rule, value, callback) => {
        var passwordreg =  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/ 
        if (!passwordreg.test(value)) {
          callback(new Error('密码必须由数字、字母、特殊字符组合,请输入6-16位'))
        } else {
          callback()
        }
      };
      const validateConfirmPass = (rule, value, callback) => {
        if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      };
      return {
        form: {
          username: '',
          mobile:'',
          password: '',
          confirmPassword: '',
          smsCode: ''
        },
        
        rules: {
           username: [
            { required: true,  trigger: 'blur',validator: validateUsername}
          ],
          mobile: [
            { required: true, trigger: 'blur' ,validator: validateMobile}
          ],
          smsCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ],
           password: [
            { required: true, trigger: 'blur' ,validator: validatePass}
          ],
           confirmPassword: [
            { required: true, trigger: 'blur',validator: validateConfirmPass}
          ]

        
        },
        loading: false,
        countDown:true,
        timer:59,
        smsCodeId:''
      }
    },
    created(){
      var count = this.getCount();
      console.log("ssss"+count + (count == 59))
      if(count == 59){
        this.countDown=true;
        localStorage.removeItem('regTime');
      }else{
        this.countDown=false;
        this.timer=count;
        this.timeCountDown(this.timer)
      }
      console.log("实际验证码id：",this.smsCodeId)
      console.log("验证码id：",localStorage.getItem("smsCodeId"))
    },
    methods: {
      regUser: function(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading=true
            if(!this.smsCodeId){
              console.log("消息验证码id为空，从本地缓存获取");
              this.smsCodeId = localStorage.getItem("smsCodeId");
            }
            // 注册请求
            reg(this.form.username, this.form.password ,this.form.mobile,this.form.smsCode,this.form.confirmPassword,this.smsCodeId,3,1,1).then(response => {
              this.$message({
                  showClose: true,
                  message: '注册成功',
                  type: 'success',
                  duration: 1000
                });
              this.$router.push({path: '/login'})
            }).catch(error => {
              console.log(error)
              this.loading=false
            })
              
          } else {
            this.$message({
              showClose: true,
              message: '请完善注册信息',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        });
        
      },
      getCodes: function(formName){
          if (isvalidMobile(this.form.mobile)) {
            //倒计时逻辑（js 中得定时器 循环执行: setInterval 定时执行：setTimeout）
            console.log("注册获取验证码"+this.countDown)
            console.log("注册获取验证码"+this.timer)
            if(this.countDown){
              this.timer = this.getCount();
              this.countDown = false;
              this.timeCountDown(this.timer)
              // 获取短信验证码请求(注册平台 web：3 、注册业务类型：1、终端类型 手机：1 )
              getSmsCode(3,1,this.form.mobile,1).then(response => {
                console.log("发送短信验证码返回结果：",response);
                this.smsCodeId=response.smsCodeId;
                localStorage.setItem("smsCodeId",this.smsCodeId)
                this.$message({
                  showClose: true,
                  message: '验证码已发送，请注意查收',
                  type: 'success',
                  duration: 1000
                });
              }).catch(error => {
                console.log(error)
              })
            }else{
              this.$message({
                  showClose: true,
                  message: '验证码已发送，请稍后重试',
                  type: 'warning',
                  duration: 1000
                });
                return false;
            }
              
          } else {
            this.$message({
              showClose: true,
              message: '手机号格式有误',
              type: 'error',
              duration: 1000
            });
            return false;
          }
       
      },
      timeCountDown(timer) {
        var auth_timer = setInterval(()=>{
            this.timer--;
            if(this.timer<=0){
              // 销毁定时器，移除regTime
              this.timer = 59;
              clearInterval(auth_timer)
              this.countDown = true;
              localStorage.removeItem('regTime');
              console.log(localStorage.getItem('regTime'))
              
            }
          },1000)
      },
      getCount() {
        var now=new Date().getTime();    
        if(localStorage.getItem('regTime')){
            var old=localStorage.getItem('regTime');
            var remainTime=(now - old)/1000;
            //59是设定的倒计时，
            if(remainTime<=this.timer){
                //剩下多少秒
                return parseInt(this.timer-remainTime);
            }else{
              localStorage.setItem('regTime',now);
              return 59;
            }
        }else{
          localStorage.setItem('regTime',now);
          return 59;
          
        }
      },
      login() {
        this.$router.push({path: '/login'})
      }

    }
}
</script>
<style scoped>
  .reg {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url("../assets/image/back-7.jpg");
    background-size: cover;
    
  }
  .reg-form-box {
    width: 400px;
    border: 1px solid #DCDFE6;
    margin: 0 auto;
    margin-top: 160px;
    border-radius: 5px;
    padding: 20px 30px 20px 20px;
    text-align: center;
    box-shadow: 0 0 20px;
    position: absolute;
    top: 15%;
    left: 63%;
  }
  .reg-button {
    width: 322px;
    background-color: #eef2f7;
    border-color: #eef2f7;
    color: #000;
  }
  .toLogin {
    color: #aa4;
  }
  .toLoginMsg {
    display: inline-block;
    cursor: pointer;
  }
  .el-form-item__content {
    margin-left: 20px !important;
    margin: 0 20px;
  }
  .getCode,.reSend {
    cursor: pointer;
  }
</style>