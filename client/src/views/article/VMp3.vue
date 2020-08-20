<template>
  <ComLoading v-if="state.loading" class="bg"> </ComLoading>
  <div v-else-if="state.loaded" class="bg mp3">
    <ComHeader title="音频内容" rightIcon="van-icon-cluster-o" class="mp3Header" />
    <section class="mp3Main">
      <!-- 用户信息 -->
      <ComUser :data="data" />
      <!-- 音频封面 -->
      <img :src="data.img" :alt="data.title" class="mp3Poster" />
      <!-- 标题 -->
      <h1 class="mp3H1">{{ data.title }}</h1>
      <!-- 描述 -->
      <p class="mp3Desc">{{ data.desc }}</p>
      <!-- 播放控件 -->
      <audio class="mp3Audio" controls>
        <source :src="data.mp3" />
        <p>请下载新版浏览器</p>
      </audio>
    </section>
    <footer class="mp3Footer">
      <div class="mp3FooterItem">
        <i class="van-icon van-icon-description"></i>
        <p>简介</p>
      </div>
      <div class="mp3FooterItem" @click="data.good = !data.good" :class="{ mp3IsGood: data.good }">
        <i
          class="van-icon"
          :class="{
            'van-icon-like': data.good,
            'van-icon-like-o': !data.good
          }"
        ></i>
        <p>喜欢</p>
      </div>
      <div class="mp3FooterItem">
        <i class="van-icon van-icon-chat-o"></i>
        <p>评论</p>
      </div>
    </footer>
  </div>
  <!-- 所有评论页面 -->
  <PageChat v-else-if="state.showChat" :data="data.chat" :close="closeChat" />
</template>

<script>
import test from "./test.js"; // 模拟数据

import ComHeader from "@/components/common/ComHeader";
import ComLoading from "@/components/common/ComLoading";
import ComUser from "@/components/common/ComUser";

import PageChat from "./pageChat/pageChat";
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: "VMp3",
  mixins: [],
  components: {
    ComLoading, // 1
    ComHeader, // 2
    ComUser, // 2
    PageChat // 3
  },

  // ---- ---- ---- ---- ---- 【响应数据】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 道具
  props: {},

  // ---- ---- ---- ---- ---- 数据
  data() {
    return {
      state: { loading: true },
      data: {} // 模拟数据
    };
  },

  // ---- ---- ---- ---- ---- 计算
  computed: {},

  // ---- ---- ---- ---- ---- 监视
  watch: {},

  // ---- ---- ---- ---- ---- 【生命周期】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 创造
  created() {
    // req($route.params.id)
    // 模拟加载
    this.state = { loading: true };
    setTimeout(() => {
      this.data = test; // 模拟数据
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
.mp3 {
  display: flex;
  flex-direction: column;
}
.mp3Header,
.mp3Footer {
  flex: none;
}
.mp3Main {
  flex: auto;
  padding: 20px;
  overflow: scroll;
}

// 滚动内容区
.mp3Poster {
  display: block;
  width: 75%;
  margin: 20px auto 20px;
  border-radius: 2px;
  margin-bottom: 20px;
}
.mp3H1 {
  width: 75%;
  margin: 0 auto 20px;
  line-height: 1.5;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
}
.mp3Desc {
  margin-bottom: 20px;
  padding: 20px;
  font-size: 14px;
  line-height: 1.5;
  background-color: #f0f0f0;
  border-radius: 8px;
  // text-indent: 2em;
}
.mp3Audio {
  width: 100%;
}

// 底部
.mp3Footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80px;
}
.mp3FooterItem {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: @minor;
  & i {
    font-size: 24px;
    margin-bottom: 6px;
  }
  & p {
    font-size: 12px;
  }
}

.mp3IsGood {
  color: #ff4d4f;
}
</style>
