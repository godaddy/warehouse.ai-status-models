const thenify = require('tinythen');

class ModelWrap {
  constructor(model) {
    this.model = model;
  }
  create() {
    return thenify(this.model, 'create', ...arguments);
  }
  update() {
    return thenify(this.model, 'update', ...arguments);
  }
  remove() {
    return thenify(this.model, 'remove', ...arguments);
  }
  findOne() {
    return thenify(this.model, 'findOne', ...arguments);
  }
  findAll() {
    // Dont wrap this one since it can return a stream that we may want to leverage
    return this.model.findAll(...arguments);
  }
  ensure() {
    return thenify(this.model, 'ensureTables');
  }
  drop() {
    return thenify(this.model, 'dropTables');
  }
  /**
   * Get the raw cassandra-driver because we need to do some special shit for
   * counters
   * @returns {Thenable} raw cassandra driver
   */
  _getConnection() {
    return thenify(this.model.connection, 'getConnectionPool', null, false);
  }
}

module.exports = ModelWrap;
