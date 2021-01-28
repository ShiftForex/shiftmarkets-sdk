"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductType = exports.Types = exports.Sides = void 0;
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
