import {StorageService} from './base-storage.js';
import type {UploadOutput} from '../types';
import MoralisDefault from 'moralis';
const Moralis = MoralisDefault.default;
import {promises as fs} from 'fs';
import * as mime from 'mime-types';
import Path from 'path';

export class MoralisIpfsService extends StorageService {
	public serviceBaseUrl = 'ipfs://';
	public readonly serviceInstance: Web3Storage;

	constructor(token: string, config: any) {
		super();
		this.serviceInstance = new Web3Storage({token, ...config});
	}

	public async uploadJson(jsonData: Record<string, unknown>, options?: any): Promise<UploadOutput> {
		const data = JSON.stringify(jsonData);
		const fileJsonData = new File([data], 'data.json', {type: 'application/json'});
		const cid = await this.serviceInstance.put([fileJsonData]);
		return {id: cid + '/data.json', metadata: {}};
	}

	public async uploadImage(path: string, options?: any): Promise<UploadOutput> {
		const fileData = await fs.readFile(path);
		const fileType = mime.lookup(path);
		const fileName = options?.fileName as string || Path.basename(path);
		const imageFile = new File([fileData], fileName, {type: fileType as string});
		const cid = await this.serviceInstance.put([imageFile]);
		return {id: cid, metadata: {}};
	}

	public async uploadVideo(path: string, options?: any): Promise<UploadOutput> {
		const fileData = await fs.readFile(path);
		const fileType = mime.lookup(path);
		const fileName = options?.fileName as string || Path.basename(path);
		const videoFile = new File([fileData], fileName, {type: fileType as string});
		const cid = await this.serviceInstance.put([videoFile]);
		return {id: cid, metadata: {}};
	}

	public async uploadFile(path: string, options?: any): Promise<UploadOutput> {
		const fileData = await fs.readFile(path);
		const fileType = mime.lookup(path);
		const fileName = options?.fileName as string || Path.basename(path);
		const file = new File([fileData], fileName, {type: fileType as string});
		const cid = await this.serviceInstance.put([file]);
		return {id: cid, metadata: {}};
	}
}
