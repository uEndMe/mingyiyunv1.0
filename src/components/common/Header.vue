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
                        <el-dropdown-item  @click.native="visible = true;">修改密码</el-dropdown-item>
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dialog v-dialogDrag title="修改密码" center :visible.sync="visible" width="30%">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
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
            </div>
        </div>
    </div>
</template>
<script>
    import bus from '../common/bus';
    import {logout} from '@/api/bossAuth';
    import {password} from '@/api/bossAuth';
    import {md5} from '@/utils/util';

    export default {
        data() {
            const validAgain = (rule,value,callback) => {
                this.$message.closeAll();
                if(value !== this.ruleForm.password){
                    this.$message.warning('两次输入密码不一致');
                }
            }
            return {
                collapse: false,
                fullscreen: false,
                visible: false,
                message: 0,
                name: '***',
                ruleForm: {
                    old_password: '',
                    password: '',
                    password_again: ''
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
                    let t = this;
                    logout().then(function(res){
                        if(res !== false){
                            sessionStorage.removeItem(t.$c.tokenKey);
                            t.$router.push('/login');
                        }
                    });
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
                let t = this;

                let d = {
                    old_password: md5(this.ruleForm.old_password),
                    password: md5(this.ruleForm.password)
                };

                password(d).then(function(res){
                    if(res !== false){
                        t.$message.success('密码修改成功,请记住新密码');
                        t.$refs['ruleForm'].resetFields();
                        t.visible = false;
                    }
                });
            }
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
