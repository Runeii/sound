const getItunesTracks = require('@johnpaulvaughan/itunes-music-library-tracks').getItunesTracks

process.on('message', (libraryPath) => {
  const trackStream = getItunesTracks(libraryPath)
  trackStream.on('data', function (rawStream) {
    const track = JSON.parse(rawStream)
    process.send({ type: 'track', data: track })
  })

  trackStream.on('error', function (err) {
    process.send({ type: 'error', data: err })
  })

  trackStream.on('end', () => {
    process.send({ type: 'end' })
  })  
})