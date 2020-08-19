<template>
  <ComLoading v-if="state.loading"
              class="bg">
  </ComLoading>
  <div v-else-if="state.loaded"
       class="bg mp3">
    <ComHeader title=""
               rightIcon="van-icon-cluster-o"
               class="mp3Header" />
    <section class="mp3Main">
      <!-- 用户信息 -->
      <ArticleUser :data="data" />
      <div class="mp3Mp3">xx</div>
      <!-- 标题 -->
      <h1 class="mp3H1">{{data.title}}</h1>
      <!-- 描述 -->
      <p class="mp3Desc">{{data.desc}}</p>
      <!-- 播放控件 -->
      <div>xx</div>
    </section>
    <footer class="mp3Footer">
      <div class="mp3FooterItem">
        <i class="van-icon van-icon-description"></i>
        <p>简介</p>
      </div>
      <div class="mp3FooterItem">
        <i class="van-icon van-icon-like-o"></i>
        <p>喜欢</p>
      </div>
      <div class="mp3FooterItem">
        <i class="van-icon van-icon-chat-o"></i>
        <p>评论</p>
      </div>
    </footer>
  </div>
  <!-- 所有评论页面 -->
  <PageChat v-else-if="state.showChat"
            :data="data.chat"
            :close="closeChat" />
</template>

<script>
import test from './test.js' // 模拟数据
import ArticleUser from './user/ArticleUser'

import ComLoading from '@/components/common/ComLoading'
import ComHeader from '@/components/common/ComHeader'


import PageChat from './pageChat/pageChat'
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: 'VMp3',
  mixins: [],
  components: {
    ComLoading, // 1
    ComHeader, // 2
    ArticleUser, // 2
    PageChat, // 3
  },

  // ---- ---- ---- ---- ---- 【响应数据】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 道具
  props: {

  },

  // ---- ---- ---- ---- ---- 数据
  data () {
    return {
      state: { loading: true },
      data: {},  // 模拟数据
    }
  },

  // ---- ---- ---- ---- ---- 计算
  computed: {},

  // ---- ---- ---- ---- ---- 监视
  watch: {},

  // ---- ---- ---- ---- ---- 【生命周期】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 创造
  created () {
    // req($route.params.id)
    // 模拟加载
    this.state = { loading: true }
    setTimeout(() => {
      this.data = test  // 模拟数据
      this.state = { loaded: true }
      // this.state = { loaderr: true }
    }, 500)
  },

  // ---- ---- ---- ---- ---- 挂载
  mounted () { },

  // ---- ---- ---- ---- ---- 销毁
  beforeDestroy () { },

  // ---- ---- ---- ---- ---- 方法
  methods: {
    showChat () {
      this.state = { showChat: true }
    },
    closeChat () {
      this.state = { loaded: true }
    }
  }
}
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
}

// 滚动内容区
.mp3Mp3 {
  margin-bottom: 20px;
}
.mp3H1 {
  line-height: 1.5;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 26px;
  text-align: justify;
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

// 底部
.mp3Footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 48px;
}
.mp3FooterItem {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>