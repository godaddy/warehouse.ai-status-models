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
   * @param {Object} params Parameters for performing increment
   * @param {String} params.env Env for Counter table
   * @param {String} params.pkg Pkg for Counter table
   * @param {String} params.version Version for counter table
   * @param {Number} amount Number to increment
   * @returns {Promise} when operation complete
   * @public
   */
  async increment(params, amount = 1) {
    const client = await this._getConnection();
    const query = `UPDATE status_counter SET count=count+${amount} WHERE pkg=:pkg AND env=:env AND version=:version`;
    return client.execute(query, params, { prepare: true, counter: true });
  }
  /**
   * Decrement the given counter for this table in the manual way with the
   * cassandra driver until we put this into datastar in a proper way
   *
   * @function increment
   * @param {Object} params Parameters for performing increment
   * @param {String} params.env Env for Counter table
   * @param {String} params.pkg Pkg for Counter table
   * @param {String} params.version Version for counter table
   * @param {Number} amount Number to increment
   * @returns {Promise} when operation complete
   * @public
   */
  async decrement(params, amount = 1) {
    const client = await this._getConnection();
    const query = `UPDATE status_counter SET count=count-${amount} WHERE pkg=:pkg AND env=:env AND version=:version`;
    return client.execute(query, params, { prepare: true, counter: true });
  }
}

/**
 * The Wrapped DynamoDB model for status_counter
 * This model is used for counting the completions of each locale for a given
 * build so we can track overall progress
 *
 * @function statcount
 * @param {Datastar} datastar Datastar instance
 * @returns {CounterWrap} model for StatusCounter
 * @private
 */
module.exports = function statcount(dynamo) {
  const hashKey = 'key';
  const model = dynamo.define('status_counter', {
    hashKey,
    tableName: 'status_counter',
    schema: {
      key: Joi.string(),
      pkg: Joi.string(),
      env: Joi.string(),
      version: Joi.string(),
      count: Joi.number()
    }
  });
  return new CounterWrap(new Dynastar({ model, hashKey }));
};

module.exports.CounterWrap = CounterWrap;
