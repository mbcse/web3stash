import {StorageService} from './base-storage.js';
import type {UploadOutput} from '../types';
import {NFTStorage, File, Blob} from 'nft.storage';
import {promises as fs} from 'fs';
import * as mime from 'mime-types';
import Path from 'path';

export class NftStorageService extends StorageService {
	public serviceBaseUrl = 'ipfs://';
	public readonly serviceInstance: NFTStorage;

	constructor(token: string, config: any) {
		super();
		this.serviceInstance = new NFTStorage({token, ...config});
	}

	public async uploadJson(jsonData: Record<string, unknown>, options?: any): Promise<UploadOutput> {
		const data = JSON.stringify(jsonData);
		const blobData = new Blob([data], {type: 'application/json'});
		const cid = await this.serviceInstance.storeBlob(blobData);
		return {id: cid, metadata: {}};
	}

	public async uploadImage(path: string, options?: any): Promise<UploadOutput> {
		const fileData = await fs.readFile(path);
		const fileType = mime.lookup(path);
		const fileName = options?.fileName as string || Path.basename(path);
		const imageFile = new File([fileData], fileName, {type: fileType as string});
		const cid = await this.serviceInstance.storeBlob(imageFile);
		return {id: cid, metadata: {}};
	}

	public async uploadVideo(path: string, options?: any): Promise<UploadOutput> {
		const fileData = await fs.readFile(path);
		const fileType = mime.lookup(path);
		const fileName = options?.fileName as string || Path.basename(path);
		const videoFile = new File([fileData], fileName, {type: fileType as string});
		const cid = await this.serviceInstance.storeBlob(videoFile);
		return {id: cid, metadata: {}};
	}

	public async uploadFile(path: string, options?: any): Promise<UploadOutput> {
		const fileData = await fs.readFile(path);
		const fileType = mime.lookup(path);
		const fileName = options?.fileName as string || Path.basename(path);
		const file = new File([fileData], fileName, {type: fileType as string});
		const cid = await this.serviceInstance.storeBlob(file);
		return {id: cid, metadata: {}};
	}
}
