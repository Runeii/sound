const fs = require('fs')
const S3FS = require('s3fs')

const s3Options = {
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
  region: process.env.S3_REGION
}
const fsImpl = new S3FS('sheffieldsound', s3Options)

process.on('message', (library) => {
  const progress = 100 / library.length
  library.forEach((track, i) => {
    const path = decodeURI(track.src.file.replace(/^(file:\/\/)/,""))
    process.send({ type: 'message', data: path })
    copyFile(path, track._id).then(success => {
      process.send({ type: 'progress', data: (progress * i) })
      process.send({ type: 'message', data: 'Uploaded ' + track })
    }).catch(err => {
      process.send({ type: 'error', data: err })
      console.log(err)
    })
  })
  // process.send({ type: 'end' })
  // console.log('End')
})

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

/*
var uploader = client.uploadFile({
  s3Params: { ...s3Params, 
    Key: '2SbX4ZYC5GVsOgCn'
  },
  localFile: '/Users/andrewhill/Music/iTunes/iTunes Media/Music/LCD Soundsystem/Sound of Silver/03 North American Scum.mp3'
})

uploader.on('error', (err) => {
  // process.send({ type: 'error', data: err })
  console.log(err)
})
uploader.on('progress', () => {
  console.log(uploader.progressMd5Amount, uploader.progressAmount, uploader.progressTotal)
  // process.send({ type: 'track', data: track })
})
uploader.on('end', (data) => {
  // process.send({ type: 'end' })
  console.log(data)
}) */