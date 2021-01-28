export declare type TransactionStatus = "NEW" | "PENDING" | "COMPLETED" | "FAILED";
export declare type TransactionType = "DEPOSIT" | "WITHDRAW";
export interface Transaction {
    txid: string;
    status: TransactionStatus;
    type: TransactionType;
    exchange: string;
    product: string;
    address: string;
    amount?: number;
    confirmations_required: number;
    confirmations_count: number;
    created_at_timestamp: number;
    created_at: string;
    updated_at_timestamp: number;
    updated_at: string;
    state_hash: string;
    txid_hash?: string;
    success: boolean;
    message?: string;
    validation?: any;
    schema_name?: string;
    schema_data?: string;
    iframe_url?: string;
}
export interface TransactionPagedFilter {
    sort?: {
        field: "id" | "amount" | "created_at" | "updated_at";
        direction: "asc" | "desc";
    };
    pager?: {
        offset: number;
        limit: number;
    };
    filter?: {
        status?: TransactionStatus;
        product?: string;
        address?: string;
        type?: TransactionType;
        txid_hash?: string;
        success?: boolean;
        message?: string;
    };
}
export interface TransactionPagedHistory {
    transactions: Transaction[];
    pager_limit: number;
    pager_offset: number;
    pager_total_rows: number;
}
