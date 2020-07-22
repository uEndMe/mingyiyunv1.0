<template>
    <div class="bg-gray">
        <div class="my-field">
            <van-field v-model="name" :label="$lang.merchant.name" :placeholder="$lang.merchant.namePlace" size="large" label-width="1.7rem"></van-field>
            <van-field v-model="email" :label="$lang.merchant.email" :placeholder="$lang.merchant.emailPlace" size="large" label-width="1.7rem"></van-field>
            <van-field v-model="mobile" :label="$lang.merchant.phone" :placeholder="$lang.merchant.phonePlace" size="large" label-width="1.7rem"></van-field>
            <van-field v-model="industry" :label="$lang.merchant.industry" :placeholder="$lang.merchant.industryPlace" size="large" label-width="1.7rem"></van-field>
        </div>
        <div class="the-wall">
            <van-button
                type="info"
                size="large"
                round
                :loading="btnLoading"
                :disabled="couldBeClick"
                @click="handleSubmit">
                {{$lang.common.submitBtn}}
            </van-button>
        </div>
    </div>
</template>

<script>
import { Field, Button } from 'vant';
import { merchantApply } from '../api/request';
export default {
    components: {
        [Field.name]: Field,
        [Button.name]: Button,
    },
    computed: {
        couldBeClick () {
            return !(this.name && this.email && this.mobile && this.industry);
        },
        params () {
            return {
                name: this.name,
                email: this.email,
                mobile: this.mobile,
                industry: this.industry,
            };
        },
    },
    data () {
        return {
            name: '',
            email: '',
            mobile: '',
            industry: '',
            btnLoading: false,
        };
    },
    methods: {
        handleSubmit () {
            this.btnLoading = true;
            merchantApply(this.params)
                .then(() => {
                    this.btnLoading = false;
                    this.$toast(this.$lang.common.apply_succ);
                    window.location.href = 'http://merchant-apply.com/';
                })
                .catch(() => {
                    this.btnLoading = false;
                });
        },
    },
};
</script>

<style lang="less" scoped>
.my-field {
    margin-top: 10px;
    margin-bottom: 30px;
}
</style>
