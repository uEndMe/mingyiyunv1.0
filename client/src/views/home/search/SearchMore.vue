<template>
  <div class="more">
    <p class="moreFind h3">搜索发现</p>
    <p class="moreTagBox">
      <van-tag class="moreTag"
               v-for="(i,j) in tags"
               :key="j"
               color="#ececec"
               text-color="#535353">{{i}}</van-tag>
    </p>
    <p class="moreHistory h3">
      <span class="moreHistoryTitle">搜索历史</span>
      <i @click="history = []"
         v-show="history[0]"
         class="moreDelete inner van-icon van-icon-delete" />
    </p>
    <!-- 记录列表 -->
    <ul>
      <li class="moreLog main-line-bottom"
          v-for="(i, j) in history"
          :key="i.id">
        <p>
          <i class="inner van-icon van-icon-underway-o" />
          <span class="moreLogTxt">{{i.data}}</span>
        </p>
        <!-- 删除按钮 -->
        <i @click="del(j)"
           class="moreDel inner van-icon van-icon-cross" />
      </li>
    </ul>
  </div>
</template>

<script>
import { Tag } from "vant";
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: "SearchMore",
  mixins: [],
  components: {
    [Tag.name]: Tag
  },

  // ---- ---- ---- ---- ---- 【响应数据】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 道具
  props: {},

  // ---- ---- ---- ---- ---- 数据
  data () {
    return {
      tags: [
        '这是标签',
        '这是一个标签',
        '这是很长很长的一个标签',
        '标签',
        '这是标签',
        '这是一个很长标签',
      ],
      history: [
        { id: 0, data: '历史记录' },
        { id: 1, data: '短的历史记录' },
        { id: 2, data: '这是一条历史记录' },
        { id: 3, data: '这是一条很长很长历史记录' },
        { id: 4, data: '这是一条历史记录' },
      ]
    };
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
    del (index) {
      console.log(111)
      this.history.splice(index, 1);
    },
  }
};
</script>

<style lang="less" scoped>
.more {
  padding: 20px;
}
.moreFind {
  margin-bottom: 18px;
}
.moreTagBox {
  margin-left: -16px;
  margin-bottom: 40px;
}
.moreTag {
  padding: 3px 6px;
  margin: 0 0 12px 16px;
}
.moreHistory,
.moreLog {
  display: flex;
  justify-content: space-between;
  color: @minor;
  font-size: 14px;
  line-height: 42px;
}
.moreHistoryTitle {
  color: #000;
}
.moreLogTxt {
  padding-left: 8px;
}
.moreDelete,
.moreDel {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 6px;
}
</style>
