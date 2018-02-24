import { mapState, mapGetters, mapActions } from 'vuex'
import './player.scss'

export default {
  data () {
    return {
      drawerOpen: false,
      timings: {
        progress: 0,
        currentTime: '0:00',
        totalDuration: {
          raw: 0,
          pretty: '0:00'
        }
      }
    }
  },
  computed: {
    ...mapState({
      audioObject: state => state.player.audioObject,
      currentPlaybackState: state => state.player.currentPlaybackState
    }),
    ...mapGetters(['deviceId', 'currentTrack']),
    track () {
      return this.currentTrack || { artist: {}, album: {} }
    },
    renderRightActionButton () {
      if (this.currentPlaybackState === 'playing') {
        return <v-icon x-large class='button' color='white' onClick={this.togglePlay()}>pause_circle_outline</v-icon>
      } else if (this.currentPlaybackState === 'paused') {
        return <v-icon x-large class='button' color='white' onClick={this.togglePlay()}>play_circle_outline</v-icon> 
      } else if (this.currentPlaybackState === 'loading') {
        return <v-progress-circular indeterminate class='button' color='white'></v-progress-circular>
      } else {
        return <v-icon x-large class='button' color='white' onClick={this.togglePlay()}>play_circle_outline</v-icon>
      }
    }
  },
  methods: {
    ...mapActions(['nextTrack', 'previousTrack']),
    _handlePlayingUI () {
      const currentTime = parseInt(this.audioObject.currentTime)
      this.timings.progress = ((currentTime / this.timings.totalDuration.raw) * 100).toFixed(1)
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
      const offset = (click.pageX / click.screenX) * 100
      const timing = (this.audioObject.duration / 100) * offset 
      this.audioObject.currentTime = timing
    },
    togglePlay () {
      if (this.currentPlaybackState === 'playing') {
        this.$store.dispatch('pauseTrack')
      } else {
        this.$store.dispatch('playTrack')
      }
    },
    openDrawer () {
      this.drawerOpen = !this.drawerOpen
    },
    renderOpenDrawerActions () {
      return (
        <div class='playerDrawer__openActions'>
          <v-icon x-large class='button' color='white' onClick={() => this.previousTrack()}>skip_previous</v-icon>
          <v-icon x-large class='button' color='white' onClick={() => this.nextTrack()}>skip_next</v-icon>
        </div>
      )
    }
  },
  render (h) {
    return (
      <v-bottom-nav fixed class={this.drawerOpen ? 'playerDrawer open' : 'playerDrawer'} height='50px' style='background-color: hsl(258.5, 30%, 42.5%); bottom:110px;'>
        { this.drawerOpen ? this.renderOpenDrawerActions() : false }
        <v-progress-linear class='playerDrawer__progress' v-model={this.timings.progress} onClick={this._jumpToTime} height='3' />
        <v-icon x-large color='white' onClick={() => this.openDrawer()} class='button'>keyboard_arrow_up</v-icon>
        <span class='playerDrawer__details'>
          <span class='playerDrawer__details-track'>{this.track.name}</span>
          <span class='playerDrawer__details-track'>{this.track.artist.name} - {this.track.album.name}</span>
        </span>
        { this.renderRightActionButton }
      </v-bottom-nav>
    )
  }
}
