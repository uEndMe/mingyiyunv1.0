<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-picture-outline"></i> banner图管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-delete" class="mr10" @click="handleDeleteClick">批量删除</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="handleCreateClick">添加banner图</el-button>
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
                        <el-image style="width: 100%;"
                        :src="scope.row.img_path">
                            <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="标题" align="center"></el-table-column>
                <el-table-column prop="url" label="推广链接" align="center"></el-table-column>
                <el-table-column prop="clicks" label="点击次数" align="center"></el-table-column>
                <el-table-column prop="place_text" label="推广信息位置描述" align="center"></el-table-column>
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
                    <el-form-item label="推广信息标题" prop="title" :error="error_msg.title">
                        <el-input v-model="create_edit_params.title" @focus="handleFocus('title')"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="推广信息位置" prop="place" :error="error_msg.place">
                        <el-input v-model="create_edit_params.place" @focus="handleFocus('place')"></el-input>
                    </el-form-item> -->
                    <el-form-item label="推广链接" prop="url" :error="error_msg.url">
                        <el-input v-model="create_edit_params.url"></el-input>
                    </el-form-item>
                    <el-form-item label="排序" prop="sort" :error="error_msg.sort">
                        <el-input v-model="create_edit_params.sort"
                        @focus="handleFocus('sort')"
                        placeholder="值越小，排越前">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="上传图片" :error="error_msg.img_id">
                        <div class="upload">
                            <el-upload :action="upload.url"
                            :data="upload.params"
                            :on-success="uploadSuccess"
                            :before-upload="handleBeforeUpload"
                            :on-error="handleUploadError"
                            :show-file-list="false">
                                <div>
                                    <i class="el-icon-upload"></i>
                                    <div class="upload-text">上传图片</div>
                                </div>
                            </el-upload>
                            <div class="upload-img" v-show="show_img">
                                <div class="img-screen" @click="handlePreviewImg">
                                    <i class="el-icon-search"></i>
                                </div>
                                <el-avatar shape="square" :size="100" :fit="'fill'" :src="show_img"></el-avatar>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="">
                        <div style="color: red;">图片尺寸: 684 x 300</div>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="visible = false">取 消</el-button>
                    <el-button type="primary" @click="handleSubmitForm">确 定</el-button>
                </span>
            </el-dialog>
            
            <el-dialog title="图片预览" :visible.sync="visible_preview" width="40%">
                <img :src="show_img" alt="" width="100%">
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
import Banner from '../../api/banner'
import { makeSign } from '../../utils/util'
import { _c } from '../../core/config'
export default {
    data () {
        return {
            upload: {
                url: _c.domain + _c.uploadApi,
                params: {
                    block: 'boss',
                    token: sessionStorage.getItem(_c.tokenKey),
                    req_source: 'boss',
                    timestamp: parseInt((new Date()).getTime()/1000),
                    file_info: []
                }
            },
            show_img: '',
            list: [],
            list_total: 0,
            list_params: {
                page: 1,
                limit: 10,
                search: ''
            },
            create_edit_params: {
                // place: '',
                title: '',
                url: '',
                sort: 0,
            },
            error_msg: {
                // place: '',
                title: '',
                url: '',
                sort: '',
                img_id: ''
            },
            visible_delete: false,
            visible: false,
            visible_preview: false,
            title: '',
            promote_ids: ''
        }
    },
    methods: {
        getBannerList () {
            Banner.list(this.list_params)
            .then(res => {
                if(res !== false){
                    for(let i=0;i<res.list.length;i++){
                        res.list[i].status = res.list[i].status?true:false;
                        res.list[i].is_hot = res.list[i].is_hot?true:false;
                    }
                    this.list_total = res.count;
                    this.list = res.list;
                    // console.log(this.list)
                }
            })
        },
        handleSearch () {
            this.list_params.page = 1;
            this.getBannerList();
        },
        handleDeleteClick (row) {
            if(this.promote_ids === '' && !row.promote_id) return
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
                arr.push(item.promote_id);
            }
            this.promote_ids = arr.join(',');
        },
        handleFocus (key) {
            this.error_msg[key] = '';
        },
        handleCreateClick () {
            this.visible = true;
            this.title = '添加banner图';
            this.show_img = '';
            this.create_edit_params = {
                // place: '',
                title: '',
                url: '',
                sort: 0,
                img_id: ''
            }
            this.error_msg = {
                // place: '',
                title: '',
                url: '',
                sort: ''
            }
        },
        handleEditClick (row) {
            this.visible = true;
            this.title = '编辑banner图';
            this.show_img = row.img_path;
            this.create_edit_params = {
                promote_id: row.promote_id,
                // place: row.place,
                title: row.title,
                url: row.url,
                sort: row.sort,
            }
            this.error_msg = {
                // place: '',
                title: '',
                url: '',
                sort: ''
            }
        },
        handleSubmitForm () {
            if(!this.vailParams(this.create_edit_params)) return
            if(this.title === '添加banner图'){
                Banner.create(this.create_edit_params)
                .then(res => {
                    if(res !== false){
                        this.$message.success('添加banner图成功');
                        this.visible = false;
                        this.getBannerList();
                    }
                })
            }else{
                Banner.update(this.create_edit_params)
                .then(res => {
                    if(res !== false){
                        this.$message.success('编辑banner图成功');
                        this.visible = false;
                        this.getBannerList();
                    }
                })
            }
        },
        vailParams (params) {
            let passing = true;
            for(let key in params){
                if(key === 'promote_id') continue;
                if(key === 'url') continue;
                if(params[key] === ''){
                    let item = '';
                    switch(key){
                        // case 'place':
                        //     item = '推广信息所处位置';
                        //     break;
                        case 'title':
                            item = '推广信息标题';
                            break;
                        // case 'url':
                        //     item = '推广链接';
                        //     break;
                        case 'img_id':
                            item = 'banner图片';
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
            Banner.delete({promote_ids: row.promote_id?row.promote_id:this.promote_ids})
            .then(res => {
                if(res !== false){
                    this.$message.success('删除成功');
                    this.getBannerList();
                }
            })
        },
        changeStatus (row) {
            Banner.status({promote_id: row.promote_id, status: row.status?1:0});
        },
        handleCurrentChange (val) {
            this.list_params.page = val;
            this.getBannerList();
        },
        uploadSuccess (res) {
            if(res.error_code === 0){
                this.create_edit_params.img_id = res.data.file_id;
                this.show_img = res.data.file_path;
                this.$message.success('图片上传成功')
            }
        },
        handleBeforeUpload (file) {
            this.upload.params.file_info = file;
            this.upload.params.sign = makeSign(this.upload.params);
        },
        handleUploadError (err) {
            this.$message.error('图片上传失败');
        },
        handlePreviewImg () {
            this.visible_preview = true;
        },
    },
    created () {
        this.getBannerList();
    }
}
</script>
<style scoped>
.upload {
    position: relative;
}
.upload-img {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 0;
    left: 134px;
    border-radius: 5px;
    overflow: hidden;
}
.upload-text {
    line-height: 18px;
}
.img-screen {
    width: 100%;
    height: 100%;
    font-size: 24px;
    color: #fff;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    cursor: pointer;
    border-radius: 5px;
}
.img-screen:hover {
    background-color: rgba(0,0,0,0.3);
    opacity: 1;
}
    
</style>