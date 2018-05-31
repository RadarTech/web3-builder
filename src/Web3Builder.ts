import * as Web3 from 'web3';
import { InfuraNetwork, RpcConnection, WalletSubprovider } from './types';
import {
  NonceTrackerSubprovider,
  RedundantRPCSubprovider } from '@radarrelay/subproviders';
import { PUBLIC_RPC_PROVIDER_URLS } from './constants';
import Web3ProviderEngine = require('web3-provider-engine');

export class Web3Builder {
  public provider: Web3ProviderEngine;
  private _currentWalletSubprovider: WalletSubprovider;
  private _currentRpcSubprovider: RedundantRPCSubprovider;
  private _cacheNonce: boolean;

  /**
   * Creates a new web3 instance
   *
   * @param {WalletSubprovider} walletSubprovider The wallet subprovider
   * @param {RpcConnection} [connection=InfuraNetwork.Mainnet] The rpc connection
   * @param {boolean} [cacheNonce] Cache the nonce
   */
  public createWeb3(
    walletSubprovider: WalletSubprovider,
    connection: RpcConnection = InfuraNetwork.Mainnet,
    cacheNonce?: boolean
  ): Web3 {
    const rpcSubprovider = new RedundantRPCSubprovider(
      PUBLIC_RPC_PROVIDER_URLS(connection) as string[]
    );
    return this.constructWeb3Object(walletSubprovider, rpcSubprovider, cacheNonce);
  }

  /**
   * Update the active wallet
   *
   * @param {WalletSubprovider} walletSubprovider The wallet subprovider
   */
  public updateWallet(walletSubprovider: WalletSubprovider): Web3 {
    return this.constructWeb3Object(
      walletSubprovider,
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
      PUBLIC_RPC_PROVIDER_URLS(connection) as string[]
    );

    return this.constructWeb3Object(
      this._currentWalletSubprovider,
      rpcSubprovider,
      this._cacheNonce
    );
  }

  /**
   * Constructs the web3 object
   *
   * @param {WalletSubprovider} walletSubprovider The wallet subprovider
   * @param {RedundantRPCSubprovider} rpcSubprovider The rpc subprovider
   * @param {boolean} [cacheNonce] Cache the nonce with the nonce tracker subprovider
   */
  private constructWeb3Object(
    walletSubprovider: WalletSubprovider,
    rpcSubprovider: RedundantRPCSubprovider,
    cacheNonce?: boolean
  ): Web3 {
    this.provider = new Web3ProviderEngine();
    if (cacheNonce) {
      this.provider.addProvider(new NonceTrackerSubprovider());
    }

    this.provider.addProvider(walletSubprovider);
    this.provider.addProvider(rpcSubprovider);
    
    // Unlock provider engine without block polling
    (this.provider as any)._ready.go();
    
    // Set current subproviders
    this._currentWalletSubprovider = walletSubprovider;
    this._currentRpcSubprovider = rpcSubprovider;
    this._cacheNonce = cacheNonce;

    return new Web3(this.provider);
  }
}
