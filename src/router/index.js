import Vue from 'vue'
import Router from 'vue-router'
import {pw as ADMIN_PASSWORD} from '../../service/firebase.js'

const DEV_MODE_SKIP_ADMIN_PASSWORD = false

<<<<<<< HEAD
const Home = () => import('@/components/pages/Home')
const OurStory = () => import('@/components/pages/OurStory')
const Location = () => import('@/components/pages/Location')
const Accommodations = () => import('@/components/pages/Accommodations')
const Rsvp = () => import('@/components/pages/Rsvp')
const Registry = () => import('@/components/pages/Registry')
const Photos = () => import('@/components/pages/Photos')
const Admin = () => import('@/components/pages/Admin')
=======
const Home = () => import('@/components/pages/Home' /* webpackChunkName: "chunk-home" */)
const OurStory = () => import('@/components/pages/OurStory' /* webpackChunkName: "chunk-our-story" */)
const Location = () => import('@/components/pages/Location' /* webpackChunkName: "chunk-location" */)
const Accommodations = () => import('@/components/pages/Accommodations' /* webpackChunkName: "chunk-accomodations" */)
const Rsvp = () => import('@/components/pages/Rsvp' /* webpackChunkName: "chunk-rsvp" */)
const Registry = () => import('@/components/pages/registry' /* webpackChunkName: "chunk-registry" */)
const Photos = () => import('@/components/pages/photos' /* webpackChunkName: "chunk-photos" */)
const Admin = () => import('@/components/pages/admin' /* webpackChunkName: "chunk-admin" */)
>>>>>>> webpack-chunking

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/our-story',
      name: 'OurStory',
      component: OurStory
    },
    {
      path: '/location',
      name: 'Location',
      component: Location
    },
    {
      path: '/accommodations',
      name: 'Accommodations',
      component: Accommodations
    },
    {
      path: '/rsvp',
      name: 'RSVP',
      component: Rsvp
    },
    {
      path: '/registry',
      name: 'Registry',
      component: Registry
    },
    {
      path: '/photos',
      name: 'Photos',
      component: Photos
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      beforeEnter: (to, from, next) => {
        if (DEV_MODE_SKIP_ADMIN_PASSWORD) {
          next()
          return
        }
        const passwordInput = window.prompt('Password:')
        if (passwordInput === ADMIN_PASSWORD) {
          next()
        } else {
          next(false)
        }
      }
    }
  ]
})
