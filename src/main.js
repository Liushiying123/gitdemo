import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "@/common/reset.css"
import "@/common/rule.css"
import '@/mock/mock'//不用导出，直接import，js后缀可省略
import "@/router/guard"//将导航守卫引入，不能再index.js里导入，因为模块化是静态执行


Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
