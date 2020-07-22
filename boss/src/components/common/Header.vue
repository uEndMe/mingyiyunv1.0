<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <div class="logo">管理系统</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator"><img src="../../assets/img/img.jpg"></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item  @click.native="showUpdateInfo = true;">修改个人信息</el-dropdown-item>
                        <el-dropdown-item  @click.native="visible = true;">修改登录密码</el-dropdown-item>
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dialog title="修改密码" center :visible.sync="visible" width="30%">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px">
                        <el-form-item prop="old_password">
                            <el-input type="password" v-model="ruleForm.old_password" placeholder="请输入原密码">
                                <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" v-model="ruleForm.password" placeholder="请输入新密码">
                                <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password_again">
                            <el-input type="password" v-model="ruleForm.password_again" placeholder="请再次输入新密码" @keyup.enter.native="updatePassword">
                                <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="visible = false">取 消</el-button>
                        <el-button type="primary" @click="updatePassword">确 定</el-button>
                    </span>
                </el-dialog>
                <el-dialog title="修改个人信息" center :visible.sync="showUpdateInfo" width="30%">
                    <el-form :model="userInfo" :rules="rulesInfo" ref="userInfo" label-width="90px">
                        <el-form-item label="昵称" prop="nickname">
                            <el-input v-model="userInfo.nickname" placeholder="昵称"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="userInfo.name" placeholder="姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-radio-group v-model.number="userInfo.gender">
                                <el-radio :label="1">男</el-radio>
                                <el-radio :label="2">女</el-radio>
                                <el-radio :label="0">保密</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="phone">
                            <el-input v-model="userInfo.phone" placeholder="手机号码"></el-input>
                        </el-form-item>
                        <el-form-item label="Email" prop="email">
                            <el-input v-model="userInfo.email" placeholder="邮箱"></el-input>
                        </el-form-item>
                        <el-form-item label="QQ" prop="qq">
                            <el-input v-model="userInfo.qq" placeholder="QQ"></el-input>
                        </el-form-item>
                        <el-form-item label="微信" prop="wechat">
                            <el-input v-model="userInfo.wechat" placeholder="微信"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="showUpdateInfo = false">取 消</el-button>
                        <el-button type="primary" @click="updateUserInfo">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
import bus from '../common/bus';
import {logout, password, updateUser} from '@/api/bossAuth';
import {md5, rulePhone, ruleEmail} from '@/utils/util';

export default {
    data() {
        const validAgain = (rule,value,callback) => {
            this.$message.closeAll();
            if(value !== this.ruleForm.password){
                this.$message.warning('两次输入密码不一致');
            }else{
                return callback();
            }
        }
        const validPhone = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入手机号码'));
            }else{
                return callback();
            }
            if (!rulePhone(value)) {
                return callback(new Error('手机号码不正确'));
            }else{
                return callback();
            }
        }
        const validEmail = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入邮箱'));
            }else{
                return callback();
            }
            if (!ruleEmail(value)) {
                return callback(new Error('邮箱不正确'));
            }else{
                return callback();
            }
        }
        return {
            collapse: false,
            fullscreen: false,
            visible: false,
            showUpdateInfo: false,
            message: 0,
            name: '***',
            ruleForm: {
                old_password: '',
                password: '',
                password_again: ''
            },
            userInfo: {
                nickname: '',
                name: '',
                gender: 0,
                phone: '',
                email: '',
                qq: '',
                wechat: '',
            },
            rules: {
                old_password:[
                    {required:true,message:'请输入原密码',trigger:'blur'}
                ],
                password:[
                    {required:true,message:'请输入新密码',trigger:'blur'}
                ],
                password_again:[
                    {trigger:'blur',validator: validAgain}
                ]
            },
            rulesInfo: {
                nickname: [
                    {required: true, message: '请输入昵称', trigger: 'submit'}
                ],
                name: [
                    {required: true, message: '请输入姓名', trigger: 'submit'}
                ],
                phone: [
                    {required: true, trigger: 'submit', validator: validPhone},
                ],
                email: [
                    {required: true, trigger: 'submit', validator: validEmail},
                ],
                qq: [
                    {required: true, message: '请输入qq号', trigger: 'submit'}
                ],
                wechat: [
                    {required: true, message: '请输入微信号', trigger: 'submit'}
                ],
            }
        }
    },
    computed:{
        username(){
            let username = sessionStorage.getItem(this.$c.usernameKey);
            return username ? username : this.name;
        }
    },
    methods:{
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            // 退出系统
            if(command == 'loginout'){
                this.$confirm('确定退出登录吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    logout().then((res) => {
                        if(res){
                            sessionStorage.removeItem(this.$c.tokenKey);
                            this.$router.replace('/login');
                        }
                    });
                })
                .catch(() => {});
            }
        },
        // 侧边栏折叠
        collapseChage(){
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse);
        },
        // 全屏事件
        handleFullScreen(){
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        },
        // 修改密码
        updatePassword(){
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    let t = this;
                    let d = {
                        old_password: md5(this.ruleForm.old_password),
                        password: md5(this.ruleForm.password)
                    };
                    password(d).then(function(res){
                        if(res){
                            t.$message.success('密码修改成功,请记住新密码');
                            t.$refs['ruleForm'].resetFields();
                            t.visible = false;
                        }
                    });
                } else {
                    console.log(2);
                    return false;
                }
            });
        },
        updateUserInfo () {
            this.$refs.userInfo.validate((valid) => {
                if (valid) {
                    updateUser(this.userInfo).then((res) => {
                        if (res) {
                            this.$message.success('个人信息修改成功');
                            this.$refs.userInfo.resetFields();
                            this.showUpdateInfo = false;
                        }
                    })
                }
            })
        },
    },
    mounted(){
        if(document.body.clientWidth < 1500){
            this.collapseChage();
        }
    }
}
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }
    .header .logo{
        float: left;
        width:250px;
        line-height: 70px;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 70px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
