<template>
    <div class="wrap-navigation">
        <div class="left-navigation" :style="{width: width+'px'}">
            <div class="cut-controller">
                <i @click="changeUpIcon" :class="isCut?'layui-icon layui-icon-spread-left':'layui-icon layui-icon-shrink-right'"></i>
            </div>
            <div class="nav-container">
                <div :class="{'nav-box':true,'active':k==currentLeftNav}" v-for="(v,k) in navList" :style="{color:k==navLeftBarIndex?'#1e9fff':'#fff'}" @mouseout.self="changeBar(-1)" @click="changeLeftNav(k)" @mouseover="changeBar(k)" :key="k">
                    <i :class="v.icon"></i>
                    <span>{{v.name}}</span>
                </div>
                <div class="left-bar" :style="{top:navLeftBarIndex*50+'px'}" v-show="navLeftBarIndex>=0"></div>
            </div>
        </div>
        <div class="right-container" :style="{left:(width+5)+'px'}">
            <div class="right-bar">
                <div class="up-nav-list" ref="upNavList">
                    <div ref="upNavContainer" class="list-container">
                        <template v-for="(v,k) in upNavList">
                            <div :class="{'up-nav':true,'active':currentUpNav==k}" :key="k" v-if="k!=0" @click="changeUpNav(k)" >
                                <span>{{v.name}}</span>
                                <i class="layui-icon layui-icon-close" @click.stop="closeUpNav(k)"></i>
                            </div>
                        </template>
                    </div>
                </div>
                <i class="layui-icon layui-icon-prev" @click="upToLeft(-1)"></i>
                <i class="layui-icon layui-icon-next" @click="upToLeft(1)"></i>
                <i :class="{'layui-icon':true,'layui-icon-home':true,'active':currentUpNav==0}" @click="changeUpNav(0)"></i>
                <div class="right-drop" @mouseover="showDrop=true" @mouseout="showDrop=false">
                    <i class="layui-icon layui-icon-down"></i>
                    <div class="down-list" v-show="showDrop">
                        <div class="down-box" @click="closeUpNav(currentUpNav)">关闭当前标签</div>
                        <div class="down-box bdt" @click="closeUpOthers">关闭其他标签</div>
                        <div class="down-box bdt" @click="closeUpAll">关闭全部标签</div>
                    </div>
                </div>
            </div>
            <keep-alive :include="aliveList">
                <router-view class="router-container"></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    export default {
        name: "wrapNav",
        data:function () {
            return {
                width:180,
                isCut:false,
                navLeftBarIndex:-1,
                showDrop:false,
                //全部菜单
                navList:[
                    {
                        name:"主页",
                        icon:"layui-icon layui-icon-home",
                        link:"/home"
                    },
                    {
                        name:"系统注册",
                        icon:"layui-icon layui-icon-template-1",
                        link:"/systemRegister"
                    },
                    {
                        name:"功能注册",
                        icon:"layui-icon layui-icon-app",
                        link:"/functionRegister"
                    },
                    {
                        name:"部门管理",
                        icon:"layui-icon layui-icon-table",
                        link:"/departManager"
                    },
                    {
                        name:"岗位管理",
                        icon:"layui-icon layui-icon-flag",
                        link:"/postManager"
                    },
                    {
                        name:"岗位权限",
                        icon:"layui-icon layui-icon-key",
                        link:"/postAuthor"
                    },
                    {
                        name:"角色管理",
                        icon:"layui-icon layui-icon-username",
                        link:"/roleManager"
                    },
                    {
                        name:"人员信息",
                        icon:"layui-icon layui-icon-list",
                        link:"/staffInformation"
                    },
                    {
                        name:"系统日志",
                        icon:"layui-icon layui-icon-component",
                        link:"/systemLog"
                    }
                ],
                currentLeftNav:-1,
                //当前激活菜单
                upNavList:[],
                currentUpNav:-1
            }
        },
        computed:{
            //根据up清理缓存页面
            aliveList (){
                var list = [];
                this.upNavList.forEach(function(v){
                    list.push(v.link.slice(1))
                });
                return list;
            }
        },
        methods:{
            //点击左侧顶部图标切换左侧宽度
            changeUpIcon(){
                if(this.isCut){
                    //切换宽度
                    this.width = 180;
                }else{
                    //切换宽度
                    this.width = 55;
                }
                this.isCut = !this.isCut;
            },
            //左侧菜单悬停蓝条移动
            changeBar(k){
                this.navLeftBarIndex = k;
            },
            //点击左侧菜单切换路由
            changeLeftNav(index){
                this.currentLeftNav = index;
                //检查重复判断是否需要新增到顶部
                var isExist = false;
                for(var i=0;i<this.upNavList.length;i++){
                    if(this.upNavList[i].link == this.navList[index].link){
                        this.currentUpNav = i;
                        isExist = true;
                    }
                }
                if(!isExist){
                    this.upNavList.push(this.navList[index]);
                    this.currentUpNav = this.upNavList.length -1;
                }
            },
            //顶部up菜单点击改变路由
            changeUpNav(index){
                //改变顶部指针
                this.currentUpNav = index;
                //再改变左侧高亮
                for (var i=0;i<this.navList.length;i++){
                    if(this.navList[i].link == this.upNavList[index].link){
                        //改变左侧指针
                        this.currentLeftNav = i
                    }
                }
            },
            //关闭顶部up菜单
            closeUpNav(index){
                if(index == 0){
                    return false
                }
                if(index > this.currentUpNav){
                    //关闭的当前后面的标签
                    this.upNavList.splice(index,1);
                }else if(index == this.currentUpNav){
                    //关闭当前标签
                    //默认后位进一
                    if(index == this.upNavList.length -1 ){
                        this.currentUpNav = this.currentUpNav -1;
                        this.upNavList.splice(index,1);
                        for (var i=0;i<this.navList.length;i++){
                            //当前为最后一个
                            if(this.navList[i].link == this.upNavList[index-1].link){
                                //改变左侧指针
                                this.currentLeftNav = i
                            }
                        }
                    }else{
                        //当前非最后一个
                        this.upNavList.splice(index,1);
                        for (var j=0;j<this.navList.length;j++){
                            if(this.navList[j].link == this.upNavList[index].link){
                                //改变左侧指针
                                this.currentLeftNav = j
                            }
                        }
                    }
                }else if(index < this.currentUpNav){
                    //关闭前面的
                    this.upNavList.splice(index,1);
                    this.currentUpNav = this.currentUpNav - 1;
                }
            },
            //关闭顶部全部标签
            closeUpAll(){
                this.currentUpNav = 0;
                this.currentLeftNav = 0;
                this.upNavList.splice(1);
            },
            //关闭其他标签
            closeUpOthers(){
                if (this.currentUpNav == 0){
                    this.upNavList.splice(1);
                }else{
                    this.upNavList[1] = this.upNavList[this.currentUpNav];
                    this.currentUpNav = 1;
                    this.upNavList.splice(2);
                }

            },
            //顶部左右滚动
            upToLeft(order){
                 var containerWidth = this.$refs.upNavList.clientWidth;
                 var upNavListWidth = this.$refs.upNavContainer.clientWidth;
                 var outWidth = containerWidth  - upNavListWidth;
                 if(outWidth<0){
                     if(order > 0 ){
                         this.$refs.upNavContainer.style.left = outWidth+'px';
                     }else{
                         this.$refs.upNavContainer.style.left = 0;
                     }
                 }
            }
        },
        mounted() {
            //初始化先将home放入
            this.upNavList.push(this.navList[0]);
            //根据当期路由初始化高亮当前菜单
            for (var i=0;i<this.navList.length;i++){
                var rst = this.navList[i].link.match(this.$route.fullPath);
                if(rst){
                    if(i==0){
                        //当前路由为首页
                        this.currentUpNav = 0;
                        this.currentLeftNav = 0;
                    }else{
                        //当前路由为其他
                        this.currentUpNav = 1;
                        this.currentLeftNav = i;
                        this.upNavList.push(this.navList[i])
                    }
                }
            }
        },
        watch:{
            currentLeftNav:function(newValue){
                this.$router.push({path:this.navList[newValue].link});
            }
        }
    }
