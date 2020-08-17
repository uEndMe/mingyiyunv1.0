<template>
  <div class="footer main-line-top">
    <van-icon name="arrow-left"
              class="footerItem"
              @click="$router.go(-1)" />
    <input type="text"
           v-model="value"
           placeholder="说点什么..."
           class="footerInput footerItem">
    <van-icon name="chat-o"
              :badge="chatCount"
              class="footerItem" />
    <!-- <i class="footerChat  van-icon van-icon-chat-o" /> -->
    <van-icon name="like-o"
              class="footerItem" />
    <!-- <i class="footerGood  van-icon van-icon-good-job-o" /> -->
    <van-icon name="cluster-o"
              class="footerItem" />
    <!-- <i class="footerShare  van-icon van-icon-cluster-o" /> -->
  </div>
</template>

<script>
import { Icon } from 'vant';
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: 'ArticleFooter',
  mixins: [],
  components: {
    [Icon.name]: Icon,
  },

  // ---- ---- ---- ---- ---- 【响应数据】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 道具
  props: {
    chatCount: Number
  },

  // ---- ---- ---- ---- ---- 数据
  data () {
    return {
      value: '',
    }
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
  methods: {}
}
</script>

<style lang="less" scoped>
.footer {
  // line-height: 40px;
  // vertical-align: middle;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  font-size: 20px;
  height: 128px;
  color: @minor;
  background-color: @bg;
}

.footerItem:not(:first-child) {
  margin-left: 20px;
}
.footerItem .van-info {
  transform: scale(0.75) translate(8px, -6px);
}
.footerInput {
  // margin: 4px;
  width: 0; // 由 flex 决定
  min-width: 100px;
  flex: 1;
  padding: 6px;
  border: 0;
  border-radius: 4px;
  font-size: 14px;
  background-color: #e0e0e0;
}
</style>