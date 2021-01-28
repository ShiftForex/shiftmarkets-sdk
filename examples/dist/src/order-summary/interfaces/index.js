"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeeType = exports.AccountType = exports.FeeCalculationMethod = void 0;
const interfaces_1 = require("../../trade/interfaces");
var FeeCalculationMethod;
(function (FeeCalculationMethod) {
    FeeCalculationMethod["quantityPercent"] = "quantity_percent";
    FeeCalculationMethod["exactValue"] = "exact_value";
})(FeeCalculationMethod = exports.FeeCalculationMethod || (exports.FeeCalculationMethod = {}));
var AccountType;
(function (AccountType) {
    AccountType["sourceAccount"] = "source_account";
    AccountType["destinationAccount"] = "destination_account";
})(AccountType = exports.AccountType || (exports.AccountType = {}));
var FeeType;
(function (FeeType) {
    FeeType["maker"] = "maker";
    FeeType["taker"] = "taker";
})(FeeType = exports.FeeType || (exports.FeeType = {}));
