import Vue from 'vue'
import App from './App.vue'
// 引入element-ui插件极其样式
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入css样式表
import './assets/less/index.less'

// 引入router
import router from './router'
//  引入 store
import store from './store'
// 引入axios
import http from 'axios'
// 引入mock
import '../api/mock.js'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
