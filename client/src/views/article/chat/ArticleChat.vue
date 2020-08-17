<template>
  <article class="chat">
    <img :src="data.icon"
         alt=""
         class="chatImg">
    <div class="chatContent main-line-bottom">
      <div class="chatUser">
        <p class="chatName">{{data.name}}</p>
        <p class="chatTxt">{{data.txt}}</p>
      </div>
      <p>
        <i class="chatGood inner van-icon van-icon-good-job-o" />
        <span>{{data.good}}</span>
      </p>
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
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.chatContent {
  flex: 1;
  margin-left: 12px;
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
}
.chatTxt {
  margin-bottom: 12px;
}
.chatGood {
  margin-right: 4px;
}
</style>