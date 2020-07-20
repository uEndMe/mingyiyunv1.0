<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-wallet"></i> 用户提现</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-date-picker v-model="start_date"
                class="mr10 width130"
                type="date"
                format="yyyy-MM-dd"
                placeholder="开始时间"
                value-format="yyyy-MM-dd"
                @change="handleDateChange"
                ></el-date-picker>
                <el-date-picker v-model="end_date"
                class="width130"
                type="date"
                format="yyyy-MM-dd"
                placeholder="结束时间"
                value-format="yyyy-MM-dd"
                @change="handleDateChange"
                ></el-date-picker>
            </div>
            <el-table border :data="list">
                <el-table-column prop="nickname" label="提现人昵称" align="center"></el-table-column>
                <el-table-column prop="username" label="收款账号" align="center"></el-table-column>
                <el-table-column prop="money" label="提现金额(美元)" align="center"></el-table-column>
                <el-table-column prop="status_text" label="提现状态" align="center"></el-table-column>
                <el-table-column prop="action_time" label="管理员操作时间" align="center"></el-table-column>
                <el-table-column prop="add_time" label="申请提现时间" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.status === 0" type="text" 
                        @click="handleWithdrawalClick(scope.row.order_id)">
                            提现处理
                        </el-button>
                        <el-button v-if="scope.row.status === 7" type="text" 
                        :disabled="true" >
                            已完成
                        </el-button>
                        <el-button v-if="scope.row.status === 8" type="text" 
                        :disabled="true" >
                            提现失败
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog title="提现处理" :visible.sync="visible_withdrawal">
                <el-form>
                    <el-form-item>
                        <el-radio-group v-model="withdrawal_params.status">
                            <el-radio :label="0">提现失败</el-radio>
                            <el-radio :label="1">提现完成</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item :error="error_remark">
                        <el-input v-model="withdrawal_params.remark" 
                        type="textarea" 
                        resize="none" 
                        @focus="handleFocus"
                        placeholder="管理员操作备注"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="visible_withdrawal = false">取 消</el-button>
                    <el-button type="primary" @click="submitWithdrawalForm">确 定</el-button>
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
import MemberWith from '../../../api/withdrawal'
import { Message } from 'element-ui';
export default {
    data () {
        return {
            list: [],
            list_total: 0,
            list_params: {
                page: 1,
                limit: 10,
                type: 'u',
            },
            start_date: '',
            end_date: '',
            withdrawal_params: {
                status: 0,
                remark: ''
            },
            error_remark: '',
            visible_withdrawal: false,
        }
    },
    watch: {
        'end_date' () {
            if(this.start_date !== '' && this.end_date !== ''){
                if(this.end_date < this.start_date){
                    Message.warning('结束时间不能早于开始时间');
                    this.end_date = '';
                }
            }
        },
        'start_date' () {
            if(this.start_date !== '' && this.end_date !== ''){
                if(this.end_date < this.start_date){
                    Message.warning('开始时间不能晚于结束时间');
                    this.start_date = '';
                }
            }
        }
    },
    methods: {
        getWithdrawalList () {
            this.list_params.start_date = this.start_date?this.start_date:'';
            this.list_params.end_date = this.end_date?this.end_date:'';
            MemberWith.list(this.list_params)
            .then(res => {
                if(res !== false){
                    this.list_total = res.count;
                    res.list.forEach(item => {
                        item.money = (item.money / 100).toFixed(2);
                    });
                    this.list = res.list;
                    // console.log(this.list);
                }
            })
        },
        handleDateChange () {
            this.list_params.page = 1;
            this.getWithdrawalList();
        },
        handleWithdrawalClick (id) {
            this.visible_withdrawal = true;
            this.withdrawal_params.order_id = id;
            this.error_remark = '';
        },
        submitWithdrawalForm () {
            if(this.withdrawal_params.remark === ''){
                this.error_remark = '备注不能为空';
            }else{
                MemberWith.withdrawal(this.withdrawal_params)
                .then(res => {
                    if(res !== false){
                        Message.success('提现处理完成');
                        this.visible_withdrawal = false;
                        this.getWithdrawalList();
                    }
                })
            }
        },
        handleFocus () {
            this.error_remark = '';
        },
        handleCurrentChange (val) {
            this.list_params.page = val;
            this.getWithdrawalList();
        }
    },
    created () {
        this.getWithdrawalList();
    }
}
</script>
<style scoped>
    
</style>