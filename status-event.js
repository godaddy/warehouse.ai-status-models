const Dynastar = require('dynastar');
const Joi = require('joi');

const Wrap = require('./wrap');

/**
 * A DynamoDB model used for storing each event for the
 * various stages of a build process within the warehouse system.
 *
 * @function statevent
 * @param {Datastar} datastar Datastar instance
 * @returns {Wrap} StatusEvent
 */
module.exports = function statevent(dynamo) {
  const hashKey = 'key';
  const rangeKey = 'eventId';
  const model = dynamo.define('status_event', {
    hashKey,
    rangeKey,
    tableName: 'status_event',
    schema: {
      key: Joi.string(),
      pkg: Joi.string(),
      env: Joi.string(),
      version: Joi.string(),
      locale: Joi.string(),
      error: Joi.boolean(),
      message: Joi.string(),
      details: Joi.string(),
      createDate: Joi.date(),
      eventId: dynamo.types.uuid()
    }
  });
  return new Wrap(new Dynastar({ model, hashKey, rangeKey }));
};
