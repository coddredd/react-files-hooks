module.exports = {
  "globals": {
    "window": true
  },
  "setupFiles": [
    "<rootDir>/__tests__/jest.init.js"
  ],
  "transform": {
    "\\.js$": "babel-jest",
  },
  "testPathIgnorePatterns": [
    "/node_modules/", "/__tests__/jest.init.js"
  ],
  "reporters": [
    "default",
    ["./node_modules/jest-html-reporter", {
      "pageTitle": "Unit Tests Report",
      "outputPath": "./report/report.html",
      "includeFailureMsg": true,
      "theme": "lightTheme"
    }]
  ],
  "collectCoverage": true,
  "collectCoverageFrom": [
    "./src/**/*.js",
  ],
  "coverageReporters": ["json", "html", "text"],
  "coverageDirectory": "./report/coverage",
  "coveragePathIgnorePatterns": ["/node_modules/", "/src/constants.js", "/src/index.js", "/__tests__/jest.init.js"],
  "coverageThreshold": {
    "global": {
      "branches": 10,
      "functions": 10,
      "lines": 10,
      "statements": 10
    }
  }
};
