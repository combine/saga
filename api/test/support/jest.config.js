const { mapValues, mapKeys } = require('lodash');
const { _moduleAliases } = require('../../package.json');
const escapeStringRegexp = require('escape-string-regexp');

const toRegex = (alias, trailing = false) =>
  `^${escapeStringRegexp(alias)}${trailing ? '/(.*)?' : ''}$`;

// Maps _moduleAliases in package.json to Jest's regex format that it can read
const moduleAliasesMap = mapValues(
  mapKeys(_moduleAliases, (_, alias) => toRegex(alias, true)),
  path => `<rootDir>/${path}/$1`
);

// This is required for paths that reference an index.js file, e.g.
const moduleAliasesIndexesMap = mapValues(
  mapKeys(_moduleAliases, (_, alias) => toRegex(alias)),
  path => `<rootDir>/${path}`
);

const cssFiles = '\\.(css|scss|less)$';
const staticFiles =
  '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|' +
  'webm|wav|mp3|m4a|aac|oga)$';

const moduleNameMapper = {
  ...moduleAliasesMap,
  ...moduleAliasesIndexesMap,
  [staticFiles]: '<rootDir>/__mocks__/fileMock.js',
  [cssFiles]: 'identity-obj-proxy'
};

module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'jsx', 'json'],
  rootDir: process.cwd(),
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupTestFrameworkScriptFile: '<rootDir>/test/support/jest.setup.js',
  testPathIgnorePatterns: ['/node_modules/', '/lib/', '/dist/'],
  moduleNameMapper
};
