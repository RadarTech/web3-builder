import * as Web3 from 'web3';
import { RpcConnection, WalletSubprovider } from './types';
import Web3ProviderEngine = require('web3-provider-engine');
export declare class Web3Builder {
    provider: Web3ProviderEngine;
    private _currentWalletSubprovider;
    private _currentRpcSubprovider;
    private _cacheNonce;
    /**
     * Creates a new web3 instance
     *
     * @param {WalletSubprovider} walletSubprovider The wallet subprovider
     * @param {RpcConnection} [connection=InfuraNetwork.Mainnet] The rpc connection
     * @param {boolean} [cacheNonce] Cache the nonce
     */
    createWeb3(walletSubprovider: WalletSubprovider, connection?: RpcConnection, cacheNonce?: boolean): Web3;
    /**
     * Update the active wallet
     *
     * @param {WalletSubprovider} walletSubprovider The wallet subprovider
     */
    updateWallet(walletSubprovider: WalletSubprovider): Web3;
    /**
     * Update the rpc connection
     *
     * @param {RpcConnection} connection The rpc connection url or infura config
     */
    updateRpcConnection(connection: RpcConnection): Web3;
    /**
     * Constructs the web3 object
     *
     * @param {WalletSubprovider} walletSubprovider The wallet subprovider
     * @param {RedundantRPCSubprovider} rpcSubprovider The rpc subprovider
     * @param {boolean} [cacheNonce] Cache the nonce with the nonce tracker subprovider
     */
    private constructWeb3Object(walletSubprovider, rpcSubprovider, cacheNonce?);
}
