import {OrderSide, OrderType, ProductType, Sides, Types,} from "../trade/interfaces";
import {AccountType, BidAskValues, Fee, FeeCalculationMethod, FeeType, InstrumentFee, IOrderBook,} from "./interfaces";
import {Orderbook} from "../orderbook/orderbook";
import {calculateQuoteVWAP, calculateVWAP} from "../orderbook/utils/vwap";
import {VolumeWeightedAveragePrice} from "../orderbook/interfaces/volume-weighted-average-price.interface";
import BigNumber from "bignumber.js";

/**
 * https://docs.google.com/document/d/1XFA8Vj2qzqHuUKthFV0c6Vz3p96WCCcqtv1AhmYIKPY/edit
 */
export class OrderHelper {
  checkIfFinite = (value: number) => isFinite(value) ? value : 0;

  calculateVWAP = (
    action: OrderSide,
    _orderBook: IOrderBook,
    amount: number
  ): VolumeWeightedAveragePrice => {
    const orderBook = action === "sell" ? _orderBook.asks : _orderBook.bids;
    const vwapResult = calculateVWAP(orderBook, amount);
    return {
      ...vwapResult,
      price: isFinite(vwapResult.price) && vwapResult.price > 0 ? vwapResult.price : orderBook[0]?.price || 0
    }
  }

  calculateQuoteQuantityVWAP = (
    orderBook: IOrderBook,
    action: OrderSide,
    quoteQuantity: number
  ): VolumeWeightedAveragePrice => calculateQuoteVWAP(
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
      this.checkIfFinite(amount * calculatedPrice);

  calculateAmount = (
    action: OrderSide,
    amount: number,
    calculatedPrice: number,
    commissionAccount: AccountType,
    isSinglePrice: boolean = false,
  ): number => {
    const base = ProductType.base;
    const quote = ProductType.quote;
    const amounts = {
      [AccountType.destinationAccount]: {
        [base]: {
          [Sides.Buy]: this.amountOnPrice(amount, calculatedPrice),
          [Sides.Sell]: amount,
        },
        [quote]: {
          [Sides.Buy]: amount,
          [Sides.Sell]: amount / calculatedPrice,
        },
      },
      [AccountType.sourceAccount]: {
        [base]: {
          [Sides.Buy]: amount,
          [Sides.Sell]: this.amountOnPrice(amount, calculatedPrice),
        },
        [quote]: {
          [Sides.Buy]: amount / calculatedPrice,
          [Sides.Sell]: amount,
        },
      }
    };
    return this.checkIfFinite(amounts[commissionAccount][isSinglePrice ? quote : base][action]);
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
          [Sides.Buy]: this.amountOnPrice(amount, calculatedPrice),
          [Sides.Sell]: amount,
        },
        [quote]: {
          [Sides.Buy]: amount,
          [Sides.Sell]: amount / calculatedPrice,
        },
      },
      [AccountType.destinationAccount]: {
        [base]: {
          [Sides.Buy]: amount - calculatedFees,
          [Sides.Sell]:
            this.amountOnPrice(amount, calculatedPrice) - calculatedFees,
        },
        [quote]: {
          [Sides.Buy]: amount / calculatedPrice - calculatedFees,
          [Sides.Sell]: amount - calculatedFees,
        },
      },
    };

    return this.checkIfFinite(nets[commissionAccount][isQuote ? quote : base][action]);
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
    isQuote: boolean = false,
    shouldDivideFlat: boolean = false,
    feeDecimals: number = 5,
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

    let feeAmount: BigNumber = new BigNumber(0);
    if (!fee) {
      return feeAmount.toNumber();
    }
    /**
     * Used in case if fee should be in BTC (base) so, flat price divided on BTC (base) price
     * @param flatFee
     */
    const flatInBase = (flatFee: BigNumber) => {
      if (shouldDivideFlat) {
        return flatFee.dividedBy(price);
      }
      return flatFee;
    }

    if (method === FeeType.maker) {
      if (fee.makerProgressive) {
        feeAmount = feeAmount.plus(
          new BigNumber(this.calculateFee(
            fee.progressiveMethod,
            fee.makerProgressive,
            total
          ))
        );
      }
      if (fee.makerFlat) {
        feeAmount = feeAmount.plus(
          flatInBase(new BigNumber(this.calculateFee(
            fee.flatMethod,
            fee.makerFlat,
            total
          )))
        );
      }
    } else {
      if (fee.takerProgressive) {
        feeAmount = feeAmount.plus(
          new BigNumber(this.calculateFee(
            fee.progressiveMethod,
            fee.takerProgressive,
            total
          ))
        );
      }
      if (fee.takerFlat) {
        feeAmount = feeAmount.plus(
          flatInBase(new BigNumber(this.calculateFee(
            fee.flatMethod,
            fee.takerFlat,
            total
          )))
        );
      }
    }

    const base = ProductType.base;
    const quote = ProductType.quote;
    const resultTypes = {
      [AccountType.sourceAccount]: {
        [base]: {
          [Sides.Buy]: feeAmount,
          [Sides.Sell]: feeAmount,
        },
        [quote]: {
          [Sides.Buy]: feeAmount,
          [Sides.Sell]: feeAmount,
        },
      },
      [AccountType.destinationAccount]: {
        [base]: {
          [Sides.Buy]: feeAmount,
          [Sides.Sell]: feeAmount,
        },
        [quote]: {
          [Sides.Buy]: feeAmount,
          [Sides.Sell]: feeAmount,
        },
      },
    };

    return this.checkIfFinite(Number(resultTypes[commissionAccount][isQuote ? quote : base][action].toFormat(feeDecimals)));
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
          [Sides.Buy]: this.amountOnPrice(amount, calculatedPrice) + calculatedFees,
          [Sides.Sell]: amount + calculatedFees,
        },
        [quote]: {
          [Sides.Buy]: amount + calculatedFees,
          [Sides.Sell]: amount / calculatedPrice + calculatedFees,
        },
      },
      [AccountType.destinationAccount]: {
        [base]: {
          [Sides.Buy]: amount,
          [Sides.Sell]: this.amountOnPrice(amount, calculatedPrice),
        },
        [quote]: {
          [Sides.Buy]: amount / calculatedPrice,
          [Sides.Sell]: amount,
        },
      },
    };
    return this.checkIfFinite(totals[commissionAccount][isQuote ? quote : base][action]);
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
    commissionAccount: AccountType,
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
    isQuote: boolean,
    shouldDivideFlat: boolean,
    feeDecimals: number,
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
