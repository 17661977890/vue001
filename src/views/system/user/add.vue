<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="admin" :rules="loginRules" ref="adminFrom" label-width="150px">
      <el-form-item label="用户昵称：" prop="nickName">
        <el-input v-model="admin.nickName"></el-input>
      </el-form-item>
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="admin.username" :disabled="isEdit" ></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="admin.password" show-password ></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="admin.email"></el-input>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input
          placeholder="请输入内容"
          type="textarea"
          v-model="admin.note"
          :autosize="true"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" >提交</el-button>
        <el-button v-if="!isEdit">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
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
        note:''
      }
    }
  }
}
</script>

<style>

</style>