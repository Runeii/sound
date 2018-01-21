import './style.css'

export default {
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    sidebar () {
      if (this.drawer) {
        return (
            <v-list two-line subheader>
              <v-subheader>General</v-subheader>
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Profile photo</v-list-tile-title>
                  <v-list-tile-sub-title>Change your Google+ profile photo</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Show your status</v-list-tile-title>
                  <v-list-tile-sub-title>Your status is visible to everyone</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
        )
      }
    }
  },
  render (h) {
    return (
      <v-app id='app'>
        { this.sidebar }
        { this.header() }
        <router-view></router-view>
      </v-app>
    )
  },
  methods: {
    _openDrawer () {
      this.drawer = !this.drawer
    },
    header () {
      return (
        <v-toolbar color='blue darken-3' dark app clipped-left fixed>
          <v-toolbar-title style={this.$vuetify.breakpoint.smAndUp ? 'width: 300px; min-width: 250px' : 'min-width: 72px'} class='ml-0 pl-3'>
            <v-toolbar-side-icon onClick={this._openDrawer()}></v-toolbar-side-icon>
            <span class="hidden-xs-only">{this.$route.name ? this.$route.name : this.$route.path}</span>
          </v-toolbar-title>
        </v-toolbar>
      )
    },
  }
}
