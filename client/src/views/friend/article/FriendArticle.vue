<template>
  <article class="article main-line-bottom">
    <div class="articleMain">
      <img class="articleImg"
           :src="data.img"
           alt="" />
      <div class="articleContent">
        <p class="articleTitle">{{data.title}}</p>
        <div class="articleTxt">
          <p>{{data.name}}</p>
          <div class="articleTag">
            <van-tag v-for="(i,j) in data.tags"
                     :key="j"
                     color="#eee"
                     text-color="#888">{{i}}</van-tag>
          </div>
        </div>
        <div>
          <span class="articleIcons">
            <i class="articleIcon inner van-icon van-icon-like-o" />
            <span class="articleIconTxt">{{data.good}}</span>
          </span>
          <span class="articleIcons">
            <i class="articleIcon inner van-icon van-icon-eye-o" />
            <span class="articleIconTxt">{{data.look}}</span>
          </span>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { Tag } from "vant";
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: 'FriendArticle',
  mixins: [],
  components: {
    [Tag.name]: Tag
  },

  // ---- ---- ---- ---- ---- 【响应数据】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 道具
  props: {
    // 文章简要数据
    data: Object,  // id,title,img,name,time,good,look,tag
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
  methods: {}
}
</script>

<style lang="less" scoped>
.article {
  padding: 20px 0;
  margin: 0 20px;
}
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
.articleIcons {
  font-size: 12px;
  color: #777;
}
.articleTxt {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}
.articleTag {
  display: flex;
  > span {
    font-size: 10px;
    transform: scale(0.9);
  }
}
.articleIcons {
  margin-right: 20px;
}
.articleIcon {
  font-size: 14px;
}
.articleIconTxt {
  margin-left: 4px;
  font-size: 12px;
}
</style>