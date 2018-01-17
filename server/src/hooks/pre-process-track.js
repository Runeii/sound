// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const blobService = require('feathers-blob');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { app, data, params } = context;
    const tracks = Array.isArray(data) ? data : [data];

    await Promise.all(tracks.map(async track => {
      const artist = await app.service('artists').create({name: track['Artist'] })
      const album = await app.service('artists').create({
        title: track['Album'],
        artist: artist['_id']
      });
      track['Artist'] = artist['_id'];
      track['Album'] = album['_id'];
      track['Pointers'] = {
        file: false
      };
    }));
    return context;
  };
};
