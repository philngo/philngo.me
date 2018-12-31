import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/writing',
      name: 'writing',
      component: () => import('./views/Writing.vue')
    },
    {
      path: '/personal',
      name: 'personal',
      component: () => import('./views/Personal.vue')
    },
    {
      path: '/professional',
      name: 'professional',
      component: () => import('./views/Professional.vue')
    },
    {
      path: '/:year/:month/:day/:slug',
      name: 'article',
      component: () => import(/* webpackChunkName: "articles" */ './views/Article.vue')
    },
    {
      path: '*',
      name: 'error-404',
      component: () => import('./views/Error404.vue')
    }
  ]
})
