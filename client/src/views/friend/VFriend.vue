<template>
  <ComLoading v-if="state.loading" class="bg"> </ComLoading>
  <div v-else-if="state.loaded" class="bg friend">
    <!-- 头部 -->
    <ComHeader title="好友主页" class="friendHeader" />
    <!-- 滚动窗口 -->
    <section class="friendMain">
      <!-- 海报 -->
      <div class="friendPoster" :style="{ 'background-image': `url(${data.poster})` }"></div>
      <!-- 头像 -->
      <img :src="data.avatar" :alt="data.name" class="friendAvatar" />
      <!-- 用户信息 -->
      <FriendUser :data="data" />
      <!-- 作品 -->
      <van-tabs v-model="activeTab" color="#1989fa" class="friendTabs">
        <van-tab title="TA的文章" class="friendTab">
          <FriendArticle v-for="i in data.article" :key="i.id" :data="i" :name="data.name" />
        </van-tab>
        <van-tab title="TA的音视频">音视频</van-tab>
        <van-tab title="TA的直播">直播</van-tab>
      </van-tabs>
    </section>
    <!-- 底部 -->
    <footer class="friendFooter main-line-top">
      <van-button plain type="default" class="friendMsg">发消息</van-button>
      <van-button plain type="info" class="friendMsg">加好友</van-button>
    </footer>
  </div>
</template>

<script>
import { Button, Tab, Tabs } from "vant";
import ComHeader from "@/components/common/ComHeader";
import ComLoading from "@/components/common/ComLoading";

import FriendArticle from "./article/FriendArticle";
import FriendUser from "./user/FriendUser";
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: "",
  mixins: [],
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    ComLoading,
    ComHeader,
    FriendUser,
    FriendArticle
  },

  // ---- ---- ---- ---- ---- 【响应数据】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 道具
  props: {},

  // ---- ---- ---- ---- ---- 数据
  data() {
    return {
      state: { init: true },
      activeTab: 0,
      data: {
        poster: "https://img.yzcdn.cn/vant/sand.jpg",
        avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
        name: "郭晓鹏",
        tag: ["主治医师", "特邀嘉宾"],
        work: "深圳市名医云软件投资有限公司 CEO",
        focus: false,
        focusCount: 22,
        fans: 9988,
        article: [
          {
            id: 1,
            title: "关于三生三世的研究",
            name: "郭晓鹏",
            img: "https://img.yzcdn.cn/vant/sand.jpg",
            time: "2020/7/30",
            good: 72,
            look: 2000,
            tags: ["中医外科", "西医内科"]
          },
          {
            id: 2,
            title: "关于发广告的研究",
            name: "郭晓鹏",
            img: "https://img.yzcdn.cn/vant/sand.jpg",
            time: "2020/7/30",
            good: 36,
            look: 2080,
            tags: ["中医外科", "西医内科"]
          },
          {
            id: 3,
            title: "关于研究",
            name: "郭晓鹏",
            img: "https://img.yzcdn.cn/vant/sand.jpg",
            time: "2020/7/30",
            good: 36,
            look: 2080,
            tags: ["中医外科", "西医内科"]
          },
          {
            id: 4,
            title: "关于发广告法人的等等研究",
            name: "郭晓鹏",
            img: "https://img.yzcdn.cn/vant/sand.jpg",
            time: "2020/7/30",
            good: 36,
            look: 2080,
            tags: ["中医外科", "西医内科"]
          },
          {
            id: 5,
            title: "关于发的研究",
            name: "郭晓鹏",
            img: "https://img.yzcdn.cn/vant/sand.jpg",
            time: "2020/7/30",
            good: 36,
            look: 2080,
            tags: ["中医外科", "西医内科"]
          },
          {
            id: 6,
            title: "关于发广告法人的研究",
            name: "郭晓鹏",
            img: "https://img.yzcdn.cn/vant/sand.jpg",
            time: "2020/7/30",
            good: 36,
            look: 2080,
            tags: ["中医外科", "西医内科"]
          }
        ],
        media: ["XX", "XX"],
        live: ["XX", "XX"]
      }
    };
  },

  // ---- ---- ---- ---- ---- 计算
  computed: {},

  // ---- ---- ---- ---- ---- 监视
  watch: {},

  // ---- ---- ---- ---- ---- 【生命周期】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 创造
  created() {
    // req($route.params.id)
    // 模拟加载
    this.state = { loading: true };
    setTimeout(() => {
      console.log("加载用户id:");
      console.log(this.$route.params.id);
      this.state = { loaded: true };
      // this.state = { loaderr: true }
    }, 500);
  },

  // ---- ---- ---- ---- ---- 挂载
  mounted() {},

  // ---- ---- ---- ---- ---- 销毁
  beforeDestroy() {},

  // ---- ---- ---- ---- ---- 方法
  methods: {}
};
</script>

<style lang="less" scoped>
.friend {
  display: flex;
  flex-direction: column;
  background-color: @bg;
}

.friendHeader {
  flex: none;
}
// 滚动视口
.friendMain {
  flex: auto;
  overflow: scroll;
}

.friendPoster {
  height: 100px;
  background: center no-repeat;
  background-size: cover;
}
.friendAvatar {
  display: block;
  width: 60px;
  height: 60px;
  margin: -30px 20px -30px auto;
  border-radius: 50%;
}
// 作品
.friendTabs {
  margin-top: 10px;
  background-color: white;
}
.friendTab {
  padding-bottom: 40px;
}

// 底部
.friendFooter {
  padding: 0 20px;
  height: 48px;
  flex: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.friendMsg {
  height: 32px;
  width: 100px;
}
</style>
