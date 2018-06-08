# web3-builder

A tool to build and manage your own Web3 instance.

[![npm version](https://badge.fury.io/js/%40radarrelay%2Fweb3-builder.svg)](https://badge.fury.io/js/%40radarrelay%2Fweb3-builder)

## Introduction

This package simplifies the process to create your own [Web3](https://github.com/ethereum/wiki/wiki/JavaScript-API) instance, change the active wallet, and update the connection to the Ethereum network.

This is made possible using building blocks called subproviders. Subproviders are like normal web3 providers, but only handle a subset of RPC methods. They can be used to route, or otherwise handle, RPC calls before returning a result to the caller.

**web3-builder** uses subproviders to build out the Web3 object like so:

<img width="327" alt="screen shot 2018-06-01 at 12 13 31 pm" src="https://user-images.githubusercontent.com/20102664/40861917-0d305ebc-65a8-11e8-9456-f8ab622c8ec4.png">

If you'd like more flexibility when creating Web3 Providers consider using [web3-provider-engine](https://github.com/MetaMask/provider-engine) directly.


## Installation

### npm

```
npm install @radarrelay/web3-builder
```

### Yarn

```
yarn add @radarrelay/web3-builder
```

## Usage

### Web3 Creation

```javascript
import { Web3Builder } from '@radarrelay/web3-builder';
import { InjectedWeb3Subprovider } from '@radarrelay/subproviders';

const walletSubprovider = new InjectedWeb3Subprovider(window.web3.currentProvider);
let web3 = Web3Builder.createWeb3(walletSubprovider, InfuraNetwork.Kovan);
```

### Update Wallet

```javascript
import { EthLightwalletSubprovider } from '@radarrelay/subproviders';

const newWalletSubprovider = new EthLightwalletSubprovider(signing, keystore, pwDerivedKey);

// Updating the wallet returns a new instance of web3
web3 = Web3Builder.updateWallet(newWalletSubprovider);
```

### Update Network

```javascript
// Updating the rpc connection returns a new instance of web3
web3 = Web3Builder.updateRpcConnection(InfuraNetwork.Mainnet);
```

### Grab the Provider

Want to use your own version of Web3?

You can grab the Ethereum Provider and instantiate your preferred version of Web3:

```javascript
import * as Web3 from 'web3';

const anotherWeb3Instance = new Web3(web3.currentProvider);
```

OR

```javascript
import * as Web3 from 'web3';

const anotherWeb3Instance = new Web3(web3Builder.provider);
```

## Contributing

Please read [CONTRIBUTING.md](https://github.com/RadarRelay/web3-builder/blob/master/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/RadarRelay/web3-builder/blob/master/LICENSE.md) file for details.
