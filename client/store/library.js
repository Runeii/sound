import Vue from 'vue'
import Vuex from 'vuex'
import Nedb from 'nedb'
import { remote } from 'electron'

const db = new Nedb({ filename: remote.app.getPath('userData') + '/database.db', autoload: true })

Vue.use(Vuex)

const state = {
  records: []
}

const getters = {
}

const mutations = {
  STORE_TRACKS (state, data) {
    state.records = data
  }
}

const actions = {
  getTracks ({ commit }) {
    db.find({}, { artist: 1, title: 1, album: 1 }, function (err, docs) {
      console.log(err)
      commit('STORE_TRACKS', docs)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
