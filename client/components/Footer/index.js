import './style.scss'
export default {
  name: 'FooterTabs',
  data () {
    return {
      visibility: true
    }
  },
  render (h) {
    return (
      <v-bottom-nav app shift light class='footer' height='50px' value={this.visibility}>
        <v-btn flat color='teal'>
          <span>Discover</span>
          <v-icon>add_circle</v-icon>
        </v-btn>
        <v-btn flat color='teal' to='/'>
          <span>Library</span>
          <v-icon>library_music</v-icon>
        </v-btn>
        <v-btn flat color='teal' to='sync'>
          <span>Settings</span>
          <v-icon>settings</v-icon>
        </v-btn>
      </v-bottom-nav>
    )
  }
}