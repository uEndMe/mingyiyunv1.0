<template>
  <article class="chat">
    <img :src="data.icon"
         alt=""
         class="chatImg">
    <div class="chatMain main-line-bottom">
      <div class="chatContent">
        <div class="chatUser">
          <p class="chatName">{{data.name}}</p>
          <p class="chatTxt">{{data.txt}}</p>
        </div>
        <p>
          <i class="chatGood inner van-icon van-icon-good-job-o" />
          <span>{{data.good}}</span>
        </p>
      </div>
      <!-- 回复 -->
      <slot name="reply"></slot>
    </div>
  </article>
</template>

<script>
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: '',
  mixins: [],
  components: {},

  // ---- ---- ---- ---- ---- 【响应数据】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 道具
  props: {
    data: Object // id,name,icon,txt,good
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
.chat {
  display: flex;
  margin-bottom: 20px;
}
.chatImg {
  flex: none;
  margin-right: 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.chatMain {
  flex: auto;
}
.chatContent {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chatUser {
  flex: 1;
  line-height: 1.5;
  font-size: 14px;
}
.chatName {
  margin-bottom: 12px;
  color: @minor;
}
.chatTxt {
  margin-bottom: 12px;
  font-size: 16px;
}
.chatGood {
  margin-right: 4px;
}
</style>