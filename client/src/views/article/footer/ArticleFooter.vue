<template>
  <div class="footer main-line-top">
    <van-icon name="arrow-left"
              class="footerItem"
              @click="$router.go(-1)" />
    <input type="text"
           placeholder="说点什么..."
           @focus="popupInput"
           class="footerInput footerItem">
    <!-- 聊天 -->
    <van-icon name="chat-o"
              :badge="chatCount"
              @click="showChat"
              class="footerItem" />
    <!-- 点赞 -->
    <van-icon name="like-o"
              class="footerItem" />
    <!-- 分享 -->
    <van-icon name="cluster-o"
              class="footerItem" />

    <!-- 弹出输入框 -->
    <ComInput :event="popupInput" />
  </div>
</template>

<script>
import { Icon, Popup, Button } from 'vant';
import ComInput from '@/components/common/ComInput'
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: 'ArticleFooter',
  mixins: [],
  components: {
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Button.name]: Button,
    ComInput,
  },

  // ---- ---- ---- ---- ---- 【响应数据】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 道具
  props: {
    chatCount: Number,
    showChat: Function, // 打开页面：所有评论
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
  methods: {
    popupInput () {
      // 执行，子组件监听的事件
      this.popupInput?.list.forEach(i => i())
    }
  }
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
  height: 48px;
  color: @minor;
  background-color: @bg;
}

.footerItem:not(:first-child) {
  margin-left: 20px;
}
.footerItem .van-info {
  transform: scale(0.75) translate(8px, -6px);
}
.footerItem:not(.footerInput) {
  flex: none;
}
.footerInput {
  flex: auto;
  min-width: 0; // 由 flex 决定宽度
  padding: 6px;
  border: 0;
  border-radius: 4px;
  font-size: 14px;
  background-color: #e0e0e0;
}
</style>