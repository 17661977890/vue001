<template>
  <div class="list-container">
    <div class="filter-container">
      <el-input v-model="listQuery.body.nickname" placeholder="请输入昵称" clearable style="width: 200px" class="filter-item"></el-input>
      <el-input v-model="listQuery.body.username" placeholder="请输入账户" clearable style="width: 200px" class="filter-item"></el-input>
      <el-input v-model="listQuery.body.mobile" placeholder="请输入手机号" clearable  style="width: 200px" class="filter-item"></el-input>
      <el-select v-model="listQuery.body.sex"  placeholder="性别" clearable style="width: 100px" class="filter-item">
          <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button type="primary" icon="el-icon-search" class="filter-item"  @click="getList()">搜索</el-button>
      <el-button type="primary" icon="el-icon-edit" class="filter-item"  @click="addUser()">新增</el-button>
    </div>
    <div>
      
    </div>
    <div>
    <el-table :data="userList" ref="multipleTable" tooltip-effect="dark" style="width: 100%" border  @selection-change="handleSelectionChange" :row-key="getRowKey" v-loading="listLoading">
      <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
      <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
      <el-table-column prop="username" label="账户" align="center"></el-table-column>
      <el-table-column prop="nickname" label="昵称" align="center"></el-table-column>
      <el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
      <el-table-column prop="type" label="类型" align="center"></el-table-column>
      <el-table-column prop="sex" label="性别" align="center" :formatter="formatSex"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit">编辑</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleAllotRole(scope.$index, scope.row)" icon="el-icon-edit">分配角色</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <!--分页工具-->
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.header.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="listQuery.header.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <UserAdd v-if="addOrUpdateVisible" ref="userAdd"></UserAdd>
    <UserRole v-if="addOrUpdateVisible" ref="userRole"></UserRole>
  </div>
</template>

<script>
import {listUser,delUser} from '@/api/sys/user'
import UserAdd from './add'
import UserRole from './UserRole'
export default {
  name: "userList",
  components:{
    UserAdd,
    UserRole
  },
  data() {
      return {
        userList: null,
        listQuery: {
          body:{
            nickname:null,
            username:null,
            mobile:null,
            sex:null
          },
          header:{
            pageNum: 1,
            pageSize: 10
          }
          
        },
        sexOptions: [{
          value: '1',
          label: '男'
        }, {
          value: '0',
          label: '女'
        }],
        value: '',
        listLoading: true,
        multipleSelection: [],
        total: null,
        addOrUpdateVisible:false
      }
  },
  created() {
    this.getList();
  },
  methods: {
    // // 调用后端请求---直接使用axios
    // getList: function(){
    //   this.listLoading = true;
    //   console.log(this.listQuery)
    //   this.axios({
    //     method: "post",
    //     url: "http://localhost:8888/qd-mall-usercenter/sys-user/queryPage",
    //     data: this.listQuery
    //   }).then(response=>{
    //     console.log("请求成功",response.data.body.records);
    //     this.listLoading = false;
    //     this.userList= response.data.body.records;
    //   }).catch(error=>{
    //     console.log(error);
    //   })
    // },
    /** 查询用户列表 */
    getList() {
      this.listLoading = true;
      if(!this.listQuery.body.nickname){
        this.listQuery.body.nickname =null;
      }
      if(!this.listQuery.body.username){
        this.listQuery.body.username =null;
      }
      if(!this.listQuery.body.mobile){
        this.listQuery.body.mobile =null;
      }
      if(!this.listQuery.body.sex){
        this.listQuery.body.sex =null;
      }
      listUser(this.listQuery).then(
        (response) => {
          console.log("用户列表：",response.records)
          this.userList = response.records;
          this.total = response.total;
          this.totalPage = response.pages;
          this.pageSize = response.size;
          this.listLoading = false;
        }
      );
    },
    getRowKey (row) {
      return row.id
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    indexMethod(index) {
        return index+1;
    },
    handleEdit(index, row) {
      console.log(index, row);
       this.addOrUpdateVisible=true,
      this.$nextTick(()=>{
        this.$refs.userAdd.init(row.id)
      })
    },
     handleAllotRole(index, row) {
      console.log(index, row);
      this.addOrUpdateVisible=true,
      this.$nextTick(()=>{
        this.$refs.userRole.init(row.id)
      })
    },
    handleDelete(index, row) {
      delUser(row.id).then(response => {
        this.getList()
      }).catch(error => {
        console.log(error)
      })
      console.log(index, row);
    },
    // 分页工具方法
    handleSizeChange(val) {
      this.listQuery.header.pageNum = 1;
      this.listQuery.header.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.header.pageNum = val;
      this.getList();
    },
    // 表格 列值的格式化
    formatSex: function (row, column) {
      return row.sex === 1 ? '男' : row.sex === 0 ? '女' : '未知'
    },
    addUser: function(){
      // this.$router.push({path: '/system/user/add'})
      this.addOrUpdateVisible=true,
      this.$nextTick(()=>{
        this.$refs.userAdd.init()
      })
     
    }
  }
}
</script>

<style>
.filter-item {
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 10px;
  margin: 0 5px 10px 0;
  /* float: left; */
  
}
.pagination-container{
    background: #fff;
    padding: 32px 16px;
}
</style>