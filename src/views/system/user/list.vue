<template>
  <div>
    用户管理列表 {{id}}
    <router-link to="/system/user/add/2">用户新增</router-link>
  </div>
</template>

<script>
export default {
  props:["id"],
  name: "List"
}
</script>

<style>

</style>