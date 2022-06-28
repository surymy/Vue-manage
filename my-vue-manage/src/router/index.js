import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from './view/Home'

Vue.use(VueRouter)

export default new VueRouter({
   routes: [
     {
       path: '/',
       name: 'Home',
       component: () => import('../views/Home') 
     },
     {
       path: '/user',
       name: 'User',
       component: () => import('../views/User')
     }
   ]
})