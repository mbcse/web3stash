/* eslint-disable new-cap */
/* eslint-disable no-undef */
const {preProcessFile} = require('typescript');
const {Web3Stash} = require('../dist/cjs/index.js');

test('Should Initialize BUNDLR Service When Service Name Passed Correctly', () => {
	const bundlr = Web3Stash('BUNDLR', {currency: process.env.BUNDLR_CURRENCY, privateKey: process.env.BUNDLR_PRIVATE_KEY, testing: process.env.testing}, {providerUrl: process.env.BUNDLR_PROVIDER_URL});
	expect(bundlr.serviceInstance).not.toBeUndefined();
});

test('Initializing bundlr Service Should Throw Error On Wrong Service Name', () => {
	expect(() => Web3Stash('BUNDLRE', {currency: process.env.BUNDLR_CURRENCY, privateKey: process.env.BUNDLR_PRIVATE_KEY, testing: process.env.testing}, {providerUrl: process.env.BUNDLR_PROVIDER_URL})).toThrow('Unknown Service Type');
});

test('Should Store Json Data in bundlr', async () => {
	const bundlrService = Web3Stash('BUNDLR', {currency: process.env.BUNDLR_CURRENCY, privateKey: process.env.BUNDLR_PRIVATE_KEY, testing: process.env.testing}, {providerUrl: process.env.BUNDLR_PROVIDER_URL});
	const data = {test: 'test'};
	const result = await bundlrService.uploadJson(data);
	expect(result).toEqual(
		expect.objectContaining({id: expect.any(String), metadata: expect.any(Object)}),
	);
});

test('Should Store Image in bundlr', async () => {
	const bundlrService = Web3Stash('BUNDLR', {currency: process.env.BUNDLR_CURRENCY, privateKey: process.env.BUNDLR_PRIVATE_KEY, testing: process.env.testing}, {providerUrl: process.env.BUNDLR_PROVIDER_URL});
	const path = './test/test.jpg';
	const result = await bundlrService.uploadImage(path);
	expect(result).toEqual(
		expect.objectContaining({id: expect.any(String), metadata: expect.any(Object)}),
	);
});

test('Should Store Video in bundlr', async () => {
	const bundlrService = Web3Stash('BUNDLR', {currency: process.env.BUNDLR_CURRENCY, privateKey: process.env.BUNDLR_PRIVATE_KEY, testing: process.env.testing}, {providerUrl: process.env.BUNDLR_PROVIDER_URL});
	const path = './test/test.mp4';
	const result = await bundlrService.uploadVideo(path);
	expect(result).toEqual(
		expect.objectContaining({id: expect.any(String), metadata: expect.any(Object)}),
	);
});

test('Should Store File in bundlr', async () => {
	const bundlrService = Web3Stash('BUNDLR', {currency: process.env.BUNDLR_CURRENCY, privateKey: process.env.BUNDLR_PRIVATE_KEY, testing: process.env.testing}, {providerUrl: process.env.BUNDLR_PROVIDER_URL});
	const path = './test/test.pdf';
	const result = await bundlrService.uploadVideo(path);
	expect(result).toEqual(
		expect.objectContaining({id: expect.any(String), metadata: expect.any(Object)}),
	);
});

