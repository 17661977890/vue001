<template>
  <div class="list-container">
    <div class="filter-container">
      <el-input v-model="listQuery.body.name" placeholder="请输入姓名" clearable style="width: 200px" class="filter-item"></el-input>
      <el-input v-model="listQuery.body.username" placeholder="请输入账户" clearable style="width: 200px" class="filter-item"></el-input>
      <el-input v-model="listQuery.body.telphone" placeholder="请输入手机号" clearable  style="width: 200px" class="filter-item"></el-input>
      <el-select v-model="listQuery.body.sex"  clearable style="width: 100px" class="filter-item">
          <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <div>
      
    </div>
    <div>
    <el-table :data="userList" ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"  v-loading="listLoading">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" :index="indexMethod" label="序号" width="100"></el-table-column>
      <el-table-column prop="username" label="账户" align="center"></el-table-column>
      <el-table-column prop="nickname" label="昵称" align="center"></el-table-column>
      <el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
      <el-table-column prop="type" label="类型" align="center"></el-table-column>
      <el-table-column prop="sex" label="性别" align="center" :formatter="formatSex"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <!--分页工具-->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {listUser} from '@/api/sys/user'

export default {
  name: "userList",
  data() {
      return {
        userList: null,
        listQuery: {
          body:{
            
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
          value: '2',
          label: '女'
        }],
        value: '',
        listLoading: true,
        multipleSelection: [],
        total: null,
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    indexMethod(index) {
        return index+1;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
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
  }
}
</script>

<style>
.filter-item {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 10px;
  }
</style>