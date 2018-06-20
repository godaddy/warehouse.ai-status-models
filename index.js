module.exports = function models(datastar) {
  return new StatusModels(datastar);
}

class StatusModels {
  constructor(datastar) {
    this.Status = require('./status')(datastar, this);
    this.StatusHead = require('./status-head')(datastar, this);
    this.StatusEvent = require('./status-event')(datastar, this);
    this.StatusCounter = require('./status-counter')(datastar, this);
  }

  ensure() {
    return Promise.all(
      Object.keys(this).map(model => {
        return model.ensure();
      })
    );
  }

  drop() {
    return Promise.all(
      Object.keys(this).map(model => {
        return model.drop();
      })
    );
  }
}
