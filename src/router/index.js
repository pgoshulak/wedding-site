import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/components/pages/Home' /* webpackChunkName: "chunk-home" */)
const OurStory = () => import('@/components/pages/OurStory' /* webpackChunkName: "chunk-our-story" */)
const Location = () => import('@/components/pages/Location' /* webpackChunkName: "chunk-location" */)
const AddressSurvey = () => import('@/components/pages/AddressSurvey' /* webpackChunkName: "chunk-address-survey" */)
const Registry = () => import('@/components/pages/Registry' /* webpackChunkName: "chunk-registry" */)
const Photos = () => import('@/components/pages/Photos' /* webpackChunkName: "chunk-photos" */)

const ConfirmSubmit = () => import('@/components/pages/AddressSurvey/ConfirmSubmit' /* webpackChunkName: "chunk-confirm-submit" */)
const ConfirmReject = () => import('@/components/pages/AddressSurvey/ConfirmReject' /* webpackChunkName: "chunk-confirm-reject" */)

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
    },
    {
      path: '/confirm-submit',
      name: 'ConfirmSubmit',
      component: ConfirmSubmit
    },
    {
      path: '/confirm-reject',
      name: 'ConfirmReject',
      component: ConfirmReject
    }
  ]
})
