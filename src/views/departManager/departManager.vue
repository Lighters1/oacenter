<template>
    <div class="depart-manager">
        <main-left-slide ref="mainLeftSlide" class="main-left-slide" :slide-list="departSlideList" :slide-rule="departSlideListRule" :slide-spread="departSlideSpread" @changeSpread="changeMainWidth"></main-left-slide>
        <div class="manager-main" :style="{left:mainStyleLeft}">
            <div class="part-1">
                <span>部门名称 :</span>
                <el-input size="small" :clearable="true" v-model="searchKeywords" placeholder="请输入部门名称"></el-input>
                <el-button type="primary" icon="el-icon-search" size="mini">搜索</el-button>
            </div>
            <div class="part-2">
                <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="departOperation(1)">添加</el-button>
                <el-button size="small" type="danger" icon="el-icon-delete">删除</el-button>
            </div>
            <div class="part-3">
                <el-table
                        border
                        ref="departList"
                        :data="departList"
                        :header-cell-style="{background:'#f0f0f0'}"
                        :stripe="true">
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column label="部门名称" prop="departName"></el-table-column>
                    <el-table-column label="部门编号" prop="departNum"></el-table-column>
                    <el-table-column label="部门机构码" prop="departNum" width="120"></el-table-column>
                    <el-table-column label="基层类型" prop="departType"></el-table-column>
                    <el-table-column label="部门简称" prop="departShortName"></el-table-column>
                    <el-table-column label="分管领导" prop="departLeader"></el-table-column>
                    <el-table-column label="部门负责人" prop="departCharge" width="120"></el-table-column>
                    <el-table-column label="是否机构">
                        <template slot-scope="slot">
                            <span v-if="slot.row.isMechanism == 1" class="fm-color-s">是</span>
                            <span v-else class="fm-color-d">不是</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否启用">
                        <template slot-scope="slot">
                            <span v-if="slot.row.isEnable == 1" class="fm-color-s">启用</span>
                            <span v-else class="fm-color-d">未启用</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="排列序号" prop="order"></el-table-column>
                    <el-table-column label="部门描述" prop="departDescription"></el-table-column>
                    <el-table-column label="操作" align="center" width="100">
                        <template>
                            <span class="table-operation" @click="departOperation(3)">详情</span>
                            <span class="table-operation" @click="departOperation(2)">编辑</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!--部门 添加 编辑 查看-->
        <el-dialog width="40%" :visible.sync="showDialog" :title="dialogTitle">
            <div class="depart-dialog">
                <el-form :inline="true" :model="dialogDepartModel" :rules="dialogDepartModelRules" label-suffix=" :" label-width="100px">
                    <el-form-item label="部门名称" prop="departName">
                        <el-input size="mini" v-model="dialogDepartModel.departName"></el-input>
                    </el-form-item>
                    <el-form-item label="部门编号" prop="departNum">
                        <el-input size="mini" v-model="dialogDepartModel.departNum"></el-input>
                    </el-form-item>
                    <el-form-item label="部门机构码" prop="departCode">
                        <el-input size="mini" v-model="dialogDepartModel.departCode"></el-input>
                    </el-form-item>
                    <el-form-item label="基层类型">
                        <el-select v-model="dialogDepartModel.departType" size="mini">
                            <el-option v-for="type in departTypeList" :key="type.value"
                                :label="type.label"
                                :value="type.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="部门简称" prop="departShortName">
                        <el-input size="mini" v-model="dialogDepartModel.departShortName"></el-input>
                    </el-form-item>
                    <el-form-item label="上级部门" prop="departHigher">
                        <el-input @focus="showWrapSelectTree" style="width: 175px" size="mini" :value="dialogDepartModel.departHigher" suffix-icon ="el-icon-menu"></el-input>
                    </el-form-item>
                    <el-form-item label="分管领导" prop="departLeader">
                        <el-input style="width: 175px" @focus="showWrapSelectTree" size="mini" :value="dialogDepartModel.departLeader" suffix-icon ="el-icon-menu"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人" prop="departCharge">
                        <el-input style="width: 175px" @focus="showWrapSelectTree" size="mini" :value="dialogDepartModel.departCharge" suffix-icon ="el-icon-menu"></el-input>
                    </el-form-item>
                    <el-form-item label="是否机构" prop="isMechanism">
                        <el-radio-group v-model="dialogDepartModel.isMechanism">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="2">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="是否启用" prop="isEnable">
                        <el-radio-group v-model="dialogDepartModel.isEnable">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="2">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="排列序号" prop="order">
                        <el-input size="mini" v-model="dialogDepartModel.order"></el-input>
                    </el-form-item>
                    <el-form-item label="部门描述" prop="departDescription">
                        <el-input type="textarea" v-model="dialogDepartModel.departDescription"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer">
                <el-button size="mini" @click="showDialog=false">取消</el-button>
                <el-button type="primary" size="mini" v-if="dialogType==3" @click="showDialog=false">确定</el-button>
                <el-button type="primary" size="mini" v-else>保存</el-button>
            </span>
        </el-dialog>
        <wrap-select-tree></wrap-select-tree>
    </div>
