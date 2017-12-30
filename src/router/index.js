import Vue from 'vue'
import Router from 'vue-router'
/* import Home from '@/components/pages/Home'
import OurStory from '@/components/pages/OurStory'
import Location from '@/components/pages/Location'
import Accommodations from '@/components/pages/Accommodations'
import Rsvp from '@/components/pages/Rsvp'
import Registry from '@/components/pages/registry'
import Photos from '@/components/pages/photos' */

const Home = () => import('@/components/pages/Home')
const OurStory = () => import('@/components/pages/OurStory')
const Location = () => import('@/components/pages/Location')
const Accommodations = () => import('@/components/pages/Accommodations')
const Rsvp = () => import('@/components/pages/Rsvp')
const Registry = () => import('@/components/pages/registry')
const Photos = () => import('@/components/pages/photos')

Vue.use(Router)

export default new Router({
  mode: 'history',
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
    }
  ]
})
