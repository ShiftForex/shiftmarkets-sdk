"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSummary = void 0;
const order_helper_1 = require("./order-helper");
const config_1 = __importDefault(require("./config"));
const interfaces_1 = require("./interfaces");
const interfaces_2 = require("../trade/interfaces");
const OrderHelperInstance = new order_helper_1.OrderHelper();
const defaultQuote = config_1.default.defaultQuoteCurrency;
const defaultBase = config_1.default.defaultProduct;
const defaultQuoteDecimals = config_1.default.products && config_1.default.defaultDecimals
    ? config_1.default.defaultDecimals.fiat
    : 2;
const defaultBaseDecimals = config_1.default.products && config_1.default.defaultDecimals
    ? config_1.default.defaultDecimals.crypto
    : 5;
class OrderSummary {
    constructor() {
        this.summary = {
            amount: 0,
            fees: 0,
            calculatedFees: 0,
            calculatedTotal: 0,
            calculatedNet: 0,
            calculatedPrice: 0,
        };
    }
    initValues(orderSummary) {
        this.summary.commissionAccount = orderSummary.commissionAccount || interfaces_1.AccountType.sourceAccount;
        this.summary.action = orderSummary.action || interfaces_2.Sides.Buy;
        this.summary.amount = orderSummary.amount || 0;
        this.summary.orderType = orderSummary.orderType || "market";
        this.summary.fees = orderSummary.fees;
        this.summary.bidAsk = orderSummary.bidAsk || { bid: 0, ask: 0 };
        this.summary.orderBook = orderSummary.orderBook || { bids: [], asks: [] };
        this.summary.limitPrice = orderSummary.limitPrice || 0;
        this.summary.stopPrice = orderSummary.stopPrice || 0;
        this.summary.quote = orderSummary.quote || defaultQuote;
        this.summary.base = orderSummary.base || defaultBase;
        this.summary.quoteDecimals = orderSummary.quoteDecimals || defaultQuoteDecimals;
        this.summary.baseDecimals = orderSummary.baseDecimals || defaultBaseDecimals;
        this.summary.currentProduct = orderSummary.currentProduct;
        this._setProductsAndDecimals();
    }
    _setProductsAndDecimals() {
        const base = interfaces_2.ProductType.base;
        const quote = interfaces_2.ProductType.quote;
        const products = {
            [quote]: this.summary.quote,
            [base]: this.summary.base,
        };
        const decimals = {
            [quote]: this.summary.quoteDecimals,
            [base]: this.summary.baseDecimals,
        };
        const isQuote = this.summary.currentProduct === this.summary.quote;
        const optionProductsConfig = `${this.summary.action}_${isQuote ? quote : base}_${this.summary.commissionAccount}`;
        const result = config_1.default.productsConfig[optionProductsConfig]
            || config_1.default.productsConfig.default;
        this.summary.totalProduct = products[result.totalProduct];
        this.summary.feeProduct = products[result.feeProduct];
        this.summary.netProduct = products[result.netProduct];
        this.summary.amountProduct = products[result.amountProduct];
        this.summary.feeDecimals = decimals[result.feeProduct];
        this.summary.totalDecimals = decimals[result.totalProduct];
        this.summary.amountDecimals = decimals[result.amountProduct];
    }
    getValues() {
        const isQuote = this.summary.currentProduct === this.summary.quote;
        const vwapAction = this.summary.action === interfaces_2.Sides.Buy ? interfaces_2.Sides.Sell : interfaces_2.Sides.Buy;
        const quoteVWAP = OrderHelperInstance.calculateQuoteQuantityVWAP(this.summary.orderBook, vwapAction, this.summary.amount);
        const baseVWAP = OrderHelperInstance.calculateVWAP(vwapAction, this.summary.orderBook, this.summary.amount);
        const VWAP = isQuote ? quoteVWAP : baseVWAP;
        this.summary.calculatedVWAP = VWAP.price;
        this.summary.calculatedPrice = OrderHelperInstance.getPrice(this.summary.orderType, this.summary.calculatedVWAP, this.summary.limitPrice, this.summary.stopPrice) || 1;
        this.summary.calculatedAmount = OrderHelperInstance.calculateAmount(this.summary.action, this.summary.amount, this.summary.calculatedPrice, this.summary.commissionAccount, isQuote) || 1;
        this.summary.calculatedFees = OrderHelperInstance.calculateFees(OrderHelperInstance.calculateTotal(this.summary.action, this.summary.commissionAccount, this.summary.amount, this.summary.calculatedPrice, this.summary.calculatedFees, isQuote), this.summary.calculatedPrice, this.summary.fees, this.summary.orderType, this.summary.action, this.summary.bidAsk, this.summary.commissionAccount, isQuote);
        this.summary.calculatedTotal = OrderHelperInstance.calculateTotal(this.summary.action, this.summary.commissionAccount, this.summary.amount, this.summary.calculatedPrice, this.summary.calculatedFees, isQuote);
        this.summary.calculatedNet = OrderHelperInstance.calculateNet(this.summary.action, this.summary.commissionAccount, this.summary.amount, this.summary.calculatedPrice, this.summary.calculatedFees, isQuote);
        return {
            fees: this.summary.calculatedFees,
            price: this.summary.calculatedPrice,
            amount: this.summary.calculatedAmount,
            net: this.summary.calculatedNet,
            total: this.summary.calculatedTotal,
            totalProduct: this.summary.totalProduct,
            totalDecimals: this.summary.totalDecimals,
            feeDecimals: this.summary.feeDecimals,
            feeProduct: this.summary.feeProduct,
            netProduct: this.summary.netProduct,
            amountDecimals: this.summary.amountDecimals,
            amountProduct: this.summary.amountProduct,
            currentProduct: this.summary.currentProduct,
            isQuote,
        };
    }
}
exports.OrderSummary = OrderSummary;
//# sourceMappingURL=order-summary.js.map