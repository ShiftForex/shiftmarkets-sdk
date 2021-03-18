"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaultRateType = exports.VaultCategory = exports.VaultProtocolType = exports.VaultAccrualMethod = exports.VaultAccrualMode = exports.VaultTermType = exports.VaultTimeUnit = exports.VaultAccountType = exports.VaultTransactionReason = exports.VaultAccountClass = exports.VaultTransactionStatus = exports.VaultTypeTransaction = void 0;
var VaultTypeTransaction;
(function (VaultTypeTransaction) {
    VaultTypeTransaction["Withdraw"] = "LENDING_REDEMPTION";
    VaultTypeTransaction["Deposit"] = "LENDING_ALLOCATION";
    VaultTypeTransaction["Interest"] = "INTEREST";
    VaultTypeTransaction["CreditCorrection"] = "CREDIT_CORRECTION";
    VaultTypeTransaction["DebitCorrection"] = "DEBIT_CORRECTION";
    VaultTypeTransaction["CreditOther"] = "CREDIT_OTHER";
    VaultTypeTransaction["DebitOther"] = "DEBIT_OTHER";
})(VaultTypeTransaction = exports.VaultTypeTransaction || (exports.VaultTypeTransaction = {}));
var VaultTransactionStatus;
(function (VaultTransactionStatus) {
    VaultTransactionStatus["Pending"] = "PENDING";
    VaultTransactionStatus["Approved"] = "APPROVED";
    VaultTransactionStatus["Processed"] = "PROCESSED";
    VaultTransactionStatus["Canceled"] = "CANCELLED";
})(VaultTransactionStatus = exports.VaultTransactionStatus || (exports.VaultTransactionStatus = {}));
var VaultAccountClass;
(function (VaultAccountClass) {
    VaultAccountClass["Liability"] = "LIABILITY";
    VaultAccountClass["Equity"] = "EQUITY";
    VaultAccountClass["Asset"] = "ASSET ";
})(VaultAccountClass = exports.VaultAccountClass || (exports.VaultAccountClass = {}));
var VaultTransactionReason;
(function (VaultTransactionReason) {
    VaultTransactionReason["DailyLimit"] = "DAILY_LIMIT";
})(VaultTransactionReason = exports.VaultTransactionReason || (exports.VaultTransactionReason = {}));
var VaultAccountType;
(function (VaultAccountType) {
    VaultAccountType["Principal"] = "LENDING_PRINCIPAL";
    VaultAccountType["Interest"] = "LENDING_INTEREST";
    VaultAccountType["Hold"] = "HOLD";
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
var VaultProtocolType;
(function (VaultProtocolType) {
    VaultProtocolType["Alkemi"] = "ALKEMI";
})(VaultProtocolType = exports.VaultProtocolType || (exports.VaultProtocolType = {}));
var VaultCategory;
(function (VaultCategory) {
    VaultCategory["DeFi"] = "DEFI";
    VaultCategory["Staking"] = "STAKING";
    VaultCategory["YieldFarming"] = "YIELD_FARMING";
})(VaultCategory = exports.VaultCategory || (exports.VaultCategory = {}));
var VaultRateType;
(function (VaultRateType) {
    VaultRateType["Fixed"] = "FIXED";
    VaultRateType["Stable"] = "STABLE";
    VaultRateType["Variable"] = "VARIABLE";
})(VaultRateType = exports.VaultRateType || (exports.VaultRateType = {}));
//# sourceMappingURL=enums.js.map