const Wrap = require('./wrap');

module.exports = function statevent(datastar) {
  const cql = datastar.schema.cql;
  const StatusEvent = datastar.define('status_event', {
    schema: datastar.schema.object({
      pkg: cql.text(),
      env: cql.text(),
      version: cql.text(),
      message: cql.text(),
      details: cql.text(),
      event_id: cql.timeuuid()
    }).partitionKey(['pkg', 'env', 'version'])
      .clusteringKey('event_id'),
    with: {
      compaction: {
        class: 'TimedWindowCompactionStrategy'
      }
    }
  });

  return new Wrap(StatusEvent);
};
