import Vue from 'vue'
import Vuex from 'vuex'
import library from './library'

Vue.use(Vuex)

const state = {
  currentTrackId: 2,
  queuedTracks: []
}

const getters = {
  library: (state) => {
    return state.library.tracks || false
  },
  getTrackFromLibrary: (state, getters) => (id) => {
    return getters.library.find((track) => { return track['_id'] === id }) || false
  },
  currentTrack: (state, getters) => {
    const currentTrack = getters.getTrackFromLibrary(state.currentTrackId)
    return currentTrack || {}
  }
}

const mutations = {
  PLAY_TRACK (state, id) {
    state.currentTrackId = id
  },
  QUEUE_TRACK (state, id) {
    state.queuedTracks.push(id)
  },
  UPDATE_TRACK_DATA (state, [track, data]) {
    const target = state.library.findIndex((trackRecord) => { return trackRecord.id === track })
    Vue.set(state.library, target, { ...state.library[target], ...data })
  }
}

const actions = {
  playTrack ({ commit }, id) {
    commit('PLAY_TRACK', id)
  },
  queueTrack ({ commit, getters }, id) {
    commit('QUEUE_TRACK', id)
  },
  updateTrack ({ commit }, payload) {
    commit('UPDATE_TRACK_DATA', payload)
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
