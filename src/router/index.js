import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/components/pages/Home' /* webpackChunkName: "chunk-home" */)
const OurStory = () => import('@/components/pages/OurStory' /* webpackChunkName: "chunk-our-story" */)
const Location = () => import('@/components/pages/Location' /* webpackChunkName: "chunk-location" */)
const Accommodations = () => import('@/components/pages/Accommodations' /* webpackChunkName: "chunk-accomodations" */)
const Rsvp = () => import('@/components/pages/Rsvp' /* webpackChunkName: "chunk-rsvp" */)
const AddressSurvey = () => import('@/components/pages/AddressSurvey' /* webpackChunkName: "chunk-address-survey" */)
const Registry = () => import('@/components/pages/Registry' /* webpackChunkName: "chunk-registry" */)
const Photos = () => import('@/components/pages/Photos' /* webpackChunkName: "chunk-photos" */)

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
      path: '/address-survey',
      name: 'Address Survey',
      component: AddressSurvey
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
