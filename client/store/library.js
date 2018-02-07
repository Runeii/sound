import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@firebase/app';
import '@firebase/firestore'
import { firebaseAction, firebaseMutations } from 'vuexfire'

const firebasedb = firebase.initializeApp({
  apiKey: "AIzaSyBu14dWMRsLhl4iq_ryGtV46eo7IUaxoSM",
  authDomain: "soundplayer-55578.firebaseapp.com",
  databaseURL: "https://soundplayer-55578.firebaseio.com",
  projectId: "soundplayer-55578",
  storageBucket: "soundplayer-55578.appspot.com",
  messagingSenderId: "506304420571"
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
  albums: state => state.albums
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
  addTrack ({ commit }, data) {
    db.tracks.add({...data, created: firebase.firestore.FieldValue.serverTimestamp()})
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
