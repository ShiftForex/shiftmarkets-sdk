import { AuthService } from "./auth/auth.service";
import { ExchangeDataService } from "./eds/exchange-data.service";
import { WalletIntegrationService } from "./wis/wallet-integration.service";
import { KycService } from "./kyc/kyc.service";
import { TradeService } from "./trade/trade.service";
import { NotificationService } from "./notification/notification.service";
import { SettingsService } from "./settings/settings-service";
import { GeoService } from "./geo/geo.service";
import { WyreService } from "./wyre/wyreService";
import { LendingService } from "./vaults/vaults";
import { IOrderSummaryCreator } from "./order-summary";
export { Orderbook } from "./orderbook/orderbook";
export { NotificationEvents } from "./notification/notification-events";
export { OrderbookRecord } from "./orderbook/interfaces/orderbook-record.interface";
export { VolumeWeightedAveragePrice } from "./orderbook/interfaces/volume-weighted-average-price.interface";
export { Ticker } from "./ticker/ticker";
export { TickerRecord } from "./ticker/interfaces/ticker-record.interface";
export { Chart } from "./chart/chart";
export { HistoricalBar } from "./chart/interfaces/historical-bar.interface";
export { Periodicity } from "./chart/interfaces/periodicity.interface";
export { Instrument, InstrumentFee, } from "./eds/interfaces/instrument.interface";
export { Product, ProductType } from "./eds/interfaces/product.interface";
export { Transaction as WalletTransaction, TransactionStatus as WalletTransactionStatus, TransactionType as WalletTransactionType, } from "./wis/interfaces/transaction.interface";
export * from "./trade/interfaces";
export * from "./kyc/interfaces";
export * from "./vaults/interfaces";
export * from './order-summary/interfaces';
export { OrderHelper } from './order-summary/order-helper';
export { OrderSummaryCreator } from './order-summary';
export declare class SDKv2 {
    exchange: string;
    environment: string;
    useStagingLending: boolean;
    constructor(exchange: string, environment: string, useStagingLending?: boolean);
}
export interface SDKv2 extends IOrderSummaryCreator, AuthService, ExchangeDataService, WalletIntegrationService, TradeService, NotificationService, KycService, LendingService, SettingsService, WyreService, GeoService {
}
