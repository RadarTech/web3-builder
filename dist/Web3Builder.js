"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Web3 = require("web3");
const types_1 = require("./types");
const subproviders_1 = require("@radarrelay/subproviders");
const constants_1 = require("./constants");
const Web3ProviderEngine = require("web3-provider-engine");
var Web3Builder;
(function (Web3Builder) {
    let _currentWalletSubprovider;
    let _currentRpcSubprovider;
    let _cacheNonce;
    /**
     * Creates a new web3 instance
     *
     * @param {WalletSubprovider} walletSubprovider The wallet subprovider
     * @param {RpcConnection} [connection=InfuraNetwork.Mainnet] The rpc connection
     * @param {boolean} [cacheNonce] Cache the nonce
     */
    function createWeb3(walletSubprovider, connection = types_1.InfuraNetwork.Mainnet, cacheNonce) {
        const rpcSubprovider = new subproviders_1.RedundantRPCSubprovider(constants_1.PUBLIC_RPC_PROVIDER_URLS(connection));
        return constructWeb3Object(walletSubprovider, rpcSubprovider, cacheNonce);
    }
    Web3Builder.createWeb3 = createWeb3;
    ;
    /**
     * Update the active wallet
     *
     * @param {WalletSubprovider} walletSubprovider The wallet subprovider
     */
    function updateWallet(walletSubprovider) {
        return constructWeb3Object(walletSubprovider, _currentRpcSubprovider, _cacheNonce);
    }
    Web3Builder.updateWallet = updateWallet;
    ;
    /**
     * Update the rpc connection
     *
     * @param {RpcConnection} connection The rpc connection url or infura config
     */
    function updateRpcConnection(connection) {
        const rpcSubprovider = new subproviders_1.RedundantRPCSubprovider(constants_1.PUBLIC_RPC_PROVIDER_URLS(connection));
        return constructWeb3Object(_currentWalletSubprovider, rpcSubprovider, _cacheNonce);
    }
    Web3Builder.updateRpcConnection = updateRpcConnection;
    ;
    /**
     * Constructs the web3 object
     *
     * @param {WalletSubprovider} walletSubprovider The wallet subprovider
     * @param {RedundantRPCSubprovider} rpcSubprovider The rpc subprovider
     * @param {boolean} [cacheNonce] Cache the nonce with the nonce tracker subprovider
     */
    function constructWeb3Object(walletSubprovider, rpcSubprovider, cacheNonce) {
        Web3Builder.provider = new Web3ProviderEngine();
        if (cacheNonce) {
            Web3Builder.provider.addProvider(new subproviders_1.NonceTrackerSubprovider());
        }
        Web3Builder.provider.addProvider(walletSubprovider);
        Web3Builder.provider.addProvider(rpcSubprovider);
        // Unlock provider engine without block polling
        Web3Builder.provider._ready.go();
        // Set current subproviders
        _currentWalletSubprovider = walletSubprovider;
        _currentRpcSubprovider = rpcSubprovider;
        _cacheNonce = cacheNonce;
        return new Web3(Web3Builder.provider);
    }
    ;
})(Web3Builder = exports.Web3Builder || (exports.Web3Builder = {}));
