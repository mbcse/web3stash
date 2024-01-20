import {StorageService} from './base-storage.js';
import type {UploadOutput} from '../types';
// Import Bundlr from './bundlrHelper.js';
import Bundlr from '@bundlr-network/client';
import {promises as fs} from 'fs';
import * as mime from 'mime-types';
import type {ChunkingUploader} from '@bundlr-network/client/build/common/chunkingUploader';
export class BundlrService extends StorageService {
	public serviceBaseUrl = 'ar://';
	public bundlrMainNetworkUrl = 'http://node2.bundlr.network';
	public bundlrTestNetworkUrl = 'https://devnet.bundlr.network';
	public testing: boolean;
	public readonly serviceInstance: Bundlr;
	private readonly bundlrKey: string;

	constructor(currency: string, privateKey: string, testing = false, config?: {timeout?: number | undefined; providerUrl?: string | undefined; contractAddress?: string | undefined; currencyOpts?: any} | undefined) {
		super();
		this.testing = testing;
		this.bundlrKey = privateKey;
		const url = testing ? this.bundlrTestNetworkUrl : this.bundlrMainNetworkUrl;

		this.serviceInstance = new Bundlr(url, currency, privateKey, config);
	}

	public async uploadJson(jsonData: Record<string, unknown>, options?: any): Promise<UploadOutput> {
		const data = JSON.stringify(jsonData);
		await this.checkAndFundNode(data.length);
		const tags = [{name: 'Content-Type', value: 'text/json'}];
		const transaction = this.serviceInstance.createTransaction(data, {...options, tags});
		await transaction.sign();
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const response = await transaction.upload();
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		return {id: response.data.id, metadata: {...response.data}};
	}

	public async uploadImage(path: string, options?: any): Promise<UploadOutput> {
		const fileData = await fs.readFile(path);
		const fileType = mime.lookup(path);
		await this.checkAndFundNode(fileData.length);
		const tags = [{name: 'Content-Type', value: fileType}];
		const transaction = this.serviceInstance.createTransaction(fileData, {...options, tags});
		await transaction.sign();
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const response = await transaction.upload();
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		return {id: response.data.id, metadata: {...response.data}};
	}

	public async uploadVideo(path: string, options?: any): Promise<UploadOutput> {
		const fileData = await fs.readFile(path);
		const fileType = mime.lookup(path);
		await this.checkAndFundNode(fileData.length);
		const tags = [{name: 'Content-Type', value: fileType}];
		const transaction = this.serviceInstance.createTransaction(fileData, {...options, tags});
		await transaction.sign();
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const response = await transaction.upload();
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		return {id: response.data.id, metadata: {...response.data}};
	}

	public async uploadFile(path: string, options?: any): Promise<UploadOutput> {
		const fileData = await fs.readFile(path);
		const fileType = mime.lookup(path);
		await this.checkAndFundNode(fileData.length);
		const tags = [{name: 'Content-Type', value: fileType}];
		const transaction = this.serviceInstance.createTransaction(fileData, {...options, tags});
		await transaction.sign();
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const response = await transaction.upload();
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		return {id: response.data.id, metadata: {...response.data}};
	}

	public async uploadImageFromStream(readableStream: any, dataSize: number, imageType: string, options?: any): Promise<UploadOutput> {
		await this.checkAndFundNode(dataSize);
		const tags = [{name: 'Content-Type', value: `image/${imageType}`}];
		const uploader = this.serviceInstance.uploader.chunkedUploader;
		this.setChunkerLogger(uploader);

		const response = await uploader.uploadData(readableStream, {...options, tags});

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		return {id: response.data.id, metadata: {...response.data}};
	}

	public async uploadVideoFromStream(readableStream: any, dataSize: number, videoType: string, options?: any): Promise<UploadOutput> {
		await this.checkAndFundNode(dataSize);
		const tags = [{name: 'Content-Type', value: `video/${videoType}`}];
		const uploader = this.serviceInstance.uploader.chunkedUploader;
		this.setChunkerLogger(uploader);
		const response = await uploader.uploadData(readableStream, {...options, tags});
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		return {id: response.data.id, metadata: {...response.data}};
	}

	public async uploadFileFromStream(readableStream: any, dataSize: number, options?: any): Promise<UploadOutput> {
		await this.checkAndFundNode(dataSize);
		const tags = [{name: 'Content-Type', value: 'file'}];
		const uploader = this.serviceInstance.uploader.chunkedUploader;
		this.setChunkerLogger(uploader);
		const response = await uploader.uploadData(readableStream, {...options, tags});

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		return {id: response.data.id, metadata: {...response.data}};
	}

	private async checkAndFundNode(dataSize: number): Promise<any> {
		const currentBalance = await this.serviceInstance.getLoadedBalance();
		const fundsRequired = await this.serviceInstance.getPrice(dataSize);
		if (fundsRequired.isGreaterThan(currentBalance)) {
			const fundingResponse = await this.serviceInstance.fund(fundsRequired);
			return fundingResponse;
		}

		return true;
	}

	private setChunkerLogger(uploader: ChunkingUploader) {
		uploader.on('chunkUpload', chunkInfo => {
			console.log(`Uploaded Chunk number ${chunkInfo.id}, offset of ${chunkInfo.offset}, size ${chunkInfo.size} Bytes, with a total of ${chunkInfo.totalUploaded} bytes uploaded.`);
		});

		uploader.on('chunkError', e => {
			console.log(`Error uploading chunk number ${e.id} - ${e.res.statusText}`);
		});

		uploader.on('done', finishRes => {
			console.log('Upload completed with ID ', finishRes.data.id);
		});
	}
}
