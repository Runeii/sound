import { mapState, mapGetters, mapActions } from 'vuex'
import './player.scss'

export default {
  data () {
    return {
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
    ...mapState(['theTrack']),
    ...mapGetters(['deviceId']),
    audioObject: {
      get: function () {
        return this.theTrack
      },
      set: function (newValue) {
        this.$store.commit('THE_TRACK_SETTER', newValue)
      }
    },
    async source () {
      const currentMachine = await this.deviceId
      if (currentMachine && this.track.src[currentMachine]) {
        console.log(this.track.name + ': Playing from local machine')
        return this.track.src[currentMachine]
      } else if (this.track.src.cloud) {
        console.log(this.track.name + ': Playing from cloud')
        return await this.getTrackCloudSrc(this.track.uuid)
      }
      return false
    },
    track () {
      return this.$store.getters.currentTrack || {artist: {}, album: {} }
    }
  },
  created () {
    if (this.audioObject.src) {
      this._handleLoaded()
      this._handlePlayingUI()
    }
    this.audioObject.addEventListener('timeupdate', this._handlePlayingUI)
    this.audioObject.addEventListener('loadeddata', this._handleLoaded)
  },
  methods: {
    ...mapActions(['getTrackCloudSrc']),
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
    _onPlay () {
      // On Android, customise media playback notification
      if (navigator && 'mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: this.track.name,
          artist: this.track.artist.name,
          album: this.track.album.name
        });
        navigator.mediaSession.setActionHandler('play', this.play);
        navigator.mediaSession.setActionHandler('pause', this.pause);
        navigator.mediaSession.setActionHandler('seekbackward', function() {});
        navigator.mediaSession.setActionHandler('seekforward', function() {});
        navigator.mediaSession.setActionHandler('previoustrack', function() {});
        navigator.mediaSession.setActionHandler('nexttrack', function() {});
      }      
    },
    async play () {
      if (this.source && this.audioObject.src !== this.source) {
        this.audioObject.src = await this.source
      }
      this.audioObject.play()
      this._onPlay()
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
          <span class='player__details-title'>{this.track.name}</span>
          <span class='player__details-artist'>{this.track.artist.name}</span>
          {this.track.album ? <span class='player__details-album'>{this.track.album.name}</span> : false }
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
