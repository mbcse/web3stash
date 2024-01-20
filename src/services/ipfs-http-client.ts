/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {StorageService} from './base-storage.js';
import type {UploadOutput} from '../types';
import type {IPFSHTTPClient, Options} from 'ipfs-http-client';
import {create} from 'ipfs-http-client';
import {promises as fs} from 'fs';

export class IpfsService extends StorageService {
	public serviceBaseUrl = 'ipfs://';
	public readonly serviceInstance: IPFSHTTPClient;

	constructor(url: Options, config?: any) {
		super();
		this.serviceInstance = create(url);
	}

	public async uploadJson(jsonData: Record<string, unknown>, options?: any): Promise<UploadOutput> {
		const data = Buffer.from(JSON.stringify(jsonData));
		const response = await this.serviceInstance.add(data, options);
		return {id: response.cid.toString(), metadata: {...response}};
	}

	public async uploadImage(path: string, options?: any): Promise<UploadOutput> {
		const imageData = await fs.readFile(path);
		const response = await this.serviceInstance.add(imageData, options);
		return {id: response.cid.toString(), metadata: {...response}};
	}

	public async uploadVideo(path: string, options?: any): Promise<UploadOutput> {
		const videoData = await fs.readFile(path);
		const response = await this.serviceInstance.add(videoData, options);
		return {id: response.cid.toString(), metadata: {...response}};
	}

	public async uploadFile(path: string, options?: any): Promise<UploadOutput> {
		const fileData = await fs.readFile(path);
		const response = await this.serviceInstance.add(fileData, options);
		return {id: response.cid.toString(), metadata: {...response}};
	}
}
