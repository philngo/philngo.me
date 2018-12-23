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
      component: () => import(/* webpackChunkName: "writing" */ './views/Writing.vue')
    },
    {
      path: '/personal',
      name: 'personal',
      component: () => import(/* webpackChunkName: "personal" */ './views/Personal.vue')
    },
    {
      path: '/professional',
      name: 'professional',
      component: () => import(/* webpackChunkName: "professional" */ './views/Professional.vue')
    }
  ]
})
