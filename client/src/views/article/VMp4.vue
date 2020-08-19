<template>
  <ComLoading v-if="state.loading"
              class="bg">
  </ComLoading>
  <div v-else-if="state.loaded"
       class="bg article">
  </div>
  <!-- 所有评论页面 -->
  <PageChat v-else-if="state.showChat"
            :data="data.chat"
            :close="closeChat" />
</template>

<script>
import test from './test.js' // 模拟数据
import ComLoading from '@/components/common/ComLoading'

import PageChat from './pageChat/pageChat'

export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: 'VMp4',
  mixins: [],
  components: {
    ComLoading,
    PageChat,
  },

  // ---- ---- ---- ---- ---- 【响应数据】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 道具
  props: {},

  // ---- ---- ---- ---- ---- 数据
  data () {
    return {
      state: { loading: true },
      data: {}, // 模拟数据
    }
  },

  // ---- ---- ---- ---- ---- 计算
  computed: {},

  // ---- ---- ---- ---- ---- 监视
  watch: {},

  // ---- ---- ---- ---- ---- 【生命周期】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 创造
  created () {
    // req($route.params.id)
    // 模拟加载
    this.state = { loading: true }
    setTimeout(() => {
      this.data = test, // 模拟数据
        this.state = { loaded: true }
      // this.state = { loaderr: true }
    }, 500)
  },

  // ---- ---- ---- ---- ---- 挂载
  mounted () { },

  // ---- ---- ---- ---- ---- 销毁
  beforeDestroy () { },

  // ---- ---- ---- ---- ---- 方法
  methods: {
    showChat () {
      this.state = { showChat: true }
    },
    closeChat () {
      this.state = { loaded: true }
    }
  }
}
</script>

<style lang="less" scoped>
</style>