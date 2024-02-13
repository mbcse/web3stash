import { StorageService } from './base-storage.js';
import type { UploadOutput } from '../types/index.js';
export declare class HeliaStorageService extends StorageService {
    serviceBaseUrl: string;
    readonly serviceInstance: any;
    constructor(config?: any);
    uploadJson(jsonData: Record<string, unknown>, options?: any): Promise<UploadOutput>;
    uploadImage(path: string, options?: any): Promise<UploadOutput>;
    uploadVideo(path: string, options?: any): Promise<UploadOutput>;
    uploadFile(path: string, options?: any): Promise<UploadOutput>;
}
