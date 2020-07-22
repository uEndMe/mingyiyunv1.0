<template>
    <div class="bg">
        <h3 class="page-title">{{$lang.register.title}}</h3>
        <van-form>
            <van-field v-model="email"
                type="email"
                :placeholder="$lang.register.email"
                :error="rules.email.error"
                :error-message="rules.email.message"
                @focus="onFocus('email')">
                <my-svg slot="left-icon" iconName="email" className="set-svg-style"></my-svg>
                <van-button
                    slot="button"
                    size="small"
                    :disabled="disableSendCode"
                    @click="getCode">
                    {{sendBtnText}}
                </van-button>
            </van-field>
            <van-field v-model="verifyCode"
                :placeholder="$lang.register.verifyCode"
                :error="rules.verifyCode.error"
                :error-message="rules.verifyCode.message"
                @focus="onFocus('verifyCode')">
                <my-svg slot="left-icon" iconName="key" className="set-svg-style"></my-svg>
            </van-field>
            <van-field v-model="password"
                :type="passType"
                :placeholder="$lang.common.password"
                :error="rules.password.error"
                :error-message="rules.password.message"
                @focus="onFocus('password')">
                <my-svg slot="left-icon" iconName="lock" className="set-svg-style"></my-svg>
                <van-icon slot="right-icon" :name="iconEye" @click="controlEye = !controlEye"></van-icon>
            </van-field>
            <van-field v-model="inviteCode"
                :disabled="true"
                :placeholder="$lang.register.inviteCode">
                <my-svg slot="left-icon" iconName="send" className="set-svg-style"></my-svg>
            </van-field>
            <div class="the-wall sign-up-submit">
                <div class="agreement-check">
                    <van-checkbox v-model="agreement"
                        shape="square"
                        icon-size="0.427rem">
                        I have read and agreed
                    </van-checkbox>
                    <div @click="$router.push('/agreement')">《User Agreement》</div>
                </div>
                <van-button
                    type="info"
                    size="large"
                    round
                    :loading="submitLoading"
                    @click="onSubmit">
                    {{$lang.common.nextBtn}}
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { Form, Button, Field, Checkbox, Icon } from 'vant';
import { sendCode, register } from '../api/request';
import { md5 } from '../config/util';
import mySvg from '../components/SvgIcon';
export default {
    components: {
        mySvg,
        [Form.name]: Form,
        [Field.name]: Field,
        [Checkbox.name]: Checkbox,
        [Button.name]: Button,
        [Icon.name]: Icon,
    },
    watch: {
        'controlEye' () {
            if (this.iconEye === 'closed-eye') {
                this.iconEye = 'eye-o';
                this.passType = 'text';
            } else {
                this.iconEye = 'closed-eye';
                this.passType = 'password';
            }
        },
    },
    computed: {
        params () {
            return {
                username: this.email,
                password: md5(this.password),
                verify_code: this.verifyCode,
                agreement: this.agreement ? 1 : 0,
                invite_code: this.inviteCode,
            };
        },
        vaildData () {
            return {
                email: this.email,
                verifyCode: this.verifyCode,
                password: this.password,
            };
        },
    },
    created () {
        this.sendBtnText = this.$lang.register.getCodeBtn;
        this.inviteCode = this.$route.query.code || '';
    },
    data () {
        return {
            email: '',
            password: '',
            verifyCode: '',
            agreement: true,
            inviteCode: '',
            iconEye: 'closed-eye',
            passType: 'password',
            controlEye: false,
            disableSendCode: false,
            submitLoading: false,
            isStop: false, // 控制发送邮箱验证码的计时是否要停止
            rules: {
                email: { error: false, message: '' },
                password: { error: false, message: '' },
                verifyCode: { error: false, message: '' },
            },
            sendBtnText: '',
        };
    },
    methods: {
        onSubmit () {
            if (this.vaildParams()) {
                this.submitLoading = true;
                register(this.params)
                    .then((res) => {
                        this.submitLoading = false;
                        // 不知道跳转到哪里
                    })
                    .catch(() => {
                        this.submitLoading = false;
                    });
            }
        },
        onFocus (key) {
            Object.assign(this.rules[key], this.$options.data().rules[key]);
        },
        vaildParams () {
            let isPass = true;
            const err = {
                email: { error: true, message: this.$lang.register.errEmailText },
                password: { error: true, message: this.$lang.register.errPasswordText },
                verifyCode: { error: true, message: this.$lang.register.errVerifyCodeText },
            };
            Object.entries(this.vaildData).forEach((item) => {
                if (item[1] === '') {
                    Object.assign(this.rules[item[0]], err[item[0]]);
                    isPass = false;
                }
            });
            return isPass;
        },
        getCode () {
            if (this.email === '') {
                this.rules.email.error = true;
                this.rules.email.message = this.$lang.common.emptyEmailTip;
                return;
            }
            this.disableSendCode = true;
            this.setTimeCount();
            sendCode({type: 'register', email: this.email})
                .then(() => {
                    this.$toast(this.$lang.common.sendCodeSucc);
                })
                .catch(() => {
                    this.isStop = true;
                    this.disableSendCode = false;
                    this.sendBtnText = this.$lang.register.getCodeBtn;
                });
        },
        setTimeCount (isClear) {
            let count = 60;
            this.sendBtnText = `${count}s Resend`;
            const timer = setInterval(() => {
                if (this.isStop) {
                    clearInterval(timer);
                    this.isStop = false;
                    return;
                }
                count--;
                this.sendBtnText = `${count}s Resend`;
                if (count <= 0) {
                    clearInterval(timer);
                    this.disableSendCode = false;
                    count = 60;
                    this.sendBtnText = this.$lang.register.getCodeBtn;
                }
            }, 1000);
        },
    },
};
</script>

<style lang="less" scoped>
/deep/ .van-button--default {
    border: none;
    color: @main_blue;
    font-size: 16px;
}
/deep/ .van-field:not(:first-child) {
    margin-top: 10px;
}
/deep/ .van-checkbox__label {
    color: #cccccc;
}
.set-svg-style {
    font-size: 18px;
    margin-right: 10px;
}
.page-title {
    font-size: 28px;
    color: black;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 50px;
}
.sign-up-submit {
    margin-top: 50px;
    .agreement-check {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        font-size: 14px;
        color: @main_blue;
    }
}
</style>
