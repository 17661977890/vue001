<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!--这里用标签跳转url，也可以直接访问配置的路由url-->
    <!-- <router-link to="/his">测试组件跳转</router-link> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // 捕获页面刷新事件
    window.addEventListener("unload",this.saveStage)
  },
  methods:{
    saveStage: function(){
      console.log("sss",this.$store.stage)
      sessionStorage.setItem("stage",JSON.stringify(this.$store.stage))
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
