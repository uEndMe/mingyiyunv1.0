<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-paperclip"></i> 精选推送</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-delete" class="mr10" @click="handleDeleteClick">批量删除</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="handleEditClick('create')">添加</el-button>
                <el-input v-model="list_params.search" 
                placeholder="筛选关键词" 
                class="handle-input mr10"
                @keyup.enter.native="handleSearch">
                    <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch"></i>
                </el-input>
            </div>
            <el-table border :data="list"
            @selection-change="handleChangeSelect">
                <el-table-column type="selection" width="35" align="center"></el-table-column>
                <el-table-column prop="username" label="商户账号" align="center"></el-table-column>
                <el-table-column prop="nickname" label="商户昵称" align="center"></el-table-column>
                <el-table-column prop="industry" label="所属行业" align="center"></el-table-column>
                <el-table-column prop="mobile" label="手机号码" align="center"></el-table-column>
                <el-table-column prop="add_time" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="balance" label="商户余额(美元)" align="center"></el-table-column>
                <el-table-column label="启用状态" align="center">
                    <template slot-scope="scope">
                        <el-switch 
                        v-model="scope.row.status"
                        @change="changeStatus(scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="VIP" align="center">
                    <template slot-scope="scope">
                        <el-switch 
                        v-model="scope.row.vip"
                        @change="changeVip(scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" min-width="150">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-bank-card" class="green" @click="handleRecharge(scope.row.mch_id)">充值</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleEditClick(scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDeleteClick(scope.row.mch_id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 创建-更新 -->
            <el-dialog :title="create_edit_title" :visible.sync="visible_create" width="50%">
                <el-form ref="create" :model="create_edit" label-width="70px" label-position="left">
                    <el-form-item label="商户账号" prop="username" :error="error_msg.username">
                        <el-input v-model="create_edit.username" @focus="handleFocus('username')"></el-input>
                    </el-form-item>
                    <el-form-item label="商户名称" prop="nickname" :error="error_msg.nickname">
                        <el-input v-model="create_edit.nickname" @focus="handleFocus('nickname')"></el-input>
                    </el-form-item>
                    <el-form-item label="商户密码" prop="password" :error="error_msg.password">
                        <el-input type="password" v-model="create_edit.password" 
                        @focus="handleFocus('password')" :placeholder="create_edit_title === '编辑商户'?'为空时不修改密码':''">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="mobile" :error="error_msg.mobile">
                        <el-input type="number" v-model="create_edit.mobile" @focus="handleFocus('mobile')"></el-input>
                    </el-form-item>
                    <el-form-item label="所属行业" prop="industry" :error="error_msg.industry">
                        <el-input v-model="create_edit.industry" @focus="handleFocus('industry')"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="visible_create = false">取 消</el-button>
                    <el-button type="primary" @click="submitCreateForm">确 定</el-button>
                </span>
            </el-dialog>

            <el-dialog title="商户充值" :visible.sync="visible_recharge" width="40%">
                <el-form>
                    <el-form-item :error="error_msg.recharge">
                        <el-input v-model="recharge" 
                        @focus="handleFocus('recharge')"
                        placeholder="请输入您要充值的金额"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="visible_recharge = false">取 消</el-button>
                    <el-button type="primary" @click="submitRecharge">确 定</el-button>
                </span>
            </el-dialog>

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
    </div>
