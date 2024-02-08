/* eslint-disable new-cap */
/* eslint-disable no-undef */
const {Web3Stash} = require('../dist/cjs/index.js');

test('Should Initialize INFURA Service When Service Name Passed Correctly', () => {
	const infura = Web3Stash('INFURA', {projectId: process.env.INFURA_PROJECT_ID, projectSecret: process.env.INFURA_PROJECT_SECRET});
	expect(infura.serviceInstance).not.toBeUndefined();
});

test('Initializing infura Service Should Throw Error On Wrong Service Name', () => {
	expect(() => Web3Stash('INFURAE', {projectId: process.env.INFURA_PROJECT_ID, projectSecret: process.env.INFURA_PROJECT_SECRET})).toThrow('Unknown Service Type');
});

test('Should Store Json Data in infura', async () => {
	const infuraService = Web3Stash('INFURA', {projectId: process.env.INFURA_PROJECT_ID, projectSecret: process.env.INFURA_PROJECT_SECRET});
	const data = {test: 'test'};
	const result = await infuraService.uploadJson(data);
	expect(result).toEqual(
		expect.objectContaining({id: expect.any(String), metadata: expect.any(Object)}),
	);
});

test('Should Store Image in infura', async () => {
	const infuraService = Web3Stash('INFURA', {projectId: process.env.INFURA_PROJECT_ID, projectSecret: process.env.INFURA_PROJECT_SECRET});
	const path = './test/test.jpg';
	const result = await infuraService.uploadImage(path);
	expect(result).toEqual(
		expect.objectContaining({id: expect.any(String), metadata: expect.any(Object)}),
	);
});

test('Should Store Video in infura', async () => {
	const infuraService = Web3Stash('INFURA', {projectId: process.env.INFURA_PROJECT_ID, projectSecret: process.env.INFURA_PROJECT_SECRET});
	const path = './test/test.mp4';
	const result = await infuraService.uploadVideo(path);
	expect(result).toEqual(
		expect.objectContaining({id: expect.any(String), metadata: expect.any(Object)}),
	);
});

test('Should Store File in infura', async () => {
	const infuraService = Web3Stash('INFURA', {projectId: process.env.INFURA_PROJECT_ID, projectSecret: process.env.INFURA_PROJECT_SECRET});
	const path = './test/test.pdf';
	const result = await infuraService.uploadVideo(path);
	expect(result).toEqual(
		expect.objectContaining({id: expect.any(String), metadata: expect.any(Object)}),
	);
});

