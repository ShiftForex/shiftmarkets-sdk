"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatuses = exports.ProductType = exports.Types = exports.Sides = void 0;
var Sides;
(function (Sides) {
    Sides["Sell"] = "sell";
    Sides["Buy"] = "buy";
})(Sides = exports.Sides || (exports.Sides = {}));
var Types;
(function (Types) {
    Types["Limit"] = "limit";
    Types["Market"] = "market";
    Types["Stop"] = "stop";
    Types["StopLimit"] = "stop_limit";
})(Types = exports.Types || (exports.Types = {}));
var ProductType;
(function (ProductType) {
    ProductType["base"] = "base";
    ProductType["quote"] = "quote";
})(ProductType = exports.ProductType || (exports.ProductType = {}));
var OrderStatuses;
(function (OrderStatuses) {
    OrderStatuses["New"] = "new";
    OrderStatuses["PartiallyFilled"] = "partially_filled";
    OrderStatuses["PendingNew"] = "pending_new";
    OrderStatuses["PendingCancel"] = "pending_cancel";
    OrderStatuses["PendingReplace"] = "pending_replace";
    OrderStatuses["CompletelyFilled"] = "completely_filled";
    OrderStatuses["Rejected"] = "rejected";
    OrderStatuses["Canceled"] = "canceled";
    OrderStatuses["Replaced"] = "replaced";
    OrderStatuses["Expired"] = "expired";
    OrderStatuses["Suspended"] = "suspended";
})(OrderStatuses = exports.OrderStatuses || (exports.OrderStatuses = {}));
//# sourceMappingURL=order.interface.js.map