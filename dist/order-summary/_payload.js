"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._Action = void 0;
const interfaces_1 = require("./interfaces");
var _Action;
(function (_Action) {
    _Action["Buy"] = "buy";
    _Action["Sell"] = "sell";
})(_Action = exports._Action || (exports._Action = {}));
var _OrderType;
(function (_OrderType) {
    _OrderType["Market"] = "market";
    _OrderType["Limit"] = "limit";
    _OrderType["Stop"] = "stop";
})(_OrderType || (_OrderType = {}));
exports.default = {
    orderBook: {
        asks: [
            { price: 10000, volume: 1, side: _Action.Sell },
            { price: 10100, volume: 1, side: _Action.Sell },
            { price: 10200, volume: 1, side: _Action.Sell },
            { price: 10300, volume: 1, side: _Action.Sell },
            { price: 10400, volume: 1, side: _Action.Sell },
            { price: 10500, volume: 1, side: _Action.Sell },
            { price: 10600, volume: 1, side: _Action.Sell },
        ],
        bids: [
            { price: 10000, volume: 1, side: _Action.Buy },
            { price: 10100, volume: 1, side: _Action.Buy },
            { price: 10200, volume: 1, side: _Action.Buy },
            { price: 10300, volume: 1, side: _Action.Buy },
            { price: 10400, volume: 1, side: _Action.Buy },
            { price: 10500, volume: 1, side: _Action.Buy },
            { price: 10600, volume: 1, side: _Action.Buy },
        ],
    },
    commissionAccount: interfaces_1.AccountType.destinationAccount,
    action: _Action.Buy,
    amount: 2,
    orderType: _OrderType.Market,
    fees: {
        buy: {
            flatMethod: interfaces_1.FeeCalculationMethod.exactValue,
            makerFlat: 0,
            makerProgressive: 0.10,
            progressiveMethod: interfaces_1.FeeCalculationMethod.quantityPercent,
            source: interfaces_1.AccountType.destinationAccount,
            takerFlat: 0,
            takerProgressive: 0.10,
        },
        sell: {
            flatMethod: interfaces_1.FeeCalculationMethod.exactValue,
            makerFlat: 0,
            makerProgressive: 0.10,
            progressiveMethod: interfaces_1.FeeCalculationMethod.quantityPercent,
            source: interfaces_1.AccountType.destinationAccount,
            takerFlat: 0,
            takerProgressive: 0.10,
        }
    },
    bidAsk: {
        ask: 10000,
        bid: 10700,
    },
    limitPrice: 10600,
    stopPrice: 10000,
    quote: 'USD',
    base: 'BTC',
    quoteDecimals: 2,
    baseDecimals: 8,
    currentProduct: 'BTC',
};
//# sourceMappingURL=_payload.js.map