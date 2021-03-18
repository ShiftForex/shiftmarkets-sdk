import * as Enums from "./enums";
import { TransactionType } from "./index";
export interface VaultPendingTransactionQuery {
    companyId?: string;
    userId?: string;
    productId?: string;
    assetId?: string;
    transactionType?: TransactionType;
    startingCreatedAt?: Date | string;
    endingCreatedAt?: Date | string;
    limit?: number;
    offset?: number;
    id?: string;
    status?: Enums.VaultTransactionStatus;
}
export interface VaultHistoryQuery {
    companyId?: string;
    userId?: string;
    productId?: string;
    assetId?: string;
    transactionType?: TransactionType;
    startingCreatedAt?: Date | string;
    endingCreatedAt?: Date | string;
    limit?: number;
    offset?: number;
    lendingId?: string;
    accountType?: Enums.VaultAccountType;
}
export interface VaultBalancesQuery {
    accountId?: string;
    companyId?: string;
    userId?: string;
    productId?: string;
    assetId?: string;
    accountType?: Enums.VaultAccountType;
    limit?: number;
    offset?: number;
}
export interface VaultProductsQuery {
    id?: string;
    companyId?: string;
    assets?: Array<string>;
    tags?: Array<string>;
    enabled?: boolean;
    termType?: Enums.VaultTermType;
    protocol?: Enums.VaultProtocolType;
    category?: Enums.VaultCategory;
}
