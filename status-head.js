const Wrap = require('./wrap');

module.exports = function stathead(datastar) {
  const cql = datastar.schema.cql;
  const StatusHead = datastar.define('status_head', {
    schema: datastar.schema.object({
      pkg: cql.text(),
      env: cql.text(),
      version: cql.text(),
      previous_version: cql.text(),
      total: cql.int(),
      create_date: cql.timestamp(),
      complete: cql.boolean()
    }).partitionKey(['pkg', 'env']),
    with: {
      compaction: {
        class: 'LeveledCompactionStrategy'
      }
    }
  });

  return new Wrap(StatusHead);
};
