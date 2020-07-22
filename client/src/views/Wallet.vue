<template>
    <div v-if="done" class="bg-gray">
        <div class="wallet-header">
            <div>{{$lang.common.balance}}</div>
            <div>{{info.balance}}</div>
        </div>
        <div class="wallet-status">
            <div>
                <div>{{info.freeze}}</div>
                <div>{{$lang.wallet.withdrawable}}</div>
            </div>
            <div>
                <div>{{info.have_withdrawal}}</div>
                <div>{{$lang.wallet.withdrawal}}</div>
            </div>
        </div>
        <div class="wallet-cell">
            <van-cell :title="$lang.wallet.withdrawal_record" size="large" is-link center
                @click="handleToRecord">
                <van-icon slot="icon" name="records" size="0.5rem" class="cell-icon"></van-icon>
            </van-cell>
            <van-cell :title="$lang.wallet.iae" size="large" is-link center @click="handleToInOut">
                <van-icon slot="icon" name="description" size="0.5rem" class="cell-icon"></van-icon>
            </van-cell>
        </div>
        <div class="wallet-explain the-wall">
            <h4>{{$lang.wallet.eow}}</h4>
            <p>
                <span>1、</span>
                {{$lang.wallet.explain1}}
            </p>
            <p>
                <span>2、</span>
                {{$lang.wallet.explain2}}
            </p>
            <p>
                <span>3、</span>
                {{$lang.wallet.explain3}}
            </p>
        </div>
        <div class="the-wall">
            <van-button type="info" round size="large" to="/withdrawal">{{$lang.common.applyBtn}}</van-button>
        </div>
    </div>
</template>

<script>
import { Cell, Button, Icon } from 'vant';
export default {
    components: {
        [Cell.name]: Cell,
        [Button.name]: Button,
        [Icon.name]: Icon,
    },
    computed: {
        info () {
            return this.$store.getters['account/info'];
        },
        isDone () {
            return this.$store.state.status;
        },
    },
    watch: {
        'isDone' () {
            this.done = true;
        },
    },
    created () {
        this.$store.dispatch('account/handleGetAccountInfo');
    },
    data () {
        return {
            done: false,
        };
    },
    methods: {
        handleToRecord () {
            this.$store.commit('account/setPage', 1);
            this.$store.commit('account/setFinished', false);
            this.$store.commit('account/setWithdrawalRecordNoConcat', []);
            this.$store.dispatch('account/handleGetRecord');
            this.$router.push({
                path: '/record',
            });
        },
        handleToInOut () {
            this.$store.commit('account/setPage', 1);
            this.$store.commit('account/setFinished', false);
            this.$store.commit('account/setInOutListNoConcat', []);
            this.$store.dispatch('account/handleGetInOut');
            this.$router.push({
                path: '/expense',
            });
        },
    },
};
</script>

<style lang="less" scoped>
.wallet-header {
    height: 100px;
    background-color: @main_blue;
    box-sizing: border-box;
    text-align: center;
    color: #ffffff;
    padding-top: 17px;
    & > div:first-child {
        font-size: 12px;
        margin-bottom: 10px;
    }
    & > div:last-child {
        font-size: 36px;
    }
}
.wallet-status {
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
    display: flex;
    justify-content: space-around;
    position: relative;
    background-color: #ffffff;
    & > div:not(:last-child)::after {
        content: '';
        width: 1px;
        display: block;
        background-color: #999999;
        position: absolute;
        top: 10px;
        bottom: 10px;
        left: 50%;
    }
    & > div > div:first-child {
        font-size: 20px;
    }
    & > div > div:last-child {
        font-size: 12px;
        color: #999999;
    }
}
.wallet-cell {
    margin-top: 10px;
    .cell-icon {
        margin-right: 5px;
        color: @main_blue;
    }
}
.wallet-explain {
    padding: 20px;
    padding-left: 30px;
    font-size: 14px;
    background-color: #ffffff;
    margin-top: 10px;
    margin-bottom: 15px;
    & > h4 {
        margin-bottom: 10px;
    }
}
</style>
