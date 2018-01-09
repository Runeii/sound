import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  records: {
    artists: [],
    albums: [],
    tracks: []
  }
} 

const getters = {
}

const mutations = {
  STORE_TRACKS (state, data) {
    Vue.set(state.records, 'tracks', data)
  }
}

const actions = {
  getTracks ({ commit }) {
    axios.get('/db/library').then(response => {
      commit('STORE_TRACKS', response.data._embedded)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}