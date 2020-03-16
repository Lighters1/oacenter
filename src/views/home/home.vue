<template>
    <div class="home">
        <h2>联系我们</h2>
        <div class="main">
            <table>
                <tr>
                    <td>产品开发 :</td>
                    <td>杭州思达电子科技发展有限公司</td>
                    <td>官方网站 :</td>
                    <td>http://www.hzst.com</td>
                </tr>
                <tr>
                    <td>联系电话 :</td>
                    <td>0571-88930567</td>
                    <td>公司地址 :</td>
                    <td>中国杭州翠柏路6号3号楼2层</td>
                </tr>
                <tr>
                    <td>公司传真 :</td>
                    <td>0571-88930567</td>
                    <td>电子邮件 :</td>
                    <td>Service@hzst.com</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "home"
    }
</script>

<style scoped lang="less">
.home{
    &>h2{
        margin: 20px 15px;
        padding-bottom: 10px;
        font-weight: bold;
        color: @bgBlue;
        border-bottom: 2px solid @bgGray;
        letter-spacing: 2px;
    }
    .main{
        &>table{
            width: 100%;
            tr{
                td{
                    padding: 20px;
                    font-size: 18px;
                    &:nth-child(odd){
                        text-align: center;
                    }
                }
            }
        }
    }
}
</style>