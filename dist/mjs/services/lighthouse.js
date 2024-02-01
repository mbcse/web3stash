/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { StorageService } from './base-storage.js';
import * as fsHelper from './helpers/fsHelper.js';
// @ts-expect-error No Typings
import lighthouse from '@lighthouse-web3/sdk';
export class LighthouseStorageService extends StorageService {
    serviceBaseUrl = 'ipfs://';
    serviceInstance;
    apiKey;
    constructor(apiKey, config) {
        super();
        this.serviceInstance = lighthouse;
        this.apiKey = apiKey;
    }
    async uploadJson(jsonData, options) {
        await fsHelper.writeFile('./webstash-tmp/lighthouse.json', JSON.stringify(jsonData));
        const response = await this.serviceInstance.deploy('./webstash-tmp/lighthouse.json', this.apiKey);
        await fsHelper.deleteFile('./webstash-tmp');
        return { id: response.Hash, metadata: { ...response } };
    }
    async uploadImage(path, options) {
        const response = await this.serviceInstance.deploy(path, this.apiKey);
        return { id: response.Hash, metadata: { ...response } };
    }
    async uploadVideo(path, options) {
        const response = await this.serviceInstance.deploy(path, this.apiKey);
        return { id: response.Hash, metadata: { ...response } };
    }
    async uploadFile(path, options) {
        const response = await this.serviceInstance.deploy(path, this.apiKey);
        return { id: response.Hash, metadata: { ...response } };
    }
}
