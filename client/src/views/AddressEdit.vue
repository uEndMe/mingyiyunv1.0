<template>
    <div class="bg">
        <van-field v-model="info.name" size="large"
            :label="$lang.address_edit.name"
            :placeholder="$lang.address_edit.name_placeholder">
        </van-field>
        <van-field v-model="info.contact" size="large" type="tel"
            :label="$lang.address_edit.phone"
            :placeholder="$lang.address_edit.phone_placeholder">
        </van-field>
        <van-field v-model="info.province" size="large"
            :label="$lang.address_edit.state"
            :placeholder="$lang.address_edit.state_placeholder">
        </van-field>
        <van-field v-model="info.city" size="large"
            :label="$lang.address_edit.city"
            :placeholder="$lang.address_edit.city_placeholder">
        </van-field>
        <van-field v-model="info.address" size="large"
            :label="$lang.address_edit.address"
            :placeholder="$lang.address_edit.address_placeholder">
        </van-field>
        <van-field v-model="info.zip" size="large"
            :label="$lang.address_edit.zip"
            :placeholder="$lang.address_edit.zip_placeholder">
        </van-field>
        <div class="edit-save the-wall">
            <van-button type="info" :disabled="btnDisable"
                size="large"
                round
                :loading="saveBtnLoading"
                @click="handleSave">
                {{$lang.address_edit.save}}
            </van-button>
        </div>
    </div>
</template>

<script>
import { Field, Button } from 'vant';
import { addressAdd, addressEdit } from '../api/request';
export default {
    components: {
        [Field.name]: Field,
        [Button.name]: Button,
    },
    data () {
        return {
            info: {
                name: '',
                contact: '',
                province: '',
                city: '',
                address: '',
                zip: '',
            },
            saveBtnLoading: false,
            address_id: 0,
        };
    },
    computed: {
        btnDisable () {
            let able;
            Object.values(this.info).forEach((value) => {
                able = value === '';
            });
            return able;
        },
        editInfo () {
            return this.$store.getters['address/editInfo'];
        },
        isEdit () {
            return this.$store.state.address.isEdit;
        },
    },
    created () {
        if (this.isEdit) {
            Object.assign(this.$data.info, this.editInfo);
        }
    },
    methods: {
        handleSave () {
            this.saveBtnLoading = true;
            if (this.isEdit) {
                this.handleEditAddress();
            } else {
                this.handleAddAddress();
            }
        },
        handleAddAddress () {
            addressAdd(this.info)
                .then((res) => {
                    this.saveBtnLoading = false;
                    this.$toast(this.$lang.address_edit.addSucc);
                    this.$router.push({
                        path: '/addresslist',
                    });
                })
                .catch(() => {
                    this.saveBtnLoading = false;
                });
        },
        handleEditAddress () {
            addressEdit(this.info)
                .then((res) => {
                    this.saveBtnLoading = false;
                    this.$toast(this.$lang.address_edit.editSucc);
                    this.$router.push({
                        path: '/addresslist',
                    });
                })
                .catch(() => {
                    this.saveBtnLoading = false;
                });
        },
    },
};
</script>

<style lang="less" scoped>
.van-cell--center {
    /deep/ .van-cell__value {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
}
.edit-save {
    margin-top: 50px;
}
</style>
