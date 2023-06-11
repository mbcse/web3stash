/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
	clearMocks: true,
	setupFiles: ['./jestSetup.js'],
	collectCoverage: false,
	testTimeout: 300000,
	coverageProvider: 'v8',

};
