const Wrap = require('./wrap');

class CounterWrap extends Wrap {
  constructor() {
    super(...arguments);
  }
  //
  // This should be exposed in datastar but its not clear how to do that yet
  //
  async increment(params) {
    const client = await this._getPool();
    const query = `UPDATE status_counter SET count=count+1 WHERE pkg=:pkg, env=:env, version=:version`;
    return client.execute(query, params, { prepare: true, counter: true });
  }
}

module.exports = function statcount(datastar) {
  const cql = datastar.schema.cql;
  const StatusCounter = datastar.define('status_counter', {
    schema: datastar.schema.object({
      pkg: cql.text(),
      env: cql.text(),
      version: cql.text(),
      counr: cql.counter()
    }).partitionKey(['pkg', 'env', 'version']),
    with: {
      compaction: {
        class: 'LeveledCompactionStrategy'
      }
    }
  });

  return new CounterWrap(StatusCounter);
};

module.exports.CounterWrap = CounterWrap;
