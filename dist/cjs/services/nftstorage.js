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
exports.NftStorageService = void 0;
const base_storage_js_1 = require("./base-storage.js");
const nft_storage_1 = require("nft.storage");
const fs_1 = require("fs");
const mime = __importStar(require("mime-types"));
const path_1 = __importDefault(require("path"));
class NftStorageService extends base_storage_js_1.StorageService {
    constructor(token, config) {
        super();
        this.serviceBaseUrl = 'ipfs://';
        this.serviceInstance = new nft_storage_1.NFTStorage(Object.assign({ token }, config));
    }
    uploadJson(jsonData, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(jsonData);
            const blobData = new nft_storage_1.Blob([data], { type: 'application/json' });
            const cid = yield this.serviceInstance.storeBlob(blobData);
            return { id: cid, metadata: {} };
        });
    }
    uploadImage(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileData = yield fs_1.promises.readFile(path);
            const fileType = mime.lookup(path);
            const fileName = (options === null || options === void 0 ? void 0 : options.fileName) || path_1.default.basename(path);
            const imageFile = new nft_storage_1.File([fileData], fileName, { type: fileType });
            const cid = yield this.serviceInstance.storeBlob(imageFile);
            return { id: cid, metadata: {} };
        });
    }
    uploadVideo(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileData = yield fs_1.promises.readFile(path);
            const fileType = mime.lookup(path);
            const fileName = (options === null || options === void 0 ? void 0 : options.fileName) || path_1.default.basename(path);
            const videoFile = new nft_storage_1.File([fileData], fileName, { type: fileType });
            const cid = yield this.serviceInstance.storeBlob(videoFile);
            return { id: cid, metadata: {} };
        });
    }
    uploadFile(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileData = yield fs_1.promises.readFile(path);
            const fileType = mime.lookup(path);
            const fileName = (options === null || options === void 0 ? void 0 : options.fileName) || path_1.default.basename(path);
            const file = new nft_storage_1.File([fileData], fileName, { type: fileType });
            const cid = yield this.serviceInstance.storeBlob(file);
            return { id: cid, metadata: {} };
        });
    }
}
exports.NftStorageService = NftStorageService;
