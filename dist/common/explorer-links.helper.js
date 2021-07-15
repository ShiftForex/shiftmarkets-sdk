"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExplorerLink = exports.explorerLinks = void 0;
exports.explorerLinks = {
    xlm: 'https://stellar.expert/explorer/public',
    eth: 'https://etherscan.io',
    btc: 'https://www.blockchain.com/explorer',
};
exports.getExplorerLink = (payload) => {
    const addHash = (link, hash) => !!link ? `${link.toLowerCase()}/${hash}` : '';
    const { currency, hash, isErc, } = payload;
    // @ts-ignore
    const explorerLink = isErc ? exports.explorerLinks.eth : exports.explorerLinks[currency];
    return addHash(explorerLink, hash);
};
//# sourceMappingURL=explorer-links.helper.js.map