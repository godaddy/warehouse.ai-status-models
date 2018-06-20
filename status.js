const Wrap = require('./wrap');

module.exports = function status(datastar) {
  const cql = datastar.schema.cql;
  const Status = datastar.define('status', {
    schema: datastar.schema.object({
      pkg: cql.text(),
      env: cql.text(),
      version: cql.text(),
      previous_version: cql.text(),
      total: cql.int(),
      create_date: cql.timestamp(),
      update_date: cql.timestamp(),
      complete: cql.boolean()
    }).partitionKey(['pkg', 'env', 'version']),
    with: {
      compaction: {
        class: 'TimeWindowCompactionStrategy'
      }
    }
  });

  return new Wrap(Status);
};
