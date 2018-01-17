const { authenticate } = require('@feathersjs/authentication').hooks;
const preProcessTrack = require('../../hooks/pre-process-track');
const postProcessTrack = require('../../hooks/post-process-track');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [preProcessTrack()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [postProcessTrack()],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};