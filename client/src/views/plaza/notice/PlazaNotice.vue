<template>
  <ComLoading v-if="state.loading"> </ComLoading>
  <ul v-else-if="state.loaded" class="notice">
    <li class="noticeArticle" v-for="i in data" :key="i.id">
      <!-- 用户 -->
      <ComUser :data="i" />
      <!-- 问题描述 -->
      <p class="noticeTxt van-multi-ellipsis--l2">{{ i.txt }}</p>
      <!-- 调研卡片 -->
      <article class="noticeCard">
        <p class="noticeTitle">{{ i.title }}</p>
        <ul class="noticeList">
          <li v-for="(i, j) in i.case" :key="j" class="noticeItem">
            <span>{{ i.txt }}</span>
            <span>{{ i.count }}票</span>
          </li>
        </ul>
      </article>
      <!-- 参与 -->
      <p class="noticeCount main-line-bottom">{{ i.count }}人参与</p>
      <ul>
        <!-- 评论回复 -->
        <li
          v-for="(i, j) in i.chats"
          :key="j"
          class="noticeIssue main-line-bottom"
          @click="$router.push('/issue')"
        >
          <img v-if="i.img" class="noticeIssueImg" :src="i.img" :alt="i.txt" />
          <!-- 文本内容 -->
          <article class="noticeIssueRight">
            <p class="noticeIssueTxt van-multi-ellipsis--l2">{{ i.txt }}</p>
            <p class="noticeIssueMinor">
              <span>@{{ i.name }}</span>
              <span>{{ i.time }}提问</span>
              <span>{{ i.reply }}个回答</span>
            </p>
          </article>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import test from "./test.js";

import ComLoading from "@/components/common/ComLoading";
import ComUser from "@/components/common/ComUser";

export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: "PlazaNotice",
  mixins: [],
  components: {
    ComLoading,
    ComUser
  },

  // ---- ---- ---- ---- ---- 【响应数据】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 道具
  props: {},

  // ---- ---- ---- ---- ---- 数据
  data() {
    return {
      state: { init: true },
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
    // req()
    // 模拟加载
    this.state = { loading: true };
    setTimeout(() => {
      this.data = test;
      this.state = { loaded: true };
      // this.state = { loaderr: true }
    }, 500);
  },

  // ---- ---- ---- ---- ---- 挂载
  mounted() {},

  // ---- ---- ---- ---- ---- 销毁
  beforeDestroy() {},

  // ---- ---- ---- ---- ---- 方法
  methods: {}
};
</script>

<style lang="less" scoped>
.notice {
}
.noticeArticle {
  padding: 20px;
  background: white;
  margin-top: 10px;
}
.noticeTxt {
  font-size: 14px;
  margin-top: 20px;
}
.noticeCard {
  margin-top: 20px;
  padding: 20px;
  color: @minor;
  font-size: 14px;
  background: #f0f0f0;
  border-radius: 8px;
}

.noticeItem {
  padding: 4px 8px;
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 2px;
  background-color: white;
}

.noticeCount {
  color: @minor;
  font-size: 14px;
  padding: 20px 0;
}

.noticeIssue {
  display: flex;
  flex-wrap: nowrap;
  padding: 20px 0;
}

.noticeIssueImg {
  flex: none;
  margin-right: 8px;
  height: 60px;
}
.noticeIssueRight {
  flex: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.noticeIssueMinor {
  font-size: 12px;
  color: @minor;
  margin-top: 8px;
  white-space: nowrap; // 防止图片超长时，出现大量空白
  & > span {
    margin-right: 20px;
  }
}
</style>
