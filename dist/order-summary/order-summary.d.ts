import { OrderSummaryPayload, OrderSummaryProperties, OrderSummaryValues } from "./interfaces";
/**
 * https://docs.google.com/document/d/1XFA8Vj2qzqHuUKthFV0c6Vz3p96WCCcqtv1AhmYIKPY/edit
 */
export declare class OrderSummary {
    summary: OrderSummaryProperties | any;
    initValues(orderSummary: OrderSummaryPayload): void;
    getLimitPrice(qty?: number): any;
    private _setProductsAndDecimals;
    getValues(): OrderSummaryValues;
}
