<template>
    <div class="slider-tab">
        <template v-for="(item, i) of data">
            <div :key="i" class="slider-tab-item" @click="handleClick($event, i, item.path)">{{item.name}}</div>
        </template>
    </div>
</template>
<script>
export default {
    data () {
        return {
            active: 0,
        };
    },
    props: {
        data: {
            type: Array,
            required: true,
        },
    },
    methods: {
        handleClick (e, i, path) {
            if (i === this.active) {return;}
            const V = Math.abs(i - this.active) >= 2;
            this.active = i;
            let parent = e.target.parentNode;
            let indexScroll = parent.scrollLeft; // 滚动条初始位置
            let side = document.body.clientWidth * 0.4;
            let tabWidth = document.body.clientWidth * 0.1667;
            let isMove = e.clientX > side; // 滚动方向 true往左, false往右
            let distance = 0; // 滚动距离
            if (V) {
                distance = tabWidth * 2;
            } else {
                distance = tabWidth * 1;
            }
            let timer = null;
            if (isMove) {
                timer = setInterval(() => {
                    parent.scrollLeft += 3;
                    if ((parent.scrollLeft - indexScroll) >= distance || (parent.scrollLeft === document.body.clientWidth)) {
                        clearInterval(timer);
                    }
                }, 0);
            } else {
                timer = setInterval(() => {
                    parent.scrollLeft -= 3;
                    if ((indexScroll - parent.scrollLeft) >= distance || (parent.scrollLeft === 0)) {
                        clearInterval(timer);
                    }
                }, 0);
            }
        },
    },
};
</script>
<style lang="less" scoped>
.slider-tab {
    width: 100%;
    display: flex;
    overflow: scroll;
    position: relative;
    .slider-tab-item {
        min-width: 16.67%;
        height: 50px;
        display: flex;
        align-items: flex-end;
        white-space: nowrap;
    }
}
</style>