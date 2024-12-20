import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [{
  // mode: 'history',
  path: '/',
  component: Main,
  children: [{
      path: '/',
      name: 'Home',
      component: () => import( '../views/Home.vue'),
      meta: {
        title: '首页 - QuWei'
      }
    },
    {
      path:'/news',
      name: 'News',
      component: () => import( '../views/News.vue'),
      meta: {
        title: '新闻 - QuWei'
      }
    },
    {
      path: '/news/:id',
      name: 'NewsDetail',
      component: () => import( '../views/NewsDetail.vue'),
      meta: {
        title: '新闻详细 - QuWei'
      }
    },
    {
      path: '/dieshot',
      name: 'dieshot',
      component: () => import('../views/Dieshot.vue'),
      meta: {
        title: 'dieshot - QuWei'
      }
    },
    {
      path: '/dieshot/:id',
      name: 'dieshotDetail',
      component: () => import('../views/DieshotDetail.vue'),
      meta: {
        title: 'dieshot详细 - QuWei'
      }
    },
    {
      path: '/links',
      name: 'Link',
      component: () => import('../views/Link.vue'),
      meta: {
        title: '友链 - QuWei'
      }
    },
    {
      path: '/message',
      name: 'Message',
      component: () => import('../views/Message.vue'),
      meta: {
        title: '留言 - QuWei'
      }
    },
    {
      path:'/product',
      name:'Product',
      component: () => import( '../views/Product.vue'),
      meta: {
        title: '产品 - QuWei'
      }
    },
    {
      path:'/goods/:id',
      name:'Goods',
      component: () => import( '../views/Goods.vue'),
      meta: {
        title: '详细商品 - QuWei'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import( '../views/Login.vue'),
      meta: {
        title: '登录 - QuWei'
      }
    },
    {
      path:'/user',
      name: 'User',
      component: () => import( '../views/User.vue'),
      meta: {
        title: '个人中心 - QuWei'
      },
      // children: [{
      //   path: '/user/info',
      //   name: 'UserInfo',
      //   component: () => import( '../views/UserInfo.vue'),
      //   meta: {
      //     title: '个人中心 - QuWei'
      //   }
      // }, {
      //  path: '/user/password',
      // }
      // ]
    },
    {
      path: '/about',
      name: 'About',
      component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
      meta: {
        title: '关于 - QuWei'
      }
    },
    {
      path: '/article/list/:id',
      name: 'Article',
      component: () => import( /* webpackChunkName: "article" */ '../views/Article.vue'),
      props: true,
      meta: {
        title: '文章详情 - QuWei'
      }
    }
  ]
}, {
  path: '*',
  redirect: '/'
}]

const router = new VueRouter({
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  },
  // base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  // to and from are both route objects
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
