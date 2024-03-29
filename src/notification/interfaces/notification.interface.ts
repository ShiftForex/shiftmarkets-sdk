import type { OrderStatuses } from '../../trade/interfaces'

export enum TradeSocketEvents {
  DepositNew = 'DepositNew',
  DepositFailed = 'DepositFailed',
  DepositCompleted = 'DepositCompleted',
  DepositPending = 'DepositPending',
  WithdrawNew = 'WithdrawNew',
  WithdrawFailed = 'WithdrawFailed',
  WithdrawPending = 'WithdrawPending',
  WithdrawCompleted = 'WithdrawCompleted',
  AccountTransaction = 'AccountTransaction',
  OrderClosed = 'OrderClosed',
  OrderNewRequest = 'OrderNewRequest',
  OrderCancelRequest = 'OrderCancelRequest',
  OrderNewEvent = 'OrderNewEvent',
  OrderRejectEvent = 'OrderRejectEvent',
  OrderTradeReportEvent = 'OrderTradeReportEvent',
  MarketOrderQcClosed = 'MarketOrderQcClosed',
  InstantBuyFailed = 'InstantBuyFailed',
  InstantBuySuccess = 'InstantBuySuccess',
}

export interface Notification {
  type: TradeSocketEvents,
  source: string,
  date: Date,
  id: string,
  status: OrderStatuses,
  reason: string,
  read?: boolean,
  timestamp?: Date,
  executed_quantity?: string,
  code?: number,
  text?: string,
  data?: any,
  needToOverwrite?: boolean,
  events?: Array<any>,
  total?: number,
  orderEventsType?: string,
  order_id?: string,
  message?: string,
  [optionName: string]: any,
}
