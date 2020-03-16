<template>
    <div class="systemRegister">
        <div class="part-1 fm-ud-padm fm-lr-padm">
            <span>系统名称 :</span>
            <el-input size="small" :clearable="true" v-model="searchKeywords" placeholder="请输入系统名称"></el-input>
            <el-button type="primary" icon="el-icon-search" size="mini">搜索</el-button>
        </div>
        <div class="part-2 fm-ud-mrgm fm-lr-padm">
            <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="systemOperation(1)">添加</el-button>
            <el-button size="small" type="danger" icon="el-icon-delete">删除</el-button>
        </div>
        <div class="part-3 fm-lr-padm">
            <el-table
                border
                ref="systemTable"
                :data="systemList"
                :header-cell-style="{background:'#f0f0f0'}"
                :stripe="true">
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="系统名称" prop="name"></el-table-column>
                <el-table-column label="英文名称" prop="enName"></el-table-column>
                <el-table-column label="系统路径" prop="path"></el-table-column>
                <el-table-column label="序列号">
                    <template slot-scope="scope">
                        <span class="fm-text-eclipse">{{scope.row.serial}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="createTime" width="165"></el-table-column>
                <el-table-column label="排序号" prop="order" width="80" align="center"></el-table-column>
                <el-table-column label="操作" width="100" align="center">
                    <template>
                        <span class="table-operation" @click="systemOperation(3)">查看</span>
                        <span class="table-operation" @click="systemOperation(2)">编辑</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--新增-编辑-查看-->
        <el-dialog :title="dialogTitle" :visible.sync="showDialog" width="40%">
            <div class="dialog-main">
                <el-form ref="dialogForm" :inline="true" label-position="right" :model="dialogInfoModel" :rules="rules" label-width="120px" label-suffix=" :">

                    <el-form-item label="系统类型">
                        <el-radio>WEB应用程序</el-radio>
                    </el-form-item>
                    <br/>
                    <el-form-item label="系统名称" prop="systemName">
                        <el-input size="mini" v-model="dialogInfoModel.systemName" :disabled="dialogType==3"></el-input>
                    </el-form-item>

                    <el-form-item label="系统英文名称" prop="systemEnName">
                        <el-input size="mini" v-model="dialogInfoModel.systemEnName" :disabled="dialogType==3"></el-input>
                    </el-form-item>

                    <el-form-item label="服务器IP" prop="serviceIP">
                        <el-input size="mini" v-model="dialogInfoModel.serviceIP" :disabled="dialogType==3"></el-input>
                    </el-form-item>

                    <el-form-item label="系统路径" prop="systemPath">
                        <el-input size="mini" v-model="dialogInfoModel.systemPath" :disabled="dialogType==3"></el-input>
                    </el-form-item>

                    <el-form-item label="序列号" prop="systemSerial">
                        <el-input size="mini" disabled placeholder="系统自动生成" :value="dialogInfoModel.systemSerial"></el-input>
                    </el-form-item>

                    <el-form-item label="排序号" prop="systemOrder">
                        <el-input size="mini" v-model="dialogInfoModel.systemOrder" :disabled="dialogType==3"></el-input>
                    </el-form-item>

                    <el-form-item label="描述" prop="systemDescription">
                        <el-input type="textarea" v-model="dialogInfoModel.systemDescription" :disabled="dialogType==3"></el-input>
                    </el-form-item>

                </el-form>
            </div>
            <span slot="footer">
                <el-button size="mini" @click="showDialog=false">取消</el-button>
                <el-button type="primary" size="mini" v-if="dialogType==3" @click="showDialog=false">确定</el-button>
                <el-button type="primary" size="mini" v-else>保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "systemRegister",
        data:function(){
            return {
                systemList:[
                    {
                        name:"StarTech_HZZJ_OA",
                        enName:"startech_hzzj_oa",
                        path:"http://10.0.0.1:8080",
                        order:"1",
                        serial:"AA6878B1C31A9420245DF1DAFFB7B223338737A3",
                        createTime:"2020-02-27 16:00:00"
                    },
                    {
                        name:"中文名称",
                        enName:"test_system",
                        path:"http://10.20.10.1:8080",
                        order:"2",
                        serial:"AA6878B1C31A9420245DF1DAFFB7B223338737A3",
                        createTime:"2020-02-27 16:00:00"
                    },
                    {
                        name:"中文名称",
                        enName:"test_system",
                        path:"http://10.20.10.1:8080",
                        order:"2",
                        serial:"AA6878B1C31A9420245DF1DAFFB7B223338737A3",
                        createTime:"2020-02-27 16:00:00"
                    },
                    {
                        name:"中文名称",
                        enName:"test_system",
                        path:"http://10.20.10.1:8080",
                        order:"2",
                        serial:"AA6878B1C31A9420245DF1DAFFB7B223338737A3",
                        createTime:"2020-02-27 16:00:00"
                    },
                    {
                        name:"中文名称",
                        enName:"test_system",
                        path:"http://10.20.10.1:8080",
                        order:"2",
                        serial:"AA6878B1C31A9420245DF1DAFFB7B223338737A3",
                        createTime:"2020-02-27 16:00:00"
                    }
                ],
                searchKeywords:"",
                showDialog:false,
                dialogType:0,  //1添加2编辑3查看
                dialogTitle:"",
                dialogInfoModel:{
                    systemType:"",
                    systemName:"",
                    systemEnName:"",
                    serviceIP:"",
                    systemPath:"",
                    systemSerial:"",
                    systemOrder:"",
                    systemDescription:""
                },
                rules:{
                    systemName: [
                        {required:true , message: "请输入系统名称"}
                    ],
                    systemEnName:[
                        {required:true , message: "请输入系统英文名称"}
                    ]
                }
            }
        },
        methods:{
            //点击 添加 查看 编辑 按钮
            systemOperation(type){
                this.dialogType = type;
                this.showDialog = true;
                if(type == 1){
                    //添加按钮清空表单
                    this.$refs.dialogForm && this.$refs.dialogForm.resetFields();
                }
            }
        },
        watch:{
            dialogType:function(newValue){
                //清空表单验证
                this.$refs.dialogForm && this.$refs.dialogForm.clearValidate();
                switch (newValue) {
                    case 1:this.dialogTitle = "添加系统";break;
                    case 2:this.dialogTitle = "编辑系统";break;
                    case 3:this.dialogTitle = "查看系统";break;
                }
            }
        },
        mounted() {

        }
    }
</script>

<style scoped lang="less">
.systemRegister{
    .part-1{
        border-bottom: 2px solid @bgGray;
        .el-input{
            width: 320px;
            margin-left: 10px;
        }
        .el-button{
            margin-left: 10px;
        }
    }
    .part-2{
    }
    .part-3{
        .table-operation{
            color: @bgBlue;
            cursor: pointer;
            &:nth-child(even){
                margin-left: 10px;
            }
        }
    }
    .el-dialog{
        .dialog-main{
            .el-form{
                .el-form-item{
                    .el-input{

                    }
                    .el-textarea{
                        width: 300px;
                    }
                }
            }
        }
    }
}
</style>