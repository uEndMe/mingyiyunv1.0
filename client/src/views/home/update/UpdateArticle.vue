<template>
  <article class="article main-line-bottom">
    <div class="articleMain">
      <img class="articleImg"
           :src="data.poster"
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
          <span class="articleIcon">
            <i class="inner van-icon van-icon-like-o" />
            <span class="articleIconTxt">{{stringify(data.good)}}</span>
          </span>
          <span class="articleIcon">
            <i class="inner van-icon van-icon-eye-o" />
            <span class="articleIconTxt">{{stringify(data.look)}}</span>
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
  name: "UpdateArticle",
  mixins: [],
  components: {
    [Tag.name]: Tag
  },

  // ---- ---- ---- ---- ---- 【响应数据】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 道具
  props: {
    data: Object, // 数据
  },

  // ---- ---- ---- ---- ---- 数据
  data () {
    return {};
  },

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
    stringify (n) {
      if (n < 10000) return n
      return (n - n % 1000) / 10000 + 'w'
    }
  }
};
</script>

<style lang="less" scoped>
.article {
  padding: 18px 0;
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
