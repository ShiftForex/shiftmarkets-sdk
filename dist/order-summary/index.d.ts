import { OrderHelper } from "./order-helper";
import { OrderSummary } from "./order-summary";
import { OrderSummaryPayload } from "./interfaces";
export declare class OrderSummaryCreator {
    getOrderSummary(payload: OrderSummaryPayload): OrderSummary;
    getOrderHelper(): OrderHelper;
}
export interface IOrderSummaryCreator {
    getOrderSummary: (payload: OrderSummaryPayload) => OrderSummary;
    getOrderHelper: () => OrderHelper;
}
