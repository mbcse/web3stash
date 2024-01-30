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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinataService = void 0;
const base_storage_js_1 = require("./base-storage.js");
const sdk_1 = __importDefault(require("@pinata/sdk"));
class PinataService extends base_storage_js_1.StorageService {
    constructor(pinataApiKey, pinataApiSecret) {
        super();
        this.serviceBaseUrl = 'ipfs://';
        this.serviceInstance = (0, sdk_1.default)(pinataApiKey, pinataApiSecret);
    }
    uploadJson(jsonData, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.serviceInstance.pinJSONToIPFS(jsonData, options);
            return { id: response.IpfsHash, metadata: Object.assign({}, response) };
        });
    }
    uploadImage(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.serviceInstance.pinFromFS(path, options);
            return { id: response.IpfsHash, metadata: Object.assign({}, response) };
        });
    }
    uploadVideo(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.serviceInstance.pinFromFS(path, options);
            return { id: response.IpfsHash, metadata: Object.assign({}, response) };
        });
    }
    uploadFile(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.serviceInstance.pinFromFS(path, options);
            return { id: response.IpfsHash, metadata: Object.assign({}, response) };
        });
    }
    uploadImageFromStream(readableStream, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.serviceInstance.pinFileToIPFS(readableStream, options);
            return { id: response.IpfsHash, metadata: Object.assign({}, response) };
        });
    }
    uploadVideoFromStream(readableStream, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.serviceInstance.pinFileToIPFS(readableStream, options);
            return { id: response.IpfsHash, metadata: Object.assign({}, response) };
        });
    }
    uploadFileFromStream(readableStream, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.serviceInstance.pinFileToIPFS(readableStream, options);
            return { id: response.IpfsHash, metadata: Object.assign({}, response) };
        });
    }
}
exports.PinataService = PinataService;
