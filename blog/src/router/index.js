import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import BlogDetail from '../views/BlogDetail.vue'
import BlogEdit from '../views/BlogEdit.vue'
import Blogs from '../views/Blogs.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: { name: 'Blogs' },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: () => import('../views/Blogs.vue'),
  },
  {
    path: '/blog/add',
    name: 'BlogAdd',
    //  meta字段（元数据）
    //  直接在路由配置的时候，给每个路由添加一个自定义的meta对象，在meta对象中可以设置一些状态，来进行一些操作。用它来做登录校验再合适不过了
    meta: {
      requireAuth: true,
    },
    component: BlogEdit,
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail,
  },
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    meta: {
      requireAuth: true,
    },
    component: BlogEdit,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
