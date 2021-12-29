import { BigNumber } from 'bignumber.js';
import * as Enums from './enums';

export * from './enums';
export * from './queryParams';

export interface Interest {
  accrualMode: Enums.VaultAccrualMode;
  accrualMethod: Enums.VaultAccrualMethod;
  accrualIntervalUnit: Enums.VaultTimeUnit;
  accrualInterval: number;
  rateType: Enums.VaultRateType;
  baseAnnualRate: number;
}

export interface VaultFarmingAsset {
  id: string;
  details?: any;

  [propName: string]: any;
}

export interface VaultRateTier {
  tierFrom?: BigNumber;
  tierTo?: BigNumber;
  apy: BigNumber;
  apr?: BigNumber;
}

export type TransactionType = Enums.VaultTypeTransaction.Deposit
  | Enums.VaultTypeTransaction.Withdraw
  | Enums.VaultTypeTransaction.Interest;

export interface VaultBalance {
  companyId?: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  sequenceId: string;
  id: string;
  userId: string;
  productId: string;
  assetId: string;
  accountType: Enums.VaultAccountType;
  balance: BigNumber;
  accountingClass: Enums.VaultAccountClass,
}

export interface LendingTicket {
  id: any,
  companyId: string,
  userId: string,
  productId: string,
  productName: string,
  assetId: string,
  amount: string | BigNumber,
  status: Enums.LendingTicketStatus,
  transactionType: Enums.VaultTypeTransaction,
  transactionId: string,
  transactionDetails: any,
  comments: string | Array<string>,
  requestDate: Date,
  updatedAt: Date,
  processingDate: Date,
  team: string,
  [optionName: string]: any, // todo temp
}

export interface VaultProduct {
  productId: string;
  id: string;
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
  termType: Enums.VaultTermType;
  termUnit?: Enums.VaultTimeUnit;
  termLength?: number;
  interest?: Interest;
  customData?: any;
  protocol?: Enums.VaultProtocolType;
  categories?: Enums.VaultCategory[];
  farmingAssets?: VaultFarmingAsset[];
  createdAt: Date;
  updatedAt: Date;
  dailyThresholdDelay?: string;
  dailyThresholdRedemptionLimit?: string;
  counting: Enums.VaultRateCounting;
  tiers: VaultRateTier[];
}

export interface VaultHistory {
  id: string,
  parentId?: string,
  sequenceId: string,
  lendingId: string,
  accountTypeId: string,
  userId: string,
  productId: string,
  assetId: string,
  amount: BigNumber,
  comments?: string,
  transactionType: TransactionType,
  companyId?: string,
  detailsId?: string,
  createdAt: Date,
  updatedAt: Date,
  status?: string,
  externalMetadata?: {
    interest?: Interest,
    termType: Enums.VaultTermType;
    termUnit?: Enums.VaultTimeUnit;
    termLength?: number;
  },
}

export interface VaultPendingTransaction {
  companyId: string,
  userId: string,
  productId: string,
  assetId: string,
  amount: string,
  comments: string,
  createdAt: Date,
  updatedAt: Date,
  id: string,
  transactionType: TransactionType,
  status: Enums.VaultTransactionStatus,
  reason: Enums.VaultTransactionReason
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

export interface VaultTransactionsResponse {
  id?: string;
  accountId: string;
  companyId?: string;
  userId: string;
  productId: string;
  assetId: string
  accountTypeId: string;
  transactionType: TransactionType;
  credit?: BigNumber;
  debit?: BigNumber;
  balanceBefore: BigNumber;
  balanceAfter: BigNumber;
  detailsId?: string;
  comments?: string;
  sequenceId?: BigNumber;
  createdAt?: Date;
  updatedAt?: Date;
}
