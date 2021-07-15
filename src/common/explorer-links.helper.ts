export const explorerLinks = {
    xlm: 'https://stellar.expert/explorer/public/account',
    eth: 'https://etherscan.io/address',
    btc: 'https://www.blockchain.com/btc/address',
}

export interface ExplorerLinkPayload {
    currency: string,
    hash: string,
    isErc: boolean,
}

export const getExplorerLink = (payload: ExplorerLinkPayload): string => {
    const addHash = (link: string, hash: string) => !!link ? `${link.toLowerCase()}/${hash}` : '';
    const {
        currency,
        hash,
        isErc,
    } = payload;
    // @ts-ignore
    const explorerLink = isErc ? explorerLinks.eth : explorerLinks[currency];
    return addHash(explorerLink, hash);
}
