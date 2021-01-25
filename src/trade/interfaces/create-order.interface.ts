import { OrderSide, OrderTimeInForce, OrderType } from "./order.interface";

export interface CreateOrder {
  instrument: string;
  quantity: number;
  side: OrderSide;
  type: OrderType;
  time_in_force: OrderTimeInForce;
  limit_price?: number;
  stop_price?: number;
  client_order_id?: string;
  expire_time?: number;
}
