# warehouse.ai-status-models

[![Version npm](https://img.shields.io/npm/v/warehouse.ai-status-models.svg?style=flat-square)](https://www.npmjs.com/package/warehouse.ai-status-models)
[![License](https://img.shields.io/npm/l/warehouse.ai-status-models.svg?style=flat-square)](https://github.com/warehouseai/warehouse.ai-status-models/blob/master/LICENSE)
[![npm Downloads](https://img.shields.io/npm/dm/warehouse.ai-status-models.svg?style=flat-square)](https://npmcharts.com/compare/warehouse.ai-status-models?minimal=true)
[![Build Status](https://travis-ci.org/warehouseai/warehouse.ai-status-models.svg?branch=master)](https://travis-ci.org/warehouseai/warehouse.ai-status-models)
[![Dependencies](https://img.shields.io/david/warehouseai/warehouse.ai-status-models.svg?style=flat-square)](https://github.com/warehouseai/warehouse.ai-status-models/blob/master/package.json)

[Datastar][datastar] models for the [Warehouse.ai-status-api].

## Install

```bash
npm install warehouse.ai-status-models --save
```

## Usage

```
const datastar = require('datastar')({ /* connection config */ }).connect();
const models = require('warehouse.ai-status-models')(datastar);

// from datastar.define we get...
const Status = models.Status;

Status.findFirst({ ... }, function (err, data) { .... });
```

## API

All schemas for the API documentation are written using
[`datastar`'s][datastar] notation.

### Schemas

### Status (`status`)

Generic status information

Column             | Type             | Summary
------------------ | ---------------- | ------------
pkg (pk)           | text             | Name of a package
env (pk)           | text             | What enviroment is this build made for (dev, test, etc.)
version (pk)       | text             | What version of a package does this status represent
previous_version   | text             | The previous version number
total              | integer          | Total progress as percentage
error              | boolean          | Did the build error
create_date        | timestamp        | Time of creation
update_date        | timestamp        | Time of last update
complete           | boolean          | Did the build complete

### StatusHead (`status_head`)

Generic status information but just for he  latest version for a given
`pkg` and `env`. Refer to the table above for details. The properties
`error` and `complete` do not exist on this table.

### StatusEvent (`status_event`)

A detailed event for the various stages of a build process containing `message`
and optional `details` properties as well as `locale` and whether it is and
error or not.

Column             | Type             | Summary
------------------ | ---------------- | ------------
pkg (pk)           | text             | Name of a package
env (pk)           | text             | What enviroment is this build made for (dev, test, etc.)
version (pk)       | text             | What version of a package does this status represent
locale             | text             | Build locale
error              | boolean          | Is the status event an error
message            | text             | Status message
details            | text             | Message details
create_date        | timestamp        | Time of creation
event_id           | unqiue_timestamp | Unique id sortable by time

### StatusCounter (`status_counter`)

A simple distributed counter model that is incremented when a `locale` build
has completed in order to compute progress based on total amount of `locales`.

Column             | Type             | Summary
------------------ | ---------------- | ------------
pkg (pk)           | text             | Name of a package
env (pk)           | text             | What enviroment is this build made for (dev, test, etc.)
version (pk)       | text             | What version of a package does this status represent
count              | counter          | Incrementable counter

## Test

Running tests assumes you have java installed and a local [cassandra] installed
and running for your given operating system. Once that is complete, just run:

```sh
npm test
```

[datastar]: https://github.com/godaddy/datastar
[Warehouse.ai-status-api]: https://github.com/godaddy/warehouse.ai-status-api
[cassandra]: https://cassandra.apache.org/
