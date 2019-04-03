
module.exports = {

  // Auto clear mock calls and instances between tests
  clearMocks: true,

  // Which files to collect coverage data on
  collectCoverageFrom: ['src/**/*.{js,jsx,mjs}'],

  // Dir name for coverage output
  coverageDirectory: 'coverage',

  // If you require modules without specifying an extension, 
  // these are the extensions Jest will look for, in left-to-right order.
  moduleFileExtensions: ['js', 'json', 'jsx'],

  // Paths to config / set up files
  setupFiles: ['./enzyme.config.js'],

  // Test environment that will be used for testing
  testEnvironment: 'jsdom',

  // Patterns to detect test files
  testMatch: ['**/test/**/*.js'],

  // Paths to ignore
  testPathIgnorePatterns: ["/node_modules/", "/server/"],

  // URL for test env
  testURL: 'http://localhost',

  transformIgnorePatterns: ['<rootDir>/node_modules/'],

  verbose: true
}
