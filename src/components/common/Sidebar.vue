<template>
    <div class="sidebar">
        <el-menu 
        class="sidebar-el-menu" 
        :default-active="onRoutes" 
        :collapse="collapse" 
        background-color="#324157"
        text-color="#bfcbd9" 
        active-text-color="#20a0ff"
        unique-opened>
            <template v-for="item of items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span>{{item.title}}</span>
                        </template>
                        <template v-for="subItem of item.subs">
                            <template v-if="subItem.subs">
                                <el-submenu :index="subItem.index" :key="subItem.index">
                                    <template slot="title">
                                        <span>{{subItem.title}}</span>
                                    </template>
                                    <el-menu-item v-for="(threeItem, i) of subItem.subs" :key="i"
                                    :index="`${item.index+'/'+subItem.index+'/'+threeItem.index}`"
                                    @click="handleMenuClick(item.index, subItem.index, threeItem.index)">
                                        {{threeItem.title}}
                                    </el-menu-item>
                                </el-submenu>
                            </template>
                            <template v-else>
                                <el-menu-item :key="subItem.index"
                                :index="`${item.index+'/'+subItem.index}`"
                                @click="handleMenuClick(item.index, subItem.index)">
                                    <template slot="title">
                                        <span>{{subItem.title}}</span>
                                    </template>
                                </el-menu-item>
                            </template>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index"
                        @click="handleMenuClick(item.index)">
                        <i :class="item.icon"></i>
                        <span slot="title">{{item.title}}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    import {menu} from '@/api/bossAuth';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        title: '系统首页',
                        index: 'index',
                        icon: 'el-icon-lx-home'
                    },
                    {
                        title: '账号管理',
                        index: 'admin',
                        icon: 'el-icon-zk-system'
                    },
                    {
                        title: '角色管理',
                        index: 'role',
                        icon: 'el-icon-zk-role'
                    },
                    {
                        title: '部门管理',
                        index: 'dept',
                        icon: 'el-icon-zk-dept'
                    },
                ]
            }
        },
        methods:{
            handleMenuClick (url1, url2, url3) {
                if(url3){
                    this.$router.push(`/${url1+'/'+url2+'/'+url3}`)
                }
                else if(url2){
                    this.$router.push(`/${url1+'/'+url2}`)
                }
                else{
                    this.$router.push('/'+url1)
                }
            },
        },
        computed:{
            onRoutes(){
                switch(this.$route.path.slice(0,5)){
                    case '/push':
                        return 'push/list'
                    default:
                        return this.$route.path.replace('/','');
                }
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            });

            let t = this;
            // let icons = [
            //     'el-icon-lx-home',
            //     'el-icon-lx-people',
            //     'el-icon-lx-shop',
            //     'el-icon-lx-like',
            //     'el-icon-lx-question',
            //     'el-icon-lx-recharge',
            //     'el-icon-lx-hot',
            //     'el-icon-lx-pic',
            //     'el-icon-lx-goods',
            //     'el-icon-lx-crown'
            // ]
            menu().then(function(res){
                // console.log(res)
                // for(let i=0;i<res.menu.length;i++){
                //     res.menu[i].icon = icons[i];
                // }
                // t.items = res.menu;
            });
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 180px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
