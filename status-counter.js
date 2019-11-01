const Dynastar = require('dynastar');
const Joi = require('joi');

const Wrap = require('./wrap');

/**
 * Extends the Wrap class to add an increment function in order to do the
 * single operation it permits
 *
 * @class CounterWrap
 */
class CounterWrap extends Wrap {
  /**
   * Increment the given counter for this table in the manual way with the
   * cassandra driver until we put this into datastar in a proper way
   *
   * @function increment
   * @param {Object} key Object containing key of item to increment
   * @param {Number} amount Number to increment
   * @returns {Promise} when operation complete
   * @public
   */
  async increment(key, amount = 1) {
    return this.update({ ...key, count: { $add: amount } });
  }
  /**
   * Decrement the given counter for this table in the manual way with the
   * cassandra driver until we put this into datastar in a proper way
   *
   * @function increment
   * @param {Object} key Object containing key of item to increment
   * @param {Number} amount Number to increment
   * @returns {Promise} when operation complete
   * @public
   */
  async decrement(key, amount = 1) {
    return this.update({ ...key, count: { $add: -1 * amount } });
  }
}

/**
 * Returns a Wrapped Dynastar model for status_counter
 * This model is used for counting the completions of each locale for a given
 * build so we can track overall progress
 *
 * @function statcount
 * @param {Object} dynamo Dynamo object model
 * @returns {CounterWrap} model for StatusCounter
 * @private
 */
module.exports = function statcount(dynamo) {
  const hashKey = 'key';
  const createKey = (data) => {
    return `${data.pkg}!${data.env}!${data.version}`;
  };
  const model = dynamo.define('StatusCounter', {
    hashKey,
    tableName: 'WrhsStatusCounter',
    schema: {
      key: Joi.string(),
      pkg: Joi.string(),
      env: Joi.string(),
      version: Joi.string(),
      count: Joi.number()
    }
  });
  return new CounterWrap(new Dynastar({ model, hashKey, createKey }));
};

module.exports.CounterWrap = CounterWrap;
