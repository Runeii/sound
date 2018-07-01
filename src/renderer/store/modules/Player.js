const state = {
  queue: [],
  pointer: false
}

const getters = {
}

const mutations = {
  // Queue
  ADD_TO_QUEUE (state, uuid) {
    Array.isArray(uuid) ? state.queue.push(...uuid) : state.queue.push(uuid)
  },
  ADD_TO_FRONT_OF_QUEUE (state, uuid) {
    Array.isArray(uuid) ? state.queue.unshift(...uuid) : state.queue.unshift(uuid)
  },
  CLEAR_QUEUE (state) {
    state.queue = []
  },
  REMOVE_FROM_QUEUE (state, index) {
    state.queue = state.queue.splice(index, 0)
  },
  // Pointer
  CLEAR_POINTER (state) {
    state.pointer = false
  },
  POINTER_FORWARDS_ONE (state) {
    state.pointer = state.pointer <= state.queue.length ? state.pointer + 1 : state.queue.length
  },
  POINTER_BACKWARDS_ONE (state) {
    state.pointer = state.pointer > 0 ? state.pointer - 1 : 0
  },
  SET_POINTER (state, index) {
    state.pointer = index
  }
}

const actions = {
}

export default {
  state,
  getters,
  mutations,
  actions
}
