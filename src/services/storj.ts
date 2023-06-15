import {StorageService} from './base-storage.js';
import type {UploadOutput} from '../types';
import axios from 'axios';
import FormData from 'form-data';
import {promises as fs} from 'fs';
import * as mime from 'mime-types';
import Path from 'path';

export class StorjService extends StorageService {
	public serviceBaseUrl = 'ipfs://';
	public readonly serviceInstance: any;

	constructor(token: string, config: any) {
		super();
		this.serviceInstance = 'https://demo.storj-ipfs.com/api/v0/add';
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
