import Vue from 'vue'
import Router from 'vue-router'
import Player from '../views/Player'
import Library from '../views/Library'
import Settings from '../views/Settings'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Player
    },
    {
      path: '/library',
      component: Library
    },
    {
      path: '/settings',
      component: Settings
    }
  ]
})
