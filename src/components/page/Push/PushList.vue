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
                <el-button type="primary" icon="el-icon-plus" @click="$router.push('/push/create')">添加</el-button>
                <el-input v-model="list_params.search" 
                placeholder="筛选关键词" 
                class="handle-input mr10"
                @keyup.enter.native="handleSearch">
                    <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch"></i>
                </el-input>
            </div>
            <el-table border :data="list"
            @selection-change="handleChangeSelect">
                <el-table-column type="selection" width="35"></el-table-column>
                <el-table-column prop="img_path" label="预览图" align="center">
                    <template slot-scope="scope">
                        <el-image style="width: 50%;"
                        :src="scope.row.img_path">
                            <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="精选推送标题" min-width="200"></el-table-column>
                <el-table-column prop="status" label="启用状态" align="center">
                    <template slot-scope="scope">
                        <el-switch 
                        v-model="scope.row.status"
                        @change="changeStatus(scope.$index, scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="add_time" label="数据创建时间"></el-table-column>
                <el-table-column prop="browse" label="文章浏览次数" min-width="50"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEditClick(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDeleteClick(scope.$index, scope.row)">删除</el-button>
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
import Push from '../../../api/Push'
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
            visible_delete: false,
            push_ids: ''
        }
    },
    methods: {
        getPushList () {
            Push.list(this.list_params)
            .then(res => {
                if(res !== false){
                    for(let i=0;i<res.list.length;i++){
                        if(res.list[i].status === 1){
                            res.list[i].status = true;
                        }else{
                            res.list[i].status = false;
                        }
                    }
                    this.list_total = res.count;
                    this.list = res.list;
                    // console.log(this.list)
                }
            })
        },
        handleSearch () {
            this.list_params.page = 1;
            this.getPushList();
        },
        handleEditClick (index, row) {
            this.$router.push({
                name: 'pushedit',
                query: {
                    push_id: row.push_id,
                }
            })
        },
        handleDeleteClick (index, row) {
            if(this.push_ids === '' && typeof(row) === 'undefined') return
            this.$confirm('确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteHandle(row);
            })
        },
        handleChangeSelect (sele) {
            let arr = [];
            for(let id of sele){
                arr.push(id.push_id);
            }
            this.push_ids = arr.join(',');
        },
        deleteHandle (row) {
            Push.delete({push_ids: row?row.push_id:this.push_ids})
            .then(res => {
                if(res !== false){
                    this.$message.success('删除成功');
                    this.getPushList();
                }
            })
        },
        changeStatus (index, row) {
            Push.status({push_id: row.push_id, status: row.status?1:0});
        },
        handleCurrentChange (val) {
            this.list_params.page = val;
            this.getPushList();
        },
    },
    created () {
        this.getPushList();
    }
}
</script>
<style scoped>
    
</style>