</script>

<style scoped lang="less">
    .wrap-navigation{
        padding-top: 5px;
        position: absolute;
        top: 40px;
        bottom: 0;
        width: 100%;
        .left-navigation{
            position: absolute;
            top: 5px;left: 0;bottom: 0;
            box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
            transition: width 0.3s ease;
            .cut-controller{
                height: 40px;
                line-height: 40px;
                background: #fff;
                text-align: center;
                i{
                    cursor: pointer;
                }
            }
            .nav-container{
                background: #344058;
                position: absolute;
                top: 40px;
                width: 100%;
                bottom: 0;
                overflow-y: auto;
                .nav-box{
                    height: 50px;
                    line-height: 50px;
                    cursor: pointer;
                    overflow: hidden;
                    white-space: nowrap;
                    color: #fff;
                    padding: 0 20px;
                    position: relative;
                    user-select: none;
                    &.active{
                        background: @bgBlue;
                        i,span{
                            color: #fff;
                        }
                    }
                    i{
                        font-size: 20px;
                        vertical-align: bottom;
                    }
                    span{
                        padding-left: 20px;
                        font-size: 16px;
                    }
                }
                .left-bar{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 5px;
                    height: 50px;
                    transition: top 0.3s ease;
                    background: @bgBlue;
                }
            }
        }
        .right-container{
            position: absolute;
            top: 5px;
            right: 0;
            bottom: 0;
            transition: left 0.3s ease;
            border-radius: 2px;
            .right-bar{
                height: 40px;
                position: absolute;
                top: 0;left: 0;right: 0;
                background: #fff;
                box-shadow: 0 0 12px 0 rgba(0,0,0,0.1);
                z-index: 2;
                .layui-icon-prev{
                    background: #fff;
                    position: absolute;
                    left: 0;top: 0;bottom: 0;
                    width: 40px;
                    line-height: 40px;
                    text-align: center;
                    border-right: 1px solid @bgGray;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                    &:hover{
                        background: @bgGray;
                    }
                }
                .layui-icon-next{
                    background: #fff;
                    position: absolute;
                    right: 40px;top: 0;bottom: 0;
                    width: 40px;
                    line-height: 40px;
                    text-align: center;
                    border-left: 1px solid @bgGray;
                    border-right: 1px solid @bgGray;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                    &:hover{
                        background: @bgGray;
                    }
                }
                .layui-icon-home{
                    background: #fff;
                    position: absolute;
                    left: 40px;
                    top: 0;bottom: 0;
                    width: 40px;
                    line-height: 40px;
                    text-align: center;
                    border-right: 1px solid @bgGray;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    &:hover{
                        background: @bgGray;
                    }
                    &::after{
                        content: "";
                        position: absolute;
                        transition: all 0.3s ease;
                        left: 50%;
                        right: 50%;
                        top: 0;
                        height: 2px;
                        background: @bgBlue;
                    }
                    &.active::after{
                        left: 0;right: 0;
                    }
                }
                .right-drop{
                    background: #fff;
                    position: absolute;
                    right: 0;top: 0;bottom: 0;
                    width: 40px;
                    line-height: 40px;
                    text-align: center;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                    &:hover{
                        background: @bgGray;
                    }
                    .down-list{
                        position: absolute;
                        background: #fff;
                        top: 41px;right: 0;
                        border: 2px solid @bgGray;
                        box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
                        width: 120px;
                        z-index: 1;
                        .down-box{
                            user-select: none;
                            transition: background-color 0.3s ease;
                            &:hover{
                                background: @bgGray;
                            }
                            &.bdt{
                                border-top: 2px solid @bgGray;
                            }
                        }
                    }
                }
                .up-nav-list{
                    position: absolute;
                    left: 82px;
                    top: 0;
                    bottom: 0;
                    right: 82px;
                    overflow: hidden;
                    .list-container{
                        position: absolute;
                        left: 0;top: 0;
                        bottom: 0;
                        transition: all 0.3s ease;
                        white-space: nowrap;
                        .up-nav{
                            height: 40px;
                            line-height: 40px;
                            display: inline-block;
                            padding: 0 15px;
                            border-right: 1px solid @bgGray;
                            transition: background-color 0.3s ease;
                            cursor: pointer;
                            user-select: none;
                            position: relative;
                            &:hover{
                                background: @bgGray;
                            }
                            span{
                                padding-right: 20px;
                            }
                            i{
                                font-size: 14px;
                                vertical-align: middle;
                            }
                            &::before{
                                content: "";
                                position: absolute;
                                transition: all 0.3s ease;
                                left: 50%;
                                right: 50%;
                                top: 0;
                                height: 2px;
                                background: @bgBlue;
                            }
                            &.active::before{
                                left: 0;right: 0;
                            }
                        }
                    }

                }
            }
            .router-container{
                position: absolute;
                left: 0;
                top: 42px;
                right: 0;
                bottom: 0;
                background: #fff;
                overflow-y: auto;
            }
        }
    }
</style>