const { AwaitWrap, Dynastar } = require('dynastar');
const Joi = require('joi');

/**
 * Returns a Wrapped Dynastar model that is used for storing the general status for
 * a given pkg, env, version. This is used for computing progress in
 * conjunction with StatusCounter using the `total` field
 *
 * @function status
 * @param {Object} dynamo Dynamo object model
 * @returns {AwaitWrap} Status
 */
module.exports = function status(dynamo) {
  const hashKey = 'key';
  const createKey = (data) => {
    return `${data.pkg}!${data.env}!${data.version}`;
  };
  const model = dynamo.define('Status', {
    hashKey,
    timestamps: true,
    tableName: 'WrhsStatus',
    schema: {
      key: Joi.string(),
      pkg: Joi.string(),
      env: Joi.string(),
      version: Joi.string(),
      previousVersion: Joi.string(),
      total: Joi.number(),
      error: Joi.boolean(),
      complete: Joi.boolean()
    }
  });
  return new AwaitWrap(new Dynastar({ model, createKey, hashKey }));
};
