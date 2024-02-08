/* eslint-disable new-cap */
/* eslint-disable no-undef */
const {Web3Stash} = require('../dist/cjs/index.js');

test('Should Initialize LIGHTHOUSE Service When Service Name Passed Correctly', () => {
	const lighthouse = Web3Stash('LIGHTHOUSE', {lighthouseApiKey: process.env.LIGHTHOUSE_API_KEY});
	expect(lighthouse.serviceInstance).not.toBeUndefined();
});

test('Initializing lighthouse Service Should Throw Error On Wrong Service Name', () => {
	expect(() => Web3Stash('LIGHTHOUSEE', {lighthouseApiKey: process.env.LIGHTHOUSE_API_KEY})).toThrow('Unknown Service Type');
});

test('Should Store Json Data in lighthouse', async () => {
	const lighthouseService = Web3Stash('LIGHTHOUSE', {lighthouseApiKey: process.env.LIGHTHOUSE_API_KEY});
	const data = {test: 'test'};
	const result = await lighthouseService.uploadJson(data);
	expect(result).toEqual(
		expect.objectContaining({id: expect.any(String), metadata: expect.any(Object)}),
	);
});

test('Should Store Image in lighthouse', async () => {
	const lighthouseService = Web3Stash('LIGHTHOUSE', {lighthouseApiKey: process.env.LIGHTHOUSE_API_KEY});
	const path = './test/test.jpg';
	const result = await lighthouseService.uploadImage(path);
	expect(result).toEqual(
		expect.objectContaining({id: expect.any(String), metadata: expect.any(Object)}),
	);
});

test('Should Store Video in lighthouse', async () => {
	const lighthouseService = Web3Stash('LIGHTHOUSE', {lighthouseApiKey: process.env.LIGHTHOUSE_API_KEY});
	const path = './test/test.mp4';
	const result = await lighthouseService.uploadVideo(path);
	expect(result).toEqual(
		expect.objectContaining({id: expect.any(String), metadata: expect.any(Object)}),
	);
});

test('Should Store File in lighthouse', async () => {
	const lighthouseService = Web3Stash('LIGHTHOUSE', {lighthouseApiKey: process.env.LIGHTHOUSE_API_KEY});
	const path = './test/test.pdf';
	const result = await lighthouseService.uploadVideo(path);
	expect(result).toEqual(
		expect.objectContaining({id: expect.any(String), metadata: expect.any(Object)}),
	);
});

