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
/**
 * https://docs.google.com/document/d/1XFA8Vj2qzqHuUKthFV0c6Vz3p96WCCcqtv1AhmYIKPY/edit
 */
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
        this.summary.limitPrice = orderSummary.limitPrice || this.getLimitPrice() || 0;
        this.summary.stopPrice = orderSummary.stopPrice || this.getLimitPrice() || 0;
        this.summary.quote = orderSummary.quote || defaultQuote;
        this.summary.base = orderSummary.base || defaultBase;
        this.summary.quoteDecimals = orderSummary.quoteDecimals || defaultQuoteDecimals;
        this.summary.baseDecimals = orderSummary.baseDecimals || defaultBaseDecimals;
        this.summary.currentProduct = orderSummary.currentProduct;
        this.summary.takerReserveMultiplier = Number(orderSummary.takerReserveMultiplier || 1);
        this._setProductsAndDecimals();
    }
    getLimitPrice(qty = 0) {
        switch (this.summary.action) {
            case interfaces_2.Sides.Buy:
                return this.summary.bidAsk.ask; // If buying, get ask price
            case interfaces_2.Sides.Sell:
                let totalQty = 0;
                let vwap = this.summary.orderBook.bids.reduce((accumulator, currentValue) => {
                    const currentQtyBalance = qty - totalQty;
                    const currentQty = currentValue.quantity * 1;
                    if (currentQtyBalance <= currentQty) {
                        totalQty = qty;
                        return accumulator + currentQtyBalance * currentValue.price;
                    }
                    totalQty += currentQty;
                    return accumulator + currentQty * currentValue.price;
                }, 0);
                if (totalQty < qty) {
                    vwap += (qty - totalQty) * this.summary.bidAsk.bid;
                }
                return vwap / qty || 0;
            default:
                return this.summary.bidAsk.bid; // Should not happen
        }
    }
    ;
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
        this.summary.calculatedPrice = OrderHelperInstance.getPrice(this.summary.orderType, this.summary.calculatedVWAP, this.summary.limitPrice, this.summary.stopPrice) || 0;
        this.summary.calculatedAmount = OrderHelperInstance.calculateAmount(this.summary.action, this.summary.amount, this.summary.calculatedPrice, this.summary.commissionAccount, isQuote);
        this.summary.calculatedFees = OrderHelperInstance.calculateFees(OrderHelperInstance.calculateTotal(this.summary.action, this.summary.commissionAccount, this.summary.amount, this.summary.calculatedPrice, this.summary.calculatedFees, isQuote), this.summary.calculatedPrice, this.summary.fees, this.summary.orderType, this.summary.action, this.summary.bidAsk, this.summary.commissionAccount, isQuote, this.summary.feeProduct === this.summary.base);
        this.summary.calculatedTotal = OrderHelperInstance.calculateTotal(this.summary.action, this.summary.commissionAccount, this.summary.amount, this.summary.calculatedPrice, this.summary.calculatedFees, isQuote);
        this.summary.calculatedNet = OrderHelperInstance.calculateNet(this.summary.action, this.summary.commissionAccount, this.summary.amount, this.summary.calculatedPrice, this.summary.calculatedFees, isQuote);
        return {
            fees: this.summary.calculatedFees,
            price: this.summary.calculatedPrice,
            amount: this.summary.calculatedAmount,
            net: this.summary.calculatedNet,
            total: this.summary.calculatedTotal,
            totalProduct: this.summary.totalProduct,
            feeProduct: this.summary.feeProduct,
            netProduct: this.summary.netProduct,
            amountProduct: this.summary.amountProduct,
            currentProduct: this.summary.currentProduct,
            withTrm: Number(this.summary.calculatedNet) / this.summary.takerReserveMultiplier,
            isQuote,
        };
    }
}
exports.OrderSummary = OrderSummary;
//# sourceMappingURL=order-summary.js.map