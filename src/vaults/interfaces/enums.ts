export enum VaultTypeTransaction {
  Withdraw = 'LENDING_REDEMPTION',
  Deposit = 'LENDING_ALLOCATION',
  Interest = 'INTEREST',
  CreditCorrection = 'CREDIT_CORRECTION',
  DebitCorrection = 'DEBIT_CORRECTION',
  CreditOther = 'CREDIT_OTHER',
  DebitOther = 'DEBIT_OTHER',
  Fee = 'FEE',
  Hold = 'HOLD',
}

export enum LendingTicketStatus {
  Open = 'open',
  Blocked = 'blocked',
  Processed = 'processed',
  Cancelled = 'cancelled',
}

export enum VaultTransactionStatus {
  Pending = 'PENDING',
  Approved = 'APPROVED',
  Processed = 'PROCESSED',
  Canceled = 'CANCELLED',
}

export enum VaultAccountClass {
  Liability = 'LIABILITY',
  Equity = 'EQUITY',
  Asset = 'ASSET ',
}

export enum VaultTransactionReason {
  DailyLimit = 'DAILY_LIMIT',
}

export enum VaultAccountType {
  Principal = 'LENDING_PRINCIPAL',
  Interest = 'LENDING_INTEREST',
  Hold = 'HOLD',
  OperatorFee = 'OPERATOR_FEE',
}

export enum VaultTimeUnit {
  Second = 'SECOND',
  Minute = 'MINUTE',
  Hour = 'HOUR',
  Day = 'DAY',
  Week = 'WEEK',
  Month = 'MONTH',
  Year = 'YEAR'
}

export enum VaultTermType {
  Fixed = 'FIXED',
  Open = 'OPEN'
}

export enum VaultAccrualMode {
  PerBalance = 'PER_BALANCE',
  PerTransaction = 'PER_TRANSACTION'
}

export enum VaultAccrualMethod {
  CompoundInterest = 'COMPOUND_INTEREST',
  SimpleInterest = 'SIMPLE_INTEREST',
}

export enum VaultProtocolType {
  Alkemi = 'ALKEMI'
}

export enum VaultCategory {
  DeFi = 'DEFI',
  Staking = 'STAKING',
  YieldFarming = 'YIELD_FARMING'
}

export enum VaultRateType {
  Fixed = 'FIXED',
  Stable = 'STABLE',
  Variable = 'VARIABLE'
}
