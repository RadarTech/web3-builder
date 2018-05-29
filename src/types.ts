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

export interface WalletSubprovider {
  handleRequest(
    payload: any,
    next: () => void,
    end: (err: Error | null, result?: any) => void,
  )
}
