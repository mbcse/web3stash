import fs from 'fs/promises';
const jsonFile = await fs.readFile('./dist/mjs/services/bundlr.js', 'utf8');
const newData = jsonFile.replace('this.serviceInstance = new Bundlr(url, currency, privateKey, config);', 'this.serviceInstance = new Bundlr.default(url, currency, privateKey, config);');
await fs.writeFile('./dist/mjs/services/bundlr.js', newData, 'utf8');

