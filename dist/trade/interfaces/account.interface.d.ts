export interface Account {
    id: string;
    product: string;
    balance: {
        trade: number;
        withdraw: number;
    };
    withdraw?: {
        flat_fee: number;
        progressive_fee: number;
        min_amount: number;
        max_amount: number;
        is_available: boolean;
    };
    deposit?: {
        flat_fee: number;
        progressive_fee: number;
        min_amount: number;
        max_amount: number;
        is_available: boolean;
    };
}
