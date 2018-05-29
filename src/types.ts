export enum InfuraNetwork {
  Mainnet = 'mainnet',
  Kovan = 'kovan',
  Rinkeby = 'rinkeby',
  Ropsten = 'ropsten',
}

export type InfuraConfig = {
  network: InfuraNetwork;
  apiKey?: string;
}

export type RpcConnection = string | InfuraConfig;

export interface Subprovider {
  handleRequest();
}