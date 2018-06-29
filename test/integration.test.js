const thenify = require('tinythen');
const Datastar = require('datastar');
const assume = require('assume');
const statusModels = require('..');
const uuid = require('uuid');

const { StatusFixture,
  StatusHeadFixture,
  StatusCounterFixture,
  StatusEventFixture } = require('./fixtures');

const datastar = new Datastar(require('./config'));
const models = statusModels(datastar);

const { Status, StatusHead, StatusCounter, StatusEvent } = models;

function assertStatus(result, fixture = StatusFixture) {
  assume(result.pkg).equals(fixture.pkg);
  assume(result.env).equals(fixture.env);
  assume(result.version).equals(fixture.version);
  assume(result.previousVersion).equals(fixture.previousVersion);
  assume(result.total).equals(fixture.total);
  assume(result.createDate).is.a('date');
  assume(result.updateDate).is.a('date');
  if (result.complete) assume(result.complete).equals(fixture.complete);
}

function assertEvent(result, fixture = StatusEventFixture) {
  assume(result.pkg).equals(fixture.pkg);
  assume(result.env).equals(fixture.env);
  assume(result.version).equals(fixture.version);
  assume(result.locale).equals(fixture.locale);
  assume(result.error).equals(fixture.error);
  assume(result.message).equals(fixture.message);
  assume(result.details).equals(fixture.details);
  assume(result.createDate).is.a('date');
  assume(result.eventId).equals(fixture.eventId);
}

function thenStream(stream) {
  return {
    then(resolve, reject) {
      const buf = [];
      stream.once('error', reject);
      stream.on('data', (d) => buf.push(d));
      stream.once('end', () => resolve(buf));
    }
  };
}
describe('warehouse.ai-status-models (integration)', function () {
  this.timeout(6E4);
  before(async function () {
    if (process.env.DEBUG) { // eslint-disable-line no-process-env
      datastar.connection.on('queryStarted', function () {
        console.log.apply(console, arguments); // eslint-disable-line no-console
      });
    }
    await thenify(datastar, 'connect');
  });

  after(async function () {
    await thenify(datastar, 'close');
  });

  describe('models', function () {
    it('should ensure and drop all models', async function () {
      await models.ensure();
      await models.drop();
    });
  });

  describe('status', function () {
    beforeEach(async function () {
      await Status.ensure();
    });

    afterEach(async function () {
      await Status.drop();
    });

    it('should create and remove a status record', async function () {
      await Status.create(StatusFixture);
      await Status.remove(StatusFixture);
    });

    it('should create, find and remove a status record', async function () {
      await Status.create(StatusFixture);
      const result = await Status.findOne(StatusFixture);
      assertStatus(result);
      await Status.remove(StatusFixture);
    });

    it('should create, find, update and remove a status record', async function () {
      await Status.create(StatusFixture);
      const result = await Status.findOne(StatusFixture);
      assertStatus(result);
      const modified = { ...StatusFixture, complete: true };
      const { pkg, env, version, complete } = modified;
      await Status.update({ pkg, env, version, complete });
      const result2 = await Status.findOne({ pkg, env, version });
      assertStatus(result2, modified);
      await Status.remove(modified);
    });
  });

  describe('status-head', function () {
    beforeEach(async function () {
      await StatusHead.ensure();
    });

    afterEach(async function () {
      await StatusHead.drop();
    });

    it('should create and remove a status-head record', async function () {
      await StatusHead.create(StatusHeadFixture);
      await StatusHead.remove(StatusHeadFixture);
    });

    it('should create, find and remove a status-head record', async function () {
      await StatusHead.create(StatusHeadFixture);
      const result = await StatusHead.findOne(StatusHeadFixture);
      assertStatus(result, StatusHeadFixture);
      await StatusHead.remove(StatusHeadFixture);
    });
  });

  describe('status-event', function () {
    beforeEach(async function () {
      await StatusEvent.ensure();
    });

    afterEach(async function () {
      await StatusEvent.drop();
    });

    it('should create and remove a status-event record', async function () {
      await StatusEvent.create(StatusEventFixture);
      await StatusEvent.remove(StatusEventFixture);
    });

    it('should create 2 status-event records, find them and remove them', async function () {
      const fixture2 = { ...StatusEventFixture, eventId: uuid.v1() };
      await StatusEvent.create(StatusEventFixture);
      await StatusEvent.create(fixture2);
      const { pkg, env, version } = StatusEventFixture;
      const results = await StatusEvent.findAll({ pkg, env, version });
      assume(results).is.length(2);
      const [one, two] = results;
      assertEvent(one, StatusEventFixture);
      assertEvent(two, fixture2);
      await Promise.all(results.map(r => StatusEvent.remove(r)));
    });

    it('should create 2 status-event records, and be able to find using a stream', async function () {
      const fixture2 = { ...StatusEventFixture, eventId: uuid.v1() };
      await StatusEvent.create(StatusEventFixture);
      await StatusEvent.create(fixture2);
      const { pkg, env, version } = StatusEventFixture;

      const stream = StatusEvent.findAllStream({ pkg, env, version });
      const results = await thenStream(stream);
      const [one, two] = results;
      assertEvent(one, StatusEventFixture);
      assertEvent(two, fixture2);
      await Promise.all(results.map(r => StatusEvent.remove(r)));
    });
  });

  describe('status-counter', function () {
    beforeEach(async function () {
      await StatusCounter.ensure();
    });

    afterEach(async function () {
      await StatusCounter.drop();
    });

    it('should increment a counter and find the record', async function () {
      await StatusCounter.increment(StatusCounterFixture);
      const result = await StatusCounter.findOne(StatusCounterFixture);
      assume(result.pkg).equals(StatusCounterFixture.pkg);
      assume(result.env).equals(StatusCounterFixture.env);
      assume(result.version).equals(StatusCounterFixture.version);
      assume(result.count).equals(1);
    });

    it('should increment counter multiple times and validate the increase', async function () {
      await StatusCounter.increment(StatusCounterFixture);
      const result = await StatusCounter.findOne(StatusCounterFixture);
      assume(result.count).equals(1);
      await StatusCounter.increment(StatusCounterFixture);
      const result1 = await StatusCounter.findOne(StatusCounterFixture);
      assume(result1.count).equals(2);
      await StatusCounter.increment(StatusCounterFixture);
      const result2 = await StatusCounter.findOne(StatusCounterFixture);
      assume(result2.count).equals(3);
    });

    it('should decrement counter after increment and validate the changes', async function () {
      await StatusCounter.increment(StatusCounterFixture);
      const result = await StatusCounter.findOne(StatusCounterFixture);
      assume(result.count).equals(1);
      await StatusCounter.increment(StatusCounterFixture);
      const result1 = await StatusCounter.findOne(StatusCounterFixture);
      assume(result1.count).equals(2);
      await StatusCounter.decrement(StatusCounterFixture, 2);
      const result2 = await StatusCounter.findOne(StatusCounterFixture);
      assume(result2.count).equals(0);
    });
  });
});
