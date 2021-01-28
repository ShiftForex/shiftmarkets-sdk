import { OrderSummaryPayload, OrderSummaryProperties, OrderSummaryValues } from "./interfaces";
export declare class OrderSummary {
    summary: OrderSummaryProperties | any;
    initValues(orderSummary: OrderSummaryPayload): void;
    private _setProductsAndDecimals;
    getValues(): OrderSummaryValues;
}
