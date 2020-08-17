<template>
  <!-- 用户信息 -->
  <div class="user">
    <!-- 左 -->
    <div class="userInfo">
      <!-- 头像 -->
      <img :src="data.icon"
           class="userIcon"
           alt="头像">
      <!-- 用户名 -->
      <div class="userContent">
        <p class="userName">
          <span>{{data.name}}</span>
          <van-tag class="userTag"
                   v-for="(i,j) in data.tag"
                   :key="j"
                   color="#ececec"
                   text-color="#535353">{{i}}</van-tag>
        </p>
        <p class="userTime">{{data.time}}</p>
      </div>
    </div>
    <!-- 右 -->
    <van-button type="default"
                class="userFocus"
                :class="{userIsFocus:data.focus}"
                @click="focusUser">{{data.focus ? '已关注' : '关注'}} </van-button>
  </div>
</template>

<script>
import { Button, Tag } from 'vant';
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: '',
  mixins: [],
  components: {
    [Button.name]: Button,
    [Tag.name]: Tag,
  },

  // ---- ---- ---- ---- ---- 【响应数据】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 道具
  props: {
    data: Object,
  },

  // ---- ---- ---- ---- ---- 数据
  data () { return {} },

  // ---- ---- ---- ---- ---- 计算
  computed: {},

  // ---- ---- ---- ---- ---- 监视
  watch: {},

  // ---- ---- ---- ---- ---- 【生命周期】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 创造
  created () { },

  // ---- ---- ---- ---- ---- 挂载
  mounted () { },

  // ---- ---- ---- ---- ---- 销毁
  beforeDestroy () { },

  // ---- ---- ---- ---- ---- 方法
  methods: {
    focusUser () {
      this.data.focus = !this.data.focus
      // req(...)
    },
  }
}
</script>

<style lang="less" scoped>
// 用户信息
.user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
.userInfo {
  display: flex;
  align-items: center;
}

.userIcon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.userContent {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 46px;
  padding-left: 10px;
}
.userName {
  font-size: 14px;
  display: flex;
  align-items: center;
}
.userTag {
  margin-left: 4px;
}

.userTime {
  font-size: 12px;
  color: @minor;
}
.userFocus {
  width: 88px;
  height: 30px;
  border-radius: 4px;
  font-size: 12px;
}
.userIsFocus {
  color: @minor;
}
</style>