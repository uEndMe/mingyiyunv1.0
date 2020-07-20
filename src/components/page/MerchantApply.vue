<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i> 商家入驻申请</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box" style="height:32px;">
                <el-input v-model="list_params.search" 
                placeholder="筛选关键词" 
                class="handle-input mr10"
                @keyup.enter.native="handleSearch">
                    <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch"></i>
                </el-input>
            </div>
            <el-table border :data="list">
                <el-table-column type="selection" width="35"></el-table-column>
                <el-table-column prop="name" label="商户姓名" align="center"></el-table-column>
                <el-table-column prop="nickname" label="会员昵称" align="center"></el-table-column>
                <el-table-column prop="mobile" label="商户手机" align="center"></el-table-column>
                <el-table-column prop="email" label="商户邮箱" align="center"></el-table-column>
                <el-table-column prop="industry" label="所属行业" align="center"></el-table-column>
                <el-table-column prop="add_time" label="创建时间" align="center"></el-table-column>
                <el-table-column label="创建商户" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="handleCreateClick(scope.row)">创建</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog title="创建商户" :visible.sync="visible_create" width="40%">
                <el-form :model="params" label-width="70px">
                    <el-form-item label="商户账号" :error="error_msg.username">
                        <el-input v-model="params.username" 
                        @focus="handleFocus('username')"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" label="登录密码" :error="error_msg.password" :rules="[{require: true}]">
                        <el-input v-model="params.password" 
                        @focus="handleFocus('password')"></el-input>
                    </el-form-item>
                    <el-form-item label="商户昵称" :error="error_msg.nickname">
                        <el-input v-model="params.nickname" 
                        @focus="handleFocus('nickname')"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" :error="error_msg.mobile">
                        <el-input v-model="params.mobile" 
                        @focus="handleFocus('mobile')"></el-input>
                    </el-form-item>
                    <el-form-item label="所属行业" :error="error_msg.industry">
                        <el-input v-model="params.industry" 
                        @focus="handleFocus('industry')"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="merchantCancle">取 消</el-button>
                    <el-button type="primary" @click="merchantCreate">确 定</el-button>
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
import Merchant from '../../api/merchant';
import { md5 } from '../../utils/util';
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
            params: {
                username: '',
                password: '',
                nickname: '',
                mobile: '',
                industry: ''
            },
            error_msg: {
                username: '',
                password: '',
                nickname: '',
                mobile: '',
                industry: ''
            },
            visible_create: false,
        }
    },
    methods: {
        getMerchantApplyList () {
            Merchant.apply(this.list_params)
            .then(res => {
                if(res !== false){
                    this.list_total = res.count;
                    this.list = res.list;
                    // console.log(this.list)
                }
            })
        },
        handleSearch () {
            this.list_params.page = 1;
            this.getMerchantApplyList();
        },
        handleCurrentChange (val) {
            this.list_params.page = val;
            this.getMerchantApplyList();
        },
        vailParams (params) {
            let passing = true;
            for(let key in params){
                if(key === 'mch_id') continue;
                if(params[key] === ''){
                    let key_name = '';
                    switch(key) {
                        case 'username':
                            key_name = '商户账号';
                            break;
                        case 'password':
                            key_name = '登录密码';
                            break;
                        case 'nickname':
                            key_name = '商户名称';
                            break;
                        case 'mobile':
                            key_name = '手机号码';
                            break;
                        case 'industry':
                            key_name = '所属行业';
                            break;
                        default: return
                    }
                    this.error_msg[key] = key_name + '不能为空';
                    passing = false;
                }
            }
            return passing
        },
        handleFocus (key) {
            this.error_msg[key] = '';
        },
        handleCreateClick (row) {
            this.visible_create = true;
            this.params.username = row.email;
            this.params.nickname = row.name;
            this.params.mobile = row.mobile;
            this.params.apply_id = row.apply_id;
            this.params.industry = row.industry;
            this.error_msg = this.$options.data().error_msg;
        },
        merchantCreateParams () {
            return {
                username: this.params.username,
                password: md5(this.params.password),
                nickname: this.params.nickname,
                mobile: this.params.mobile,
                industry: this.params.industry,
                apply_id: this.params.apply_id,
            };
        },
        merchantCreate () {
            if(!this.vailParams(this.params)) return
            Merchant.create(this.merchantCreateParams()).then(res => {
                if(res !== false){
                    this.$message.success('创建商户成功');
                    this.getMerchantApplyList();
                    this.visible_create = false;
                    this.params = this.$options.data().params;
                }
            })
        },
        merchantCancle () {
            this.visible_create = false;
            this.params = this.$options.data().params;
        },
    },
    created () {
        this.getMerchantApplyList();
    }
}
</script>
<style scoped>
    
</style>