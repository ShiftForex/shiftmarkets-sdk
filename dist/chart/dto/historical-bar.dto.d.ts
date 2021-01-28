export interface HistoricalBarDto {
    timestamp: number;
    open_ask: string;
    high_ask: string;
    low_ask: string;
    close_ask: string;
    open_bid: string;
    high_bid: string;
    low_bid: string;
    close_bid: string;
    volume: string;
}
export interface HistoricalBarsDto {
    timestamp: number;
    exchange_bars: HistoricalBarDto[];
    aggregated_bar: HistoricalBarDto;
}
