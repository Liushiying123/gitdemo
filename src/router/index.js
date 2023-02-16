import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routerMap'
//因为模块化是静态执行，导航守卫里运用了router，在这里导入导航守卫时，下面的router还没创建
Vue.use(VueRouter)



const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
