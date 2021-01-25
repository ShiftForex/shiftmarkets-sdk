import {
  OrderType,
  Sides,
  OrderSide,
  Types,
  ProductType,
} from "../trade/interfaces";
import {
  AccountType,
  BidAskValues,
  InstrumentFee,
  IOrderBook,
  FeeCalculationMethod,
  FeeType,
  Fee,
} from "./interfaces";
import { Orderbook } from "../orderbook/orderbook";
import { calculateQuoteVWAP, calculateVWAP } from "../orderbook/utils/vwap";
import { VolumeWeightedAveragePrice } from "../orderbook/interfaces/volume-weighted-average-price.interface";

export class OrderHelper {
  calculateVWAP = (
    action: OrderSide,
    orderBook: IOrderBook,
    amount: number
  ): VolumeWeightedAveragePrice =>
    calculateVWAP(action === "sell" ? orderBook.asks : orderBook.bids, amount);

  calculateQuoteQuantityVWAP = (
    orderBook: IOrderBook,
    action: OrderSide,
    quoteQuantity: number
  ): VolumeWeightedAveragePrice =>
    calculateQuoteVWAP(
      action === "sell" ? orderBook.asks : orderBook.bids,
      quoteQuantity
    );

  getPrice = (
    orderType: OrderType,
    calculatedVWAP: number,
    limitPrice: number,
    stopPrice: number
  ): number => {
    const prices = {
      [Types.Market]: calculatedVWAP || 0,
      [Types.Limit]: limitPrice || 0,
      [Types.Stop]: stopPrice || 0,
      [Types.StopLimit]: limitPrice || 0,
    };
    return prices[orderType];
  };

  amountOnPrice = (amount: number, calculatedPrice: number): number =>
    amount * calculatedPrice;

  calculateAmount = (
    action: OrderSide,
    amount: number,
    calculatedPrice: number
  ): number => {
    const amounts = {
      [Sides.Buy]: this.amountOnPrice(amount, calculatedPrice),
      [Sides.Sell]: amount,
    };
    return amounts[action];
  };

  calculateNet = (
    action: OrderSide,
    commissionAccount: AccountType,
    amount: number,
    calculatedPrice: number,
    calculatedFees: number,
    isQuote?: boolean
  ): number => {
    const base = ProductType.base;
    const quote = ProductType.quote;
    const nets = {
      [AccountType.sourceAccount]: {
        [base]: {
          [Sides.Buy]: amount,
          [Sides.Sell]: this.amountOnPrice(amount, calculatedPrice),
        },
        [quote]: {
          [Sides.Buy]: amount - calculatedFees, // amount is base
          [Sides.Sell]: amount / calculatedPrice - calculatedFees, // base / base
        },
      },
      [AccountType.destinationAccount]: {
        [base]: {
          [Sides.Buy]: amount - calculatedFees,
          [Sides.Sell]:
            this.amountOnPrice(amount, calculatedPrice) - calculatedFees,
        },
        [quote]: {
          [Sides.Buy]: amount - calculatedFees * calculatedPrice, // calculate fees as base
          [Sides.Sell]: (amount - calculatedFees) / calculatedPrice, // base / base
        },
      },
    };

    return nets[commissionAccount][isQuote ? quote : base][action];
  };

  calculateFee = (
    method: FeeCalculationMethod,
    fee: number,
    amount: number
  ): number => {
    const fees = {
      [FeeCalculationMethod.quantityPercent]: (amount * fee) / 100,
      [FeeCalculationMethod.exactValue]: +fee,
    };
    return fees[method];
  };

