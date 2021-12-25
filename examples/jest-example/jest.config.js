const { spyJestAliases } = require("performance-spy");

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
  maxWorkers: "50%",

  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "jsx", "cjsx", "json"],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    ...spyJestAliases("<rootDir>/node_modules", ["redux-thunk", "re-reselect", "reselect"])
  },
  // The root directory that Jest should scan for tests and modules within
  rootDir: "./",

  // A list of paths to directories that Jest should use to search for files in
  roots: ["<rootDir>"],

  setupFilesAfterEnv: [
    "./jest.perf-spy.js"
  ],
  testEnvironment: "jsdom",
  testMatch: [`**/?(*)+(-jest).js?(x)`],

  watchman: false
};
