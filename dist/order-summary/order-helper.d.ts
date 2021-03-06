import { OrderSide, OrderType } from "../trade/interfaces";
import { AccountType, BidAskValues, FeeCalculationMethod, InstrumentFee, IOrderBook } from "./interfaces";
import { Orderbook } from "../orderbook/orderbook";
import { VolumeWeightedAveragePrice } from "../orderbook/interfaces/volume-weighted-average-price.interface";
/**
 * https://docs.google.com/document/d/1XFA8Vj2qzqHuUKthFV0c6Vz3p96WCCcqtv1AhmYIKPY/edit
 */
export declare class OrderHelper {
    checkIfFinite: (value: number) => number;
    calculateVWAP: (action: OrderSide, _orderBook: IOrderBook, amount: number) => VolumeWeightedAveragePrice;
    calculateQuoteQuantityVWAP: (orderBook: IOrderBook, action: OrderSide, quoteQuantity: number) => VolumeWeightedAveragePrice;
    getPrice: (orderType: OrderType, calculatedVWAP: number, limitPrice: number, stopPrice: number) => number;
    amountOnPrice: (amount: number, calculatedPrice: number) => number;
    calculateAmount: (action: OrderSide, amount: number, calculatedPrice: number, commissionAccount: AccountType, isSinglePrice?: boolean) => number;
    calculateNet: (action: OrderSide, commissionAccount: AccountType, amount: number, calculatedPrice: number, calculatedFees: number, isQuote?: boolean | undefined) => number;
    calculateFee: (method: FeeCalculationMethod, fee: number, amount: number) => number;
    calculateFees: (total: number, price: number, fees: InstrumentFee, orderType: OrderType, action: OrderSide, bidAsk: BidAskValues, commissionAccount: AccountType, isQuote?: boolean, shouldDivideFlat?: boolean) => number;
    calculateTotal: (action: OrderSide, commissionAccount: AccountType, amount: number, calculatedPrice: number, calculatedFees: number, isQuote?: boolean | undefined) => number;
}
export interface IOrderHelper {
    calculateVWAP: (action: OrderSide, orderBook: Orderbook, amount: number) => VolumeWeightedAveragePrice;
    calculateQuoteQuantityVWAP: (action: OrderSide, orderBook: Orderbook, quoteQuantity: number) => VolumeWeightedAveragePrice;
    getPrice: (orderType: OrderType, calculatedVWAP: number, limitPrice: number, stopPrice: number) => number;
    amountOnPrice: (amount: number, calculatedPrice: number) => number;
    calculateAmount: (action: OrderSide, amount: number, calculatedPrice: number, commissionAccount: AccountType, isSinglePrice?: boolean) => number;
    calculateNet: (action: OrderSide, commissionAccount: AccountType, amount: number, calculatedPrice: number, calculatedFees: number, isQuote?: boolean) => number;
    calculateFee: (method: FeeCalculationMethod, fee: number, amount: number) => number;
    calculateFees: (total: number, price: number, fees: InstrumentFee, orderType: OrderType, action: OrderSide, bidAsk: BidAskValues, commissionAccount: AccountType, isQuote: boolean, shouldDivideFlat: boolean) => number;
    calculateTotal: (action: OrderSide, commissionAccount: AccountType, amount: number, calculatedPrice: number, calculatedFees: number, isQuote?: boolean) => number;
}
