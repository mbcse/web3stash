"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArweaveService = void 0;
const base_storage_js_1 = require("./base-storage.js");
const arweave_1 = __importDefault(require("arweave"));
const fs_1 = require("fs");
const mime = __importStar(require("mime-types"));
class ArweaveService extends base_storage_js_1.StorageService {
    constructor(arweavePrivateKey, config) {
        var _a, _b, _c;
        super();
        this.serviceBaseUrl = 'ar://';
        this.serviceInstance = arweave_1.default.init(Object.assign(Object.assign({}, config), { host: (_a = config === null || config === void 0 ? void 0 : config.host) !== null && _a !== void 0 ? _a : 'arweave.net', port: (_b = config === null || config === void 0 ? void 0 : config.port) !== null && _b !== void 0 ? _b : 443, protocol: (_c = config === null || config === void 0 ? void 0 : config.protocol) !== null && _c !== void 0 ? _c : 'https' }));
        this.arweaveKey = arweavePrivateKey;
    }
    uploadJson(jsonData, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(jsonData);
            const transaction = yield this.serviceInstance.createTransaction({ data }, this.arweaveKey);
            transaction.addTag('Content-Type', 'text/json');
            yield this.serviceInstance.transactions.sign(transaction, this.arweaveKey);
            const response = yield this.serviceInstance.transactions.post(transaction);
            yield this.getTxStatus(transaction.id, 0);
            return { id: transaction.id, metadata: Object.assign({}, transaction) };
        });
    }
    uploadImage(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileData = yield fs_1.promises.readFile(path);
            const fileType = mime.lookup(path);
            const transaction = yield this.serviceInstance.createTransaction({ data: fileData }, this.arweaveKey);
            transaction.addTag('Content-Type', fileType);
            yield this.serviceInstance.transactions.sign(transaction, this.arweaveKey);
            const uploader = yield this.serviceInstance.transactions.getUploader(transaction);
            while (!uploader.isComplete) {
                uploader.uploadChunk().then(() => {
                    this.emit('upload', uploader.pctComplete, uploader.uploadedChunks, uploader.totalChunks);
                }).catch(err => {
                    this.emit('error', 'Uploader Failed to upload');
                });
            }
            yield this.getTxStatus(transaction.id, 0);
            return { id: transaction.id, metadata: Object.assign({}, transaction) };
        });
    }
    uploadVideo(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileData = yield fs_1.promises.readFile(path);
            const fileType = mime.lookup(path);
            const transaction = yield this.serviceInstance.createTransaction({ data: fileData }, this.arweaveKey);
            transaction.addTag('Content-Type', fileType);
            yield this.serviceInstance.transactions.sign(transaction, this.arweaveKey);
            const uploader = yield this.serviceInstance.transactions.getUploader(transaction);
            while (!uploader.isComplete) {
                uploader.uploadChunk().then(() => {
                    this.emit('upload', uploader.pctComplete, uploader.uploadedChunks, uploader.totalChunks);
                }).catch(err => {
                    this.emit('error', 'Uploader Failed to upload');
                });
            }
            yield this.getTxStatus(transaction.id, 0);
            return { id: transaction.id, metadata: Object.assign({}, transaction) };
        });
    }
    uploadFile(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileData = yield fs_1.promises.readFile(path);
            const fileType = mime.lookup(path);
            const transaction = yield this.serviceInstance.createTransaction({ data: fileData }, this.arweaveKey);
            transaction.addTag('Content-Type', fileType);
            yield this.serviceInstance.transactions.sign(transaction, this.arweaveKey);
            const uploader = yield this.serviceInstance.transactions.getUploader(transaction);
            while (!uploader.isComplete) {
                uploader.uploadChunk().then(() => {
                    this.emit('upload', uploader.pctComplete, uploader.uploadedChunks, uploader.totalChunks);
                }).catch(err => {
                    this.emit('error', 'Uploader Failed to upload');
                });
            }
            yield this.getTxStatus(transaction.id, 0);
            return { id: transaction.id, metadata: Object.assign({}, transaction) };
        });
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
    getTxStatus(txId, retries) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tx = yield this.serviceInstance.transactions.getStatus(txId);
                if (tx.status === 200 && tx.confirmed) {
                    if (tx.confirmed.number_of_confirmations > 10) {
                        this.emit('success', tx);
                    }
                    else {
                        this.emit('confirmation', tx.confirmed.number_of_confirmations, txId);
                        setTimeout(() => {
                            this.getTxStatus(txId, 0).then().catch(e => {
                                console.log(e);
                            });
                        }, 10000); // 30secs
                    }
                }
                else if (retries <= 10) {
                    if (tx.status === 202 || tx.status === 429 || tx.status === 404) { // 429 Rate Limit, 404 Transaction Not Found
                        setTimeout(() => {
                            this.getTxStatus(txId, ++retries).then().catch(e => {
                                console.log(e);
                            });
                        }, 20000); // 120secs
                    }
                    else {
                        this.emit('error', `Arweave Upload Failed, Status code: ${tx.status}`, txId);
                    }
                }
                else {
                    this.emit('error', 'Max Retries Exceeded: Transaction Status Update Failed/Not Found', txId);
                }
            }
            catch (error) {
                this.emit('error', error, txId);
            }
            return true;
        });
    }
}
exports.ArweaveService = ArweaveService;
