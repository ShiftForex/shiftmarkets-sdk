"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeSocketEvents = void 0;
var TradeSocketEvents;
(function (TradeSocketEvents) {
    TradeSocketEvents["DepositNew"] = "DepositNew";
    TradeSocketEvents["DepositFailed"] = "DepositFailed";
    TradeSocketEvents["DepositCompleted"] = "DepositCompleted";
    TradeSocketEvents["DepositPending"] = "DepositPending";
    TradeSocketEvents["WithdrawNew"] = "WithdrawNew";
    TradeSocketEvents["WithdrawFailed"] = "WithdrawFailed";
    TradeSocketEvents["WithdrawPending"] = "WithdrawPending";
    TradeSocketEvents["WithdrawCompleted"] = "WithdrawCompleted";
    TradeSocketEvents["AccountTransaction"] = "AccountTransaction";
    TradeSocketEvents["OrderClosed"] = "OrderClosed";
    TradeSocketEvents["OrderNewRequest"] = "OrderNewRequest";
    TradeSocketEvents["OrderCancelRequest"] = "OrderCancelRequest";
    TradeSocketEvents["OrderNewEvent"] = "OrderNewEvent";
    TradeSocketEvents["OrderRejectEvent"] = "OrderRejectEvent";
    TradeSocketEvents["OrderTradeReportEvent"] = "OrderTradeReportEvent";
    TradeSocketEvents["MarketOrderQcClosed"] = "MarketOrderQcClosed";
    TradeSocketEvents["InstantBuyFailed"] = "InstantBuyFailed";
    TradeSocketEvents["InstantBuySuccess"] = "InstantBuySuccess";
})(TradeSocketEvents = exports.TradeSocketEvents || (exports.TradeSocketEvents = {}));
