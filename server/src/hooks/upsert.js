// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { path, app, service, data } = context;
    const reply = await app.service(path).find({
      query: {...data, $limit: 1 }
    }).then(response => {
      console.log('Testing for ' + path)
      if (response.data.length > 0) {
        console.log('Already exists')
        return Promise.resolve({...context, result: response.data[0]})
      } else {
        return Promise.resolve(context);
      }
    });
    return reply;
  };
};
