export declare type ProductType = "crypto" | "fiat";
export interface Product {
    id: string;
    name: string;
    type: ProductType;
    precision: number;
    deposit?: {
        available: number;
        commissions: {
            progressive: number;
            flat: number;
        };
        limits: {
            daily: number;
            weekly: number;
            monthly: number;
        };
    };
    withdraw?: {
        available: number;
        min_amount: number;
        commissions: {
            progressive: number;
            flat: number;
        };
        limits: {
            daily: number;
            weekly: number;
            monthly: number;
        };
    };
}