</template>
<script>
import Merchant from '../../api/merchant'
import { Message } from 'element-ui';
import { md5 } from '../../utils/util'
export default {
    data () {
        return {
            list: [],
            list_total: 0,
            list_params: {
                page: 1,
                limit: 10,
                search: ''
            },
            create_edit: {
                username: '',
                password: '',
                nickname: '',
                industry: '',
                mobile: ''
            },
            error_msg: {
                username: '',
                password: '',
                nickname: '',
                industry: '',
                mobile: '',
                recharge: ''
            },
            create_edit_title: '',
            recharge: '',
            recharge_id: '',
            visible_create: false,
            visible_recharge: false,
            mch_ids: ''
        }
    },
    watch: {
        'recharge' () {
            let str = this.recharge;
            for(let item of str){
                if(!Number(item)){
                    if(item === '0') continue;
                    if(item === '.' && str.lastIndexOf('.') !== 0){
                        if(str.indexOf('.') === str.lastIndexOf('.')) continue
                    }
                    this.recharge = str.slice(0,str.length - 1);
                }
            }
            if(str.lastIndexOf('.') > -1){
                let arr = str.split('.');
                if(arr[1].length > 2){
                    this.recharge = str.slice(0,str.length - 1);
                    this.$message.warning('价格最多保留两位小数');
                }
            }
        }
    },
    methods: {
        getMerchantList () {
            Merchant.list(this.list_params)
            .then(res => {
                if(res !== false){
                    for(let i=0;i<res.list.length;i++){
                        res.list[i].status = res.list[i].status?true:false;
                        res.list[i].vip = res.list[i].vip?true:false;
                        res.list[i].balance = (res.list[i].balance / 100).toFixed(2);
                    }
                    this.list_total = res.count;
                    this.list = res.list;
                    // console.log(this.list)
                }
            })
        },
        handleSearch () {
            this.list_params.page = 1;
            this.getMerchantList();
        },
        vailData (data, action) {
            let passing = true;
            for(let key in data){
                if(key === 'mch_id') continue;
                if(action && key === 'password') continue;
                if(data[key] === ''){
                    let item = '';
                    switch(key){
                        case 'username':
                            item = '商户账号';
                            break;
                        case 'password':
                            item = '商户密码';
                            break; 
                        case 'nickname':
                            item = '商户名称';
                            break; 
                        case 'mobile':
                            item = '手机号码';
                            break; 
                        default: item = '所属行业'    
                    }
                    this.error_msg[key] = item + '不能为空';
                    passing = false;
                }else{
                    this.error_msg[key] = '';
                }
            }
            return passing
        },
        handleFocus (key) {
            this.error_msg[key] = '';
        },
        handleEditClick (row) {
            this.visible_create = true;
            this.error_msg = {
                username: '',
                password: '',
                nickname: '',
                industry: '',
                mobile: '',
                recharge: ''
            }
            if(typeof(row) === 'object'){
                this.create_edit_title = '编辑商户';
                this.create_edit.username = row.username;
                this.create_edit.nickname = row.nickname;
                this.create_edit.industry = row.industry;
                this.create_edit.mobile = row.mobile;
                this.create_edit.mch_id = row.mch_id;
                this.create_edit.password = '';
            }else{
                this.create_edit_title = '创建商户';
                this.create_edit.username = '';
                this.create_edit.nickname = '';
                this.create_edit.industry = '';
                this.create_edit.mobile = '';
                this.create_edit.password = '';
                delete this.create_edit.mch_id;
            }
        },
        submitCreateForm () {
            if(this.create_edit.password !== ''){
                this.create_edit.password = md5(this.create_edit.password);
            }
            if(this.create_edit_title === '编辑商户'){
                if(!this.vailData(this.create_edit, 1)) return
                Merchant.update(this.create_edit).then(res => {
                    if(res !== false){
                        Message.success('商户数据更新成功');
                        this.getMerchantList();
                    }
                })
            }else{
                if(!this.vailData(this.create_edit)) return
                Merchant.create(this.create_edit).then(res => {
                    if(res !== false){
                        Message.success('创建商户成功');
                        this.getMerchantList();
                    }
                })
            }
            this.visible_create = false;
        },
        handleDeleteClick (id) {
            if(this.mch_ids === '' && typeof(id) === 'object') return
            this.$confirm('确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteHandle(id);
            }).catch(() => {
                return
            })
        },
        handleChangeSelect (sele) {
            let arr = [];
            for(let id of sele){
                arr.push(id.mch_id);
            }
            this.mch_ids = arr.join(',');
        },
        deleteHandle (id) {
            Merchant.delete({mch_ids: typeof(id) === 'object'?this.mch_ids:id})
            .then(res => {
                if(res !== false){
                    this.$message.success('删除成功');
                    this.getMerchantList();
                }
            })
        },
        changeStatus (row) {
            Merchant.status({mch_id: row.mch_id, status: row.status?1:0});
        },
        changeVip (row) {
            Merchant.vip({mch_id: row.mch_id, vip: row.vip?1:0});
        },
        handleRecharge (id) {
            this.visible_recharge = true;
            this.recharge_id = id;
            this.recharge = '';
            this.error_msg.recharge = '';
        },
        submitRecharge () {
            if(this.recharge === ''){
                this.error_msg.recharge = '充值金额不能为空';
            }else{
                Merchant.recharge({mch_id: this.recharge_id, money: Math.round(this.recharge*100)})
                .then(res => {
                    if(res !== false){
                        Message.success('充值成功');
                        this.visible_recharge = false;
                        this.getMerchantList();
                    }
                })
            }
        },
        handleCurrentChange (val) {
            this.list_params.page = val;
            this.getMerchantList();
        },
    },
    created () {
        this.getMerchantList();
    },
}
</script>
<style scoped>
.green {
    color: #66ff66;
}
</style>