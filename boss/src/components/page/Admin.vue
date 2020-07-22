<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-zk-system"></i> {{$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="handleDeleteClick">批量删除</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="handleCreate">添加</el-button>
            </div>
            <el-table border :data="list" class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="40" align="center"></el-table-column>
                <el-table-column prop="username" label="用户名" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="gender_text" label="性别" align="center" width="50"></el-table-column>
                <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
                <el-table-column prop="email" label="邮箱" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="qq" label="QQ" align="center"></el-table-column>
                <el-table-column prop="wechat" label="微信" align="center"></el-table-column>
                <el-table-column prop="dept_name" label="部门名称" align="center"></el-table-column>
                <el-table-column prop="position" label="职位" align="center"></el-table-column>
                <el-table-column label="部门负责人" align="center" width="100">
                    <template slot-scope="scope">
                        {{scope.row.is_leader ? '是' : '否'}}
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="启用状态" align="center" width="100">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.status"
                         @change="changeStatus(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="last_time" label="最近登录时间" align="center"></el-table-column>
                <el-table-column label="账号创建时间" align="center" width="110">
                    <template slot-scope="scope">
                        {{scope.row.add_time.slice(0,10)}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="130">
                    <template slot-scope="scope">
                    <div class="table-operation">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDeleteClick(scope.row)">删除</el-button>
                    </div>
                    </template>
                </el-table-column>
            </el-table>
            
            <!-- 分页 -->
            <el-pagination
                :page-size="list_params.limit"
                layout="prev, pager, next, jumper, total"
                :total="list_total"
                @current-change="handleCurrentChange"
                background
                class="pagination">
            </el-pagination>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="账号编辑" :visible.sync="editVisible" width="50%">
            <el-form ref="edit" label-width="120px" label-position="right">
                <el-form-item label="姓名" :error="error_msg.name">
                    <el-input v-model="params.name" @focus="handleFocus('name')"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="params.gender">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                        <el-radio :label="0">保密</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="联系电话" :error="error_msg.phone">
                    <el-input v-model="params.phone" @focus="handleFocus('phone')"></el-input>
                </el-form-item>
                <el-form-item label="Email" :error="error_msg.email">
                    <el-input v-model="params.email" @focus="handleFocus('email')"></el-input>
                </el-form-item>
                <el-form-item label="QQ" :error="error_msg.qq">
                    <el-input v-model="params.qq" @focus="handleFocus('qq')"></el-input>
                </el-form-item>
                <el-form-item label="微信号" :error="error_msg.wechat">
                    <el-input v-model="params.wechat" @focus="handleFocus('wechat')"></el-input>
                </el-form-item>
                <el-form-item label="所属部门" :error="error_msg.dept_id">
                    <el-select v-model="params.dept_id" @focus="handleFocus('dept_id')">
                        <el-option v-for="item of dept_select" :key="item.dept_id"
                            :label="item.name"
                            :value="item.dept_id"
                            :disabled="item.status">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职位" :error="error_msg.position">
                    <el-input v-model="params.position" @focus="handleFocus('position')"></el-input>
                </el-form-item>
                <el-form-item label="部门负责人">
                    <el-radio-group v-model="params.is_leader">
                        <el-radio :label="0">否</el-radio>
                        <el-radio :label="1">是</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="权限角色" :error="error_msg.role_id">
                    <el-select v-model="params.role_id" @focus="handleFocus('role_id')">
                        <el-option v-for="item of role_select" :key="item.role_id"
                            :label="item.name"
                            :value="item.role_id"
                            :disabled="item.status">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEditForm">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 创建管理员弹出框 -->
        <el-dialog title="创建管理员" :visible.sync="createVisible" width="50%">
            <el-form ref="create" label-width="120px" label-position="right">
                <el-form-item label="用户名" :error="error_msg.username">
                    <el-input v-model="params.username" @focus="handleFocus('username')"></el-input>
                </el-form-item>
                <el-form-item label="密码" :error="error_msg.password">
                    <el-input v-model="params.password"
                        @focus="handleFocus('password')"
                        type="password"
                        show-password>
                    </el-input>
                </el-form-item>
                <el-form-item label="姓名" :error="error_msg.name">
                    <el-input v-model="params.name" @focus="handleFocus('name')"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="params.gender">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                        <el-radio :label="0">保密</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="联系电话" :error="error_msg.phone">
                    <el-input v-model="params.phone" @focus="handleFocus('phone')"></el-input>
                </el-form-item>
                <el-form-item label="Email" :error="error_msg.email">
                    <el-input v-model="params.email" @focus="handleFocus('email')"></el-input>
                </el-form-item>
                <el-form-item label="QQ" :error="error_msg.qq">
                    <el-input v-model="params.qq" @focus="handleFocus('qq')"></el-input>
                </el-form-item>
                <el-form-item label="微信号" :error="error_msg.wechat">
                    <el-input v-model="params.wechat" @focus="handleFocus('wechat')"></el-input>
                </el-form-item>
                <el-form-item label="所属部门" :error="error_msg.dept_id">
                    <el-select v-model="params.dept_id" @focus="handleFocus('dept_id')">
                        <el-option v-for="item of dept_select" :key="item.dept_id"
                            :label="item.name"
                            :value="item.dept_id"
                            :disabled="item.status">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职位" :error="error_msg.position">
                    <el-input v-model="params.position" @focus="handleFocus('position')"></el-input>
                </el-form-item>
                <el-form-item label="部门负责人">
                    <el-radio-group v-model="params.is_leader">
                        <el-radio :label="0">否</el-radio>
                        <el-radio :label="1">是</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="权限角色" :error="error_msg.role_id">
                    <el-select v-model="params.role_id" @focus="handleFocus('role_id')">
                        <el-option v-for="item of role_select" :key="item.role_id"
                            :label="item.name"
                            :value="item.role_id"
                            :disabled="item.status">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="createVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitCreateForm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Admin from '../../api/admin';
import { roleList } from '../../api/role';
import { deptList } from '../../api/dept';
import {md5} from '@/utils/util';
export default {
    name: 'admin',
    data() {
        return {
            list: [],
            list_total: 0,
            list_params: {
                page: 1,
                limit: 10
            },
            editVisible: false,
            createVisible: false,
            
            params: {
                username: '',
                password: '',
                name: '',
                role_id: '',
                gender: 1,
                phone: '',
                email: '',
                qq: '',
                wechat: '',
                dept_id: '',
                position: '',
                is_leader: 0,

            },
            error_msg: {
                username: '',
                password: '',
                name: '',
                role_id: '',
                phone: '',
                email: '',
                qq: '',
                wechat: '',
                dept_id: '',
                position: '',
            },
            admin_ids: '',
            role_select: [],
            dept_select: [],
        }
    },
    methods: {
        handleCreate () {
            this.getRoleSelect();
            this.getDeptSelect();
            this.createVisible = true;
            this.params = this.$options.data().params;
            this.error_msg = this.$options.data().error_msg;
        },
        handleEdit (row) {
            this.getRoleSelect();
            this.getDeptSelect();
            this.editVisible = true;
            this.params = Object.assign({}, row);
            // console.log(this.dept_select);
            this.error_msg = this.$options.data().error_msg;
        },
        changeStatus (row) {
            let params = {
                admin_id: parseInt(row.admin_id),
                status: row.status ? 1 : 0
            }
            Admin.status(params)
        },
        handleFocus (key) {
            this.error_msg[key] = '';
        },
        vailParams (params, ac) {
            let passing = true;
            for(let key in params){
                if(key === 'admin_id') continue;
                if(key === 'password' && ac) continue;
                if(params[key] === ''){
                    let key_name = '';
                    switch(key){
                        case 'username':
                            key_name = '账号';
                            break;
                        case 'password':
                            key_name = '密码';
                            break;
                        case 'name':
                            key_name = '姓名';
                            break;
                        case 'role_id':
                            key_name = '权限角色';
                            break;
                        case 'phone':
                            key_name = '联系电话';
                            break;
                        case 'email':
                            key_name = 'Email';
                            break;
                        case 'qq':
                            key_name = 'QQ';
                            break;
                        case 'wechat':
                            key_name = '微信号';
                            break;
                        case 'dept_id':
                            key_name = '所属部门';
                            break;
                        case 'position':
                            key_name = '职位';
                            break;
                        default: return
                    }
                    this.error_msg[key] = key_name + '不能为空';
                    passing = false;
                }
            }
            return passing
        },
        //点击编辑确认操作
        submitEditForm () {
            let params = {
                admin_id: parseInt(this.params.admin_id),
                role_id: parseInt(this.params.role_id),
                name: this.params.name,
                gender: this.params.gender,
                phone: this.params.phone,
                email: this.params.email,
                qq: this.params.qq,
                wechat: this.params.wechat,
                dept_id: parseInt(this.params.dept_id),
                position: this.params.position,
                is_leader: parseInt(this.params.is_leader),
            };
            if(!this.vailParams(params)) return
            Admin.update(this.params).then(res => {
                if(res !== false){
                    this.$message.success('账号修改成功');
                    this.getAdminList();
                    this.editVisible = false;
                }
            })
        },
        submitCreateForm () {
            if(!this.vailParams(this.params)) return
            this.params.password = md5(this.params.password);
            let params = {
                username: this.params.username,
                password: md5(this.params.password),
                role_id: parseInt(this.params.role_id),
                name: this.params.name,
                gender: parseInt(this.params.gender),
                phone: this.params.phone,
                email: this.params.email,
                qq: this.params.qq,
                wechat: this.params.wechat,
                dept_id: parseInt(this.params.dept_id),
                position: this.params.position,
                is_leader: parseInt(this.params.is_leader),
            }
            Admin.create(params).then(res => {
                if(res){
                    this.$message.success('创建管理员成功');
                    this.getAdminList();
                    this.createVisible = false;
                    // this.params = this.$options.data().params;
                }
            })
        },
        //删除
        handleDeleteClick (row) {
            if(this.admin_ids === '' && !row.admin_id) return
            this.$confirm('确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.handleDelete(row);
            })
            .catch(() => {});
        },
        handleDelete (row) {
            Admin.del({admin_ids: row.admin_id?row.admin_id:this.admin_ids})
            .then(res => {
                if(res !== false){
                    this.$message.success('删除成功');
                    this.admin_ids = '';
                    this.getAdminList();
                }
            })
        },
        handleSelectionChange (val) {
            if(val.length){
                let delArr = [];
                for(let i = 0; i < val.length; i++){
                    delArr.push(val[i].admin_id);
                }
                this.admin_ids = delArr.join(',');
            }
        },
        handleCurrentChange (val) {
            this.list_params.page = val;
            this.getAdminList();
        },
        getAdminList () {
            Admin.list().then(res => {
                // console.log(res.list);
                this.list_total = res.count;
                this.list = res.list;
            })
        },
        getRoleSelect () {
            roleList().then(res => {
                if (res) {
                    res.list.forEach((item) => {
                        item.status = item.status ? true : false;
                    })
                    this.role_select = res.list;
                }
            })
        },
        getDeptSelect () {
            deptList().then(res => {
                if (res) {
                    res.list.forEach((item) => {
                        item.status = item.status ? true : false;
                    })
                    this.dept_select = res.list;
                    // console.log(this.dept_select);
                }
            })
        },
    },
    created () {
        this.getAdminList();
    }
}
</script>

<style lang="less" scoped>
/deep/ .el-form {
    display: flex;
    flex-wrap: wrap;
}
/deep/ .el-form-item {
    min-width: 350px;
    margin-right: 30px;
    .el-input__inner {
        min-width: 230px;
    }
}
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.del-dialog-cnt{
    font-size: 16px;
    text-align: center
}
.table{
    width: 100%;
    font-size: 14px;
}
.red{
    color: #ff0000;
}
.mr10{
    margin-right: 10px;
}
// .table-operation {
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: center;
//     align-items: center;
// }
</style>
