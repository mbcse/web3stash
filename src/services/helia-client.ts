/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {StorageService} from './base-storage.js';
import type {UploadOutput} from '../types/index.js';
import { createHelia } from 'helia'
import { json } from '@helia/json'
import { unixfs } from '@helia/unixfs'

import {promises as fs} from 'fs';


export class HeliaStorageService extends StorageService {

	public serviceBaseUrl = 'ipfs://';
	public readonly serviceInstance: any;

	constructor(config?: any) {
		super();
		this.serviceInstance = createHelia(config);
	}

	public async uploadJson(jsonData: Record<string, unknown>, options?: any): Promise<UploadOutput> {
		const j = json(this.serviceInstance)
		const hash = await j.add(jsonData);
		return {id: hash.toString(), metadata: {}};
	}

	public async uploadImage(path: string, options?: any): Promise<UploadOutput> {
		const fsh = unixfs(this.serviceInstance)
        const imageData = await fs.readFile(path);
        const cid = await fsh.addBytes(imageData)
		return {id: cid.toString(), metadata: {}};
	}

	public async uploadVideo(path: string, options?: any): Promise<UploadOutput> {
		const fsh = unixfs(this.serviceInstance)
        const videoData = await fs.readFile(path);
        const cid = await fsh.addBytes(videoData)
		return {id: cid.toString(), metadata: {}};
	}

	public async uploadFile(path: string, options?: any): Promise<UploadOutput> {
		const fsh = unixfs(this.serviceInstance)
        const fileData = await fs.readFile(path);
        const cid = await fsh.addBytes(fileData)
		return {id: cid.toString(), metadata: {}};
	}
}
