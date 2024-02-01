/// <reference types="node" />
import type { UploadOutput } from '../types';
import { EventEmitter } from 'events';
export declare abstract class StorageService extends EventEmitter {
    abstract readonly serviceBaseUrl: string;
    abstract readonly serviceInstance: any;
    abstract uploadJson(jsonData: Record<string, unknown>, options?: any): Promise<UploadOutput>;
    abstract uploadImage(path: string, options?: any): Promise<UploadOutput>;
    abstract uploadVideo(path: string, options?: any): Promise<UploadOutput>;
    abstract uploadFile(path: string, options?: any): Promise<UploadOutput>;
}
