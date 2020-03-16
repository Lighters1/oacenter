<template>
    <div class="header-bar">
        <span class="system-name">统一验证中心</span>
        <div class="right-tip">
            <span>
                <i class="layui-icon layui-icon-username"></i>
                <span>欢迎您：</span>
                <a href="javascript:void(0);">管理员</a>
            </span>
            <span>
                <i class="layui-icon layui-icon-password"></i>
                <span>
                    <a href="javascript:void(0);">修改密码</a>
                </span>
            </span>
            <span>
                <i class="layui-icon layui-icon-logout"></i>
                <span>
                    <a href="javascript:void(0);">安全退出</a>
                </span>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "upHeader"
    }
</script>

<style scoped lang="less">
.header-bar{
    background: @bgBlue;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    color: #fff;
    span{
        padding: 5px;
        user-select: none;
    }
    a{
        color: #fff;
        &:hover{
            text-decoration: none;
        }
    }
    i{
        vertical-align: middle;
    }
    .system-name{
        font-size: 20px;
    }
    .right-tip{
        float: right;
        a:hover{
            color: #960405;
        }
    }
}
</style>