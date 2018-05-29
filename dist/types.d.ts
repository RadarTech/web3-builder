export declare enum InfuraNetwork {
    Mainnet = "mainnet",
    Kovan = "kovan",
    Rinkeby = "rinkeby",
    Ropsten = "ropsten",
}
export declare type InfuraConfig = {
    network: InfuraNetwork;
    apiKey?: string;
};
export declare type RpcConnection = string | InfuraConfig;
export interface WalletSubprovider {
    handleRequest(payload: any, next: () => void, end: (err: Error | null, result?: any) => void): any;
}
