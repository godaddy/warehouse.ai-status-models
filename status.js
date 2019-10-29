const Dynastar = require('dynastar');
const Joi = require('joi');

const Wrap = require('./wrap');

/**
 * A dynamo model that is used for storing the general status for
 * a given pkg, env, version. This is used for computing progress in
 * conjunction with StatusCounter using the `total` field
 */
module.exports = function status(dynamo) {
  const hashKey = 'key';
  const model = dynamo.define('status', {
    hashKey,
    tableName: 'status',
    schema: {
      key: Joi.string(),
      pkg: Joi.string(),
      env: Joi.string(),
      version: Joi.string(),
      previousVersion: Joi.string(),
      total: Joi.number(),
      error: Joi.boolean(),
      createDate: Joi.date(),
      updateDate: Joi.date(),
      complete: Joi.boolean()
    }
  });
  return new Wrap(new Dynastar({ model, hashKey }));
};
