<template>
    <div class="my-title">
        <div class="title-content"><span>{{title}}</span></div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="less" scoped>
.my-title {
    padding: 10px 20px;
}
.title-content {
    font-size: 18px;
    display: flex;
    align-items: center;
    position: relative;
    height: 18px;
    &::before {
        content: '';
        display: block;
        height: 18px;
        width: 5px;
        border-radius: 20px;
        background-color: @main_blue;
        position: absolute;
        top: 0;
        left: 0;
    }
    span {
        margin-left: 15px;
    }
}
</style>
