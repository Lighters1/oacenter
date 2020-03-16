<template>
    <div class="post-manager">
        <main-left-slide ref="mainLeftSlide" :slide-list="leftTreeList" :slide-rule="leftTreeRule" @changeSpread="changeMainWidth"></main-left-slide>
        <div class="manager-main" :style="{left:mainStyleLeft}">
            1111111
        </div>
    </div>
</template>

<script>
    import mainLeftSlide from "../../components/mainLeftSlide";
    export default {
        name: "postManager",
        components:{mainLeftSlide},
        data(){
            return {
                //左侧数据
                leftTreeList:[
                    {
                        name:"人资资源和社会保障",
                        id:'11',
                        children:[
                            {
                                name:"杭州市人人力资源保障局",
                                id:"qwefwq",
                                children:[
                                    {
                                        name:"局机关"
                                    },
                                    {
                                        name:"西湖区人才服务中心"
                                    },
                                    {
                                        name:"萧山区人才服务中心"
                                    }
                                ]
                            }
                        ]
                    }
                ],
                leftTreeRule:{
                    label:"name",
                    children:"children"
                },
                initSlideWidth:0,
                //右侧数据
                mainStyleLeft:'30px',
            }
        },
        methods:{
            //改变右侧主题内容宽度
            changeMainWidth(isSpread){
                if(isSpread){
                    this.mainStyleLeft = this.initSlideWidth;
                }else{
                    this.mainStyleLeft = '30px';
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
.post-manager{
    .manager-main{
        position: absolute;
        transition: left 0.3s ease;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
    }
}
</style>