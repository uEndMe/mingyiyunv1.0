<template>
  <div class="bg pageChat">
    <!-- 头部 -->
    <ComHeader :title="`评论（${data.length}）`"
               :onLeft="close"
               class="pageChatHeader" />
    <!-- 滚动窗口 -->
    <section class="pageChatMain">
      <ArticleChat v-for="i in data"
                   :key="i.id"
                   :data="i">
        <template #reply>
          <ul v-if="i.chat"
              class="pageChatReply">
            <li v-for="j in i.chat"
                :key="j.id"
                class="pageChatReplyItem main-line-bottom">
              <p class="pageChatReplyName">{{j.name}}</p>
              <p class="pageChatReplyTxt">{{j.txt}}</p>
            </li>
          </ul>
        </template>
      </ArticleChat>
    </section>
    <!-- 底部 -->
    <footer class="pageChatFooter main-line-top"
            @click="popupInput">
      <i class="pageChatFooterIcon inner van-icon van-icon-records" /><span class="pageChatFooterTxt">写评论</span>
    </footer>
    <!-- 弹出输入框 -->
    <ComInput :event="popupInput" />
  </div>
</template>

<script>
import ComHeader from '@/components/common/ComHeader';
import ComInput from '@/components/common/ComInput';

import ArticleChat from '../chat/ArticleChat'


export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: 'PageChat',
  mixins: [],
  components: {
    ComInput,
    ComHeader,
    ArticleChat,
  },

  // ---- ---- ---- ---- ---- 【响应数据】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 道具
  props: {
    data: Array,  // 评论
    close: Function,   // 关闭
  },

  // ---- ---- ---- ---- ---- 数据
  data () {
    return {
      popupEvent: [], // 弹出事件
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
.pageChat {
  display: flex;
  flex-direction: column;
}
.pageChatHeader,
.pageChatFooter {
  flex: none;
}
.pageChatMain {
  flex: auto;
  overflow: scroll;
  padding: 20px;
}

// 回复
.pageChatReply {
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: @bg;
  line-height: 1.5;
}

.pageChatReplyItem {
  padding: 12px;
}
.pageChatReplyItem:last-child:after {
  display: none;
}
.pageChatReplyName {
  padding-bottom: 4px;
  color: @minor;
}
.pageChatReplyTxt {
  font-size: 16px;
}

// 底部
.pageChatFooter {
  background-color: @bg;
  color: @minor;
  line-height: 48px;
  vertical-align: middle;
  text-align: center;
}
.pageChatFooterIcon {
  font-size: 20px;
  padding-right: 2px;
  transform: translateY(10%);
}
.pageChatFooterTxt {
  font-size: 14px;
}
</style>