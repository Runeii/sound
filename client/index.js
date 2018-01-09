import './promise-polyfill'
import { app } from './app'
import './global.scss'

// Enable progressive web app support (with offline-plugin)
if (process.env.NODE_ENV === 'production') {
  require('./pwa')
}

app.$mount('#app')
