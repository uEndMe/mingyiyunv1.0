<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i> 商家入驻申请</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box" style="height:32px;">

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
                        <el-button type="primary" @click="handleMerchantCreateClick(scope.row)">创建</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog title="创建商户" :visible.sync="merchant_create" width="40%">
                <el-form :model="merchant_params" label-width="70px">
                    <el-form-item label="商户账号" :error="merchant_error_msg.username">
                        <el-input v-model="merchant_params.username" 
                        @focus="handleMerchantFocus('username')"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" label="登录密码" :error="merchant_error_msg.password" :rules="[{require: true}]">
                        <el-input v-model="merchant_params.password" 
                        @focus="handleMerchantFocus('password')"></el-input>
                    </el-form-item>
                    <el-form-item label="商户昵称" :error="merchant_error_msg.nickname">
                        <el-input v-model="merchant_params.nickname" 
                        @focus="handleMerchantFocus('nickname')"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" :error="merchant_error_msg.mobile">
                        <el-input v-model="merchant_params.mobile" 
                        @focus="handleMerchantFocus('mobile')"></el-input>
                    </el-form-item>
                    <el-form-item label="所属行业" :error="merchant_error_msg.industry">
                        <el-input v-model="merchant_params.industry" 
                        @focus="handleMerchantFocus('industry')"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="merchant_create = false">取 消</el-button>
                    <el-button type="primary" @click="merchantCreate">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 分页 -->
            <el-pagination
                :page-size="merchant_list_params.limit"
                layout="prev, pager, next, jumper, total"
                :total="merchant_list_total"
                @current-change="handleCurrentChange"
                background
                class="pagination">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import Merchant from '../../api/merchant'
export default {
    data () {
        return {
            merchant_list: [],
            merchant_list_total: 0,
            merchant_list_params: {
                page: 1,
                limit: 5,
                search: ''
            },
            merchant_params: {
                username: '',
                password: '',
                nickname: '',
                mobile: '',
                industry: ''
            },
            merchant_error_msg: {
                username: '',
                password: '',
                nickname: '',
                mobile: '',
                industry: ''
            },
            merchant_create: false,
        }
    },
    methods: {
        getMerchantApplyList () {
            Merchant.apply(this.merchant_list_params)
            .then(res => {
                if(res !== false){
                    this.merchant_list_total = res.count;
                    this.list = res.list;
                    // console.log(this.list)
                }
            })
        },
        handleSearch () {
            this.merchant_list_params.page = 1;
            this.getMerchantApplyList();
        },
        handleCurrentChange (val) {
            this.merchant_list_params.page = val;
            this.getMerchantApplyList();
        },
        vailParams (params) {
            let passing = true;
            for(let key in merchant_params){
                if(key === 'mch_id') continue;
                if(merchant_params[key] === ''){
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
                    this.merchant_error_msg[key] = key_name + '不能为空';
                    passing = false;
                }
            }
            return passing
        },
        handleMerchantFocus (key) {
            this.merchant_error_msg[key] = '';
        },
        handleMerchantCreateClick (row) {
            this.merchant_create = true;
            this.merchant_params.username = row.email;
            this.merchant_params.nickname = row.name;
            this.merchant_params.mobile = row.mobile;
            this.merchant_params.apply_id = row.apply_id;
            this.merchant_params.industry = row.industry;
            this.merchant_error_msg = this.$options.data().merchant_error_msg;
        },
        merchantCreate () {
            if(!this.vailParams(this.merchant_params)) return
            Merchant.create(this.merchant_params).then(res => {
                if(res !== false){
                    this.$message.success('创建商户成功');
                    this.getMerchantApplyList();
                    this.merchant_create = false;
                    this.merchant_params = this.$options.data().merchant_params;
                }
            })
        }
    },
    created () {
        this.getMerchantApplyList();
    }
}
</script>
<style scoped>
    
</style>