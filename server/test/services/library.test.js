const assert = require('assert');
const app = require('../../src/app');

describe('\'library\' service', () => {
  it('registered the service', () => {
    const service = app.service('library');

    assert.ok(service, 'Registered the service');
  });
});
