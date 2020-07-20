<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 商品分类</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-delete" class="mr10" @click="submitDeleteHandle">批量删除</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="handleCreateClick">创建</el-button>
                <el-input v-model="list_params.search" 
                placeholder="筛选关键词" 
                class="handle-input mr10"
                @keyup.enter.native="handleSearchClick">
                    <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearchClick"></i>
                </el-input>
            </div>
            <el-table 
            border
            :data="list"
            @selection-change="handleChangeSelect">
                <el-table-column type="selection" width="35"></el-table-column>
                <el-table-column prop="title" label="分类标题" align="center"></el-table-column>
                <el-table-column prop="pid_text" label="上级分类标题" align="center"></el-table-column>
                <el-table-column prop="status" label="启用状态" align="center">
                    <template slot-scope="scope">
                        <el-switch 
                        v-model="scope.row.status"
                        @change="changeStatus(scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="add_time" label="数据创建时间" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEditClick(scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDeleteClick(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 创建弹出框 -->
            <el-dialog title="创建分类" :visible.sync="visible.create" width="50%">
                <el-form ref="create" :model="params" label-width="100px" label-position="left">
                    <el-form-item label="分类标题" :error="error_msg.title">
                        <el-input v-model="params.title" @focus="handleFocus('title')"></el-input>
                    </el-form-item>
                    <el-form-item label="分类排序" :error="error_msg.sort">
                        <el-input v-model="params.sort" @focus="handleFocus('sort')">
                            <span slot="append">值越小，排越前</span>
                        </el-input>
                    </el-form-item>
                    <!-- <el-form-item label="上级分类ID"
                    :rules="[{required: true, message: '请选择上级分类ID'}]">
                        <el-select v-model="create.pid">
                            <el-option v-for="item of 5" :key="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item> -->
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="visible.create = false">取 消</el-button>
                    <el-button type="primary" @click="submitCreateForm()">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 编辑弹出框 -->
            <el-dialog title="编辑分类" :visible.sync="visible.edit" width="50%">
                <el-form ref="edit" :model="params" label-width="100px" label-position="left">
                    <el-form-item label="分类标题" :error="error_msg.title">
                        <el-input v-model="params.title" @focus="handleFocus('title')"></el-input>
                    </el-form-item>
                    <el-form-item label="分类排序" :error="error_msg.sort">
                        <el-input v-model="params.sort" @focus="handleFocus('sort')">
                            <span slot="append">值越小，排越前</span>
                        </el-input>
                    </el-form-item>
                    <!-- <el-form-item label="上级分类ID"
                    :rules="[{required: true, message: '请选择上级分类ID'}]">
                        <el-select v-model="edit.pid">
                            <el-option v-for="item of 5" :key="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item> -->
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="visible.edit = false">取 消</el-button>
                    <el-button type="primary" @click="submitEditForm()">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 删除弹出框 -->
            <el-dialog title="删除" :visible.sync="visible.delete" width="30%">
                <span>是否删除此分类</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="visible.delete = false">取 消</el-button>
                    <el-button type="primary" @click="submitDeleteHandle">确 定</el-button>
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
import Types from '../../../api/goodsTypes'
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
            visible: {
                create: false,
                edit: false,
                delete: false,
            },
            params: {
                title: '',
                pid: 0,
                sort: 10
            },
            error_msg: {
                title: '',
                sort: '',
            },
            delete: {
                type_ids: ''
            }
        }
    },
    watch: {
        'create.sort' () {
            let num = this.create.sort;
            let minus = 0;
            if(num.indexOf('0') === 0){
               this.create.sort = 0;
                return
            }
            if(num.indexOf('-0') === 0){
                this.create.sort = 0;
            }
            for(let item of num){
                if(!Number(item) && item !== '0'){
                    if(item === '-' && num.indexOf('-') === 0 && minus < 1){
                        minus++;
                        continue;
                    }
                    num = num.substring(0, num.length-1);
                    this.create.sort = num;
                }
            }
        }
    },
    methods: {
        getTypesList () {
            Types.list(this.list_params)
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
        changeStatus (row) {
            let params = {
                type_id: parseInt(row.type_id),
                status: row.status ? 1 :0
            }
            // console.log(params)
            Types.status(params)
        },
        handleEditClick (row) {
            this.visible.edit = true;
            this.params.title = row.title;
            this.params.type_id = row.type_id;
            this.params.sort = row.sort;
            Object.assign(this.$data.error_msg, this.$options.data().error_msg);
            // console.log(this.params)
            // this.edit.type_id = row.type_id;
        },
        handleCreateClick () {
            this.visible.create = true;
            Object.assign(this.$data.params, this.$options.data().params);
            Object.assign(this.$data.error_msg, this.$options.data().error_msg);
        },
        handleDeleteClick (row) {
            this.visible.delete = true;
            this.delete.type_ids = row.type_id;
        },
        handleSearchClick () {
            this.list_params.page = 1;
            this.getTypesList();
        },
        handleChangeSelect (sele) {
            if(sele.length !== 0){
                let ids = ''
                for(let item of sele){
                    ids += item.type_id + ','
                }
                this.delete.type_ids = ids.slice(0,-1);
            }else{
                this.delete.type_ids = ''
            }
        },
        vailParams (params) {
            let passing = true;
            for(let key in params){
                if(key === 'type_id') continue
                if(params[key] === ''){
                    let key_name = '';
                    switch(key){
                        case 'title':
                            key_name = '标题';
                            break;
                        case 'sort':
                            key_name = '排序';
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
        submitEditForm () {
            if(!this.vailParams(this.params)) return
            // console.log(this.params)
            Types.update(this.params)
            .then(res => {
                if(res !== false){
                    Message.success('数据更新成功')
                    this.getTypesList();
                    this.visible.edit = false;
                }
            })
        },
        submitCreateForm () {
            if(!this.vailParams(this.params)) return
            Types.create(this.params)
            .then(res => {
                if(res !== false){
                    Message.success('创建数据成功');
                    this.getTypesList();
                    this.visible.create = false;
                }
            })
        },
        submitDeleteHandle () {
            if(this.delete.type_ids){
                Types.delete(this.delete)
                .then(res => {
                    if(res !== false){
                        Message.success('删除数据成功');
                        this.getTypesList();
                        this.visible.delete = false;
                    }
                })
            }else{
                return
            }
            
        },
        handleCurrentChange (val) {
            this.list_params.page = val;
            this.getTypesList()
        },
    },
    created () {
        this.getTypesList();
    }
}
</script>