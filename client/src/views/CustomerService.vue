<template>
    <div class="bg-gray">
        <van-cell-group class="cs-gap" :title="$lang.cs.cs_title" :border="false">
            <van-field v-model="nickname"
                :label="$lang.cs.nickname"
                :placeholder="$lang.cs.name_placeholder"
                size="large">
            </van-field>
            <van-field v-model="email"
                type="email"
                :label="$lang.cs.email"
                :placeholder="$lang.cs.email_placeholder"
                size="large">
            </van-field>
        </van-cell-group>
        <van-cell-group class="cs-gap" :title="$lang.cs.problem_title" :border="false">
            <van-field v-model="content"
                type="textarea"
                :autosize="{minHeight: 100}"
                :placeholder="$lang.cs.problem_placeholder">
            </van-field>
        </van-cell-group>
        <div class="the-wall">
            <van-button :disabled="canBeSend" type="info" round size="large" @click="handleSendEmail">{{$lang.cs.btn_text}}</van-button>
            <div class="cs-tip">{{$lang.cs.cs_tip}}</div>
        </div>
        <my-overlay :show="overlayShow"></my-overlay>
    </div>
</template>

<script>
import { CellGroup, Field, Button } from 'vant';
import myOverlay from '../components/OverlayComponent';
import { sendEmail } from '../api/request';
export default {
    components: {
        myOverlay,
        [CellGroup.name]: CellGroup,
        [Field.name]: Field,
        [Button.name]: Button,
    },
    computed: {
        canBeSend () {
            return !(this.nickname && this.email && this.content);
        },
        sendParams () {
            return {
                nickname: this.nickname,
                email: this.email,
                content: this.content,
            };
        },
    },
    data () {
        return {
            nickname: '',
            email: '',
            content: '',
            overlayShow: false,
        };
    },
    methods: {
        handleSendEmail () {
            this.overlayShow = true;
            sendEmail(this.sendParams).then((res) => {
                this.overlayShow = false;
                this.$toast({
                    duration: 2000,
                    message: 'Mail sent successfully!',
                    onClose: () => {
                        window.location.href = 'http://merchant-apply.com/';
                    },
                });
            })
                .catch(() => {
                    this.overlayShow = false;
                });
        },
    },
};
</script>

<style lang="less" scoped>
.van-cell-group__title {
    background-color: #ffffff;
    font-size: 16px;
    color: #333333;
    font-weight: 600;
}
.cs-gap {
    margin-bottom: 10px;
}
.cs-tip {
    font-size: 14px;
    color: #999999;
    margin: 3px 0 0 10px;
}
</style>
