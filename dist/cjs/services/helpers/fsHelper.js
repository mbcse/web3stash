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
exports.deleteFile = exports.writeFile = exports.createDir = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
function createDir(path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield promises_1.default.access(path);
            // eslint-disable-next-line @typescript-eslint/no-implicit-any-catch
        }
        catch (err) {
            yield promises_1.default.mkdir(path, { recursive: true });
        }
    });
}
exports.createDir = createDir;
function writeFile(path, data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield createDir(path_1.default.dirname(path));
        yield promises_1.default.writeFile(path, data, 'utf8');
    });
}
exports.writeFile = writeFile;
function deleteFile(path) {
    return __awaiter(this, void 0, void 0, function* () {
        yield promises_1.default.rm(path, { recursive: true });
    });
}
exports.deleteFile = deleteFile;
