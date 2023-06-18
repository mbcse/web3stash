/* eslint-disable new-cap */
/* eslint-disable no-undef */
const {Web3Stash} = require('../dist/cjs/index.js');

test('Should Initialize Pinata Service When Service Name Passed Correctly', () => {
	const pinata = Web3Stash('PINATA', {apiKey: process.env.PINATA_API_KEY, apiSecret: process.env.PINATA_API_SECRET});
	expect(pinata.serviceInstance).not.toBeUndefined();
});

test('Initializing Pinata Service Should Throw Error On Wrong Service Name', () => {
	expect(() => Web3Stash('PINATAA', {apiKey: process.env.PINATA_API_KEY, apiSecret: process.env.PINATA_API_SECRET})).toThrow('Unknown Service Type');
});

test('Should Store Json Data in pinata', async () => {
	const pinataService = Web3Stash('PINATA', {apiKey: process.env.PINATA_API_KEY, apiSecret: process.env.PINATA_API_SECRET});
	const data = {test: 'test'};
	const result = await pinataService.uploadJson(data);
	expect(result).toEqual(
		expect.objectContaining({id: expect.any(String), metadata: expect.any(Object)}),
	);
});

test('Should Store Image in pinata', async () => {
	const pinataService = Web3Stash('PINATA', {apiKey: process.env.PINATA_API_KEY, apiSecret: process.env.PINATA_API_SECRET});
	const path = './test/test.jpg';
	const result = await pinataService.uploadImage(path);
	expect(result).toEqual(
		expect.objectContaining({id: expect.any(String), metadata: expect.any(Object)}),
	);
});

test('Should Store Video in pinata', async () => {
	const pinataService = Web3Stash('PINATA', {apiKey: process.env.PINATA_API_KEY, apiSecret: process.env.PINATA_API_SECRET});
	const path = './test/test.mp4';
	const result = await pinataService.uploadVideo(path);
	expect(result).toEqual(
		expect.objectContaining({id: expect.any(String), metadata: expect.any(Object)}),
	);
});

test('Should Store File in pinata', async () => {
	const pinataService = Web3Stash('PINATA', {apiKey: process.env.PINATA_API_KEY, apiSecret: process.env.PINATA_API_SECRET});
	const path = './test/test.pdf';
	const result = await pinataService.uploadVideo(path);
	expect(result).toEqual(
		expect.objectContaining({id: expect.any(String), metadata: expect.any(Object)}),
	);
});

