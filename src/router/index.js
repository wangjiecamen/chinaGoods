import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Cookie from 'js-cookie'
import asideBar from '@/enums/asideBar'

Vue.use(Router)

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

const router = new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  // base:'./',
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/pages/dashboard')
    },
    {
      path: '/register',
      name: "register",
      component: () => import('@/pages/register')
    },
    {
      path: '/member',
      name: 'member',
      redirect: '/member/order',
      component: () => import('@/layout'),
      children: [
        {
          path: 'order',
          name: 'order',
          redirect: 'order/index',
          component: () => import('@/pages/member'),
          children: [
            {
              path: 'index',
              name: 'orderList',
              component: () => import('@/pages/member/order'),
            },
            {
              path: 'collect',
              name: 'Collect',
              component: () => import('@/pages/member/collect'),
            },
            {
              path: 'address',
              name: 'address',
              component: () => import('@/pages/member/address')
            }
          ]
        },
        {
          path: 'orderDetail',
          name: 'orderDetail',
          component: () => import('@/pages/member/orderDetail')
        },
        {
          path: '/member/:id(\\d+)/detail',
          name: 'orderEdit',
          component: () => import('@/pages/member/orderDetail')
        }
      ]
    },
    {
      path: '/application',
      name: "application",
      component: () => import('@/pages/application')
    },
    {
      path: '/freetoyiwu',
      name: "freetoyiwu",
      component: () => import('@/pages/application')
    }
  ]
})

// 当前侧边栏高亮
function getActiveAside (to, from, next) {
  let list = asideBar.$getValues()
  let index = list.findIndex(item => {
    return item.url === to.path
  })
  if (index !== -1) {
    store.dispatch('user/setActiveIndex', index)
  }
}

router.beforeEach((to, from, next) => {
  // 实现关闭浏览器，cookie失效时（token被清空），清空本地name
  let token = store && store.getters['user/token']
  let noToken = ['/register', '/application', '/freetoyiwu']
  if (noToken.indexOf(to.path) === -1 && !token) {
    localStorage.removeItem('name')
    to.path === '/dashboard' ? next() : next({ path: '/dashboard' })
  } else {
    getActiveAside(to, from, next)
    next()
  }

})

export default router
