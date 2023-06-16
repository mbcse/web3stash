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
exports.LighthouseStorageService = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const base_storage_js_1 = require("./base-storage.js");
const fsHelper = __importStar(require("./helpers/fsHelper.js"));
// @ts-expect-error No Typings
const sdk_1 = __importDefault(require("@lighthouse-web3/sdk"));
class LighthouseStorageService extends base_storage_js_1.StorageService {
    constructor(apiKey, config) {
        super();
        this.serviceBaseUrl = 'ipfs://';
        this.serviceInstance = sdk_1.default;
        this.apiKey = apiKey;
    }
    uploadJson(jsonData, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fsHelper.writeFile('./webstash-tmp/lighthouse.json', JSON.stringify(jsonData));
            const response = yield this.serviceInstance.deploy('./webstash-tmp/lighthouse.json', this.apiKey);
            yield fsHelper.deleteFile('./webstash-tmp');
            return { id: response.Hash, metadata: Object.assign({}, response) };
        });
    }
    uploadImage(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.serviceInstance.deploy(path, this.apiKey);
            return { id: response.Hash, metadata: Object.assign({}, response) };
        });
    }
    uploadVideo(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.serviceInstance.deploy(path, this.apiKey);
            return { id: response.Hash, metadata: Object.assign({}, response) };
        });
    }
    uploadFile(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.serviceInstance.deploy(path, this.apiKey);
            return { id: response.Hash, metadata: Object.assign({}, response) };
        });
    }
}
exports.LighthouseStorageService = LighthouseStorageService;
