<template>
  <ComLoading v-if="state.loading"
              class="bg">
  </ComLoading>
  <ComLoaderr v-else-if="state.loaderr"
              class="bg"
              @click.native="load">
  </ComLoaderr>
  <div v-else-if="state.loaded"
       class="bg article">
    <article class="articleMain">
      <!-- 标题 -->
      <h1 class="articleH1">{{data.title}}</h1>
      <!-- 用户信息 -->
      <div class="articleUserBox">
        <!-- 左 -->
        <div class="articleUserInfo">
          <!-- 头像 -->
          <img :src="data.icon"
               class="articleIcon"
               alt="头像">
          <!-- 用户名 -->
          <div class="articleUser">
            <p class="articleName">
              <span>{{data.name}}</span>
              <van-tag class="articleTag"
                       v-for="(i,j) in data.tag"
                       :key="j"
                       color="#ececec"
                       text-color="#535353">{{i}}</van-tag>
            </p>
            <p class="articleTime">{{data.time}}</p>
          </div>
        </div>
        <!-- 右 -->
        <van-button type="default"
                    class="articleFocus"
                    :class="{articleIsFocus:data.focus}"
                    @click="focusUser">{{data.focus ? '已关注' : '关注'}} </van-button>
      </div>
      <!-- 描述 -->
      <p class="articleDesc">
        {{data.desc}}
      </p>
      <!-- 大图 -->
      <img :src="data.img"
           alt=""
           class="articleImg">
      <p class="articleTxt">
        {{data.txt}}
      </p>
      <!-- 正文 -->
      <van-button :icon="data.good?'like':'like-o'"
                  @click="data.good = !data.good"
                  plain
                  class="articleGood"
                  :class="{articleIsGood:data.good}"
                  type="default">赞</van-button>
      <!-- 评论 -->
      <h2 class="h2 articleH2 main-line-top">评论&nbsp;（{{data.chat.length}}）</h2>
      <ArticleChat v-for="i in data.chat"
                   :key="i.id"
                   :data="i">
      </ArticleChat>
    </article>
    <!-- 底部输入框 -->
    <ArticleFooter class="articleFooter"
                   :chatCount="data.chat.length" />
  </div>

</template>

<script>
import { Button, Tag } from 'vant';

import ComLoading from '@/components/common/ComLoading'
import ComLoaderr from '@/components/common/ComLoaderr'

import ArticleChat from './chat/ArticleChat';
import ArticleFooter from './footer/ArticleFooter'
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: '',
  mixins: [],
  components: {
    [Button.name]: Button,
    [Tag.name]: Tag,
    ComLoading,
    ComLoaderr,
    ArticleChat,
    ArticleFooter,
  },

  // ---- ---- ---- ---- ---- 【响应数据】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 道具
  props: {},

  // ---- ---- ---- ---- ---- 数据
  data () {
    return {
      state: { loading: true },
      data: {
        name: '张文光',
        icon: 'https://img.yzcdn.cn/vant/cat.jpeg',
        tag: ['主任医师', '特邀嘉宾'],
        time: '2020年12月12日',
        focus: false,
        good: false,
        title: '从双十一医药健康的消费情况，看大健康产业的发展趋势',
        desc: '大健康是根据时代发展、社会需求与疾病谱的改变，提出的一种全局的理念。是在对生命全过程全面呵护的理念指导下提出来的。',
        img: 'https://img.yzcdn.cn/vant/sand.jpg',
        txt: '大健康是根据时代发展、社会需求与疾病谱的改变，提出的一种全局的理念。它围绕着人的衣食住行以及人的生老病死，关注各类影响健康的危险因素和误区，提倡自我健康管理，是在对生命全过程全面呵护的理念指导下提出来的。\n它追求的不仅是个体身体健康，还包含精神、心理、生理、社会、环境、道德等方面的完全健康。提倡的不仅有科学的健康生活，更有正确的健康消费等。\r它的范畴涉及各类与健康相关的信息、产品和服务，也涉及到各类组织为了满足社会的健康需求所采取的行动。',
        chat: [
          {
            id: 1,
            name: '张小贤',
            icon: 'https://img.yzcdn.cn/vant/cat.jpeg',
            txt: '这是一条很长很长的评论',
            good: 5
          }, {
            id: 2,
            name: '李富贵',
            icon: 'https://img.yzcdn.cn/vant/cat.jpeg',
            txt: '这是一条的评论',
            good: 3
          }, {
            id: 3,
            name: '周大哥',
            icon: 'https://img.yzcdn.cn/vant/cat.jpeg',
            txt: '评论评论',
            good: 2
          }, {
            id: 4,
            name: '张三',
            icon: 'https://img.yzcdn.cn/vant/cat.jpeg',
            txt: '略略略略',
            good: 2
          }, {
            id: 5,
            name: '李四',
            icon: 'https://img.yzcdn.cn/vant/cat.jpeg',
            txt: '大健康是根据时代发展、社会需求与疾病谱的改变，提出的一种全局的理念。',
            good: 2
          }, {
            id: 6,
            name: '周大哥',
            icon: 'https://img.yzcdn.cn/vant/cat.jpeg',
            txt: '评论评论',
            good: 2
          },
        ]
      }
    }
  },

  // ---- ---- ---- ---- ---- 计算
  computed: {
  },

  // ---- ---- ---- ---- ---- 监视
  watch: {},

  // ---- ---- ---- ---- ---- 【生命周期】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 创造
  created () {
    this.load();
  },

  // ---- ---- ---- ---- ---- 挂载
  mounted () { },

  // ---- ---- ---- ---- ---- 销毁
  beforeDestroy () { },

  // ---- ---- ---- ---- ---- 方法
  methods: {
    focusUser () {
      this.data.focus = !this.data.focus
      // req(...)
    },
    load () {
      // req($route.params.id)
      // 模拟加载
      this.state = { loading: true }
      setTimeout(() => {
        this.state = { loaded: true }
        // this.state = { loaderr: true }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.article {
  display: flex;
  flex-direction: column;
}
.articleMain {
  // box-sizing: border-box;
  padding: 20px;
  // height: 1px;
  // flex: 1;
  overflow-y: scroll;
}
.articleH1 {
  line-height: 1.5;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 26px;
  text-align: justify;
}

// 用户信息
.articleUserBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
.articleIcon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.articleUserInfo {
  display: flex;
  align-items: center;
}

.articleUser {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 46px;
  padding-left: 10px;
}
.articleName {
  font-size: 14px;
  display: flex;
  align-items: center;
}
.articleTag {
  margin-left: 4px;
}

.articleTime {
  font-size: 12px;
  color: @minor;
}
.articleFocus {
  width: 88px;
  height: 30px;
  border-radius: 4px;
  font-size: 12px;
}
.articleIsFocus {
  color: @minor;
}

// 副标题
.articleDesc {
  margin-bottom: 20px;
  padding: 20px;
  font-size: 14px;
  line-height: 1.5;
  background-color: #f0f0f0;
  border-radius: 8px;
  // text-indent: 2em;
}

// 正文
.articleImg {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 20px;
}
.articleTxt {
  margin-bottom: 20px;
  text-indent: 2em;
  line-height: 1.5;
  text-align: justify;
}
// 赞
.articleGood {
  display: block;
  width: 200px;
  height: 40px;
  margin: auto;
  background-color: #fafafa;
  color: @minor;
  margin-bottom: 40px;
}
.articleIsGood {
  color: #ff4d4f;
  background-color: #fff;

  border-color: #fff;
}

.articleH2 {
  padding: 20px 0;
}
</style>