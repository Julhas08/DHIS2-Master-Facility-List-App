module.exports = {
    "setupTestFrameworkScriptFile": "<rootDir>/config/setup.js",
    "testPathIgnorePatterns": [
        "/node_modules/",
        "<rootDir>/mfl-app/",
        "<rootDir>/mfl-app/core/lib/",
        "<rootDir>/mfl-app/*/build/"
    ],
    "verbose": false,
    "transform": {
        "^.+\\.jsx$": "babel-jest",
        "^.+\\.js$": "babel-jest"
    },
    "moduleFileExtensions": [
        "js",
        "jsx"
    ],
    "moduleDirectories": [
        "node_modules"
    ]
};
