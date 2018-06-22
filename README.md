# warehouse.ai-status-models
[![Build
Status](https://travis-ci.org/warehouseai/warehouse.ai-status-models.svg?branch=master)](https://travis-ci.org/warehouseai/warehouse.ai-status-models)

Datastar models for the warehouse.ai-status-api

## models

- `Status` - Generic status information, stores total number of builds for a given
  pkg, env, version in order to compute progress in combination with
  `StatusCounter`.
- `StatusHead` - Same as above, just the latest version for a given `pkg`,
  `env`.
- `StatusEvent` - A detailed event for the various stages of a build process
  containing `message` and optional `details` properties as well as `locale` and
  whether it is an error or not.
- `StatusCounter` - A simple distributed counter model that is incremented when
  a `locale` build has completed in order to compute progress based on total.

## test

Running tests assumes you have java installed and a local cassandra installed
and running for your given operating system. Once that is complete, just run:

```sh
npm test
```
