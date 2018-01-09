import Vue from 'vue'
import Vuex from 'vuex'
import library from './library'

Vue.use(Vuex)

const state = {
  currentTrackId: 2,
  queuedTracks: []
} 

const getters = {
  getTrackFromLibrary: (state) => (id) => {
    return state.library.records.tracks.find((track) => { return track.id === id })
  },
  currentTrack: (state, getters) => {
    return getters.getTrackFromLibrary(state.currentTrackId)
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
