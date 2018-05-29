import * as Web3 from 'web3';
import { InfuraNetwork, RpcConnection, Subprovider } from './types';
import {
  NonceTrackerSubprovider,
  RedundantRPCSubprovider } from 'subproviders';
import { PUBLIC_RPC_PROVIDER_URLS } from './constants';
import Web3ProviderEngine = require('web3-provider-engine');

export class Web3Builder {
  public provider: Web3ProviderEngine;
  private _currentSigningSubprovider: Subprovider;
  private _currentRpcSubprovider: RedundantRPCSubprovider;
  private _cacheNonce: boolean;

  /**
   * Creates a new web3 instance
   *
   * @param {TransactionManager} transactionManager The transaction manager
   * @param {RpcConnection} [connection=InfuraNetwork.Mainnet] The rpc connection
   * @param {boolean} [cacheNonce] Cache the nonce
   */
  public createWeb3(
    signingSubprovider: Subprovider,
    connection: RpcConnection = InfuraNetwork.Mainnet,
    cacheNonce?: boolean
  ): Web3 {
    const rpcSubprovider = new RedundantRPCSubprovider(
      PUBLIC_RPC_PROVIDER_URLS(connection)
    );

    return this.constructWeb3Object(signingSubprovider, rpcSubprovider, cacheNonce);
  }

  /**
   * Update the transaction and message signer
   *
   * @param {Subprovider} signingSubprovider The signing subprovider
   */
  public updateSigner(signingSubprovider: Subprovider): Web3 {
    return this.constructWeb3Object(
      signingSubprovider,
      this._currentRpcSubprovider,
      this._cacheNonce
    );
  }

  /**
   * Update the rpc connection
   *
   * @param {RpcConnection} connection The rpc connection url or infura config
   */
  public updateRpcConnection(connection: RpcConnection): Web3 {
    const rpcSubprovider = new RedundantRPCSubprovider(
      PUBLIC_RPC_PROVIDER_URLS(connection)
    );

    return this.constructWeb3Object(
      this._currentSigningSubprovider,
      rpcSubprovider,
      this._cacheNonce
    );
  }

  /**
   * Constructs the web3 object
   *
   * @param {Subprovider} signingSubprovider The signing subprovider
   * @param {RedundantRPCSubprovider} rpcSubprovider The rpc subprovider
   * @param {boolean} [cacheNonce] Cache the nonce with the nonce tracker subprovider
   */
  private constructWeb3Object(
    signingSubprovider: Subprovider,
    rpcSubprovider: RedundantRPCSubprovider,
    cacheNonce?: boolean
  ): Web3 {
    this.provider = new Web3ProviderEngine();

    if (cacheNonce) {
      this.provider.addProvider(new NonceTrackerSubprovider());
    }

    this.provider.addProvider(signingSubprovider);
    this.provider.addProvider(rpcSubprovider);

    // Unlock provider engine without block polling
    (this.provider as any)._ready.go();

    // Set current subproviders
    this._currentSigningSubprovider = signingSubprovider;
    this._currentRpcSubprovider = rpcSubprovider;
    this._cacheNonce = cacheNonce;

    return new Web3(this.provider);
  }
}
