import Vue from 'vue'
import App from './App.vue'


//工具方法
import tool from "./assets/tool";
//axios
import axios from "./http/axios";
//路由
import router from './router/index';
//全局vuex
import store from "./vuex/index";
//全局样式
import "./assets/reset.css";
//element-ui
import ElementUi from 'element-ui';
//公共样式
import "./assets/common.css";


import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUi);

Vue.config.productionTip = false;
//添加全局变量方便调用
Vue.prototype.tool = tool;
Vue.prototype.$axios = axios;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
