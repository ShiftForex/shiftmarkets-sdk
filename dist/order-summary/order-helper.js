"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderHelper = void 0;
const interfaces_1 = require("../trade/interfaces");
const interfaces_2 = require("./interfaces");
const vwap_1 = require("../orderbook/utils/vwap");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
class OrderHelper {
    constructor() {
        this.checkIfFinite = (value) => isFinite(value) ? value : 0;
        this.calculateVWAP = (action, _orderBook, amount) => {
            var _a;
            const orderBook = action === "sell" ? _orderBook.asks : _orderBook.bids;
            const vwapResult = vwap_1.calculateVWAP(orderBook, amount);
            return {
                ...vwapResult,
                price: isFinite(vwapResult.price) && vwapResult.price > 0 ? vwapResult.price : ((_a = orderBook[0]) === null || _a === void 0 ? void 0 : _a.price) || 0
            };
        };
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
        this.amountOnPrice = (amount, calculatedPrice) => this.checkIfFinite(amount * calculatedPrice);
        this.calculateAmount = (action, amount, calculatedPrice, commissionAccount, isSinglePrice = false) => {
            const base = interfaces_1.ProductType.base;
            const quote = interfaces_1.ProductType.quote;
            const amounts = {
                [interfaces_2.AccountType.destinationAccount]: {
                    [base]: {
                        [interfaces_1.Sides.Buy]: this.amountOnPrice(amount, calculatedPrice),
                        [interfaces_1.Sides.Sell]: amount,
                    },
                    [quote]: {
                        [interfaces_1.Sides.Buy]: amount,
                        [interfaces_1.Sides.Sell]: amount / calculatedPrice,
                    },
                },
                [interfaces_2.AccountType.sourceAccount]: {
                    [base]: {
                        [interfaces_1.Sides.Buy]: amount,
                        [interfaces_1.Sides.Sell]: this.amountOnPrice(amount, calculatedPrice),
                    },
                    [quote]: {
                        [interfaces_1.Sides.Buy]: amount / calculatedPrice,
                        [interfaces_1.Sides.Sell]: amount,
                    },
                }
            };
            return this.checkIfFinite(amounts[commissionAccount][isSinglePrice ? quote : base][action]);
        };
        this.calculateNet = (action, commissionAccount, amount, calculatedPrice, calculatedFees, isQuote) => {
            const base = interfaces_1.ProductType.base;
            const quote = interfaces_1.ProductType.quote;
            const nets = {
                [interfaces_2.AccountType.sourceAccount]: {
                    [base]: {
                        [interfaces_1.Sides.Buy]: this.amountOnPrice(amount, calculatedPrice),
                        [interfaces_1.Sides.Sell]: amount,
                    },
                    [quote]: {
                        [interfaces_1.Sides.Buy]: amount,
                        [interfaces_1.Sides.Sell]: amount / calculatedPrice - calculatedFees,
                    },
                },
                [interfaces_2.AccountType.destinationAccount]: {
                    [base]: {
                        [interfaces_1.Sides.Buy]: amount - calculatedFees,
                        [interfaces_1.Sides.Sell]: this.amountOnPrice(amount, calculatedPrice) - calculatedFees,
                    },
                    [quote]: {
                        [interfaces_1.Sides.Buy]: amount / calculatedPrice - calculatedFees,
                        [interfaces_1.Sides.Sell]: amount - calculatedFees,
                    },
                },
            };
            return this.checkIfFinite(nets[commissionAccount][isQuote ? quote : base][action]);
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
            let feeAmount = new bignumber_js_1.default(0);
            if (!fee) {
                return feeAmount.toNumber();
            }
            if (method === interfaces_2.FeeType.maker) {
                if (fee.makerProgressive) {
                    feeAmount = feeAmount.plus(new bignumber_js_1.default(this.calculateFee(fee.progressiveMethod, fee.makerProgressive, total)));
                }
                if (fee.makerFlat) {
                    feeAmount = feeAmount.plus(new bignumber_js_1.default(this.calculateFee(fee.flatMethod, fee.makerFlat, total)));
                }
            }
            else {
                if (fee.takerProgressive) {
                    feeAmount = feeAmount.plus(new bignumber_js_1.default(this.calculateFee(fee.progressiveMethod, fee.takerProgressive, total)));
                }
                if (fee.takerFlat) {
                    feeAmount = feeAmount.plus(new bignumber_js_1.default(this.calculateFee(fee.flatMethod, fee.takerFlat, total)));
                }
            }
            const base = interfaces_1.ProductType.base;
            const quote = interfaces_1.ProductType.quote;
            const resultTypes = {
                [interfaces_2.AccountType.sourceAccount]: {
                    [base]: {
                        [interfaces_1.Sides.Buy]: feeAmount,
                        [interfaces_1.Sides.Sell]: feeAmount,
                    },
                    [quote]: {
                        [interfaces_1.Sides.Buy]: feeAmount,
                        [interfaces_1.Sides.Sell]: feeAmount,
                    },
                },
                [interfaces_2.AccountType.destinationAccount]: {
                    [base]: {
                        [interfaces_1.Sides.Buy]: feeAmount,
                        [interfaces_1.Sides.Sell]: feeAmount,
                    },
                    [quote]: {
                        [interfaces_1.Sides.Buy]: feeAmount,
                        [interfaces_1.Sides.Sell]: feeAmount,
                    },
                },
            };
            return this.checkIfFinite(Number(resultTypes[commissionAccount][isQuote ? quote : base][action].toFormat(10)));
        };
        this.calculateTotal = (action, commissionAccount, amount, calculatedPrice, calculatedFees, isQuote) => {
            const base = interfaces_1.ProductType.base;
            const quote = interfaces_1.ProductType.quote;
            const totals = {
                [interfaces_2.AccountType.sourceAccount]: {
                    [base]: {
                        [interfaces_1.Sides.Buy]: this.amountOnPrice(amount, calculatedPrice) + calculatedFees,
                        [interfaces_1.Sides.Sell]: amount + calculatedFees,
                    },
                    [quote]: {
                        [interfaces_1.Sides.Buy]: amount + calculatedFees,
                        [interfaces_1.Sides.Sell]: amount / calculatedPrice + calculatedFees,
                    },
                },
                [interfaces_2.AccountType.destinationAccount]: {
                    [base]: {
                        [interfaces_1.Sides.Buy]: amount,
                        [interfaces_1.Sides.Sell]: this.amountOnPrice(amount, calculatedPrice),
                    },
                    [quote]: {
                        [interfaces_1.Sides.Buy]: amount / calculatedPrice,
                        [interfaces_1.Sides.Sell]: amount,
                    },
                },
            };
            return this.checkIfFinite(totals[commissionAccount][isQuote ? quote : base][action]);
        };
    }
}
exports.OrderHelper = OrderHelper;
//# sourceMappingURL=order-helper.js.map