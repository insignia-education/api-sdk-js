/** @type {import('jest').Config} */
const config = {
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',

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
