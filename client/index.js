import './promise-polyfill'
import './polyfills'

import { app } from './app'
import './global.scss'
import '../node_modules/vuetify/dist/vuetify.min.css'
const isCordovaApp = !!window.cordova

// Enable progressive web app support (with offline-plugin)
if (process.env.NODE_ENV === 'production') {
  require('./pwa')
}

app.$mount('#app')

document.addEventListener("deviceready", onDeviceReady, false)

function onDeviceReady () {
  console.log('Device is ready!')
  console.log(isCordovaApp)
}

if (isCordovaApp) {
  console.log('This is cordova')
  document.addEventListener('deviceready', app.$mount('#app'), false)
}
