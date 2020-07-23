<template>
    <div class="slider-tab">
        <template v-for="(item, i) of data">
            <div :key="i"
                :class="active === i ? 'slider-tab-item is-active' : 'slider-tab-item'"
                @click="handleClick($event, i, item.path)">
                {{item.name}}
            </div>
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
            this.active = i;
            let parent = e.target.parentNode;
            const viewWidth = document.body.clientWidth;
            let indexScroll = parent.scrollLeft; // 滚动条初始位置
            let tabWidth = viewWidth * 0.1667; // tab宽度
            let side = viewWidth * 0.5; // 判定滚动方向的基准位置
            let isMove = e.clientX > side; // 滚动方向 true往左, false往右
            let distance = 0; // 滚动距离

            // 根据屏幕上的点击位置判定需要滚动的距离
            if (e.clientX <= (viewWidth * 0.25)) {
                distance = tabWidth * 1;
            } else if ((viewWidth * 0.25) < e.clientX && e.clientX <= (viewWidth * 0.5)) {
                distance = 0;
            } else if ((viewWidth * 0.5) < e.clientX && e.clientX <= (viewWidth * 0.625)) {
                distance = tabWidth * 1;
            } else if ((viewWidth * 0.625) < e.clientX && e.clientX <= (viewWidth * 0.75)) {
                distance = tabWidth * 2;
            } else {
                distance = tabWidth * 3;
            }
            let timer = null;
            if (isMove) {
                timer = setInterval(() => {
                    parent.scrollLeft += 3; // 数值为滚动速度
                    if ((parent.scrollLeft - indexScroll) >= distance || (parent.scrollLeft === viewWidth)) {
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
    font-size: 14px;
    .slider-tab-item {
        min-width: 16.67%;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        white-space: nowrap;
    }
    .is-active {
        font-size: 20px;
        font-weight: bold;
        // animation: action infinite;
        animation: action 0.2s;
        -webkit-animation: action 0.2s;
    }
}
@keyframes action
{
    from {font-size: 14px;}
    to {
        font-size: 20px;
        font-weight: bold;
    }
}
@-webkit-keyframes action
{
    from {font-size: 14px;}
    to {
        font-size: 20px;
        font-weight: bold;
    }
}
</style>
