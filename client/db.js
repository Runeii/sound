const Nedb = require('nedb')
const electron = require('electron')

module.exports = {
  install (vue) {
    vue.prototype.$db = new Nedb({ filename: electron.remote.app.getPath('userData') + '/database.db', autoload: true })
  }
}
