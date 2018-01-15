// Initializes the `library` service on path `/library`
const createService = require('feathers-nedb');
const createModel = require('../../models/library.model');
const hooks = require('./library.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'library',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/library', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('library');

  service.hooks(hooks);
};
