module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // let TS/Jest resolve .ts when import path ends with .js
  },
  
};