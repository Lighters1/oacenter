import Axios from 'axios';

Axios.defaults.timeout = 5000;
Axios.defaults.baseURL = 'http://localhost:8096'

//http request 拦截器
Axios.interceptors.request.use(config => {
        return config;
    }, error => {
        return error;
    }
);

//http response 拦截器
Axios.interceptors.response.use(response => {
        if(response.status == 200){
            //主要是想过滤掉第一层，减少代码量
            return response.data;
        }else {
            return {
                code:555,
                msg:"网络链接失败"
            }
        }

    }, error => {
        return error;
    }
)

export default Axios;