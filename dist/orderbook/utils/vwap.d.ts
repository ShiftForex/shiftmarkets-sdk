import { OrderbookRecord } from "../interfaces/orderbook-record.interface";
import { VolumeWeightedAveragePrice } from "../interfaces/volume-weighted-average-price.interface";
export declare const calculateVWAP: (rows: OrderbookRecord[], volume: number) => VolumeWeightedAveragePrice;
export declare const calculateQuoteVWAP: (rows: OrderbookRecord[], volume: number) => VolumeWeightedAveragePrice;
