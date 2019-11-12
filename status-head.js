const { AwaitWrap, Dynastar } = require('dynastar');
const Joi = require('joi');

/**
 * Returns a wrapped Dynastar model which is used for storing the latest
 * status for a given pkg, env without needing to specify the version
 *
 * @function statushead
 * @param {Object} dynamo Dynamo object model
 * @returns {AwaitWrap} StatusHead
 */
module.exports = function statushead(dynamo) {
  const hashKey = 'key';
  const createKey = (data) => {
    return `${data.pkg}!${data.env}`;
  };
  const model = dynamo.define('StatusHead', {
    hashKey,
    timestamps: true,
    tableName: 'WrhsStatusHead',
    schema: {
      key: Joi.string(),
      pkg: Joi.string(),
      env: Joi.string(),
      version: Joi.string(),
      previousVersion: Joi.string().allow(null),
      total: Joi.number()
    }
  });
  return new AwaitWrap(new Dynastar({ model, hashKey, createKey }));
};
