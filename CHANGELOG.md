# Changelog

## [Unreleased][]

## [2.0.1][] - 2019-01-30

### Removed

- `prepublish` npm hook so it doesn’t run build steps when unecessary

## [2.0.0][] - 2019-01-30

### Changed

- Convert to ES Modules
- Make action handler accept only Promise as return value
- Process `global` identifier to make it more suitable in SSR environment

### Added

- Option to override primary and secondary action simulation
- Attribute for faux anchor activity status

### Removed

- Support for HTML element class, implementors should add them manually

[Unreleased]: https://github.com/niksy/faux-anchor/compare/v2.0.1...HEAD
[2.0.1]: https://github.com/niksy/faux-anchor/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/niksy/faux-anchor/tree/v2.0.0
