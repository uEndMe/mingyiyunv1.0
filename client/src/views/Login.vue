<template>
  <div>
    <div class="bg-gray">
      <div class="login-field">
        <van-field v-model="username"
                   placeholder="用户名"></van-field>
        <van-field v-model="password"
                   type="password"
                   placeholder="密码"></van-field>
      </div>
      <div class="the-wall">
        <van-button type="info"
                    size="large"
                    round
                    :disabled="couldBeClick"
                    :loading="btnLoading"
                    @click="handleLogin">
          Login
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Field, Button } from 'vant';

import { login } from '../api/request';
import { md5 } from '../config/util';
export default {
  computed: {
    couldBeClick () {
      return !(this.username && this.password);
    },
    params () {
      return {
        username: this.username,
        password: md5(this.password),
      };
    },
  },
  data () {
    return {
      username: '',
      password: '',
      btnLoading: false,
    };
  },
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
  },
  methods: {
    handleLogin () {
      this.btnLoading = true;
      login(this.params)
        .then((res) => {
          // console.log(res);
          this.$toast.success('Login successful!');
          this.btnLoading = false;
          window.sessionStorage.setItem(this.$c.tokenKey, res.data.token);
          window.sessionStorage.setItem(this.$c.userSigKey, res.data.user_sig);
          window.sessionStorage.setItem(this.$c.userIdKey, res.data.im_user_id);
          // this.$store.commit('IM/setUserInfo', res.data);
          this.$router.replace('/live');
        })
        .catch(() => {
          this.btnLoading = false;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.login-field {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
