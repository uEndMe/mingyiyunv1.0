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
                <el-button type="primary" icon="el-icon-plus" @click="handleCreateClick">添加关键词</el-button>
                <el-input v-model="list_params.search" 
                placeholder="筛选关键词" 
                class="handle-input mr10"
                @keyup.enter.native="getWordsList">
                    <i slot="suffix" class="el-input__icon el-icon-search" @click="getWordsList"></i>
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
                <el-table-column prop="keyword" label="关键词" align="center"></el-table-column>
                <el-table-column prop="count" label="搜索次数" align="center"></el-table-column>
                <el-table-column prop="add_time" label="数据创建时间" align="center"></el-table-column>
                <el-table-column prop="status" label="启用状态" align="center">
                    <template slot-scope="scope">
                        <el-switch 
                        v-model="scope.row.status"
                        @change="changeStatus(scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEditClick(scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDeleteClick(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            
            <!-- 创建-编辑弹出框 -->
            <el-dialog :title="title" :visible.sync="visible" width="50%">
                <el-form ref="create" :model="create_edit_params" label-width="100px" label-position="left">
                    <el-form-item label="关键词" prop="keyword" :error="error_msg.keyword">
                        <el-input v-model="create_edit_params.keyword" @focus="handleFocus('keyword')"></el-input>
                    </el-form-item>
                    <el-form-item label="排序" prop="sort" :error="error_msg.sort">
                        <el-input v-model="create_edit_params.sort"
                        @focus="handleFocus('sort')"
                        placeholder="值越小，排越前">
                        </el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="visible = false">取 消</el-button>
                    <el-button type="primary" @click="handleSubmitForm">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 删除弹出框 -->
            <!-- <el-dialog title="删除" :visible.sync="visible_delete" width="30%">
                <span>是否删除此分类</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="visible_delete = false">取 消</el-button>
                    <el-button type="primary" @click="submitDeleteHandle">确 定</el-button>
                </span>
            </el-dialog> -->

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
import Words from '../../api/words'
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
            create_edit_params: {
                keyword: '',
                sort: 0
            },
            error_msg: {
                keyword: '',
                sort: ''
            },
            visible_delete: false,
            visible: false,
            title: '',
            kids: ''
        }
    },
    methods: {
        getWordsList () {
            Words.list(this.list_params)
            .then(res => {
                if(res !== false){
                    for(let i=0;i<res.list.length;i++){
                        res.list[i].status = res.list[i].status?true:false;
                        res.list[i].is_hot = res.list[i].is_hot?true:false;
                    }
                    this.list_total = res.count;
                    this.list = res.list;
                    console.log(this.list)
                }
            })
        },
        handleDeleteClick (row) {
            if(this.kids === '' && !row.kid) return
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
            for(let item of sele){
                arr.push(item.kid);
            }
            this.kids = arr.join(',');
        },
        handleFocus (key) {
            this.error_msg[key] = '';
        },
        handleCreateClick () {
            this.visible = true;
            this.title = '添加关键词';
            this.create_edit_params = {
                keyword: '',
                sort: 0
            }
            this.error_msg = {
                keyword: '',
                sort: ''
            }
        },
        handleEditClick (row) {
            this.visible = true;
            this.title = '编辑关键词';
            this.create_edit_params = {
                kid: row.kid,
                keyword: row.keyword,
                sort: row.sort
            }
            this.error_msg = {
                keyword: '',
                sort: ''
            }
        },
        handleSubmitForm () {
            if(!this.vailParams(this.create_edit_params)) return
            if(this.title === '添加关键词'){
                Words.create(this.create_edit_params)
                .then(res => {
                    if(res !== false){
                        this.$message.success('添加关键词成功');
                        this.visible = false;
                        this.getWordsList();
                    }
                })
            }else{
                Words.update(this.create_edit_params)
                .then(res => {
                    if(res !== false){
                        this.$message.success('编辑关键词成功');
                        this.visible = false;
                        this.getWordsList();
                    }
                })
            }
        },
        vailParams (params) {
            let passing = true;
            for(let key in params){
                if(key === 'kid') continue;
                if(params[key] === ''){
                    let item = '';
                    switch(key){
                        case 'keyword':
                            item = '关键词';
                            break;
                        default: item = '排序'    
                    }
                    this.error_msg[key] = item + '不能为空';
                    passing = false;
                }else{
                    this.error_msg[key] = '';
                }
            }
            return passing
        },
        deleteHandle (row) {
            Words.delete({kids: row.kid?row.kid:this.kids})
            .then(res => {
                if(res !== false){
                    this.$message.success('删除成功');
                    this.getWordsList();
                }
            })
        },
        changeStatus (row) {
            Words.status({kid: row.kid, status: row.status?1:0});
        },
        changeHot (row) {
            Words.setHot({kid: row.kid, hot: row.is_hot?1:0});
        },
        handleCurrentChange (val) {
            this.list_params.page = val;
            this.getWordsList();
        },
    },
    created () {
        this.getWordsList();
    }
}
</script>
<style scoped>
    
</style>