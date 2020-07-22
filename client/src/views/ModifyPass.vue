<template>
    <div class="bg">
        <div>
            <van-field v-model="oldPass"
                type="password"
                size="large"
                clearable
                autofocus
                :placeholder="$lang.modifyPass.oldPlace">
            </van-field>
            <van-field v-model="newPass"
                type="password"
                size="large"
                clearable
                :placeholder="$lang.modifyPass.newPlace">
            </van-field>
            <van-field v-model="confirmPass"
                type="password"
                size="large"
                clearable
                :placeholder="$lang.modifyPass.confirmPlace">
            </van-field>
        </div>
        <div class="the-wall modify-btn">
            <van-button type="info"
                size="large"
                :disabled="disabled"
                :loading="btnLoading"
                round
                @click="handleModifyPassword">
                {{$lang.common.submitBtn}}
            </van-button>
        </div>
    </div>
</template>

<script>
import { Field, Button } from 'vant';
import { md5 } from '../config/util';
import { modifyPass } from '../api/request';
export default {
    components: {
        [Field.name]: Field,
        [Button.name]: Button,
    },
    computed: {
        disabled () {
            return !(this.oldPass && this.newPass && this.confirmPass);
        },
    },
    data () {
        return {
            oldPass: '',
            newPass: '',
            confirmPass: '',
            btnLoading: false,
        };
    },
    methods: {
        handleModifyPassword () {
            this.btnLoading = true;
            if (this.newPass !== this.confirmPass) {
                this.$toast(this.$lang.common.password_diff);
                this.btnLoading = false;
                return;
            }
            modifyPass({
                old_password: md5(this.oldPass),
                password: md5(this.newPass),
            })
                .then(() => {
                    this.$toast(this.$lang.common.modify_succ);
                    this.btnLoading = false;
                    window.location.href = 'http://merchant-apply.com/';
                })
                .catch(() => {
                    this.btnLoading = false;
                    // Object.assign(this.$data, this.$options.data()); // 把数据恢复成默认状态
                });
        },
    },
};
</script>

<style lang="less" scoped>
.modify-btn {
    margin-top: 30px;
}
</style>