</template>

<script>
    import mainLeftSlide from "../../components/mainLeftSlide";
    import wrapSelectTree from "../../components/wrapSelectTree";
    export default {
        name: "departManager",
        components:{mainLeftSlide,wrapSelectTree},
        data(){
            return {
                //左侧树
                departSlideList:[
                    {
                        name:"人力资源和社会保障",
                        id:'aa',
                        children: [
                            {
                                name:"杭州市人力资源和社会保障局",
                                id:'bbb',
                                children:[
                                    {
                                        name:"局机关"
                                    },
                                    {
                                        name:"局属机关"
                                    },
                                    {
                                        name:"其他单位"
                                    }
                                ]
                            }
                        ]
                    }
                ],
                departSlideListRule:{
                    label:"name",
                    children:"children",
                    key:"id"
                },
                departSlideSpread:['aa','bbb'],
                initSlideWidth:0,
                //右侧数据
                mainStyleLeft:30,
                searchKeywords:"",
                departList:[
                    {
                        departName:"局机关",
                        departNum:"222",
                        departCode:"",
                        departType:"一级",
                        departShortName:"局机关",
                        departLeader:"",
                        departCharge:"",
                        isMechanism:2,
                        isEnable:1,
                        order:2,
                        departDescription:"222"
                    }
                ],
                //弹出层数据
                showDialog:false,
                dialogType:0,
                dialogTitle:"",
                departTypeList:[
                    {
                        label: "一级",
                        value:1
                    },
                    {
                        label: "二级",
                        value:2
                    },
                    {
                        label: "三级",
                        value:3
                    },
                    {
                        label: "四级",
                        value:4
                    },
                    {
                        label: "五级",
                        value:5
                    },
                ],
                dialogDepartModel:{
                    departName:"",
                    departNum:"",
                    departCode:"",
                    departType:1,
                    departShortName:"",
                    departLeader:"",
                    departCharge:"",
                    departHigher:"",
                    isMechanism:2,
                    isEnable:2,
                    order:"",
                    departDescription:""
                },
                dialogDepartModelRules:{
                    departName:[
                        {required:true,message:"部门名称不能为空"}
                    ],
                    departNum:[
                        {required:true,message:"部门编号不能为空"}
                    ],
                    departShortName:[
                        {required:true,message:"部门简称不能为空"}
                    ]
                }
            }
        },
        methods:{
            //布局收缩
            changeMainWidth(isSpread){
                if(isSpread){
                    this.mainStyleLeft = this.initSlideWidth;
                }else{
                    this.mainStyleLeft = '30px';
                }
            },
            //点击 添加 编辑 详情 按钮
            departOperation(type){
                this.dialogType = type;
                this.showDialog = true;
                if(type == 1){
                    //添加按钮清空表单
                    this.$refs.dialogForm && this.$refs.dialogForm.resetFields();
                }
            },
            //显示选择树控件
            showWrapSelectTree(){
                this.$children[7].isShowDialog = true
            }
        },
        watch:{
            dialogType:function(newValue){
                switch (newValue) {
                    case 1:this.dialogTitle = "添加部门";break;
                    case 2:this.dialogTitle = "编辑部门";break;
                    case 3:this.dialogTitle = "部门详情";break;
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
.depart-manager{
    .main-left-slide{
        padding-top: 10px;
    }
    .manager-main{
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
            padding: 0 10px;
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
        .depart-dialog{
            .el-radio-group{
                width: 175px;
            }
            .el-textarea{
                width: 360px;
            }
            .el-select{
                width: 175px;
            }

        }
    }
}
</style>