  calculateFees = (
    total: number,
    price: number,
    fees: InstrumentFee,
    orderType: OrderType,
    action: OrderSide,
    bidAsk: BidAskValues,
    commissionAccount: AccountType,
    isQuote: boolean = false
  ): number => {
    const { bid, ask } = bidAsk;

    if (!fees || total === 0) {
      return 0;
    }

    const fee: Fee = fees[action];

    const getMethod = {
      [Types.Limit]: FeeType.maker,
      [Types.StopLimit]: FeeType.maker,
      [Types.Stop]: FeeType.maker,
      [Types.Market]: FeeType.taker,
    };
    let method = getMethod[orderType];
    if (
      (action === Sides.Buy && bid >= price) ||
      (action === Sides.Sell && ask >= price)
    ) {
      method = FeeType.taker;
    }

    let feeAmount: number = 0;
    if (!fee) {
      return feeAmount;
    }

    if (method === FeeType.maker) {
      if (fee.makerProgressive) {
        feeAmount = this.calculateFee(
          fee.progressiveMethod,
          fee.makerProgressive,
          total
        );
      }
      if (fee.makerFlat) {
        feeAmount += this.calculateFee(fee.flatMethod, fee.makerFlat, total);
      }
    } else {
      if (fee.takerProgressive) {
        feeAmount = this.calculateFee(
          fee.progressiveMethod,
          fee.takerProgressive,
          total
        );
      }
      if (fee.takerFlat) {
        feeAmount += this.calculateFee(fee.flatMethod, fee.takerFlat, total);
      }
    }

    if (
      action === Sides.Buy &&
      isQuote &&
      commissionAccount !== AccountType.sourceAccount
    ) {
      return feeAmount * (1 / price);
    }
    if (
      action === Sides.Sell &&
      isQuote &&
      commissionAccount === AccountType.sourceAccount
    ) {
      return feeAmount * (1 / price);
    }
    return feeAmount;
  };

  calculateTotal = (
    action: OrderSide,
    commissionAccount: AccountType,
    amount: number,
    calculatedPrice: number,
    calculatedFees: number,
    isQuote?: boolean
  ): number => {
    const base = ProductType.base;
    const quote = ProductType.quote;
    const totals = {
      [AccountType.sourceAccount]: {
        [base]: {
          [Sides.Buy]:
            this.calculateAmount(action, amount, calculatedPrice) +
            calculatedFees,
          [Sides.Sell]:
            this.calculateAmount(action, amount, calculatedPrice) +
            calculatedFees,
        },
        [quote]: {
          [Sides.Buy]: amount,
          [Sides.Sell]: amount,
        },
      },
      [AccountType.destinationAccount]: {
        [base]: {
          [Sides.Buy]: amount,
          [Sides.Sell]: this.amountOnPrice(amount, calculatedPrice),
        },
        [quote]: {
          [Sides.Buy]: amount,
          [Sides.Sell]: amount,
        },
      },
    };
    return totals[commissionAccount][isQuote ? quote : base][action];
  };
}

export interface IOrderHelper {
  calculateVWAP: (
    action: OrderSide,
    orderBook: Orderbook,
    amount: number
  ) => VolumeWeightedAveragePrice;
  calculateQuoteQuantityVWAP: (
    action: OrderSide,
    orderBook: Orderbook,
    quoteQuantity: number
  ) => VolumeWeightedAveragePrice;
  getPrice: (
    orderType: OrderType,
    calculatedVWAP: number,
    limitPrice: number,
    stopPrice: number
  ) => number;
  amountOnPrice: (amount: number, calculatedPrice: number) => number;
  calculateAmount: (
    action: OrderSide,
    amount: number,
    calculatedPrice: number,
    isSinglePrice?: boolean
  ) => number;
  calculateNet: (
    action: OrderSide,
    commissionAccount: AccountType,
    amount: number,
    calculatedPrice: number,
    calculatedFees: number,
    isQuote?: boolean
  ) => number;
  calculateFee: (
    method: FeeCalculationMethod,
    fee: number,
    amount: number
  ) => number;
  calculateFees: (
    total: number,
    price: number,
    fees: InstrumentFee,
    orderType: OrderType,
    action: OrderSide,
    bidAsk: BidAskValues,
    commissionAccount: AccountType,
    isQuote: boolean
  ) => number;
  calculateTotal: (
    action: OrderSide,
    commissionAccount: AccountType,
    amount: number,
    calculatedPrice: number,
    calculatedFees: number,
    isQuote?: boolean
  ) => number;
}
