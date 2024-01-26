import { StorageService } from './base-storage.js';
import type { UploadOutput } from '../types';
import type { IPFSHTTPClient, Options } from 'ipfs-http-client';
export declare class IpfsService extends StorageService {
    serviceBaseUrl: string;
    readonly serviceInstance: IPFSHTTPClient;
    constructor(url: Options, config?: any);
    uploadJson(jsonData: Record<string, unknown>, options?: any): Promise<UploadOutput>;
    uploadImage(path: string, options?: any): Promise<UploadOutput>;
    uploadVideo(path: string, options?: any): Promise<UploadOutput>;
    uploadFile(path: string, options?: any): Promise<UploadOutput>;
}
