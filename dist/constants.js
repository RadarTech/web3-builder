"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
exports.PUBLIC_RPC_PROVIDER_URLS = (connection) => {
    const infuraConfig = connection;
    const urlOrNetworkName = infuraConfig.network || connection;
    const apiKey = infuraConfig.apiKey || '';
    switch (urlOrNetworkName) {
        case types_1.InfuraNetwork.Mainnet:
            return [
                `https://mainnet.infura.io/${apiKey}`,
                `https://pmainnet.infura.io/${apiKey}`
            ];
        case types_1.InfuraNetwork.Kovan:
        case types_1.InfuraNetwork.Rinkeby:
        case types_1.InfuraNetwork.Ropsten:
            return [
                `https://${urlOrNetworkName.toString()}.infura.io/${apiKey}`
            ];
        default:
            return [
                urlOrNetworkName
            ];
    }
};
