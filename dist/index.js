"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDKv2 = void 0;
const auth_service_1 = require("./auth/auth.service");
const exchange_data_service_1 = require("./eds/exchange-data.service");
const wallet_integration_service_1 = require("./wis/wallet-integration.service");
const kyc_service_1 = require("./kyc/kyc.service");
const trade_service_1 = require("./trade/trade.service");
const notification_service_1 = require("./notification/notification.service");
const settings_service_1 = require("./settings/settings-service");
const vaults_1 = require("./vaults/vaults");
const apply_mixins_helper_1 = require("./common/apply-mixins.helper");
const order_summary_1 = require("./order-summary");
const config_1 = __importDefault(require("./config"));
var orderbook_1 = require("./orderbook/orderbook");
Object.defineProperty(exports, "Orderbook", { enumerable: true, get: function () { return orderbook_1.Orderbook; } });
var notification_events_1 = require("./notification/notification-events");
Object.defineProperty(exports, "NotificationEvents", { enumerable: true, get: function () { return notification_events_1.NotificationEvents; } });
var ticker_1 = require("./ticker/ticker");
Object.defineProperty(exports, "Ticker", { enumerable: true, get: function () { return ticker_1.Ticker; } });
var chart_1 = require("./chart/chart");
Object.defineProperty(exports, "Chart", { enumerable: true, get: function () { return chart_1.Chart; } });
__exportStar(require("./trade/interfaces"), exports);
__exportStar(require("./kyc/interfaces"), exports);
__exportStar(require("./vaults/interfaces"), exports);
__exportStar(require("./order-summary/interfaces"), exports);
var order_helper_1 = require("./order-summary/order-helper");
Object.defineProperty(exports, "OrderHelper", { enumerable: true, get: function () { return order_helper_1.OrderHelper; } });
var order_summary_2 = require("./order-summary");
Object.defineProperty(exports, "OrderSummaryCreator", { enumerable: true, get: function () { return order_summary_2.OrderSummaryCreator; } });
class SDKv2 {
    constructor(exchange, environment) {
        this.exchange = exchange;
        this.environment = environment;
        this.environment = this.environment.toLowerCase();
        if (!config_1.default[this.environment]) {
            throw new Error(`Unknown environment ${this.environment}`);
        }
        this.config = config_1.default[this.environment];
    }
}
exports.SDKv2 = SDKv2;
apply_mixins_helper_1.applyMixins(SDKv2, [
    order_summary_1.OrderSummaryCreator,
    auth_service_1.AuthService,
    exchange_data_service_1.ExchangeDataService,
    wallet_integration_service_1.WalletIntegrationService,
    trade_service_1.TradeService,
    notification_service_1.NotificationService,
    kyc_service_1.KycService,
    vaults_1.LendingService,
    settings_service_1.SettingsService,
]);
//# sourceMappingURL=index.js.map