import {StorageService} from './base-storage.js';
import type {UploadOutput} from '../types';
import type {PinataClient} from '@pinata/sdk';
import pinataSDK from '@pinata/sdk';

export class PinataService extends StorageService {
	public serviceBaseUrl = 'ipfs://';
	public readonly serviceInstance: PinataClient;

	constructor(pinataApiKey: string, pinataApiSecret: string) {
		super();
		this.serviceInstance = pinataSDK(pinataApiKey, pinataApiSecret);
	}

	public async uploadJson(jsonData: Record<string, unknown>, options?: any): Promise<UploadOutput> {
		const response = await this.serviceInstance.pinJSONToIPFS(jsonData, options);
		return {id: response.IpfsHash, metadata: {...response}};
	}

	public async uploadImage(path: string, options?: any): Promise<UploadOutput> {
		const response = await this.serviceInstance.pinFromFS(path, options);
		return {id: response.IpfsHash, metadata: {...response}};
	}

	public async uploadVideo(path: string, options?: any): Promise<UploadOutput> {
		const response = await this.serviceInstance.pinFromFS(path, options);
		return {id: response.IpfsHash, metadata: {...response}};
	}

	public async uploadFile(path: string, options?: any): Promise<UploadOutput> {
		const response = await this.serviceInstance.pinFromFS(path, options);
		return {id: response.IpfsHash, metadata: {...response}};
	}

	public async uploadImageFromStream(readableStream: any, options?: any): Promise<UploadOutput> {
		const response = await this.serviceInstance.pinFileToIPFS(readableStream, options);
		return {id: response.IpfsHash, metadata: {...response}};
	}

	public async uploadVideoFromStream(readableStream: any, options?: any): Promise<UploadOutput> {
		const response = await this.serviceInstance.pinFileToIPFS(readableStream, options);
		return {id: response.IpfsHash, metadata: {...response}};
	}

	public async uploadFileFromStream(readableStream: any, options?: any): Promise<UploadOutput> {
		const response = await this.serviceInstance.pinFileToIPFS(readableStream, options);
		return {id: response.IpfsHash, metadata: {...response}};
	}
}
