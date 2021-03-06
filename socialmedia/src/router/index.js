import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Connect from '../views/Connect.vue'
import UserPage from '../views/UserPage.vue';
import  AllUserPage from '../views/AllUserPage.vue';



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
    path: '/:Your-Profil',
    name: 'UserPage',
    component: UserPage
  },
  {
    path: '/AllUserPage',
    name: 'AllUserPage',
    component: AllUserPage
  },

  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router
