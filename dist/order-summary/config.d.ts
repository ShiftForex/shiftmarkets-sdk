import { ProductType } from "../trade/interfaces";
declare const _default: {
    defaultDecimals: {
        fiat: number;
        crypto: number;
    };
    defaultProduct: string;
    defaultQuoteCurrency: string;
    productsConfig: {
        default: {
            amountProduct: ProductType;
            totalProduct: ProductType;
            feeProduct: ProductType.base;
            netProduct: ProductType.base;
        };
        sell_quote_destination_account: {
            amountProduct: ProductType.base;
            totalProduct: ProductType;
            feeProduct: ProductType;
            netProduct: ProductType;
        };
        buy_quote_destination_account: {
            amountProduct: ProductType;
            totalProduct: ProductType.base;
            feeProduct: ProductType.base;
            netProduct: ProductType.base;
        };
        sell_quote_source_account: {
            amountProduct: ProductType;
            totalProduct: ProductType.base;
            feeProduct: ProductType.base;
            netProduct: ProductType.base;
        };
        buy_quote_source_account: {
            amountProduct: ProductType.base;
            totalProduct: ProductType;
            feeProduct: ProductType;
            netProduct: ProductType;
        };
        sell_base_destination_account: {
            amountProduct: ProductType.base;
            totalProduct: ProductType;
            feeProduct: ProductType;
            netProduct: ProductType;
        };
        buy_base_destination_account: {
            amountProduct: ProductType;
            totalProduct: ProductType.base;
            feeProduct: ProductType.base;
            netProduct: ProductType.base;
        };
        sell_base_source_account: {
            amountProduct: ProductType;
            totalProduct: ProductType.base;
            feeProduct: ProductType.base;
            netProduct: ProductType.base;
        };
        buy_base_source_account: {
            amountProduct: ProductType.base;
            totalProduct: ProductType;
            feeProduct: ProductType;
            netProduct: ProductType;
        };
    };
    products: {
        AUD: {
            decimals: number;
        };
        USD: {
            decimals: number;
        };
        JPY: {
            decimals: number;
        };
        GBP: {
            decimals: number;
        };
        EUR: {
            decimals: number;
        };
        BRL: {
            decimals: number;
        };
        MXN: {
            decimals: number;
        };
        BTC: {
            decimals: number;
        };
        ETH: {
            decimals: number;
        };
        LTC: {
            decimals: number;
        };
        XRP: {
            decimals: number;
        };
        BCH: {
            decimals: number;
        };
        XMR: {
            decimals: number;
        };
    };
};
export default _default;
