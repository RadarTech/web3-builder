import * as Web3 from 'web3';
import { RpcConnection, WalletSubprovider } from './types';
import Web3ProviderEngine = require('web3-provider-engine');
export declare module Web3Builder {
    let provider: Web3ProviderEngine;
    /**
     * Creates a new web3 instance
     *
     * @param {WalletSubprovider} walletSubprovider The wallet subprovider
     * @param {RpcConnection} [connection=InfuraNetwork.Mainnet] The rpc connection
     * @param {boolean} [cacheNonce] Cache the nonce
     */
    function createWeb3(walletSubprovider: WalletSubprovider, connection?: RpcConnection, cacheNonce?: boolean): Web3;
    /**
     * Update the active wallet
     *
     * @param {WalletSubprovider} walletSubprovider The wallet subprovider
     */
    function updateWallet(walletSubprovider: WalletSubprovider): Web3;
    /**
     * Update the rpc connection
     *
     * @param {RpcConnection} connection The rpc connection url or infura config
     */
    function updateRpcConnection(connection: RpcConnection): Web3;
}
