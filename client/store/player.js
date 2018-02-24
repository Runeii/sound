import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  audioObject: new Audio(),
  currentPlaybackState: 'stopped',
  pointer: false,
  queue: []
}

const getters = {
  currentQueueId: (state, getters) => {
    return state.pointer !== false ? state.queue[state.pointer] : false
  },
  currentTrack: (state, getters) => {
    return getters.currentQueueId ? getters.getTrackFromLibrary(getters.currentQueueId) : false
  }
}

const mutations = {
  // Track object
  SET_PLAYBACK_SRC (state, src) {
    state.audioObject.src = src
  },
  SET_AUDIO_STATE (state, audioState) {
    if (audioState === 'playing') {
      state.audioObject.play().then(() => { state.currentPlaybackState = audioState })
    }
    if (audioState === 'paused') {
      state.audioObject.pause()
      state.currentPlaybackState = audioState
    }
    if (audioState === 'stopped') {
      state.audioObject.pause()
      state.audioObject.currentTime = 0
      state.currentPlaybackState = audioState
    }
  },
  // Queue
  ADD_TO_QUEUE (state, uuid) {
    Array.isArray(uuid) ? state.queue.push(...uuid) : state.queue.push(uuid)
  },
  ADD_TO_FRONT_OF_QUEUE (state, uuid) {
    Array.isArray(uuid) ? state.queue.unshift(...uuid) : state.queue.unshift(uuid)
  },
  REMOVE_FROM_QUEUE (state, index) {
    state.queue = state.queue.splice(index, 0)
  },
  CLEAR_QUEUE (state) {
    state.queue = []
  },
  // Pointer
  SET_POINTER (state, index) {
    state.pointer = index
  },
  POINTER_FORWARDS_ONE (state) {
    state.pointer = state.pointer <= state.queue.length ? state.pointer + 1 : state.queue.length
  },
  POINTER_BACKWARDS_ONE (state) {
    state.pointer = state.pointer > 0 ? state.pointer - 1 : 0
  },
  CLEAR_POINTER (state) {
    state.pointer = false
  }
}

const actions = {
  // Player actions
  preparePlayback ({ commit, dispatch, getters, rootState }) {
    state.currentPlaybackState = 'loading'
    return new Promise((resolve, reject) => {
      if (getters.currentTrack.src.hasOwnProperty(rootState.deviceId)) {
        commit('SET_PLAYBACK_SRC', getters.currentTrack.src[rootState.deviceId])
        resolve()
      } else if (getters.currentTrack.src.cloud === true) {
        dispatch('getTrackCloudSrc', getters.currentTrack.uuid).then((src) => {
          commit('SET_PLAYBACK_SRC', src)
          resolve()
        })
      } else {
        reject('No source found')
      }
    })
  },
  // Track object actions
  playTrack ({ commit, dispatch }, uuid) {
    if (uuid) {
      commit('CLEAR_QUEUE')
      commit('ADD_TO_QUEUE', uuid)
      commit('SET_POINTER', 0)
    }
    dispatch('preparePlayback').then(() => {
      commit('SET_AUDIO_STATE', 'playing')
    }).catch((err) => {
      console.log(err)
      commit('SET_AUDIO_STATE', 'stopped')
    })
  },
  pauseTrack ({ commit }) {
    commit('SET_AUDIO_STATE', 'paused')
  },
  stopTrack ({ commit }) {
    commit('SET_AUDIO_STATE', 'stopped')
  },
  // Queue actions
  addToQueue ({ commit }, uuid) {
    commit('ADD_TO_QUEUE', uuid)
  },
  addToFrontOfQueue ({ commit }, uuid) {
    commit('ADD_TO_FRONT_OF_QUEUE', uuid)
  },
  clearQueue ({ commit }) {
    commit('CLEAR_QUEUE')
  },
  // Pointer actions
  selectQueuedTrack ({ commit }, index) {
    commit('SET_POINTER', index)
  },
  nextTrack ({ commit, dispatch }) {
    commit('POINTER_FORWARDS_ONE')
    dispatch('playTrack')
  },
  previousTrack ({ commit, dispatch }) {
    commit('POINTER_BACKWARDS_ONE')
    dispatch('playTrack')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
