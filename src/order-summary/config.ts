import { ProductType } from "../trade/interfaces";

const base: ProductType = ProductType.base;
const quote = ProductType.quote;

export default {
  defaultDecimals: { fiat: 2, crypto: 8 },
  defaultProduct: 'BTC',
  defaultQuoteCurrency: 'USD',
  productsConfig: {
    default: {
      amountProduct: quote,
      totalProduct: quote,
      feeProduct: base,
      netProduct: base,
    },
    sell_quote_destination_account: {
      amountProduct: base,
      totalProduct: quote,
      feeProduct: quote,
      netProduct: quote,
    },
    buy_quote_destination_account: {
      amountProduct: quote,
      totalProduct: base,
      feeProduct: base,
      netProduct: base,
    },
    sell_quote_source_account: {
      amountProduct: quote,
      totalProduct: quote,
      feeProduct: base,
      netProduct: base,
    },
    buy_quote_source_account: {
      amountProduct: quote,
      totalProduct: quote,
      feeProduct: quote,
      netProduct: quote,
    },
    sell_base_destination_account: {
      amountProduct: base,
      totalProduct: quote,
      feeProduct: quote,
      netProduct: quote,
    },
    buy_base_destination_account: {
      amountProduct: quote,
      totalProduct: base,
      feeProduct: base,
      netProduct: base,
    },
    sell_base_source_account: {
      amountProduct: base,
      totalProduct: base,
      feeProduct: base,
      netProduct: quote,
    },
    buy_base_source_account: {
      amountProduct: quote,
      totalProduct: quote,
      feeProduct: quote,
      netProduct: base,
    },
  },
  products: {
    AUD: {
      decimals: 6,
    },
    USD: {
      decimals: 2,
    },
    JPY: {
      decimals: 2,
    },
    GBP: {
      decimals: 2,
    },
    EUR: {
      decimals: 2,
    },
    BRL: {
      decimals: 2,
    },
    MXN: {
      decimals: 5,
    },
    BTC: {
      decimals: 8,
    },
    ETH: {
      decimals: 8,
    },
    LTC: {
      decimals: 8,
    },
    XRP: {
      decimals: 6,
    },
    BCH: {
      decimals: 8,
    },
    XMR: {
      decimals: 12,
    },
  },
}
