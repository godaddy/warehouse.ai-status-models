const assume = require('assume');
const clone = require('clone');
const ModelWrap = require('../wrap');
const models = require('..');

const { mocks, helpers } = require('datastar-test-tools');

describe('warehouse.ai-status-models (unit)', function () {
  let dal;

  beforeEach(function () {
    let datastar = helpers.connectDatastar({ mock: true }, mocks.datastar());
    dal = models(datastar);
  });

  it('should return the appropriate object', function () {
    assume(dal.Status).is.instanceof(ModelWrap);
    assume(dal.StatusCounter).is.instanceof(ModelWrap);
    assume(dal.StatusEvent).is.instanceof(ModelWrap);
    assume(dal.StatusHead).is.instanceof(ModelWrap);
  });

  it('should have an ensure and drop functions', function () {
    assume(dal.ensure).is.a('function');
    assume(dal.drop).is.a('function');
  });

  it('StatusCounter model should have increment function', function () {
    assume(dal.StatusCounter.increment).is.an('asyncfunction');
  });
});
