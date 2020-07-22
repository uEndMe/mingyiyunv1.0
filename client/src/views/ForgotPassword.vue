<template>
    <div>
        <div class="reset-steps the-wall">
            <div v-for="(item, i) of steps" :key="i" :class="isActive === i ? 'active' : ''">{{item}}</div>
        </div>
        <van-form v-if="isActive === 0" class="mg-top-30">
            <van-field v-model="email"
                type="email"
                size="large"
                :error="rules.email.error"
                :error-message="rules.email.message"
                @focus="onFocus('email')"
                placeholder="E-mail">
                <my-svg slot="left-icon" iconName="email" className="set-svg-style"></my-svg>
            </van-field>
            <div class="van-field the-wall mg-top-60">
                <van-button type="info"
                    size="large"
                    round
                    :loading="nextBtnLoading"
                    @click="handleCheck">
                    {{$lang.common.nextBtn}}
                </van-button>
            </div>
        </van-form>
        <div v-else-if="isActive === 2" class="the-wall mg-top-30">
            <div class="send-succ-tip">{{`${$lang.common.sendCodeSucc} ${email}`}}</div>
            <div class="mg-top-30">
                <div class="input-title the-wall">
                    <div>{{$lang.forgetPass.verifyCodeTitle}}</div>
                    <van-button size="small"
                        :disabled="disabledResend"
                        @click="handleResend">
                        {{timeCount}}
                    </van-button>
                </div>
                <van-password-input
                    :value="verifyCode"
                    :focused="showKeyboard"
                    length="6"
                    @focus="showKeyboard= true">
                </van-password-input>
                <van-number-keyboard
                    :show="showKeyboard"
                    :maxlength="6"
                    @input="onInput"
                    @delete="onDelete"
                    @blur="showKeyboard = false">
                </van-number-keyboard>
            </div>
        </div>
        <van-form v-else class="mg-top-30">
            <van-field v-model="password"
                size="large"
                :type="passType"
                :placeholder="$lang.common.password"
                :error="rules.password.error"
                :error-message="rules.password.message"
                @focus="onFocus('password')">
                <my-svg slot="left-icon" iconName="lock" className="set-svg-style"></my-svg>
                <van-icon slot="right-icon" :name="iconEye" @click="controlEye = !controlEye"></van-icon>
            </van-field>
            <van-field v-model="confirmPass"
                size="large"
                type="password"
                :placeholder="$lang.forgetPass.enterAgain"
                :error="rules.confirmPass.error"
                :error-message="rules.confirmPass.message"
                @focus="onFocus('confirmPass')">
                <my-svg slot="left-icon" iconName="lock1" className="set-svg-style"></my-svg>
            </van-field>
            <div class="the-wall mg-top-30">
                <van-button
                    size="large"
                    type="info"
                    round
                    :loading="confirmBtnLoading"
                    @click="handleConfirm">
                    {{$lang.common.confirmBtn}}
                </van-button>
            </div>
        </van-form>
        <my-overlay :show="overlayShow"></my-overlay>
    </div>
</template>

