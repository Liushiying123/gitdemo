import axios from "axios";
import { Message } from "element-ui";
import { getToken } from "./auth";

const service=axios.create({
    baseURL:"http://localhost:8080",
    timeout:3000
})

//请求拦截器
service.interceptors.request.use((config)=>{
    if(getToken()){
        config.headers.token=getToken()//第一次登录接口不需要加token 
        //token就是一个令牌，不用再验证身份，可直接请求数据 
    }      
    return config//一定要return出来
},()=>{
    Message({//elementUi
        type:"error",
        message:"请求错误"
        //如果mock里有message参数，会优先选择mock里的message
    })
    return Promise.reject(new Error("请求错误"))
    //Promise.reject(reason);reason表示Promise被拒绝的原因
})

//响应拦截器
service.interceptors.response.use((res)=>{
    const result=res.data;
    if(result.success){
        return result
    }else{
        Message({//elementUi
            type:"error",
            message:result.message||"请求错误"
        })
        return Promise.reject(new Error(result.message||"请求错误"))
    }
},()=>{
    Message({//elementUi
        type:"error",
        message:"请求错误"
    })
    return Promise.reject(new Error("请求错误"))
})

//导出
export default service