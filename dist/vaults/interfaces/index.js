"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaultRateType = exports.VaultAccrualMethod = exports.VaultAccrualMode = exports.VaultTermType = exports.VaultTimeUnit = exports.VaultAccountType = exports.VaultTypeTransaction = void 0;
var VaultTypeTransaction;
(function (VaultTypeTransaction) {
    VaultTypeTransaction["Withdraw"] = "LENDING_REDEMPTION";
    VaultTypeTransaction["Deposit"] = "LENDING_ALLOCATION";
    VaultTypeTransaction["Interest"] = "INTEREST";
})(VaultTypeTransaction = exports.VaultTypeTransaction || (exports.VaultTypeTransaction = {}));
var VaultAccountType;
(function (VaultAccountType) {
    VaultAccountType["Principal"] = "LENDING_PRINCIPAL";
    VaultAccountType["Interest"] = "LENDING_INTEREST";
})(VaultAccountType = exports.VaultAccountType || (exports.VaultAccountType = {}));
var VaultTimeUnit;
(function (VaultTimeUnit) {
    VaultTimeUnit["Second"] = "SECOND";
    VaultTimeUnit["Minute"] = "MINUTE";
    VaultTimeUnit["Hour"] = "HOUR";
    VaultTimeUnit["Day"] = "DAY";
    VaultTimeUnit["Week"] = "WEEK";
    VaultTimeUnit["Month"] = "MONTH";
    VaultTimeUnit["Year"] = "YEAR";
})(VaultTimeUnit = exports.VaultTimeUnit || (exports.VaultTimeUnit = {}));
var VaultTermType;
(function (VaultTermType) {
    VaultTermType["Fixed"] = "FIXED";
    VaultTermType["Open"] = "OPEN";
})(VaultTermType = exports.VaultTermType || (exports.VaultTermType = {}));
var VaultAccrualMode;
(function (VaultAccrualMode) {
    VaultAccrualMode["PerBalance"] = "PER_BALANCE";
    VaultAccrualMode["PerTransaction"] = "PER_TRANSACTION";
})(VaultAccrualMode = exports.VaultAccrualMode || (exports.VaultAccrualMode = {}));
var VaultAccrualMethod;
(function (VaultAccrualMethod) {
    VaultAccrualMethod["CompoundInterest"] = "COMPOUND_INTEREST";
    VaultAccrualMethod["SimpleInterest"] = "SIMPLE_INTEREST";
})(VaultAccrualMethod = exports.VaultAccrualMethod || (exports.VaultAccrualMethod = {}));
var VaultRateType;
(function (VaultRateType) {
    VaultRateType["Fixed"] = "FIXED";
    VaultRateType["Stable"] = "STABLE";
    VaultRateType["Variable"] = "VARIABLE";
})(VaultRateType = exports.VaultRateType || (exports.VaultRateType = {}));
//# sourceMappingURL=index.js.map