<template>
    <div class="no-data">
        <img :src="require('../assets/images/no_data.png')" width="15%" />
        <div class="no-data-text">{{$lang.noData}}</div>
    </div>
</template>

<style lang="less" scoped>
.no-data {
    box-sizing: border-box;
    height: 100%;
    text-align: center;
    padding-top: 40%;
}
.no-data-text {
    font-size: 16px;
    color: #999999;
    margin-top: 10px;
}
</style>
