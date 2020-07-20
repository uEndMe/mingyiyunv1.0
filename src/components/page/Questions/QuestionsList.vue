<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-paperclip"></i> 常见问题</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-delete" class="mr10" @click="handleDeleteClick">批量删除</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="handleCreateClick">添加</el-button>
                <el-input v-model="list_params.search" 
                placeholder="筛选关键词" 
                class="handle-input mr10"
                @keyup.enter.native="handleSearch"
                @blur="handleSearch">
                    <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch"></i>
                </el-input>
            </div>
            <el-table border :data="list"
            @selection-change="handleChangeSelect">
                <el-table-column type="selection" width="35"></el-table-column>
                <el-table-column prop="title" label="常见问题标题" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="status" label="启用状态" align="center">
                    <template slot-scope="scope">
                        <el-switch 
                        v-model="scope.row.status"
                        @change="changeStatus(scope.$index, scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="add_time" label="数据创建时间" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEditClick(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDeleteClick(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 创建-编辑弹出框 -->
            <el-dialog :title="dialog_title" :visible.sync="visible_create_edit" width="90%">
                <el-form ref="create" :model="create_edit_params" label-width="80px" label-position="left">
                    <el-form-item label="标题" prop="title" :error="error_msg.title">
                        <el-input v-model="create_edit_params.title"></el-input>
                    </el-form-item>
                    <el-form-item label="排序" prop="sort" :error="error_msg.sort">
                        <el-input v-model="create_edit_params.sort">
                            <span slot="append">值越小，排越前</span>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="详细内容" :error="error_msg.content">
                        <mavon-editor v-model="create_edit_params.content" ref="md" 
                        @imgAdd="$imgAdd" 
                        @imgDel="$imgDel"
                        @change="handleEditorChange"
                        ></mavon-editor>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="visible_create_edit = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm">确 定</el-button>
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
import Question from '../../../api/questions'
import { Message } from 'element-ui'
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
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
            create_edit_params: {},
            visible_delete: false,
            visible_create_edit: false,
            question_ids: '',
            dialog_title: '',
            error_msg: {
                title: '',
                content: '',
                sort: ''
            }
        }
    },
    watch: {
        'create_edit_params.sort' () {
            let str = this.create_edit_params.sort;
            if(!Number(str)){
                if(str === '0' || str === '-' || str === ''){
                    this.create_edit_params.sort = str;
                }else{
                    this.create_edit_params.sort = str.substring(0, str.length - 1);
                }
            }else{
                this.create_edit_params.sort = parseInt(str);
            }
        }
    },
    components: {
        mavonEditor
    },
    methods: {
        getQuestionList () {
            Question.list(this.list_params)
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
            this.getQuestionList();
        },
        submitForm () {
            if(!this.vailData(this.create_edit_params)) return
            if(this.dialog_title === '创建常见问题'){
                Question.create(this.create_edit_params)
                .then(res => {
                    if(res !== false){
                        this.$message.success('创建常见问题成功');
                        this.visible_create_edit = false;
                        this.getQuestionList();
                    }
                })
            }else{
                Question.update(this.create_edit_params)
                .then(res => {
                    if(res !== false){
                        this.$message.success('更新常见问题成功');
                        this.visible_create_edit = false;
                        this.getQuestionList();
                    }
                })
            }
        },
        handleCreateClick () {
            this.visible_create_edit = true;
            this.dialog_title = '创建常见问题';
            this.create_edit_params = {
                title: '',
                content: '',
                sort: 10
            };
        },
        handleEditClick (index, row) {
            this.visible_create_edit = true;
            this.dialog_title = '编辑常见问题';
            Question.info({question_id: row.question_id})
            .then(res => {
                if(res !== false){
                    this.create_edit_params = {
                        question_id: res.question_id,
                        title: res.title,
                        content: res.content,
                        sort: 0
                    }
                }
            })
            
        },
        handleDeleteClick (index, row) {
            if(this.question_ids === '' && typeof(row) === 'undefined') return
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
                arr.push(id.question_id);
            }
            this.question_ids = arr.join(',');
        },
        deleteHandle (row) {
            Question.delete({question_ids: row?row.question_id:this.question_ids})
            .then(res => {
                if(res !== false){
                    this.$message.success('删除成功');
                    this.getQuestionList();
                }
            })
        },
        changeStatus (index, row) {
            Question.status({question_id: row.question_id, status: row.status?1:0});
        },
        handleCurrentChange (val) {
            this.list_params.page = val;
            this.getQuestionList();
        },
        vailData (data) {
            let passing = true;
            for(let key in data){
                if(key === 'question_id') continue;
                if(data[key] === ''){
                    let item = '';
                    switch(key){
                        case 'title':
                            item = '标题';
                            break;
                        case 'sort':
                            item = '排序';
                            break; 
                        default: item = '详细内容'    
                    }
                    this.error_msg[key] = item + '不能为空';
                    passing = false;
                }else{
                    this.error_msg[key] = '';
                }
            }
            return passing
        },
        handleEditorChange (val, render) {
            this.create_edit_params.content = render;
        },
        $imgAdd (pos, $file) {
            let params = {
                block: 'boss',
                file_content: $file.miniurl,
                type: 'base64'
            }
            Editor.upload(params).then(res => {
                if(res.file_id){
                    this.img_info[this.subImgPath(res.file_path)] = res.file_id;
                    this.img_ids.push(res.file_id);
                    this.$refs.md.$img2Url(pos, res.file_path);
                    this.$message.success('图片上传成功')
                }
            })
        },
        $imgDel (pos) {
            let str = this.subImgPath(pos[0]);
            for(let key in this.img_info){
                if(key === str){
                    let idDel = this.img_info[key];
                    for(let i=0;i<this.img_ids.length;i++){
                        if(this.img_ids[i] === idDel){
                            this.img_ids.splice(i, 1);
                        }
                    }
                }
            }
        },
        subImgPath (str) {
            let start = str.lastIndexOf('/');
            let end = str.lastIndexOf('.');
            return str.slice(start, end);
        },
    },
    created () {
        this.getQuestionList();
    }
}
</script>
<style scoped>
    
</style>