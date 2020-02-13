<template>
  <div class="app-container">

    <!--  顶部搜索部分  -->
    <el-form :inline="true" :model="search" class="demo-form-inline">
      <el-form-item>
        <el-input v-model.trim="search.userName" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model.trim="search.userPhone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="search.userSex" clearable placeholder="请选择性别">
          <el-option label="男" value="1"/>
          <el-option label="女" value="2"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="search.role.roleId" clearable placeholder="请选择角色">
          <el-option
            v-for="item in role_data"
            :key="item.roleId"
            :label="item.roleName+'('+item.roleRemark+')'"
            :value="item.roleId">
          </el-option>
        </el-select>
      </el-form-item>
      {{dates | datesplit}}
      <el-form-item>
        <el-date-picker
          v-model="dates"
          type="daterange"
          align="right"
          unlink-panels
          clearable
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="list(), search.offset=0">查询</el-button>
        <el-button type="success" @click="dialogVisible = true">添加</el-button>
        <el-button type="danger" @click="export_excel">导出</el-button>
      </el-form-item>
    </el-form>

    <!--  中间数据展示区域  -->
    <el-table
      :data="table_data"
      v-loading="loading"
      height="680"
      style="width: 100%">
      <el-table-column
        type="index"
        :index="autoIndex">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="姓名">
      </el-table-column>
      <el-table-column
        label="角色">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>角色名称: {{ scope.row.role.roleName }}</p>
            <p>角色备注: {{ scope.row.role.roleRemark }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{scope.row.role.roleName}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="性别"
        width="60px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.userSex === 1 ? 'primary' : 'danger'">
            {{scope.row.userSex === 1? '男':'女'}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="头像"
        align="center">
        <template slot-scope="scope">
            <img :src="scope.row.userPhoto | imageFilter" style="width: 65px; height: 65px;border-radius:5px"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="loginName"
        label="登录名">
      </el-table-column>
      <el-table-column
        prop="userPhone"
        label="手机">
      </el-table-column>
      <el-table-column
        label="邮箱"
        width="250px">
        <template slot-scope="scope">
          <i class="el-icon-message"></i>
          <span style="margin-left: 10px">{{ scope.row.userEmail }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="生日">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.userBirthday }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="rdate"
        label="注册日期">
      </el-table-column>
      <el-table-column
        prop="udate"
        label="修改日期">
      </el-table-column>
      <el-table-column
        prop="userAddress"
        label="住址">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="onUpdate(scope.row.userId)" type="text" size="small">修改</el-button>
          <el-button @click="onDelete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--  底部分页部分  -->
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

    <!--  添加修改弹出层  -->
    <el-dialog
      title="用户添加"
      label-position="right"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">

      <el-form ref="user" :model="user" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户姓名" prop="userName">
              <el-input v-model="user.userName" placeholder="请输入用户姓名"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="登录名称" prop="loginName">
              <el-input v-model="user.loginName" placeholder="请输入登陆名称"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户头像" prop="userPhoto">
              <el-upload
                class="avatar-uploader"
                name="photo"
                action="http://localhost:8080/system/user/photo"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户性别" prop="userSex">
              <el-radio-group v-model="user.userSex" fill="green" text-color="red">
                <el-radio label="1" border>男</el-radio>
                <el-radio label="2" border>女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="绑定角色" prop="role.roleId">
              <el-select v-model="user.role.roleId" clearable>
                <el-option
                  v-for="item in role_data"
                  :key="item.roleId"
                  :label="item.roleName+'('+item.roleRemark+')'"
                  :value="item.roleId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="登录密码" prop="loginPass">
              <el-input type="password" v-model="user.loginPass" placeholder="请输入登录密码"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="确认密码" prop="retypePass">
              <el-input type="password" v-model="user.retypePass" placeholder="请确认登录密码"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="手机号码" prop="userPhone">
              <el-input v-model.number="user.userPhone" placeholder="请输入手机号码"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电子邮箱" prop="userEmail">
              <el-input v-model="user.userEmail" placeholder="请输入电子邮箱" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="出生日期"  prop="userBirthday">
              <el-date-picker type="date" v-model="user.userBirthday" placeholder="选择出生日期" style="width: 100%;"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="家庭住址" prop="userAddress">
              <el-input type="textarea" v-model="user.userAddress" placeholder="请选择家庭住址"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit('user')">确 定</el-button>
      </span>
    </el-dialog>


    <!--  修改弹出层  -->
    <el-dialog
      title="用户修改"
      label-position="right"
      :visible.sync="dialogVisible_update"
      :before-close="handleClose"
      width="30%">
      <el-form ref="user" :model="user" :rules="rules" label-width="80px">
        <el-form-item label="用户姓名" prop="userName">
          <el-input v-model="user.userName" placeholder="请输入用户姓名"/>
        </el-form-item>
        <el-form-item label="用户性别" prop="userSex">
          <el-radio-group v-model="user.userSex" fill="green" text-color="red">
            <el-radio :label="1" border>男</el-radio>
            <el-radio :label="2" border>女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="绑定角色" prop="role.roleId">
          <el-select v-model="user.role.roleId" clearable>
            <el-option
              v-for="item in role_data"
              :key="item.roleId"
              :label="item.roleName+'('+item.roleRemark+')'"
              :value="item.roleId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登录名称">
          <el-input v-model="user.loginName" disabled placeholder="请输入登陆名称"/>
        </el-form-item>
        <el-form-item label="手机号码" prop="userPhone">
          <el-input v-model.number="user.userPhone" placeholder="请输入手机号码"/>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="userEmail">
          <el-input v-model="user.userEmail" placeholder="请输入电子邮箱" />
        </el-form-item>
        <el-form-item label="出生日期"  prop="userBirthday">
          <el-date-picker type="date" v-model="user.userBirthday" placeholder="选择出生日期" style="width: 100%;"/>
        </el-form-item>
        <el-form-item label="家庭住址" prop="userAddress">
          <el-input type="textarea" v-model="user.userAddress" placeholder="请选择家庭住址"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancle">取 消</el-button>
        <el-button type="primary" @click="onSubmit('user')">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import CommonPager from '../../../components/pager/CommonPager'
  let that;
  export default {
    name: 'User',
    components: {CommonPager},
    data() {
      //自定义确认密码校验
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.user.loginPass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      };
      //登陆名称唯一校验
      let validateLoginName = (rule, value, callback) => {
        this.axios.get('/system/user/uniqueness', {
            params: {
              loginName: value
            }
          })
          .then(result => {
            if(result.data)
            {
              callback()
            }
            else
            {
              callback(new Error('该登录名已存在, 请重新输入!'))
            }
          })
          .catch(error => console.log(error))
      };
      return {
        dates: '',
        //搜索绑定参数
        search: {
          userName: '',
          userPhone: '',
          userSex: '',
          sdate: '',
          edate: '',
          role: {
            roleId: ''
          },
          //定位当前页码
          currentPage: 1,
          //每页条数选择器
          pageSizes: [10, 20, 30],
          //总条数
          total: 1,
          //从第几页开始
          offset: 0,
          //每页显示条数
          limit: 10
        },
        //添加绑定参数
        user: {
          userId: '',
          userName: '',
          userSex: '',
          loginName: '',
          loginPass: '',
          retypePass: '',
          userPhone: '',
          userEmail: '',
          userBirthday: '',
          userAddress: '',
          userPhotoName: '',
          role: {
            roleId: ''
          }
        },
        //添加表单校验
        rules: {
          userName: [
            {required: true, message: '请输入用户姓名', trigger: 'blur'},
            {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'},
            {pattern: /[^\x00-\xff]/, message: '姓名只支持中文', trigger: 'blur'}
          ],
          'role.roleId': [
            {required: true, message: '请选择绑定角色', trigger: 'change'}
          ],
          userSex: [
            {required: true, message: '请选择用户性别', trigger: 'change'}
          ],
          loginName: [
            {required: true, message: '请输入登陆名称', trigger: 'blur'},
            {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'},
            {validator: validateLoginName , trigger: 'blur' }
          ],
          loginPass: [
            {required: true, message: '请输入登陆密码', trigger: 'blur'},
            {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
          ],
          retypePass: [
            {validator: validatePass , trigger: 'blur' }
          ],
          userPhone: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
            {pattern: /^1[345678]\d{9}$/, message: '目前只支持中国大陆的手机号码' }
          ],
          userEmail: [
            {required: true,  message: '请输入电子邮箱', trigger: 'blur'},
            {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
          ],
          userBirthday: [
            {required: true, message: '请选择出生日期', trigger: 'blur'}
          ],
          userAddress: [
            {required: true, message: '请输入家庭住址', trigger: 'blur'}
          ]
        },
        table_data: [],
        role_data: [],
        dialogVisible: false,
        dialogVisible_update: false,
        imageUrl: '',
        loading: true
      }
    },
    beforeCreate: function () {
      that = this;
    },
    filters: {
      datesplit(dates) {
        if(dates.length == 2)
        {
          that.search.sdate = dates[0]
          that.search.edate = dates[1]
        }
      },
      imageFilter(userPhoto) {
        return "data:image/jpg;base64,"+userPhoto;
      }
    },
    methods: {
      export_excel() {
        window.location.href = 'http://localhost:8080/system/user/export'
      },
      //头像页面回显
      handleAvatarSuccess(result, file) {
        this.user.userPhotoName = result
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      //选择文件前格式大小校验
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      //动态行号
      autoIndex(index) {
        return this.search.offset*this.search.limit+index+1
      },
      //每页查询多少条
      handleSizeChange(limit) {
        this.search.limit = limit;
        this.list()
      },
      //查询第几页
      handleCurrentChange(pagesize) {
        this.search.offset = parseInt(pagesize)-1;
        this.list()
      },
      //右上角关闭函数
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
            this.$refs['user'].resetFields()
            this.imageUrl = ''
            this.user.userPhotoName = ''
          })
          .catch(_ => {});
      },
      //弹出层取消函数
      handleCancle() {
        //清空表单
        this.imageUrl = ''
        this.user.userPhotoName = ''
        this.$refs['user'].resetFields()
        //窗口隐藏
        this.dialogVisible=false
        this.dialogVisible_update=false
      },
      //默认查询方法
      list() {
        let param =  this.search;
        this.axios.post("/system/user/query", param)
        .then((result) => {
          this.search.total = result.data.totalElements
          this.table_data = result.data.content
          this.loading = false
        })
        .catch((error)=>{
          console.log('查询异常:'+error)
        })
      },
      role_list() {
        this.axios.get("/system/role/query")
          .then((result) => {
            this.role_data = result.data
          })
          .catch((error)=>{
            console.log('角色查询异常:'+error)
          })
      },
      //添加方法
      onSubmit(formName) {
        let param =  this.user;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post("/system/user", param)
              .then((result) => {
                this.list()
                this.$refs['user'].resetFields()
              }).catch((error)=>{
              console.log('添加异常:'+error)
            })
            this.dialogVisible = false
            this.dialogVisible_update = false
            this.list()
          } else {
            console.log('用户添加, 校验失败, 请按照格式输入!');
            return false;
          }
        });
      },
      //修改方法
      onUpdate(userId) {
        this.axios.get('/system/user/'+userId)
          .then(result => (this.user = result.data))
          .catch(error => console.log(error))
        this.dialogVisible_update = true
      },
      //删除方法
      onDelete(row) {
        this.$prompt('请输入要删除的姓名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator: function(value)
          {
            return (value == row.userName)
          },
          inputErrorMessage: '输入名称与删除名称不匹配'
        }).then(({ value }) => {
          this.axios.delete('/system/user', {
              params: {
                userId: row.userId
              }
            })
            .then(result => {
              this.$message({
                type: 'success',
                message: '恭喜, 成功删除的删除了 ' + value
              });
              this.list()
            })
            .catch(error => console.log(error))
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          });
        });
      }
    },
    mounted () {
      this.list()
      this.role_list()
    }
  }
</script>

<style lang="scss">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
