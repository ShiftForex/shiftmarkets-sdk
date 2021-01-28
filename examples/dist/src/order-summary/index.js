"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSummaryCreator = void 0;
const order_helper_1 = require("./order-helper");
const order_summary_1 = require("./order-summary");
class OrderSummaryCreator {
    getOrderSummary(payload) {
        const instant = new order_summary_1.OrderSummary();
        instant.initValues(payload);
        return instant;
    }
    getOrderHelper() {
        return new order_helper_1.OrderHelper();
    }
}
exports.OrderSummaryCreator = OrderSummaryCreator;
