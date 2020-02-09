<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>首页</template>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-message"></i>系统管理</template>
            <el-menu-item-group>
              <!--嵌套路由-->
              <el-menu-item index="2-1"><router-link to="/system/user/list/1">用户管理</router-link></el-menu-item>
              <el-menu-item index="2-2"><router-link to="/system/menu/list">菜单管理</router-link></el-menu-item>
              <el-menu-item index="2-3"><router-link to="/system/role/list">角色管理</router-link></el-menu-item>
              <el-menu-item index="2-4"><router-link to="/system/promession/list">权限管理</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-menu"></i>商品管理</template>
            <el-menu-item-group>
              <el-menu-item index="3-1">商品列表</el-menu-item>
              <el-menu-item index="3-2">品牌管理</el-menu-item>
              <el-menu-item index="3-3">商品规格</el-menu-item>
              <el-menu-item index="3-4">商品类型</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-setting"></i>会员管理</template>
            <el-menu-item-group>
              <el-menu-item index="4-1">会员列表</el-menu-item>
              <el-menu-item index="4-2">会员等级</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
            <el-submenu index="5">
            <template slot="title"><i class="el-icon-setting"></i>订单管理</template>
            <el-menu-item-group>
              <el-menu-item index="5-1">订单列表</el-menu-item>
              <el-menu-item index="5-2">发货列表</el-menu-item>
              <el-menu-item index="5-3">订单设置</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      
      </el-aside>
      
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
              <!--重定向-->
              <el-dropdown-item><router-link to="/home">首页</router-link></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
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
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item)
    }
  }
};
</script>
<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>