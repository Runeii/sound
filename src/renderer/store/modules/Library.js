import { firestore as db } from 'firebase'

const state = {
  artists: [],
  albums: []
}

const mutations = {
  SAVE_ARTISTS (documents) {
    state.artists = documents
  },
  SAVE_ALBUMS (documents) {
    state.albums = documents
  }
}

const actions = {
  loadLibrary ({commit}) {
    db().collection('artists').get().then(r => {
      commit('SAVE_ARTISTS', r.docs)
    })
    db().collection('albums').get().then(r => {
      commit('SAVE_ALBUMS', r.docs)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
