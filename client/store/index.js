import Vue from 'vue'
import Vuex from 'vuex'
import library from './library'
import { deviceId } from '../cross-platform.js'

Vue.use(Vuex)

const state = {
  deviceId: deviceId,
  theTrack: new Audio(),
  currentTrackId: 2,
  queuedTracks: []
}

const getters = {
  library: (state) => {
    return state.library.tracks || false
  },
  getTrackFromLibrary: (state, getters) => (uuid) => {
    return getters.library.find((track) => { return track['uuid'] === uuid }) || false
  },
  currentTrack: (state, getters) => {
    const currentTrack = getters.getTrackFromLibrary(state.currentTrackId)
    return currentTrack || { album: {}, artist: {} }
  },
  deviceId: (state) => {
    return state.deviceId()
  }
}

const mutations = {
  THE_TRACK_SETTER (state, newValue) {
    state.theTrack = newValue
  },
  PLAY_TRACK (state, uuid) {
    state.currentTrackId = uuid
  },
  QUEUE_TRACK (state, uuid) {
    state.queuedTracks.push(uuid)
  }
}

const actions = {
  playTrack ({ commit }, uuid) {
    commit('PLAY_TRACK', uuid)
  },
  queueTrack ({ commit, getters }, uuid) {
    commit('QUEUE_TRACK', uuid)
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    library: library
  }
})

export default store
