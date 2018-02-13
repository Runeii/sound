const getItunesTracks = require('@johnpaulvaughan/itunes-music-library-tracks').getItunesTracks
const { machineIdSync } = require('node-machine-id')

const deviceID = machineIdSync()

process.on('message', (libraryPath) => {
  process.send({ type: 'message', data: 'Kick off' })
  const trackStream = getItunesTracks(libraryPath)
  let total = 0
  trackStream.on('data', function (rawStream) {
    const rawData = JSON.parse(rawStream)
    const track = structureData(rawData)
    total++
    process.send({ type: 'track', data: track })
  })

  trackStream.on('error', function (err) {
    process.send({ type: 'error', data: err })
  })

  trackStream.on('end', () => {
    process.send({ type: 'end', data: total })
  })
})

function structureData (data) {
  const track = {
    name: data['Name'],
    artist: data['Artist'],
    album: data['Album'],
    length: data['Total Time'],
    trackNumber: data['Track Number'],
    src: {}
  }
  track['src'][deviceID] = data['Location']
  return track
}
