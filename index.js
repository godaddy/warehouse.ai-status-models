
/**
 * StatusModels class which contains all the initialized models wrapped with
 * thenable wrappers for use in our application
 *
 * @class StatusModels
 */
class StatusModels {
  /**
   * Set the models on the instance
   *
   * @param {Datastar} datastar Datastar instance
   * @constructor
   */
  constructor(datastar) {
    this.Status = require('./status')(datastar, this);
    this.StatusHead = require('./status-head')(datastar, this);
    this.StatusEvent = require('./status-event')(datastar, this);
    this.StatusCounter = require('./status-counter')(datastar, this);
  }

  /**
   * Ensures existence of all tables for the given models
   *
   * @function ensure
   * @returns {Promise} to resolve when complete
   */
  ensure() {
    return Promise.all(
      Object.keys(this).map(model => {
        return model.ensure();
      })
    );
  }

  /**
   * Drops all the tables for the given models
   *
   * @function drop
   * @returns {Promise} to resolve when complete
   */
  drop() {
    return Promise.all(
      Object.keys(this).map(model => {
        return model.drop();
      })
    );
  }
}

/**
 * Simple Factory function for main export
 *
 * @function models
 * @param {Datastar} datastar Datastar instance
 * @returns {StatusModels} to be used
 */
module.exports = function models(datastar) {
  return new StatusModels(datastar);
};
