import { BigNumber } from 'bignumber.js';
export declare enum VaultTypeTransaction {
    Withdraw = "LENDING_REDEMPTION",
    Deposit = "LENDING_ALLOCATION",
    Interest = "INTEREST"
}
export declare enum VaultAccountType {
    Principal = "LENDING_PRINCIPAL",
    Interest = "LENDING_INTEREST"
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
export declare enum VaultRateType {
    Fixed = "FIXED",
    Stable = "STABLE",
    Variable = "VARIABLE"
}
export interface Interest {
    accrualMode: VaultAccrualMode;
    accrualMethod: VaultAccrualMethod;
    accrualIntervalUnit: VaultTimeUnit;
    accrualInterval: number;
    rateType: VaultRateType;
    baseAnnualRate: number;
}
export declare type TransactionType = VaultTypeTransaction.Deposit | VaultTypeTransaction.Withdraw | VaultTypeTransaction.Interest;
export interface VaultBalance {
    companyId?: string;
    userId: string;
    productId: string;
    assetId: string;
    accountType: VaultAccountType;
    balance: BigNumber;
}
export interface VaultProduct {
    productId: string;
    name: string;
    description: string;
    companyId?: string;
    assetId: string;
    totalBalance: BigNumber;
    tags: string[];
    enabled: boolean;
    allocationEnabled: boolean;
    minimumAllocationAmount?: BigNumber;
    maximumAllocationAmount?: BigNumber;
    redemptionEnabled: boolean;
    minimumRedemptionAmount?: BigNumber;
    maximumRedemptionAmount?: BigNumber;
    termType: VaultTermType;
    termUnit?: VaultTimeUnit;
    termLength?: number;
    interest?: Interest;
    customData?: string;
    createdAt?: string;
    updatedAt?: string;
}
export interface VaultHistory {
    lendingId: string;
    userId: string;
    productId: string;
    assetId: string;
    amount: BigNumber;
    comments: string;
    transactionType: TransactionType;
    companyId?: string;
    createdAt: Date;
    updatedAt: Date;
    status?: string;
}
export interface VaultDepositWithdrawPayload {
    productId: string;
    assetId: string;
    amount: BigNumber;
    userId: string;
    companyId?: string;
    comments?: string;
}
export interface VaultDepositWithdrawResponse {
    id: string;
    userId: string;
    companyId?: string;
    productId: string;
    assetId: string;
    amount: BigNumber;
    transactionTypeId: string;
    transactionType: TransactionType;
    comments?: string;
    createdAt: Date;
    updatedAt: Date;
    externalMetadata?: any;
}