<script>
import { Field, Button, Form, PasswordInput, NumberKeyboard, Icon } from 'vant';
import myOverlay from '../components/OverlayComponent';
import mySvg from '../components/SvgIcon';
import { sendCode, getResetPasswordCode, resetPassword } from '../api/request';
import { md5 } from '../config/util';
export default {
    components: {
        myOverlay,
        mySvg,
        [Form.name]: Form,
        [Field.name]: Field,
        [Button.name]: Button,
        [PasswordInput.name]: PasswordInput,
        [NumberKeyboard.name]: NumberKeyboard,
        [Icon.name]: Icon,
    },
    computed: {
        checkParams () {
            return {
                type: 'check',
                email: this.email,
            };
        },
        getCodeParams () {
            return {
                email: this.email,
                verify_code: this.verifyCode,
            };
        },
        resetParams () {
            return {
                password: md5(this.password),
                code: this.code,
            };
        },
    },
    watch: {
        'verifyCode' () {
            if (this.verifyCode.length === 6) {
                this.overlayShow = true;
                this.showKeyboard = false;
                getResetPasswordCode(this.getCodeParams)
                    .then((res) => {
                        this.overlayShow = false;
                        this.isActive = 4;
                        this.code = res.data.code;
                    })
                    .catch(() => {
                        this.overlayShow = false;
                    });
            }
        },
        'isActive' () {
            if (this.isActive === 2) {
                this.setTimeCount();
            }
        },
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
    created () {
        this.steps = this.$lang.forgetPass.steps;
    },
    data () {
        return {
            steps: [],
            isActive: 0, // 0为步骤1，2为步骤2，4为步骤3
            email: '',
            verifyCode: '', // 第一步邮箱收到的验证码
            code: '', // 第二步填入邮箱验证码后返回修改密码的授权凭证
            password: '',
            confirmPass: '',
            rules: {
                email: { error: false, message: '' },
                password: { error: false, message: '' },
                confirmPass: { error: false, message: '' },
            },
            timeCount: '60s',
            passType: 'password',
            iconEye: 'closed-eye',
            controlEye: false,
            disabledResend: true,
            nextBtnLoading: false,
            confirmBtnLoading: false,
            showKeyboard: true,
            isStop: false,
            overlayShow: false,
        };
    },
    methods: {
        handleCheck () {
            if (this.email === '') {
                const errorEmailTip = { error: true, message: this.$lang.common.emptyEmailTip };
                Object.assign(this.rules.email, errorEmailTip);
                return;
            }
            this.nextBtnLoading = true;
            sendCode(this.checkParams)
                .then(() => {
                    this.nextBtnLoading = false;
                    this.isActive = 2;
                })
                .catch(() => {
                    this.nextBtnLoading = false;
                });
        },
        handleResend () {
            this.disabledResend = true;
            this.setTimeCount();
            sendCode(this.checkParams)
                .catch(() => {
                    this.isStop = true;
                    this.disabledResend = false;
                    this.timeCount = 'Resend';
                });
        },
        setTimeCount (isClear) {
            let count = 60;
            this.timeCount = `${count}s`;
            const timer = setInterval(() => {
                if (this.isStop) {
                    clearInterval(timer);
                    this.isStop = false;
                    return;
                }
                count--;
                this.timeCount = `${count}s`;
                if (count <= 0) {
                    clearInterval(timer);
                    this.disabledResend = false;
                    count = 60;
                    this.timeCount = 'Resend';
                }
            }, 1000);
        },
        handleConfirm () {
            if (this.vaildResendParams()) {
                this.confirmBtnLoading = true;
                resetPassword(this.resetParams)
                    .then(() => {
                        this.confirmBtnLoading = false;
                        this.$toast({
                            message: this.$lang.common.reset_succ,
                            duration: 2000,
                            onClose: () => {
                                window.location.href = 'http://192.168.0.107/relogin';
                            },
                        });
                    })
                    .catch(() => {
                        this.confirmBtnLoading = false;
                    });
            }
        },
        onFocus (key) {
            Object.assign(this.rules[key], this.$options.data().rules[key]);
        },
        onInput (key) {
            this.verifyCode = (this.verifyCode + key).slice(0, 6);
        },
        onDelete () {
            this.verifyCode = this.verifyCode.slice(0, this.verifyCode.length - 1);
        },
        vaildResendParams () {
            let isPass = true;
            if (this.password === '') {
                Object.assign(this.rules.password, { error: true, message: this.$lang.register.errPasswordText });
                isPass = false;
            } else if (this.password !== this.confirmPass) {
                Object.assign(this.rules.confirmPass, { error: true, message: this.$lang.common.password_diff });
                isPass = false;
            }
            return isPass;
        },
    },
};
</script>

<style lang="less" scoped>
/deep/ .van-button--default {
    border: none;
    color: @main_blue;
    font-size: 14px;
}
.reset-steps {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #999999;
    padding-top: 8px;
    padding-bottom: 8px;
    background-color: #eeeeee;
    margin-top: 20px;
    .active {
        color: @main_blue;
    }
}
.set-svg-style {
    font-size: 16px;
    margin-right: 10px;
}
.send-succ-tip {
    font-size: 16px;
    color: #999999;
    line-height: 25px;
}
.mg-top-30 {
    margin-top: 30px;
}
.mg-top-60 {
    margin-top: 60px;
}
.input-title {
    font-size: 14px;
    color: #cccccc;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
