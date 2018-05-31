"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Web3 = require("web3");
const types_1 = require("./types");
const subproviders_1 = require("@radarrelay/subproviders");
const constants_1 = require("./constants");
const Web3ProviderEngine = require("web3-provider-engine");
class Web3Builder {
    /**
     * Creates a new web3 instance
     *
     * @param {WalletSubprovider} walletSubprovider The wallet subprovider
     * @param {RpcConnection} [connection=InfuraNetwork.Mainnet] The rpc connection
     * @param {boolean} [cacheNonce] Cache the nonce
     */
    createWeb3(walletSubprovider, connection = types_1.InfuraNetwork.Mainnet, cacheNonce) {
        const rpcSubprovider = new subproviders_1.RedundantRPCSubprovider(constants_1.PUBLIC_RPC_PROVIDER_URLS(connection));
        return this.constructWeb3Object(walletSubprovider, rpcSubprovider, cacheNonce);
    }
    /**
     * Update the active wallet
     *
     * @param {WalletSubprovider} walletSubprovider The wallet subprovider
     */
    updateWallet(walletSubprovider) {
        return this.constructWeb3Object(walletSubprovider, this._currentRpcSubprovider, this._cacheNonce);
    }
    /**
     * Update the rpc connection
     *
     * @param {RpcConnection} connection The rpc connection url or infura config
     */
    updateRpcConnection(connection) {
        const rpcSubprovider = new subproviders_1.RedundantRPCSubprovider(constants_1.PUBLIC_RPC_PROVIDER_URLS(connection));
        return this.constructWeb3Object(this._currentWalletSubprovider, rpcSubprovider, this._cacheNonce);
    }
    /**
     * Constructs the web3 object
     *
     * @param {WalletSubprovider} walletSubprovider The wallet subprovider
     * @param {RedundantRPCSubprovider} rpcSubprovider The rpc subprovider
     * @param {boolean} [cacheNonce] Cache the nonce with the nonce tracker subprovider
     */
    constructWeb3Object(walletSubprovider, rpcSubprovider, cacheNonce) {
        this.provider = new Web3ProviderEngine();
        if (cacheNonce) {
            this.provider.addProvider(new subproviders_1.NonceTrackerSubprovider());
        }
        this.provider.addProvider(walletSubprovider);
        this.provider.addProvider(rpcSubprovider);
        // Unlock provider engine without block polling
        this.provider._ready.go();
        // Set current subproviders
        this._currentWalletSubprovider = walletSubprovider;
        this._currentRpcSubprovider = rpcSubprovider;
        this._cacheNonce = cacheNonce;
        return new Web3(this.provider);
    }
}
exports.Web3Builder = Web3Builder;
