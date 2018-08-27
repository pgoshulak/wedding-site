import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/components/pages/Home' /* webpackChunkName: "chunk-home" */)
const Mystery = () => import('@/components/pages/Mystery' /* webpackChunkName: "chunk-mystery" */)
const NotFound = () => import('@/components/pages/NotFound' /* webpackChunkName: "chunk-not-found" */)

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {selector: to.hash, offset: {x: 0, y: 50}}
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/mystery',
      name: '???',
      component: Mystery
    }, {
      path: '/404',
      component: NotFound
    }, {
      path: '*',
      redirect: '/404'
    }
  ]
})
