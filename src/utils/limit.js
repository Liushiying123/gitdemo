export function setLimit(role){
    sessionStorage.setItem('role',role)
}
export function getLimit(){
    return sessionStorage.getLItem("role")
}
export function removeLimit(){
    sessionStorage.clear()
}