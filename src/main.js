import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './router/index.js'
Vue.config.productionTip = process.env.NODE_ENV === 'development'
Vue.use(VueRouter)
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})
// console.log(process.env._config.components)
// console.log(process.env._config)
import a from 'E:/easy-admin/easy-admin-demo/node_modules/vue-element-ui-expand'
console.log(a)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
