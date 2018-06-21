const thenify = require('tinythen');
const Datastar = require('datastar');
const statusModels = require('..');
const clone = require('clone');

const { StatusFixture,
        StatusHeadFixture,
        StatusCounterFixture,
        StatusEvent } = require('./fixtures');

const datastar = new Datastar(require('./config'));
const models = statusModels(datastar);

const { Status, StatusHead, StatusCounter, StatusEvent } = models;

describe('status-models (integration)', function () {
  before(async function () {
    if (process.env.DEBUG) { // eslint-disable-line no-process-env
      datastar.connection.on('queryStarted', function () {
        console.log.apply(console, arguments);
      });
    }
    await thenify(datastar, 'connect');
  });

  after(async function () {
    await thenify(datastar, 'close');
  });

  describe('status', function () {

    before(async function () {
      await Status.ensure();
    });

    after(async function () {
      await Status.drop();
    });

    it('should create and remove a status record', async function () {
      await Status.create(StatusFixture);
      await Status.remove(StatusFixture);
    });

    it('should create and find a status record', async function () {
      await Status.create(StatusFixture);
      const result = await Status.findOne(StatusFixture);
      assume(result.pkg).equals(StatusFixture.pkg);
      assume(result.env).equals(StatusFixture.env);
      assume(result.version).equals(StatusFixture.version);
      assume(result.previousVersion).equals(StatusFixture.previousVersion);
      assume(result.total).equals(StatusFixture.total);
      assume(result.createDate).equals(StatusFixture.createDate)
      assume(result.updateDate).equals(StatusFixture.updateDate);
      assume(result.complete).equals(StatusFixture.complete);
    });

  });
});
