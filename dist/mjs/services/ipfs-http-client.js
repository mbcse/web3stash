/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { StorageService } from './base-storage.js';
import { create } from 'ipfs-http-client';
import { promises as fs } from 'fs';
export class IpfsService extends StorageService {
    serviceBaseUrl = 'ipfs://';
    serviceInstance;
    constructor(url, config) {
        super();
        this.serviceInstance = create(url);
    }
    async uploadJson(jsonData, options) {
        const data = Buffer.from(JSON.stringify(jsonData));
        const response = await this.serviceInstance.add(data, options);
        return { id: response.cid.toString(), metadata: { ...response } };
    }
    async uploadImage(path, options) {
        const imageData = await fs.readFile(path);
        const response = await this.serviceInstance.add(imageData, options);
        return { id: response.cid.toString(), metadata: { ...response } };
    }
    async uploadVideo(path, options) {
        const videoData = await fs.readFile(path);
        const response = await this.serviceInstance.add(videoData, options);
        return { id: response.cid.toString(), metadata: { ...response } };
    }
    async uploadFile(path, options) {
        const fileData = await fs.readFile(path);
        const response = await this.serviceInstance.add(fileData, options);
        return { id: response.cid.toString(), metadata: { ...response } };
    }
}
