"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Web3 = require("web3");
const types_1 = require("./types");
const subproviders_1 = require("subproviders");
const constants_1 = require("./constants");
const Web3ProviderEngine = require("web3-provider-engine");
class Web3Builder {
    /**
     * Creates a new web3 instance
     *
     * @param {TransactionManager} transactionManager The transaction manager
     * @param {RpcConnection} [connection=InfuraNetwork.Mainnet] The rpc connection
     * @param {boolean} [cacheNonce] Cache the nonce
     */
    createWeb3(signingSubprovider, connection = types_1.InfuraNetwork.Mainnet, cacheNonce) {
        const rpcSubprovider = new subproviders_1.RedundantRPCSubprovider(constants_1.PUBLIC_RPC_PROVIDER_URLS(connection));
        return this.constructWeb3Object(signingSubprovider, rpcSubprovider, cacheNonce);
    }
    /**
     * Update the transaction and message signer
     *
     * @param {Subprovider} signingSubprovider The signing subprovider
     */
    updateSigner(signingSubprovider) {
        return this.constructWeb3Object(signingSubprovider, this._currentRpcSubprovider, this._cacheNonce);
    }
    /**
     * Update the rpc connection
     *
     * @param {RpcConnection} connection The rpc connection url or infura config
     */
    updateRpcConnection(connection) {
        const rpcSubprovider = new subproviders_1.RedundantRPCSubprovider(constants_1.PUBLIC_RPC_PROVIDER_URLS(connection));
        return this.constructWeb3Object(this._currentSigningSubprovider, rpcSubprovider, this._cacheNonce);
    }
    /**
     * Constructs the web3 object
     *
     * @param {Subprovider} signingSubprovider The signing subprovider
     * @param {RedundantRPCSubprovider} rpcSubprovider The rpc subprovider
     * @param {boolean} [cacheNonce] Cache the nonce with the nonce tracker subprovider
     */
    constructWeb3Object(signingSubprovider, rpcSubprovider, cacheNonce) {
        this.provider = new Web3ProviderEngine();
        if (cacheNonce) {
            this.provider.addProvider(new subproviders_1.NonceTrackerSubprovider());
        }
        this.provider.addProvider(signingSubprovider);
        this.provider.addProvider(rpcSubprovider);
        // Unlock provider engine without block polling
        this.provider._ready.go();
        // Set current subproviders
        this._currentSigningSubprovider = signingSubprovider;
        this._currentRpcSubprovider = rpcSubprovider;
        this._cacheNonce = cacheNonce;
        return new Web3(this.provider);
    }
}
exports.Web3Builder = Web3Builder;
