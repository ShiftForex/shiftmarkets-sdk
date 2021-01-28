"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderHelper = void 0;
const interfaces_1 = require("../trade/interfaces");
const interfaces_2 = require("./interfaces");
const vwap_1 = require("../orderbook/utils/vwap");
class OrderHelper {
    constructor() {
        this.calculateVWAP = (action, orderBook, amount) => vwap_1.calculateVWAP(action === "sell" ? orderBook.asks : orderBook.bids, amount);
        this.calculateQuoteQuantityVWAP = (orderBook, action, quoteQuantity) => vwap_1.calculateQuoteVWAP(action === "sell" ? orderBook.asks : orderBook.bids, quoteQuantity);
        this.getPrice = (orderType, calculatedVWAP, limitPrice, stopPrice) => {
            const prices = {
                [interfaces_1.Types.Market]: calculatedVWAP || 0,
                [interfaces_1.Types.Limit]: limitPrice || 0,
                [interfaces_1.Types.Stop]: stopPrice || 0,
                [interfaces_1.Types.StopLimit]: limitPrice || 0,
            };
            return prices[orderType];
        };
        this.amountOnPrice = (amount, calculatedPrice) => amount * calculatedPrice;
        this.calculateAmount = (action, amount, calculatedPrice) => {
            const amounts = {
                [interfaces_1.Sides.Buy]: this.amountOnPrice(amount, calculatedPrice),
                [interfaces_1.Sides.Sell]: amount,
            };
            return amounts[action];
        };
        this.calculateNet = (action, commissionAccount, amount, calculatedPrice, calculatedFees, isQuote) => {
            const base = interfaces_1.ProductType.base;
            const quote = interfaces_1.ProductType.quote;
            const nets = {
                [interfaces_2.AccountType.sourceAccount]: {
                    [base]: {
                        [interfaces_1.Sides.Buy]: amount,
                        [interfaces_1.Sides.Sell]: this.amountOnPrice(amount, calculatedPrice),
                    },
                    [quote]: {
                        [interfaces_1.Sides.Buy]: amount - calculatedFees,
                        [interfaces_1.Sides.Sell]: amount / calculatedPrice - calculatedFees,
                    },
                },
                [interfaces_2.AccountType.destinationAccount]: {
                    [base]: {
                        [interfaces_1.Sides.Buy]: amount - calculatedFees,
                        [interfaces_1.Sides.Sell]: this.amountOnPrice(amount, calculatedPrice) - calculatedFees,
                    },
                    [quote]: {
                        [interfaces_1.Sides.Buy]: amount - calculatedFees * calculatedPrice,
                        [interfaces_1.Sides.Sell]: (amount - calculatedFees) / calculatedPrice,
                    },
                },
            };
            return nets[commissionAccount][isQuote ? quote : base][action];
        };
        this.calculateFee = (method, fee, amount) => {
            const fees = {
                [interfaces_2.FeeCalculationMethod.quantityPercent]: (amount * fee) / 100,
                [interfaces_2.FeeCalculationMethod.exactValue]: +fee,
            };
            return fees[method];
        };
        this.calculateFees = (total, price, fees, orderType, action, bidAsk, commissionAccount, isQuote = false) => {
            const { bid, ask } = bidAsk;
            if (!fees || total === 0) {
                return 0;
            }
            const fee = fees[action];
            const getMethod = {
                [interfaces_1.Types.Limit]: interfaces_2.FeeType.maker,
                [interfaces_1.Types.StopLimit]: interfaces_2.FeeType.maker,
                [interfaces_1.Types.Stop]: interfaces_2.FeeType.maker,
                [interfaces_1.Types.Market]: interfaces_2.FeeType.taker,
            };
            let method = getMethod[orderType];
            if ((action === interfaces_1.Sides.Buy && bid >= price) ||
                (action === interfaces_1.Sides.Sell && ask >= price)) {
                method = interfaces_2.FeeType.taker;
            }
            let feeAmount = 0;
            if (!fee) {
                return feeAmount;
            }
            if (method === interfaces_2.FeeType.maker) {
                if (fee.makerProgressive) {
                    feeAmount = this.calculateFee(fee.progressiveMethod, fee.makerProgressive, total);
                }
                if (fee.makerFlat) {
                    feeAmount += this.calculateFee(fee.flatMethod, fee.makerFlat, total);
                }
            }
            else {
                if (fee.takerProgressive) {
                    feeAmount = this.calculateFee(fee.progressiveMethod, fee.takerProgressive, total);
                }
                if (fee.takerFlat) {
                    feeAmount += this.calculateFee(fee.flatMethod, fee.takerFlat, total);
                }
            }
            if (action === interfaces_1.Sides.Buy &&
                isQuote &&
                commissionAccount !== interfaces_2.AccountType.sourceAccount) {
                return feeAmount * (1 / price);
            }
            if (action === interfaces_1.Sides.Sell &&
                isQuote &&
                commissionAccount === interfaces_2.AccountType.sourceAccount) {
                return feeAmount * (1 / price);
            }
            return feeAmount;
        };
        this.calculateTotal = (action, commissionAccount, amount, calculatedPrice, calculatedFees, isQuote) => {
            const base = interfaces_1.ProductType.base;
            const quote = interfaces_1.ProductType.quote;
            const totals = {
                [interfaces_2.AccountType.sourceAccount]: {
                    [base]: {
                        [interfaces_1.Sides.Buy]: this.calculateAmount(action, amount, calculatedPrice) +
                            calculatedFees,
                        [interfaces_1.Sides.Sell]: this.calculateAmount(action, amount, calculatedPrice) +
                            calculatedFees,
                    },
                    [quote]: {
                        [interfaces_1.Sides.Buy]: amount,
                        [interfaces_1.Sides.Sell]: amount,
                    },
                },
                [interfaces_2.AccountType.destinationAccount]: {
                    [base]: {
                        [interfaces_1.Sides.Buy]: amount,
                        [interfaces_1.Sides.Sell]: this.amountOnPrice(amount, calculatedPrice),
                    },
                    [quote]: {
                        [interfaces_1.Sides.Buy]: amount,
                        [interfaces_1.Sides.Sell]: amount,
                    },
                },
            };
            return totals[commissionAccount][isQuote ? quote : base][action];
        };
    }
}
exports.OrderHelper = OrderHelper;
//# sourceMappingURL=order-helper.js.map