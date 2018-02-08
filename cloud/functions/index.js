const axios = require('axios')
const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.myFunctionName = functions.firestore
  .document('tracks/{track}').onCreate((event) => {
    const track = event.data.data()
    axios.get({
      url: 'https://api.spotify.com/v1/search',
      params: {
        type: 'track',
        q: 'title:' + track.name + ' artist:' + track.artist.name,
        limit: 1
      },
      headers: {
        'Authorization': 'Bearer BQB2T_rwXypyjOa-f7Df1J6ipmhEZ6dT-1GzoaszrpkW8VukR5dQgbJ6WDM475VndXk-eKgPqMQDOatbplI'
      }
    }).then(data => {
      return event.data.ref.set({
        src: {
          spotify: data.tracks.items[0].external_urls.spotify
        }
      }, { merge: true });  
    }).catch(err => {
      console.log(err)
    })
  });
