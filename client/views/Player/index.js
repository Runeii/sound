import './player.scss'

export default {
  data () {
    return {
      audioObject: false,
      timings: {
        progressStyle: '',
        currentTime: '0:00',
        totalDuration: {
          raw: 0,
          pretty: '0:00'
        }
      }
    }
  },
  computed: {
    source () {
      return this.track.src.file
    },
    track () {
      return this.$store.getters.currentTrack
    }
  },
  created () {
    this.$store.dispatch('getTracks')
    this.audioObject = document.createElement('audio')
    this.audioObject.addEventListener('timeupdate', this._handlePlayingUI)
    this.audioObject.addEventListener('loadeddata', this._handleLoaded)
  },
  methods: {
    _handlePlayingUI () {
      const currentTime = parseInt(this.audioObject.currentTime)
      const currentTimeAsPercentage = ((currentTime / this.timings.totalDuration.raw) * 100).toFixed(1)
      this.timings.progressStyle = `right:${100 - currentTimeAsPercentage}%;`
      this.timings.currentTime = this.convertTimeHHMMSS(currentTime)
    },
    _handleLoaded () {
      const duration = parseInt(this.audioObject.duration)
      this.timings.totalDuration = {
        raw: duration,
        pretty: this.convertTimeHHMMSS(duration)
      }
    },
    _jumpToTime (click) {
      const offset = (click.layerX / click.target.clientWidth) * 100
      const timing = (this.audioObject.duration / 100) * offset
      this.audioObject.currentTime = timing
    },
    play () {
      if (this.audioObject.src !== this.source) {
        this.audioObject.src = this.source
      }
      console.log(this.audioObject)
      this.audioObject.play()
    },
    pause () {
      this.audioObject.pause()
    },
    stop () {
      this.audioObject.pause()
      this.audioObject.currentTime = 0
    },
    testUpdate () {
      this.$store.dispatch('updateTrack', [1, { artwork: 'https://i.scdn.co/image/31ff32e07215e719fe738d209d586ffe629b8425' }])
    }
  },
  render (h) {
    return (
      <div class='player__holder'>
        <img class='player__artwork' src={this.track.artwork} />
        <div class='player__controls'>
          <button class='player__controls-button player__controls-play' onClick={this.play}>Play</button>
          <button class='player__controls-button player__controls-pause' onClick={this.pause}>Pause</button>
          <button class='player__controls-button player__controls-stop' onClick={this.stop}>Stop</button>
          <button onClick={this.testUpdate}>Update artwork</button>
        </div>
        <div class='player__details'>
          <span class='player__details-title'>{this.track.title}</span>
          <span class='player__details-artist'>{this.track.artist}</span>
          {this.track.album ? <span class='player__details-album'>{this.track.album}</span> : false }
        </div>
        <div class='player__progress'>
          <div class='player__progress-bar' onClick={this._jumpToTime}>
            <div class='player__progress-bar-fill' style={this.timings.progressStyle}></div>
          </div>
          <span class='player__progress-now'>{this.timings.currentTime}</span>
          <span class='player__progress-total'>{this.timings.totalDuration.pretty}</span>
        </div>
      </div>
    )
  }
}
