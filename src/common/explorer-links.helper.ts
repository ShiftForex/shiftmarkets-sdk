
export const explorerLinks: any = {
  xlm: 'https://stellar.expert/explorer/public/account',
  eth: 'https://etherscan.io/address',
  btc: 'https://www.blockchain.com/btc/address',
  algo: 'https://algoexplorer.io/tx',
}

enum Networks {
  Stellar = 'stellar',
  Erc20 = 'erc-20',
  Ethereum = 'Ethereum',
  Algorand = 'Algorand',
}

export interface ExplorerLinkPayload {
  currency: string,
  hash: string,
  isErc: boolean,
  network?: string,
}

export const getExplorerLink = (
  {
    currency,
    hash,
    isErc,
    network,
  }: ExplorerLinkPayload
): string => {
  const addHash = (link: string, hash: string) => !!link ? `${link.toLowerCase()}/${hash}` : '';
  let explorerLink = explorerLinks[currency];
  const networkFormatted = network;

  if (networkFormatted === Networks.Algorand) {
    explorerLink = explorerLinks.algo;
  } else if (networkFormatted === Networks.Stellar) {
    explorerLink = explorerLinks.xlm;
  } else if (
    networkFormatted === Networks.Erc20
    || networkFormatted === Networks.Ethereum
    || isErc
  ) {
    explorerLink = explorerLinks.eth;
  }

  return addHash(explorerLink, hash);
}
