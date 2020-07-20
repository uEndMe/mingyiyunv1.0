<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-goods"></i> 商品列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-delete" class="mr10" @click="handleDownClick">批量下架</el-button>
                <el-select v-model="list_params.mch_id" placeholder="选择商家"
                    class="merchant-select"
                    @change="handleSelectMerchant">
                    <el-option v-for="(item, i) of merchant" :key="i"
                        :label="item.nickname"
                        :value="item.mch_id">
                    </el-option>
                </el-select>
                <el-input v-model="list_params.search" 
                placeholder="筛选关键词" 
                class="handle-input mr10"
                @blur="handleSearchClick"
                @keyup.enter.native="handleSearchClick">
                    <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearchClick"></i>
                </el-input>
            </div>
            <el-table 
            border
            ref="goods_list"
            :data="goods_list"
            tooltip-effect="light"
            @selection-change="handleChangeSelect">
                <el-table-column type="selection" :selectable="checkSelectable" width="35"></el-table-column>
                <el-table-column prop="preview" label="预览图" align="center" width="120">
                    <template slot-scope="scope">
                        <el-image style="width: 100px;"
                        :src="scope.row.preview">
                            <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="mch_name" label="商家名称" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="title" label="商品名称" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column label="商品链接" show-overflow-tooltip align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleToRemote(scope.row.remote_link)">[商品亚马逊链接]</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="商品价格(美元)" align="center"></el-table-column>
                <el-table-column prop="stock" label="剩余库存" align="center" width="50"></el-table-column>
                <el-table-column prop="status_text" label="商品状态" align="center" width="75"></el-table-column>
                <el-table-column prop="add_time" label="数据创建时间" align="center"></el-table-column>
                <el-table-column prop="newest" label="是否最新" align="center" width="75">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.newest"
                        @change="handleChange(scope.row, 'newest')">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="recommend" label="是否推荐" align="center" width="75">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.recommend"
                        @change="handleChange(scope.row, 'recommend')">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" class="green" @click="handlePreviewClick(scope.row.goods_id)">
                            预览
                        </el-button>
                        <el-button v-if="scope.row.status===1" type="text" @click="handleDownClick(scope.row)">
                            下架
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 商品下架 -->
            <el-dialog title="商品下架" :visible.sync="visible.status" width="30%">
                <div>确定下架商品?</div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="handleChangeStatusCancel">取 消</el-button>
                    <el-button type="primary" @click="handleChangeStatus">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 预览 -->
            <el-dialog center top="0" :show-close="false" :visible.sync="preview" width="362px">
                <div class="preview">
                    <div class="preview-goods">
                        <iframe width="100%" height="605px" frameborder="0"
                        :src="`http://h.unguya.com/goodsdetail?goods_id=${preview_id}&type=preview`"></iframe>
                    </div>
                </div>
            </el-dialog>

            <!-- 分页 -->
            <el-pagination
                :page-size="list_params.limit"
                layout="prev, pager, next, jumper, total"
                :total="list_total"
                @current-change="handleCurrentChange"
                background
                class="pagination">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import Goods from '../../../api/goodsList';
export default {
    data () {
        return {
            list_total: 0,
            goods_list: [],
            list_params: {
                page: 1,
                limit: 10,
                search: '',
                mch_id: ''
            },
            merchant: [],
            visible: {
                status: false,
            },
            status: {
                goods_ids: ''
            },
            preview: false,
            preview_id: '',
            some_or_one: false, //true为批量下架，false为单件下架
        }
    },
    methods: {
        handleSearchClick () {
            this.list_params.page = 1;
            this.getGoodsList();
        },
        handleSelectMerchant () {
            this.list_params.page = 1;
            this.getGoodsList();
        },
        handleChangeSelect (sele) {
            let temp = ''
            for(let item of sele){
                temp += item.goods_id + ','
            }
            this.status.goods_ids = temp.slice(0, temp.length-1);
        },
        handleChange (row, name) {
            let params = {
                goods_id: row.goods_id,
                status: row[name]?1:0
            }
            Goods[name](params)
        },
        checkSelectable (row) {
            return row.status_text === '未上架'?false:true
        },
        handleDownClick (row) {
            if(row.goods_id){
                this.status.goods_ids = row.goods_id;
                this.visible.status = true;
                this.some_or_one = false;
            }else{
                if(this.status.goods_ids){
                    this.some_or_one = true;
                    this.visible.status = true;
                }
            }
        },
        handleChangeStatusCancel () {
            if(!this.some_or_one){
                this.status.goods_ids = '';
                this.$refs.goods_list.clearSelection();  
            }
            this.visible.status = false;
        },
        handleChangeStatus () {
            Goods.soldOut(this.status)
            .then(res => {
                if(res !== false){
                    this.$message.success('商品下架成功');
                    this.visible.status = false;
                    this.status.goods_ids = '';
                    this.getGoodsList();
                }
            })
        },
        handleCurrentChange (val) {
            this.list_params.page = val;
            this.getGoodsList();
        },
        handlePreviewClick (id) {
            this.preview = true;
            this.preview_id = id;
        },
        handleToRemote (url) {
            window.open(url, '_blank');
        },
        getMerchantSelectList () {
            Goods.merchant().then(res => {
                if(res !== false){
                    res.list.unshift({mch_id: 0, nickname: '全部'})
                    this.merchant = res.list;
                    // console.log(res)
                }
            })
        },
        handleGetListParams () {
            return {
                page: this.list_params.page,
                limit: this.list_params.limit,
                search: this.list_params.search,
                mch_id: this.list_params.mch_id?this.list_params.mch_id:0
            }
        },
        getGoodsList () {
            Goods.list(this.handleGetListParams())
            .then(res => {
                if(res !== false){
                    for(let i=0;i<res.list.length;i++){
                        res.list[i].newest = res.list[i].newest?true:false;
                        res.list[i].recommend = res.list[i].recommend?true:false;
                        res.list[i].price = (res.list[i].price / 100).toFixed(2);
                    }
                    this.list_total = res.count;
                    this.goods_list = res.list;
                    // console.log(this.goods_list)
                }
            })
        }
    },
    created () {
        this.getGoodsList();
        this.getMerchantSelectList();
    }
}
</script>

<style scoped>
.green {
    color: #0aee0a;
}
.green:hover {
    color: blue;
    opacity: 0.5;
}
.el-dialog__wrapper {
    overflow: hidden;
}
.preview {
    width: 362px;
    height: 100vh;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    background-image: url('../../../assets/img/3e37df5b6e3348b1dd6adedb7b2f3ea.png');
    background-repeat: no-repeat;
    background-size: contain;
}
.preview-goods {
    width: 83%;
    height: 83.5%;
    margin: 0 auto;
    margin-top: 72px;
    margin-left: 32px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    overflow: hidden;
}
.merchant-select {
    position: absolute;
    right: 300px;
    display: inline-block;
}
</style>