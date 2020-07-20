<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 管理员列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="handleDeleteClick">批量删除</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="handleCreate">添加</el-button>
            </div>
            <el-table border :data="list" class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="username" label="用户名"></el-table-column>
                <el-table-column prop="nickname" label="昵称"></el-table-column>
                <el-table-column prop="role_name" label="角色名称"></el-table-column>
                <el-table-column prop="status" label="启用状态" align="center">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.status"
                         @change="changeStatus(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="last_time" label="最近登录时间"></el-table-column>
                <el-table-column prop="add_time" label="账号创建时间"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDeleteClick(scope.row)">删除</el-button>
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
        <el-dialog title="编辑管理员" :visible.sync="editVisible" width="30%">
            <el-form ref="edit" :model="params" label-width="80px" label-position="right">
                <el-form-item label="昵称" :error="error_msg.nickname">
                    <el-input v-model="params.nickname"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="params.password" placeholder="为空时不修改密码"></el-input>
                </el-form-item>
                <!-- <el-form-item label="角色组">
                    <el-select v-model="edit.query">
                        <el-option v-for="item of role_select" :key="item.role_id" :label="item.name" :value="item.role_id"></el-option>
                    </el-select>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEditForm">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 创建管理员弹出框 -->
        <el-dialog title="创建管理员" :visible.sync="createVisible" width="40%">
            <el-form ref="create" :model="params" label-width="60px" label-position="right">
                <el-form-item label="用户名" :error="error_msg.username">
                    <el-input v-model="params.username"></el-input>
                </el-form-item>
                <el-form-item label="昵称" :error="error_msg.nickname">
                    <el-input v-model="params.nickname"></el-input>
                </el-form-item>
                <el-form-item label="密码" :error="error_msg.password">
                    <el-input v-model="params.password"></el-input>
                </el-form-item>
                <!-- <el-form-item label="角色组">
                    <el-select v-model="create.query">
                        <el-option v-for="item of role_select" :key="item.role_id" :label="item.name" :value="item.role_id"></el-option>
                    </el-select>
                </el-form-item> -->
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
    import {md5} from '@/utils/util';
    import { Message } from 'element-ui';
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
                    nickname: ''
                },
                error_msg: {
                    username: '',
                    password: '',
                    nickname: ''
                },
                admin_ids: ''
                // role_select: [],
            }
        },
        methods: {
            handleCreate () {
                this.createVisible = true;
                this.params = this.$options.data().params;
                this.error_msg = this.$options.data().error_msg;
            },
            handleEdit (row) {
                this.editVisible = true;
                this.params.nickname = row.nickname;
                this.params.admin_id = row.admin_id;
                if(this.params.password){
                    this.params.password = md5(this.params.password);
                }
                delete this.params.username;
                this.error_msg = this.$options.data().error_msg;
            },
            changeStatus (row) {
                let params = {
                    admin_id: parseInt(row.admin_id),
                    status: row.status ? 1 :0
                }
                Admin.status(params)
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
                            case 'nickname':
                                key_name = '昵称';
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
                if(!this.vailParams(this.params, 1)) return
                Admin.update(this.params).then(res => {
                    if(res !== false){
                        this.$message.success('编辑管理员成功');
                        this.getAdminList();
                        this.editVisible = false;
                    }
                })
            },
            submitCreateForm () {
                if(!this.vailParams(this.params)) return
                this.params.password = md5(this.params.password);
                Admin.create(this.params).then(res => {
                    if(res !== false){
                        this.$message.success('创建管理员成功');
                        this.getAdminList();
                        this.createVisible = false;
                        this.params = this.$options.data().params;
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
                    for(let i=0;i<res.list.length;i++){
                        res.list[i].status = res.list[i].status?true:false;
                    }
                    this.list_total = res.count;
                    this.list = res.list;
                })
            },
            // getRoleSelect () {
            //     Admin.role_select().then(res => {
            //         this.role_select = res.list;
            //     })
            // },
        },
        created () {
            // 管理员列表
            this.getAdminList();

            //角色名称下拉列表
            // this.getRoleSelect();
        }
    }

</script>

<style scoped>
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
</style>
