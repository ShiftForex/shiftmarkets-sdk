export declare enum VaultTypeTransaction {
    Withdraw = "LENDING_REDEMPTION",
    Deposit = "LENDING_ALLOCATION",
    Interest = "INTEREST",
    CreditCorrection = "CREDIT_CORRECTION",
    DebitCorrection = "DEBIT_CORRECTION",
    CreditOther = "CREDIT_OTHER",
    DebitOther = "DEBIT_OTHER",
    Fee = "FEE",
    Hold = "HOLD"
}
export declare enum LendingTicketStatus {
    Open = "open",
    Blocked = "blocked",
    Processed = "processed",
    Cancelled = "cancelled"
}
export declare enum VaultTransactionStatus {
    Pending = "PENDING",
    Approved = "APPROVED",
    Processed = "PROCESSED",
    Canceled = "CANCELLED"
}
export declare enum VaultAccountClass {
    Liability = "LIABILITY",
    Equity = "EQUITY",
    Asset = "ASSET "
}
export declare enum VaultTransactionReason {
    DailyLimit = "DAILY_LIMIT"
}
export declare enum VaultAccountType {
    Principal = "LENDING_PRINCIPAL",
    Interest = "LENDING_INTEREST",
    Hold = "HOLD",
    OperatorFee = "OPERATOR_FEE"
}
export declare enum VaultTimeUnit {
    Second = "SECOND",
    Minute = "MINUTE",
    Hour = "HOUR",
    Day = "DAY",
    Week = "WEEK",
    Month = "MONTH",
    Year = "YEAR"
}
export declare enum VaultTermType {
    Fixed = "FIXED",
    Open = "OPEN"
}
export declare enum VaultAccrualMode {
    PerBalance = "PER_BALANCE",
    PerTransaction = "PER_TRANSACTION"
}
export declare enum VaultAccrualMethod {
    CompoundInterest = "COMPOUND_INTEREST",
    SimpleInterest = "SIMPLE_INTEREST"
}
export declare enum VaultProtocolType {
    Alkemi = "ALKEMI"
}
export declare enum VaultCategory {
    DeFi = "DEFI",
    Staking = "STAKING",
    YieldFarming = "YIELD_FARMING"
}
export declare enum VaultRateType {
    Fixed = "FIXED",
    Stable = "STABLE",
    Variable = "VARIABLE"
}
