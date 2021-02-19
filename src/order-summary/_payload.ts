import { AccountType, FeeCalculationMethod } from "./interfaces";

export enum _Action {
    Buy = 'buy',
    Sell = 'sell',
}

enum _OrderType {
    Market = 'market',
    Limit = 'limit',
    Stop = 'stop',
}

export default {
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
    commissionAccount: AccountType.destinationAccount,
    action: _Action.Buy,
    amount: 2,
    orderType: _OrderType.Market,
    fees: {
        buy: {
            flatMethod: FeeCalculationMethod.exactValue,
            makerFlat: 0,
            makerProgressive: 0.10,
            progressiveMethod: FeeCalculationMethod.quantityPercent,
            source: AccountType.destinationAccount,
            takerFlat: 0,
            takerProgressive: 0.10,
        },
        sell: {
            flatMethod: FeeCalculationMethod.exactValue,
            makerFlat: 0,
            makerProgressive: 0.10,
            progressiveMethod: FeeCalculationMethod.quantityPercent,
            source: AccountType.destinationAccount,
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
}