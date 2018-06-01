// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import VueLazyLoad from 'vue-lazyload'
import VueTouch from 'vue-touch'
import 'vue-material/dist/vue-material.min.css'
import 'vue-image-lightbox/dist/vue-image-lightbox.min.css'

import firebase from 'firebase/app'
import 'firebase/firestore'
import { firebaseConfig } from '../secrets.js'

Vue.use(VueLazyLoad)
Vue.use(VueTouch, {
  name: 'v-touch'
})
/* import {
  MdIcon,
  MdButton
} from 'vue-material/dist/components' */
// import MdIcon from 'vue-material/dist/components'

Vue.config.productionTip = false

Vue.use(VueMaterial)
// Vue.use(MdButton)
// Vue.use(VueMaterial)

// https://medium.com/vue-mastery/full-stack-vue-js-with-firestore-62e2fe2ec1f3
const firebaseApp = firebase.initializeApp(firebaseConfig)
export const db = firebaseApp.firestore()
db.settings({
  timestampsInSnapshots: true
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
