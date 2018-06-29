const Wrap = require('./wrap');

/**
 * Returns a wrapped StatusHead model which is used for storing the latest
 * status for a given pkg, env without needing to specify the version
 *
 * @function stathead
 * @param {Datastar} datastar Datastar instance
 * @returns {Wrap} StatusHead
 */
module.exports = function stathead(datastar) {
  const cql = datastar.schema.cql;
  const StatusHead = datastar.define('status_head', {
    schema: datastar.schema.object({
      pkg: cql.text(),
      env: cql.text(),
      version: cql.text(),
      previous_version: cql.text(),
      total: cql.int(),
      create_date: cql.timestamp({ default: 'create' }),
      update_date: cql.timestamp({ default: 'update' })
    }).partitionKey(['pkg', 'env']),
    with: {
      compaction: {
        class: 'LeveledCompactionStrategy'
      }
    }
  });

  return new Wrap(StatusHead);
};
