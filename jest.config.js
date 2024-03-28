module.exports = {
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testURL: 'http://localhost:8000',
  testEnvironment: 'jsdom',
  verbose: false,
  globals: {
    localStorage: null,
  },
};
