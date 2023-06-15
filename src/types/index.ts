import type {JWKInterface} from 'arweave/node/lib/wallet';
import type {Options as IpfsOptions} from 'ipfs-http-client';

export type UploadOutput = {
	id: string;
	metadata: Record<string, unknown>;
};

export type Web3StashServices = 'IPFS-CLIENT' | 'INFURA' | 'PINATA' | 'BUNDLR'
| 'NFT.STORAGE' | 'WEB3.STORAGE' | 'ARWEAVE' | 'LIGHTHOUSE';

export type PinataServiceConfig = {
	apiKey: string;
	apiSecret: string;
};

export type BundlrServiceConfig = {
	currency: string;
	privateKey: string;
	testing?: boolean;
};

export type NftStorageServiceConfig = {
	token: string;
};

export type Web3StorageServiceConfig = {
	token: string;
};

export type ArweaveServiceConfig = {
	arweavePrivateKey: JWKInterface;
};

export type IpfsServiceConfig = {
	url: IpfsOptions;
};

export type InfuraServiceConfig = {
	projectId: string;
	projectSecret: string;
};

export type LighthouseServiceConfig = {
	lighthouseApiKey: string;
};

export type Web3StashConfig = BundlrServiceConfig | LighthouseServiceConfig | PinataServiceConfig | ArweaveServiceConfig
| NftStorageServiceConfig | Web3StorageServiceConfig | IpfsServiceConfig | InfuraServiceConfig;
