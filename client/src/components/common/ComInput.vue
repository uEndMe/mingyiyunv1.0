<template>
  <!-- 弹出式输入框 -->
  <van-popup v-model="show"
             position="bottom">
    <form action="javascript: void(0)"
          method="get"
          class="footerForm">
      <textarea class="footerTextarea"
                ref="textarea"
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
</template>

<script>
import { Popup, Button } from 'vant';
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: 'ComInput',
  mixins: [],
  components: {
    [Popup.name]: Popup,
    [Button.name]: Button,
  },

  // ---- ---- ---- ---- ---- 【响应数据】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 道具
  props: {
    event: Function, // 事件
  },

  // ---- ---- ---- ---- ---- 数据
  data () {
    return {
      show: false,  // 弹出输入框
      value: '',
    }
  },

  // ---- ---- ---- ---- ---- 计算
  computed: {},

  // ---- ---- ---- ---- ---- 监视
  watch: {
    async show (val) {
      if (!val) return
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
  },

  // ---- ---- ---- ---- ---- 【生命周期】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 创造
  created () {
    // 监听父组件事件（触发时，弹出此面板）
    this.event.list = this.event.list || []
    this.event.list.push(() => {
      this.show = true
    })
  },

  // ---- ---- ---- ---- ---- 挂载
  mounted () { },

  // ---- ---- ---- ---- ---- 销毁
  beforeDestroy () { },

  // ---- ---- ---- ---- ---- 方法
  methods: {}
}
</script>

<style lang="less" scoped>
// 弹出输入框
.footerForm {
  font-size: 16px;
}
.footerTextarea {
  box-sizing: border-box;
  width: 100%;
  padding: 20px 20px 0 20px;
  border: 0;
  resize: none;
}
.footerSubmitBox {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px 20px 20px;
}
.footerSubmit {
  width: 80px;
  height: 32px;
}
</style>