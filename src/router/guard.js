import router from "./index";
import { getToken } from "@/utils/auth";
import asyncRoutes from "./asyncRouterMap"

//全局前置守卫：跳转前拦截
//思路：怎么知道是否去的登录页？通过token可知
router.beforeEach((to,from,next)=>{
    const hasToken=getToken();
    console.log("我是全局前置守卫")
    //取不到token会返回undefined，是false
    if(hasToken){
        if(to.path=="/login"){
            next('/')
        }else{
            //动态添加路由，如果希望访问需要权限的路由，再添加路由
            // console.log("to.name",to.name) 访问不存在的页面被404拦截,打印NotFound
            //判断去一个不存在的页面，就添加路由，404的存在影响了，得把404放在动态路由里
            //再console.log("to.name",to.name) 访问不存在的页面，就会出现null
            if(to.name==null){
                //1、添加路由（是个异步）当路由多时，要使用循环，addRoute只能传单个路由
                for(let i=0;i<asyncRoutes.length;i++){
                    router.addRoute(asyncRoutes[i])
                }
                // router.addRoute({//当前组件import了router,不用this.$router
                //     path:"/attendance",
                //     name:"Attendance",
                //     meta:{auth:["boss","administration"]},
                //     component:()=>import("@/views/AuthView/AuthAttendance")
                // })
                //因为跳转有可能发生再路由添加成功之前，所以要反复执行
                //参数to找不到对应路由的话，就会重复执行，直到找到，走else
                //2、跳转路由
                next({...to,replace:true})//如果路由没加载好，就会一直走这，直到加载好名字了，走else
                //replace:true代表无法点击页面左上角箭头返回上一个页面
                //不加replace:true，就可以直接这么写next(to)
            }else{
                next()
            }
            next()//防止死循环
        }
    }else{
        if(to.path=="/login"){
            next()
        }else{
            next('/login')
        }
    }
})