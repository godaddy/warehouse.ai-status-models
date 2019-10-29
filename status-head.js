const Dynastar = require('dynastar');
const Joi = require('joi');

const Wrap = require('./wrap');

/**
 * A DynamoDB model which is used for storing the latest
 * status for a given pkg, env without needing to specify the version
 */
module.exports = function statushead(dynamo) {
  const hashKey = 'key';
  const model = dynamo.define('status_head', {
    hashKey,
    tableName: 'status_head',
    schema: {
      key: Joi.string(),
      pkg: Joi.string(),
      env: Joi.string(),
      version: Joi.string(),
      previousVersion: Joi.string(),
      total: Joi.number(),
      createDate: Joi.date(),
      updateDate: Joi.date()
    }
  });
  return new Wrap(new Dynastar({ model, hashKey }));
};
