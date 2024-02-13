/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { StorageService } from './base-storage.js';
import { createHelia } from 'helia';
import { json } from '@helia/json';
import { unixfs } from '@helia/unixfs';
import { promises as fs } from 'fs';
export class HeliaStorageService extends StorageService {
    serviceBaseUrl = 'ipfs://';
    serviceInstance;
    constructor(config) {
        super();
        this.serviceInstance = createHelia(config);
    }
    async uploadJson(jsonData, options) {
        const j = json(this.serviceInstance);
        const hash = await j.add(jsonData);
        return { id: hash.toString(), metadata: {} };
    }
    async uploadImage(path, options) {
        const fsh = unixfs(this.serviceInstance);
        const imageData = await fs.readFile(path);
        const cid = await fsh.addBytes(imageData);
        return { id: cid.toString(), metadata: {} };
    }
    async uploadVideo(path, options) {
        const fsh = unixfs(this.serviceInstance);
        const videoData = await fs.readFile(path);
        const cid = await fsh.addBytes(videoData);
        return { id: cid.toString(), metadata: {} };
    }
    async uploadFile(path, options) {
        const fsh = unixfs(this.serviceInstance);
        const fileData = await fs.readFile(path);
        const cid = await fsh.addBytes(fileData);
        return { id: cid.toString(), metadata: {} };
    }
}
