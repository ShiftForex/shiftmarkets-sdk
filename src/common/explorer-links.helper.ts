export const explorerLinks = {
    xlm: '',
    eth: '',
    btc: '',
}

export interface ExplorerLinkPayload {
    currency: string,
    hash: string,
    isErc: boolean,
}

export const getExplorerLink = (payload: ExplorerLinkPayload): string => {
    const addHash = (link: string, hash: string) => !!link ? `${link}${hash}` : '';
    const {
        currency,
        hash,
        isErc,
    } = payload;
    // @ts-ignore
    const explorerLink = isErc ? explorerLinks.eth : explorerLinks[currency];
    return addHash(explorerLink, hash);
}
