import { machineIdSync } from 'node-machine-id'
import { Howl } from 'howler'
const deviceID = machineIdSync()

export default class Track {
  constructor (track, src = false) {
    this.uuid = track.uuid
    this.title = track.title || 'Unknown Track'
    this.artist = track.artist || 'Unknown Artist'
    this.albumArtist = track.albumArtist || 'Unknown Artist'
    this.album = track.album || 'Unknown Artist'
    this.trackNumber = track.trackNumber || 0
    this.duration = track.duration || 0
    this.artwork = track.artwork || null

    this.object = new Howl()
    this.sources = track.src

    this.state = 'Unplayed'
    this.location = null

    this.selectSource(src)
  }

  pause () {
    this.object.pause()
    this.state = 'Paused'
  }
  play () {
    this.state = 'Loading'
    this.object.play().then(() => {
      this.state = 'Playing'
    })
  }
  stop () {
    this.object.pause()
    this.object.currentTime = 0
    this.state = 'Stopped'
  }

  selectSource (src) {
    if (src) {
      this.object.src = src
      return
    }

    if (this.sources.hasOwnProperty(deviceID)) {
      this.object.src = this.sources[deviceID]
      this.location = 'Local'
    } else if (this.sources.cloud === true) {
      // NEED TO GET CLOUD TRACK SRC HERE
      this.location = 'Cloud'
    } else {
      this.state = 'Error'
    }
  }

  get isPlaying () {
    return (this.state === 'Playing')
  }
}
