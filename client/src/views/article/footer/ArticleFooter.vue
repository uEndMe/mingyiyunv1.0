<template>
  <div class="footer main-line-top">
    <van-icon name="arrow-left"
              class="footerItem"
              @click="$router.go(-1)" />
    <input type="text"
           placeholder="说点什么..."
           @focus="show = true"
           class="footerInput footerItem">
    <van-icon name="chat-o"
              :badge="chatCount"
              class="footerItem" />
    <van-icon name="like-o"
              class="footerItem" />
    <van-icon name="cluster-o"
              class="footerItem" />
    <button @click="show=true">弹出</button>

    <!-- 弹出输入框 -->
    <van-popup v-model="show"
               position="bottom">
      <form action="javascript: void(0)"
            method="get"
            class="footerForm">
        <textarea class="footerTextarea"
                  :autofocus="show"
                  v-model="value"
                  placeholder="说点什么..."
                  name="msg"></textarea>
        <div class="footerSubmitBox">
          <span class="footerCount">{{value.length}}/300</span>
          <van-button native-type="submit"
                      type="default"
                      color="#b7b7b7"
                      class="footerSubmit">发送</van-button>
        </div>
      </form>
    </van-popup>
  </div>
</template>

<script>
import { Icon, Popup, Button } from 'vant';
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: 'ArticleFooter',
  mixins: [],
  components: {
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Button.name]: Button,
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
      show: false,  // 弹出输入框
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

// 弹出输入框
.footerForm {
  font-size: 16px;
}
.footerTextarea {
  box-sizing: border-box;
  width: 100%;
  height: 128px;
  padding: 20px;
  border: 0;
  resize: none;
}
.footerSubmitBox {
  // height: 10px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}
.footerSubmit {
  width: 80px;
  height: 32px;
}
</style>