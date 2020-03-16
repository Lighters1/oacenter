<template>
    <div class="function-register">
        <main-left-slide ref="mainLeftSlide" :slideList="slideTreeData" :slideRule="slideTreeRule" @changeSpread="changeMainWidth" @clickTreeNode="clickTreeNode">
            <div slot="up" class="system-select">
                <el-select v-model="slideSelectList[currentSelectSystemIndex].value" placeholder="请选择系统">
                    <el-option
                            v-for="item in slideSelectList"
                            :key="item.label"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </main-left-slide>
        <div class="register-main" :style="{left:mainStyleLeft}">
            <div class="part-1">
                <span>功能类别 :</span>
                <el-input size="small" :clearable="true" v-model="searchKeywords" placeholder="请输入功能类别"></el-input>
                <el-button type="primary" icon="el-icon-search" size="mini">搜索</el-button>
            </div>
            <div class="part-2">
                <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="systemOperation(1)">添加</el-button>
                <el-button size="small" type="danger" icon="el-icon-delete">删除</el-button>
            </div>
            <div class="part-3 fm-lr-padm">
                <el-table
                        border
                        ref="functionTable"
                        :data="functionList"
                        :header-cell-style="{background:'#f0f0f0'}"
                        :stripe="true">
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column label="功能名称" prop="functionName"></el-table-column>
                    <el-table-column label="排列序号" prop="order" width="80"></el-table-column>
                    <el-table-column label="是否显示" width="90">
                        <template slot-scope="slot">
                            <span v-if="slot.row.isShow ==1">显示</span>
                            <span v-if="slot.row.isShow ==2">不显示</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="功能代码" prop="functionCode"></el-table-column>
                    <el-table-column label="页面路径" prop="pagePath"></el-table-column>
                    <el-table-column label="功能描述" prop="functionDescribe"></el-table-column>
                    <el-table-column label="操作" align="center" width="100">
                        <template>
                            <span class="table-operation" @click="systemOperation(3)">详情</span>
                            <span class="table-operation" @click="systemOperation(2)">编辑</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 添加 详情 编辑 -->
        <el-dialog width="40%" :visible.sync="showDialog">
            <span slot="title">
                <span class="title-tip">当前系统:{{slideSelectList[currentSelectSystemIndex].label}}</span>
                <span>{{dialogTitle}}</span>
            </span>
            <div class="dialog-main">
                <div class="dialog-main-left">
                    <el-form :model="functionModel" :rules="functionModelRules" label-suffix=" :" label-width="100px">
                        <el-form-item label="功能名称" prop="functionName">
                            <el-input size="mini" v-model="functionModel.functionName"></el-input>
                        </el-form-item>
                        <el-form-item label="功能类别" prop="functionType">
                            <el-input size="mini" v-model="functionModel.functionType"></el-input>
                        </el-form-item>
                        <el-form-item label="是否显示" prop="isShow">
                            <el-radio-group v-model="functionModel.isShow">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="功能代码" prop="functionCode">
                            <el-input size="mini" v-model="functionModel.functionCode"></el-input>
                        </el-form-item>
                        <el-form-item label="页面代码" prop="functionCode">
                            <el-input size="mini" v-model="functionModel.pagePath"></el-input>
                        </el-form-item>
                        <el-form-item label="排列序号" prop="order">
                            <el-input size="mini" v-model="functionModel.order"></el-input>
                        </el-form-item>
                        <el-form-item label="功能描述" prop="functionDescribe">
                            <el-input type="textarea" size="mini" v-model="functionModel.functionDescribe"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog-main-right">
                    <el-tree ref="elTree" node-key="id"
                             :data="roleList"
                             :props="roleRule"
                             show-checkbox
                             :default-expand-all="true">

                        <span slot-scope="{node}" class="fm-text-eclipse">
                            <span :title="node.label" style="padding: 0 5px;">{{node.label}}</span>
                        </span>

                    </el-tree>
                </div>
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
    import mainLeftSlide from "../../components/mainLeftSlide";
    export default {
        name: "functionRegister",
        components:{
            mainLeftSlide
        },
        data(){
            return {
                //左侧数据
                slideTreeRule:{
                    label:"name",
                    children:"son",
                    key:"id"
                },
                slideTreeData:[
                    {
                        name:"系统功能管理",
                        id:"a",
                        son:[
                            {
                                name:"行政办公"
                            },
                            {
                                name:"个人办公"
                            },
                            {
                                name:"电子邮件"
                            },
                            {
                                name:"短信平台"
                            },
                            {
                                name:"稿件管理"
                            },
                            {
                                name:"资产管理"
                            }
                        ]
                    }
                ],
                slideSelectList:[
                    {
                        value:"1",
                        label:"系统1"
                    },
                    {
                        value:"2",
                        label: "系统2"
                    }
                ],
                currentSelectSystemIndex:0,
                slideCurrentNode:{},
                initSlideWidth:0,
                //右侧数据
                mainStyleLeft:'30px',
                searchKeywords:"",
                functionList:[
                    {
                        functionName:"收件箱",
                        order:1,
                        isShow:1,
                        functionCode:"",
                        pagePath:"/receive",
                        functionDescribe:"没啥描述"
                    },
                    {
                        functionName:"发件箱",
                        order:2,
                        isShow:2,
                        functionCode:"",
                        pagePath:"/send",
                        functionDescribe:"11"
                    },
                    {
                        functionName:"草稿箱",
                        order:3,
                        isShow:1,
                        functionCode:"",
                        pagePath:"draft",
                        functionDescribe:"22"
                    }
                ],
                //弹出框数据
                functionModel:{
                    functionName:"",
                    functionType:"",
                    isShow:0,
                    functionCode:"",
                    pagePath:"",
                    order:"",
                    functionDescribe:""
                },
                functionModelRules:{
                    functionName:[
                        {required:true,message:'请输入功能名称'}
                    ]
                },
                dialogType:0,
                dialogTitle:"",
                showDialog:false,
                roleRule:{
                    label:"name",
                    children:"children",
                    key:"id"
                },
                roleList:[
                    {
                        name:"系统角色",
                        id:"aaa",
                        children:[
                            {
                                name:"基础权限"
                            },
                            {
                                name:"系统管理员"
                            },
                            {
                                name:"档案管理员"
                            },
                            {
                                name:"收文登记员"
                            }
                        ]
                    },
                    {
                        name:"系统角色",
                        id:"bbb",
                        children:[
                            {
                                name:"基础权限"
                            },
                            {
                                name:"系统管理员"
                            },
                            {
                                name:"档案管理员"
                            },
                            {
                                name:"收文登记员"
                            }
                        ]
                    },{
                        name:"系统角色",
                        id:"ccc",
                        children:[
                            {
                                name:"基础权限"
                            },
                            {
                                name:"系统管理员"
                            },
                            {
                                name:"档案管理员"
                            },
                            {
                                name:"收文登记员"
                            }
                        ]
                    }
                ],
            }
        },
        methods:{
            //树点击事件
            clickTreeNode(data){
                this.slideCurrentNode = data;
            },
            //改变右侧主题内容宽度
            changeMainWidth(isSpread){
                if(isSpread){
                    this.mainStyleLeft = this.initSlideWidth;
                }else{
                    this.mainStyleLeft = '30px';
                }
            },
            //点击 添加 编辑 详情 按钮
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
                switch (newValue) {
                    case 1:this.dialogTitle = "添加功能";break;
                    case 2:this.dialogTitle = "编辑功能";break;
                    case 3:this.dialogTitle = "功能详情";break;
                }
            }
        },
        mounted() {
            //初始化得到左侧宽度及右侧位置
            this.initSlideWidth = this.mainStyleLeft = this.$refs.mainLeftSlide.currentWidth;
        }
    }
</script>

<style scoped lang="less">
.function-register{
    .system-select{
        margin: 0 15px 10px;
        .el-select{
            display: block;
        }
    }
    .register-main{
        position: absolute;
        transition: left 0.3s ease;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        .part-1{
            padding: 10px;
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
            padding: 10px;
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
    }
    .el-dialog{
        .title-tip{
            float: right;
            margin-right: 40px;
            font-size: 18px;
        }
        .title-tip ~ span{
            font-size: 18px;
        }
        .dialog-main{
            overflow: hidden;
            position: relative;
            .dialog-main-left{
                width: 60%;
                float: left;
                .el-input,.el-textarea{
                    width: 90%;
                }
            }
            .dialog-main-right{
                position: absolute;
                left: 60%;
                top: 0;
                bottom: 0;
                width: 40%;
                overflow-y: auto;
                .el-tree{
                    overflow-x: auto;
                }
            }
        }
    }
}
</style>