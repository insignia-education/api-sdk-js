/** @type {import('jest').Config} */
const config = {
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',

    reporters: [
        'default',
        ['jest-html-reporter', {
            outputPath: 'coverage/test-report.html',
            pageTitle: 'API SDK Test Report',
            includeFailureMsg: true,
            includeConsoleLog: true,
        }],
    ],

    projects: [
        {
            displayName: 'unit',
            testMatch: [
                '<rootDir>/tests/client.test.js',
                '<rootDir>/tests/api/**/*.test.js',
            ],
            transform: { '^.+\\.(js|jsx)$': 'babel-jest' },
        },
        {
            displayName: 'integration',
            testMatch: ['<rootDir>/tests/integration/**/*.test.js'],
            transform: { '^.+\\.(js|jsx)$': 'babel-jest' },
            setupFiles: ['<rootDir>/tests/integration/loadEnv.js'],
            testTimeout: 30000,
        },
    ],
};

export default config;
