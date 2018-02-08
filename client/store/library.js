import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@firebase/app';
import '@firebase/firestore'
import { firebaseAction, firebaseMutations } from 'vuexfire'
require('dotenv').config()

const firebasedb = firebase.initializeApp({
  apiKey: process.env.FIREBASE_KEY,
  authDomain: process.env.FIREBASE_DOMAIN,
  databaseURL: process.env.FIREBASE_URL,
  projectId: process.env.FIREBASE_ID,
  storageBucket: process.env.FIREBASE_BUCKET,
  messagingSenderId: process.env.FIREBASE_SENDER
}).firestore()

const db = {
  tracks: firebasedb.collection('tracks'),
  albums: firebasedb.collection('albums'),
  artists: firebasedb.collection('artists')
}

Vue.use(Vuex)

const state = {
  tracks: [],
  artists: [],
  albums: [],
  cloud: true
}

const getters = {
  tracks: state => state.tracks,
  artists: state => state.artists,
  albums: state => state.albums,
  recordExists: (state) => (type, name) => {
    const filtered = state[type].filter(record => record.name === name)
    return (filtered.length > 0) ? filtered : false
  }
}

const mutations = {
  ...firebaseMutations,
  TOGGLE_CLOUD_LIBRARY (state, boolean) {
    state.cloud = boolean
  }
}

const actions = {
  setupCloudRefs: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('tracks', db.tracks)
    bindFirebaseRef('albums', db.albums)
    bindFirebaseRef('artists', db.artists)
  }),
  async addToDatabase ({ commit, dispatch, getters }, data) {
    const artist = await dispatch('addArtist', {name: data.artist})
    const album = await dispatch('addAlbum', {name: data.album})
    dispatch('addTrack', {...data, artist: artist, album: album})
  },
  async addArtist ({ commit, dispatch, getters }, {name}) {
    const artistDoc = db.artists.doc(name)
    artistDoc.update({name: name, timestamp: firebase.firestore.FieldValue.serverTimestamp()})
    return artistDoc
  },
  async addAlbum ({ commit, dispatch }, {name}) {
    const albumDoc = db.albums.doc(name)
    albumDoc.update({name: name, timestamp: firebase.firestore.FieldValue.serverTimestamp()})
    return albumDoc
  },
  async addTrack ({ commit, dispatch }, data) {
    db.tracks.doc(data.name).set({...data, created: firebase.firestore.FieldValue.serverTimestamp()}, {merge: true}).then(response => {console.log(response)})
  },
  toggleCloudLibrary ({ commit }, boolean) {
    commit('TOGGLE_CLOUD_LIBRARY', boolean)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
