<template>
    <div>
        <div class="bg-gray">
            <div class="login-field">
                <van-field v-model="username" :placeholder="$lang.login.field_uname_placeholder"></van-field>
                <van-field v-model="password" :placeholder="$lang.login.field_pwd_placeholder"></van-field>
            </div>
            <div class="the-wall">
                <van-button type="info"
                    size="large"
                    round
                    :disabled="couldBeClick"
                    :loading="btnLoading"
                    @click="handleLogin">
                    Login
                </van-button>
            </div>
        </div>
    </div>
</template>

<script>
import { Field, Button } from 'vant';
import { login } from '../api/request';
import { md5 } from '../config/util';
export default {
    computed: {
        couldBeClick () {
            return !(this.username && this.password);
        },
        params () {
            return {
                username: this.username,
                password: md5(this.password),
            };
        },
    },
    data () {
        return {
            username: '',
            password: '',
            btnLoading: false,
        };
    },
    components: {
        [Field.name]: Field,
        [Button.name]: Button,
    },
    methods: {
        handleLogin () {
            this.btnLoading = true;
            login(this.params)
                .then((res) => {
                    this.$toast.success('Login successful!');
                    this.btnLoading = false;
                    sessionStorage.setItem(this.$c.tokenKey, res.data.token);
                    this.$router.replace('/');
                })
                .catch(() => {
                    this.btnLoading = false;
                });
        },
    },
};
</script>

<style lang="less" scoped>
.login-field {
    margin-top: 30px;
    margin-bottom: 30px;
}
</style>
