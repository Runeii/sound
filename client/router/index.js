import Vue from 'vue'
import Router from 'vue-router'
import Player from '../views/Player'
import Library from '../views/Library'
import Import from '../views/Import'
import Sync from '../views/Sync'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Player,
      name: 'Now Playing'
    },
    {
      path: '/library',
      component: Library,
      name: 'Library'
    },
    {
      path: '/import',
      component: Import,
      name: 'Import'
    },
    {
      path: '/sync',
      component: Sync,
      name: 'Sync'
    }
  ]
})
