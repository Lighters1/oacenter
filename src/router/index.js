import Vue from 'vue'
import Router from 'vue-router'

//防止自身跳转报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

Vue.use(Router);

var router = new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component:resolve => require(['@/views/index'],resolve),
            redirect:"/home",
            children:[
                {
                    path:"/home",
                    name:"Home",
                    component:resolve => require(['@/views/home/home'],resolve)
                },
                {
                    path:"/systemRegister",
                    name:"SystemRegister",
                    component:resolve => require(['@/views/systemRegister/systemRegister'],resolve)
                },
                {
                    path:"/functionRegister",
                    name:"FunctionRegister",
                    component:resolve => require(['@/views/functionRegister/functionRegister'],resolve)
                },
                {
                    path:"/departManager",
                    name:"DepartManager",
                    component:resolve => require(['@/views/departManager/departManager'],resolve)
                },
                {
                    path:"/postManager",
                    name:"PostManager",
                    component:resolve => require(['@/views/postManager/postManager'],resolve)
                },
                {
                    path:"/postAuthor",
                    name:"PostAuthor",
                    component:resolve => require(['@/views/postAuthor/postAuthor'],resolve)
                },
                {
                    path:"/roleManager",
                    name:"RoleManager",
                    component:resolve => require(['@/views/roleManager/roleManager'],resolve)
                },
                {
                    path:"/staffInformation",
                    name:"StaffInformation",
                    component:resolve => require(['@/views/staffInformation/staffInformation'],resolve)
                },
                {
                    path:"/systemLog",
                    name:"SystemLog",
                    component:resolve => require(['@/views/systemLog/systemLog'],resolve)
                },
            ]
        }
    ]
});

//路由守卫
router.beforeEach(function(to,from,next){
    next();
});

export default router;