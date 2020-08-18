<template>
  <section class="user">
    <div class="userInfo">
      <!-- 左边 -->
      <div class="userLeft">
        <p class="userName">{{data.name}}</p>
        <p class="userTags">
          <van-tag class="userTag"
                   v-for="(i,j) in data.tag"
                   :key="j"
                   color="#ececec"
                   text-color="#535353">{{i}}</van-tag>
        </p>
        <p class="userWork">{{data.work}}</p>
      </div>
      <!-- 右 -->
      <van-button type="default"
                  class="userFocus"
                  :class="{userIsFocus:data.focus}"
                  @click="focusUser">{{data.focus ? '已关注' : '关注'}} </van-button>
    </div>
    <p class="userHot">
      <span class="userFans">{{data.focusCount}}&emsp;关注</span>
      <span class="userFans">{{data.fans}}&emsp;粉丝</span>
    </p>
  </section>
</template>

<script>
import { Button, Tag } from 'vant';
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: 'FriendUser',
  mixins: [],
  components: {
    [Button.name]: Button,
    [Tag.name]: Tag,
  },

  // ---- ---- ---- ---- ---- 【响应数据】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 道具
  props: {
    data: Object, //name,tag,focus,work,focusCount,fans
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
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  padding: 20px;
  background-color: white;
}
// 左边信息
.userInfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userName {
  font-size: 18px;
  font-weight: 700;
  padding-bottom: 8px;
}

.userTag {
  margin-right: 8px;
  margin-bottom: 8px;
}

.userWork {
  font-size: 14px;
  color: @minor;
}

// 右边按钮
.userFocus {
  width: 60px;
  height: 30px;
  padding: 0;
  border-radius: 4px;
  font-size: 12px;
}
.userIsFocus {
  color: @minor;
}

// 下边关注量
.userHot {
  margin-top: 16px;
}
.userFans {
  font-size: 14px;
  margin-right: 20px;
  color: @minor;
}
</style>