import { SDKv2 } from "../src";

(async () => {
  const sdk = new SDKv2(
    process.env.SDK_EXCHANGE || "",
    process.env.SDK_ENVIRONMENT || ""
  );

  const tokens = await sdk.login(
    process.env.SDK_USERNAME || "",
    process.env.SDK_PASSWORD || ""
  );
  sdk.accessToken = tokens.client_access_token;

  // Create quote order for 500 USD
  const order = await sdk.createMarketOrderQc("BTCUSD", 500, "buy");
  console.log("MARKET_ORDER_QC", order);

  // Get BTCUSD orders sorted by creation date
  const orders = await sdk.getMarketOrdersQc({
    sort_field: "created_at",
    filter_instrument: "BTCUSD",
  });
  console.log("MARKET_ORDERS_BTCUSD", orders);
})();
/* OUTPUT
MARKET_ORDER_QC {
  id: '434d2fc3-8a11-4dbc-a219-d1105bb28d92',
  exchange_id: 'DEMO',
  user_id: 'f4a26b49-9f07-4e81-ae0c-e6ff0da966df',
  client_order_id: null,
  instrument_id: 'BTCUSD',
  status: 'new',
  side: 'buy',
  quantity: 500,
  executed_quantity: 0,
  executed_base_quantity: 0,
  created_at: 2020-09-23T16:35:15.548Z,
  exchange_user_id: null,
  rejection_reason: null
}
MARKET_ORDERS_BTCUSD {
  items: [
    {
      id: '434d2fc3-8a11-4dbc-a219-d1105bb28d92',
      exchange_id: 'DEMO',
      instrument_id: 'BTCUSD',
      client_order_id: null,
      side: 'buy',
      status: 'new',
      quantity: 500,
      executed_quantity: 0,
      executed_base_quantity: 0,
      user_id: 'f4a26b49-9f07-4e81-ae0c-e6ff0da966df',
      exchange_user_id: null,
      rejection_reason: null,
      created_at: 2020-09-23T16:35:15.000Z
    },
    {
      id: 'b71bf054-21a6-418a-b6cb-f60b38fd9765',
      exchange_id: 'DEMO',
      instrument_id: 'BTCUSD',
      client_order_id: null,
      side: 'buy',
      status: 'completely_filled',
      quantity: 500,
      executed_quantity: 499.74580701,
      executed_base_quantity: 0.0477,
      user_id: 'f4a26b49-9f07-4e81-ae0c-e6ff0da966df',
      exchange_user_id: null,
      rejection_reason: null,
      created_at: 2020-09-23T11:24:43.000Z
    },
    {
      id: 'b66cbd9d-697d-4477-93d3-b71e4a78e056',
      exchange_id: 'DEMO',
      instrument_id: 'BTCUSD',
      client_order_id: '03e64230-5652-4113-929c-b40c3f77c0e4',
      side: 'buy',
      status: 'completely_filled',
      quantity: 170.6887,
      executed_quantity: 170.12729732,
      executed_base_quantity: 0.0162,
      user_id: 'f4a26b49-9f07-4e81-ae0c-e6ff0da966df',
      exchange_user_id: null,
      rejection_reason: null,
      created_at: 2020-09-22T13:43:06.000Z
    }
  ],
  pager_limit: 100,
  pager_offset: 0,
  pager_total_rows: 3
}
*/
