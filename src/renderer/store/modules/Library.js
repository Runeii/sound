import { firestore as db } from 'firebase'

/*
This is just here as a reference guide. We do not actually pass state due to Firestore attempting to mutate from outside mutators

const state = {
  artists: [],
  albums: [],
  tracks: []
}
*/

const getters = {
}

const mutations = {
  ADD_TRACK (state, track) {
    state.tracks.push(track)
  },
  ADD_LOCAL_SRC_TO_TRACK (state, {uuid, src}) {
    const track = state.tracks.filter(t => t.uuid === uuid)
    if (track.size > 0) {
      track[0].src[state.machineId] = src
    } else {
      console.log('Error in ADD_LOCAL_SRC_TO_TRACK: Track doesn\'t exist')
    }
  },
  LOAD_ARTISTS (state, artists) {
    state.artists = artists
  },
  LOAD_ALBUMS (state, albums) {
    state.albums = albums
  },
  LOAD_TRACKS (state, tracks) {
    state.tracks = tracks
  },
  REMOVE_TRACK (state, {uuid, src}) {
    const offset = state.tracks.indexOf(uuid)
    if (offset > -1) state.tracks.splice(offset, 1)
  },
  UPDATE_TRACK (state, {uuid, data}) {
    const track = state.tracks.filter(t => t.uuid === uuid)
    if (track.size > 0) {
      track[0] = data
    } else {
      console.log('Error in UPDATE_TRACK: Track doesn\'t exist')
    }
  }
}

const actions = {
  loadLibrary ({commit}) {
    db().collection('artists').get().then(r => {
      const collection = r.docs.map((doc) => doc.data())
      commit('LOAD_ARTISTS', collection)
    })
    db().collection('albums').get().then(r => {
      const collection = r.docs.map((doc) => doc.data())
      commit('LOAD_ALBUMS', collection)
    })
    db().collection('tracks').get().then(r => {
      const collection = r.docs.map((doc) => doc.data())
      commit('LOAD_TRACKS', collection)
    })
  },
  addTrack ({state, commit}, {uuid, src, meta}) {
    const trackRef = db.collection('tracks').doc(uuid)
    trackRef.get().then(doc => {
      if (doc.exists) {
        trackRef.onSnapshot(doc => {
          doc.set({
            src: {[state.machineId]: src}
          }, {
            merge: true
          })
        })
        commit('ADD_LOCAL_SRC_TO_TRACK', {uuid, src})
      } else {
        const trackObj = {...meta,
          src: {
            [state.machineId]: src
          }
        }
        trackRef.set(trackObj)
        commit('ADD_TRACK', trackObj)
      }
    })
  },
  removeTrack ({state, commit}, uuid) {
    const trackRef = db.collection('tracks').doc(uuid)
    trackRef.delete().then(() => {
      commit('REMOVE_TRACK', uuid)
    })
  },
  updateTrack ({state, commit}, {uuid, data}) {
    const trackRef = db.collection('tracks').doc(uuid)
    trackRef.get().then(doc => {
      if (doc.exists) {
        trackRef.onSnapshot(doc => {
          doc.update(data)
        })
        commit('UPDATE_TRACK', {uuid, data})
      } else {
        console.log('Error in updateTrack: trying to update non-existant track')
      }
    })
  }
}

export default {
  getters,
  mutations,
  actions
}
