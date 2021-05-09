import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Connect from '../views/Connect.vue'
import UserPage from '../views/UserPage.vue';



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Connect',
    name: 'Connect',
    component:Connect
  },
  {
    path: '/ForgetPassword',
    name: 'ForgetPassword',
    component:() => 
    import(/* webpackChunkName: "ForgetPassword" */ '@/views/ForgetPassword'), 
  },
  {
    path: '/SocialMediaHome',
    name: 'SocialMediaHome',
     component: () => 
    import(/* webpackChunkName: "SocialMediaHome" */ '@/views/SocialMediaHome'),
   
  },
  {
      path: '/Admin',
       component: () => 
      import(/* webpackChunkName: "Admin" */ '@/views/Admin'), 
   },
  
    {
    path: '/Your-Profil',
    name: 'UserPage',
    component: UserPage
  },

  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router
