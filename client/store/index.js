import Vue from 'vue'
import Vuex from 'vuex'
import library from './library'
import player from './player'
import { deviceId } from '../cross-platform.js'

Vue.use(Vuex)

const state = {
  deviceId: deviceId(),
}

const getters = {
  library: (state) => {
    return state.library.tracks || []
  },
  getTrackFromLibrary: (state, getters) => (uuid) => {
    return state.library.tracks.find((track) => { return track['uuid'] === uuid }) || false
  },
// Change once albums have own UUIDs
  getTracksByAlbum: (state, getters) => (uuid) => {
    return state.library.tracks.filter((track) => { return track.album.name === uuid }) || false
  },
  deviceId: (state) => {
    return state.deviceId
  }
}

const mutations = {
}

const actions = {
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    library: library,
    player: player
  }
})

export default store
