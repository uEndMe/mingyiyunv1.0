<template>
    <div class="bg-gray">
        <van-field v-model="username"
            class="mg"
            :label="$lang.withdrawal.paypal"
            label-width="2rem"
            size="large"
            @focus="handleFocus"
            :placeholder="$lang.withdrawal.paypalPlace">
        </van-field>
        <van-field :label="$lang.withdrawal.amount" size="large" :border="false" disabled></van-field>
        <van-field v-model="money"
            type="number"
            class="bold-field"
            :label="$lang.withdrawal.moneySymbol"
            label-width="0.6rem"
            label-class="bold-field-label"
            size="large"
            @focus="handleFocus">
        </van-field>
        <div class="the-wall the-white">
            <div class="balance-info">
                <span>{{`${$lang.common.balance} ${$lang.withdrawal.moneySymbol}${balance}, `}}</span>
                <span @click="withdrawalAll">{{$lang.withdrawal.withdrawalAll}}</span>
            </div>
            <van-button
                type="info"
                size="large"
                round
                :loading="submitLoading"
                :disabled="couldBeSubmit"
                @click="handleWithdrawal">
                {{$lang.common.submitBtn}}
            </van-button>
        </div>
    </div>
</template>

<script>
import { Field, Button, Cell } from 'vant';
import { accountWithdrawal } from '../api/request';
export default {
    components: {
        [Cell.name]: Cell,
        [Field.name]: Field,
        [Button.name]: Button,
    },
    computed: {
        balance () {
            return this.$store.getters['account/info'].balance;
        },
        couldBeSubmit () {
            return !(this.username && this.money);
        },
        params () {
            return {
                username: this.username,
                money: this.money * 100,
            };
        },
    },
    watch: {
        'money' () {
            let float = '';
            if (this.money.split('.')[1]) {
                float = this.money.split('.')[1];
            }
            if (this.balance === 0) {
                this.$toast(this.$lang.withdrawal.insufficient);
                this.money = '';
            } else if (parseFloat(this.money, 10) > this.balance) {
                this.money = this.balance;
            } else if (parseFloat(this.money, 10) < 0) {
                this.$toast(this.$lang.withdrawal.errInput);
                this.money = '';
            } else if (float && float.length > 2) {
                this.money = this.money.slice(0, -1);
            }
        },
    },
    data () {
        return {
            username: '',
            money: '',
            submitLoading: false,
        };
    },
    methods: {
        withdrawalAll () {
            if (parseInt(this.balance, 10) === 0) {
                this.$toast(this.$lang.withdrawal.insufficient);
                this.money = '';
            } else if (!(parseInt(this.balance, 10))) {
                this.$router.push({
                    path: '/wallet',
                });
            } else {
                this.money = this.balance;
            }
        },
        handleWithdrawal () {
            this.submitLoading = true;
            accountWithdrawal(this.params)
                .then(() => {
                    this.submitLoading = false;
                    this.$toast(this.$lang.common.apply_succ);
                    window.location.href = 'http://merchant-apply.com/';
                })
                .catch(() => {
                    this.submitLoading = false;
                });
        },
        handleFocus () {
            if (!(parseInt(this.balance, 10))) {
                this.$router.push({
                    path: '/wallet',
                });
            }
        },
    },
};
</script>

<style lang="less" scoped>
.mg {
    margin: 10px 0;
}
.bold-field {
    font-size: 30px;
}
.bold-field-label {
    /deep/ & > span {
        font-size: 30px;
        font-weight: bold;
        line-height: 34px;
    }
}
.balance-info {
    font-size: 12px;
    color: #999999;
    padding-top: 20px;
    margin-bottom: 10px;
    & > span:last-child {
        color: @main_blue;
    }
}
</style>
