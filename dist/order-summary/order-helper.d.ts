import { OrderType, OrderSide } from "../trade/interfaces";
import { AccountType, BidAskValues, InstrumentFee, IOrderBook, FeeCalculationMethod } from "./interfaces";
import { Orderbook } from "../orderbook/orderbook";
import { VolumeWeightedAveragePrice } from "../orderbook/interfaces/volume-weighted-average-price.interface";
export declare class OrderHelper {
    calculateVWAP: (action: OrderSide, orderBook: IOrderBook, amount: number) => VolumeWeightedAveragePrice;
    calculateQuoteQuantityVWAP: (orderBook: IOrderBook, action: OrderSide, quoteQuantity: number) => VolumeWeightedAveragePrice;
    getPrice: (orderType: OrderType, calculatedVWAP: number, limitPrice: number, stopPrice: number) => number;
    amountOnPrice: (amount: number, calculatedPrice: number) => number;
    calculateAmount: (action: OrderSide, amount: number, calculatedPrice: number) => number;
    calculateNet: (action: OrderSide, commissionAccount: AccountType, amount: number, calculatedPrice: number, calculatedFees: number, isQuote?: boolean | undefined) => number;
    calculateFee: (method: FeeCalculationMethod, fee: number, amount: number) => number;
    calculateFees: (total: number, price: number, fees: InstrumentFee, orderType: OrderType, action: OrderSide, bidAsk: BidAskValues, commissionAccount: AccountType, isQuote?: boolean) => number;
    calculateTotal: (action: OrderSide, commissionAccount: AccountType, amount: number, calculatedPrice: number, calculatedFees: number, isQuote?: boolean | undefined) => number;
}
export interface IOrderHelper {
    calculateVWAP: (action: OrderSide, orderBook: Orderbook, amount: number) => VolumeWeightedAveragePrice;
    calculateQuoteQuantityVWAP: (action: OrderSide, orderBook: Orderbook, quoteQuantity: number) => VolumeWeightedAveragePrice;
    getPrice: (orderType: OrderType, calculatedVWAP: number, limitPrice: number, stopPrice: number) => number;
    amountOnPrice: (amount: number, calculatedPrice: number) => number;
    calculateAmount: (action: OrderSide, amount: number, calculatedPrice: number, isSinglePrice?: boolean) => number;
    calculateNet: (action: OrderSide, commissionAccount: AccountType, amount: number, calculatedPrice: number, calculatedFees: number, isQuote?: boolean) => number;
    calculateFee: (method: FeeCalculationMethod, fee: number, amount: number) => number;
    calculateFees: (total: number, price: number, fees: InstrumentFee, orderType: OrderType, action: OrderSide, bidAsk: BidAskValues, commissionAccount: AccountType, isQuote: boolean) => number;
    calculateTotal: (action: OrderSide, commissionAccount: AccountType, amount: number, calculatedPrice: number, calculatedFees: number, isQuote?: boolean) => number;
}
