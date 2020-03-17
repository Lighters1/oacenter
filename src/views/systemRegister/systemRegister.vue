<template>
    <div class="systemRegister">
        <div class="part-1 fm-ud-padm fm-lr-padm">
            <span>系统名称 :</span>
            <el-input size="small" :clearable="true" v-model="searchKeywords" placeholder="请输入系统名称"></el-input>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="searchSystem">搜索</el-button>
        </div>
        <div class="part-2 fm-ud-mrgm fm-lr-padm">
            <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="systemOperation(1)">添加</el-button>
            <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteSystem">删除</el-button>
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
                <el-table-column label="系统IP" prop="systemIp" width="120"></el-table-column>
                <el-table-column label="序列号">
                    <template slot-scope="scope">
                        <span class="fm-text-eclipse">{{scope.row.serializeNum}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="createTime" width="165"></el-table-column>
                <el-table-column label="排序号" prop="orderNum" width="80" align="center"></el-table-column>
                <el-table-column label="操作" width="60" align="center">
                    <template slot-scope="scope">
                        <span class="table-operation" @click="systemOperation(2,scope.row)">编辑</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page-navigation">
                <el-pagination
                        @current-change="changeNowPage"
                        @size-change="changePageSize"
                        :current-page.sync="nowPage"
                        :page-sizes="[10, 15, 20, 30 , 50]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <!--新增-编辑-查看-->
        <el-dialog :title="dialogType==1?'添加系统':'编辑系统'" :visible.sync="showDialog" width="40%">
            <div class="dialog-main">
                <el-form ref="dialogForm" :inline="true" label-position="right" :model="dialogInfoModel" :rules="rules" label-width="120px" label-suffix=" :">

                    <el-form-item label="系统类型">
                        <el-radio>WEB应用程序</el-radio>
                    </el-form-item>
                    <br/>
                    <el-form-item label="系统名称" prop="name">
                        <el-input size="mini" v-model="dialogInfoModel.name"  ></el-input>
                    </el-form-item>

                    <el-form-item label="系统英文名称" prop="enName">
                        <el-input size="mini" v-model="dialogInfoModel.enName"  ></el-input>
                    </el-form-item>

                    <el-form-item label="服务器IP" prop="systemIp">
                        <el-input size="mini" v-model="dialogInfoModel.systemIp"  ></el-input>
                    </el-form-item>

                    <el-form-item label="系统路径" prop="path">
                        <el-input size="mini" v-model="dialogInfoModel.path"  ></el-input>
                    </el-form-item>

                    <el-form-item label="序列号" prop="serializeNum">
                        <el-input size="mini" disabled placeholder="系统自动生成" :value="dialogInfoModel.serializeNum"></el-input>
                    </el-form-item>

                    <el-form-item label="排序号" prop="orderNum">
                        <el-input size="mini" v-model="dialogInfoModel.orderNum"  ></el-input>
                    </el-form-item>

                    <el-form-item label="描述" prop="description">
                        <el-input type="textarea" v-model="dialogInfoModel.description"></el-input>
                    </el-form-item>

                </el-form>
            </div>
            <span slot="footer">
                <el-button size="mini" @click="showDialog=false">取消</el-button>
                <el-button type="primary" size="mini" @click="addNewSystem" v-if="dialogType == 1">保存</el-button>
                <el-button type="primary" size="mini" @click="editSystemInfo" v-else>保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        name: "systemRegister",
        data:function(){
            return {
                systemList:[],
                total:0,
                pageSize:10,
                pageCount:1,
                nowPage:1,
                searchKeywords:"",
                showDialog:false,
                dialogType:0,  //1添加2编辑
                dialogTitle:"",
                dialogInfoModel:{
                    systemId:"",
                    systemType:"",
                    name:"",
                    enName:"",
                    path:"",
                    systemIp:"",
                    serializeNum:"",
                    orderNum:"",
                    description:""
                },
                rules:{
                    name: [
                        {required:true , message: "请输入系统名称"}
                    ],
                    enName:[
                        {required:true , message: "请输入系统英文名称"}
                    ]
                }
            }
        },
        methods:{
            //点击 添加 编辑 按钮
            systemOperation(type,data){
                this.dialogType = type;
                this.showDialog = true;
                if(type == 1){
                    //清空表单 清空验证
                    this.tool.cleanobject(this.dialogInfoModel);
                    var _that = this;
                    setTimeout(function(){
                        _that.$refs.dialogForm.clearValidate();
                    });
                }else if(type == 2){
                    this.tool.copyObject(this.dialogInfoModel,this.tool.changeUnderline2Camel(data));
                    console.log(this.dialogInfoModel)
                }
            },
            //获取系统列表
            getSystemList(){
                this.searchKeywords = "";
                this.$axios.get("/sys/list?index="+this.nowPage+"&size="+this.pageSize,).then(rsp=>{
                    if(rsp){
                        this.total = rsp.data.total;
                        this.pageCount = rsp.data.pages;
                        this.systemList = rsp.data.list;
                    }
                })
            },
            //改变分页大小
            changePageSize(size){
                this.pageSize = size;
                this.nowPage = 1;
                //判断是搜索分页还是普通分页
                if(this.searchKeywords.length>0){
                    this.searchSystem();
                }else{
                    this.getSystemList();
                }
            },
            //改变当前页面位置
            changeNowPage(index){
                this.nowPage = index;
                //判断是搜索分页还是普通分页
                if(this.searchKeywords.length>0){
                    this.searchSystem();
                }else{
                    this.getSystemList();
                }
            },
            //添加系统
            addNewSystem(){
                var _that = this;
                this.$refs.dialogForm.validate(function(pass){
                    if(pass){
                        _that.$axios.post("/sys/add",_that.dialogInfoModel).then(function(rsp){
                            if(rsp){
                                _that.$message.success("添加成功");
                                _that.showDialog = false;
                                _that.getSystemList();
                            }
                        });
                    }
                });
            },
            //修改系统
            editSystemInfo(){
                var _that = this;
                this.$refs.dialogForm.validate(function(pass){
                    if(pass){
                        _that.$axios.post("/sys/updata",_that.dialogInfoModel).then(function(rsp){
                            if(rsp){
                                _that.$message.success("修改成功");
                                _that.showDialog = false;
                                _that.getSystemList();
                            }
                        });
                    }
                });
            },
            //删除系统
            deleteSystem(){
                //拿到勾选的系统
                var _that = this;
                var systemList = this.$refs.systemTable.selection;
                if(systemList.length<1){
                    this.$message.warning("请选择需要删除的系统");
                }else{
                    this.$confirm('确定删除选中的 '+systemList.length+' 个系统?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        //发送删除请求
                        var systemIdList = [];
                        systemList.forEach(v=>{
                            systemIdList.push(v['systemId']);
                        });
                        this.$axios.post("/sys/changeDelete",{
                            idList:systemIdList
                        }).then(rsp=>{
                           if(rsp){
                               console.log(1)
                               _that.$message.success('删除成功 '+rsp.data +" 个");
                               this.getSystemList();
                           }
                        });
                    }).catch(() => {
                        _that.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });

                }
            },
            //根据系统名称搜索
            searchSystem(){
                if(this.searchKeywords.length == 0){
                    this.getSystemList();
                }else{
                    var _that = this;
                    this.$axios.post("/sys/find",{
                        keywords:_that.searchKeywords,
                        index:_that.nowPage,
                        size:_that.pageSize
                    }).then(rsp=>{
                        if(rsp){
                            _that.total = rsp.data.total;
                            _that.pageCount = rsp.data.pages;
                            _that.systemList = rsp.data.list;
                        }
                    });
                }
            }
        },
        mounted() {
            this.getSystemList();
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
        .page-navigation{
            margin-top: 10px;
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