import { StorageService } from './base-storage.js';
import type { UploadOutput } from '../types';
import Bundlr from '@bundlr-network/client';
export declare class BundlrService extends StorageService {
    serviceBaseUrl: string;
    bundlrMainNetworkUrl: string;
    bundlrTestNetworkUrl: string;
    testing: boolean;
    readonly serviceInstance: Bundlr;
    private readonly bundlrKey;
    constructor(currency: string, privateKey: string, testing?: boolean, config?: {
        timeout?: number | undefined;
        providerUrl?: string | undefined;
        contractAddress?: string | undefined;
        currencyOpts?: any;
    } | undefined);
    uploadJson(jsonData: Record<string, unknown>, options?: any): Promise<UploadOutput>;
    uploadImage(path: string, options?: any): Promise<UploadOutput>;
    uploadVideo(path: string, options?: any): Promise<UploadOutput>;
    uploadFile(path: string, options?: any): Promise<UploadOutput>;
    uploadImageFromStream(readableStream: any, dataSize: number, imageType: string, options?: any): Promise<UploadOutput>;
    uploadVideoFromStream(readableStream: any, dataSize: number, videoType: string, options?: any): Promise<UploadOutput>;
    uploadFileFromStream(readableStream: any, dataSize: number, options?: any): Promise<UploadOutput>;
    private checkAndFundNode;
    private setChunkerLogger;
}
