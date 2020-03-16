<template>
    <div class="main-left-slide" ref="mainLeftSlide" :style="{width: isSpread?currentWidth:'30px'}">
        <div v-show="isSpread">
            <slot name="up" v-show="isSpread"></slot>

            <el-tree ref="elTree" node-key="id"
                     :data="treeList"
                     :props="treeRule"
                     :default-expand-all="false"
                     :default-expanded-keys="treeSpread"
                     @node-click="clickTreeNode">
            <span slot-scope="{node}" class="fm-text-eclipse">
                <span :title="node.label" style="padding: 0 5px;">{{node.label}}</span>
            </span>
            </el-tree>

        </div>

        <div class="spread-icon" @click="changeSpread">
            <i :class="isSpread?'el-icon-d-arrow-left':'el-icon-d-arrow-right'"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mainLeftSlide",
        props:['slideList','slideRule','slideSpread'],
        data(){
            return {
                treeRule:this.slideRule,
                treeList:this.slideList,
                treeSpread:this.slideSpread || [this.slideList[0].id],
                isSpread:true,
                currentWidth:'auto'
            }
        },
        methods:{
            clickTreeNode(data){
                this.$emit('clickTreeNode',data)
            },
            changeSpread(){
                this.isSpread = !this.isSpread;
                this.$emit('changeSpread',this.isSpread);
            }
        },
        mounted() {
            this.currentWidth = this.$refs.mainLeftSlide.clientWidth + 'px'
        }
    }
</script>

<style scoped lang="less">
.main-left-slide{
    background: #fff;
    transition: width 0.3s ease;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
    overflow-y: auto;
    z-index: 2;
    border-right: 2px solid #f8f8f8;
    padding-top: 10px;
    .spread-icon{
        position: absolute;
        top: 45%;
        right: 5px;
        cursor: pointer;
        i{
            font-size: 18px;
        }
    }
}
</style>