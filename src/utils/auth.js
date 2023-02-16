export function setToken(token){//调用这个方法就把token存上
    sessionStorage.setItem('token',token)
}
export function getToken(){
    return sessionStorage.getItem("token")//取token值
}
export function removeToken(){//退出登录时要删token
    sessionStorage.clear()
}