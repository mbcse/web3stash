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
exports.HeliaStorageService = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const base_storage_js_1 = require("./base-storage.js");
const helia_1 = import("helia");
const json_1 = import("@helia/json");
const unixfs_1 = import("@helia/unixfs");
const fs_1 = require("fs");
class HeliaStorageService extends base_storage_js_1.StorageService {
    constructor(config) {
        super();
        this.serviceBaseUrl = 'ipfs://';
        this.serviceInstance = (0, helia_1.createHelia)(config);
    }
    uploadJson(jsonData, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const j = (0, json_1.json)(this.serviceInstance);
            const hash = yield j.add(jsonData);
            return { id: hash.toString(), metadata: {} };
        });
    }
    uploadImage(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const fsh = (0, unixfs_1.unixfs)(this.serviceInstance);
            const imageData = yield fs_1.promises.readFile(path);
            const cid = yield fsh.addBytes(imageData);
            return { id: cid.toString(), metadata: {} };
        });
    }
    uploadVideo(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const fsh = (0, unixfs_1.unixfs)(this.serviceInstance);
            const videoData = yield fs_1.promises.readFile(path);
            const cid = yield fsh.addBytes(videoData);
            return { id: cid.toString(), metadata: {} };
        });
    }
    uploadFile(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const fsh = (0, unixfs_1.unixfs)(this.serviceInstance);
            const fileData = yield fs_1.promises.readFile(path);
            const cid = yield fsh.addBytes(fileData);
            return { id: cid.toString(), metadata: {} };
        });
    }
}
exports.HeliaStorageService = HeliaStorageService;
