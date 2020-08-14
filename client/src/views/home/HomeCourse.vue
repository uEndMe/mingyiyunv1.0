<template>
  <div class="course">
    <h2 class="h2">课程推荐</h2>
    <div class="courseContent">
      <!-- 每行个数 -->
      <CourseCover class="CourseCover"
                   v-for="(i,j) in showLive"
                   :key="j"
                   :src="i.src"
                   :title="i.title" />
    </div>
    <div class="courseContent">
      <CourseCover class="CourseCover"
                   v-for="(i,j) in showRec"
                   :key="j"
                   :src="i.src"
                   :title="i.title" />
    </div>
    <div class="CourseShift">
      <p @click="showTag += 3">换一批</p>
    </div>
  </div>
</template>

<script>
import CourseCover from "./course/CourseCover";
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: "HomeCruse",
  mixins: [],
  components: { CourseCover },

  // ---- ---- ---- ---- ---- 【响应数据】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 道具
  props: {},

  // ---- ---- ---- ---- ---- 数据
  data () {
    return {
      showTag: 0,
      course: [
        {
          title: '一正在直播的课程',
          src: 'https://img.yzcdn.cn/vant/cat.jpeg'
        }, {
          title: '正在的非官方的',
          src: 'https://img.yzcdn.cn/vant/cat.jpeg'
        }, {
          title: '正神鼎飞大富大贵多多多多多丹砂课程',
          src: 'https://img.yzcdn.cn/vant/cat.jpeg'
        }, {
          title: '二正胜多负少的广泛地程',
          src: 'https://img.yzcdn.cn/vant/cat.jpeg'
        }, {
          title: '正东风股的非官方的程',
          src: 'https://img.yzcdn.cn/vant/cat.jpeg'
        }, {
          title: '正豆腐干豆腐',
          src: 'https://img.yzcdn.cn/vant/cat.jpeg'
        }, {
          title: '三正豆腐干豆腐过分的话东方红的课程',
          src: 'https://img.yzcdn.cn/vant/cat.jpeg'
        }, {
          title: '正在和法国恢复规划法规课程',
          src: 'https://img.yzcdn.cn/vant/cat.jpeg'
        },
      ]
    };
  },

  // ---- ---- ---- ---- ---- 计算
  computed: {
    // 展示的：直播课程
    showLive () {
      const { showTag, course } = this;
      const start = showTag % course.length
      return course.slice(start, start + 3)
    },
    // 展示的：录播课程
    showRec () {
      const { showTag, course } = this;
      const start = showTag % course.length
      return course.slice(start, start + 3)
    },
  },

  // ---- ---- ---- ---- ---- 监视
  watch: {},

  // ---- ---- ---- ---- ---- 【生命周期】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 创造
  created () { },

  // ---- ---- ---- ---- ---- 挂载
  mounted () { },

  // ---- ---- ---- ---- ---- 销毁
  beforeDestroy () { }
};
</script>

<style lang="less" scoped>
.course {
  margin: 0 20px;
  padding: 20px;
  border-radius: 8px;
  background-color: @bg;
}
.courseContent {
  display: flex;
  margin-bottom: 12px;
  &:first-of-type {
    margin-top: 12px;
  }
}
.CourseCover {
  flex: 1;
  &:not(:last-child) {
    margin-right: 8px;
  }
}
.CourseShift {
  text-align: right;
  & p {
    display: inline-block;
    color: #999;
    font-size: 10px;
    text-decoration-line: underline;
  }
}
</style>
