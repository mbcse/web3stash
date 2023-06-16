import { StorageService } from './base-storage.js';
import type { UploadOutput } from '../types';
import Arweave from 'arweave';
import type { ApiConfig } from 'arweave/node/lib/api';
import type { JWKInterface } from 'arweave/node/lib/wallet';
export declare class ArweaveService extends StorageService {
    serviceBaseUrl: string;
    readonly serviceInstance: Arweave;
    private readonly arweaveKey;
    constructor(arweavePrivateKey: JWKInterface, config?: ApiConfig | undefined);
    uploadJson(jsonData: Record<string, unknown>, options?: any): Promise<UploadOutput>;
    uploadImage(path: string, options?: any): Promise<UploadOutput>;
    uploadVideo(path: string, options?: any): Promise<UploadOutput>;
    uploadFile(path: string, options?: any): Promise<UploadOutput>;
    private getTxStatus;
}
