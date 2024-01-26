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
exports.BundlrService = void 0;
const base_storage_js_1 = require("./base-storage.js");
// Import Bundlr from './bundlrHelper.js';
const client_1 = __importDefault(require("@bundlr-network/client"));
const fs_1 = require("fs");
const mime = __importStar(require("mime-types"));
class BundlrService extends base_storage_js_1.StorageService {
    constructor(currency, privateKey, testing = false, config) {
        super();
        this.serviceBaseUrl = 'ar://';
        this.bundlrMainNetworkUrl = 'http://node2.bundlr.network';
        this.bundlrTestNetworkUrl = 'https://devnet.bundlr.network';
        this.testing = testing;
        this.bundlrKey = privateKey;
        const url = testing ? this.bundlrTestNetworkUrl : this.bundlrMainNetworkUrl;
        this.serviceInstance = new client_1.default(url, currency, privateKey, config);
    }
    uploadJson(jsonData, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(jsonData);
            yield this.checkAndFundNode(data.length);
            const tags = [{ name: 'Content-Type', value: 'text/json' }];
            const transaction = this.serviceInstance.createTransaction(data, Object.assign(Object.assign({}, options), { tags }));
            yield transaction.sign();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const response = yield transaction.upload();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            return { id: response.data.id, metadata: Object.assign({}, response.data) };
        });
    }
    uploadImage(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileData = yield fs_1.promises.readFile(path);
            const fileType = mime.lookup(path);
            yield this.checkAndFundNode(fileData.length);
            const tags = [{ name: 'Content-Type', value: fileType }];
            const transaction = this.serviceInstance.createTransaction(fileData, Object.assign(Object.assign({}, options), { tags }));
            yield transaction.sign();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const response = yield transaction.upload();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            return { id: response.data.id, metadata: Object.assign({}, response.data) };
        });
    }
    uploadVideo(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileData = yield fs_1.promises.readFile(path);
            const fileType = mime.lookup(path);
            yield this.checkAndFundNode(fileData.length);
            const tags = [{ name: 'Content-Type', value: fileType }];
            const transaction = this.serviceInstance.createTransaction(fileData, Object.assign(Object.assign({}, options), { tags }));
            yield transaction.sign();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const response = yield transaction.upload();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            return { id: response.data.id, metadata: Object.assign({}, response.data) };
        });
    }
    uploadFile(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileData = yield fs_1.promises.readFile(path);
            const fileType = mime.lookup(path);
            yield this.checkAndFundNode(fileData.length);
            const tags = [{ name: 'Content-Type', value: fileType }];
            const transaction = this.serviceInstance.createTransaction(fileData, Object.assign(Object.assign({}, options), { tags }));
            yield transaction.sign();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const response = yield transaction.upload();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            return { id: response.data.id, metadata: Object.assign({}, response.data) };
        });
    }
    uploadImageFromStream(readableStream, dataSize, imageType, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkAndFundNode(dataSize);
            const tags = [{ name: 'Content-Type', value: `image/${imageType}` }];
            const uploader = this.serviceInstance.uploader.chunkedUploader;
            this.setChunkerLogger(uploader);
            const response = yield uploader.uploadData(readableStream, Object.assign(Object.assign({}, options), { tags }));
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            return { id: response.data.id, metadata: Object.assign({}, response.data) };
        });
    }
    uploadVideoFromStream(readableStream, dataSize, videoType, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkAndFundNode(dataSize);
            const tags = [{ name: 'Content-Type', value: `video/${videoType}` }];
            const uploader = this.serviceInstance.uploader.chunkedUploader;
            this.setChunkerLogger(uploader);
            const response = yield uploader.uploadData(readableStream, Object.assign(Object.assign({}, options), { tags }));
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            return { id: response.data.id, metadata: Object.assign({}, response.data) };
        });
    }
    uploadFileFromStream(readableStream, dataSize, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkAndFundNode(dataSize);
            const tags = [{ name: 'Content-Type', value: 'file' }];
            const uploader = this.serviceInstance.uploader.chunkedUploader;
            this.setChunkerLogger(uploader);
            const response = yield uploader.uploadData(readableStream, Object.assign(Object.assign({}, options), { tags }));
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            return { id: response.data.id, metadata: Object.assign({}, response.data) };
        });
    }
    checkAndFundNode(dataSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentBalance = yield this.serviceInstance.getLoadedBalance();
            const fundsRequired = yield this.serviceInstance.getPrice(dataSize);
            if (fundsRequired.isGreaterThan(currentBalance)) {
                const fundingResponse = yield this.serviceInstance.fund(fundsRequired);
                return fundingResponse;
            }
            return true;
        });
    }
    setChunkerLogger(uploader) {
        uploader.on('chunkUpload', chunkInfo => {
            console.log(`Uploaded Chunk number ${chunkInfo.id}, offset of ${chunkInfo.offset}, size ${chunkInfo.size} Bytes, with a total of ${chunkInfo.totalUploaded} bytes uploaded.`);
        });
        uploader.on('chunkError', e => {
            console.log(`Error uploading chunk number ${e.id} - ${e.res.statusText}`);
        });
        uploader.on('done', finishRes => {
            console.log('Upload completed with ID ', finishRes.data.id);
        });
    }
}
exports.BundlrService = BundlrService;
