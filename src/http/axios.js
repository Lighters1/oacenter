import Axios from 'axios';
import Vue from "vue";


Axios.defaults.timeout = 5000;
Axios.defaults.baseURL = 'http://localhost:9645'

//http request 拦截器
Axios.interceptors.request.use(config => {
        return config;
    }, error => {
        return error;
    }
);

//http response 拦截器
Axios.interceptors.response.use(response => {
        //网络情况
        if(response.status == 200){
            //拦截返回的错误信息
            if(response.data.code == 555){
                Vue.prototype.$message.error(response.data.msg);
                return false;
            }
            return response.data;
        }else {
            Vue.prototype.$message.error("服务器错误");
            return false;
        }
    }, error => {
        Vue.prototype.$message.error(error.message);
        return false;
    }
)

export default Axios;