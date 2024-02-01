import { StorageService } from './base-storage.js';
import pinataSDK from '@pinata/sdk';
export class PinataService extends StorageService {
    serviceBaseUrl = 'ipfs://';
    serviceInstance;
    constructor(pinataApiKey, pinataApiSecret) {
        super();
        this.serviceInstance = pinataSDK(pinataApiKey, pinataApiSecret);
    }
    async uploadJson(jsonData, options) {
        const response = await this.serviceInstance.pinJSONToIPFS(jsonData, options);
        return { id: response.IpfsHash, metadata: { ...response } };
    }
    async uploadImage(path, options) {
        const response = await this.serviceInstance.pinFromFS(path, options);
        return { id: response.IpfsHash, metadata: { ...response } };
    }
    async uploadVideo(path, options) {
        const response = await this.serviceInstance.pinFromFS(path, options);
        return { id: response.IpfsHash, metadata: { ...response } };
    }
    async uploadFile(path, options) {
        const response = await this.serviceInstance.pinFromFS(path, options);
        return { id: response.IpfsHash, metadata: { ...response } };
    }
    async uploadImageFromStream(readableStream, options) {
        const response = await this.serviceInstance.pinFileToIPFS(readableStream, options);
        return { id: response.IpfsHash, metadata: { ...response } };
    }
    async uploadVideoFromStream(readableStream, options) {
        const response = await this.serviceInstance.pinFileToIPFS(readableStream, options);
        return { id: response.IpfsHash, metadata: { ...response } };
    }
    async uploadFileFromStream(readableStream, options) {
        const response = await this.serviceInstance.pinFileToIPFS(readableStream, options);
        return { id: response.IpfsHash, metadata: { ...response } };
    }
}
