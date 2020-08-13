<template>
  <article class="article">
    <div class="articleMain">
      <img class="articleImg" src="https://img.yzcdn.cn/vant/sand.jpg" alt="" />
      <div class="articleContent">
        <p class="articleTitle">内容名称</p>
        <div class="articleTxt">
          <p>这是一段描述</p>
          <div class="articleTag">
            <van-tag v-for="i in 2" :key="i" color="#eee" text-color="#888">这是标签</van-tag>
          </div>
        </div>
        <div>
          <span class="articleIcon">
            <i class="inner van-icon van-icon-like-o" />
            <span class="articleIconTxt">6666</span>
          </span>
          <span class="articleIcon">
            <i class="inner van-icon van-icon-eye-o" />
            <span class="articleIconTxt">1.1w</span>
          </span>
        </div>
      </div>
    </div>
    <van-divider />
  </article>
</template>

<script>
import { Divider, Tag } from "vant";
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: "UpdateArticle",
  mixins: [],
  components: {
    [Divider.name]: Divider,
    [Tag.name]: Tag
  },

  // ---- ---- ---- ---- ---- 【响应数据】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 道具
  props: {},

  // ---- ---- ---- ---- ---- 数据
  data() {
    return {};
  },

  // ---- ---- ---- ---- ---- 计算
  computed: {},

  // ---- ---- ---- ---- ---- 监视
  watch: {},

  // ---- ---- ---- ---- ---- 【生命周期】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 创造
  created() {},

  // ---- ---- ---- ---- ---- 挂载
  mounted() {},

  // ---- ---- ---- ---- ---- 销毁
  beforeDestroy() {}
};
</script>

<style lang="less" scoped>
// .shell

.articleMain {
  display: flex;
}
.articleImg {
  width: 76px;
  height: 76px;
  border-radius: 2px;
}
.articleContent {
  flex: 1;
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.articleTitle {
  font-size: 14px;
}
.articleTxt,
.articleIcon {
  font-size: 12px;
  color: #777;
}
.articleTxt {
  display: flex;
  justify-content: space-between;
}
.articleTag {
  display: flex;
  > span {
    font-size: 10px;
    transform: scale(0.9);
  }
}
.articleIcon {
  margin-right: 20px;
}
.articleIconTxt {
  margin-left: 4px;
}
</style>
