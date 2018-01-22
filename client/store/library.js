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
  INSERT_TRACK (state, data) {
    console.log('huh')
    state.records.push(data)
  },
  STORE_TRACKS (state, data) {
    state.records = data
  }
}

const actions = {
  getTracks ({ commit }) {
    db.find({}, { Artist: 1, Name: 1, Album: 1 }, function (err, docs) {
      commit('STORE_TRACKS', docs)
    })
  },
  addTrack ({ commit }, data) {
    db.insert(data, function (err, newDoc) {
      commit('INSERT_TRACK', newDoc)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
