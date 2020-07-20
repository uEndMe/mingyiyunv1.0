<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i :class="is_edit?'el-icon-edit':'el-icon-medal'"></i> {{is_edit?'编辑精选推送':'创建精选推送'}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="crumbs">
            <div class="container">
                <el-form label-width="85px">
                    <el-form-item label="标题：" :error="error_msg.title">
                        <div class="width500">
                            <el-input v-model="edit_params.title" @focus="handleFocus('title')">
                            </el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="排序：" :error="error_msg.sort">
                        <div class="width500">
                            <el-input v-model="edit_params.sort" @focus="handleFocus('sort')">
                            </el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="内容简介：" :error="error_msg.abstract">
                        <div class="width500">
                            <el-input 
                            v-model="edit_params.abstract"
                            type="textarea" 
                            @focus="handleFocus('abstract')"
                            :autosize="{ minRows: 3, maxRows: 6 }"
                            placeholder="精选推送内容简介"
                            resize="none">
                            </el-input>
                        </div>
                    </el-form-item>
                    <el-form-item>
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
                    <el-form-item :error="error_msg.content">
                        <mavon-editor v-model="content" ref="md" 
                        @imgAdd="$imgAdd" 
                        @imgDel="$imgDel"
                        @change="handleEditorChange"
                        ></mavon-editor>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="mt10" size="large" type="primary" @click="handleEditSubmit">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-dialog title="图片预览" :visible.sync="visible_preview" width="40%">
                <img :src="show_img" alt="" width="100%">
            </el-dialog>
        </div>
    </div>
</template>
<script>
import {_c} from '../../../core/config'
import {makeSign} from '../../../utils/util'
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Editor from '../../../api/editor'
import Push from '../../../api/Push'
import { Message } from 'element-ui'
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
                }
            },
            show_img: '',
            edit_params: {
                push_id: '',
                title: '',
                abstract: '',
                content: '',
                sort: 10,
                img_id: 0
            },
            error_msg: {
                title: '',
                abstract: '',
                content: '',
                sort: '',
            },
            img_info: {},
            img_ids: [],
            content: '',
            is_edit: false,
            visible_preview: false,
        }
    },
    components: {
        mavonEditor
    },
    methods: {
        uploadSuccess (res) {
            if(res.error_code === 0){
                this.edit_params.img_id = res.data.file_id;
                this.show_img = res.data.file_path;
                Message.success('图片上传成功')
            }
        },
        handleBeforeUpload (file) {
            this.upload.params.file_info = file;
            this.upload.params.sign = makeSign(this.upload.params);
        },
        handleUploadError (err) {
            Message.error('图片上传失败');
        },
        handlePreviewImg () {
            this.visible_preview = true;
        },
        handleFocus (key) {
            this.error_msg[key] = '';
        },
        handleEditorChange (val, render) {
            this.edit_params.content = render;
            // console.log(this.content);
            // console.log(render);
        },
        handleEditSubmit () {
            console.log(this.$refs.md.d_render);return
            if(this.vailData(this.edit_params)){
                if(this.is_edit){
                    Push.update(this.edit_params)
                    .then(res => {
                        if(res !== false){
                            this.$message.success('更新成功');
                            this.$router.push('/push/list');
                        }
                    })
                }else{
                    Push.create(this.edit_params)
                    .then(res => {
                        if(res !== false){
                            this.$message.success('创建精选推送成功');
                            this.$router.push('/push/list');
                        }
                    })
                }
            }
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
        vailData (data) {
            let passing = true;
            for(let key in data){
                if(key === 'img_id') continue;
                if(data[key] === ''){
                    let item = '';
                    switch(key){
                        case 'title':
                            item = '标题';
                            break;
                        case 'sort':
                            item = '排序';
                            break; 
                        case 'abstract':
                            item = '内容简介';
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
        getInfo (id) {
            Push.info({push_id: id}).then(res => {
                if(res !== false){
                    this.edit_params.push_id = parseInt(res.push_id);
                    this.edit_params.title = res.title;
                    this.content = res.content;
                    this.show_img = res.img_path;
                    console.log(res);
                }
            })
        }
    },
    created () {
        if(this.$route.query.push_id){
            this.is_edit = true;
            this.getInfo(this.$route.query.push_id);
        }else{
            delete this.edit_params.push_id;
        }
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
.width500 {
    width: 500px;
}
.mt10 {
    margin-top: 10px;
}
</style>