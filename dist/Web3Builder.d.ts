import * as Web3 from 'web3';
import { RpcConnection, Subprovider } from './types';
import Web3ProviderEngine = require('web3-provider-engine');
export declare class Web3Builder {
    provider: Web3ProviderEngine;
    private _currentSigningSubprovider;
    private _currentRpcSubprovider;
    private _cacheNonce;
    /**
     * Creates a new web3 instance
     *
     * @param {TransactionManager} transactionManager The transaction manager
     * @param {RpcConnection} [connection=InfuraNetwork.Mainnet] The rpc connection
     * @param {boolean} [cacheNonce] Cache the nonce
     */
    createWeb3(signingSubprovider: Subprovider, connection?: RpcConnection, cacheNonce?: boolean): Web3;
    /**
     * Update the transaction and message signer
     *
     * @param {Subprovider} signingSubprovider The signing subprovider
     */
    updateSigner(signingSubprovider: Subprovider): Web3;
    /**
     * Update the rpc connection
     *
     * @param {RpcConnection} connection The rpc connection url or infura config
     */
    updateRpcConnection(connection: RpcConnection): Web3;
    /**
     * Constructs the web3 object
     *
     * @param {Subprovider} signingSubprovider The signing subprovider
     * @param {RedundantRPCSubprovider} rpcSubprovider The rpc subprovider
     * @param {boolean} [cacheNonce] Cache the nonce with the nonce tracker subprovider
     */
    private constructWeb3Object(signingSubprovider, rpcSubprovider, cacheNonce?);
}
