<template>
    <div class="bg-gray">
        <div ref="addressGroup" class="address-group">
            <van-list v-model="$store.state.address.loading"
                :finished="$store.state.address.finished"
                finished-text="No More"
                :immediate-check="false"
                @load="onLoad">
                <template v-for="item of list">
                    <div :key="item.address_id" class="address-item" @click="handleSetDefault(item.address_id)">
                        <van-checkbox v-model="item.is_default"></van-checkbox>
                        <div class="address-label">
                            <div>{{`${item.name}, ${item.contact}`}}</div>
                            <div>{{`${item.area}${item.address}`}}</div>
                            <div>{{item.zip}}</div>
                        </div>
                        <div class="address-operation">
                            <van-icon name="delete" @click.stop="handleDelete(item.address_id)"></van-icon>
                            <van-icon name="edit" @click.stop="handleEdit(item.address_id)"></van-icon>
                        </div>
                    </div>
                </template>
            </van-list>
        </div>
        <div ref="addressAddBtn" class="address-add-btn the-wall">
            <van-button type="info" round size="large" to="/addressedit">+ {{$lang.address_list.add_btn_text}}</van-button>
        </div>
    </div>
</template>

<script>
import { Checkbox, Icon, Button, List, Dialog } from 'vant';
import { addressDefault, addressDelete } from '../api/request';
export default {
    data () {
        return {
            delPage: 0,
        };
    },
    components: {
        [Checkbox.name]: Checkbox,
        [Icon.name]: Icon,
        [Button.name]: Button,
        [Dialog.name]: Dialog,
        [List.name]: List,
    },
    computed: {
        list () {
            return this.$store.getters['address/list'];
        },
        addressList () {
            return this.$store.state.address.addressList;
        },
        limit () {
            return this.$store.state.address.limit;
        },
        replace () {
            return this.$store.state.address.replace;
        },
        isEdit () {
            return this.$store.state.address.isEdit;
        },
    },
    watch: {
        '$store.state.status' () {
            const delIndex = this.delPage * this.limit - this.limit; // 删除页数的起始位
            const arr = [...this.addressList];
            arr.splice(delIndex, this.addressList.length - delIndex, ...this.replace);
            this.$store.commit('address/setAddressNoConcat', arr);
        },
        'isEdit' () {
            if (this.isEdit) {
                this.$router.push({
                    path: '/addressedit',
                });
            }
        },
    },
    created () {
        this.$store.commit('address/setIsEdit', false); // 进入页面初始化必须
        this.$store.commit('address/setPage', 1);
        this.$store.commit('address/setFinished', false);
        this.$store.commit('address/setAddressNoConcat', []);
        this.$store.dispatch('address/handleGetAddressList');
    },
    mounted () {
        this.$nextTick(() => {
            this.$refs.addressGroup.style.height = `${document.body.clientHeight - this.$refs.addressAddBtn.offsetHeight}px`;
        });
    },
    methods: {
        onLoad () {
            this.$store.dispatch('address/handleGetAddressList');
        },
        handleSetDefault (addressId) {
            addressDefault({address_id: addressId});
            let arr = [...this.addressList];
            arr.forEach((item) => {
                if (item.address_id === addressId) {
                    item.is_default = 1;
                } else {
                    item.is_default = 0;
                }
            });
            this.$store.commit('address/setAddressNoConcat', arr);
        },
        handleDelete (addressId) {
            Dialog.confirm({
                title: this.$lang.common.isDelete,
                confirmButtonText: this.$lang.common.confirmBtn,
                cancelButtonText: this.$lang.common.cancelBtn,
            })
                .then(() => {
                    addressDelete({address_id: addressId})
                        .then(() => {
                            this.handleRefresh(addressId);
                        });
                });
        },
        handleEdit (addressId) {
            this.$store.dispatch('address/handleGetAddressInfo', addressId);
        },
        handleRefresh (addressId) {
            const arr = [...this.addressList];
            arr.forEach((item, index, array) => {
                if (item.address_id === addressId) {
                    this.delPage = Math.ceil((index + 1) / this.limit);
                    this.$store.commit('address/setPage', this.delPage);
                    this.$store.dispatch('address/handleGetAddressList', true);
                    return;
                }
            });
        },
    },
};
</script>

<style lang="less" scoped>
.address-group {
    box-sizing: border-box;
    padding-top: 10px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch; //解决ios手机页面滑动卡顿
}
.address-item {
    background-color: #fff;
    padding: @global_padding;
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    position: relative;
    overflow: hidden;
    &:not(:last-child) {
        margin-bottom: 10px;
    }
}
.address-label {
    width: 83%;
    font-size: 14px;
    margin-left: 10px;
    & > div:nth-child(2) {
        padding: 5px 0;
    }
}
.address-operation {
    position: absolute;
    top: 0;
    right: 20px;
    height: 100%;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.address-add-btn {
    box-sizing: border-box;
    width: 100%;
    padding-bottom: 30px;
    padding-top: 10px;
    position: fixed;
    bottom: 0;
    overflow: hidden;
}
</style>
