import * as Enums from "./enums";
import { Interest, TransactionType, VaultFarmingAsset, VaultTimeUnit } from "./index";
import { BigNumber } from "bignumber.js";
export interface LendingTicketsQuery {
    companyId?: string;
    userId?: string;
    productId?: string;
    assetId?: string;
    status?: Enums.LendingTicketStatus;
    transactionType?: Enums.VaultTypeTransaction;
    startingRequestDate?: Date | string;
    endingRequestDate?: Date | string;
    startingProcessingDate?: Date | string;
    endingProcessingDate?: Date | string;
    team?: string;
}
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
export interface UpdateVaultProductQuery {
    name?: string;
    description?: string;
    companyId?: string;
    assetId?: string;
    totalBalance?: BigNumber;
    tags?: string[];
    enabled?: boolean;
    allocationEnabled?: boolean;
    minimumAllocationAmount?: BigNumber;
    maximumAllocationAmount?: BigNumber;
    redemptionEnabled?: boolean;
    minimumRedemptionAmount?: BigNumber;
    maximumRedemptionAmount?: BigNumber;
    termType?: Enums.VaultTermType;
    termUnit?: Enums.VaultTimeUnit;
    termLength?: number;
    interest?: Interest;
    customData?: any;
    protocol?: Enums.VaultProtocolType;
    categories?: Enums.VaultCategory[];
    farmingAssets?: VaultFarmingAsset[];
    dailyThresholdDelay?: string;
    depositAccrualStartsOn?: VaultTimeUnit;
    depositAccrualStartsOnUnit?: VaultTimeUnit;
    withdrawAccrualEndsOnUnit?: VaultTimeUnit;
    dailyThresholdRedemptionLimit?: string;
}
export interface CreateVaultProductQuery {
    id: string;
    name: string;
    description: string;
    assetId: string;
    totalBalance: BigNumber;
    allocationEnabled: boolean;
    redemptionEnabled: boolean;
    termType: Enums.VaultTermType;
    dailyThresholdRedemptionLimit?: string;
    depositAccrualStartsOn: VaultTimeUnit;
    depositAccrualStartsOnUnit: VaultTimeUnit;
    withdrawAccrualEndsOnUnit: VaultTimeUnit;
    withdrawAccrualEndsOn: VaultTimeUnit;
    companyId?: string;
    tags?: string[];
    enabled?: boolean;
    minimumAllocationAmount?: BigNumber;
    maximumAllocationAmount?: BigNumber;
    minimumRedemptionAmount?: BigNumber;
    maximumRedemptionAmount?: BigNumber;
    termUnit?: Enums.VaultTimeUnit;
    termLength?: number;
    interest?: Interest;
    customData?: any;
    protocol?: Enums.VaultProtocolType;
    categories?: Enums.VaultCategory[];
    farmingAssets?: VaultFarmingAsset[];
    dailyThresholdDelay?: string;
}
export interface Pager {
    pager_offset: number;
    pager_limit: number;
    pager_total_rows: number;
}
export interface IWithPager<T = any> extends Pager {
    items: Array<T>;
}
export declare type WithPager<T = any> = IWithPager<T>;
export interface IWithPagerParams {
    limit?: number;
    offset?: number;
}
export declare type WithPagerParams<T> = T & IWithPagerParams;
