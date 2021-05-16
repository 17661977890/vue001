<template>
  <el-dialog :title="!admin.id?'新增':'编辑'" :visible.sync="dialogFormVisible"  width="35%">
    <el-form :model="admin" ref="SourceForm" label-width="100px" :rules="rules">
      <el-form-item label="资源名称：" prop="sourceName">
        <el-input v-model="admin.sourceName"></el-input>
      </el-form-item>
      <el-form-item label="资源code：" prop="sourceCode">
        <el-input v-model="admin.sourceCode"></el-input>
      </el-form-item>
      <el-form-item label="资源url：" prop="url">
        <el-input v-model="admin.url"></el-input>
      </el-form-item>
      <el-form-item label="排序号：" prop="sort">
        <el-input v-model="admin.sort"></el-input>
      </el-form-item>
      <el-form-item label="上级资源：" prop="parentId" v-show="parentShow">
        <el-select v-model="admin.parentId" clearable placeholder="请选择" @change="changeParent(admin.parentId)">
          <el-option
            v-for="item in sourceList"
            :key="item.id"
            :label="item.sourceName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资源类型：" prop="sourceType" >
        <el-radio-group v-model="admin.sourceType" @change="changeSourceType(admin.sourceType)">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
          <el-radio :label="3">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否显示" prop="showFlag" >
        <el-radio-group v-model="admin.showFlag">
          <el-radio label="Y">显示</el-radio>
          <el-radio label="N">隐藏</el-radio>
          
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveSource('SourceForm')" :loading="loading">保存</el-button>
        <el-button @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {addSource, updateSource,getSourceInfo,listSource} from '@/api/sys/source'
export default {
  name: "SoruceAdd",
  data(){
    return{
      admin:{
        sourceName:'',
        sourceCode:'',
        url:'',
        parentId:'',
        sort:'',
        sourceType:'',
        showFlag:'',
        parentId:'',
        id:''
      },
      sourceList:[],
      dialogFormVisible: false,
      loading: false,
      parentShow: false,
      listQuery: {
        body:{
          sourceType:null
        },
        header:{
        }
      },


      rules: {
        sourceName: [
          { required: true, message: '请输入资源名称', trigger: 'blur' }
        ],
        sourceCode: [
          { required: true, message: '请输入资源code', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序号', trigger: 'blur' }
        ],
        sourceType: [
          { required: true, message: '请选择资源类型', trigger: 'change' }
        ],
        showFlag: [
          { required: true, message: '请选择是否显示', trigger: 'change' }
        ]
        
      }
    }
  },
  methods: {
    init: function(id){
      this.admin.id = id
      this.dialogFormVisible=true
      if(!id){
         console.log("新增:",this.admin.id)
         this.parentShow=false;
         this.$refs.SourceForm.resetFields();
      }else{
        console.log("编辑：",this.admin.id)
        getSourceInfo(this.admin.id).then(response => {
          this.admin = response;
          if(this.admin.sourceType === 1){
            this.parentShow=false;
          }else{
            
            if(this.admin.sourceType === 3){
              this.listQuery.body.sourceType = 2
            }else{
              this.listQuery.body.sourceType = 1
            }
            this.getList();
            this.parentShow=true;
          }
        });
      
      }
    },
     /** 根据类型查询资源列表 */
    getList() {
      if(!this.listQuery.body.sourceType){
        this.listQuery.body.sourceType =null;
      }
      listSource(this.listQuery).then(
        (response) => {
          console.log("菜单列表：",response)
          this.sourceList = response;
        }
      );
    },
    changeParent:function(val){
      let resultArr = this.sourceList.filter((item)=>{
        return item.id === val
      });
      //把值赋给要传给后台的表单对象中
      this.admin.parentId = resultArr[0].id;
      this.admin.parentName = resultArr[0].sourceName;
      console.log("选择父资源：",this.admin.parentName)
    },
    changeSourceType: function(val){
      console.log("选择资源类型：",val)
      this.parentShow=(val===1)?false:true;
      if(val===2){
        this.listQuery.body.sourceType = 1
        this.getList();
      }
      if(val===3){
        this.listQuery.body.sourceType = 2
        this.getList();
      }

      
    },
    cancel: function(){
      this.dialogFormVisible=false
    },
    saveSource: function(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            
            this.loading=true
            // 调用保存用户接口
            if(this.admin.id){
              // 有id 就是编辑
              updateSource(this.admin).then(response => {
                this.$message({
                  showClose: true,
                  message: '编辑成功',
                  type: 'success',
                  duration: 1000
                });
                this.$parent.getList()
              }).catch(error => {
                console.log(error)
              })
                this.loading=false
                this.dialogFormVisible=false
            }else{
              // 没有id 就是保存
              addSource(this.admin).then(response => {
                this.$message({
                  showClose: true,
                  message: '新增成功',
                  type: 'success',
                  duration: 1000
                });
                this.$parent.getList()
              }).catch(error => {
                console.log(error)
                
              })
              this.loading=false
              this.dialogFormVisible=false
            }
          
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    }
  }

}
</script>

<style >

</style>