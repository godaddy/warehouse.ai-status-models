const uuid = require('uuid');

exports.StatusFixture = {
  pkg: 'my-package',
  key: 'my-package!dev!1.0.0',
  env: 'dev',
  version: '1.0.0',
  previousVersion: '0.9.0',
  total: 10,
  createDate: new Date(),
  updateDate: new Date(),
  complete: false,
  error: false
};

exports.StatusHeadFixture = {
  key: 'my-package!dev',
  pkg: 'my-package',
  env: 'dev',
  version: '1.0.0',
  previousVersion: '0.9.0',
  total: 10,
  createDate: new Date(),
  updateDate: new Date()
};

exports.StatusCounterFixture = {
  key: 'my-package!dev!1.0.0',
  pkg: 'my-package',
  env: 'dev',
  version: '1.0.0'
};

exports.StatusEventFixture = {
  key: 'my-package!dev!1.0.0',
  pkg: 'my-package',
  env: 'dev',
  version: '1.0.0',
  locale: 'en-US',
  error: true,
  message: 'Something is happening!',
  details: 'More stuff about what is happening maybe',
  eventId: uuid.v1()
};
