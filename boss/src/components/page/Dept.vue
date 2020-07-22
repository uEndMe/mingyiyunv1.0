<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-zk-dept"></i> {{$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="handleDeleteClick">批量删除</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="handleCreate">添加</el-button>
            </div>
            <el-table border :data="list" class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名名称" align="center"></el-table-column>
                <el-table-column prop="status" label="启用状态" align="center">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.status"
                         @change="changeStatus(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDeleteClick(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            
            <!-- 分页 -->
            <el-pagination
                :page-size="list_params.limit"
                layout="prev, pager, next, jumper, total"
                :total="total"
                @current-change="handleCurrentChange"
                background
                class="pagination">
            </el-pagination>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑管理员" :visible.sync="editVisible" width="30%">
            <el-form ref="edit" label-width="120px" label-position="right">
                <el-form-item label="部门名称" :error="error_msg.name">
                    <el-input v-model="params.name" @focus="handleFocus('name')"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEditForm">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 创建 -->
        <el-dialog title="新增部门" :visible.sync="createVisible" width="30%">
            <el-form ref="create" label-width="120px" label-position="right">
                <el-form-item label="部门名称" :error="error_msg.name">
                    <el-input v-model="params.name" @focus="handleFocus('name')"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="createVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitCreateForm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { deptList, deptAdd, deptUpdate, deptDel, deptStatus } from '../../api/dept';
export default {
    name: 'admin',
    data() {
        return {
            list: [],
            total: 0,
            list_params: {
                page: 1,
                limit: 10
            },
            editVisible: false,
            createVisible: false,
            params: {
                name: '',
            },
            error_msg: {
                name: '',
            },
            ids: '',
        }
    },
    methods: {
        handleCreate () {
            this.createVisible = true;
            this.params = this.$options.data().params;
            this.error_msg = this.$options.data().error_msg;
        },
        handleEdit (row) {
            this.editVisible = true;
            this.params.name = row.name;
            this.params.dept_id = row.dept_id;
            this.error_msg = this.$options.data().error_msg;
        },
        changeStatus (row) {
            let params = {
                dept_id: parseInt(row.dept_id),
                status: row.status?1:0
            }
            deptStatus(params);
        },
        handleFocus (key) {
            this.error_msg[key] = '';
        },
        vailParams (params, ac) {
            let passing = true;
            for(let key in params){
                if(key === 'dept_id') continue;
                if(params[key] === ''){
                    let key_name = '';
                    switch(key){
                        case 'name':
                            key_name = '部门名称';
                            break;
                        default: return
                    }
                    this.error_msg[key] = key_name + '不能为空';
                    passing = false;
                }
            }
            return passing
        },
        //点击编辑确认操作
        submitEditForm () {
            if(!this.vailParams(this.params)) return
            deptUpdate(this.params).then(res => {
                if(res){
                    this.$message.success('部门信息修改成功');
                    this.getDeptSelect();
                    this.editVisible = false;
                }
            })
        },
        submitCreateForm () {
            if(!this.vailParams(this.params)) return
            let params = {
                name: this.params.name,
            }
            deptAdd(params).then(res => {
                if(res){
                    this.$message.success('新增部门成功');
                    this.getDeptSelect();
                    this.createVisible = false;
                    // this.params = this.$options.data().params;
                }
            })
        },
        //删除
        handleDeleteClick (row) {
            if(this.ids === '' && !row.dept_id) return
            this.$confirm('确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.handleDelete(row);
            })
            .catch(() => {});
        },
        handleDelete (row) {
            deptDel({dept_ids: row.dept_id?row.dept_id:this.ids})
            .then(res => {
                if(res){
                    this.$message.success('删除成功');
                    this.ids = '';
                    this.getDeptSelect();
                }
            })
        },
        handleSelectionChange (val) {
            if(val.length){
                let delArr = [];
                for(let i = 0; i < val.length; i++){
                    delArr.push(val[i].dept_id);
                }
                this.ids = delArr.join(',');
            }else {
                this.ids = '';
            }
        },
        handleCurrentChange (val) {
            this.list_params.page = val;
            this.getDeptSelect();
        },
        getDeptSelect () {
            deptList(this.list_params).then((res) => {
                console.log(res.list);
                if (res) {
                    this.total = res.count;
                    this.list = res.list;
                }
            });
        },
    },
    created () {
        this.getDeptSelect();
    }
}
</script>

<style lang="less" scoped>
/deep/ .el-form {
    display: flex;
    flex-wrap: wrap;
}
/deep/ .el-form-item {
    min-width: 350px;
    margin-right: 30px;
    .el-input__inner {
        min-width: 230px;
    }
}
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.del-dialog-cnt{
    font-size: 16px;
    text-align: center
}
.table{
    width: 100%;
    font-size: 14px;
}
.red{
    color: #ff0000;
}
.mr10{
    margin-right: 10px;
}
// .input-width {
//     width: 100%;
// }
</style>
