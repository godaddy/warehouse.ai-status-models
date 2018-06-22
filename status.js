const Wrap = require('./wrap');

/**
 * Returns wrapped Status model that is used for storing the general status for
 * a given pkg, env, version. This is used for computing progress in
 * conjunction with StatusCounter using the `total` field
 *
 * @function status
 * @param {Datastar} datastar Datastar instance
 * @returns {Wrap} Status
 */
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
