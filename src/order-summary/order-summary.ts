import {OrderHelper} from "./order-helper";
import config from "./config";
import {
  AccountType,
  OrderSummaryPayload,
  OrderSummaryProperties,
  OrderSummaryValues,
  ProductsConfig,
  ProductsConfigOptions,
} from "./interfaces";
import {ProductType, Sides,} from "../trade/interfaces";

const OrderHelperInstance = new OrderHelper();
const defaultQuote: string = config.defaultQuoteCurrency;
const defaultBase: string = config.defaultProduct;
const defaultQuoteDecimals: number = config.products && config.defaultDecimals
  ? config.defaultDecimals.fiat
  : 2;
const defaultBaseDecimals: number = config.products && config.defaultDecimals
  ? config.defaultDecimals.crypto
  : 5;

/**
 * https://docs.google.com/document/d/1XFA8Vj2qzqHuUKthFV0c6Vz3p96WCCcqtv1AhmYIKPY/edit
 */
export class OrderSummary {
  summary: OrderSummaryProperties | any = {
    amount: 0,
    fees: 0,
    calculatedFees: 0,
    calculatedTotal: 0,
    calculatedNet: 0,
    calculatedPrice: 0,
  };

  public initValues(orderSummary: OrderSummaryPayload) {
    this.summary.commissionAccount = orderSummary.commissionAccount || AccountType.sourceAccount;
    this.summary.action = orderSummary.action || Sides.Buy;
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

  public getLimitPrice(qty = 0) {
    switch (this.summary.action) {
      case Sides.Buy:
        return this.summary.bidAsk.ask; // If buying, get ask price
      case Sides.Sell:
        let totalQty = 0;
        let vwap = this.summary.orderBook.bids.reduce((accumulator: any, currentValue: any) => {
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
  };

  private _setProductsAndDecimals(): void {
    const base = ProductType.base;
    const quote = ProductType.quote;
    const products = {
      [quote]: this.summary.quote,
      [base]: this.summary.base,
    }
    const decimals = {
      [quote]: this.summary.quoteDecimals,
      [base]: this.summary.baseDecimals,
    };
    const isQuote = this.summary.currentProduct === this.summary.quote;
    const optionProductsConfig = `${this.summary.action}_${isQuote ? quote : base}_${this.summary.commissionAccount}` as ProductsConfigOptions;
    const result: ProductsConfig =
      config.productsConfig[optionProductsConfig] as ProductsConfig
      || config.productsConfig.default;
    this.summary.totalProduct = products[result.totalProduct];
    this.summary.feeProduct = products[result.feeProduct];
    this.summary.netProduct = products[result.netProduct];
    this.summary.amountProduct = products[result.amountProduct];
    this.summary.feeDecimals = decimals[result.feeProduct];
    this.summary.totalDecimals = decimals[result.totalProduct]
    this.summary.amountDecimals = decimals[result.amountProduct];
  }

  public getValues(): OrderSummaryValues {
    const isQuote = this.summary.currentProduct === this.summary.quote;
    const vwapAction = this.summary.action === Sides.Buy ? Sides.Sell : Sides.Buy;
    const quoteVWAP = OrderHelperInstance.calculateQuoteQuantityVWAP(this.summary.orderBook, vwapAction, this.summary.amount);
    const baseVWAP = OrderHelperInstance.calculateVWAP(vwapAction, this.summary.orderBook, this.summary.amount);
    const VWAP = isQuote ? quoteVWAP : baseVWAP;
    this.summary.calculatedVWAP = VWAP.price;
    this.summary.calculatedPrice = OrderHelperInstance.getPrice(this.summary.orderType, this.summary.calculatedVWAP, this.summary.limitPrice, this.summary.stopPrice) || 0;

    this.summary.calculatedAmount = OrderHelperInstance.calculateAmount(
      this.summary.action,
      this.summary.amount,
      this.summary.calculatedPrice,
      this.summary.commissionAccount,
      isQuote,
    );

    this.summary.calculatedFees = OrderHelperInstance.calculateFees(
      OrderHelperInstance.calculateTotal(
        this.summary.action,
        this.summary.commissionAccount,
        this.summary.amount,
        this.summary.calculatedPrice,
        this.summary.calculatedFees,
        isQuote,
      ),
      this.summary.calculatedPrice,
      this.summary.fees,
      this.summary.orderType,
      this.summary.action,
      this.summary.bidAsk,
      this.summary.commissionAccount,
      isQuote,
      this.summary.feeProduct === this.summary.base,
    );
    this.summary.calculatedTotal = OrderHelperInstance.calculateTotal(
      this.summary.action,
      this.summary.commissionAccount,
      this.summary.amount,
      this.summary.calculatedPrice,
      this.summary.calculatedFees,
      isQuote,
    );
    this.summary.calculatedNet = OrderHelperInstance.calculateNet(
      this.summary.action,
      this.summary.commissionAccount,
      this.summary.amount,
      this.summary.calculatedPrice,
      this.summary.calculatedFees,
      isQuote,
    );

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
      withTrm: Number(this.summary.calculatedTotal) * this.summary.takerReserveMultiplier + this.summary.calculatedFees,
      isQuote,
    };
  }
}
