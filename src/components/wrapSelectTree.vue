<template>
    <div class="wrap-select-tree" ref="wrapSelectTree">
        <el-dialog width="36%" top="20vh" :visible.sync="isShowDialog" title="选择填入" :destroy-on-close="true" :before-close="closeTree">
            <div class="dialog-main">
                <div class="main-left">
                    <el-tree :data="treeList"
                             ref="selectTree"
                             :default-expand-all="false"
                             :default-expanded-keys="treeSpread"
                             :props="treeRule"
                             node-key="id"
                             :show-checkbox="treeConfig.showCheckbox"
                             @check="changeCheckbox">
                    </el-tree>
                </div>
                <div class="main-middle">
                    <i class="el-icon-caret-right"></i>
                </div>
                <div class="main-right">
                    <div v-for="(value,k) in currentSelectList" :key="k" class="right-box">
                        <span>{{value.name}}</span>
                        <i class="el-icon-close" @click="cancelSelect(value)"></i>
                    </div>
                </div>
            </div>
            <span slot="footer">
                <el-button size="mini" @click="closeTree">取消</el-button>
                <el-button type="primary" size="mini">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "wrapSelectTree",
        data(){
            return {
                isShowDialog:false,
                treeConfig:{
                    showCheckbox:true
                },
                treeList:[
                    {
                        name:"杭州市人力资源和社会保障局",
                        id:"aaa",
                        children:[
                            {
                                name:"局机关",
                                id:"bbb"
                            },
                            {
                                name:"局属机关",
                                id:"ccc"
                            },
                            {
                                name:"其他单位",
                                id:"ddd"
                            },
                        ]
                    }
                ],
                treeSpread:['aaa'],
                treeRule:{
                    children: 'children',
                    label: 'name'
                },
                currentSelectList:[],
            }
        },
        methods:{
            //关闭选人树
            closeTree(){
                this.currentSelectList = [];
                this.isShowDialog = false;
            },
            //复选框选中赋值
            changeCheckbox(){
                this.currentSelectList = this.$refs.selectTree.getCheckedNodes(true,false);
            },
            //点击右侧关闭
            cancelSelect(data){
                this.$refs.selectTree.setChecked(data,false,true);
                this.changeCheckbox();
            }
        }
    }
</script>

<style scoped lang="less">
.wrap-select-tree{
    position: absolute;
    width: 0;
    height: 0;
    .dialog-main{
        height: 490px;
        position: relative;
        .main-left{
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 47%;
            border: 1px solid #e0e0e0;
            overflow-x: auto;
        }
        .main-middle{
            position: absolute;
            left: 47%;
            right: 47%;
            top: 0;
            bottom: 0;
            border-top: 1px solid #e0e0e0;
            border-bottom: 1px solid #e0e0e0;
            i{
                position: absolute;
                font-size: 22px;
                top: 48%;
                left: 20%;
                color: #e0e0e0;
            }
        }
        .main-right{
            border: 1px solid #e0e0e0;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 47%;
            overflow-y: auto;
            .right-box{
                margin: 15px 10px;
                i{
                    float: right;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>