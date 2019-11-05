const uuid = require('uuid');

exports.StatusFixture = {
  pkg: 'my-package',
  env: 'dev',
  version: '1.0.0',
  previousVersion: '0.9.0',
  total: 10,
  createdAt: new Date(),
  updatedAt: new Date(),
  complete: false,
  error: false
};

exports.StatusHeadFixture = {
  pkg: 'my-package',
  env: 'dev',
  version: '1.0.0',
  previousVersion: '0.9.0',
  total: 10,
  createdAt: new Date(),
  updatedAt: new Date()
};

exports.StatusCounterFixture = {
  pkg: 'my-package',
  env: 'dev',
  version: '1.0.0'
};

exports.StatusEventFixture = {
  pkg: 'my-package',
  env: 'dev',
  version: '1.0.0',
  locale: 'en-US',
  error: true,
  message: 'Something is happening!',
  details: 'More stuff about what is happening maybe',
  eventId: uuid.v1()
};
