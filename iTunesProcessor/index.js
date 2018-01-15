if (process.argv.length < 3 || process.argv[2] === '') {
  console.error('Error: no library file specified')
  process.exit(1)
}

console.log('Preparing...')
const axios = require('axios')
const getItunesTracks = require('@johnpaulvaughan/itunes-music-library-tracks').getItunesTracks
const endpoint = 'http://ec2-35-176-229-86.eu-west-2.compute.amazonaws.com:8080/db'
const validXMLpath = process.argv[2]

const localRecord = {
  library: [],
  new: {
    artists: [],
    structure: {
      fakeArtist: ['fakealbum', 'fakealbum2']
    }
  }
}
const remoteRecord = {}

buildRemoteRecord()
function buildRemoteRecord () {
  console.log('[Stage 1] Downloading latest library')
  axios.get(endpoint + `/artists?keys={'id':1}`).then((response) => {
    response.data._embedded.forEach(artist => {
      remoteRecord[artist.id] = artist.albums
    })
    console.log(remoteRecord)
    console.log('[Stage 1] Download complete')
    parseItunesLibrary()
  })
}

function parseItunesLibrary () {
  console.log('[Stage 2] Converting iTunes library')
  const trackStream = getItunesTracks(validXMLpath)

  trackStream.on('data', function (rawStream) {
    const track = JSON.parse(rawStream)
    if (!(track.Artist in remoteRecord) && !localRecord.new.artists.includes(track.Artist)) {
      localRecord.new.artists.push(track.Artist)
      localRecord.new.structure[track.Artist] = []
    }
    if ((!(track.Artist in remoteRecord) || !remoteRecord[track.Artist].includes(track.Album)) && !localRecord.new.structure[track.Artist].includes(track.Album)) {
      localRecord.new.structure[track.Artist].push(track.Album)
    }
    localRecord.library.push(track)
  })

  trackStream.on('error', function (err) {
    console.log(err)
  })

  trackStream.on('end', () => {
    console.log(localRecord.new.artists.length + ' new artists found')
    console.log('[Stage 1] Library processed and converted successfully')
    uploadLibraryViaApi()
  })
}

function uploadLibraryViaApi () {
  console.log('[Stage 2] Adding to remote library (Do not disconnect from network)')
  Object.keys(localRecord.new.structure).forEach(artist => {
    const discography = localRecord.new.structure[artist].map(album => { 
      return {
        title: album
      }
    })
    axios.post(endpoint + '/albums', discography).then(response => {
      console.log(response.data._links['rh:newdoc'])
    })
  })
}
