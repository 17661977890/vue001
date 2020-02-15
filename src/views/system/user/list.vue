<template>
  <div>
    用户管理列表 {{id}}
    <router-link to="/system/user/add/2">用户新增</router-link>
  </div>
</template>

<script>
export default {
  props:["id"],
  name: "List",
  // 两个路由钩子函数
  beforeRouteEnter: (to,from,next)=>{
    console.log("页面进入前")
    // next 里的回调方法，在vue实例生成之前，只能通过回调获取方法
    next(vm=>{
      vm.getData();
    });
  },
  beforeRouteLeave: (to,from,next)=>{
    console.log("页面离开前")
    next();
  },
  methods: {
    // 调用后端请求
    getData: function(){
      this.axios({
        type: "get",
        url: "http://localhost:8091/contents/vue"
      }).then(response=>{
        console.log("请求成功",response)
      }).catch(error=>{
        console.log(error);
      })
    }
  }
}
</script>

<style>

</style>