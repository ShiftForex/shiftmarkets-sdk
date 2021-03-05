import { BigNumber } from 'bignumber.js';

export enum VaultTypeTransaction {
  Withdraw = 'LENDING_REDEMPTION',
  Deposit = 'LENDING_ALLOCATION',
  Interest = 'INTEREST',
}

export enum VaultAccountType {
  Principal = 'LENDING_PRINCIPAL',
  Interest = 'LENDING_INTEREST',
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

export interface Interest {
  accrualMode: VaultAccrualMode;
  accrualMethod: VaultAccrualMethod;
  accrualIntervalUnit: VaultTimeUnit;
  accrualInterval: number;
  rateType: VaultRateType;
  baseAnnualRate: number;
}

export interface VaultFarmingAsset {
  id: string;
  details?: any;
  [propName: string]: any;
}

export type TransactionType = VaultTypeTransaction.Deposit
  | VaultTypeTransaction.Withdraw
  | VaultTypeTransaction.Interest;

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
  customData?: any;
  protocol?: VaultProtocolType;
  categories?: VaultCategory[];
  farmingAssets?: VaultFarmingAsset[];
  createdAt: string;
  updatedAt: string;
}

export interface VaultHistory {
  lendingId: string,
  userId: string,
  productId: string,
  assetId: string,
  amount: BigNumber,
  comments: string,
  transactionType: TransactionType,
  companyId?: string,
  createdAt: Date,
  updatedAt: Date,
  status?: string,
}

export interface VaultDepositWithdrawPayload {
  productId: string,
  assetId: string,
  amount: BigNumber,
  userId: string;
  companyId?: string,
  comments?: string;
}

export interface VaultDepositWithdrawResponse {
  id: string;
  userId: string,
  companyId?: string,
  productId: string,
  assetId: string,
  amount: BigNumber,
  transactionTypeId: string;
  transactionType: TransactionType,
  comments?: string,
  createdAt: Date,
  updatedAt: Date,
  externalMetadata?: any;
}
