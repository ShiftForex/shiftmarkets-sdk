"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExplorerLink = exports.explorerLinks = void 0;
exports.explorerLinks = {
    xlm: 'https://stellar.expert/explorer/public/account',
    eth: 'https://etherscan.io/address',
    btc: 'https://www.blockchain.com/btc/address',
    algo: 'https://algoexplorer.io',
};
var Networks;
(function (Networks) {
    Networks["Stellar"] = "stellar";
    Networks["Erc20"] = "erc-20";
    Networks["Ethereum"] = "Ethereum";
    Networks["Algorand"] = "Algorand";
})(Networks || (Networks = {}));
exports.getExplorerLink = ({ currency, hash, isErc, network, }) => {
    const addHash = (link, hash) => !!link ? `${link.toLowerCase()}/${hash}` : '';
    let explorerLink = exports.explorerLinks[currency];
    const networkFormatted = network;
    if (networkFormatted === Networks.Algorand) {
        explorerLink = exports.explorerLinks.algo;
    }
    if (networkFormatted === Networks.Stellar) {
        explorerLink = exports.explorerLinks.xlm;
    }
    if (networkFormatted === Networks.Erc20
        || networkFormatted === Networks.Ethereum
        || isErc) {
        explorerLink = exports.explorerLinks.eth;
    }
    return addHash(explorerLink, hash);
};
//# sourceMappingURL=explorer-links.helper.js.map