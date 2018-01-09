const axios = require('axios')
if (process.argv.length < 3 || process.argv[2] === '') {
  console.error('Error: no library file specified')
  process.exit(1)
}

const endpoint = 'http://ec2-35-176-229-86.eu-west-2.compute.amazonaws.com:8080/db'
const getItunesTracks = require('@johnpaulvaughan/itunes-music-library-tracks').getItunesTracks
const validXMLpath = process.argv[2]

const trackStream = getItunesTracks(validXMLpath)

trackStream.on('data', function (rawStream) {
  const track = JSON.parse(rawStream)
  axios.get(endpoint + `/artists?filter={'name':'${track.Artist}'}&pagesize=1`).then((response) => {
    console.log(response.data._returned)
  })
})

trackStream.on('error', function (err) {
  console.log(err)
})

trackStream.on('end', () => {
  console.log('Library processing completed successfully')
})
