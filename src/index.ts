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
import { applyMixins } from "./common/apply-mixins.helper";
import { IOrderSummaryCreator, OrderSummaryCreator } from "./order-summary";
import config from "./config";

type EnvType = "production" | "staging";

export { Orderbook } from "./orderbook/orderbook";
export { NotificationEvents } from "./notification/notification-events";

export { OrderbookRecord } from "./orderbook/interfaces/orderbook-record.interface";
export { VolumeWeightedAveragePrice } from "./orderbook/interfaces/volume-weighted-average-price.interface";

export { Ticker } from "./ticker/ticker";
export { QuotesAll } from "./ticker/quotes-all";
export { TickerRecord } from "./ticker/interfaces/ticker-record.interface";

export { Chart } from "./chart/chart";
export { HistoricalBar } from "./chart/interfaces/historical-bar.interface";
export { Periodicity } from "./chart/interfaces/periodicity.interface";
export * from "./common/explorer-links.helper";

export {
  Instrument,
  InstrumentFee,
} from "./eds/interfaces/instrument.interface";

export { Product, ProductType } from "./eds/interfaces/product.interface";

export {
  Transaction as WalletTransaction,
  TransactionStatus as WalletTransactionStatus,
  TransactionType as WalletTransactionType,
} from "./wis/interfaces/transaction.interface";

export * from "./trade/interfaces";
export * from "./kyc/interfaces";
export * from "./vaults/interfaces";
export * from './order-summary/interfaces';
export { OrderHelper } from './order-summary/order-helper';
export { OrderSummaryCreator } from './order-summary';

export class SDKv2 {
  constructor(public exchange: string, public environment: string, public useStagingLending = false) {
    this.environment = this.environment.toLowerCase();
    if (!config[this.environment as EnvType]) {
      throw new Error(`Unknown environment ${this.environment}`);
    }
    this.config = config[this.environment as EnvType];
    if (useStagingLending) {
      this.config.lending_api_url = config.staging.lending_api_url;
    }
  }
}
export interface SDKv2
  extends
  IOrderSummaryCreator,
  AuthService,
  ExchangeDataService,
  WalletIntegrationService,
  TradeService,
  NotificationService,
  KycService,
  LendingService,
  SettingsService,
  WyreService,
  GeoService { }

applyMixins(SDKv2, [
  OrderSummaryCreator,
  AuthService,
  ExchangeDataService,
  WalletIntegrationService,
  TradeService,
  NotificationService,
  KycService,
  LendingService,
  SettingsService,
  WyreService,
  GeoService,
]);
