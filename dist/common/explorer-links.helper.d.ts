export declare const explorerLinks: any;
export interface ExplorerLinkPayload {
    currency: string;
    hash: string;
    isErc: boolean;
    network?: string;
}
export declare const getExplorerLink: ({ currency, hash, isErc, network, }: ExplorerLinkPayload) => string;
