import {StorageService} from './base-storage.js';
import type {UploadOutput} from '../types';
import Arweave from 'arweave';
import {promises as fs} from 'fs';
import {createReadStream} from 'fs';
import * as mime from 'mime-types';
import type {ApiConfig} from 'arweave/node/lib/api';
import {uploadTransactionAsync, createTransactionAsync} from 'arweave-stream-tx';
import {pipeline} from 'stream/promises';
import type {JWKInterface} from 'arweave/node/lib/wallet';

export class ArweaveService extends StorageService {
	public serviceBaseUrl = 'ar://';
	public readonly serviceInstance: Arweave;
	private readonly arweaveKey: any;

	constructor(arweavePrivateKey: JWKInterface, config?: ApiConfig | undefined) {
		super();
		this.serviceInstance = Arweave.init({
			...config,
			host: config?.host ?? 'arweave.net',
			port: config?.port ?? 443,
			protocol: config?.protocol ?? 'https',
		});
		this.arweaveKey = arweavePrivateKey;
	}

	public async uploadJson(jsonData: Record<string, unknown>, options?: any): Promise<UploadOutput> {
		const data = JSON.stringify(jsonData);
		const transaction = await this.serviceInstance.createTransaction({data}, this.arweaveKey);
		transaction.addTag('Content-Type', 'text/json');
		await this.serviceInstance.transactions.sign(transaction, this.arweaveKey);
		const response = await this.serviceInstance.transactions.post(transaction);
		await this.getTxStatus(transaction.id, 0);
		return {id: transaction.id, metadata: {...transaction}};
	}

	public async uploadImage(path: string, options?: any): Promise<UploadOutput> {
		const fileData = await fs.readFile(path);
		const fileType = mime.lookup(path);
		const transaction = await this.serviceInstance.createTransaction({data: fileData}, this.arweaveKey);
		transaction.addTag('Content-Type', fileType as string);
		await this.serviceInstance.transactions.sign(transaction, this.arweaveKey);
		const uploader = await this.serviceInstance.transactions.getUploader(transaction);
		while (!uploader.isComplete) {
			uploader.uploadChunk().then(() => {
				this.emit('upload', uploader.pctComplete, uploader.uploadedChunks, uploader.totalChunks);
			}).catch(err => {
				this.emit('error', 'Uploader Failed to upload');
			});
		}

		await this.getTxStatus(transaction.id, 0);

		return {id: transaction.id, metadata: {...transaction}};
	}

	public async uploadVideo(path: string, options?: any): Promise<UploadOutput> {
		const fileData = await fs.readFile(path);
		const fileType = mime.lookup(path);
		const transaction = await this.serviceInstance.createTransaction({data: fileData}, this.arweaveKey);
		transaction.addTag('Content-Type', fileType as string);
		await this.serviceInstance.transactions.sign(transaction, this.arweaveKey);
		const uploader = await this.serviceInstance.transactions.getUploader(transaction);
		while (!uploader.isComplete) {
			uploader.uploadChunk().then(() => {
				this.emit('upload', uploader.pctComplete, uploader.uploadedChunks, uploader.totalChunks);
			}).catch(err => {
				this.emit('error', 'Uploader Failed to upload');
			});
		}

		await this.getTxStatus(transaction.id, 0);

		return {id: transaction.id, metadata: {...transaction}};
	}

	public async uploadFile(path: string, options?: any): Promise<UploadOutput> {
		const fileData = await fs.readFile(path);
		const fileType = mime.lookup(path);
		const transaction = await this.serviceInstance.createTransaction({data: fileData}, this.arweaveKey);
		transaction.addTag('Content-Type', fileType as string);
		await this.serviceInstance.transactions.sign(transaction, this.arweaveKey);
		const uploader = await this.serviceInstance.transactions.getUploader(transaction);
		while (!uploader.isComplete) {
			uploader.uploadChunk().then(() => {
				this.emit('upload', uploader.pctComplete, uploader.uploadedChunks, uploader.totalChunks);
			}).catch(err => {
				this.emit('error', 'Uploader Failed to upload');
			});
		}

		await this.getTxStatus(transaction.id, 0);

		return {id: transaction.id, metadata: {...transaction}};
	}

	// Public async uploadImageFromStream(path: string, dataSize: number, imageType: string, options?: any): Promise<UploadOutput> {
	// 	const transaction = await pipeline(createReadStream(path), createTransactionAsync({}, this.serviceInstance, this.arweaveKey));

	// 	transaction.addTag('Content-Type', 'image/' + imageType);
	// 	await this.serviceInstance.transactions.sign(transaction, this.arweaveKey);

	// 	await pipeline(createReadStream(path), uploadTransactionAsync(transaction, this.arweaveKey));
	// 	await this.getTxStatus(transaction.id, 0);

	// 	return {id: transaction.id, metadata: {...transaction}};
	// }

	// Public async uploadVideoFromStream(readableStream: internal.Readable, dataSize: number, videoType: string, options?: any): Promise<UploadOutput> {
	// 	const transaction = await pipeline(readableStream, createTransactionAsync({}, this.serviceInstance, this.arweaveKey));
	// 	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	// 	transaction.addTag('Content-Type', 'video/' + videoType);
	// 	await this.serviceInstance.transactions.sign(transaction, this.arweaveKey);

	// 	await pipeline(readableStream, uploadTransactionAsync(transaction, this.arweaveKey));
	// 	await this.getTxStatus(transaction.id, 0);
	// 	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	// 	return {id: transaction.id, metadata: {...transaction}};
	// }

	// Public async uploadFileFromStream(readableStream: any, dataSize: number, options?: any): Promise<UploadOutput> {
	// 	const transaction = await pipeline(readableStream, createTransactionAsync({}, this.serviceInstance, this.arweaveKey));
	// 	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	// 	transaction.addTag('Content-Type', 'file');
	// 	await this.serviceInstance.transactions.sign(transaction, this.arweaveKey);

	// 	await pipeline(readableStream, uploadTransactionAsync(transaction, this.arweaveKey));
	// 	await this.getTxStatus(transaction.id, 0);
	// 	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	// 	return {id: transaction.id, metadata: {...transaction}};
	// }

	private async getTxStatus(txId: string, retries: number) {
		try {
			const tx = await this.serviceInstance.transactions.getStatus(txId);

			if (tx.status === 200 && tx.confirmed) {
				if (tx.confirmed.number_of_confirmations > 10) {
					this.emit('success', tx);
				} else {
					this.emit('confirmation', tx.confirmed.number_of_confirmations, txId);
					setTimeout(() => {
						this.getTxStatus(txId, 0).then().catch(e => {
							console.log(e);
						});
					}, 10000); // 30secs
				}
			} else if (retries <= 10) {
				if (tx.status === 202 || tx.status === 429 || tx.status === 404) { // 429 Rate Limit, 404 Transaction Not Found
					setTimeout(() => {
						this.getTxStatus(txId, ++retries).then().catch(e => {
							console.log(e);
						});
					}, 20000); // 120secs
				} else {
					this.emit('error', `Arweave Upload Failed, Status code: ${tx.status}`, txId);
				}
			} else {
				this.emit('error', 'Max Retries Exceeded: Transaction Status Update Failed/Not Found', txId);
			}
		} catch (error: unknown) {
			this.emit('error', error, txId);
		}

		return true;
	}
}
