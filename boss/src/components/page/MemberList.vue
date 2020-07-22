<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-user-solid"></i> 会员列表</el-breadcrumb-item>
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
            @selection-change="handleChangeSelect">
                <el-table-column type="selection" width="35" align="center"></el-table-column>
                <el-table-column label="头像" align="center">
                    <template slot-scope="scope">
                        <el-image style="width: 50%;"
                        :src="scope.row.head_img">
                            <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="username" label="用户名" align="center"></el-table-column>
                <el-table-column prop="nickname" label="昵称" align="center"></el-table-column>
                <el-table-column label="亚马逊个人链接" show-overflow-tooltip align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleToRemote(scope.row.profile_link)">[亚马逊个人链接]</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="gender" label="性别" align="center"></el-table-column>
                <el-table-column prop="invite_username" label="邀请人" align="center"></el-table-column>
                <el-table-column prop="status" label="冻结/正常" align="center">
                    <template slot-scope="scope">
                        <el-switch 
                            v-model="scope.row.status"
                            @change="changeStatus(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="add_time" label="注册时间" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDeleteClick(scope.row.member_id)">删除</el-button>
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
    </div>
</template>
<script>
import Member from '../../api/member'
import { Message } from 'element-ui';
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
            start_date: '',
            end_date: '',
            member_ids: ''
        }
    },
    watch: {
        'end_date' () {
            if(this.start_date !== '' && this.end_date !== ''){
                if(this.end_date < this.start_date){
                    Message.warning('截止时间不能早于开始时间');
                    this.end_date = '';
                }
            }
        },
        'start_date' () {
            if(this.start_date !== '' && this.end_date !== ''){
                if(this.end_date < this.start_date){
                    Message.warning('开始时间不能晚于截止时间');
                    this.start_date = '';
                }
            }
        }
    },
    methods: {
        getMemberList () {
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
            Member.list(this.list_params)
            .then(res => {
                if(res !== false){
                    for(let i=0;i<res.list.length;i++){
                        res.list[i].status = res.list[i].status?true:false;
                    }
                    this.list_total = res.count;
                    this.list = res.list;
                    // console.log(this.list)
                }
            })
        },
        handleDateChange () {
            this.list_params.page = 1;
            this.getMemberList();
        },
        handleDeleteClick (id) {
            if(this.member_ids === '' && typeof(id) === 'object') return
            this.$confirm('确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteHandle(id);
            })
        },
        handleChangeSelect (sele) {
            let arr = [];
            for(let item of sele){
                arr.push(item.member_id);
            }
            this.member_ids = arr.join(',');
        },
        deleteHandle (id) {
            Member.delete({member_ids: id?id:this.member_ids})
            .then(res => {
                if(res !== false){
                    this.$message.success('删除成功');
                    this.getMemberList();
                }
            })
        },
        changeStatus (row) {
            Member.status({member_id: row.member_id, status: row.status?1:0});
        },
        handleCurrentChange (val) {
            this.list_params.page = val;
            this.getMemberList();
        },
        handleToRemote (url) {
            window.open(url, '_blank');
        },
    },
    created () {
        this.getMemberList();
    }
}
</script>
<style scoped>
    
</style>