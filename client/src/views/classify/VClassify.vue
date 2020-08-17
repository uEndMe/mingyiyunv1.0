<template>
  <div class="bg">
    <ComHeader title="分类频道"
               right="编辑" />
    <div class="classifyMain">
      <p class="h3">我的分类</p>
      <ul class="classifyMy">
        <li is="ClassifyTag"
            v-for="(i,j) in lect"
            :key="i.id"
            @click.native="del(j)">{{i.data}}</li>
      </ul>
      <p class="h3">所有分类</p>
      <ul class="classifyAll">
        <li is="ClassifyTag"
            v-for="i in all"
            :key="i.id"
            @click.native="add(i)">{{i.data}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import ComHeader from '@/components/common/ComHeader'
import ClassifyTag from './ClassifyTag'
export default {
  // ---- ---- ---- ---- ---- 【组件信息】 ---- ---- ---- ---- ----
  name: 'VClassify',
  mixins: [],
  components: { ComHeader, ClassifyTag },

  // ---- ---- ---- ---- ---- 【响应数据】 ---- ---- ---- ---- ----

  // ---- ---- ---- ---- ---- 道具
  props: {},

  // ---- ---- ---- ---- ---- 数据
  data () {
    return {
      all: [
        { id: 1, data: '等等' },
        { id: 2, data: '单独' },
        { id: 3, data: '公共' },
        { id: 4, data: '哈哈' },
        { id: 5, data: '哦哦' },
        { id: 6, data: '直播' },
        { id: 7, data: '方法' },
        { id: 8, data: '心智' },
        { id: 9, data: '方法' },
        { id: 10, data: '娱乐' },
        { id: 11, data: '方法' },
        { id: 12, data: '方法' },
        { id: 13, data: '方法' },
        { id: 14, data: '方法' },
        { id: 15, data: '方法' },
      ],
      lect: [
        { id: 1, data: '等等' },
        { id: 2, data: '单独' },
        { id: 3, data: '公共' },
        { id: 4, data: '哈哈' },
        { id: 5, data: '哦哦' },
      ]
    };
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
    del (i) {
      this.lect.splice(i, 1)
    },
    add (i) {
      if (this.lect.some(j => j.id === i.id)) return
      this.lect.push(i)
    }
  },
}
</script>

<style lang="less" scoped>
.classifyMain {
  padding: 20px;
}
.classifyMy,
.classifyAll {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;

  & > * {
    width: 70px;
    line-height: 24px;
    margin-top: 20px;
    &:not(:nth-child(4n-3)) {
      margin-left: 16px;
    }
  }
}
</style>