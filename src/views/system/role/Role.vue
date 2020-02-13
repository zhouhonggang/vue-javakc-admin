<template>
    <div  class="app-container">

      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item>
          <el-input v-model.trim="search.roleName" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model.trim="search.roleRemark" placeholder="角色备注"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="list(), search.offset=0">查询</el-button>
          <el-button type="success" @click="visible = true, title = '添加角色'">添加</el-button>
        </el-form-item>
      </el-form>

      <el-table
        :data="table_data"
        height="680" border stripe
        style="width: 100%">
        <el-table-column
          type="index">
        </el-table-column>
        <el-table-column
          prop="roleName"
          align="center"
          label="角色名称">
        </el-table-column>
        <el-table-column
          prop="roleRemark"
          align="center"
          label="角色备注">
        </el-table-column>
        <el-table-column
          label="注册日期"
          align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.rdate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="修改日期"
          align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.udate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="100">
          <template slot-scope="scope">
            <el-button @click="onUpdate(scope.row.roleId)" type="text" size="small">修改</el-button>
            <el-button @click="onDelete(scope.row.roleId)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="search.currentPage"
        :page-size="search.limit"
        :page-sizes="search.pageSizes"
        :total="search.total"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>

      <el-dialog
        :title="title"
        label-position="right"
        :visible.sync="visible"
        :before-close="handleClose"
        width="30%">
        <el-form ref="role" :model="role" :rules="rules" label-width="80px">
            <el-form-item label="角色姓名" prop="roleName">
              <el-input v-model="role.roleName" placeholder="请输入角色姓名以 ROLE_ 开头"/>
            </el-form-item>
            <el-form-item label="角色备注" prop="roleRemark">
              <el-input v-model="role.roleRemark" placeholder="请输入角色备注"/>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit('role')">确 定</el-button>
        </span>
      </el-dialog>

    </div>
</template>

<script>
  export default {
    name: 'Role',
    data() {
      return {
        title: '添加角色',
        table_data: [],
        search: {
          roleName: '',
          roleRemark: '',
          currentPage: 1,
          pageSizes: [10, 20, 30],
          total: 1,
          offset: 0,
          limit: 10
        },
        role: {
          roleId: '',
          roleName: '',
          roleRemark: '',
        },
        rules: {
          roleName: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
            {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'},
            {pattern: /\bROLE_\S*?/, message: '角色名称必须以 [ROLE_] 开头', trigger: 'blur'}
          ],
          roleRemark: [
            {required: true, message: '请输入角色备注描述', trigger: 'blur'},
            {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'},
          ]
        },
        visible: false
      }
    },
    methods: {
      list() {
        this.axios.post('/system/role/query', this.search)
          .then(result => {
            this.table_data = result.data.content
            this.search.total = result.data.totalElements
          })
          .catch(error=>(console.log('角色查询异常'+error)))
      },
      onSubmit(formName) {
        let param =  this.role;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post("/system/role", param)
              .then((result) => {
                this.list()
                this.$refs['role'].resetFields()
              }).catch((error)=>{
              console.log('添加异常:'+error)
            })
            this.visible = false
            this.list()
          } else {
            console.log('角色添加, 校验失败, 请按照格式输入!');
            return false;
          }
        });
      },
      onDelete(roleId) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.delete('/system/role/'+roleId)
            .then(result => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.list()
            })
            .catch(error=>(console.log('角色查询异常'+error)))
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      onUpdate(roleId) {
        this.axios.get('/system/role/'+roleId)
          .then(result => {
            this.visible = true
            this.title = '修改角色'
            this.role = result.data
          })
          .catch(error=>(console.log('角色查询异常'+error)))
      },
      handleSizeChange(limit) {
        this.search.limit = limit;
        this.list()
      },
      handleCurrentChange(pagesize) {
        this.search.offset = parseInt(pagesize)-1;
        this.list()
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
            this.$refs['role'].resetFields()
          })
          .catch(_ => {});
      }
    },
    mounted () {
      this.list()
    }
  }
</script>
