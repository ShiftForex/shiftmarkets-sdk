import { OrderHelper } from "./order-helper";
import { OrderSummary } from "./order-summary";
import { OrderSummaryPayload } from "./interfaces";

export class OrderSummaryCreator {
  getOrderSummary(payload: OrderSummaryPayload): OrderSummary {
    const instant = new OrderSummary();
    instant.initValues(payload);
    return instant;
  }
  getOrderHelper() {
    return new OrderHelper();
  }
}

export interface IOrderSummaryCreator {
  getOrderSummary: (payload: OrderSummaryPayload) => OrderSummary,
  getOrderHelper: () => OrderHelper,
}
