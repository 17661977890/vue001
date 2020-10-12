<template>
  <div id="main">
    <el-container style="height: 100%; border: 1px solid #eee">
       <el-aside width="auto" >
        <!-- <div> -->
        <el-menu default-active="2-1" class="el-menu-vertical-demo"  @open="handleOpen" @close="handleClose" :collapse="isCollapse" text-color="#fff" active-text-color="#ffd04b">
           <div class="logo" >
            <img src="../assets/image/logo.png" class="logoImg">
          </div>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span slot="title">首页</span>
              </template>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">系统管理</span>
            </template>
            <el-menu-item-group>
              <!--嵌套路由-->
              <el-menu-item index="2-1"><router-link to="/system/user/list">用户管理</router-link></el-menu-item>
              <el-menu-item index="2-2">角色管理</el-menu-item>
              <el-menu-item index="2-3">菜单管理</el-menu-item>
              <el-menu-item index="2-4">权限管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span slot="title">会员管理</span>
              </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">会员列表</el-menu-item>
              <el-menu-item index="3-2">会员等级</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
            <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-shopping-cart-full"></i>
              <span slot="title">订单管理</span>
              </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">订单列表</el-menu-item>
              <el-menu-item index="4-2">发货列表</el-menu-item>
              <el-menu-item index="4-3">订单设置</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span slot="title">商品管理</span>
              </template>
            <el-menu-item-group>
              <el-menu-item index="5-1">商品列表</el-menu-item>
              <el-menu-item index="5-2">品牌管理</el-menu-item>
              <el-menu-item index="5-3">商品规格</el-menu-item>
              <el-menu-item index="5-4">商品类型</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
              <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-shopping-bag-1"></i>
              <span slot="title">库存管理</span>
              </template>
            <el-menu-item-group>
              <el-menu-item index="6-1">库存列表</el-menu-item>
              <el-menu-item index="6-2">备货发货</el-menu-item>
              <el-menu-item index="6-3">退/换货</el-menu-item>
              <el-menu-item index="6-4">库存明细</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-s-platform"></i>
              <span slot="title">内容管理</span>
              </template>
            <el-menu-item-group>
              <el-menu-item index="7-1">广告管理</el-menu-item>
              <el-menu-item index="7-2">栏目管理</el-menu-item>
              <el-menu-item index="7-3">网页管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
           <el-submenu index="8">
            <template slot="title">
              <i class="el-icon-sell"></i>
              <span slot="title">营销管理</span>
              </template>
            <el-menu-item-group>
              <el-menu-item index="8-1">营销活动</el-menu-item>
              <el-menu-item index="8-2">活动规则</el-menu-item>
              <el-menu-item index="8-3">优惠券管理</el-menu-item>
              <el-menu-item index="8-4">券模板管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
        <!-- </div> -->
      </el-aside>
      
      <el-container style="height: 100%; border: 1px solid #eee">
        <el-header>
          <!-- <span class="out"> -->
          <span class="openClose" v-bind:class="{'openClose2':use}">
            <i class="el-icon-caret-left" v-show="close" @click="closeMenu"/>
            <i class="el-icon-caret-right" v-show="!close" @click="openMenu"/>
          </span>
          <!-- </span> -->
          
          <el-dropdown style="font-size: 15px; margin-top: 10px;" trigger="click">
            <span class="el-dropdown-link">
              <el-avatar :size="40" src="https://empty" @error="errorHandler" shape="square">
                <img :src="this.$store.getters.avatar"/>
              </el-avatar>
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <div class="user_info">
                <el-avatar :size="40" src="https://empty" @error="errorHandler" shape="square">
                  <img :src="this.$store.getters.avatar"/>
                </el-avatar>
                <li>{{this.$store.getters.name}}</li>
                <li>管理员</li>
              </div>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>项目地址</el-dropdown-item>
              <!--重定向-->
              <el-dropdown-item><router-link to="/home">首页</router-link></el-dropdown-item>
              <el-dropdown-item  @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          
        </el-header>
        
        <el-main>
         <router-view/>
        </el-main>

      </el-container>

    </el-container>
  </div>
</template>
<script>

export default {
  name: 'Main',
  data() {
    return {
      isCollapse: false,
      close: true,
      use: true
    }
  },
  methods: {
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('FedLogOut').then(() => {
          location.href = '/index';
        })
      })
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    closeMenu() {
      this.isCollapse = true;
      this.close = false;
      this.use = true;
    },
    openMenu() {
      this.isCollapse = false;
      this.close = true;
      this.use = false;
    },
    errorHandler() {
      return true
    }

  }
};
</script>
<style scoped>
  #main {
    height: 100%;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    background-color: rgb(48, 65, 86);
  }
  .el-menu--collapse {
    background-color: rgb(48, 65, 86);
  }
  .el-submenu span{
    font-size: 15px;
  }
  .el-menu-item {
    background-color: #1f2d3d;
  }
  .el-menu-item:hover {
    background-color: #001528;
  }
  .el-menu-item-group {
    background-color: #1f2d3d!important;
  }
  
  .el-header {
    background-color: #fff;
    color: #303133;
    font-size: 20px;
    line-height: 60px;
    text-align: right;
    border-bottom: 1px solid #e4e7ed;
  }
  .logo,.logoImg {
    height: 60px;
    line-height: 60px;
    background-color: white;
  }
  .el-aside {
    background-color: rgb(48, 65, 86);
    font-size: 20px;
  }
  .openClose {
    /* position: */
     float: left;
    /* left: 210px; */
    font-size: 30px;

  }
  .openClose2 {
    /* position: absolute; */
    /* left: 60px; */
    float: left;
    font-size: 30px;

  }
  /* .out {
    position: absolute;
    left: 210px;
    border: 1px solid red;
    width: 400px;
    height: 50px;
  } */
  a {
    text-decoration: none;
    color: rgb(23, 152, 226);
  }
  .router-link-active {
    text-decoration: none;
  }
  .el-dropdown-link {
    cursor: pointer;
  }
  .el-dropdown-menu__item {
    border-top: 1px solid #ebeef5;
  }
  .user_info {
    width: 160px;
    height: 45px;
    padding: 6px;
  }
  .user_info .el-avatar{
    float: left;
    margin: 5px;
  }
  .user_info li {
    width: 100px;
    float: left;
    padding: 3px 5px;
    font-size: 14px;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
<!--解决el-submenu__title:hover 悬浮改变背景色在 scoped不好使-->
<style lang="scss">
  .el-submenu__title:hover {
    background-color: #001528;
  }
  .el-menu-item-group__title {
    padding: 0;
  }
   
</style>