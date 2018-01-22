import './style.css'

export default {
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    sidebar () {
      return (
        <v-navigation-drawer id='sidebar' fixed clipped app v-model={this.drawer}>
          <v-list two-line subheader>
            <v-subheader>Music</v-subheader>
            <v-list-tile avatar on-click={this.$router.push({name: 'Now Playing'})}>
              <v-list-tile-action>
                <v-icon>play_arrow</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Now Playing</v-list-tile-title>
                <v-list-tile-sub-title>Your status is visible to everyone</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar on-click={this.$router.push({name: 'Library'})}>
              <v-list-tile-action>
                <v-icon>library_music</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Library</v-list-tile-title>
                <v-list-tile-sub-title>View music library</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-list subheader>
            <v-subheader>Settings</v-subheader>
            <v-list-tile avatar>
              <v-list-tile-action>
                <v-icon>import_export</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Cloud sync</v-list-tile-title>
                <v-list-tile-sub-title>Cloud library settings</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar on-click={this.$router.push({name: 'Import'})}>
              <v-list-tile-action>
                <v-icon>library_add</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Import iTunes</v-list-tile-title>
                <v-list-tile-sub-title>Import local iTunes library</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
      )
    }
  },
  mounted () {
    this.$store.dispatch('getTracks')
  },
  render (h) {
    return (
      <v-app id='app'>
        { this.sidebar }
        { this.header() }
        <v-content>
          <v-container fluid fill-height>
            <router-view></router-view>
          </v-container>
        </v-content>
      </v-app>
    )
  },
  methods: {
    _openDrawer () {
      this.drawer = !this.drawer
    },
    header () {
      return (
        <v-toolbar id='header' color='blue darken-3' dark app clipped-left fixed>
          <v-toolbar-title style={this.$vuetify.breakpoint.smAndUp ? 'width: 300px; min-width: 250px' : 'min-width: 72px'} class='ml-0 pl-3'>
            <v-toolbar-side-icon onClick={this._openDrawer()}></v-toolbar-side-icon>
            <span class="hidden-xs-only">{this.$route.name ? this.$route.name : this.$route.path}</span>
          </v-toolbar-title>
        </v-toolbar>
      )
    },
  }
}
