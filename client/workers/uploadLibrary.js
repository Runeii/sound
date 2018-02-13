const fs = require('fs')
const S3FS = require('s3fs')
const mID = require('node-machine-id')
const machineId = mID.machineIdSync()
require('dotenv').config()

const s3Options = {
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
  region: process.env.S3_REGION
}
const fsImpl = new S3FS('sheffieldsound', s3Options)

process.on('message', (queue) => {
  const startProcessASynchronously = async () => {
    await asyncForEach(queue, async (track) => {
      const path = decodeURI(track.src[machineId].replace(/^(file:\/\/)/, ''))
      process.send({ type: 'message', data: path })
      await copyFile(path, track.uuid).then(success => {
        process.send({ type: 'progress', data: 1 })
        process.send({ type: 'message', data: 'Uploaded ' + track })
      }).catch(err => {
        process.send({ type: 'error', data: err })
        console.log(err)
        Promise.reject()
      })
    })
    process.send({ type: 'end' })
    console.log('End')
  }
  startProcessASynchronously()
})

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}
function copyFile (source, target) {
  process.send({ type: 'message', data: 'copying ' + source })
  var rd = fs.createReadStream(source)
  var wr = fsImpl.createWriteStream(target)
  return new Promise((resolve, reject) => {
    rd.on('error', reject)
    wr.on('error', reject)
    wr.on('finish', resolve)
    rd.pipe(wr)
  }).catch((error) => {
    rd.destroy()
    wr.end()
    throw error
  })
}
