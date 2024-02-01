import { StorageService } from './base-storage.js';
// Import Bundlr from './bundlrHelper.js';
import Bundlr from '@bundlr-network/client';
import { promises as fs } from 'fs';
import * as mime from 'mime-types';
export class BundlrService extends StorageService {
    serviceBaseUrl = 'ar://';
    bundlrMainNetworkUrl = 'http://node2.bundlr.network';
    bundlrTestNetworkUrl = 'https://devnet.bundlr.network';
    testing;
    serviceInstance;
    bundlrKey;
    constructor(currency, privateKey, testing = false, config) {
        super();
        this.testing = testing;
        this.bundlrKey = privateKey;
        const url = testing ? this.bundlrTestNetworkUrl : this.bundlrMainNetworkUrl;
        this.serviceInstance = new Bundlr.default(url, currency, privateKey, config);
    }
    async uploadJson(jsonData, options) {
        const data = JSON.stringify(jsonData);
        await this.checkAndFundNode(data.length);
        const tags = [{ name: 'Content-Type', value: 'text/json' }];
        const transaction = this.serviceInstance.createTransaction(data, { ...options, tags });
        await transaction.sign();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const response = await transaction.upload();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        return { id: response.data.id, metadata: { ...response.data } };
    }
    async uploadImage(path, options) {
        const fileData = await fs.readFile(path);
        const fileType = mime.lookup(path);
        await this.checkAndFundNode(fileData.length);
        const tags = [{ name: 'Content-Type', value: fileType }];
        const transaction = this.serviceInstance.createTransaction(fileData, { ...options, tags });
        await transaction.sign();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const response = await transaction.upload();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        return { id: response.data.id, metadata: { ...response.data } };
    }
    async uploadVideo(path, options) {
        const fileData = await fs.readFile(path);
        const fileType = mime.lookup(path);
        await this.checkAndFundNode(fileData.length);
        const tags = [{ name: 'Content-Type', value: fileType }];
        const transaction = this.serviceInstance.createTransaction(fileData, { ...options, tags });
        await transaction.sign();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const response = await transaction.upload();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        return { id: response.data.id, metadata: { ...response.data } };
    }
    async uploadFile(path, options) {
        const fileData = await fs.readFile(path);
        const fileType = mime.lookup(path);
        await this.checkAndFundNode(fileData.length);
        const tags = [{ name: 'Content-Type', value: fileType }];
        const transaction = this.serviceInstance.createTransaction(fileData, { ...options, tags });
        await transaction.sign();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const response = await transaction.upload();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        return { id: response.data.id, metadata: { ...response.data } };
    }
    async uploadImageFromStream(readableStream, dataSize, imageType, options) {
        await this.checkAndFundNode(dataSize);
        const tags = [{ name: 'Content-Type', value: `image/${imageType}` }];
        const uploader = this.serviceInstance.uploader.chunkedUploader;
        this.setChunkerLogger(uploader);
        const response = await uploader.uploadData(readableStream, { ...options, tags });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        return { id: response.data.id, metadata: { ...response.data } };
    }
    async uploadVideoFromStream(readableStream, dataSize, videoType, options) {
        await this.checkAndFundNode(dataSize);
        const tags = [{ name: 'Content-Type', value: `video/${videoType}` }];
        const uploader = this.serviceInstance.uploader.chunkedUploader;
        this.setChunkerLogger(uploader);
        const response = await uploader.uploadData(readableStream, { ...options, tags });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        return { id: response.data.id, metadata: { ...response.data } };
    }
    async uploadFileFromStream(readableStream, dataSize, options) {
        await this.checkAndFundNode(dataSize);
        const tags = [{ name: 'Content-Type', value: 'file' }];
        const uploader = this.serviceInstance.uploader.chunkedUploader;
        this.setChunkerLogger(uploader);
        const response = await uploader.uploadData(readableStream, { ...options, tags });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        return { id: response.data.id, metadata: { ...response.data } };
    }
    async checkAndFundNode(dataSize) {
        const currentBalance = await this.serviceInstance.getLoadedBalance();
        const fundsRequired = await this.serviceInstance.getPrice(dataSize);
        if (fundsRequired.isGreaterThan(currentBalance)) {
            const fundingResponse = await this.serviceInstance.fund(fundsRequired);
            return fundingResponse;
        }
        return true;
    }
    setChunkerLogger(uploader) {
        uploader.on('chunkUpload', chunkInfo => {
            console.log(`Uploaded Chunk number ${chunkInfo.id}, offset of ${chunkInfo.offset}, size ${chunkInfo.size} Bytes, with a total of ${chunkInfo.totalUploaded} bytes uploaded.`);
        });
        uploader.on('chunkError', e => {
            console.log(`Error uploading chunk number ${e.id} - ${e.res.statusText}`);
        });
        uploader.on('done', finishRes => {
            console.log('Upload completed with ID ', finishRes.data.id);
        });
    }
}
