import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Apart from '@/components/Apart'
import ArticleList from '@/components/ArticleList'
import ShoppingMall from '@/components/ShoppingMall'
import Cart from '@/components/Cart'
import PersonalCenter from '@/components/PersonalCenter'
import Forget from '@/components/Forget'
import House from '@/components/House'
import ChangePwd from '@/components/ChangePwd'
import Modal from '@/components/Modal'
import ApartInfo from '@/components/ApartInfo'
import Details from '@/components/Details'
import SetMeal from '@/components/SetMeal'
import Developer from '@/components/Developer'
import Admin from '@/components/Admin'
import ArticleDetails from '@/components/ArticleDetails'

Vue.use(Router);

export default new Router({
  routes: [
    // 将组件添加到路由
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/apart',
      name: 'Apart',
      component: Apart,
    },
    {
      path: '/house',
      name: 'House',
      component: House,
    },
    {
      path: '/articlelist',
      name: 'ArticleList',
      component: ArticleList,
    },
    {
      path: '/shoppingmall',
      name: 'ShoppingMall',
      component: ShoppingMall,
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
    },
    {
      path: '/personalcenter',
      name: 'PersonalCenter',
      component: PersonalCenter,
    },
    {
      path: '/forget',
      name: 'Forget',
      component: Forget,
    },
    {
      path: '/changepwd',
      name: 'ChangePwd',
      component: ChangePwd,
    },
    {
      path: '/modal',
      name: 'Modal',
      component: Modal,
    },
    {
      path: '/articledetails',
      name: 'ArticleDetails',
      component: ArticleDetails,
    },
    {
      path: '/apartinfo',
      name: 'ApartInfo',
      component: ApartInfo,
    },
    {
      path: '/details',
      name: 'Details',
      component: Details,
    },
    {
      path: '/setMeal',
      name: 'SetMeal',
      component: SetMeal,
    },
    {
      path: '/developer',
      name: 'Developer',
      component: Developer,
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
    },

  ]
})
