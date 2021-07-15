export declare const explorerLinks: {
    xlm: string;
    eth: string;
    btc: string;
};
export interface ExplorerLinkPayload {
    currency: string;
    hash: string;
    isErc: boolean;
}
export declare const getExplorerLink: (payload: ExplorerLinkPayload) => string;
