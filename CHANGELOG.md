# Changelog

- Remove Travis build for `node@8`, it was already unsupported due to requiring `stream.pipeline` and is well past LTS support.

### 2.0.3

- Update dynastar to `^1.2.0`

### 2.0.2

- Fix TableName for status-head

### 2.0.1

- Fix key for StatusHead, allow null for previousVersion

### 2.0.0

- BREAKING--Convert datastar models to dynastar models
  - Integration tests run against localstack instance
- [#4] Update documentation
  - Add badges
  - Add collected docs
  - Update patch/minor dependencies

[#4]: https://github.com/warehouseai/warehouse.ai-status-models/pull/4
