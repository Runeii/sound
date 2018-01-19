import './style.css'

export default {
  data () {
    return {
      drawer: true
    }
  },
  render (h) {
    return (
      <v-app id='app'>
        { this.sidebar() }
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
    sidebar () {
      if (this.drawer) {
        return (
          <v-navigation-drawer fixed clipped app></v-navigation-drawer>
        )
      }
    }
  }
}
