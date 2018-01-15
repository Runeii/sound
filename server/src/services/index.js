const library = require('./library/library.service.js');
const users = require('./users/users.service.js');
module.exports = function (app) {
  app.configure(library);
  app.configure(users);
};
