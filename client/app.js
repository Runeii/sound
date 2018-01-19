import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuetify from 'vuetify'
const DB = require('./db.js')

sync(store, router)

Vue.mixin({
  methods: {
    convertTimeHHMMSS (val) {
      const hhmmss = new Date(val * 1000).toISOString().substr(11, 8)
      return (hhmmss.indexOf('00:') === 0) ? hhmmss.substr(3) : hhmmss
    }
  }
})
Vue.use(VueAxios, axios)
Vue.use(Vuetify)

Vue.use(DB)

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
