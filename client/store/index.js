import Vue from 'vue'
import Vuex from 'vuex'
import library from './library'
import { deviceId } from '../cross-platform.js'

Vue.use(Vuex)

const state = {
  theTrack: new Audio(),
  deviceID: '',
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
    return currentTrack || {}
  },
  deviceID: (state) => {
    return state.deviceID || false
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
  },
  UPDATE_TRACK_DATA (state, [uuid, data]) {
    const target = state.library.findIndex((trackRecord) => { return trackRecord.uuid === uuid })
    Vue.set(state.library, target, { ...state.library[target], ...data })
  },
  SET_DEVICE_ID (state, deviceId) {
    state.deviceID = deviceId
  }
}

const actions = {
  playTrack ({ commit }, uuid) {
    commit('PLAY_TRACK', uuid)
  },
  queueTrack ({ commit, getters }, uuid) {
    commit('QUEUE_TRACK', uuid)
  },
  updateTrack ({ commit }, payload) {
    commit('UPDATE_TRACK_DATA', payload)
  },
  async getDeviceID ({ commit }) {
    const id = await deviceId()
    commit('SET_DEVICE_ID', id)
    return id
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
