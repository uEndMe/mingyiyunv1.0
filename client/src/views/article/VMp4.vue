<template>
  <ComLoading v-if="state.loading" class="bg"> </ComLoading>
  <!-- 使用拦截器，跳转对应错误页面 -->
  <!-- <ComLoaderr v-else-if="state.loaderr"
              class="bg"
              @click.native="load">
  </ComLoaderr> -->
  <div v-else-if="state.loaded" class="bg mp4">
    <!-- 滚动窗口 -->
    <article class="mp4Main">
      <!-- 用户信息 -->
      <ComUser :data="data" />
      <!-- 标题 -->
      <h1 class="mp4H1">{{ data.title }}</h1>
      <!-- 播放控件 -->
      <video class="mp4Vidio" controls preload="metadata" poster>
        <source :src="data.mp4" type="video/mp4" />
        <p>请下载新版浏览器</p>
      </video>
      <!-- 描述 -->
      <p class="mp4Desc">
        {{ data.desc }}
      </p>
      <!-- 正文 -->
      <p class="mp4Txt">
        {{ data.txt }}
      </p>
      <!-- 点赞 -->
      <van-button
        :icon="data.good ? 'like' : 'like-o'"
        @click="data.good = !data.good"
        plain
        class="mp4Good"
        :class="{ mp4IsGood: data.good }"
        type="default"
        >赞</van-button
      >
      <!-- 评论 -->
      <h2 class="h2 mp4H2 main-line-top">评论&nbsp;（{{ data.chat.length }}）</h2>
      <ArticleChat v-for="i in data.chat" :key="i.id" :data="i"> </ArticleChat>
    </article>
    <!-- 底部输入框 -->
    <ArticleFooter class="mp4Footer" :chatCount="data.chat.length" :showChat="showChat" />
  </div>
  <!-- 所有评论页面 -->
  <PageChat v-else-if="state.showChat" :data="data.chat" :close="closeChat" />
</template>

<script>
import test from "./test.js"; // 模拟数据

import { Button } from "vant";

import ComLoading from "@/components/common/ComLoading";
import ComUser from "@/components/common/ComUser";

import ArticleChat from "./chat/ArticleChat";
import ArticleFooter from "./footer/ArticleFooter";

import PageChat from "./pageChat/pageChat";
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: "VMp4",
  mixins: [],
  components: {
    [Button.name]: Button,
    ComLoading,
    ComUser,

    ArticleChat,
    ArticleFooter,

    PageChat
  },

  // ---- ---- ---- ---- ---- 【响应数据】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 道具
  props: {},

  // ---- ---- ---- ---- ---- 数据
  data() {
    return {
      state: { loading: true },
      data: {}
    };
  },

  // ---- ---- ---- ---- ---- 计算
  computed: {},

  // ---- ---- ---- ---- ---- 监视
  watch: {},

  // ---- ---- ---- ---- ---- 【生命周期】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 创造
  async created() {
    // req($route.params.id)
    // 模拟加载
    this.state = { loading: true };
    setTimeout(() => {
      this.data = test;
      this.data.id = this.$route.params.id; // 模拟id
      this.state = { loaded: true };
      // this.state = { loaderr: true }
    }, 500);
  },

  // ---- ---- ---- ---- ---- 挂载
  mounted() {},

  // ---- ---- ---- ---- ---- 销毁
  beforeDestroy() {},

  // ---- ---- ---- ---- ---- 方法
  methods: {
    showChat() {
      this.state = { showChat: true };
    },
    closeChat() {
      this.state = { loaded: true };
    }
  }
};
</script>

<style lang="less" scoped>
.mp4 {
  display: flex;
  flex-direction: column;
}
.mp4Main {
  flex: 1;
  padding: 20px;
  overflow-y: scroll;
}
.mp4H1 {
  line-height: 1.5;
  font-size: 16px;
  font-weight: 700;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: justify;
}

// 副标题
.mp4Desc {
  margin-bottom: 20px;
  padding: 20px;
  font-size: 14px;
  line-height: 1.5;
  background-color: #f0f0f0;
  border-radius: 8px;
  // text-indent: 2em;
}

// 正文
.mp4Vidio {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: #f0f0f0;
}
.mp4Txt {
  margin-bottom: 20px;
  text-indent: 2em;
  line-height: 1.5;
  text-align: justify;
}
// 赞
.mp4Good {
  display: block;
  width: 200px;
  height: 40px;
  margin: auto;
  background-color: #fafafa;
  color: @minor;
  margin-bottom: 40px;
}
.mp4IsGood {
  color: #ff4d4f;
  background-color: #fff;

  border-color: #fff;
}

.mp4H2 {
  padding: 20px 0;
}
</style>
