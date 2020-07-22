<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-s-home"></i> {{$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
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
            </div>
            <el-table border :data="list">
                <el-table-column type="selection" width="35" align="center"></el-table-column>
                <el-table-column prop="username" label="用户名" align="center"></el-table-column>
                <el-table-column prop="nickname" label="昵称" align="center"></el-table-column>
                <el-table-column prop="add_time" label="注册时间" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <!-- <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDeleteClick(scope.row.member_id)">删除</el-button>
                    </template> -->
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <!-- <el-pagination
                :page-size="list_params.limit"
                layout="prev, pager, next, jumper, total"
                :total="list_total"
                @current-change="handleCurrentChange"
                background
                class="pagination">
            </el-pagination> -->
        </div>
    </div>
</template>
<script>
import Member from '../../api/member'
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
                    this.$message.warning('截止时间不能早于开始时间');
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
        handleDateChange () {}
    },
}
</script>
<style scoped>
    
</style>