import { StorageService } from './base-storage.js';
import { Web3Storage, File } from 'web3.storage';
import { promises as fs } from 'fs';
import * as mime from 'mime-types';
import Path from 'path';
export class Web3StorageService extends StorageService {
    serviceBaseUrl = 'ipfs://';
    serviceInstance;
    constructor(token, config) {
        super();
        this.serviceInstance = new Web3Storage({ token, ...config });
    }
    async uploadJson(jsonData, options) {
        const data = JSON.stringify(jsonData);
        const fileJsonData = new File([data], 'data.json', { type: 'application/json' });
        const cid = await this.serviceInstance.put([fileJsonData]);
        return { id: cid + '/data.json', metadata: {} };
    }
    async uploadImage(path, options) {
        const fileData = await fs.readFile(path);
        const fileType = mime.lookup(path);
        const fileName = options?.fileName || Path.basename(path);
        const imageFile = new File([fileData], fileName, { type: fileType });
        const cid = await this.serviceInstance.put([imageFile]);
        return { id: cid, metadata: {} };
    }
    async uploadVideo(path, options) {
        const fileData = await fs.readFile(path);
        const fileType = mime.lookup(path);
        const fileName = options?.fileName || Path.basename(path);
        const videoFile = new File([fileData], fileName, { type: fileType });
        const cid = await this.serviceInstance.put([videoFile]);
        return { id: cid, metadata: {} };
    }
    async uploadFile(path, options) {
        const fileData = await fs.readFile(path);
        const fileType = mime.lookup(path);
        const fileName = options?.fileName || Path.basename(path);
        const file = new File([fileData], fileName, { type: fileType });
        const cid = await this.serviceInstance.put([file]);
        return { id: cid, metadata: {} };
    }
}
