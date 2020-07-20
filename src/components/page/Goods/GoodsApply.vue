<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-paperclip"></i> 上架申请列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="text" class="mr10"></el-button>
                <el-input v-model="list_params.search" 
                placeholder="筛选关键词" 
                class="handle-input mr10"
                @keyup.enter.native="handleSearchClick">
                    <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearchClick"></i>
                </el-input>
            </div>
            <el-table 
            border
            ref="goods_list"
            :data="goods_list">
                <!-- <el-table-column type="selection" width="35"></el-table-column> -->
                <el-table-column prop="preview" label="预览图" align="center">
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
                <el-table-column prop="price" label="商品价格(美元)" align="center"></el-table-column>
                <el-table-column prop="stock" label="剩余库存" align="center"></el-table-column>
                <el-table-column prop="add_time" label="数据创建时间" align="center"></el-table-column>
                <el-table-column label="审核操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" 
                        @click="handleExaminationClick(scope.row)">
                            审核
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 商品上架审核 -->
            <el-dialog title="商品上架审核" :visible.sync="visible.examination" width="45%" :close-on-click-modal="false" :before-close="handleCancel">
                <el-form :model="examination">
                    <el-form-item>
                        <el-input v-model="examination.profits" placeholder="平台收益(美元)"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="examination.remark" type="textarea" resize="none" rows="4" placeholder="审核意见" class="mb20"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-radio v-model="examination.audit_status" label="0">审核不通过</el-radio>
                        <el-radio v-model="examination.audit_status" label="1">审核通过</el-radio>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="handleCancel">取 消</el-button>
                    <el-button type="primary" :disabled="couldBeClick" @click="handleExaminationSubmit">确 定</el-button>
                </span>
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
import { Message } from 'element-ui';
export default {
    data () {
        return {
            list_total: 0,
            goods_list: [],
            list_params: {
                page: 1,
                limit: 10,
                search: ''
            },
            visible: {
                examination: false,
            },
            examination: {
                goods_id: '',
                audit_status: '0',
                remark: '',
                profits: '',
            },

        }
    },
    computed: {
        couldBeClick () {
            return !this.examination.profits;
        },
        shelvesParams () {
            return {
                goods_id: this.examination.goods_id,
                audit_status: this.examination.audit_status,
                remark: this.examination.remark,
                platform_profits: (this.examination.profits) * 100,
            };
        },
    },
    watch: {
        'examination.profits' () {
            let str = this.examination.profits + '';
            for(let item of str){
                if(!Number(item)){
                    if(item === '0') continue;
                    if(item === '.' && str.lastIndexOf('.') !== 0){
                        if(str.indexOf('.') === str.lastIndexOf('.')) continue
                    }
                    this.examination.profits = str.slice(0,str.length - 1);
                }
            }
            if(str.lastIndexOf('.') > -1){
                let arr = str.split('.');
                if(arr[1].length > 2){
                    this.examination.profits = str.slice(0,str.length - 1);
                    this.$message.warning('最多保留两位小数');
                }
            }
        }
    },
    methods: {
        handleSearchClick () {
            this.list_params.page = 1;
            this.getGoodsApplyList();
        },
        handleExaminationClick (row) {
            this.examination.goods_id = row.goods_id;
            this.visible.examination = true;
        },
        handleCancel () {
            this.examination.goods_id = '';
            this.examination.remark = '';
            this.examination.profits = '';
            this.examination.audit_status = '0';
            this.visible.examination = false;
        },
        handleExaminationSubmit () {
            Goods.shelves(this.shelvesParams).then(res => {
                if(res !== false){
                    this.visible.examination = false;
                    this.$message.success('审核完成');
                    this.getGoodsApplyList();
                }
            })
            
        },
        handleCurrentChange (val) {
            this.list_params.page = val;
            this.getGoodsApplyList();
        },
        getGoodsApplyList () {
            Goods.apply(this.list_params)
            .then(res => {
                if(res !== false){
                    for(let i=0;i<res.list.length;i++){
                        res.list[i].price = (res.list[i].price / 100).toFixed(2)
                    }
                    this.list_total = res.count;
                    this.goods_list = res.list;
                    // console.log(this.goods_list)
                }
            });
        }
    },
    created () {
        this.getGoodsApplyList();
    }
}
</script>
<style scoped>
.mb20 {
    margin-bottom: 20px;
}
</style>