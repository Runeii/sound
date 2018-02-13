import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuetify from 'vuetify'
const mixins = require('./mixins.js')

sync(store, router)

Vue.mixin({
  methods: {
    convertTimeHHMMSS (val) {
      const hhmmss = new Date(val * 1000).toISOString().substr(11, 8)
      return (hhmmss.indexOf('00:') === 0) ? hhmmss.substr(3) : hhmmss
    },
    formatMilliseconds (val) {
      const decimal = (val / 60000)
      const minutes = Math.floor(decimal)
      const seconds = Math.floor(((decimal - minutes) * 60))
      return (minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds)
    }
  }
})
Vue.use(VueAxios, axios)
Vue.use(Vuetify)

Vue.use(mixins)

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
