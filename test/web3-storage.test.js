/* eslint-disable new-cap */
/* eslint-disable no-undef */
const {Web3Stash} = require('../dist/cjs/index.js');

test('Should Initialize WEB3.STORAGE Service When Service Name Passed Correctly', () => {
	const web3storage = Web3Stash('WEB3.STORAGE', {token: process.env.WEB3_STORAGE_TOKEN});
	expect(web3storage.serviceInstance).not.toBeUndefined();
});

test('Initializing web3storage Service Should Throw Error On Wrong Service Name', () => {
	expect(() => Web3Stash('WEB3.STORAGEE', {token: process.env.WEB3_STORAGE_TOKEN})).toThrow('Unknown Service Type');
});

test('Should Store Json Data in web3storage', async () => {
	const web3storageService = Web3Stash('WEB3.STORAGE', {token: process.env.WEB3_STORAGE_TOKEN});
	const data = {test: 'test'};
	const result = await web3storageService.uploadJson(data);
	expect(result).toEqual(
		expect.objectContaining({id: expect.any(String), metadata: expect.any(Object)}),
	);
});

test('Should Store Image in web3storage', async () => {
	const web3storageService = Web3Stash('WEB3.STORAGE', {token: process.env.WEB3_STORAGE_TOKEN});
	const path = './test/test.jpg';
	const result = await web3storageService.uploadImage(path);
	expect(result).toEqual(
		expect.objectContaining({id: expect.any(String), metadata: expect.any(Object)}),
	);
});

test('Should Store Video in web3storage', async () => {
	const web3storageService = Web3Stash('WEB3.STORAGE', {token: process.env.WEB3_STORAGE_TOKEN});
	const path = './test/test.mp4';
	const result = await web3storageService.uploadVideo(path);
	expect(result).toEqual(
		expect.objectContaining({id: expect.any(String), metadata: expect.any(Object)}),
	);
});

test('Should Store File in web3storage', async () => {
	const web3storageService = Web3Stash('WEB3.STORAGE', {token: process.env.WEB3_STORAGE_TOKEN});
	const path = './test/test.pdf';
	const result = await web3storageService.uploadVideo(path);
	expect(result).toEqual(
		expect.objectContaining({id: expect.any(String), metadata: expect.any(Object)}),
	);
});

