<template>
    <div v-show="show" class="bg-gray">
        <van-cell-group
            :title="title"
            :border="false">
            <van-field v-model="link"
                :class="isMgTop"
                size="large"
                autofocus
                :error-message="errorMsg"
                :placeholder="placeholder"
                @focus="handleFocus">
            </van-field>
        </van-cell-group>
        <div class="the-wall the-white "></div>
        <div class="the-wall mg-top-30">
            <van-button type="info"
                size="large"
                round
                :loading="btnLoading"
                @click="handleSubmit">
                {{btnText}}
            </van-button>
        </div>
    </div>
</template>

<script>
import { Field, Button, CellGroup } from 'vant';
import { profileLink, userInfo } from '../api/request';
export default {
    components: {
        [CellGroup.name]: CellGroup,
        [Field.name]: Field,
        [Button.name]: Button,
    },
    created () {
        this.handleGetInfo();
    },
    computed: {
        params () {
            return {
                profile_link: this.link,
            };
        },
        isMgTop () {
            if (this.placeholder !== this.$lang.amazonLink.tip) {
                return '';
            }
            return 'mg-top-20';
        },
        title () {
            return !this.isMgTop ? 'My Amazon Profile Link' : '';
        },
        btnText () {
            return !this.isMgTop ? 'Revise' : this.$lang.common.submitBtn;
        },
    },
    data () {
        return {
            link: '',
            errorMsg: '',
            btnLoading: false,
            placeholder: this.$lang.amazonLink.tip,
            show: false,
        };
    },
    methods: {
        handleGetInfo () {
            userInfo()
                .then((res) => {
                    if (res) {
                        this.placeholder = res.data.profile_link;
                        this.show = true;
                    }
                });
        },
        handleFocus () {
            this.errorMsg = '';
        },
        handleSubmit () {
            if (this.link === '') {
                this.errorMsg = 'Please fill in your Amazon profile link';
                return;
            }
            this.btnLoading = true;
            profileLink(this.params)
                .then(() => {
                    this.$toast(this.$lang.common.submit_succ);
                    this.link = '';
                    this.btnLoading = false;
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
.mg-top-20 {
    margin-top: 20px;
}
.mg-top-30 {
    margin-top: 30px;
}
</style>
