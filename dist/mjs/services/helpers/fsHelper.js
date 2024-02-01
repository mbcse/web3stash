import fs from 'fs/promises';
import Path from 'path';
export async function createDir(path) {
    try {
        await fs.access(path);
        // eslint-disable-next-line @typescript-eslint/no-implicit-any-catch
    }
    catch (err) {
        await fs.mkdir(path, { recursive: true });
    }
}
export async function writeFile(path, data) {
    await createDir(Path.dirname(path));
    await fs.writeFile(path, data, 'utf8');
}
export async function deleteFile(path) {
    await fs.rm(path, { recursive: true });
}
