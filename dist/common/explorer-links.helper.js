"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExplorerLink = exports.explorerLinks = void 0;
exports.explorerLinks = {
    xlm: 'https://stellar.expert/explorer/public/account',
    eth: 'https://etherscan.io/address',
    btc: 'https://www.blockchain.com/btc/address',
    algo: 'https://algoexplorer.io/tx',
    hbar: 'https://app.dragonglass.me/hedera/transactions',
};
var Networks;
(function (Networks) {
    Networks["Stellar"] = "stellar";
    Networks["Erc20"] = "erc-20";
    Networks["Ethereum"] = "Ethereum";
    Networks["Algorand"] = "algorand";
})(Networks || (Networks = {}));
var Currencies;
(function (Currencies) {
    Currencies["Hbar"] = "hbar";
})(Currencies || (Currencies = {}));
exports.getExplorerLink = ({ currency, hash, isErc, network, }) => {
    const addHash = (link, hash) => !!link ? `${link.toLowerCase()}/${hashFormatted(hash)}` : '';
    let explorerLink = exports.explorerLinks[currency];
    const networkFormatted = network;
    const hashFormatted = (currentHash) => (currency === Currencies.Hbar ? currentHash.replace(/[^\d]/g, '') : currentHash);
    if (networkFormatted === Networks.Algorand) {
        explorerLink = exports.explorerLinks.algo;
    }
    else if (networkFormatted === Networks.Stellar) {
        explorerLink = exports.explorerLinks.xlm;
    }
    else if (networkFormatted === Networks.Erc20
        || networkFormatted === Networks.Ethereum
        || isErc && !explorerLink) {
        explorerLink = exports.explorerLinks.eth;
    }
    return addHash(explorerLink, hash);
};
//# sourceMappingURL=explorer-links.helper.js.map