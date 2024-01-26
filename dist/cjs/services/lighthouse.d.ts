import { StorageService } from './base-storage.js';
import type { UploadOutput } from '../types';
import lighthouse from '@lighthouse-web3/sdk';
export declare class LighthouseStorageService extends StorageService {
    serviceBaseUrl: string;
    readonly serviceInstance: lighthouse;
    readonly apiKey: string;
    constructor(apiKey: string, config: any);
    uploadJson(jsonData: Record<string, unknown>, options?: any): Promise<UploadOutput>;
    uploadImage(path: string, options?: any): Promise<UploadOutput>;
    uploadVideo(path: string, options?: any): Promise<UploadOutput>;
    uploadFile(path: string, options?: any): Promise<UploadOutput>;
}
