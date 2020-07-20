<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-paperclip"></i> 意见反馈</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-delete" class="mr10" @click="handleDeleteClick">批量删除</el-button>
                <el-date-picker v-model="start_date"
                class="mr10 width130"
                type="date"
                format="yyyy-MM-dd"
                placeholder="起始时间"
                value-format="yyyy-MM-dd"
                @change="handleDateChange"
                ></el-date-picker>
                <el-date-picker v-model="end_date"
                class="width130"
                type="date"
                format="yyyy-MM-dd"
                placeholder="截止时间"
                value-format="yyyy-MM-dd"
                @change="handleDateChange"
                ></el-date-picker>
                <el-input v-model="list_params.search" 
                placeholder="筛选关键词" 
                class="handle-input mr10"
                @keyup.enter.native="handleDateChange"
                @blur="handleDateChange">
                    <i slot="suffix" class="el-input__icon el-icon-search" @click="handleDateChange"></i>
                </el-input>
            </div>
            <el-table border :data="list"
            tooltip-effect="light"
            @selection-change="handleChangeSelect">
                <el-table-column type="selection" width="35"></el-table-column>
                <el-table-column prop="nickname" label="用户昵称" align="center"></el-table-column>
                <el-table-column prop="content" label="反馈内容" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="contact" label="联系方式" align="center"></el-table-column>
                <el-table-column prop="remark" label="管理员备注" align="center"></el-table-column>
                <el-table-column prop="add_time" label="反馈时间" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleRemark(scope.row)">备注</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDeleteClick(scope.row.feedback_id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 备注 -->
            <el-dialog title="管理员备注信息" :visible.sync="visible_remark" width="50%">
                <el-input type="textarea" resize="none" v-model="remark_params.remark" placeholder="请输入备注信息"></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="visible_remark = false">取 消</el-button>
                    <el-button type="primary" @click="handleSubmitRemark">确 定</el-button>
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
import Feedback from '../../../api/feedback'
import { Message } from 'element-ui'
export default {
    data () {
        return {
            list: [],
            list_params: {
                search: '',
                page: 1,
                limit: 10,
            },
            list_total: 0,
            start_date: '',
            end_date: '',
            remark_params: {
                remark: ''
            },
            visible_remark: false,
            feedback_ids: ''
        }
    },
    watch: {
        'end_date' () {
            if(this.start_date !== '' && this.end_date !== ''){
                if(this.end_date < this.start_date){
                    Message.warning('截止时间不能比开始时间早');
                    this.end_date = '';
                }
            }
        },
        'start_date' () {
            if(this.start_date !== '' && this.end_date !== ''){
                if(this.end_date < this.start_date){
                    Message.warning('开始时间不能比开始时间晚');
                    this.start_date = '';
                }
            }
        }
    },
    methods: {
        getFeedBackList () {
            if(this.start_date){
                this.list_params.start_date = this.start_date;
            }else{
                delete this.list_params.start_date;
            }
            if(this.end_date){
                this.list_params.end_date = this.end_date;
            }else{
                delete this.list_params.end_date;
            }
            Feedback.list(this.list_params)
            .then(res => {
                if(res !== false){
                    this.list_total = res.count;
                    this.list = res.list;
                }
            })
        },
        handleDateChange () {
            this.list_params.page = 1;
            this.getFeedBackList();
        },
        handleChangeSelect (rows) {
            let arr = [];
            for(let item of rows){
                arr.push(item.feedback_id);
            }
            this.feedback_ids = arr.join(',');
        },
        handleRemark (row) {
            this.visible_remark = true;
            this.remark_params.remark = row.remark;
            this.remark_params.feedback_id = row.feedback_id;
        },
        handleSubmitRemark () {
            if(this.remark_params.remark === ''){
                this.visible_remark = false;
            }else{
                Feedback.remark(this.remark_params)
                .then(res => {
                    if(res !== false){
                        Message.success('备注成功');
                        this.visible_remark = false;
                    }
                })
            }
        },
        handleDeleteClick (id) {
            if(this.feedback_ids === '' && typeof(id) === 'object') return
            this.$confirm('确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.handleDelete(id);
            })
        },
        handleDelete (id) {
            Feedback.delete({feedback_ids: id?id:this.feedback_ids}).then(res => {
                if(res !== false){
                    Message.success('删除成功');
                    this.getFeedBackList();
                }
            })
        },
        handleCurrentChange (val) {
            this.list_params.page = val;
            this.getFeedBackList();
        },
    },
    created () {
        this.getFeedBackList();
    }
}
</script>