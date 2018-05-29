import { InfuraNetwork, RpcConnection, InfuraConfig } from './types';

export const PUBLIC_RPC_PROVIDER_URLS = (connection: RpcConnection) => {
  const infuraConfig = connection as InfuraConfig;
  const urlOrNetworkName = infuraConfig.network || connection;
  const apiKey = infuraConfig.apiKey || '';

  switch (urlOrNetworkName) {
    case InfuraNetwork.Mainnet:
      return [
        `https://mainnet.infura.io/${apiKey}`,
        `https://pmainnet.infura.io/${apiKey}`
      ];
    case InfuraNetwork.Kovan:
    case InfuraNetwork.Rinkeby:
    case InfuraNetwork.Ropsten:
      return [
        `https://${urlOrNetworkName.toString()}.infura.io/${apiKey}`
      ];
    default:
      return [
        urlOrNetworkName
      ];
  }
};
