import { StorageService } from './base-storage.js';
import { NFTStorage, File, Blob } from 'nft.storage';
import { promises as fs } from 'fs';
import * as mime from 'mime-types';
import Path from 'path';
export class NftStorageService extends StorageService {
    serviceBaseUrl = 'ipfs://';
    serviceInstance;
    constructor(token, config) {
        super();
        this.serviceInstance = new NFTStorage({ token, ...config });
    }
    async uploadJson(jsonData, options) {
        const data = JSON.stringify(jsonData);
        const blobData = new Blob([data], { type: 'application/json' });
        const cid = await this.serviceInstance.storeBlob(blobData);
        return { id: cid, metadata: {} };
    }
    async uploadImage(path, options) {
        const fileData = await fs.readFile(path);
        const fileType = mime.lookup(path);
        const fileName = options?.fileName || Path.basename(path);
        const imageFile = new File([fileData], fileName, { type: fileType });
        const cid = await this.serviceInstance.storeBlob(imageFile);
        return { id: cid, metadata: {} };
    }
    async uploadVideo(path, options) {
        const fileData = await fs.readFile(path);
        const fileType = mime.lookup(path);
        const fileName = options?.fileName || Path.basename(path);
        const videoFile = new File([fileData], fileName, { type: fileType });
        const cid = await this.serviceInstance.storeBlob(videoFile);
        return { id: cid, metadata: {} };
    }
    async uploadFile(path, options) {
        const fileData = await fs.readFile(path);
        const fileType = mime.lookup(path);
        const fileName = options?.fileName || Path.basename(path);
        const file = new File([fileData], fileName, { type: fileType });
        const cid = await this.serviceInstance.storeBlob(file);
        return { id: cid, metadata: {} };
    }
}
