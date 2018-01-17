const library = require('./library/library.service.js');
const users = require('./users/users.service.js');
const artists = require('./artists/artists.service.js');
const albums = require('./albums/albums.service.js');
module.exports = function (app) {
  app.configure(library);
  app.configure(users);
  app.configure(artists);
  app.configure(albums);
};
