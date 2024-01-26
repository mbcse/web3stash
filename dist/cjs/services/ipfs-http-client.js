"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpfsService = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const base_storage_js_1 = require("./base-storage.js");
const ipfs_http_client_1 = require("ipfs-http-client");
const fs_1 = require("fs");
class IpfsService extends base_storage_js_1.StorageService {
    constructor(url, config) {
        super();
        this.serviceBaseUrl = 'ipfs://';
        this.serviceInstance = (0, ipfs_http_client_1.create)(url);
    }
    uploadJson(jsonData, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = Buffer.from(JSON.stringify(jsonData));
            const response = yield this.serviceInstance.add(data, options);
            return { id: response.cid.toString(), metadata: Object.assign({}, response) };
        });
    }
    uploadImage(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageData = yield fs_1.promises.readFile(path);
            const response = yield this.serviceInstance.add(imageData, options);
            return { id: response.cid.toString(), metadata: Object.assign({}, response) };
        });
    }
    uploadVideo(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const videoData = yield fs_1.promises.readFile(path);
            const response = yield this.serviceInstance.add(videoData, options);
            return { id: response.cid.toString(), metadata: Object.assign({}, response) };
        });
    }
    uploadFile(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileData = yield fs_1.promises.readFile(path);
            const response = yield this.serviceInstance.add(fileData, options);
            return { id: response.cid.toString(), metadata: Object.assign({}, response) };
        });
    }
}
exports.IpfsService = IpfsService;
