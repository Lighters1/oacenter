<template>
    <div class="index">
        <up-header></up-header>
        <wrap-nav></wrap-nav>
    </div>
</template>

<script>
    import upHeader from "../components/upHeader";
    import wrapNav from "../components/wrapNavigation";
    export default {
        name: "index",
        components:{upHeader,wrapNav}
    }
</script>

<style scoped lang="less">
.index{
    position: absolute;
    top: 0;right: 0;bottom: 0;left: 0;
}
</style>