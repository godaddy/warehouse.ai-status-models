const Wrap = require('./wrap');

/**
 * Returns the wrapped status event model used for storing each event for the
 * various stages of a build process within the warehouse system.
 *
 * @function statevent
 * @param {Datastar} datastar Datastar instance
 * @returns {Wrap} StatusEvent
 */
module.exports = function statevent(datastar) {
  const cql = datastar.schema.cql;
  const StatusEvent = datastar.define('status_event', {
    schema: datastar.schema.object({
      pkg: cql.text(),
      env: cql.text(),
      version: cql.text(),
      locale: cql.text(),
      error: cql.boolean(),
      message: cql.text(),
      details: cql.text(),
      create_date: cql.timestamp({ default: 'create' }),
      event_id: cql.timeuuid()
    }).partitionKey(['pkg', 'env', 'version'])
      .clusteringKey('event_id'),
    with: {
      compaction: {
        class: 'TimeWindowCompactionStrategy'
      }
    }
  });

  return new Wrap(StatusEvent);
};
