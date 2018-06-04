import * as Web3 from 'web3';
import { InfuraNetwork, RpcConnection, WalletSubprovider } from './types';
import {
  NonceTrackerSubprovider,
  RedundantRPCSubprovider } from '@radarrelay/subproviders';
import { PUBLIC_RPC_PROVIDER_URLS } from './constants';
import Web3ProviderEngine = require('web3-provider-engine');

export module Web3Builder {
  export let provider: Web3ProviderEngine;
  let currentWalletSubprovider: WalletSubprovider;
  let currentRpcSubprovider: RedundantRPCSubprovider;
  let cacheNonce: boolean;

  /**
   * Creates a new web3 instance
   *
   * @param {WalletSubprovider} walletSubprovider The wallet subprovider
   * @param {RpcConnection} [connection=InfuraNetwork.Mainnet] The rpc connection
   * @param {boolean} [cacheNonce] Cache the nonce
   */
  export function createWeb3(
    walletSubprovider: WalletSubprovider,
    connection: RpcConnection = InfuraNetwork.Mainnet,
    cacheNonce?: boolean
  ): Web3 {
    const rpcSubprovider = new RedundantRPCSubprovider(
      PUBLIC_RPC_PROVIDER_URLS(connection) as string[]
    );
    return constructWeb3Object(walletSubprovider, rpcSubprovider, cacheNonce);
  };

  /**
   * Update the active wallet
   *
   * @param {WalletSubprovider} walletSubprovider The wallet subprovider
   */
  export function updateWallet(walletSubprovider: WalletSubprovider): Web3 {
    return constructWeb3Object(
      walletSubprovider,
      currentRpcSubprovider,
      cacheNonce
    );
  };

  /**
   * Update the rpc connection
   *
   * @param {RpcConnection} connection The rpc connection url or infura config
   */
  export function updateRpcConnection(connection: RpcConnection): Web3 {
    const rpcSubprovider = new RedundantRPCSubprovider(
      PUBLIC_RPC_PROVIDER_URLS(connection) as string[]
    );

    return constructWeb3Object(
      currentWalletSubprovider,
      rpcSubprovider,
      cacheNonce
    );
  };

  /**
   * Constructs the web3 object
   *
   * @param {WalletSubprovider} walletSubprovider The wallet subprovider
   * @param {RedundantRPCSubprovider} rpcSubprovider The rpc subprovider
   * @param {boolean} [cacheNonce] Cache the nonce with the nonce tracker subprovider
   */
  function constructWeb3Object(
    walletSubprovider: WalletSubprovider,
    rpcSubprovider: RedundantRPCSubprovider,
    cacheNonce?: boolean
  ): Web3 {
    provider = new Web3ProviderEngine();
    if (cacheNonce) {
      provider.addProvider(new NonceTrackerSubprovider());
    }

    provider.addProvider(walletSubprovider);
    provider.addProvider(rpcSubprovider);
    
    // Unlock provider engine without block polling
    (provider as any)._ready.go();
    
    // Set current subproviders
    currentWalletSubprovider = walletSubprovider;
    currentRpcSubprovider = rpcSubprovider;
    cacheNonce = cacheNonce;

    return new Web3(provider);
  };
}
