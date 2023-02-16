//封装get和post请求为函数
import service from "./service";//需要输入

//普通导出
export function get(url,params){
    // service({})正常是这么写
    const config={
        method:'get',
        url//url:url
    }
    if(params){//这步为了判断params是否为空的情况
        config.params=params
    }
    return service(config) //promise,因为axios是promise API
}

export function post(url,params){
    const config={
        method:'post',
        url
    }
    if(params){
        config.data=params
    }  
    return service(config)
}