/* eslint-disable new-cap */
/* eslint-disable no-undef */
const {Web3Stash} = require('../dist/cjs/index.js');

test('Should Initialize NFT.STORAGE Service When Service Name Passed Correctly', () => {
	const nftstorage = Web3Stash('NFT.STORAGE', {token: process.env.NFT_STORAGE_TOKEN});
	expect(nftstorage.serviceInstance).not.toBeUndefined();
});

test('Initializing nftstorage Service Should Throw Error On Wrong Service Name', () => {
	expect(() => Web3Stash('NFT.STORAGEE', {token: process.env.NFT_STORAGE_TOKEN})).toThrow('Unknown Service Type');
});

test('Should Store Json Data in nftstorage', async () => {
	const nftstorageService = Web3Stash('NFT.STORAGE', {token: process.env.NFT_STORAGE_TOKEN});
	const data = {test: 'test'};
	const result = await nftstorageService.uploadJson(data);
	expect(result).toEqual(
		expect.objectContaining({id: expect.any(String), metadata: expect.any(Object)}),
	);
});

test('Should Store Image in nftstorage', async () => {
	const nftstorageService = Web3Stash('NFT.STORAGE', {token: process.env.NFT_STORAGE_TOKEN});
	const path = './test/test.jpg';
	const result = await nftstorageService.uploadImage(path);
	expect(result).toEqual(
		expect.objectContaining({id: expect.any(String), metadata: expect.any(Object)}),
	);
});

test('Should Store Video in nftstorage', async () => {
	const nftstorageService = Web3Stash('NFT.STORAGE', {token: process.env.NFT_STORAGE_TOKEN});
	const path = './test/test.mp4';
	const result = await nftstorageService.uploadVideo(path);
	expect(result).toEqual(
		expect.objectContaining({id: expect.any(String), metadata: expect.any(Object)}),
	);
});

test('Should Store File in nftstorage', async () => {
	const nftstorageService = Web3Stash('NFT.STORAGE', {token: process.env.NFT_STORAGE_TOKEN});
	const path = './test/test.pdf';
	const result = await nftstorageService.uploadVideo(path);
	expect(result).toEqual(
		expect.objectContaining({id: expect.any(String), metadata: expect.any(Object)}),
	);
});

