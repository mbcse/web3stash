# Web3Stash
Web3Stash is a standard library to get a single api to connect to multiple decentralised storage service providers. If you are looking to connect to blockchain services like ipfs, pinata, nft.storage, arweave, bundlr, helia etc but don't want to read there docs and set them up individually, You can use this package to connect to any of these services. The best part is all the configuration settings and upload functions are almost same across all the services.

# Quick Start

## Install the library
The official web3stash Node.js package. This is the easiest way to start developing with multiple decentralised storage service providers. 

```js
Install via NPM
npm install --save web3stash
```

## Importing and Using Package
Take a look at how you might import and use the web3Stash package:

```js
// require the webStash module
const {Web3Stash} = require('web3stash');
//or
import {Web3Stash} from 'web3stash';
// provide service name, config properties like privateKeys
const service = Web3Stash(<serviceName>, <config>, <configOptions>)
// Call the methods(Same for all services)
service.uploadJson(<jsonData>, <options>).then().catch()
service.uploadImage(<path to image>, <options>).then().catch()
service.uploadVideo(<path to video file>, <options>).then().catch()
service.uploadFile(<path to file>, <options>).then().catch()

```

### Start using services
Head to services tab in [docs](https://theblockchainchief.gitbook.io/web3stash/) page and pass config details based on the service you want to use. All services need same three things when initialising web3Stash as shown above:

```js
Web3Stash(<serviceName>, <config>, <configOptions>)
```

- serviceName(string) -  Here you have to put service you want to use like "PINATA", "ARWEAVE", "BUNDLR", etc in string format 
- config (object) - This will be object where you will pass keys, token, url, etc and it differs based on service type you are using for example, If you are using Pinata, you have to pass ```{apiKey:"", apiSecret:""}``` while for NFT.STORAGE you have to pass ```{token:""}```.
- configOptions(object) - This is optional field and here you can pass configuration options related to service you are using. Let say if you are using bundlr and want to pass providerUrl, timeout, logger etc. You can pass those stuff here using configOptions.

For detailed info head to docs - [https://theblockchainchief.gitbook.io/web3stash/](https://theblockchainchief.gitbook.io/web3stash/)