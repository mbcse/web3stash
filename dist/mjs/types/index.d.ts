import type { JWKInterface } from 'arweave/node/lib/wallet';
import type { Options as IpfsOptions } from 'ipfs-http-client';
export declare type UploadOutput = {
    id: string;
    metadata: Record<string, unknown>;
};
export declare type Web3StashServices = 'IPFS-CLIENT' | 'INFURA' | 'PINATA' | 'BUNDLR' | 'NFT.STORAGE' | 'WEB3.STORAGE' | 'ARWEAVE' | 'LIGHTHOUSE' | 'HELIA';
export declare type PinataServiceConfig = {
    apiKey: string;
    apiSecret: string;
};
export declare type BundlrServiceConfig = {
    currency: string;
    privateKey: string;
    testing?: boolean;
};
export declare type NftStorageServiceConfig = {
    token: string;
};
export declare type Web3StorageServiceConfig = {
    token: string;
};
export declare type ArweaveServiceConfig = {
    arweavePrivateKey: JWKInterface;
};
export declare type IpfsServiceConfig = {
    url: IpfsOptions;
};
export declare type InfuraServiceConfig = {
    projectId: string;
    projectSecret: string;
};
export declare type LighthouseServiceConfig = {
    lighthouseApiKey: string;
};
export declare type HeliaServiceConfig = {};
export declare type Web3StashConfig = BundlrServiceConfig | LighthouseServiceConfig | PinataServiceConfig | ArweaveServiceConfig | NftStorageServiceConfig | Web3StorageServiceConfig | IpfsServiceConfig | InfuraServiceConfig | HeliaServiceConfig;
