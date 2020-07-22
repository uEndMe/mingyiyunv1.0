<template>
    <div class="bg">
        <div>
            <van-field v-model="newPayPassword"
                type="password"
                size="large"
                :placeholder="$lang.modifyPay.newPayPlace">
            </van-field>
            <van-field v-model="verifyCode"
                size="large"
                :placeholder="$lang.modifyPay.verifyCode">
                <template #button>
                    <van-button
                        size="small" type="primary" round
                        :disabled="disableSendBtn"
                        @click="handleGetCode"
                        class="send-btn">
                        {{sendBtn}}
                    </van-button>
                </template>
            </van-field>
        </div>
        <div class="the-wall submit-modify-btn">
            <van-button type="info"
                size="large"
                round
                :loading="loadingSubmit"
                :disabled="couldBeClick"
                @click="handleSubmit">
                {{$lang.common.confirmBtn}}
            </van-button>
        </div>
        <van-dialog v-model="show"
            :title="$lang.modifyPay.verifyPassTip"
            :confirm-button-text="$lang.common.confirmBtn"
            :before-close="handleVaildClose">
            <van-field ref="vaildPass"
                type="password"
                v-model="checkPassword"
                autofocus
                :error-message="vaildError">
            </van-field>
        </van-dialog>
    </div>
</template>

<script>
import { Field, Button, Dialog } from 'vant';
import { checkPass, getCode, modifyPay } from '../api/request';
import { md5 } from '../config/util';
export default {
    components: {
        [Field.name]: Field,
        [Button.name]: Button,
        [Dialog.Component.name]: Dialog.Component,
    },
    created () {
        this.sendBtn = this.$lang.modifyPay.sendBtn;
    },
    mounted () {
        this.$nextTick(() => {
            this.$refs.vaildPass.focus();
        });
    },
    computed: {
        modify () {
            return {
                password: md5(this.newPayPassword),
                verify_code: this.verifyCode,
            };
        },
        couldBeClick () {
            return !(this.newPayPassword && this.verifyCode);
        },
    },
    data () {
        return {
            newPayPassword: '',
            verifyCode: '',
            checkPassword: '',
            vaildError: '',
            sendBtn: '',
            show: true,
            disableSendBtn: false,
            loadingSubmit: false,
            isStop: false, // 控制发送邮箱验证码的计时是否要停止
        };
    },
    watch: {
        'checkPassword' () {
            if (this.checkPassword !== '') {
                this.vaildError = '';
            }
        },
    },
    methods: {
        handleVaildClose (action, done) {
            if (this.checkPassword === '') {
                this.vaildError = this.$lang.modifyPay.error;
                done(false);
            } else {
                checkPass({password: md5(this.checkPassword)})
                    .then(() => {
                        done();
                    })
                    .catch(() => {
                        done(false);
                    });
            }
        },
        handleGetCode () {
            this.disableSendBtn = true;
            this.setTimeCount();
            getCode()
                .then(() => {
                    this.$toast(this.$lang.common.sendCodeSucc);
                })
                .catch(() => {
                    this.isStop = true;
                    this.disableSendBtn = false;
                    this.sendBtn = this.$lang.modifyPay.sendBtn;
                });
        },
        setTimeCount () {
            let count = 60;
            this.sendBtn = `${count}s Resend`;
            const timer = setInterval(() => {
                if (this.isStop) {
                    clearInterval(timer);
                    this.isStop = false;
                    return;
                }
                count--;
                this.sendBtn = `${count}s Resend`;
                if (count <= 0) {
                    clearInterval(timer);
                    this.disableSendBtn = false;
                    count = 60;
                    this.sendBtn = this.$lang.modifyPay.sendBtn;
                }
            }, 1000);
        },
        handleSubmit () {
            this.loadingSubmit = true;
            modifyPay(this.modify)
                .then(() => {
                    this.$toast(this.$lang.common.modify_succ);
                    this.loadingSubmit = false;
                    window.location.href = 'http://merchant-apply.com/';
                })
                .catch(() => {
                    this.loadingSubmit = false;
                });
        },
    },
};
</script>

<style lang="less" scoped>
.send-btn {
    min-width: 2.3rem;
}
.submit-modify-btn {
    margin-top: 30px;
}
</style>
