const assume = require('assume');
const { AwaitWrap } = require('dynastar');
const dynamodb = require('dynamodb-x');
const models = require('..')(dynamodb);

describe('warehouse.ai-status-models (unit)', function () {
  it('should return the appropriate object', function () {
    assume(models.Status).is.instanceof(AwaitWrap);
    assume(models.StatusCounter).is.instanceof(AwaitWrap);
    assume(models.StatusEvent).is.instanceof(AwaitWrap);
    assume(models.StatusHead).is.instanceof(AwaitWrap);
  });

  it('should have an ensure and drop functions', function () {
    assume(models.ensure).is.a('function');
    assume(models.drop).is.a('function');
  });

  it('StatusCounter model should have increment and decrement function', function () {
    assume(models.StatusCounter.increment).is.an('asyncfunction');
    assume(models.StatusCounter.decrement).is.an('asyncfunction');
  });
});
