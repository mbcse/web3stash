import { StorageService } from './base-storage.js';
import type { UploadOutput } from '../types';
import { NFTStorage } from 'nft.storage';
export declare class NftStorageService extends StorageService {
    serviceBaseUrl: string;
    readonly serviceInstance: NFTStorage;
    constructor(token: string, config: any);
    uploadJson(jsonData: Record<string, unknown>, options?: any): Promise<UploadOutput>;
    uploadImage(path: string, options?: any): Promise<UploadOutput>;
    uploadVideo(path: string, options?: any): Promise<UploadOutput>;
    uploadFile(path: string, options?: any): Promise<UploadOutput>;
}
