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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
