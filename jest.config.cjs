module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // ADD THIS:
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // let TS/Jest resolve .ts when import path ends with .js
  },
  // (optional) quiet the TS151002 warning here too
  globals: {
    'ts-jest': {
      diagnostics: { ignoreCodes: [151002] },
    },
  },
};